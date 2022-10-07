const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const folderSchema = mongoose.Schema(
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
    parentFolder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Folder',
      default: null,
    },
    group: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Group',
    },
    access: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
folderSchema.plugin(toJSON);
folderSchema.plugin(paginate);

/**
 * @typedef Folder
 */
const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
