const express = require('express');

const validate = require('../../middlewares/validate');
const validation = require('../../validations/project.validation');

const { projectController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const { multerUpload } = require('../../config/aws.config');
const router = express.Router();

router
  .route('/')
  .post(
    auth('manageProject'),
    multerUpload.single('projectPhoto'),
    validate(validation.createProject),
    projectController.createProject
  )
  .get(auth('manageProject'), validate(validation.getProjectsList), projectController.getProjects);

router.route('/members/:projectId').get(auth('manageProject'), projectController.getProjectMembers);
router.route('/detail/:projectId').get(auth('manageProject'), projectController.getProject);

router.route('/all').get(auth('manageProject'), projectController.getAllProjects);

router
  .route('/role/detail/:roleId')
  .put(auth('manageProject'), validate(validation.editRole), projectController.editRole);

router
  .route('/role/:projectId')
  // .get(
  //   auth('manageProject'),
  //   projectController.getAllProjects
  // )
  .post(auth('manageProject'), validate(validation.updateProjectRole), projectController.createRole);

module.exports = router;

/**
 * @swagger
 * /project:
 *   post:
 *     summary: create a project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               addTime:
 *                 type: boolean
 *               quantity:
 *                 type: boolean
 *               comment:
 *                 type: boolean
 *               photo:
 *                 type: boolean
 *             example:
 *               title: test project
 *               dueDate: 12-12-2022
 *               description: description
 *               location: location
 *               owner: 2324234234,
 *               publishStatus: draft | published
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
 *     summary: get Projects with filters
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: project title
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
 *         description: project status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of projects
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

/*
 * @swagger
 * /project/detail/{projectId}:
 *   get:
 *     summary: get project by id
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: project id.id.
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
 * /project/members/{projectId}:
 *   get:
 *     summary: get Project Members
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: project id.
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
 *
 */

/**
 * @swagger
 * /project/all:
 *   get:
 *     summary: get All projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
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
 *
 */

/**
 * @swagger
 * /project/role/{projectId}:
 *   post:
 *     summary: create project Role
 *     tags: [Project]
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
 *               - name
 *               - admin
 *             properties:
 *               name:
 *                 type: string
 *               admin:
 *                 type: boolean
 *               roles:
 *                 type: array
 *               member:
 *                 type: boolean
 *               timeProfile:
 *                 type: boolean
 *             example:
 *               name: project manager
 *               admin: false
 *               roles: ['create', 'edit', 'delete', 'self-made']
 *               member: false
 *               timeProfile: false
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
 * /project/role/detail/{roleId}:
 *   put:
 *     summary: update project Role
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: role id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - admin
 *             properties:
 *               name:
 *                 type: string
 *               admin:
 *                 type: boolean
 *               roles:
 *                 type: array
 *               member:
 *                 type: boolean
 *               timeProfile:
 *                 type: boolean
 *             example:
 *               name: project manager
 *               admin: false
 *               roles: ['create', 'edit', 'delete', 'self-made']
 *               member: false
 *               timeProfile: false
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
 *
 */
