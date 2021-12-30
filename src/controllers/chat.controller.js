const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');
const { escapeRegex } = require('../helpers/query.helper');

const createChat = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const chat = await chatService.createChat(req.body, _id);
  res.status(httpStatus.CREATED).send(chat);
});

const getChats = catchAsync(async (req, res) => {
  const { _id } = req.user;
  
  let search = pick(req.query, ['name']);
  let filter = {
    members: {
      $in: [_id]
    }
  }
  if(search.name) {
    const regex = new RegExp(escapeRegex(search.name), 'gi');
    filter = {
      ...filter,
      name: regex
    }
  }

  const chats = await chatService.getAllChats(filter, search);
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










module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
};
