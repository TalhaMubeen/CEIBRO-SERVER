const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const workSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'TimeProfile',
    },
    roles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Role',
      },
    ],
    time: {
      type: Boolean,
      required: false,
      default: false,
    },
    timeRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    quantity: {
      type: Boolean,
      required: false,
      default: false,
    },
    quantityRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    comment: {
      type: Boolean,
      required: false,
      default: false,
    },
    commentRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    photo: {
      type: Boolean,
      required: false,
      default: false,
    },
    photoRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
workSchema.plugin(toJSON);
workSchema.plugin(paginate);

/**
 * @typedef Work
 */
const Work = mongoose.model('Work', workSchema);

module.exports = Work;
