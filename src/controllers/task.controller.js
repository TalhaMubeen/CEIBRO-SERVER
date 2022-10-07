const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService, projectService } = require('../services');
const moment = require('moment');
const { BAD_REQUEST } = require('http-status');
const { escapeRegex } = require('../helpers/query.helper');
const { isUserExist, getUserByEmail } = require('../services/user.service');
const {
  getProjectById,
  getRoleById,
  isGroupExist,
  getProjectMemberByRoleAndGroup,
  getProjectMemberByEmailRoleAndGroup,
} = require('../services/project.service');

const ProjectMember = require('../models/ProjectMember.model');

const populate = [
  {
    path: 'admins',
    select: 'firstName surName profilePic',
  },
  {
    path: 'assignedTo',
    select: 'firstName surName profilePic',
  },
  {
    path: 'project',
    select: 'title location',
  },
];

const subTaskPopulate = [
  {
    path: 'viewer',
    select: 'firstName surName profilePic',
  },
  {
    path: 'assignedTo',
    select: 'firstName surName profilePic',
  },
];

const createTask = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const body = req.body;
  await projectService.getProjectById(projectId);
  body.project = projectId;
  body.creator = req.user._id;
  const task = await taskService.createTask(body);
  res.status(httpStatus.CREATED).send(task);
});

const getTasksList = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  let filter = pick(req.query, ['dueDate', 'assignedTo', 'title']);
  const options = pick(req.query, ['limit', 'page']);

  filter.project = projectId;
  if (filter.title) {
    const regex = new RegExp(escapeRegex(filter.title), 'gi');
    filter = {
      ...filter,
      title: regex,
    };
  }

  if (filter.dueDate) {
    filter = {
      ...filter,
      dueDate: {
        $lte: filter.dueDate,
      },
    };
  }

  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

const getTaskDetail = catchAsync(async (req, res) => {
  const task = await taskService.isTaskExist(req.params.taskId, populate);
  res.send(task);
});

const advanceConfirm = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { groupId, roleId, email } = req.body;
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
    const newMember = await projectService.advanceConfirm(member._id, groupId, roleId, null, projectId);
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
const updateTask = catchAsync(async (req, res) => {
  await taskService.updateTaskById(req.params.taskId, req.body);
  const task = await taskService.isTaskExist(req.params.taskId, populate);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(200).send('deleted');
});

const createSubTask = catchAsync(async (req, res) => {
  const body = Object.assign({}, req.body);
  const { customNudgeTime = null, nudgeBeforeDays = null } = body;
  if (customNudgeTime) {
    if (!moment(customNudgeTime).isValid()) {
      throw new ApiError(BAD_REQUEST, 'Invalid nudge time');
    }
  }
  if (customNudgeTime && nudgeBeforeDays) {
    delete body['nudgeBeforeDays'];
  }
  if (nudgeBeforeDays && isNaN(nudgeBeforeDays)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid nudge before days value');
  }

  const subTask = await taskService.createSubTask(req.params.taskId, body, req.user._id);
  res.status(200).send(subTask);
});

const getSubTasks = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { search } = req.body;
  const filter = { task: taskId, $or: [{ assignedTo: req.user._id }, { creator: req.user._id }] };
  if (search) {
    filter.title = new RegExp(escapeRegex(search), 'gi');
  }
  const subTasks = await taskService.getSubTasksByFilters(filter, subTaskPopulate);
  return res.status(200).send(subTasks);
});

const deleteSubTask = catchAsync(async (req, res) => {
  await taskService.deleteSubTaskById(req.params.subTaskId);
  res.status(200).send('deleted');
});

const updateSubTask = catchAsync(async (req, res) => {
  const body = Object.assign({}, req.body);
  await taskService.updateSubTaskById(req.params.subTaskId, body);
  const subTask = await taskService.isSubTaskExist(req.params.subTaskId, subTaskPopulate);
  res.send(subTask);
});

const subTaskAcceptAction = catchAsync(async (req, res) => {
  const { isAccepted } = req.body;
  const { subTaskId } = req.params;
  const subTask = await taskService.isSubTaskExist(subTaskId);
  if (subTask.acceptAction) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Task already ${subTask.isAccepted ? 'accepted' : 'rejected'}`);
  }
  if (subTask.completeAction) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Task already completed`);
  }
  subTask.isAccepted = isAccepted;
  subTask.acceptAction = true;
  await subTask.save();
  res.status(200).send(isAccepted ? 'accepted' : 'rejected');
});

const subTaskCompleteAction = catchAsync(async (req, res) => {
  const { isCompleted, comments } = req.body;
  const { subTaskId } = req.params;
  const subTask = await taskService.isSubTaskExist(subTaskId);
  if (!subTask.acceptAction) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Accept action not performed`);
  }
  if (!subTask.isAccepted) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Task was rejected`);
  }
  if (subTask.completeAction) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Task already completed`);
  }
  if (subTask.commentRequired && !comments) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Comments required');
  }
  subTask.isCompleted = isCompleted;
  subTask.completeAction = true;
  subTask.completeComments = comments;

  await subTask.save();
  res.status(200).send(`Task completed`);
});

module.exports = {
  createTask,
  getTaskDetail,
  updateTask,
  deleteTask,
  createSubTask,
  getSubTasks,
  deleteSubTask,
  updateSubTask,
  getTasksList,
  subTaskAcceptAction,
  subTaskCompleteAction,
  advanceConfirm,
};
