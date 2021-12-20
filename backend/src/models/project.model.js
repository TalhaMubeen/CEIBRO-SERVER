const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    groups: [
      {
        name: {
          type: String,
          require: true,
          unique: true,
        },
        members: [
          {
            email: { type: String },
            joinDate: { type: Date },
            type: { type: String }, // temporary/permanent
          },
        ],
        createdAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
