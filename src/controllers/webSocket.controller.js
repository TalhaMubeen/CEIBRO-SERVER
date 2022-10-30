const { verifyBearerToken } = require('../helpers/auth.helper');
const ChatTypes = require('../config/chat.constants');
const { User, Message, Chat: Room } = require('../models');
const { chatService } = require('../services');
const { formatMessage } = require('../helpers/chat.helper');

class WebSocket {
    listenToChatServer(io) {
        io.on("connection", (socket) => {
            const { token } = socket.handshake.query;
            const tokenVerify = verifyBearerToken(token);
            let userId = null;
            if (tokenVerify.isVerified) {
                const { sub } = tokenVerify
                userId = sub;
                this.initUserSockets(tokenVerify.sub, socket, io);

                // Send message to another user
                socket.on(ChatTypes.SEND_MESSAGE.value, (data) => {

                    const {  message, chat, messageId, type } = data
                   // console.log(data, userId)
                    //Send message id if it's a reply to an existing message
                    this.sendMessageToChat(userId,  message, chat, messageId, type, io)
                })

                // socket.on(ChatTypes.REPLY_MESSAGE.value, (data) => {
                //     const { message, messageId } = data
                //     this.replyMessage(userId, messageId, message, io);
                // })

                socket.on(ChatTypes.TYPING_START.value, (data) => {
                    console.log('Typing Started', ChatTypes.TYPING_START.value)
                    const { recieverId } = data
                    this.typingStart(_id, recieverId, io)
                })

                socket.on(ChatTypes.TYPING_END.value, (data) => {
                    console.log('Typing End', ChatTypes.TYPING_END.value)
                    const { recieverId } = data
                    this.typingEnd(_id, recieverId, io)
                })

                socket.on(ChatTypes.MESSAGE_READ.value, (data) => {
                    console.log(ChatTypes.MESSAGE_READ.value)
                    const { messageId } = data
                    this.markMessageRead(messageId)
                })

                socket.on(ChatTypes.ALL_MESSAGE_READ.value, (data) => {
                    console.log(ChatTypes.ALL_MESSAGE_READ.value)
                    const { roomId } = data
                    this.markAllMessagesRead(roomId)
                })
            }
            else {
                console.log('bad socket userIdconnection')
            }
            socket.on("disconnect", () => {
                console.log('user disconnected')
                this.handlUserDisconnect(userId, io)
            });

        })

      }

      async getChatRooms(req, res, next) {
        try {
            const { user: { _id } } = req

            const rooms = await Room.find({
                $or: [
                    { sender: _id },
                    { receiver: _id }
                ]
            }).populate('sender receiver lastMessage', 'name username email _id socketId isOnline message createdAt ')
            res.status(200).json({ data: rooms })
        }
        catch (e) {
            next(e)
        }
      }

      async getConversationByRoomId(req, res, next) {
        try {
            const { roomId } = req.params
            const { offset = 0, limit = 20 } = req.query

            const messages = await Message.find({
                room: roomId
            }).skip(parseInt(offset.toString())).limit(parseInt(limit.toString()))

            res.status(200).json({ data: messages })
        }
        catch (e) {
            next(e)
        }
      }

      async initUserSockets(_id, socket, io) {
        const user = await User.findById(_id);
        if (user) {
            user.isOnline = true
            user.socketId = socket.id;
            await user.save()
            io.emit(ChatTypes.USER_CONNECTED.value, { userId: user._id })

            //Getting all rooms ids of current user
            const chats = await chatService.getAllChats({ members: {
                $in: _id
            }});

            //Joining all chat rooms sockets of current user
            chats?.map(chat => {
                socket.join(String(chat._id));
            });
        }
      }

      async handlUserDisconnect(userId, io) {
        const user = await User.findById(userId)
        if(user) {
            user.isOnline = false
            user.socketId = null
            await user.save()
        }
        io.emit(ChatTypes.USER_DISCONNECTED.value, { userId })
      }

      //userId,  message, chat, messageId, type, io
      async sendMessageToChat(senderId, message, chatId, messageId, type, io) {
        console.log("Test", senderId, message, chatId, messageId, type, io);
        try {
            let newMessage = null;
            if (messageId) {
              newMessage = await chatService.replyMessage(message, messageId, senderId, files);
            } else {
              newMessage = await chatService.sendMessage(message, chat, senderId, files, type);
            }
            const myChat = await chatService.getChatById(newMessage.chat);
            const myMessage = await chatService.getMessageById(newMessage._id);

            const msgData = {
                from: senderId,
                message: formatMessage(myMessage),
                chat: String(myChat._id),
                mutedFor: myChat.mutedBy,
              }

            //broadcast message to the destination room from this socket
            io.to(String(chatId)).emit(ChatTypes.RECEIVE_MESSAGE.value, msgData);
        }
        catch (e) {
            console.log('error is ', e)
        }
      }


    //    async replyMessage(currentLoggedUser, messageId, message, io) {

    //         const newMessage = await chatService.replyMessage(message, messageId, currentLoggedUser);
    //         const chat = await chatService.getChatById(newMessage.chat);

    //         io.to(String(newMessage.chat)).emit(REPLY_MESSAGE.value, { from: currentLoggedUser, message: formatMessage(newMessage), chat: String(chat._id), mutedFor: chat.mutedBy });

    //         res.status(200).send(newMessage);

    //     }



      getChatSocketEvents(_req, res, next) {
        try {
            const data = ChatTypes
            res.status(200).json({
                data
            })
        } catch(e) {
            next(e)
        }
      }

      async typingStart(senderId, recieverId, io) {
        const user = await User.findById(recieverId)
        if (user) {
            io.to(user.socketId).emit(ChatTypes.TYPING_START.value, { from: senderId });
        }
      }

      async typingEnd(senderId, recieverId, io) {
        const user = await User.findById(recieverId)
        if (user) {
            io.to(user.socketId).emit(ChatTypes.TYPING_END.value, { from: senderId });
        }
      }

      async markMessageRead(messageId) {
        const message = await Message.updateMany({ _id: messageId }, { seen: true })
      }

      async markAllMessagesRead(roomId) {
        const message = await Message.updateMany({ room: roomId }, { seen: true })
      }

}

module.exports = new WebSocket();
