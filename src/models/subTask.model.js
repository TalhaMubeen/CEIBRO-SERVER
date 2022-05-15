const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subTaskSchema = mongoose.Schema(
  {
    // one-to-one chat
    title: {
      type: String,
    },
    nudgeTime: {
      type: String,
    },
    assignedTo: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    viewer: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    files: [
      {
        url: { type: String },
        fileType: { type: String },
        fileName: { type: String },
      },
    ],
    dueDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
