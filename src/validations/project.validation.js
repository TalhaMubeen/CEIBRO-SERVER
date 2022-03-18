const Joi = require('joi');

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    location: Joi.string(),
    owner: Joi.any(),
    dueDate: Joi.string(),
  }),
};

module.exports = {
  createProject,
};
