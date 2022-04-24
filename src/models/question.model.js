const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema(
  {
    // one-to-one chat
    question: {
      type: String,
    },
    totalAnswered: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['multiple', 'checkbox', 'shortAnswer'],
      default: 'shortAnswer',
    },
    options: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'QuestionOption',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
