const httpStatus = require('http-status');
const { projectService, chatService, userService } = require('.');
const { Chat, User, Message, Invite } = require('../models');
const ProjectMember = require('../models/ProjectMember.model');
const ApiError = require('../utils/ApiError');
const ObjectId = require('mongoose').Types.ObjectId;
const { REFRESH_CHAT } = require('../config/chat.constants');
const { invitesStatus } = require('../config/user.config');
const { filterArray } = require('../helpers/project.helper');

/**
 * Create a user
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
// TODO: perform validations (user or group must exist, donot create if exist)
const createChat = async (chatBody, initiator) => {
  const { name, projectId, members } = chatBody;

  const chatExist = await getChatByName(name);
  if (chatExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat with this name already exist');
  }

  const membersCount = await User.count({ _id: members });
  if (membersCount < members.length) {
    throw new ApiError(400, 'Invalid user ids');
  }

  const obj = {
    name,
    initiator,
    members: [initiator, ...members],
  };

  if (projectId) {
    const project = await projectService.getProjectById(projectId);
    if (!project) throw new ApiError(400, 'Invalid project id');
    obj.project = project._id;
  }

  return Chat.create(obj);
};

const getChatByName = async (name) => {
  return Chat.findOne({
    name,
  });
};

const isChatExist = async (chatId) => {
  const chatExist = await Chat.findOne({ _id: chatId });
  if (!chatExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat not found');
  }
  return chatExist;
};

const createOneToOneChat = async (userId, initiator) => {
  const user = await userService.isUserExist(userId);
  const chatExist = await Chat.findOne({
    isGroupChat: false,
    $and: [{
      members: user._id
    }, {
      members: initiator
    }]
  });
  console.log('chatExist: ', chatExist);

  if (chatExist) {
    return chatExist;
  } else {
    return Chat.create({
      initiator,
      members: [initiator, user._id],
      isGroupChat: false,
    });
  }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<chat>}
 */
const getChatById = async (id) => {
  const chat = await Chat.findById(id);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  return chat;
};

const getChatByIdWithMembers = async (id) => {
  const chat = await Chat.findById(id).populate('members project');
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  return chat;
};

/**
 * Get user by user id
 * @param {ObjectId} userI
 * @returns {Promise<chat>}
 */
