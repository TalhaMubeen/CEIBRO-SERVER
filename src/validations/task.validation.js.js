const Joi = require('joi');
const { rolesAccess } = require('../config/project.config');

const createTask = {
  params: Joi.object().keys({
    projectId: Joi.string().optional(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    dueDate: Joi.string().optional(),
    assignedTo: Joi.string().optional(),
    admins: Joi.any().optional(),
    // multiTask: Joi.string().optional(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    dueDate: Joi.string().optional(),
    assignedTo: Joi.string().optional(),
    admins: Joi.any().optional(),
    // project: Joi.string().optional(),
    // multiTask: Joi.string().optional(),
  }),
};

const createSubTask = {
  params: Joi.object().keys({
    taskId: Joi.string(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    dueDate: Joi.string().optional(),
    assignedTo: Joi.string().optional(),
    viewer: Joi.any().optional(),
    description: Joi.string().required(),
    imageRequired: Joi.boolean().required(),
    commentRequired: Joi.boolean().required(),
    nudgeBeforeDays: Joi.number().optional(),
    customNudgeTime: Joi.string().optional(),
  }),
};

const updateSubTask = {
  params: Joi.object().keys({
    subTaskId: Joi.string(),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    dueDate: Joi.string().optional(),
    assignedTo: Joi.string().optional(),
    viewer: Joi.any().optional(),
    description: Joi.string().optional(),
    imageRequired: Joi.boolean().optional(),
    commentRequired: Joi.boolean().optional(),
    // nudgeBeforeDays: Joi.number().optional(),
    // customNudgeTime: Joi.string().optional(),
  }),
};

const getTasksList = {
  query: Joi.object().keys({
    dueDate: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    assignedTo: Joi.string(),
    title: Joi.string(),
  }),
};

const subTaskAcceptAction = {
  params: Joi.object().keys({
    subTaskId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    isAccepted: Joi.boolean().required(),
  }),
};

const subTaskCompleteAction = {
  params: Joi.object().keys({
    subTaskId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    isCompleted: Joi.boolean().required(),
    comments: Joi.string().required(),
  }),
};

// const createProjectRole = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     admin: Joi.boolean().required(),
//     memberIds: Joi.any(),
//     roles: Joi.array().items(Joi.string().valid(...rolesAccess)),
//     member: Joi.array().items(Joi.string().valid(...rolesAccess)),
//     timeProfile: Joi.array().items(Joi.string().valid(...rolesAccess)),
//   }),
// };

// const updateProjectRole = {
//   params: Joi.object().keys({
//     roleId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     admin: Joi.boolean().required(),
//     roles: Joi.array().items(Joi.string().valid(...rolesAccess)),
//     member: Joi.array().items(Joi.string().valid(...rolesAccess)),
//     timeProfile: Joi.array().items(Joi.string().valid(...rolesAccess)),
//   }),
// };

// const updateProjectGroup = {
//   params: Joi.object().keys({
//     groupId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//   }),
// };

// const createProjectGroup = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//   }),
// };

// const createTimeProfile = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//   }),
// };

// const createProjectFolder = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     groupId: Joi.string().required(),
//   }),
// };

// const addRemoveFolderUser = {
//   params: Joi.object().keys({
//     folderId: Joi.string(),
//     userId: Joi.string(),
//   }),
// };

// const addMemberToProject = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     roleId: Joi.string().required(),
//     groupId: Joi.string().required(),
//     // subContractor: Joi.string().required(),
//     email: Joi.string().email().required(),
//   }),
// };

// const updateUserRoleAndGroup = {
//   params: Joi.object().keys({
//     projectId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     memberId: Joi.string().required(),
//     roleId: Joi.string().required(),
//     groupId: Joi.string().required(),
//   }),
// };

// const createProjectWork = {
//   params: Joi.object().keys({
//     profileId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     roles: Joi.array().items(Joi.string()).required(),
//     time: Joi.boolean().required(),
//     timeRequired: Joi.boolean().required(),
//     quantity: Joi.boolean().required(),
//     quantityRequired: Joi.boolean().required(),
//     comment: Joi.boolean().required(),
//     commentRequired: Joi.boolean().required(),
//     photo: Joi.boolean().required(),
//     photoRequired: Joi.boolean().required(),
//   }),
// };

// const updateProjectWork = {
//   params: Joi.object().keys({
//     workId: Joi.string(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     roles: Joi.array().items(Joi.string()).required(),
//     time: Joi.boolean().required(),
//     timeRequired: Joi.boolean().required(),
//     quantity: Joi.boolean().required(),
//     quantityRequired: Joi.boolean().required(),
//     comment: Joi.boolean().required(),
//     commentRequired: Joi.boolean().required(),
//     photo: Joi.boolean().required(),
//     photoRequired: Joi.boolean().required(),
//   }),
// };

module.exports = {
  createTask,
  updateTask,
  createSubTask,
  updateSubTask,
  getTasksList,
  subTaskAcceptAction,
  subTaskCompleteAction,
  // getProjectsList,
  // createProjectRole,
  // createProjectGroup,
  // createTimeProfile,
  // createProjectFolder,
  // addRemoveFolderUser,
  // updateProjectRole,
  // updateProjectGroup,
  // addMemberToProject,
  // updateUserRoleAndGroup,
  // createProjectWork,
  // updateProjectWork,
};
