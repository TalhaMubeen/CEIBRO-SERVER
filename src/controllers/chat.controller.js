const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService, userService } = require('../services');
const { escapeRegex } = require('../helpers/query.helper');
const { formatMessage } = require('../helpers/chat.helper');

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

  res.send(chats);
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
  console.log('converatsion i s', conversation)
  conversation = conversation?.map(conversation => {
    conversation = formatMessage(conversation, currentLoggedUser);
    console.log('checking i s', conversation)
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





module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
  getConversationByRoomId,
  setRoomMessagesRead,
  addToFavouite,
  muteChat
};
