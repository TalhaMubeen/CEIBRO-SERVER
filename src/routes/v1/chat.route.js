const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const { chatController } = require('../../controllers');
const { chatValidation } = require('../../validations');

const router = express.Router();

router.route('/rooms')
    .post(auth('createChatRoom'), validate(chatValidation.createChatRoom), chatController.createChat)
    .get(auth("getChatRooms"), chatController.getChats)

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management and retrieval
 */

/**
 * @swagger
 * /chat/rooms:
 *   post:
 *     summary: Create a chat room
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 description: array of user ids
 *               projectId:
 *                 type: string
 *                 description: project id to which ths belongs to
 *             example:
 *               name: chat room
 *               members: [2342423]
 *               projectId: 89908098
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
 *   get:
 *     summary: Get a users all chat rooms
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: chat name filter
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


