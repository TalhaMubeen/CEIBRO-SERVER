const Joi = require('joi');

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
       location: Joi.string(),
    owner: Joi.any(),
    dueDate: Joi.string(),
    projectStatus: Joi.string(),
  }),
};


const getProjectsList = {
  query: Joi.object().keys({
    dueDate: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    title: Joi.string(),
    publishStatus: Joi.string()
  })
};

module.exports = {
  createProject,
  getProjectsList
};
