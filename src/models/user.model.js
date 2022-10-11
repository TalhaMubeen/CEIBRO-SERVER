const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Project = require('./project.model');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    surName: {
      type: String,
      // required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    wrongAttempts: {
      type: Number,
      default: 0,
      private: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
      private: true,
    },
    lockedUntil: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    pinnedMessages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Message',
      },
    ],
    pinnedChat: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chat',
      },
    ],
    mutedChat: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Chat',
      },
    ],
    isOnline: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
    },
    companyVat: {
      type: String,
    },
    companyLocation: {
      type: String,
    },
    companyPhone: {
      type: String,
    },
    workEmail: {
      type: String,
    },
    currentlyRepresenting: {
      type: Boolean,
    },
    emailVerifyOtp: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

userSchema.statics.createDefultProject = async function (userId) {
  // creating default role
  const defaultProject = await Project.create({
    title: 'My Ceibro',
    status: 'draft',
    owner: [userId],
    isDefault: true,
  });
  await Project.createDefultRoleAndGroup(defaultProject._id);
  return defaultProject._id;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
