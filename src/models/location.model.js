const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const locationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        timeProfile: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'TimeProfile',
        },
        depth: {
            type: Number,
            default: 1,
        },
        parents: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
        }],
        isInternal: {
            type: Boolean,
            default: false
        },
        externalChilds: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
        }],
        internalChilds: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Location',
        }],
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
