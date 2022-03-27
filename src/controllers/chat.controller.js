const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService, userService, awsService } = require('../services');
const { escapeRegex } = require('../helpers/query.helper');
const { formatMessage } = require('../helpers/chat.helper');
const { RECEIVE_MESSAGE, REPLY_MESSAGE } = require('../config/chat.constants');
const io = require('./webSocket.controller');
const AWS = require('aws-sdk');
const { Message, User } = require('../models');
const Question = require('../models/question.model');
const Answer = require('../models/answers.model');
const ChatTypes = require('../config/chat.constants');
const { getMessageIdsByRoomId, getMessageByIds, getMessageIdsByFilter } = require('../services/chat.service');

const createChat = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const chat = await chatService.createChat(req.body, _id);
  res.status(httpStatus.CREATED).send(chat);
});

const getChats = catchAsync(async (req, res) => {
  const { _id } = req.user;

  let search = pick(req.query, ['name', 'type', 'favourite']);
  let filter = {
    members: {
      $in: [_id],
    },
  };

  if (search.name) {
    const regex = new RegExp(escapeRegex(search.name), 'gi');
    filter = {
      ...filter,
      name: regex,
    };
  }

  if (search.favourite == 'true') {
    filter = {
      ...filter,
      pinnedBy: {
        $in: [_id],
      },
    };
  }

  let chats = await chatService.getAllChats(filter, _id);

  if (search?.type === 'unread') {
    chats = chats?.filter((chat) => chat.unreadCount && chat.unreadCount > 0);
  }

  if (search?.type === 'read') {
    chats = chats?.filter((chat) => !chat.unreadCount || chat.unreadCount <= 0);
  }

  res.send(chats.reverse());
});

const getChat = catchAsync(async (req, res) => {
  const chat = await chatService.getChatById(req.params.userId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  res.send(chat);
});

const updateChat = catchAsync(async (req, res) => {
  const chat = await chatService.updateChatById(req.params.chatId, req.body);
  res.send(chat);
});

const getConversationByRoomId = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;
  const { lastMessageId = null, down = 'false', search } = req.query;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No room exists for this id');
  }

  let idsFilter = {
    chat: roomId,
  };

  if (search) {
    const regex = new RegExp(escapeRegex(search), 'gi');
    idsFilter = {
      ...idsFilter,
      message: regex,
    };
  }

  const messageIds = await getMessageIdsByFilter(idsFilter);

  const options = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10,
    upPagination: down != 'true',
  };

  // zero index if start of paginatio || last message index if not start of pagination
  let index = messageIds.length > 0 ? messageIds.length : -1;

  // if already some pagination is sent then last message id will be  required for next slice of messages
  if (lastMessageId && lastMessageId != 'null' && lastMessageId != 'undefined') {
    const oldIndex = messageIds.findIndex((id) => String(lastMessageId) === String(id));
    console.log('oldIndex: ', oldIndex);
    if (oldIndex > -1) {
      // if last message index found in messages array
      index = oldIndex;
    }
  }

  // Example1 down pagination{
  //   index: 0,
  //   limit: 3,
  //   startingIndex: 0,
  //   downIndex: 4
  // }

  // Example2 up pagination{
  //   index: 5,
  //   limit: 3,
  //   startingIndex: 2,
  //   downIndex: 5
  // }

  const startingIndex = options?.upPagination ? index - options.limit : index + 1;
  const downIndex = options?.upPagination ? index : index + 1 + options.limit;
  const myMessageIds = messageIds.slice(startingIndex, downIndex);
  let conversations = await getMessageByIds(myMessageIds);
  conversations = conversations?.map((conversation) => {
    conversation = formatMessage(conversation, currentLoggedUser);
    return conversation;
  });
  res.status(httpStatus.CREATED).send(conversations);

  // let conversation = await chatService.getConversationByRoomId(roomId, options, currentLoggedUser);
  // console.log('conversations are', conversation)
  // conversation.results = conversation?.results?.map((conversation) => {
  //   conversation = formatMessage(conversation, currentLoggedUser);
  //   return conversation;
  // });
  // res.status(httpStatus.CREATED).send(conversation);
});

const setRoomMessagesRead = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No room exists for this id');
  }

  await chatService.setAllMessagesReadByRoomId(roomId, currentLoggedUser);

  res.status(httpStatus.CREATED).send('All messages read by users');
});

const addToFavouite = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No room exists for this id');
  }
  const [, , added] = await chatService.addOrRemoveChatRoomToFavourite(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Chat ${added ? 'added to ' : 'removed from '} favourite`);
});

const addMessageToFavourite = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { messageId } = req.params;

  const message = await chatService.getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No message exists for this id');
  }

  await chatService.checkChatAuthorization(currentLoggedUser, message.chat);

  const [, , added] = await chatService.addOrRemoveMessageToFavourite(messageId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Message ${added ? 'added to ' : 'removed from '} favourite`);
});

const getPinnedMessages = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { messageId: roomId } = req.params;

  const messages = await chatService.getPinnedMessages(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(messages);
});

