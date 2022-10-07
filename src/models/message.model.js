const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    chat: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Chat',
    },
    type: {
      type: String,
      Enum: ['message', 'questioniar', 'voice'],
      default: 'message',
    },
    title: {
      type: String,
      // only for questioniar
    },
    message: {
      type: String,
      required: false,
    },
    voiceUrl: {
      type: String,
      required: false,
    },
    receivedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    readBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    replyOf: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Message',
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    pinnedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    answeredBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    files: [
      {
        url: { type: String },
        fileType: { type: String },
        fileName: { type: String },
      },
    ],
    access: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    questions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