const checkChatAuthorization = async (userId, chatId) => {
  const chat = await Chat.findOne({ members: { $in: userId }, _id: chatId });

  if (!chat) {
    throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION, 'User not authorized to perform this opernation');
  }
  // TODO: Validate if the requesting user is authorized for this chat
  return true;
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
  if (updateBody.to || updateBody.from || updateBody.project || updateBody.group || updateBody.Owner) {
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
  const chats = await Chat.find(filter)
    .populate({ path: 'members', select: 'firstName surName profilePic companyName' })
    .populate({ path: 'project', select: 'title' })
    .populate({ path: 'lastMessage', select: 'message createdAt' });

  const chatIds = await chats.map((chat) => chat._id);
  const unreadMessages = await Message.aggregate([
    {
      $match: {
        chat: {
          $in: chatIds,
        },
        readBy: {
          $ne: userId,
        },
        access: { $eq: ObjectId(userId) },
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $group: {
        _id: '$chat',
        chatName: { $last: '$name' },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const data = chats.map((chat) => {
    return {
      ...chat._doc,
      unreadCount: unreadMessages?.find((myChat) => String(myChat._id) === String(chat._doc._id))?.count,
    };
  });

  return data;
};

const getChatRoomByRoomId = async function (roomId) {
  const room = await Chat.findOne({ _id: roomId });
  return room;
};

const removeChatForUser = async function (roomId, userId) {
  return Chat.updateOne({ _id: roomId }, { $pull: { members: userId } });
};

const getConversationByRoomId = async function (chatRoomId, options = {}, userId) {
  return Message.paginate(
    {
      chat: chatRoomId,
      access: { $eq: ObjectId(userId) },
    },
    options
  );
};

const getMessageIdsByFilter = async function (filter, options = {}) {
  const messages = await Message.find(filter, options);
  return messages?.map?.((message) => message._id) || [];
};

const checkMessageAuthorization = async function (messageId, userId) {
  const message = await Message.findOne({ _id: messageId, access: { $eq: ObjectId(userId) } });
  if (!message) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized to perform this operation');
  }
  return true;
};

const getMessageById = async function (messagId, options = {}) {
  return Message.findOne({ _id: messagId }).populate('sender replyOf readBy');
};

const getMessageByIds = async function (messagIds, currentUser) {
  return Message.find({ _id: messagIds, access: currentUser })
    .populate({ path: 'sender', select: 'firstName surName profilePic companyName' })
    .populate({ path: 'readBy', select: 'firstName surName profilePic' })
    .populate({ path: 'replyOf', select: 'message type' });

  // .populate('sender replyOf readBy');
};

const setAllMessagesReadByRoomId = async function (roomId, userId) {
  return Message.updateMany({ chat: roomId }, { $addToSet: { readBy: userId } });
};

const setLastMessagesUnRead = async function (roomId, userId) {
  const lastMessage = await Message.findOne({
    chat: roomId,
  }).sort({
    createdAt: -1,
  });
  if (lastMessage) {
    await Message.updateOne({ chat: roomId, _id: lastMessage._id }, { $pull: { readBy: userId } });
  }
};

const addOrRemoveChatRoomToFavourite = async function (roomId, userId) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }
  const index = user?.pinnedChat?.findIndex((chat) => String(chat) === String(roomId));
  if (index < 0) {
    return Promise.all([
      Chat.updateMany({ _id: roomId }, { $addToSet: { pinnedBy: userId } }),
      User.updateMany({ _id: userId }, { $addToSet: { pinnedChat: roomId } }),
      true,
    ]);
  } else {
    return Promise.all([
      Chat.updateMany({ _id: roomId }, { $pull: { pinnedBy: userId } }),
      User.updateMany({ _id: userId }, { $pull: { pinnedChat: roomId } }),
      false,
    ]);
  }
};

const addOrRemoveMessageToFavourite = async function (messageId, userId) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  await checkMessageAuthorization(messageId, userId);

  const index = user?.pinnedMessages?.findIndex((chat) => String(chat) === String(messageId));
  if (index < 0) {
    return Promise.all([
      Message.updateMany({ _id: messageId }, { $addToSet: { pinnedBy: userId } }),
      User.updateMany({ _id: userId }, { $addToSet: { pinnedMessages: messageId } }),
      true,
    ]);
  } else {
    return Promise.all([
      Message.updateMany({ _id: messageId }, { $pull: { pinnedBy: userId } }),
      User.updateMany({ _id: userId }, { $pull: { pinnedMessages: messageId } }),
      false,
    ]);
  }
};

const getPinnedMessages = async function (roomId, userId) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  return Message.find({ chat: roomId, pinnedBy: { $in: userId } }).populate('sender replyOf');
};

const muteOrUnmuteChat = async function (roomId, userId) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }
  const index = user?.mutedChat?.findIndex((chat) => String(chat) === String(roomId));
  if (index < 0) {
    return Promise.all([
      Chat.updateMany({ _id: roomId }, { $addToSet: { mutedBy: userId } }),
      User.updateMany({ _id: userId }, { $addToSet: { mutedChat: roomId } }),
      true,
    ]);
  } else {
    return Promise.all([
      Chat.updateMany({ _id: roomId }, { $pull: { mutedBy: userId } }),
      User.updateMany({ _id: userId }, { $pull: { mutedChat: roomId } }),
      false,
    ]);
  }
};

const replyMessage = async function (replyMessage, messageId, userId, files) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(400, 'Message not found');
  }

  const chat = await getChatById(message.chat);
  console.log('chat members are', chat.members);
  const reply = new Message({
    sender: userId,
    chat: message.chat,
    receivedBy: [userId],
    readBy: [userId],
    message: replyMessage,
    replyOf: messageId,
    files: files || [],
    access: chat.members.map((member) => member),
  });

  await reply.save();

  chat.lastMessage = reply._id;
  await chat.save();

  return getMessageById(reply._id, [
    {
      path: 'replyOf',
      select: 'message',
    },
  ]);
};

const sendMessage = async function (message, chatId, userId, files, type) {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  const chat = await getChatById(chatId);
  if (!chat) {
    throw new ApiError(400, 'Chat not found');
  }

  console.log('make changes', files);

  const msg = new Message({
    sender: userId,
    chat: chatId,
    receivedBy: [userId],
    readBy: [userId],
    message: message,
    files: type !== 'voice' ? files || [] : [],
    type: type || 'message',
    voiceUrl: type === 'voice' ? files?.[0]?.url : null,
    access: chat.members.map((member) => member),
  });

  await msg.save();

  chat.lastMessage = msg._id;
  await chat.save();

  return getMessageById(msg._id);
};

