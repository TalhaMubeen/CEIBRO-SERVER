const httpStatus = require('http-status');
const { taskService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const validateSubTaskAction = catchAsync(async (req, res, next) => {
  const { subTaskId } = req.params;
  const { _id } = req.user;
  const subTask = await taskService.isSubTaskExist(subTaskId);
  if (String(subTask.assignedTo) === String(_id)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not authorized to perform this operation');
  }
});

const validateModifySubTask = catchAsync(async (req, res, next) => {
  const { subTaskId } = req.params;
  const { _id } = req.user;
  const subTask = await taskService.isSubTaskExist(subTaskId);
  if (String(subTask.creator) === String(_id)) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not authorized to perform this operation');
  }
});

const validateCreateSubTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  const task = await taskService.isTaskExist(taskId);
  if (String(task.creator) === String(_id) || task.admins.includes(String(_id)) || task.assignedTo.includes(String(_id))) {
    next();
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not authorized to perform this operation');
  }
});

module.exports = {
  validateSubTaskAction,
  validateModifySubTask,
  validateCreateSubTask,
};
