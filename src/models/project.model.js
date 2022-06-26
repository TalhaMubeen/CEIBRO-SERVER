const mongoose = require('mongoose');
const { projectPublishStatus } = require('../config/project.config');
const { toJSON, paginate } = require('./plugins');
const Role = require('./role.model');
const Group = require('./group.model');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    isDefault: {
      type: Boolean,
      default: false,
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
    usersCount: {
      type: Number,
      required: false,
      default: 0,
    },
    docsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    tasksCount: {
      type: Number,
      required: false,
      default: 0,
    },
    chatCount: {
      type: Number,
      required: false,
      default: 0,
    },
    publishStatus: {
      type: String,
      default: projectPublishStatus.DRAFT_PROJECT,
    },
    extraStatus: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

projectSchema.statics.createDefultRoleAndGroup = async function (projectId) {
  // creating default role
  const defaultRole = new Role({
    name: 'Admin',
    admin: true,
    project: projectId,
  });
  defaultRole.save();

  // creating default group
  const defaultGroup = new Group({
    name: 'Admin',
    project: projectId,
  });
  defaultGroup.save();
};

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
