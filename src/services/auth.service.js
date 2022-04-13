const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes, otpTypes } = require('../config/tokens');
const { EmailInvite, Invite } = require('../models');
const ProjectMember = require('../models/ProjectMember.model');
const Otp = require('../models/otp.model');

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
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please verify you email address');
  }
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
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
const resetPassword = async (otpToken, newPassword) => {
  try {
    const otp = await Otp.findOne({ otp: otpToken, type: otpTypes.RESET_PASSWORD });
    if (otp) {
      const user = await userService.getUserById(otp.user);
      if (!user) {
        throw new Error();
      }
      await userService.updateUserById(user.id, { password: newPassword });
      await Otp.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    } else {
      throw new Error();
    }
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
const verifyEmail = async (otpToken) => {
  try {
    const otp = await Otp.findOne({ otp: otpToken, type: otpTypes.VERIFY_EMAIL });
    if (otp) {
      const user = await userService.getUserById(otp.user);
      if (!user) {
        throw new Error();
      }
      await Otp.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
      await userService.updateUserById(user.id, { isEmailVerified: true });

      const emailInvites = await EmailInvite.find({ email: user.email });
      emailInvites.map((emailInvite) => {
        const myInvite = new Invite({
          from: emailInvite._doc.from,
          to: user._id,
        });
        return myInvite.save();
      });

      const memebrst = await ProjectMember.find({
        isInvited: true,
        invitedEmail: user.email,
      });
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
