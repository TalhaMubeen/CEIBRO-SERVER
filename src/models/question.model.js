const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    // one-to-one chat
    question: {
      type: String,
    },
    type: {
      type: String,
      enum: ['multiple', 'checkbox', 'shortAnswer'],
      default: 'user',
    },
    options: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

chatSchema.index({ name: 'text' });

/**
 * @typedef Chat
 */
const Question = mongoose.model('Question', chatSchema);

module.exports = Question;
