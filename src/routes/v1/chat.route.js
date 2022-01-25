const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const { chatController } = require('../../controllers');
const { chatValidation } = require('../../validations');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 100mb.
    fileSize: 1024 * 1024 * 1024,
  },
});
const router = express.Router();

router
  .route('/rooms')
  .post(auth('createChatRoom'), validate(chatValidation.createChatRoom), chatController.createChat)
  .get(auth('getChatRooms'), chatController.getChats);

router.route('/room/messages/:roomId').get(auth('getChatRooms'), chatController.getConversationByRoomId);

router.route('/unread/count').get(auth('getChatRooms'), chatController.getUnreadMessagesCount);

router.route('/room/unread/:roomId').put(auth('getChatRooms'), chatController.setRoomMessagesRead);

router.route('/room/favourite/:roomId').post(auth('getChatRooms'), chatController.addToFavouite);

router.route('/room/mute/:roomId').post(auth('getChatRooms'), chatController.muteChat);

router.route('/message/reply').post(auth('getChatRooms'), upload.array('products'), chatController.replyMessage);

router
  .route('/message/favourite/:messageId')
  .post(auth('getChatRooms'), chatController.addMessageToFavourite)
  .get(auth('getChatRooms'), chatController.getPinnedMessages);

router.route('/media/:roomId').get(auth('getChatRooms'), chatController.getChatRoomMedia);

router.route('/member/:roomId/:memberId').post(auth('getChatRooms'), chatController.addOrRemoveChatMembers);

router.route('/message/questioniar').post(auth('getChatRooms'), chatController.saveQuestioniar);
router.route('/questioniar/view/:questioniarId')
  .get(auth('getChatRooms'), chatController.getQuestioniarById)
  .post(auth('getChatRooms'), chatController.saveQuestioniarAnswers)

// router.route('/file-upload')
//     .post(auth("getChatRooms"), upload.single("product"), chatController.uploadImage);

module.exports = router;

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
 *       - in: query
 *         name: type
 *         type: string
 *         description: chat room type (all, read, unread)
 *         required: false
 *       - in: query
 *         name: favourite
 *         type: boolean
 *         description: get fovourite messages true/false
 *         required: false
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
 * /chat/room/messages/{roomId}:
 *   get:
 *     summary: get chat room messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
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
 * /chat/room/unread/{roomId}:
 *   put:
 *     summary: set all room messages uread
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
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
 * /chat/room/favourite/{roomId}:
 *   post:
 *     summary: add/remove chat room to favourite
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
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
 * /chat/room/mute/{roomId}:
 *   post:
 *     summary: mute/unmute chat room
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
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
 * /chat/message/reply:
 *   post:
 *     summary: send or reply a message
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
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *               chat:
 *                 type: string
 *               messageId:
 *                 type: string
 *             example:
 *                 message: This is reply
 *                 chat: 234234234
 *                 messageId: afjaklfja
 *     responses:
 *       "200":
 *         description: OK
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
 * /chat/message/favourite/{messageId}:
 *   post:
 *     summary: add message to favourite
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
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
 *     summary: get favourite messages of a room
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: this is basically room id. you will place room id instead of message id in get api.
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
 * /chat/file-upload:
 *   post:
 *     summary: Upload file
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: binary
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
 * /chat/media/{roomId}:
 *   get:
 *     summary: get rooms all media
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: chat room id.
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
 * /chat/unread/count:
 *   get:
 *     summary: get unread messages count
 *     tags: [Chat]
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
 * /chat/member/{roomId}/{memberId}:
 *   post:
 *     summary: add or remove member to chat
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Room id
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member id
 *       - in: query
 *         name: temporary
 *         required: false
 *         schema:
 *           type: boolean
 *         description: is temporary member (true/false)
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
