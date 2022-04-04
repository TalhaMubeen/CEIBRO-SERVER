const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const awsService = require('../services/aws.service');
const { bucketFolders } = require('../services/aws.service');
const {
  createProjectRole,
  editProjectRole,
  getProjectById,
  createProjectGroup,
  createProjectFolder,
  getFolderById,
  getFilesByFolderId,
  isGroupExist,
  getProjectMemberByRoleAndGroup,
  getProjectMemberByEmailRoleAndGroup,
  getRoleById,
  getProjectMembersById,
  getProjectMemberById,
  updateMemberGroupAndRole,
  editProjectGroup,
  createProjectTimeProfile,
  isTimeProfileExist,
  editProjectTimeProfile,
} = require('../services/project.service');
const ProjectFile = require('../models/ProjectFile.model');
const { isUserExist, getUserByEmail } = require('../services/user.service');
const { escapeRegex } = require('../helpers/query.helper');

const createProject = catchAsync(async (req, res) => {
  if (req.file) {
    const file = req.file;
    const path = await awsService.uploadFile(file, bucketFolders.PROJECT_FOLDER);
    req.body.projectPhoto = path.url;
  }
  const project = await projectService.createProject(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'publishStatus']);
  const search = pick(req.query, ['dueDate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (search.dueDate) {
    filter.dueDate = {
      $lte: search.dueDate,
    };
  }

  if (filter.publishStatus) {
    filter.publishStatus = filter.publishStatus.toLowerCase();
  }

  if (filter.publishStatus === 'all') {
    delete filter.publishStatus;
  }

  options.populate = 'owner';
  console.log('filters are', filter, req.query);
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await projectService.getAllProjects();
  res.send(result);
});

const getProjectMembers = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const project = await projectService.getProjectById(projectId);
  let members = project.members;
  members = members?.filter?.((member) => String(member.id) !== String(_id)) || [];
  res.send(members);
});

const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectById(req.params.projectId, req.body);
  res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProjectById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createRole = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name, admin, roles, member, timeProfile } = req.body;
  const role = await createProjectRole(name, admin, roles, member, timeProfile, projectId);
  res.status(200).send(role);
});

const getProjectRoles = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const roles = await projectService.getProjectRoles(projectId);
  res.status(200).send(roles);
});

const editRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const { name, admin, roles, member, timeProfile } = req.body;

  const newRole = await editProjectRole(roleId, name, admin, roles, member, timeProfile);
  res.status(200).send(newRole);
});

const getRoleDetail = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const role = await getRoleById(roleId);
  res.status(200).send(role);
});

const getGroupDetail = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const group = await isGroupExist(groupId);
  res.status(200).send(group);
});

const editGroup = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const { name } = req.body;
  const newGroup = await editProjectGroup(groupId, name);
  res.status(200).send(newGroup);
});

const createGroup = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;
  const group = await createProjectGroup(name, projectId);
  res.status(200).send(group);
});

const getProjectGroups = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const groups = await projectService.getProjectGroups(projectId);
  res.status(200).send(groups);
});

const createTimeProfile = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;
  const timeProfile = await createProjectTimeProfile(name, projectId);
  res.status(200).send(timeProfile);
});

const getProjectTimeProfiles = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const timeProfiles = await projectService.getProjectTimeProfiles(projectId);
  res.status(200).send(timeProfiles);
});

const getTimeProfileDetail = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  const timeProfile = await isTimeProfileExist(profileId);
  res.status(200).send(timeProfile);
});

const editTimeProfile = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  const { name } = req.body;
  const newTimeProfile = await editProjectTimeProfile(profileId, name);
  res.status(200).send(newTimeProfile);
});

const createFolder = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name, groupId } = req.body;
  const folder = await createProjectFolder(name, groupId, projectId);
  res.status(200).json({
    data: folder,
  });
});

const getProjectFolders = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { search } = req.query;
  let filter = {};
  if (search) {
    const regex = new RegExp(escapeRegex(search), 'gi');
    filter = {
      ...filter,
      name: regex,
    };
  }
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const folders = await projectService.getProjectFolders(projectId, filter);
  const data = folders.map((folder) => {
    return {
      name: folder.name,
      id: folder._id,
      group: folder.group,
      createdAt: folder.createdAt,
    };
  });
  res.status(200).send(data);
});

