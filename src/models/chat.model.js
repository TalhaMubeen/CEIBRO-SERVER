const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    // one-to-one chat
    name: {
      type: String,
    },
    initiator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],

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


chatSchema.index({ name: "text" });

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
