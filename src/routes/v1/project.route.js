const express = require('express');

const validate = require('../../middlewares/validate');
const validation = require('../../validations/project.validation');

const { projectController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const { multerUpload } = require('../../config/aws.config');
const {
  validateCreateRole,
  validateUpdateRole,
  validateDeleteRole,
  validateCreateMember,
  validateDeleteMember,
  validateUpdateMember,
  validateCreateTimeProfile,
  validateUpdateTimeProfile,
} = require('../../middlewares/project.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageProject'),
    multerUpload.single('projectPhoto'),
    // validate(validation.createProject),
    projectController.createProject,
  )
  .get(auth('manageProject'), validate(validation.getProjectsList), projectController.getProjects);

router
  .route('/detail/:projectId')
  .get(auth('manageProject'), projectController.getProject)
  .put(
    auth('manageProject'),
    multerUpload.single('projectPhoto'),
    validate(validation.updateProject),
    projectController.updateProject,
  )
  .delete(auth('manageProject'), projectController.deleteProject);

router.route('/count/status').get(auth('manageProject'), projectController.getProjectsStatusWithCount);

router.route('/all').get(auth('manageProject'), projectController.getAllProjects);

router
  .route('/role/detail/:roleId')
  .get(auth('manageProject'), projectController.getRoleDetail)
  .put(auth('manageProject'), validate(validation.updateProjectRole), validateUpdateRole, projectController.editRole)
  .delete(auth('manageProject'), validateDeleteRole, projectController.deleteRole);

router
  .route('/role/:projectId')
  .get(auth('manageProject'), projectController.getProjectRoles)
  .post(auth('manageProject'), validate(validation.createProjectRole), validateCreateRole, projectController.createRole);

router.route('/permissions/:projectId').get(auth('manageProject'), projectController.getMyPermissions);

router
  .route('/timeProfile/:projectId')
  .get(auth('manageProject'), projectController.getProjectTimeProfiles)
  .post(
    auth('manageProject'),
    validate(validation.createTimeProfile),
    validateCreateTimeProfile,
    projectController.createTimeProfile,
  );

router
  .route('/timeProfile/detail/:profileId')
  .get(auth('manageProject'), projectController.getTimeProfileDetail)
  .put(
    auth('manageProject'),
    validate(validation.updateTimeProfile),
    validateUpdateTimeProfile,
    projectController.editTimeProfile,
  );

router
  .route('/group/detail/:groupId')
  .get(auth('manageProject'), projectController.getGroupDetail)
  .put(auth('manageProject'), validate(validation.updateProjectGroup), projectController.editGroup)
  .delete(auth('manageProject'), projectController.deleteGroup);

router.route('/group/users/:groupId').get(auth('manageGroup'), projectController.getGroupUsers);

router
  .route('/group/:projectId')
  .get(auth('manageProject'), projectController.getProjectGroups)
  .post(auth('manageProject'), validate(validation.createProjectGroup), projectController.createGroup);

router.route('/group/members/:groupId').get(auth('manageProject'), projectController.getGroupsMembers);

router
  .route('/folder/:projectId')
  .get(auth('manageProject'), projectController.getProjectFolders)
  .post(auth('manageProject'), validate(validation.createProjectFolder), projectController.createFolder);

router.route('/sub-folders/:projectId')
  .get(auth('manageProject'), projectController.getProjectSubFolders);
router.route('/version/:projectId')
  .post(auth('manageProject'), multerUpload.single('file'), projectController.createVersion);

router
  .route('/folder-user/:folderId/:userId')
  .post(auth('manageProject'), validate(validation.addRemoveFolderUser), projectController.addRemoveFolderUser);

router
  .route('/file/:folderId')
  .get(auth('manageProject'), projectController.getFolderAllFiles)
  .post(auth('manageProject'), multerUpload.single('file'), projectController.uploadFileToFolder);

router
  .route('/member/:projectId')
  .get(auth('manageProject'), projectController.getProjectAllMembers)
  .post(
    auth('manageProject'),
    validate(validation.addMemberToProject),
    validateCreateMember,
    projectController.addMemberToProject,
  )
  .patch(
    auth('manageProject'),
    validate(validation.updateUserRoleAndGroup),
    validateUpdateMember,
    projectController.updateMemberRoleAndGroup,
  );

router
  .route('/member/detail/:memberId')
  .delete(auth('manageProject'), validateDeleteMember, projectController.deleteProjectMember);

router.route('/members/available/:projectId').get(auth('manageProject'), projectController.getProjectAvailableMembers);

router.route('/members/:projectId').get(auth('manageProject'), projectController.getProjectAllMembers);

router
  .route('/work/:profileId')
  .get(auth('manageProject'), projectController.getProfileWorks)
  .post(auth('manageProject'), validate(validation.createProjectWork), projectController.createWork);

router
  .route('/work/detail/:workId')
  .get(auth('manageProject'), projectController.getWorkDetail)
  .put(auth('manageProject'), validate(validation.updateProjectWork), projectController.editProfileWork)
  .delete(auth('manageProject'), projectController.deleteWorkProfile);

router
  .route('/profile/pic/:projectId')
  .patch(auth('manageProfile'), multerUpload.single('profilePic'), projectController.updateProfilePic);

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
 *               owner: [2324234234]
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

/**
 * @swagger
 * /project/count/status:
 *   get:
 *     summary: get Projects status with count
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
 */

