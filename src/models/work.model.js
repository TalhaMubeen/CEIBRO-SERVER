const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const workSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    locations: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    works: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
workSchema.plugin(toJSON);
workSchema.plugin(paginate);

/**
 * @typedef Work
 */
const Work = mongoose.model('Work', workSchema);

module.exports = Work;
