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
    task: { type: mongoose.SchemaTypes.ObjectId, ref: 'Task' },
    assignedTo: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    viewer: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],

    nudgeBeforeDays: {
      type: Number,
      required: false,
    },
    customNudgeTime: {
      type: Date,
      required: false,
    },
    imageRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    commentRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    acceptAction: {
      // when task assign to user then whather user performed initial action or not like accepted or rejected
      type: Boolean,
      required: false,
      default: false,
    },
    isAccepted: {
      type: Boolean,
      required: false,
      default: false,
    },
    completeAction: {
      // when user accepted a subTask and then if user performed main action like user can mark task complete or can again reject subTask
      type: Boolean,
      required: false,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    completeComments: {
      type: String,
      required: false,
    },
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
subTaskSchema.plugin(toJSON);
subTaskSchema.plugin(paginate);

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
