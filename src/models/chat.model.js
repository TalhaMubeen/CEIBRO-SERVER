const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    // one-to-one chat
    name: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      default: true,
    },
    initiator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    removedMembers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],

    // group chat
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    group: {
      type: String,
    },
    lastMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Message',
    },
    pinnedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    mutedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    pinTitle: {
      type: String,
      default: 'Pinned messages',
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

chatSchema.index({ name: 'text' });

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
