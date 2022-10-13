const httpStatus = require('http-status');
const { invitesStatus } = require('../config/user.config');
const { Project, Invite } = require('../models');
const Folder = require('../models/folder.model');
const Group = require('../models/group.model');
const ProjectFile = require('../models/ProjectFile.model');
const ProjectMember = require('../models/ProjectMember.model');
const Role = require('../models/role.model');
const TimeProfile = require('../models/timeProfile.model');
const User = require('../models/user.model');
const Work = require('../models/work.model');
const ApiError = require('../utils/ApiError');
const { sendInvitationEmail } = require('./email.service');
const { getUserById, isUserExist } = require('./user.service');

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

const isGroupExist = async (groupId) => {
  const group = await Group.findById(groupId);
  if (!group) {
    throw new ApiError(400, 'Invalid group');
  }
  return group;
};

const getGroupMembers = async (groupId, currentUserId) => {
  await isGroupExist(groupId);
  const projectMembers = await ProjectMember.find({ group: groupId, user: { $ne: currentUserId } }).populate({
    path: 'user',
    select: 'firstName surName profilePic',
  });
  return projectMembers.map((projectMember) => projectMember.user);
};

const isTimeProfileExist = async (profileId) => {
  const timeProfile = await TimeProfile.findById(profileId);
  if (!timeProfile) {
    throw new ApiError(400, 'Invalid time profile id');
  }
  return timeProfile;
};

const isWorkExist = async (workId) => {
  const work = await Work.findById(workId).populate('roles');
  if (!work) {
    throw new ApiError(400, 'Invalid work id');
  }
  return work;
};

