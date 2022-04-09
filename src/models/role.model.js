const mongoose = require('mongoose');
const { rolesAccess, memberAccess, timeProfileAccess } = require('../config/project.config');
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
    member: [
      {
        type: String,
        enum: memberAccess
      }
    ],
    timeProfile: [
      {
        type: String,
        enum: timeProfileAccess
      }
    ],
    project: {
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'Project'
    },
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
