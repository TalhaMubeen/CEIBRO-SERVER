const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    // one-to-one chat
    title: {
      type: String,
    },
    assignedTo: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    admins: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
    },
    dueDate: {
      type: Date,
      required: false,
    },
    multiTask: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