const getAllProjects = (projectIds) => {
  return Project.find({ _id: projectIds }, { title: 1, location: 1 });
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

const getWorkByProfileAndName = (name, profileId) => {
  return Work.findOne({
    name,
    profile: profileId,
  });
};

const getGroupByProjectAndName = (name, projectId) => {
  return Group.findOne({
    name,
    project: projectId,
  });
};

const getTimeProfileByProjectAndName = (name, projectId) => {
  return TimeProfile.findOne({
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
const createProjectRole = async (name, admin, roles = [], member, timeProfile, projectId, members) => {
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
  await newRole.save();

  if (members) {
    const users = await User.find({
      _id: members,
    });
    const membersToCreate = users.map((user) => ({
      user: user._id,
      role: newRole._id,
      project: projectId,
    }));
    ProjectMember.insertMany(membersToCreate).then((user) => {
      console.log('created members are', user);
    });
  }
  return newRole.save();
};

const createProfileWork = async (
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
) => {
  await isTimeProfileExist(profileId);
  const work = await getWorkByProfileAndName(name, profileId);
  if (work) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Work already exist');
  }

  await Promise.all(roles?.map(getRoleById));

  const newWork = new Work({
    profile: profileId,
    name,
    roles,
    time,
    timeRequired,
    photo,
    photoRequired,
    comment,
    commentRequired,
    quantity,
    quantityRequired,
  });
  return newWork.save();
};

const editProfileWork = async (
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
) => {
  await isWorkExist(workId);

  await Promise.all(roles?.map(getRoleById));
  const otherWork = await Work.findOne({
    name: name,
    _id: {
      $ne: workId,
    },
  });
  if (otherWork) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Work with this name already exist');
  }
  return Work.findOneAndUpdate(
    { _id: workId },
    {
      name,
      roles,
      time,
      timeRequired,
      photo,
      photoRequired,
      comment,
      commentRequired,
      quantity,
      quantityRequired,
    },
    {
      new: true,
    }
  );
};

const getProfileWorks = (profileId) => {
  return Work.find({
    profile: profileId,
  }).populate('roles');
};

const editProjectRole = async (roleId, name, admin, roles = [], member, timeProfile) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return Role.findOneAndUpdate(
    { _id: roleId },
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

const createProjectTimeProfile = async (name, projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const timeProfile = await getTimeProfileByProjectAndName(name, projectId);
  if (timeProfile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Time Profile already exist');
  }

  const newProfile = new TimeProfile({
    name,
    project: projectId,
  });
  return newProfile.save();
};

const getProjectTimeProfiles = (projectId) => {
  return TimeProfile.find({
    project: projectId,
  });
};

const createProjectFolder = async (name, groupId, projectId, currentUserId, folderId) => {
  folderId = folderId || null;
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  await isGroupExist(groupId);

  const folder = await getFolderByProjectAndName(name, projectId);
  if (folder) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Folder already exist');
  }

  const newFolder = new Folder({
    name,
    group: groupId,
    project: projectId,
    creator: currentUserId,
    parentFolder:folderId
  });
  return newFolder.save();
};

const getProjectFolders = (projectId, filters) => {
  return Folder.find({
    ...filters,
    project: projectId,
  }).populate('group');
};

const getFolderById = (folderId, filter = {}) => {
  return Folder.findOne({
    _id: folderId,
    ...filter,
  });
};

const getFilesByFolderId = (folderId, filter = {}) => {
  return ProjectFile.find({
    folder: folderId,
    ...filter,
  }).populate([
    {
      path: 'folder',
      select: 'name',
      populate: {
        path: 'group',
      },
    },
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

const getProjectMemberByRoleAndGroup = async (memberId, groupId, roleId, subContractorId, projectId) => {
  return ProjectMember.findOne({
    project: projectId,
    user: memberId,
    group: groupId,
    role: roleId,
  });
};

const getProjectMemberByEmailRoleAndGroup = async (email, groupId, roleId, subContractorId, projectId) => {
  return ProjectMember.findOne({
    project: projectId,
    invitedEmail: email,
    group: groupId,
    role: roleId,
  });
};

const sendProjectInviteByEmail = async (email, groupId, roleId, subContractorId, projectId, currentUserId) => {
  const currentUser = await getUserById(currentUserId);
  const name = currentUser.firstName + ' ' + currentUser.surName;
  const projectMember = new ProjectMember({
    isInvited: true,
    invitedEmail: email,
    group: groupId,
    role: roleId,
    subContractor: subContractorId,
    project: projectId,
  });
  await projectMember.save();
  await sendInvitationEmail(email, name, currentUser.email);
  return true;
};

const getProjectMembersById = async (projectId) => {
  return ProjectMember.find({
    project: projectId,
  }).populate('role group subContractor user');
};

const getProjectOwners = async (projectId) => {
  const project = await getProjectById(projectId);
  return project.owner;
};

const getProjectMemberById = async (memberId) => {
  return ProjectMember.findOne({
    _id: memberId,
  });
};

const addMemberToProject = async (memberId, groupId, roleId, subContractorId, projectId) => {
  const projectMember = await ProjectMember({
    user: memberId,
    group: groupId,
    role: roleId,
    subContractor: subContractorId,
    project: projectId,
  });

  await Group.updateOne(
    {
      _id: groupId,
    },
    {
      $addToSet: {
        members: memberId,
      },
    }
  );

  return projectMember.save();
};

const updateMemberGroupAndRole = async (groupId, roleId, memberId) => {
  const oldMember = await ProjectMember.findOne({
    _id: memberId,
  });
  return Promise.all([
    Group.updateOne(
      {
        _id: oldMember?.group,
      },
      {
        $pull: {
          members: oldMember?.user,
        },
      }
    ),
    Group.updateOne(
      {
        _id: groupId,
      },
      {
        $addToSet: {
          members: oldMember.user,
        },
      }
    ),
    ProjectMember.updateOne(
      {
        _id: memberId,
      },
      {
        role: roleId,
        group: groupId,
      }
    ),
  ]);
};

const editProjectGroup = async (groupId, name) => {
  await isGroupExist(groupId);
  return Group.findOneAndUpdate(
    { _id: groupId },
    {
      name,
    },
    {
      new: true,
    }
  );
};

const editProjectTimeProfile = async (profileId, name) => {
  await isTimeProfileExist(profileId);
  return TimeProfile.findOneAndUpdate(
    { _id: profileId },
    {
      name,
    },
    {
      new: true,
    }
  );
};

const getProjectCountByStatus = async (status, projectIds) => {
  return Project.count({
    publishStatus: status,
    _id: projectIds,
  });
};

const getRolesByProjectId = (projectId) => {
  return Role.find({
    project: projectId,
  });
};

const isMemberExistInProject = (userId, projectId) => {
  return ProjectMember.find({
    user: userId,
    project: projectId,
  });
};

const getProjectPermissions = async (userId, projectId) => {
  console.log('projectId: ', projectId);
  const members = await isMemberExistInProject(userId, projectId);
  const roleIds = members.map((member) => member.role);
  const roles = await Role.find({
    _id: roleIds,
  });
  let rolePermissions = [];
  let memberPermissions = [];
  let timeProfilePermissions = [];
  let admin = false;
  roles.forEach((role) => {
    if (role.admin && !admin) {
      admin = true;
    }

    if (role.roles && Array.isArray(role.roles)) rolePermissions = [...rolePermissions, ...role.roles];

    if (role.timeProfile && Array.isArray(role.timeProfile))
      timeProfilePermissions = [...timeProfilePermissions, ...role.timeProfile];

    if (role.member && Array.isArray(role.member)) memberPermissions = [...memberPermissions, ...role.member];
  });
  memberPermissions = [...new Set(memberPermissions)];
  rolePermissions = [...new Set(rolePermissions)];
  timeProfilePermissions = [...new Set(timeProfilePermissions)];

  // checking if user exist in owners
  const project = await getProjectById(projectId);

  if (project?.owner?.findIndex((owner) => String(owner._id) === String(userId)) > -1) {
    admin = true;
  }
  return { member: memberPermissions, timeProfile: timeProfilePermissions, roles: rolePermissions, admin };
};

const getUserProjectIds = async (userId) => {
  const myMembers = await ProjectMember.find({ user: userId });
  let myProjectIds = myMembers.map((member) => member.project);
  const myOwnerProjects = await Project.find({ owner: userId });
  myProjectIds = [...myProjectIds, ...myOwnerProjects.map((project) => project._id)];
  return myProjectIds;
};

const getProjectAvailableMembers = async (projectId, currentUserId) => {
  const myMembers = await ProjectMember.find({ project: projectId });
  let projectUserIds = myMembers.map((member) => member.user);
  const projects = await getProjectById(projectId);
  let owners = projects?.owner?.map?.((own) => own?._id) || [];
  projectUserIds = [...projectUserIds, ...owners];
  const myInvites = await Invite.find({
    $or: [
      {
        to: currentUserId,
      },
      {
        from: currentUserId,
      },
    ],
    status: invitesStatus.ACCEPTED,
  });

  let connectionIds = myInvites.map((invite) => {
    let user = invite.to;
    if (String(user._id) === String(currentUserId)) {
      user = invite.from;
    }
    return user;
  });

  return User.find({
    $and: [
      {
        _id: {
          $nin: projectUserIds,
        },
      },
      {
        _id: {
          $in: connectionIds,
        },
      },
    ],
    isEmailVerified: true,
  });
};

const addOrRemoveFolderUser = async (folderId, userId) => {
  const folder = await getFolderById(folderId);
  if (!folder) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid folder id');
  await isUserExist(userId);

  const alreadyInFolder = folder?.access?.includes(userId);
  if (alreadyInFolder) {
    await Folder.findOneAndUpdate(
      {
        _id: folderId,
      },
      {
        $pull: {
          access: userId,
        },
      }
    );
  } else {
    await Folder.findOneAndUpdate(
      {
        _id: folderId,
      },
      {
        $addToSet: {
          access: userId,
        },
      }
    );
  }
  return alreadyInFolder;
};

const getUserDefaultProject = (userId) => {
  return Project.findOne({
    isDefault: true,
    owner: userId,
  });
};

const addUserToMyDefaultProject = async (user1, user2) => {
  // adding user to my default project
  const myDefaultProject = await getUserDefaultProject(user1);
  if (myDefaultProject) {
    return ProjectMember.create({
      user: user2,
      project: myDefaultProject._id,
    });
  }
  return;
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
  isGroupExist,
  addMemberToProject,
  getProjectMemberByRoleAndGroup,
  getProjectMemberByEmailRoleAndGroup,
  getProjectMembersById,
  sendProjectInviteByEmail,
  getProjectMemberById,
  updateMemberGroupAndRole,
  editProjectGroup,
  createProjectTimeProfile,
  getProjectTimeProfiles,
  isTimeProfileExist,
  editProjectTimeProfile,
  createProfileWork,
  editProfileWork,
  getProfileWorks,
  isWorkExist,
  getProjectCountByStatus,
  getProjectPermissions,
  isMemberExistInProject,
  getUserProjectIds,
  getProjectAvailableMembers,
  getProjectOwners,
  getGroupMembers,
  addOrRemoveFolderUser,
  getUserDefaultProject,
  addUserToMyDefaultProject,
};
