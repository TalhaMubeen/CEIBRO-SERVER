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
} = require('../services/project.service');
const ProjectFile = require('../models/ProjectFile.model');

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
  console.log('🚀 ~ file: project.controller.js ~ line 86 ~ editRole ~ roleId', roleId);
  const { name, admin, roles, member, timeProfile } = req.body;

  const newRole = await editProjectRole(roleId, name, admin, roles, member, timeProfile);
  console.log('🚀 ~ file: project.controller.js ~ line 90 ~ editRole ~ newRole', newRole);
  res.status(200).send(newRole);
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

const createFolder = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;
  const folder = await createProjectFolder(name, projectId);
  res.status(200).send(folder);
});

const getProjectFolders = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  const folders = await projectService.getProjectFolders(projectId);
  res.status(200).send(folders);
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
  const folder = await getFolderById(folderId);
  if (!folder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid folder id');
  }
  const files = await getFilesByFolderId(folderId);
  res.status(200).send(files);
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
};
