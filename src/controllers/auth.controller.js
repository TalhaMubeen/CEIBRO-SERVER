const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const Product = require('../models/project.model');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const verifyEmailOtp = await tokenService.generateVerifyEmailOtp(user._id);
  await emailService.sendVerificationEmail(user.email, verifyEmailOtp);
  res.status(httpStatus.CREATED).send('Verification email sent');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordOtp = await tokenService.generateResetPasswordOtp(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordOtp);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.otp, req.body.password);
  res.status(httpStatus.OK).send('Done');
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email not registered');
  }
  if (user.isEmailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already verified');
  }

  const otp = await tokenService.generateVerifyEmailOtp(user._id);
  await emailService.sendVerificationEmail(user.email, otp);
  res.send('Verification email sent');
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.otp);
  res.send('Email verified');
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
