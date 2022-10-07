const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService, chatService } = require('../services');
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
  isWorkExist,
  getProjectOwners,
} = require('../services/project.service');
const ProjectFile = require('../models/ProjectFile.model');
const { isUserExist, getUserByEmail } = require('../services/user.service');
const { escapeRegex } = require('../helpers/query.helper');
const { projectPublishStatus, avaialablePermissions, roleEntities } = require('../config/project.config');
const Project = require('../models/project.model');
const ProjectMember = require('../models/ProjectMember.model');
const Role = require('../models/role.model');
const { filterArray } = require('../helpers/project.helper');
const Group = require('../models/group.model');
const { mapUsers, uniqueBy } = require('../helpers/user.helper');
const Folder = require('../models/folder.model');

const createProject = catchAsync(async (req, res) => {
  if (req.file) {
    const file = req.file;
    const path = await awsService.uploadFile(file, bucketFolders.PROJECT_FOLDER);
    req.body.projectPhoto = path.url;
  }
  let body = Object.create(req.body);

  if (typeof req.body?.owner === 'string') {
    try {
      body.owner = JSON.parse(req.body.owner);
    } catch (e) {
      body.owner = [req.body.owner];
    }
  } else {
  }
  const project = await projectService.createProject(req.body, req.user._id);
  await Project.createDefultRoleAndGroup(project._id);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['title', 'publishStatus']);
  const search = pick(req.query, ['dueDate', 'assignedTo']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (search.dueDate) {
    filter.dueDate = {
      $lte: search.dueDate,
    };
  }

  if (filter.title) {
    const regex = new RegExp(escapeRegex(filter.title), 'gi');
    filter = {
      ...filter,
      title: regex,
    };
  }

  if (search.assignedTo) {
    let userProjectIds = await projectService.getUserProjectIds(search.assignedTo);
    filter._id = {
      $in: userProjectIds,
    };
  }

  if (filter.publishStatus) {
    filter.publishStatus = filter.publishStatus.toLowerCase();
  }

  if (filter.publishStatus === 'all') {
    delete filter.publishStatus;
  }

  let myProjectIds = await projectService.getUserProjectIds(req.user._id);
  filter = {
    $and: [
      filter,
      {
        _id: myProjectIds,
      },
    ],
  };

  options.populate = 'owner';
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

const getAllProjects = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const projectIds = await projectService.getUserProjectIds(_id);
  const result = await projectService.getAllProjects(projectIds);
  res.send(result);
});

const getProjectMembers = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const project = await projectService.getProjectById(projectId);
  let members = project.members;
  let owners = await getProjectOwners(projectId);
  members = members?.concat(
    owners?.map((owner) => {
      console.log('owner: ', owner);
      // converting them to act like project members object;
      return {
        isInvited: false,
        user: owner,
      };
    })
  );
  members = members?.filter?.((member) => String(member.id) !== String(_id)) || [];
  res.send(members);
});

const getProjectAvailableMembers = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  const availableUsers = await projectService.getProjectAvailableMembers(projectId, _id);
  const members =
    availableUsers?.map?.((user) => ({
      label: user.firstName + ' ' + user.surName,
      value: user.email,
      id: user._id,
    })) || [];
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
  res.status(200).send();
});

const createRole = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { name, admin, memberIds, roles, member, timeProfile } = req.body;
  const role = await createProjectRole(name, admin, roles, member, timeProfile, projectId, memberIds);
  res.status(200).send(role);
});

const deleteRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const role = await projectService.getRoleById(roleId);
  await role.remove();
  res.status(200).send('Role deleted successfully');
});

const deleteGroup = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const group = await projectService.isGroupExist(groupId);
  await group.remove();
  res.status(200).send('Group deleted successfully');
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

const getGroupUsers = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const groupMembers = await projectService.getGroupMembers(groupId, req.user._id);
  res.status(200).send(uniqueBy(groupMembers, '_id'));
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
  const group = await createProjectGroup(name, projectId, req.user._id);
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