const uploadFileToFolder = catchAsync(async (req, res) => {
  const { folderId } = req.params;
  if (!req.file) {
    throw new ApiError();
  }
  const folder = await getFolderById(folderId);
  if (!folder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid folder id');
  }
  const path = await awsService.uploadFile(req.file, bucketFolders.PROJECT_FOLDER);
  const file = new ProjectFile({
    name: path?.fileName,
    fileType: path?.fileType,
    url: path?.url,
    uploadedBy: req.user._id,
    access: [req.user._id],
    project: folder.project,
    folder: folderId,
  });
  await file.save();
  res.status(200).send(file);
});

const getFolderAllFiles = catchAsync(async (req, res) => {
  const { folderId } = req.params;
  const { search } = req.query;
  const folder = await getFolderById(folderId);
  if (!folder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid folder id');
  }
  let filter = {};
  if (search) {
    const regex = new RegExp(escapeRegex(search), 'gi');
    filter = {
      ...filter,
      name: regex,
    };
  }
  const files = await getFilesByFolderId(folderId, filter);
  const data = files?.map((file) => {
    return {
      id: file._id,
      access: file.access,
      name: file.name,
      fileType: file.fileType,
      url: file.url,
      uploadedBy: file.uploadedBy,
      folder: file.folder,
      createdAt: file.createdAt,
    };
  });
  res.status(200).send(data);
});

const getProjectAllMembers = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const members = await getProjectMembersById(projectId);
  res.status(200).send(members);
});

const addMemberToProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { groupId, subContractor, roleId, email } = req.body;

  await getRoleById(roleId);
  await isGroupExist(groupId);
  await isGroupExist(subContractor);
  const member = await getUserByEmail(email);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }

  if (member) {
    const alreadyMember = await getProjectMemberByRoleAndGroup(member._id, groupId, roleId, subContractor, projectId);
    if (alreadyMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Member already exist');
    }
    const newMember = await projectService.addMemberToProject(member._id, groupId, roleId, subContractor, projectId);
    res.status(200).send(newMember);
  } else {
    const alreadyMember = await getProjectMemberByEmailRoleAndGroup(email, groupId, roleId, subContractor, projectId);
    if (alreadyMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Member already exist');
    }
    const newMember = await projectService.sendProjectInviteByEmail(
      email,
      groupId,
      roleId,
      subContractor,
      projectId,
      req.user._id
    );
    res.status(200).send('Invitation sent to user');
  }
});

const updateMemberRoleAndGroup = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { groupId, roleId, memberId } = req.body;

  await getRoleById(roleId);
  await isGroupExist(groupId);
  const member = await getProjectMemberById(memberId);

  if (!member) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid member id');
  }

  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }

  await updateMemberGroupAndRole(groupId, roleId, memberId);
  res.status(200).send('updated successfully');
});

const createWork = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  const { name, roles, time, timeRequired, quantity, quantityRequired, comment, commentRequired, photo, photoRequired } =
    req.body;
  const work = await projectService.createProfileWork(
    profileId,
    name,
    roles,
    time,
    timeRequired,
    quantity,
    quantityRequired,
    comment,
    commentRequired,
    photo,
    photoRequired
  );
  res.status(200).send(work);
});

const getProfileWorks = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  await isTimeProfileExist(profileId);

  const works = await projectService.getProfileWorks(profileId);
  res.status(200).send(works);
});

const editProfileWork = catchAsync(async (req, res) => {
  const { workId } = req.params;
  const { name, roles, time, timeRequired, quantity, quantityRequired, comment, commentRequired, photo, photoRequired } =
    req.body;

  const newWork = await projectService.editProfileWork(
    workId,
    name,
    roles,
    time,
    timeRequired,
    quantity,
    quantityRequired,
    comment,
    commentRequired,
    photo,
    photoRequired
  );
  res.status(200).send(newWork);
});

const getWorkDetail = catchAsync(async (req, res) => {
  const { workId } = req.params;
  const work = await projectService.isWorkExist(workId);
  res.status(200).send(work);
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  getAllProjects,
  getProjects,
  editRole,
  createRole,
  getProjectRoles,
  createGroup,
  getProjectGroups,
  createFolder,
  getProjectFolders,
  uploadFileToFolder,
  getFolderAllFiles,
  addMemberToProject,
  getProjectAllMembers,
  updateMemberRoleAndGroup,
  getRoleDetail,
  getGroupDetail,
  editGroup,
  createTimeProfile,
  getProjectTimeProfiles,
  getTimeProfileDetail,
  editTimeProfile,
  createWork,
  editProfileWork,
  getWorkDetail,
  getProfileWorks,
};
