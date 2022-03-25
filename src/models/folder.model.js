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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
folderSchema.plugin(toJSON);
folderSchema.plugin(paginate);

/**
 * @typedef Folder
 */
const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
