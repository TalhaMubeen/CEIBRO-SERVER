const httpStatus = require('http-status');
const { rolesAccess, avaialablePermissions, roleTypes } = require('../config/project.config');
const { projectService } = require('../services');
const { getRoleById, isMemberExistInProject, getProjectMemberById } = require('../services/project.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const validateCreateRole = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { roleType } = req.body;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin) {
    next();
  }
  if (permissions.isSubContractor) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Create role not allowed");
  }
  if (permissions?.roles?.includes?.(avaialablePermissions.create_permission)) {
    next();
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Create role not allowed');
});

const validateUpdateRole = catchAsync(async (req, res, next) => {
  const { roleId } = req.params;
  const { roleType } = req.body;
  const { _id } = req.user;
  const role = await getRoleById(roleId);
  const permissions = await projectService.getProjectPermissions(_id, role?.project);
  if (permissions.admin || permissions?.roles?.includes?.(avaialablePermissions.edit_permission)) {
    next();
  }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Edit role not allowed');
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
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete role not allowed');
  }
});

const validateCreateMember = catchAsync(async (req, res, next) => {
  // admin is allowed
  // individual and sub-contractor will only be allowed if they have permission
  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (
    permissions.admin || (permissions.isIndividual && permissions?.member?.includes?.(avaialablePermissions.create_permission)) || (permissions.isSubContractor && permissions?.member?.includes?.(avaialablePermissions.create_permission))
  ) {
    next();
  }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create member not allowed');
  }
});

const validateUpdateMember = catchAsync(async (req, res, next) => {
  // admin is allowed to updaste member
  // individual is allowed if he have permission
  // subContractor is allwed if have permission and member is created by hime

  const { memberId } = req.body;
  const { _id } = req.user;
  const member = await getProjectMemberById(memberId);
  if (!member) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid member id');
  }
  const role = await getRoleById(member.role);
  const permissions = await projectService.getProjectPermissions(_id, role.project);
  if (permissions.admin || (permissions.isIndividual && permissions?.member?.includes?.(avaialablePermissions.edit_permission))) {
    next();
  }
  else if (permissions.isSubContractor && permissions?.member?.includes?.(avaialablePermissions.edit_permission)) {
    // Now check if project member createdBy me
    if (String(member.createdBy) === String(_id)) {
      next();
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not allowed to edit this member');
    }
  }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Edit member not allowed');
  }
});

const validateDeleteMember = catchAsync(async (req, res, next) => {
  // admin is allowed to delete member
  // individual is allowed if he have permission
  // subContractor is allwed if have permission and member is created by hime

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
  if (permissions.admin || (permissions.isIndividual && permissions?.member?.includes?.(avaialablePermissions.delete_permission))) {
    next();
  }
  else if (permissions.isSubContractor && permissions?.member?.includes?.(avaialablePermissions.delete_permission)) {
    // Now check if project member createdBy me
    if (String(member.createdBy) === String(_id)) {
      next();
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not allowed to delete this member');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete member not allowed');
  }
});

const validateCreateTimeProfile = catchAsync(async (req, res, next) => {
  // admin is allowed to delete create
  // individual and subContractor are allowed if he have permission

  const { projectId } = req.params;
  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, projectId);
  if (permissions.admin || (permissions.isIndividual && permissions?.timeProfile?.includes?.(avaialablePermissions.create_permission)) || (permissions.isSubContractor && permissions?.timeProfile?.includes?.(avaialablePermissions.create_permission))) {
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
  if (permissions.admin || (permissions.isIndividual && permissions?.timeProfile?.includes?.(avaialablePermissions.edit_permission))) {
    next();
  }
  else if (permissions.isSubContractor && permissions?.timeProfile?.includes?.(avaialablePermissions.edit_permission)) {
    // Now check if time profile createdBy me
    if (String(profile.createdBy) === String(_id)) {
      next();
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not allowed to edit this time profile');
    }
  }
  else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Edit time profile not allowed');
  }
});

const validateDeleteTimeProfile = catchAsync(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await projectService.isTimeProfileExist(profileId);

  const { _id } = req.user;
  const permissions = await projectService.getProjectPermissions(_id, profile.project);
  if (permissions.admin || (permissions.isIndividual && permissions?.timeProfile?.includes?.(avaialablePermissions.delete_permission))) {
    next();
  }
  else if (permissions.isSubContractor && permissions?.timeProfile?.includes?.(avaialablePermissions.delete_permission)) {
    // Now check if time profile createdBy me
    if (String(profile.createdBy) === String(_id)) {
      next();
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not allowed to delete this time profile');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete time profile not allowed');
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
