const httpStatus = require('http-status');
const { Chat } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
// TODO: perform validations (user or group must exist, donot create if exist)
const createChat = async (chatBody) => Chat.create(chatBody);

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<chat>}
 */
const getChatById = async (id) => {
  const chat = await Chat.findById(id);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // TODO: Validate if the requesting user is authorized for this chat
  return chat;
};

/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateChatById = async (chatId, updateBody) => {
  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  if (updateBody.to || updateBody.from || updateBody.project || updateBody.group
    || updateBody.Owner) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'These fields cannot be updated. Only messages can be changed.');
  }
  Object.assign(chat, updateBody);
  await chat.save();
  return chat;
};

module.exports = {
  createChat,
  getChatById,
  updateChatById,
};