/**
 * @swagger
 * /project/detail/{projectId}:
 *   put:
 *     summary: update project by id
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
 *               owner: [2324234234]
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
 *     summary: get project
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
 *   delete:
 *     summary: get project
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
 * /project/members/available/{projectId}:
 *   get:
 *     summary: get Project available members to add
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
 *   get:
 *     summary: get All project roles
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
 *               memberIds: [234242423, 23423424234, 24323424243, l234243234, 23423424]
 *               admin: false
 *               roles: ['create', 'edit', 'delete', 'self-made']
 *               member: ['create', 'edit', 'delete', 'self-made']
 *               timeProfile: ['create', 'edit', 'delete', 'self-made']
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
 * /project/permissions/{projectId}:
 *   get:
 *     summary: get users all project permissions
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
 */

/**
 * @swagger
 * /project/role/detail/{roleId}:
 *   get:
 *     summary: get project role by id
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
 *     summary: delete project role by id
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
 *               member: ['create', 'edit', 'delete', 'self-made']
 *               timeProfile: ['create', 'edit', 'delete', 'self-made']
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
 * /project/group/detail/{groupId}:
 *   get:
 *     summary: get project group by id
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: group id.
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
 *     summary: delete project group by id
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: group id.
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
 *   put:
 *     summary: update project group
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: group id.
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
 *             example:
 *               name: project manager
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
 * /project/group/users/{groupId}:
 *   get:
 *     summary: get project users
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: group id.
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
 * /project/group/members/{groupId}:
 *   get:
 *     summary: get project group by id
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: group id.
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
 * /project/group/{projectId}:
 *   get:
 *     summary: get All project group
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
 *   post:
 *     summary: create project group
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
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: project manager
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
 * /project/timeProfile/{projectId}:
 *   get:
 *     summary: get All project time profile
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
 *   post:
 *     summary: create project group
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
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: project manager
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
 * /project/timeProfile/detail/{profileId}:
 *   get:
 *     summary: get project timeProfile by id
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: time profile id.
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
 *   put:
 *     summary: update project time profile
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: time profile id.
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
 *             example:
 *               name: modified name
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
 * /project/folder/{projectId}:
 *   get:
 *     summary: get All project folders
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
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: search project folders
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
 *   post:
 *     summary: create project folder
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
 *               - groupId
 *             properties:
 *               name:
 *                 type: string
 *               groupId:
 *                 type: string
 *             example:
 *               name: project folder
 *               groupId: 234234234
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
 * /project/folder-user/{folderId}/{userId}:
 *   post:
 *     summary: add or remove folder user
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         schema:
 *           type: string
 *         description: folder id.
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: user id to add or remove from folder.
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
 * /project/file/{folderId}:
 *   get:
 *     summary: get All folders files
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         schema:
 *           type: string
 *         description: project id.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: file search
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
 *   post:
 *     summary: Upload file to a folder
 *     description: upload project photo
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: string
 *                  format: binary
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
 * /project/member/{projectId}:
 *   get:
 *     summary: get All project members
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
 *       - in: query
 *         name: excludeMe
 *         schema:
 *           type: boolean
 *         description: exclude current user and all pending invited users
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
 *   post:
 *     summary: create project member
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
 *               - memberId
 *               - roleId
 *               - groupId
 *               - subContractor
 *             properties:
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *               groupId:
 *                 type: string
 *               subContractor:
 *                 type: string
 *             example:
 *               email: test@gmail.com
 *               roleId: 234232423
 *               groupId: 2342423443
 *               subContractor: 23333333
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
 *   patch:
 *     summary: update member role and group
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
 *               - memberId
 *               - roleId
 *               - groupId
 *             properties:
 *               roleId:
 *                 type: string
 *               groupId:
 *                 type: string
 *               memberId:
 *                 type: string
 *             example:
 *               memberId: 234233222
 *               roleId: 234232423
 *               groupId: 2342423443
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
 * /project/member/detail/{memberId}:
 *   delete:
 *     summary: delete member
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: member id.
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
 * /project/work/{profileId}:
 *   get:
 *     summary: get all profile works
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: profile id.
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
 *   post:
 *     summary: create profile work
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: profile id.
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
 *               roles:
 *                 type: array
 *               time:
 *                 type: boolean
 *               timeRequired:
 *                 type: boolean
 *               comment:
 *                 type: boolean
 *               commentRequired:
 *                 type: boolean
 *               photo:
 *                 type: boolean
 *               photoRequired:
 *                 type: boolean
 *               quantity:
 *                 type: boolean
 *               quantityRequired:
 *                 type: boolean
 *             example:
 *               name: project manager
 *               roles: []
 *               time: false,
 *               timeRequired: false,
 *               comment: false,
 *               commentRequired: false,
 *               photo: false,
 *               photoRequired: false,
 *               quantity: false,
 *               quantityRequired: false
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
 * /project/work/detail/{workId}:
 *   get:
 *     summary: get work detail by workId
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workId
 *         required: true
 *         schema:
 *           type: string
 *         description: work id.
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
 *     summary: delete work by workId
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workId
 *         required: true
 *         schema:
 *           type: string
 *         description: work id.
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
 *   put:
 *     summary: update work
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workId
 *         required: true
 *         schema:
 *           type: string
 *         description: work id.
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
 *               roles:
 *                 type: array
 *               time:
 *                 type: boolean
 *               timeRequired:
 *                 type: boolean
 *               comment:
 *                 type: boolean
 *               commentRequired:
 *                 type: boolean
 *               photo:
 *                 type: boolean
 *               photoRequired:
 *                 type: boolean
 *               quantity:
 *                 type: boolean
 *               quantityRequired:
 *                 type: boolean
 *             example:
 *               name: project manager
 *               roles: []
 *               time: false,
 *               timeRequired: false,
 *               comment: false,
 *               commentRequired: false,
 *               photo: false,
 *               photoRequired: false,
 *               quantity: false,
 *               quantityRequired: false
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
