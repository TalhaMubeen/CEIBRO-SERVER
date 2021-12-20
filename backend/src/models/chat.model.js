const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    // one-to-one chat
    from: { type: mongoose.SchemaType.ObjectId, ref: 'User' },
    to: { type: mongoose.SchemaType.ObjectId, ref: 'User' },

    // group chat
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    group: {
      type: String,
    },
    owner: {
      type: mongoose.SchemaType.ObjectId,
      ref: 'User',
    },

    // chat contents
    messages: [
      {
        sender: { type: mongoose.SchemaType.ObjectId, ref: 'User', require: true },
        message: { type: String },
        timestamp: { type: Date },
        status: { type: String }, // draft, sent, failed, etc.
        // receivedBy: [ { type: mongoose.SchemaType.ObjectId } ]
        // readBy: [ { type: mongoose.SchemaType.ObjectId } ]
      },
    ],
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
