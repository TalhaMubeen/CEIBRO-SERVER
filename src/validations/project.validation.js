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

const updateProject = {
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
    assignedTo: Joi.string(),
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
    member: Joi.array().items(Joi.string().valid(...rolesAccess)),
    timeProfile: Joi.array().items(Joi.string().valid(...rolesAccess)),
  }),
};

const updateProjectRole = {
  params: Joi.object().keys({
    roleId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    admin: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string().valid(...rolesAccess)),
    member: Joi.array().items(Joi.string().valid(...rolesAccess)),
    timeProfile: Joi.array().items(Joi.string().valid(...rolesAccess)),
  }),
};

const updateProjectGroup = {
  params: Joi.object().keys({
    groupId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const createProjectGroup = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const createTimeProfile = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const createProjectFolder = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    groupId: Joi.string().required(),
  }),
};

const addMemberToProject = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    roleId: Joi.string().required(),
    groupId: Joi.string().required(),
    subContractor: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const updateUserRoleAndGroup = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    memberId: Joi.string().required(),
    roleId: Joi.string().required(),
    groupId: Joi.string().required(),
  }),
};

const createProjectWork = {
  params: Joi.object().keys({
    profileId: Joi.string(),
  }),
  body: Joi.object().keys({
    roles: Joi.array().items(Joi.string()).required(),
    time: Joi.boolean().required(),
    timeRequired: Joi.boolean().required(),
    quantity: Joi.boolean().required(),
    quantityRequired: Joi.boolean().required(),
    comment: Joi.boolean().required(),
    commentRequired: Joi.boolean().required(),
    photo: Joi.boolean().required(),
    photoRequired: Joi.boolean().required(),
  }),
};

const updateProjectWork = {
  params: Joi.object().keys({
    profileId: Joi.string(),
  }),
  body: Joi.object().keys({
    roles: Joi.array().items(Joi.string()).required(),
    time: Joi.boolean().required(),
    timeRequired: Joi.boolean().required(),
    quantity: Joi.boolean().required(),
    quantityRequired: Joi.boolean().required(),
    comment: Joi.boolean().required(),
    commentRequired: Joi.boolean().required(),
    photo: Joi.boolean().required(),
    photoRequired: Joi.boolean().required(),
  }),
};

module.exports = {
  createProject,
  updateProject,
  getProjectsList,
  createProjectRole,
  createProjectGroup,
  createTimeProfile,
  createProjectFolder,
  updateProjectRole,
  updateProjectGroup,
  addMemberToProject,
  updateUserRoleAndGroup,
  createProjectWork,
  updateProjectWork,
};
