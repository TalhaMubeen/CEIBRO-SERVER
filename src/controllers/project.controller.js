const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const awsService = require('../services/aws.service');
const { bucketFolders } = require('../services/aws.service');

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
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
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

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  getAllProjects,
  getProjects,
};
