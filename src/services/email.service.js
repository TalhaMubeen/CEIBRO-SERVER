const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const {
  getVerifyEmailTemplate,
  getResetPasswordTemplate,
  getInviationEmailTemplate,
  getAccountLockTemplate,
} = require('../helpers/email.helper');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: `"Ceibro Team" ${config.email.from}`, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const text = ``;

  const html = getResetPasswordTemplate(resetPasswordUrl);
  await sendEmail(to, subject, text, html);
};

/**
 * Send invitation email
 * @param {string} to
 * @param {string} fromName
 * @param {string} fromEmail
 * @returns {Promise}
 */
const sendInvitationEmail = async (to, fromName, fromEmail) => {
  const subject = 'Ceibro invite';
  const url = `${process.env.FRONTEND_URL}`;
  const text = ``;

  console.log('senfing ', url, text);

  const html = getInviationEmailTemplate(url, fromName, fromEmail);
  await sendEmail(to, subject, text, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `${process.env.FRONTEND_URL}/login?token=${token}`;
  const text = ``;
  const html = getVerifyEmailTemplate(verificationEmailUrl);
  await sendEmail(to, subject, text, html);
};

const sendAccountLockedEmail = async (to, name) => {
  const subject = 'Account locked';
  const text = ``;
  const html = getAccountLockTemplate(name);
  await sendEmail(to, subject, text, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendAccountLockedEmail,
  sendInvitationEmail,
};
