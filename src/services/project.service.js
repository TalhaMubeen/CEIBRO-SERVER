const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async (projectBody) => Project.create(projectBody);
// {
//   return Project.create(projectBody);
// };

/**
 * Query for Projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

/**
 * Get  by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async (id) => {
  const project = await Project.findById(id).populate({
    path: 'members',
    select: 'firstName surName profilePic',
  });
  if (!project) {
    throw new ApiError(400, 'Invalid project');
  }
  return project;
};

const getAllProjects = () => {
  return Project.find({}, { name: 1 });
};

/**
 * Get by email
 * @param {string} email
 * @returns {Promise<Project>}
 */
const getProjectByOwner = async (email) => Project.findOne({ owner: email });
// {
//   return User.findOne({ email });
// };

/**
 * Update Project by id
 * @param {ObjectId} ProjectId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  Object.assign(project, updateBody);
  await project.save();
  return project;
};

/**
 * Delete  by id
 * @param {ObjectId} projectId
 * @returns {Promise<Project>}
 */
const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  getProjectByOwner,
  updateProjectById,
  deleteProjectById,
  getAllProjects,
};
