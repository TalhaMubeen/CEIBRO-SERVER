const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat(req.body);
  res.status(httpStatus.CREATED).send(chat);
});

// Todo: return all chats allowed to this user
// const getChats = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await chatService.queryChats(filter, options);
//   res.send(result);
// });

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
  // getChats,
  getChat,
  updateChat,
};
