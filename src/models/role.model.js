const mongoose = require('mongoose');
const { rolesAccess } = require('../config/project.config');
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [
      {
        type: String,
        enum: rolesAccess
      }
    ],
    admin: {
      type: Boolean,
      default: false
    },
    member: {
      type: Boolean,
      default: false
    },
    timeProfile: {
      type: Boolean
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'Project'
    },
    submit: {
      type: Boolean,
      default: false
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