const muteChat = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { roomId } = req.params;

  const room = await chatService.getChatRoomByRoomId(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No room exists for this id');
  }
  const [, , muted] = await chatService.muteOrUnmuteChat(roomId, currentLoggedUser);
  res.status(httpStatus.CREATED).send(`Chat ${muted ? 'muted' : 'unmuted'}`);
});

const replyMessage = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { message, chat, messageId, type } = req.body;
  let files = [];
  if (req.files) {
    files = await Promise.all(req.files?.map((file) => awsService.uploadFile(file)));
  }
  let newMessage = null;
  if (messageId) {
    newMessage = await chatService.replyMessage(message, messageId, currentLoggedUser, files);
  } else {
    newMessage = await chatService.sendMessage(message, chat, currentLoggedUser, files, type);
  }

  const myChat = await chatService.getChatById(newMessage.chat);

  global.io.sockets.in(String(newMessage.chat)).emit(RECEIVE_MESSAGE.value, {
    from: currentLoggedUser,
    message: formatMessage(newMessage),
    chat: String(myChat._id),
    mutedFor: myChat.mutedBy,
  });

  res.status(200).send(newMessage);
});

const forwardMessage = catchAsync(async (req, res) => {
  const currentLoggedUser = req.user._id;
  const { chatIds, messageId } = req.body;
  const message = await chatService.getMessageById(messageId);
  if (!message) {
    throw new ApiError('Message not found');
  }
  await Promise.all(
    chatIds.map(async (chatId) => {
      const newMessage = await chatService.sendMessage(
        message.message,
        chatId,
        currentLoggedUser,
        message.type === 'voice' ? [{ url: message.voiceUrl }] : message.files,
        message.type
      );

      const myChat = await chatService.getChatById(newMessage.chat);
      global.io.sockets.in(String(newMessage.chat)).emit(RECEIVE_MESSAGE.value, {
        from: currentLoggedUser,
        message: formatMessage(newMessage),
        chat: String(myChat._id),
        mutedFor: myChat.mutedBy,
      });
    })
  );

  res.status(200).send('forwarded');
});

const getChatRoomMedia = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const currentUser = req.user?._id;
  console.log('current user is ', currentUser, req.user);
  const media = await chatService.getRoomMediaById(roomId, currentUser);
  console.log('media ', media);
  res.status(200).send(media[0]?.files || []);
});

const getUnreadMessagesCount = catchAsync(async (req, res) => {
  const currentUser = req.user?._id;
  const count = await chatService.getUnreadCount(currentUser);
  res.status(200).json({
    count,
  });
});

const addOrRemoveChatMembers = catchAsync(async (req, res) => {
  const { roomId, memberId } = req.params;
  const { temporary = false } = req.query;

  if (String(memberId) == String(req.user._id)) {
    throw new ApiError(400, 'Cannot remove yourself');
  }

  const result = await chatService.addOrRemoveChatMember(roomId, memberId, temporary);
  res.status(200).send(`Member ${result ? 'added' : 'removed'}`);
});

const getAvailableChatMembers = catchAsync(async (req, res) => {
  const { roomId } = req.params;

  const result = await chatService.getAvailableChatMembers(roomId);
  res.status(200).send(result);
});

const saveQuestioniar = catchAsync(async (req, res) => {
  const { dueDate, members, questions, chat } = req.body;
  const userId = req.user._id;

  const myChat = await chatService.getChatById(chat);
  if (!myChat) {
    throw new ApiError(400, 'Invalid chat id');
  }

  const savedQuestions = await Promise.all(
    questions.map((question) => {
      const newQuestion = new Question({
        type: question.type,
        question: question.question,
        options: question.options,
      });
      return newQuestion.save();
    })
  );

  const savedQuestionIds = savedQuestions.map((question) => question._id);

  const message = new Message({
    sender: userId,
    chat: chat,
    receivedBy: [userId],
    readBy: [userId],
    access: [...members, userId],
    questions: savedQuestionIds,
    dueDate: dueDate,
    type: 'questioniar',
  });

  await message.save();

  const myMessage = await chatService.getMessageById(message._id);

  const users = await User.find({
    _id: members,
  });

  users?.map((user) => {
    console.log('my user i s', user, user?.socketId);
    if (user?.socketId) {
      global.io?.sockets?.to(user.socketId)?.emit(ChatTypes.RECEIVE_MESSAGE.value, {
        from: userId,
        message: formatMessage(myMessage),
        chat: String(chat),
        mutedFor: myChat.mutedBy,
      });
    }
  });

  res.status(200).send(message);
});

