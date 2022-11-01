const Joi = require('joi');
const { rolesAccess, roleTypesEnum } = require('../config/project.config');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    location: Joi.string().optional(),
    owner: Joi.any().optional(),
    dueDate: Joi.string().optional(),
    publishStatus: Joi.string().optional(),
  }),
};

const updateProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    location: Joi.string().optional(),
    owner: Joi.any().optional(),
    dueDate: Joi.string().optional(),
    publishStatus: Joi.string().optional(),
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
    // admin: Joi.boolean().required(),
    // memberIds: Joi.any(),
    roleType: Joi.string().valid(...roleTypesEnum).required(),
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
    // admin: Joi.boolean().required(),   
    roleType: Joi.string().valid(...roleTypesEnum).required(),
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

const addRemoveFolderUser = {
  params: Joi.object().keys({
    folderId: Joi.string(),
    userId: Joi.string(),
  }),
};

const addMemberToProject = {
  params: Joi.object().keys({
    projectId: Joi.string(),
  }),
  body: Joi.object().keys({
    roleId: Joi.string().required(),
    groupId: Joi.string().required(),
    // subContractor: Joi.string().required(),
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
    name: Joi.string().required(),
    location: Joi.string().custom(objectId),
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
    workId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
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

const createLocation = {
  params: Joi.object().keys({
    timeProfileId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    parent: Joi.string().optional(),
    isInternal: Joi.boolean().required(),
  }),
};

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
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
  addRemoveFolderUser,
  updateProjectRole,
  updateProjectGroup,
  addMemberToProject,
  updateUserRoleAndGroup,
  createProjectWork,
  updateProjectWork,
  createLocation,
  updateLocation
};
