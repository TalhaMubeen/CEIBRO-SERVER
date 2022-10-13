const httpStatus = require('http-status');
const emailService = require('./email.service');
const { User, EmailInvite } = require('../models');
const ApiError = require('../utils/ApiError');
const Invite = require('../models/invite.model');
const { invitesStatus } = require('../config/user.config');
const { BAD_REQUEST } = require('http-status');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ $or: [
    {
      email
    },
    {
      username: email
    }
  ] });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const getInvitation = async (from, to) => {
  return Invite.findOne({
    from,
    to,
  });
};

/**
 * Invite user by email
 * @param {ObjectId} email
 * @returns {Promise<User>}
 */
const inviteUserByEmail = async (email, currentUserId) => {
  const currentUser = await getUserById(currentUserId);
  const user = await getUserByEmail(email);

  if (user && String(currentUser._id) === String(user._id)) {
    throw new ApiError(BAD_REQUEST, 'User cannot invite himeself');
  }

  if (!user) {
    // if email not exists in users then sent him an email invite
    const name = currentUser.firstName + ' ' + currentUser.surName;
    const emailInvite = new EmailInvite({
      from: currentUserId,
      email: email,
    });
    await emailInvite.save();
    await emailService.sendInvitationEmail(email, name, currentUser.email);
  } else {
    if (String(currentUser._id) === String(user._id)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot send invite to yourself');
    }
    // if email exist then create invite for him
    const inviteExist = await getInvitation(currentUser._id, user._id);
    if (!inviteExist) {
      const myInvite = new Invite({
        from: currentUser._id,
        to: user._id,
      });
      await myInvite.save();
    } else {
      inviteExist.status = invitesStatus.PENDING;
      await inviteExist.save();
    }
  }
  return;
};

const getInvitesByUserId = async (currentUserId) => {
  return Invite.find({
    to: currentUserId,
    status: invitesStatus.PENDING,
  }).populate('to from');
};

const getInvitesCountByUserId = async (currentUserId) => {
  return Invite.count({
    to: currentUserId,
    status: invitesStatus.PENDING,
  });
};

const getInviteById = async (inviteId) => {
  return Invite.findOne({
    _id: inviteId,
  });
};

const getPendingInvitesByUserId = async (inviteId) => {
  return Invite.find({
    _id: inviteId,
    status: invitesStatus.PENDING,
  });
};

const acceptAllInvitations = async (currentUserId) => {
  return Invite.updateMany(
    {
      to: currentUserId,
      status: invitesStatus.PENDING,
    },
    {
      status: invitesStatus.ACCEPTED,
    }
  );
};

const rejectAllInvitations = async (currentUserId) => {
  return Invite.updateMany(
    {
      to: currentUserId,
      status: invitesStatus.PENDING,
    },
    {
      status: invitesStatus.REJECTED,
    }
  );
};

const getConnectionsByUserId = async (currentUserId) => {
  return Invite.find({
    $or: [
      {
        to: currentUserId,
      },
      {
        from: currentUserId,
      },
    ],
    status: {
      $in: [invitesStatus.ACCEPTED, invitesStatus.PENDING],
    },
  }).populate('to from');
};

const deleteMyConnection = async (connectionId, currentUserId) => {
  const connection = await Invite.findOne({
    $or: [
      {
        to: currentUserId,
      },
      {
        from: currentUserId,
      },
    ],
    _id: connectionId,
  });
  if (!connection) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid connection id');
  }
  return connection.remove();
};

const deleteEmailInvite = async (inviteId, currentUserId) => {
  const emailInvite = await EmailInvite.findOne({
    from: currentUserId,
    _id: inviteId,
  });
  if (!emailInvite) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email invite');
  }
  return emailInvite.remove();
};

const getConnectionsCountByUserId = async (currentUserId) => {
  return Invite.count({
    $or: [
      {
        to: currentUserId,
      },
      {
        from: currentUserId,
      },
    ],
    status: invitesStatus.ACCEPTED,
  });
};

const getAvailableUsers = async (currentUserId) => {
  return Invite.find({
    $or: [
      {
        to: currentUserId,
      },
      {
        from: currentUserId,
      },
    ],
    status: invitesStatus.ACCEPTED,
  }).populate([
    {
      path: 'to',
      select: 'firstName surName',
    },
    {
      path: 'from',
      select: 'firstName surName',
    },
  ]);
};

const isUserExist = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, 'Invalid user');
  }
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getAvailableUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  inviteUserByEmail,
  getInvitesByUserId,
  getInvitesCountByUserId,
  getInviteById,
  getPendingInvitesByUserId,
  rejectAllInvitations,
  acceptAllInvitations,
  getConnectionsByUserId,
  getConnectionsCountByUserId,
  isUserExist,
  deleteMyConnection,
  deleteEmailInvite,
};
