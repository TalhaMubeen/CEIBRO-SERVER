const httpStatus = require('http-status');
const { projectService, chatService } = require('.');
const { Chat, User, Message } = require('../models');
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

 const getAllChats = async (filter, userId) => {
  // return Chat
  // .find(filter)
  // .populate({ path: "members", select: "name" })
  // .populate({ path: "project", select: "name" });
  const chats = await Chat
  .find(filter)
  .populate({ path: "members", select: "name" })
  .populate({ path: "project", select: "name" });

  const chatIds = await chats.map(chat => chat._id);
  const unreadMessages = await Message.aggregate([
    {
      "$match": {
        "chat": {
          "$in": chatIds
        },
        "readBy": {
          "$ne": userId
        }
      }
    },
    {
      "$sort": {
        name: 1
      }
    },
    {
      "$group": {
        "_id": "$chat",
        "chatName": { "$last": "$name" },
        "count": {
          "$sum": 1
        }
      }
    }
  ]);

  const data = chats.map(chat => {
    return {
      ...chat._doc,
      unreadCount: unreadMessages?.find(myChat => String(myChat._id) === String(chat._doc._id))?.count
    }
  });

  return data;

};

const getChatRoomByRoomId = async function (roomId) {
  const room = await Chat.findOne({ _id: roomId });
  return room;
};

const getConversationByRoomId = async function (chatRoomId, options = {}) {
  return Message.find({ chat: chatRoomId }).populate("sender");
};

const getMessageById = async function (messagId, options = {}) {
  return Message.findOne({ _id: messagId }).populate("sender");
};


const setAllMessagesReadByRoomId = async function (roomId, userId) {
  return Message.updateMany({ chat: roomId }, { $push: { readBy: userId } });
};

module.exports = {
  createChat,
  getChatById,
  updateChatById,
  queryChats,
  getAllChats,
  getChatRoomByRoomId,
  getConversationByRoomId,
  getMessageById,
  setAllMessagesReadByRoomId
};
