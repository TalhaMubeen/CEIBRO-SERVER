const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const { chatController } = require('../../controllers');
const { chatValidation } = require('../../validations');
const { multerUpload } = require('../../config/aws.config');
const router = express.Router();

router
  .route('/rooms')
  .post(auth('createChatRoom'), validate(chatValidation.createChatRoom), chatController.createChat);

router.route('/rooms/getchat').post(auth('getChatRooms'), chatController.getChats);

router
  .route('/room/single/:userId')
  .post(auth('createChatRoom'), validate(chatValidation.createOneToOneChat), chatController.createOneToOneChat);

router.route('/room/messages/:roomId').post(auth('getChatRooms'), chatController.getConversationByRoomId);

router.route('/unread/count').post(auth('getChatRooms'), chatController.getUnreadMessagesCount);

router.route('/room/read/:roomId').put(auth('getChatRooms'), chatController.setRoomMessagesRead);
router.route('/room/unread/:roomId').put(auth('getChatRooms'), chatController.setRoomMessagesUnRead);

router.route('/room/favourite/:roomId').post(auth('getChatRooms'), chatController.addToFavouite);

router.route('/room/mute/:roomId').post(auth('getChatRooms'), chatController.muteChat);

router.route('/message/reply').post(
  auth('getChatRooms'),
  multerUpload.array('products'),
  // validate(chatValidation.sendMessage),
  chatController.replyMessage,
);

router
  .route('/message/forward')
  .post(auth('getChatRooms'), validate(chatValidation.forwardMessage), chatController.forwardMessage);

router.route('/pinned/title/:roomId').put(auth('manageProject'), chatController.updateChatPinTitle);

router
  .route('/message/favourite/:messageId')
  .post(auth('getChatRooms'), chatController.addMessageToFavourite);

router.route('/message/favourites/:messageId').post(auth('getChatRooms'), chatController.getPinnedMessages);

router.route('/media/:roomId').get(auth('getChatRooms'), chatController.getPinnedMessages);

router.route('/media/:roomId').get(auth('getChatRooms'), chatController.getChatRoomMedia);

router.route('/member/:roomId/:memberId').post(auth('getChatRooms'), chatController.addOrRemoveChatMembers);
router.route('/member/available/:roomId').get(auth('getChatRooms'), chatController.getAvailableChatMembers);

router
  .route('/room/:roomId')
  .delete(auth('getChatRooms'), chatController.deleteChatRoomForUser)
  .put(auth('getChatRooms'), chatController.updateChatRoom);

router
  .route('/room/profile-pic/:roomId')
  .patch(auth('getChatRooms'), multerUpload.single('profilePic'), chatController.updateChatProfilePic);

router.route('/message/questioniar').post(auth('getChatRooms'), chatController.saveQuestioniar);
router
  .route('/questioniar/view/:questioniarId')
  .get(auth('getChatRooms'), chatController.getQuestioniarById)
  .post(auth('getChatRooms'), chatController.saveQuestioniarAnswers);

router
  .route('/questioniar/view-answer/:questioniarId/:userId')
  .get(auth('getChatRooms'), chatController.getQuestioniarAnswersByUser);

router.route('/message/questionair/:roomId').get(auth('getChatRooms'), chatController.getQuestionairByTypeMessage);

