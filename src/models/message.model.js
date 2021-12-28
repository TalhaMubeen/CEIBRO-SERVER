const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {

    sender: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User' 
    },
    message: {
        type: String
    },
    receivedBy: [
        { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'User' 
        }
    ],
    readBy: [
        { 
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'User' 
        }
    ],
    media: [{
        type: String
    }]
  },
  {
    timestamps: true,
  },
);


// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Chat
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
