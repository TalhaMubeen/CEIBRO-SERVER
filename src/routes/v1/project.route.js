const express = require('express');
const { projectController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.route('/members/:projectId').get(auth('manageProject'), projectController.getProjectMembers);

router.route('/all').get(auth('manageProject'), projectController.getAllProjects);

module.exports = router;

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
