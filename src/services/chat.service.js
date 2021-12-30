const httpStatus = require('http-status');
const { projectService } = require('.');
const { Chat, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
// TODO: perform validations (user or group must exist, donot create if exist)
const createChat = async (chatBody, initiator) => {
  const { name, projectId, members } = chatBody;
  
  const membersCount = await User.count({ _id: members });
  if(membersCount < members.length) {
    throw new ApiError(400, "Invalid user ids");
  }

  const obj = {
    name,
    initiator,
    members: [initiator, ...members]
  }

  if(projectId) {
    const project = await projectService.getProjectById(projectId);
    if(!project) throw new ApiError(400, "Invalid project id")
    obj.project = project._id;
  }
  
  return Chat.create(obj);
}

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


/**
 * Query for chats
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryChats = async (filter, options) => {
  return Chat.paginate(filter, options);
};

 const getAllChats = async (filter) => {
  return Chat
  .find(filter)
  .populate({ path: "members", select: "name" })
  .populate({ path: "project", select: "name" });
};

module.exports = {
  createChat,
  getChatById,
  updateChatById,
  queryChats,
  getAllChats
};
