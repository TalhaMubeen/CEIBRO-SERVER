const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, awsService } = require('../services');
const { invitesStatus } = require('../config/user.config');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en.json');
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
const { bucketFolders } = require('../services/aws.service');
const { mapUsers } = require('../helpers/user.helper');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  console.log('user: ', user);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getAvailableUsers = catchAsync(async (req, res) => {
  const result = await userService.getAvailableUsers();
  res.send(mapUsers(result));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getMyProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const user = await userService.getUserById(_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateMyProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;
  console.log('req body is ', req.body);
  const user = await userService.getUserById(_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const newUser = await userService.updateUserById(_id, req.body);
  res.send(newUser);
});

const updateUserProfilePic = catchAsync(async (req, res) => {
  const { _id: myUserId } = req.user;
  const file = req.file;
  const path = await awsService.uploadFile(file, bucketFolders.USER_FOLDER);
  const user = await userService.getUserById(myUserId);
  user.profilePic = path.url;
  await user.save();
  res.status(200).send('profile pic updated successfully');
});

const inviteUser = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { email } = req.body;

  await userService.inviteUserByEmail(email, _id);
  res.send('Invitation sent');
});

const getMyInvites = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const invites = await userService.getInvitesByUserId(_id);

  const result = invites.map((invite) => {
    return {
      status: invite.status,
      _id: invite._id,
      from: invite.from,
      createdAt: timeAgo.format(invite.createdAt, 'mini'),
    };
  });
  res.send(result);
});

const getMyInvitesCount = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const invites = await userService.getInvitesCountByUserId(_id);
  res.send(invites.toString());
});

const acceptInvite = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { accepted, inviteId } = req.params;
  const invite = await userService.getInviteById(inviteId);
  if (!invite || String(invite.to) !== String(_id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid invite id');
  }
  if (invite.status !== invitesStatus.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invite status not pending');
  }

  let accept = false;

  if (accepted == 'true') {
    accept = true;
    invite.status = invitesStatus.ACCEPTED;
  }
  if (accepted == 'false') {
    invite.status = invitesStatus.REJECTED;
  }
  await invite.save();

  res.send(`Invite ${accept ? 'accepted' : 'rejected'} `);
});

const acceptAllInvites = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { accepted } = req.params;
  if (accepted === 'true') {
    await userService.acceptAllInvitations(_id);
  } else {
    await userService.rejectAllInvitations(_id);
  }

  res.send(`Invites ${accepted ? 'accepted' : 'rejected'} `);
});

const getMyConnections = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const invites = await userService.getConnectionsByUserId(_id);
  let result = invites.map((invite) => {
    if (String(_id) === String(invite?.from?._id)) {
      invite._doc.sentByMe = true;
    } else {
      invite._doc.sentByMe = false;
    }
    return invite;
  });
  console.log('invites: ', result);
  res.send(result);
});

const getMyConnectionsCount = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const invites = await userService.getConnectionsCountByUserId(_id);
  res.send(invites.toString());
});

module.exports = {
  createUser,
  getUsers,
  getAvailableUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  inviteUser,
  getMyInvites,
  getMyInvitesCount,
  acceptInvite,
  acceptAllInvites,
  getMyConnections,
  getMyConnectionsCount,
  updateUserProfilePic,
};
