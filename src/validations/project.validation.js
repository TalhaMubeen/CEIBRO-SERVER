const Joi = require('joi');
const { rolesAccess } = require('../config/project.config');

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
    publishStatus: Joi.string(),
  }),
};

const createProjectRole = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    admin: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string().valid(...rolesAccess)),
    member: Joi.boolean(),
    timeProfile: Joi.boolean(),
  }),
};

const updateProjectRole = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    admin: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string().valid(...rolesAccess)),
    member: Joi.boolean(),
    timeProfile: Joi.boolean(),
  }),
};

module.exports = {
  createProject,
  getProjectsList,
  createProjectRole,
  updateProjectRole,
};