const getQuestioniarById = catchAsync(async (req, res) => {
  const { questioniarId } = req.params;
  const { _id } = req.user;
  const { userId } = req.query;

  const questioniar = await Message.findOne({
    _id: questioniarId,
  }).populate('questions');

  if (!questioniar) {
    throw new ApiError(400, 'Questioniar not found');
  }

  const isAnswer = questioniar?.answeredBy?.includes(String(_id));
  questioniar._doc.answeredByMe = isAnswer;
  if (isAnswer) {
    const questionIds = await questioniar?.questions?.map((question) => {
      return question._id;
    });

    const answerUser = userId || _id;

    const answers = await Answer.find({
      question: {
        $in: questionIds,
      },
      user: answerUser,
    });

    questioniar.questions = questioniar?.questions.map((question) => {
      const myAnswer = answers.find(
        (answer) => String(answer.user) === String(answerUser) && String(answer.question) === String(question._id)
      );
      question._doc.answer = myAnswer.answer;
      if (question._doc.type === 'checkbox') {
        question._doc.answer = myAnswer.answer.split(',');
      }
      return question;
    });
    questioniar._doc.answeredByMe = true;
  }

  res.status(200).send(questioniar);
});

const getQuestioniarAnswersByUser = catchAsync(async (req, res) => {
  const { questioniarId, userId } = req.params;
  const { _id } = req.user;

  const questioniar = await Message.findOne({
    _id: questioniarId,
  }).populate('questions');

  if (!questioniar) {
    throw new ApiError(404, 'Questioniar not found');
  }

  if (String(questioniar.sender) !== String(_id)) {
    throw new ApiError(400, 'Not authorized');
  }

  const isAnswer = questioniar?.answeredBy?.includes(String(userId));
  if (isAnswer) {
    const questionIds = await questioniar?.questions?.map((question) => {
      return question._id;
    });

    const answerUser = userId;

    const answers = await Answer.find({
      question: {
        $in: questionIds,
      },
      user: answerUser,
    });

    questioniar.questions = questioniar?.questions.map((question) => {
      const myAnswer = answers.find(
        (answer) => String(answer.user) === String(answerUser) && String(answer.question) === String(question._id)
      );
      console.log('my answer is ', myAnswer);
      question._doc.answer = myAnswer.answer;
      if (question._doc.type === 'checkbox') {
        question._doc.answer = myAnswer.answer.split(',');
      }
      return question;
    });
    questioniar._doc.answeredByMe = true;
  } else {
    questioniar._doc.answeredByMe = false;
  }
  console.log('questioniar is ', questioniar);

  return res.status(200).send(questioniar);
});

const saveQuestioniarAnswers = catchAsync(async (req, res) => {
  const { questioniarId } = req.params;
  const { questions } = req.body;
  const { _id } = req.user;

  const myQuestioniar = await Message.findOne({
    _id: questioniarId,
  });

  if (!myQuestioniar) {
    throw new ApiError(400, 'Invalid Questioniar id');
  }

  const dbQuestins = await Promise.all(
    questions.map(async (question) => {
      const myQuestion = await Question.findOne({
        _id: question.id,
      });
      if (!myQuestion) {
        throw new ApiError(400, 'Invalid Question id');
      }
      const ans = question.answer.toString();
      console.log('actual answer is ', ans);
      const answer = new Answer({
        question: question.id,
        answer: ans,
        user: _id,
      });
      return answer.save();
    })
  );

  await Message.updateOne({ _id: questioniarId }, { $addToSet: { answeredBy: _id } });
  res.status(200).send('Answer saved');
});

const deleteChatRoomForUser = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { _id } = req.user;

  const myChat = await chatService.getChatById(roomId);
  if (!myChat) {
    throw new ApiError(400, 'Invalid chat id');
  }

  if (myChat.members.findIndex((userId) => String(userId) === String(_id)) < 0) {
    throw new ApiError(400, 'User does not belongs to this chat room');
  }

  await chatService.removeChatForUser(roomId, _id);
  res.status(200).send('Room deleted');
});

const getQuestionairByTypeMessage = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  console.log('roomId: ', roomId);
  const { _id } = req.user;

  const typeQuestion = await Message.find({
    type: 'questioniar',
    chat: roomId,
  });

  console.log(typeQuestion);
  res.status(200).send(typeQuestion);
});

// const uploadImage = catchAsync(async (req, res) => {
//   const currentLoggedUser = req.user._id;

//   const s3bucket = new AWS.S3({
//     region: 'eu-north-1',
//     'accessKeyId': 'AKIASRVOFC3PM5B3AOIC',
//     secretAccessKey: '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'
//    });
//    console.log(req.file);
//    var params = {
//     Key: req.file.originalname,
//     Body: req.file.buffer,
//     Bucket: 'ceibro/chat-images',
//     ACL:'public-read-write'
//    };
//   s3bucket.upload(params, (s, data) => {
//     console.log('hello', s, data)
//   })
// });

module.exports = {
  createChat,
  getChats,
  getChat,
  updateChat,
  getConversationByRoomId,
  setRoomMessagesRead,
  addToFavouite,
  muteChat,
  replyMessage,
  addMessageToFavourite,
  getPinnedMessages,
  getChatRoomMedia,
  addOrRemoveChatMembers,
  saveQuestioniar,
  getUnreadMessagesCount,
  getQuestioniarById,
  saveQuestioniarAnswers,
  getQuestioniarAnswersByUser,
  deleteChatRoomForUser,
  forwardMessage,
  getQuestionairByTypeMessage,
  getAvailableChatMembers,
  // uploadImage
};
