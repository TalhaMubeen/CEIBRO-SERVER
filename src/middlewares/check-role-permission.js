const httpStatus = require('http-status');
const { rolesAccess, avaialablePermissions } = require('../config/project.config');
const { projectService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const validateCreateRole = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.create_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'create role not allowed');
  }
});

const validateUpdateRole = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.create_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'create role not allowed');
  }
});

module.exports = {
  validateCreateRole,
};
