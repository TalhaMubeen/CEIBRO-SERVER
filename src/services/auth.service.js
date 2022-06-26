const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes, otpTypes } = require('../config/tokens');
const { EmailInvite, Invite, User, Project } = require('../models');
const ProjectMember = require('../models/ProjectMember.model');
const Otp = require('../models/otp.model');
const Group = require('../models/group.model');
const moment = require('moment');
const emailService = require('./email.service');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (!user.isEmailVerified) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Please verify you email address');
  }

  if (user.isLocked) {
    if (user.lockedUntil) {
      const startTime = moment();
      const endTime = moment(user.lockedUntil);
      if (moment.duration(endTime.diff(startTime)).asMinutes() < 0) {
        user.isLocked = false;
        await user.save();
      } else {
        const wait = moment.duration(endTime.diff(startTime)).asMinutes();
        throw new ApiError(httpStatus.LOCKED, `Account locked. Retry after ${parseInt(wait)} minutes `);
      }
    }
  }
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    user.wrongAttempts = (user.wrongAttempts || 0) + 1;
    if (user.wrongAttempts >= 2) {
      user.isLocked = true;
      user.wrongAttempts = 0;
      user.lockedUntil = moment().add(15, 'minutes');
      await emailService.sendAccountLockedEmail(user.email, user.firstName + ' ' + user.surName);
    }
    user.save();
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    console.log('error: ', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    if (verifyEmailToken) {
      const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
      const user = await userService.getUserById(verifyEmailTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await Promise.all([
        Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL }),
        userService.updateUserById(user.id, { isEmailVerified: true }),
        User.createDefultProject(user.id),
      ]);
      const emailInvites = await EmailInvite.find({ email: user.email });
      emailInvites.map((emailInvite) => {
        const myInvite = new Invite({
          from: emailInvite._doc.from,
          to: user._id,
        });
        return myInvite.save();
      });
      await EmailInvite.deleteMany({ email: user.email });

      const members = await ProjectMember.find({
        isInvited: true,
        invitedEmail: user.email,
      });
      const inviteGroupIds = members?.map?.((member) => member?.group);

      await Group.updateMany(
        {
          _id: {
            $in: inviteGroupIds,
          },
        },
        {
          $addToSet: {
            members: user._id,
          },
        }
      );

      const updateMember = await ProjectMember.updateMany(
        {
          isInvited: true,
          invitedEmail: user.email,
        },
        {
          isInvited: false,
          user: user._id,
        }
      );
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('error: ', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
