const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectMemberSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    isInvited: {
      type: Boolean,
      required: false,
      default: false,
    },
    invitedEmail: {
      type: String,
      required: false,
    },
    group: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Group',
    },
    subContractor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Group',
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectMemberSchema.plugin(toJSON);
projectMemberSchema.plugin(paginate);

/**
 * @typedef ProjectMember
 */
const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);

module.exports = ProjectMember;
