const express = require('express');

const validate = require('../../middlewares/validate');
const validation = require('../../validations/task.validation.js');

const { validateSubTaskAction, validateModifySubTask, validateCreateSubTask } = require('../../middlewares/task.middleware');

const { taskController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/manage/:projectId')
  .post(auth('manageProject'), validate(validation.createTask), taskController.createTask)
  .get(auth('manageProject'), validate(validation.getProjectTasks), taskController.getTasksList);

router
  .route('/update/:taskId')
  .get(auth('manageProject'), taskController.getTaskDetail)
  .put(auth('manageProject'), validate(validation.updateTask), taskController.updateTask)
  .delete(auth('manageProject'), taskController.deleteTask);

router
  .route('/confirm/:taskId')
  .post(auth('manageProject'), validate(validation.createTask), taskController.createTask)
  .get(auth('manageProject'), validate(validation.getProjectTasks), taskController.getTasksList);
router
  .route('/subTask/:taskId')
  .post(auth('manageProject'), validateCreateSubTask, validate(validation.createSubTask), taskController.createSubTask)
  .get(auth('manageProject'), taskController.getSubTasks);

router
  .route('/subTask/detail/:subTaskId')
  .put(auth('manageProject'), validateModifySubTask, validate(validation.updateSubTask), taskController.updateSubTask)
  .delete(auth('manageProject'), validateModifySubTask, taskController.deleteSubTask);

router
  .route('/subTask/accept/:subTaskId')
  .post(
    auth('manageProject'),
    validateSubTaskAction,
    validate(validation.subTaskAcceptAction),
    taskController.subTaskAcceptAction
  );

router
  .route('/subTask/complete/:subTaskId')
  .post(
    auth('manageProject'),
    validateSubTaskAction,
    validate(validation.subTaskCompleteAction),
    taskController.subTaskCompleteAction
  );



module.exports = router;

/**
 * @swagger
 * /task/manage/{projectId}:
 *   post:
 *     summary: create a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: project id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               admins:
 *                 type: string[]
 *               dueDate:
 *                 type: string
 *             example:
 *               title: testTask
 *               assignedTo: "234234234"
 *               admins: "23487239847"
 *               dueDate: 12-12-2022
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *   get:
 *     summary: get Task with filters
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: project id.
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: task title
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: get Projects assigned to a person by userId
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: date
 *         description: project due date
 *       - in: query
 *         name: publishStatus
 *         schema:
 *           type: string
 *           enum: [all, draft, ongoing, approved, done, draft]
 *         description: this filter is not handled yet
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of tasks
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /task/detail/{taskId}:
 *   put:
 *     summary: update task by id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: task id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               admins:
 *                 type: string[]
 *               project:
 *                 type: string
 *               dueDate:
 *                 type: string
 *             example:
 *               title: testTask
 *               assignedTo: "234234234"
 *               admins: "23487239847"
 *               dueDate: 12-12-2022
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *   get:
 *     summary: get task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: task id.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: delete task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: task id.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /task/subTask/{taskId}:
 *   post:
 *     summary: create subTask to task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: task id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             example:
 *               title: testTask
 *               description: description
 *               assignedTo: 234234234
 *               viewer: [23487239847]
 *               dueDate: 12-12-2022
 *               imageRequired: true/false
 *               commentRequired: true/false
 *               nudgeBeforeDays: 2
 *               customNudgeTime: 10-10-2022
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *   get:
 *     summary: get my subTasks by taskId
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: task id.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: subTasks search
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /task/subTask/detail/{subTaskId}:
 *   put:
 *     summary: update sub task by id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: sub task id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             example:
 *               title: testTask
 *               description: description
 *               assignedTo: 62a8afb8eec38b6fe5379e40
 *               viewer: [62a8afb8eec38b6fe5379e40]
 *               dueDate: 12-12-2022
 *               imageRequired: false
 *               commentRequired: false
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *   delete:
 *     summary: delete a subtask
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: subTask id.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /task/subTask/accept/{subTaskId}:
 *   post:
 *     summary: accept or reject a sub-task by id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: sub task id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isAccepted
 *             properties:
 *               isAccepted:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /task/subTask/complete/{subTaskId}:
 *   post:
 *     summary: complete or reject a sub-task by id
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: sub task id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isCompleted
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *               comments:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
