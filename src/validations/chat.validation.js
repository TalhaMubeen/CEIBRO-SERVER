const Joi = require('joi');

const createChatRoom = {
  body: Joi.object().keys({
    name: Joi.string(),
    members: Joi.array().items(Joi.string()).required(),
    projectId: Joi.string()
  })
};

module.exports = {
  createChatRoom,
};
