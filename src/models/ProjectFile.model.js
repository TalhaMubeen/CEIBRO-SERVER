const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    access: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
    ],
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    folder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Folder',
    },
    uploadedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    fileType: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

/**
 * @typedef ProjectFile
 */
const ProjectFile = mongoose.model('ProjectFile', fileSchema);

module.exports = ProjectFile;
