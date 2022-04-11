const httpStatus = require('http-status');
const { rolesAccess, avaialablePermissions } = require('../config/project.config');
const { projectService } = require('../services');
const { getRoleById, isMemberExistInProject, getProjectMemberById } = require('../services/project.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const validateCreateRole = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  console.log('permissions: ', permissions);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.create_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'create role not allowed');
  }
});

const validateUpdateRole = catchAsync(async (req, res, next) => {
  const { roleId } = req.params;
  const role = await getRoleById(roleId);
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, role?.project);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.edit_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'edit role not allowed');
  }
});

const validateDeleteRole = catchAsync(async (req, res, next) => {
  const { roleId } = req.params;
  const role = await getRoleById(roleId);
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, role?.project);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.delete_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'delete role not allowed');
  }
});

const validateCreateMember = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin || permissions?.member?.includes?.(avaialablePermissions.create_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'create member not allowed');
  }
});

const validateUpdateMember = catchAsync(async (req, res, next) => {
  const { memberId } = req.body;
  const { _id } = req.user;
  const member = await getProjectMemberById(memberId);
  if (!member) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid member id');
  }
  const role = await getRoleById(member.role);
  const permissions = await projectService.getProjectPermissions(_id, role.project);
  if (permissions.admin || permissions?.member?.includes?.(avaialablePermissions.edit_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'edit member not allowed');
  }
});

const validateDeleteMember = catchAsync(async (req, res, next) => {
  const { memberId } = req.params;
  const { _id } = req.user;
  console.log('project is ', memberId);
  const member = await getProjectMemberById(memberId);
  console.log('member: ', member);
  if (!member) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid member id');
  }
  const role = await getRoleById(member.role);
  const permissions = await projectService.getProjectPermissions(_id, role.project);
  if (permissions.admin || permissions?.member?.includes?.(avaialablePermissions.delete_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'delete member not allowed');
  }
});

const validateCreateTimeProfile = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin || permissions?.timeProfile?.includes?.(avaialablePermissions.create_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'create time profile not allowed');
  }
});

const validateUpdateTimeProfile = catchAsync(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await projectService.isTimeProfileExist(profileId);

  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, profile.project);
  if (permissions.admin || permissions?.timeProfile?.includes?.(avaialablePermissions.edit_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'edit time profile not allowed');
  }
});

const validateDeleteTimeProfile = catchAsync(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await projectService.isTimeProfileExist(profileId);

  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, profile.project);
  if (permissions.admin || permissions?.timeProfile?.includes?.(avaialablePermissions.delete_permission)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'delete time profile not allowed');
  }
});

module.exports = {
  validateCreateRole,
  validateUpdateRole,
  validateDeleteRole,
  validateCreateMember,
  validateUpdateMember,
  validateDeleteMember,
  validateCreateTimeProfile,
  validateUpdateTimeProfile,
  validateDeleteTimeProfile,
};
