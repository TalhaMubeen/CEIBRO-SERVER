const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const timeProfileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
timeProfileSchema.plugin(toJSON);
timeProfileSchema.plugin(paginate);

/**
 * @typedef Group
 */
const TimeProfile = mongoose.model('TimeProfile', timeProfileSchema);

module.exports = TimeProfile;
