const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const answerSchema = mongoose.Schema(
  {
    // one-to-one chat
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Qustion',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
answerSchema.plugin(toJSON);

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