const getGroupsMembers = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  await isGroupExist(groupId);
  const members = await projectService.getGroupMembers(groupId);
  res.status(200).send(members);
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
  const folder = await createProjectFolder(name, groupId, projectId, req.user._id);
  res.status(200).json({
    data: folder,
  });
});

const createVersion = catchAsync(async(req,res)=>{
  console.log(req.body , 'bodyy')
   const { projectId } = req.params;
  const {  fileId, folderId} = req.body;
  const file = await ProjectFile.findOne({
    _id:fileId,
    folder:folderId,
    project:projectId
  });
  // return res.send(file);

  const currentFolder = await Folder.findById(folderId)
  // return res.send(currentFolder);
  const folder = await createProjectFolder(file?.name, currentFolder.group, currentFolder.project, req.user._id,currentFolder.id);
   const path = await awsService.uploadFile(req.file, bucketFolders.PROJECT_FOLDER);
const newFile = new ProjectFile({
  name: path?.fileName,
    fileType: path?.fileType,
    url: file?.url,
    uploadedBy: req.user._id,
    access: [req.user._id],
    project: folder.project,
    folder: folder.id,
})
  const copyFile = new ProjectFile({
    name: file?.name,
    fileType: file?.fileType,
    url: file?.url,
    uploadedBy: req.user._id,
    access: [req.user._id],
    project: folder.project,
    folder: folder.id,

  });
  await copyFile.save();
  await newFile.save();
  res.status(200).json({
    data: {folder:folder, file:newFile},
  });

})

const getProjectFolders = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { search } = req.query;
  const { _id } = req.user;
  let filter = {
    parentFolder:null,
    $or: [
      {
        access: _id,
      },
      {
        creator: _id,
      },
    ],
  };
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
      access: folder.access,
      creator: folder.creator,
    };
  });
  res.status(200).send(data);
});
const getProjectSubFolders = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const {folderId }= req.body
  const { search } = req.query;
  const { _id } = req.user;
  let filter = {
    parentFolder:folderId,
    $or: [
      {
        access: _id,
      },
      {
        creator: _id,
      },
    ],
  };
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
      access: folder.access,
      creator: folder.creator,
    };
  });
  res.status(200).send(data);
});
const uploadFileToFolder = catchAsync(async (req, res) => {
  const { folderId } = req.params;
  const { _id } = req.user;
  if (!req.file) {
    throw new ApiError();
  }
  const filter = {
    $or: [
      {
        access: _id,
      },
      {
        creator: _id,
      },
    ],
  };
  const folder = await getFolderById(folderId, filter);
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
  console.log('which was', folder);
  const project = await projectService.getProjectById(folder.project);
  const filesCount = await ProjectFile.count({ project: folder.project });
  project.docsCount = filesCount;
  project.save();
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
  const { excludeMe } = req.query;

  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }
  let members = await getProjectMembersById(projectId, excludeMe);
  if (excludeMe === 'true') {
    let owners = await getProjectOwners(projectId);
    const ownerMembers = owners?.map((owner) => {
      // converting them to act like project members object;
      return {
        isOwner: true,
        isInvited: false,
        user: owner,
      };
    });
    members = ownerMembers.concat(members);
    members = members?.filter?.((member) => String(member?.user?._id) !== String(req.user._id));
  }
  members = members;
  res.status(200).send(members);
});

// const getProjectMembersWithOwners = catchAsync(async (req, res) => {
//   const { projectId } = req.params;
//   const project = await getProjectById(projectId);
//   if (!project) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
//   }
//   const members = await getProjectMembersById(projectId);
//   res.status(200).send(members);
// });

const addMemberToProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { groupId, subContractor, roleId, email } = req.body;

  await getRoleById(roleId);
  await isGroupExist(groupId);
  // await isGroupExist(subContractor);
  const member = await getUserByEmail(email);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid project id');
  }

  if (member) {
    const alreadyMember = await getProjectMemberByRoleAndGroup(member._id, groupId, roleId, null, projectId);
    if (alreadyMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Member already exist');
    }
    const newMember = await projectService.addMemberToProject(member._id, groupId, roleId, null, projectId);
    const membersCount = await ProjectMember.count({ project: projectId });
    project.usersCount = membersCount;
    project.save();
    res.status(200).send(newMember);
  } else {
    const alreadyMember = await getProjectMemberByEmailRoleAndGroup(email, groupId, roleId, null, projectId);
    if (alreadyMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Member already exist');
    }
    const newMember = await projectService.sendProjectInviteByEmail(email, groupId, roleId, null, projectId, req.user._id);

    const membersCount = await ProjectMember.count({ project: projectId });
    project.usersCount = membersCount;
    project.save();
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

const deleteProjectMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const member = await getProjectMemberById(memberId);
  if (!member) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid member id');
  }
  if (member) {
    await Group.updateOne(
      {
        _id: member.group,
      },
      {
        $pull: {
          members: req.user._id,
        },
      }
    );
    await member.remove();
  }
  res.status(200).send('member deleted successfully');
});

const createWork = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  const { name, locations, works } =
    req.body;
  const work = await projectService.createProfileWork(
    profileId,
    name,
    locations,
    works
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
  const { name, locations, works } =
    req.body;

  const newWork = await projectService.editProfileWork(
    workId,
    name,
    locations,
    works
  );
  res.status(200).send(newWork);
});

const getWorkDetail = catchAsync(async (req, res) => {
  const { workId } = req.params;
  const work = await projectService.isWorkExist(workId);
  if (work.roles) {
    work._doc.roles = work.roles.map((role) => ({ label: role.name, value: role.id }));
  }
  console.log('asasdfasd', work);
  res.status(200).send(work);
});

const getProjectsStatusWithCount = catchAsync(async (req, res) => {
  const statuses = Object.values(projectPublishStatus);
  const projectIds = await projectService.getUserProjectIds(req.user._id);

  let data = await Promise.all(
    ['ongoing', 'approved', 'done', 'draft'].map(async (status) => {
      const count = await projectService.getProjectCountByStatus(status, projectIds);
      return {
        name: status,
        count,
      };
    })
  );

  const projectsCount = await Project.count({ _id: projectIds });
  data.unshift({
    name: 'all',
    count: projectsCount,
  });
  res.status(200).send(data);
});

const deleteWorkProfile = catchAsync(async (req, res) => {
  const { workId } = req.params;
  const work = await isWorkExist(workId);
  await work.remove();
  res.status(200).send('work deleted successfully');
});

const getMyPermissions = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  await projectService.getProjectById(projectId);
  const permissions = await projectService.getProjectPermissions(req.user._id, projectId);
  res.status(200).send(permissions);
});

const updateProfilePic = catchAsync(async (req, res) => {
  const file = req.file;
  const { projectId } = req.params;
  const path = await awsService.uploadFile(file, bucketFolders.USER_FOLDER);
  const project = await projectService.getProjectById(projectId);
  project.projectPhoto = path.url;
  await project.save();
  res.status(200).send('project pic updated successfully');
});

const addRemoveFolderUser = catchAsync(async (req, res) => {
  const { folderId, userId } = req.params;
  const isRemoved = await projectService.addOrRemoveFolderUser(folderId, userId);
  res.status(200).send(isRemoved ? 'User removed' : 'User added');
});

module.exports = {
  createProject,
  getProjects,
  getProjectsStatusWithCount,
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
  createVersion,
  getProjectFolders,
  getProjectSubFolders,
  uploadFileToFolder,
  getFolderAllFiles,
  addMemberToProject,
  getProjectAllMembers,
  updateMemberRoleAndGroup,
  deleteProjectMember,
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
  deleteWorkProfile,
  getMyPermissions,
  deleteRole,
  updateProfilePic,
  deleteGroup,
  getProjectAvailableMembers,
  getGroupsMembers,
  getGroupUsers,
  addRemoveFolderUser,
  // getProjectMembersWithOwners
};
