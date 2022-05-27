const Joi = require('joi');

const createChatRoom = {
  body: Joi.object().keys({
    name: Joi.string(),
    members: Joi.array().items(Joi.string()).required(),
    projectId: Joi.string(),
  }),
};

const createOneToOneChat = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const sendMessage = {
  body: Joi.object().keys({
    message: Joi.string(),
    chat: Joi.string().required(),
    messageId: Joi.string(),
    type: Joi.string().valid('message', 'questioniar', 'voice').optional(),
  }),
};

const forwardMessage = {
  body: Joi.object().keys({
    messageId: Joi.string(),
    chatIds: Joi.array().items(Joi.string()).required(),
  }),
};

module.exports = {
  createChatRoom,
  createOneToOneChat,
  sendMessage,
};
