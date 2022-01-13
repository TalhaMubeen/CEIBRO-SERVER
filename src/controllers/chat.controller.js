const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService, userService, awsService } = require('../services');
const { escapeRegex } = require('../helpers/query.helper');
const { formatMessage } = require('../helpers/chat.helper');
const { RECEIVE_MESSAGE, REPLY_MESSAGE } = require('../config/chat.constants');
const io = require('./webSocket.controller')
const AWS = require('aws-sdk')

const createChat = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const chat = await chatService.createChat(req.body, _id);
  res.status(httpStatus.CREATED).send(chat);
});

const getChats = catchAsync(async (req, res) => {
  const { _id } = req.user;
  
  let search = pick(req.query, ['name', 'type']);
  let filter = {
    members: {
      $in: [_id]
    }
  }
  console.log('search is ', search)
  if(search.name) {
    const regex = new RegExp(escapeRegex(search.name), 'gi');
    filter = {
      ...filter,
      name: regex
    }
  }

  let chats = await chatService.getAllChats(filter, _id);
  
  if(search?.type === 'unread') {
    chats = chats?.filter(chat => (chat.unreadCount && chat.unreadCount > 0));
  }

  if(search?.type === 'read') {
    chats = chats?.filter(chat => (!chat.unreadCount || chat.unreadCount <= 0));
  }

  res.send(chats.reverse());
});

const getChat = catchAsync(async (req, res) => {
  const chat = await chatService.getChatById(req.params.userId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  res.send(chat);
});

const updateChat = catchAsync(async (req, res) => {
  const chat = await chatService.updateChatById(req.params.chatId, req.body);
  res.send(chat);
});


const getConversationByRoomId = catchAsync(async (req, res) => {
  
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, "No room exists for this id");
  }
  const options = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10,
  };
  let conversation = await chatService.getConversationByRoomId(
    roomId,
    options
  );
  conversation = conversation?.map(conversation => {
    conversation = formatMessage(conversation, currentLoggedUser);
    return conversation;
  });
  res.status(httpStatus.CREATED).send({ conversation: conversation });
});

const setRoomMessagesRead = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, "No room exists for this id");
  }
  
  await chatService.setAllMessagesReadByRoomId(roomId, currentLoggedUser);

  res.status(httpStatus.CREATED).send("All messages read by users");
});

const addToFavouite = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, "No room exists for this id");
  }
  const [,,added]  = await chatService.addOrRemoveChatRoomToFavourite(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Chat ${added ? 'added to ': 'removed from '} favourite`);
});

const addMessageToFavourite = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { messageId } = req.params;

  const message = await chatService.getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, "No message exists for this id");
  }

  await chatService.checkChatAuthorization(currentLoggedUser, message.chat);

  const [,,added]  = await chatService.addOrRemoveMessageToFavourite(messageId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Message ${added ? 'added to ': 'removed from '} favourite`);
});


const getPinnedMessages = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { messageId: roomId } = req.params;

  const messages = await chatService.getPinnedMessages(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(messages);
});


const muteChat = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, "No room exists for this id");
  }
  const [,,muted]  = await chatService.muteOrUnmuteChat(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Chat ${muted ? 'muted': 'unmuted' }`);
});


const replyMessage = catchAsync(async (req, res) => {
  console.log('files are', req.file, req.files)      
  const currentLoggedUser = req.user._id;
  const {message, chat, messageId} = req.body;
  let files = [];
  if(req.files) {
    files = await Promise.all(req.files?.map(file => awsService.uploadFile(file)))
  }
  console.log('file are', files)
  let newMessage = null;
  if(messageId) {
      newMessage = await chatService.replyMessage(message,  messageId, currentLoggedUser, files);
  } else {
    newMessage = await chatService.sendMessage(message,  chat, currentLoggedUser, files);
  }
  
  const myChat = await chatService.getChatById(newMessage.chat);

  global.io.sockets.in(String(newMessage.chat)).emit(RECEIVE_MESSAGE.value, { from: currentLoggedUser, message: formatMessage(newMessage), chat: String(myChat._id), mutedFor: myChat.mutedBy });
          
  res.status(200).send(newMessage);

});



const getChatRoomMedia = catchAsync(async (req, res) => {      
  const {roomId} = req.params;
  const media = await chatService.getRoomMediaById(roomId);
  res.status(200).send(media[0].files);
});


// const uploadImage = catchAsync(async (req, res) => {
//   const currentLoggedUser = req.user._id;
  
//   const s3bucket = new AWS.S3({
//     region: 'eu-north-1',
//     'accessKeyId': 'AKIASRVOFC3PM5B3AOIC',
//     secretAccessKey: '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'
//    });
//    console.log(req.file);
//    var params = {
//     Key: req.file.originalname,
//     Body: req.file.buffer,
//     Bucket: 'ceibro/chat-images',
//     ACL:'public-read-write'
//    };
//   s3bucket.upload(params, (s, data) => {
//     console.log('hello', s, data)
//   })
// });





module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
  getConversationByRoomId,
  setRoomMessagesRead,
  addToFavouite,
  muteChat,
  replyMessage,
  addMessageToFavourite,
  getPinnedMessages,
  getChatRoomMedia,
  // uploadImage
};
