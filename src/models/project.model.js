const mongoose = require('mongoose');
const { projectPublishStatus } = require('../config/project.config');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    members: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    projectPhoto: {
      type: String,
      required: false,
    },
    publishStatus: {
      type: String,
      enum: Object.values(projectPublishStatus),
      default: projectPublishStatus.DRAFT_PROJECT,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
