const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const questionOptionSchema = mongoose.Schema(
  {
    // one-to-one chat
    option: {
      type: String,
    },
    selectedBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionOptionSchema.plugin(toJSON);
questionOptionSchema.plugin(paginate);

/**
 * @typedef QuestionOption
 */
const QuestionOption = mongoose.model('QuestionOption', questionOptionSchema);

module.exports = QuestionOption;
