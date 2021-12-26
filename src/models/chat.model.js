const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    // one-to-one chat
    initiator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    type: String,

    // group chat
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    group: {
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

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
