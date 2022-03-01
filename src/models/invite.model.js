const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { invitesStatus } = require('../config/user.config');

const InvitaionSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: Object.values(invitesStatus),
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
InvitaionSchema.plugin(toJSON);
InvitaionSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Invite = mongoose.model('Invite', InvitaionSchema);

module.exports = Invite;
