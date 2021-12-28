const { verifyBearerToken } = require('../helpers/auth.helper');
const ChatTypes = require('../config/chat.constants');
const { User, Message, Chat: Room } = require('../models')


class WebSocket {
    listenToChatServer(io) {

        io.on("connection", (socket) => {
      
            const { token } = socket.handshake.query;
            const tokenVerify = verifyBearerToken(token);
            let userId = null;
      
            if (tokenVerify.isVerified) {
                const {_id } = tokenVerify  
                userId = _id
                this.saveUsersSocket(tokenVerify._id, socket.id, io)
      
                // Send message to another user
      
                socket.on(ChatTypes.SEND_MESSAGE.value, (data) => {
                    console.log('hello ', ChatTypes.SEND_MESSAGE.value)
                    const { recieverId, message } = data
                    this.sendMessageToUser(_id, recieverId, message, io)
                })
      
                socket.on(ChatTypes.TYPING_START.value, (data) => {
                    console.log('Typing ', ChatTypes.TYPING_START.value)
                    const { recieverId } = data
                    this.typingStart(_id, recieverId, io)
                })
      
                socket.on(ChatTypes.TYPING_END.value, (data) => {
                    console.log('Typing Ejn', ChatTypes.TYPING_END.value)
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
                console.log('bad socket connection')
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
      
      async saveUsersSocket(_id, socketId, io) {
        const user = await User.findById(_id)
        if (user) {
            user.isOnline = true
            user.socketId = socketId
            await user.save()
            io.emit(ChatTypes.USER_CONNECTED.value, { userId: user._id })
        }
      }
      
      async handlUserDisconnect(userId, io) {
        const user = await User.findById(userId)
        user.isOnline = false
        user.socketId = null
        await user.save()
        io.emit(ChatTypes.USER_DISCONNECTED.value, { userId })
      }
      
      async sendMessageToUser(senderId, receiverId, message, io) {
        try {
            const user = await User.findById(receiverId)
            if (user) {
                let room = await Room.findOne({
                    $or: [
                        { sender: senderId, receiver: receiverId },
                        { sender: receiverId, receiver: senderId }
                    ]
                })
                if (!room) {
                    room = new Room({
                        sender: senderId,
                        receiver: receiverId
                    })
                    await room.save()
                }
      
                const messageObj = new Message({
                    room: room.id,
                    message,
                    sender: senderId
                })
      
                await messageObj.save()
                io.to(user.socketId).emit(ChatTypes.RECEIVE_MESSAGE.value, { from: senderId, message });
                room.lastMessage = messageObj._id
                await room.save()
            }
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
