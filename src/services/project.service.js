const httpStatus = require('http-status');
const { Project } = require('../models');
const Folder = require('../models/folder.model');
const Group = require('../models/group.model');
const ProjectFile = require('../models/ProjectFile.model');
const Role = require('../models/role.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */

const createProject = async (projectBody, currentUserId) => {
  return Project.create(projectBody);
};

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
  const project = await Project.findById(id).populate([
    {
      path: 'members',
      select: 'firstName surName profilePic',
    },
    {
      path: 'owner',
      select: 'firstName surName',
    },
  ]);
  if (!project) {
    throw new ApiError(400, 'Invalid project');
  }
  return project;
};

const getRoleById = async (id) => {
  const role = await Role.findById(id);
  if (!role) {
    throw new ApiError(400, 'Invalid role');
  }
  return role;
};

const getAllProjects = () => {
  return Project.find({}, { title: 1 });
};

const getProjects = () => {
  return Project.paginate();
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

const getRoleByProjectAndName = (name, projectId) => {
  return Role.findOne({
    name,
    project: projectId,
  });
};

const getGroupByProjectAndName = (name, projectId) => {
  return Group.findOne({
    name,
    project: projectId,
  });
};

const getFolderByProjectAndName = (name, projectId) => {
  return Folder.findOne({
    name,
    project: projectId,
  });
};
const createProjectRole = async (name, admin, roles = [], member, timeProfile, projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const role = await getRoleByProjectAndName(name, projectId);
  if (role) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role already exist');
  }

  const newRole = new Role({
    name,
    admin,
    roles,
    member,
    timeProfile,
    project: projectId,
  });
  return newRole.save();
};

const editProjectRole = async (roleId, name, admin, roles = [], member, timeProfile) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return Role.findOneAndUpdate(
    { id: roleId },
    {
      name,
      admin,
      roles,
      member,
      timeProfile,
    },
    {
      new: true,
    }
  );
};

const getProjectRoles = (projectId) => {
  return Role.find({
    project: projectId,
  });
};

const createProjectGroup = async (name, projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const group = await getGroupByProjectAndName(name, projectId);
  if (group) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group already exist');
  }

  const newGroup = new Group({
    name,
    project: projectId,
  });
  return newGroup.save();
};

const getProjectGroups = (projectId) => {
  return Group.find({
    project: projectId,
  });
};

const createProjectFolder = async (name, projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const folder = await getFolderByProjectAndName(name, projectId);
  if (folder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group already exist');
  }

  const newFolder = new Folder({
    name,
    project: projectId,
  });
  return newFolder.save();
};

const getProjectFolders = (projectId) => {
  return Folder.find({
    project: projectId,
  });
};

const getFolderById = (folderId) => {
  return Folder.find({
    _id: folderId,
  });
};

const getFilesByFolderId = (folderId) => {
  return ProjectFile.find({
    folder: folderId,
  }).populate([
    {
      path: 'access',
      select: 'firstName surName',
    },
    {
      path: 'uploadedBy',
      select: 'firstName surName',
    },
  ]);
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  getProjectByOwner,
  updateProjectById,
  deleteProjectById,
  getAllProjects,
  getProjects,
  createProjectRole,
  editProjectRole,
  getRoleById,
  getProjectRoles,
  createProjectGroup,
  getProjectGroups,
  createProjectFolder,
  getProjectFolders,
  getFolderById,
  getFilesByFolderId,
};