const getRoomMediaById = async (roomId, userId) => {
  return Message.aggregate([
    { $match: { chat: ObjectId(roomId), access: { $eq: ObjectId(userId) } } },
    { $unwind: '$files' },
    {
      $group: {
        _id: '$chat',
        files: { $push: '$files' },
      },
    },
  ]);
};

const getUnreadCount = async (userId) => {
  console.log('userId: ', userId);
  const chatRooms = await Chat.find({
    members: {
      $in: [userId],
    },
  });
  const chatIds = chatRooms.map((room) => room._id);
  console.log('chatIds: ', chatIds);

  const unreadMessages = await Message.aggregate([
    {
      $match: {
        chat: {
          $in: chatIds,
        },
        readBy: {
          $ne: userId,
        },
        access: { $eq: ObjectId(userId) },
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $group: {
        _id: '$chat',
        chatName: { $last: '$name' },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  let count = 0;
  unreadMessages.forEach((message) => {
    console.log('message is ', message);
    count += message.count;
  });
  console.log('count is ', count);

  return count;
};

const getAvailableChatMembers = async (roomId, currentUserId) => {
  const chat = await getChatRoomByRoomId(roomId);
  if (!chat) {
    throw new ApiError(400, 'Chat room not found');
  }
  const members = chat.members;

  const projectMembers = await ProjectMember.find({
    project: chat.project,
    isInvited: false,
    user: {
      $nin: [...members, currentUserId],
    },
  }).populate([
    {
      path: 'user',
      select: 'firstName surName',
    },
  ]);

  let allMembers = projectMembers?.map((member) => member.user);
  let projectOwners = await projectService.getProjectOwners(chat.project);

  allMembers = filterArray(allMembers?.concat(projectOwners), '_id');

  allMembers = allMembers?.filter((user) => {
    return String(user._id) !== String(currentUserId) && !members.includes(user._id);
  });
  // const invites = await Invite.find({
  //   $or: [
  //     {
  //       to: currentUserId,
  //     },
  //     {
  //       from: currentUserId,
  //     },
  //   ],
  //   status: invitesStatus.ACCEPTED,
  // }).populate([
  //   {
  //     path: 'to',
  //     select: 'firstName surName',
  //   },
  //   {
  //     path: 'from',
  //     select: 'firstName surName',
  //   },
  // ]);
  // console.log('invites', invites);
  // let users = invites.map((invite) => {
  //   let user = invite.to;
  //   if (String(user._id) === currentUserId) {
  //     user = invite.from;
  //   }
  //   return user;
  // });
  // users = users.filter((user) => !members?.includes(user._id));
  return allMembers;
};

const addOrRemoveChatMember = async (roomId, userId, temporary = false) => {
  const chat = await getChatRoomByRoomId(roomId);
  if (!chat) {
    throw new ApiError(400, 'Chat room not found');
  }

  const member = await userService.getUserById(userId);
  if (!member) {
    throw new ApiError(400, 'User not found');
  }
  const index = chat?.members?.findIndex((member) => String(member) === String(userId));
  if (index < 0) {
    await Chat.updateOne({ _id: roomId }, { $addToSet: { members: userId } });
    if (temporary != 'true') {
      // condition runs when adding a permanent member
      await Message.updateMany({ chat: roomId }, { $addToSet: { access: userId } });
    }
    if (member.socketId) {
      global.io.sockets.to(member.socketId).emit(REFRESH_CHAT.value);
    }
    return true;
  } else {
    await Chat.updateOne({ _id: roomId }, { $pull: { members: userId }, $addToSet: { removedMembers: userId } });
    if (member.socketId) {
      global.io.sockets.to(member.socketId).emit(REFRESH_CHAT.value);
    }
    return false;
  }
};

const removeUserCompletely = async function (roomId, userId) {
  return Chat.updateOne({ _id: roomId }, { $pull: { removedMembers: userId } });
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
  setAllMessagesReadByRoomId,
  addOrRemoveChatRoomToFavourite,
  muteOrUnmuteChat,
  replyMessage,
  addOrRemoveMessageToFavourite,
  checkChatAuthorization,
  getPinnedMessages,
  sendMessage,
  getRoomMediaById,
  getUnreadCount,
  addOrRemoveChatMember,
  removeChatForUser,
  getMessageIdsByFilter,
  getMessageByIds,
  getAvailableChatMembers,
  getChatByIdWithMembers,
  createOneToOneChat,
  isChatExist,
  setLastMessagesUnRead,
  getChatByName,
  removeUserCompletely,
};
