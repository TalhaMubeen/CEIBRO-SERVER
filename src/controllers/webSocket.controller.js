const { verifyBearerToken } = require('../helpers/auth.helper');
const ChatTypes = require('../config/chat.constants');
const { User, Message, Chat: Room } = require('../models');
const { chatService } = require('../services');
const { formatMessage } = require('../helpers/chat.helper');

class WebSocket {
    listenToChatServer(io) {
        io.on("connection", (socket) => {
            const { token } = socket.handshake.query;
      if (typeof token === 'undefined') {
        return
      }
            const tokenVerify = verifyBearerToken(token);
            let userId = null;
            if (tokenVerify.isVerified) {
                const { sub } = tokenVerify
                userId = sub;

                this.initUserSockets(tokenVerify.sub, socket, io);

                // Send message to another user
        socket.on("SEND_MESSAGE", (data) => {
          if (Object.keys(data).length === 0) {
            return;
          }
          const { message, chat, messageId, type, files, myId } = data

                    //Send message id if it's a reply to an existing message
          this.sendMessageToChat(userId, io, message, chat, messageId, type, files, myId)

                })

                socket.on(ChatTypes.TYPING_START.value, (data) => {
          if (Object.keys(data).length === 0) {
            return;
          }
                    console.log('Typing Started', ChatTypes.TYPING_START.value)
                    const { recieverId } = data
                    this.typingStart(_id, recieverId, io)
                })

                socket.on(ChatTypes.TYPING_END.value, (data) => {
          if (Object.keys(data).length === 0) {
            return;
          }
                    console.log('Typing End', ChatTypes.TYPING_END.value)
                    const { recieverId } = data
                    this.typingEnd(_id, recieverId, io)
                })

                socket.on(ChatTypes.MESSAGE_READ.value, (data) => {
          if (Object.keys(data).length === 0) {
            return;
          }
                    console.log(ChatTypes.MESSAGE_READ.value)
                    const { messageId } = data
                    this.markMessageRead(messageId)
                })

                socket.on(ChatTypes.ALL_MESSAGE_READ.value, (data) => {
          if (Object.keys(data).length === 0) {
            return;
          }
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
      const chats = await chatService.getAllChats({
        members: {
                $in: _id
        }
      });

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
  async sendMessageToChat(senderId, io, message, chatId, messageId, type, files, myId) {
        try {

      if (files.length === 0) {
        files = await Promise.all(files?.map((file) => awsService.uploadFile(file)));
      }

            let newMessage = null;
            if (messageId) {
              newMessage = await chatService.replyMessage(message, messageId, senderId, files);
            } else {
        newMessage = await chatService.sendMessage(message, chatId, senderId, files, type);
            }
            const myChat = await chatService.getChatById(newMessage.chat);
            const myMessage = await chatService.getMessageById(newMessage._id);

            const msgData = {
                from: senderId,
                message: formatMessage(myMessage),
                chat: String(myChat._id),
                mutedFor: myChat.mutedBy,
              }

      const ret = {
        myId:  myId,
        data: msgData
      }
            //broadcast message to the destination room from this socket
      io.to(String(chatId)).emit(ChatTypes.RECEIVE_MESSAGE.value, ret);
        }
        catch (e) {
            console.log('error is ', e)
        }
      }

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