// router
//   .route('/room/file-upload/:roomId')
//   .post(auth('getChatRooms'), multerUpload.single('files'), chatController.uploadImage);

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
 *               members: ["2342423"]
 *               projectId: "89908098"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                 newchat: {
 *                          isGroupChat: true,
 *                          members: [{
                              "role": "user",
                              "isEmailVerified": true,
                              "pinnedMessages": [],
                              "pinnedChat": [],
                              "mutedChat": [],
                              "isOnline": true,
                              "firstName": "ali",
                              "surName": "ramay",
                              "email": "test@gmail.com",
                              "socketId": "2Cs-UPJ4rTB-EXgwAAAR",
                              "id": "63440bc8b866c91778afb006"
                            },{"role": "user",
                              "isEmailVerified": true,
                              "pinnedMessages": [],
                              "pinnedChat": [],
                              "mutedChat": [],
                              "isOnline": true,
                              "firstName": "ali",
                              "surName": "ramay",
                              "email": "test@gmail.com",
                              "socketId": "2Cs-UPJ4rTB-EXgwAAAR",
                              "id": "63440bc8b866c91778afb006"
                            }],
 *                          removedMembers: [],
 *                          pinnedBy: [],
 *                          mutedBy: [],
 *                          pinTitle: Pinned messages,
 *                          name: chat room,
 *                          initiator: 63440bc8b866c91778afb006,
 *                          project: {
 *                            "owner": [
                                "63440bc8b866c91778afb006",
                                "634403b96247483834f0d01c"
                              ],
 *                            "isDefault": "false",
 *                            "usersCount": 0,
 *                            "docsCount":  0,
 *                            "tasksCount": 0,
 *                            "chatCount":  1,
 *                            "publishStatus": "approved",
 *                            "extraStatus": [],
 *                            "title": "project",
 *                            "location": "as",
 *                            "description": "asd",
 *                            "dueDate": "2022-10-27T00:00:00.000Z",
 *                            "projectPhoto": "https://ceibro.s3.eu-north-1.amazonaws.com/projects/WhatsApp%20Image%202022-09-20%20at%204.02.41%20AM.jpeg",
 *                            "id": "63440cacb866c91778afb150",
 *                          },
 *                          id: 63440d83b866c91778afb187
 *                        }
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * @swagger
 * /chat/rooms/getchat:
 *   post:
 *     summary: Get a users all chat rooms
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                  userallchat: [{
 *                    isGroupChat: true,
 *                    members: [{
                        "firstName": "ali",
                        "surName": "ramay",
                        "id": "63440bc8b866c91778afb006"
                      },{"firstName": "ali",
                        "surName": "ramay",
                        "profilePic": "https://ceibro.s3.eu-north-1.amazonaws.com/users/299135192_176849404820558_8243208270808006890_n%20%281%29.jpg",
                        "id": "63440bc8b866c91778afb006"
                      }],
 *                    removedMembers: [],
 *                    pinnedBy: [],
 *                    mutedBy: [],
 *                    pinTitle: "Pinned messages",
 *                    _id: "634672d39bc1aa10108ac1c3",
 *                    name: "chat room",
 *                    initiator: "63440bc8b866c91778afb006",
 *                    project: {
 *                      "title": "project",
 *                      "id": "63440cacb866c91778afb150",
 *                    },
 *                    "createdAt": "2022-10-12T07:54:59.720Z",
 *                    "updatedAt": "2022-10-12T07:54:59.720Z",
 *                    "__v": 0,
 *                  },{
 *                    isGroupChat: true,
 *                    members: [{
                        "firstName": "ali",
                        "surName": "ramay",
                        "id": "63440bc8b866c91778afb006"
                      },{"firstName": "Ceibro",
                        "surName": "ZS",
                        "profilePic": "https://ceibro.s3.eu-north-1.amazonaws.com/users/299135192_176849404820558_8243208270808006890_n%20%281%29.jpg",
                        "id": "63440bc8b866c91778afb006"
                      }],
 *                    removedMembers: [],
 *                    pinnedBy: [],
 *                    mutedBy: [],
 *                    pinTitle: "new name",
 *                    _id: "634672d39bc1aa10108ac1c3",
 *                    name: "Ceibro Testings",
 *                    initiator: "63440bc8b866c91778afb006",
 *                    project: {
 *                      "title": "My Ceibro",
 *                      "id": "63440cacb866c91778afb150",
 *                    },
 *                    "createdAt": "2022-10-12T07:54:59.720Z",
 *                    "updatedAt": "2022-10-12T07:54:59.720Z",
 *                    "__v": 0,
 *                    "lastMessage": {
                        "message": "hy",
                        "id": "63466a3c64f12a07e4686445"
                      },
 *                  }]
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
 * /chat/room/single/{userId}:
 *   post:
 *     summary: Create a one to one chat room
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *                example:
 *                  message: {
 *                            isGroupChat: true,
  *                           members: [{
                                 "role": "user",
                                 "isEmailVerified": true,
                                 "pinnedMessages": [],
                                 "pinnedChat": [],
                                 "mutedChat": [],
                                 "isOnline": true,
                                 "firstName": "ali",
                                 "surName": "ramay",
                                 "email": "test@gmail.com",
                                 "socketId": "2Cs-UPJ4rTB-EXgwAAAR",
                                 "id": "63440bc8b866c91778afb006"
                               },{"role": "user",
                                 "isEmailVerified": true,
                                 "pinnedMessages": [],
                                 "pinnedChat": [],
                                 "mutedChat": [],
                                 "isOnline": true,
                                 "firstName": "ali",
                                 "surName": "ramay",
                                 "email": "test@gmail.com",
                                 "socketId": "2Cs-UPJ4rTB-EXgwAAAR",
                                 "id": "63440bc8b866c91778afb006"
                               }],
 *                             removedMembers: [],
 *                             pinnedBy: [],
 *                             pinTitle: Pinned messages,
 *                             name: chat room,
 *                             initiator: 63440bc8b866c91778afb006,
 *                             id: 634515c18b1cf14550f9370b,
 *                           }
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /chat/room/messages/{roomId}:
 *   post:
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
 *              example:
 *                  message: [{
 *                            "type": "message",
                              "receivedBy": [
                                "63455ddfa76e8341bc220e56"
                              ],
                              "readBy": [
                                {
                                  "firstName": "Ceibro",
                                  "surName": "ZS",
                                  "id": "63455ddfa76e8341bc220e56"
                                }
                              ],
                              "pinnedBy": [],
                              "answeredBy": [],
                              "access": [
                                "63455ddfa76e8341bc220e56"
                              ],
                              "questions": [],
                              "_id": "6346a9ec87d2bc1aacb7fe8e",
                              "sender": {
                                "firstName": "Ceibro",
                                "surName": "ZS",
                                "id": "63455ddfa76e8341bc220e56"
                              },
                              "chat": "63456006be2d7a2830daabcc",
                              "message": "dsflkdsf",
                              "files": [],
                              "voiceUrl": null,
                              "createdAt": "2022-10-12T11:50:04.767Z",
                              "updatedAt": "2022-10-12T11:50:04.767Z",
                              "__v": 0,
                              "myMessage": true,
                              "time": "3 minutes ago",
                              "companyName": "Test company",
                              "seen": "true",
 *                            },{
 *                            "type": "message",
                              "receivedBy": [
                                "63455ddfa76e8341bc220e56"
                              ],
                              "readBy": [
                                {
                                  "firstName": "Ceibro",
                                  "surName": "ZS",
                                  "id": "63455ddfa76e8341bc220e56"
                                }
                              ],
                              "pinnedBy": [],
                              "answeredBy": [],
                              "access": [
                                "63455ddfa76e8341bc220e56"
                              ],
                              "questions": [],
                              "_id": "6346a9ed87d2bc1aacb7fe9d",
                              "sender": {
                                "firstName": "Ceibro",
                                "surName": "ZS",
                                "id": "63455ddfa76e8341bc220e56"
                              },
                              "chat": "63456006be2d7a2830daabcc",
                              "message": "s;nfdslkfmds",
                              "files": [],
                              "voiceUrl": null,
                              "createdAt": "2022-10-12T11:50:05.664Z",
                              "updatedAt": "2022-10-12T11:50:05.664Z",
                              "__v": 0,
                              "myMessage": true,
                              "time": "3 minutes ago",
                              "companyName": "Test company",
                              "seen": "true",
 *                  }]
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
 * /chat/room/profile-pic/{roomId}:
 *   patch:
 *     summary: Update chat room profile pic
 *     description: update profile
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
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                profilePic:
 *                  type: string
 *                  format: binary
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                 message: "profile pic updated successfully"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /chat/room/{roomId}:
 *   delete:
 *     summary: delete chat room
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
 *                example:
 *                  message: "Room deleted"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: update chat room
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
 *              example:
 *                message: "Room updated"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /chat/pinned/title/{roomId}:
 *   put:
 *     summary: update chat room
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *                 title: modifieds
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                  message: "modified"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /chat/room/unread/{roomId}:
 *   put:
 *     summary: set all room messages unread
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
 *                example:
 *                  message: "Ok"
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
 * /chat/room/read/{roomId}:
 *   put:
 *     summary: set all room messages read
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
 *               example:
 *                  message: "All messages read by users"
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
 *                example:
 *                  message: "Chat added to favourite"
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
 *                example:
 *                  message: "Chat muted"
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
 *                 chat: "234234234"
 *                 type: 'message || questioniar || voice'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                example:
 *                 message: {
 *                           type: message,
 *                           receivedBy: ["63455d4093aefb34d80d7ac8"],
 *                           members: [{
                              "role": "user",
                              "isEmailVerified": true,
                              "pinnedMessages": [],
                              "pinnedChat": ["63456481c8473c32d0f78fb0"],
                              "mutedChat": ["63456481c8473c32d0f78fb0"],
                              "isOnline": true,
                              "firstName": "ali",
                              "surName": "ramay",
                              "email": "ahmadramay3@gmail.com",
                              "socketId": "NUZjwGI8HF6e-aT3AAAF",
                              "id": "63455d4093aefb34d80d7ac8"
                             }],
 *                           pinnedBy: [],
 *                           answeredB: [],
 *                           access: ["63455d4093aefb34d80d7ac8"],
 *                           questions: [],
 *                           sender: {
 *                            "role": "user",
 *                            "isEmailVerified": true,
 *                            "pinnedChat": ["63456481c8473c32d0f78fb0"],
 *                            "mutedChat": ["63456481c8473c32d0f78fb0"],
 *                            "isOnline": true,
 *                            "firstName": "ali",
 *                            "surName": "ramay",
 *                            "email": "ahmadramay3@gmail.com",
 *                            "socketId": "NUZjwGI8HF6e-aT3AAAF",
 *                            "id": "63455d4093aefb34d80d7ac8"
 *                           },
 *                           chat: 63456481c8473c32d0f78fb0,
 *                           message: This is reply,
 *                           files: [],
 *                           voiceUrl: null,
 *                           id: 634577e3c4606b3c38e634a9
 *                        }
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
 * /chat/message/forward:
 *   post:
 *     summary: forward message to chat rooms
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filesOnly
 *         required: false
 *         schema:
 *           type: boolean
 *         description: forward file only of messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               chatIds:
 *                 type: string
 *               messageId:
 *                 type: string
 *             example:
 *              messageId: "23423423424"
 *              chatIds: ["234234234"]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                message: "forwarded"
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
 *               example:
 *                message: "Message added to  favourite"
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * @swagger
 * /chat/message/favourites/{messageId}:
 *   post:
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
 *               example:
 *                message: []
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
 *               example:
 *                message: []
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
 *   post:
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
 *               example:
 *                count: 0
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
 *               example:
 *                  message: "Member removed"
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
 * /chat/member/available/{roomId}:
 *   get:
 *     summary: get available new members for chat
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
 *               example:
 *                message: [{
 *                          "firstName": "ali",
                            "surName": "ramay",
                            "id": "63455d4093aefb34d80d7ac8",
 *                         }]
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
 * /chat/message/questionair/{roomId}:
 *   get:
 *     summary: get rooms Quetionaire Messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: questainer room id.
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
