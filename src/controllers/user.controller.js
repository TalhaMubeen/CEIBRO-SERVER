const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, awsService, projectService } = require('../services');
const { invitesStatus } = require('../config/user.config');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en.json');
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
const { bucketFolders } = require('../services/aws.service');
const { mapUsers } = require('../helpers/user.helper');
const { EmailInvite } = require('../models');
const ProjectMember = require('../models/ProjectMember.model');

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
  const { includeMe } = req.query;
  const result = await userService.getAvailableUsers(req.user._id);
  let users = result.map((invite) => {
    let user = invite.to;
    if (String(user._id) === String(req.user._id)) {
      user = invite.from;
    }
    return user;
  });
  if (includeMe === 'true') {
    const user = await userService.getUserById(req.user._id);
    users?.push?.(user);
  }

  let data = mapUsers(users);

  let finalData = data?.filter((user, index) => {
    return data?.findIndex((myUser) => (String(myUser.value) === String(user?.value)) === index);
  });

  res.send(finalData);
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
    projectService.addUserToMyDefaultProject(_id, invite.from);
    projectService.addUserToMyDefaultProject(invite.from, _id);
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
    const allInvites = await userService.getInvitesByUserId(_id);
    await userService.acceptAllInvitations(_id);
    // adding all accepted invites to default project of each other
    allInvites.forEach((invite) => {
      projectService.addUserToMyDefaultProject(_id, invite.from);
      projectService.addUserToMyDefaultProject(invite.from, _id);
    });
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
  let emailInvites = await EmailInvite.find({
    from: _id,
  }).populate('from');
  emailInvites = emailInvites.map((invite) => {
    invite._doc.isEmailInvite = true;
    return invite;
  });
  result = [...result, ...emailInvites];
  res.send(result);
});

const deleteMyConnection = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { connectionId } = req.params;
  const { isEmailInvite } = req.query;

  if (isEmailInvite === 'true') {
    // delete email invite
    await userService.deleteEmailInvite(connectionId, _id);
  } else {
    // delete actual invite
    await userService.deleteMyConnection(connectionId, _id);
  }
  res.status(200).send('connection deleted');
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
  deleteMyConnection,
};
