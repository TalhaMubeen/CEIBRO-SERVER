const Joi = require('joi');
const { password, objectId, accepted } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateProfile = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    surName: Joi.string().required(),
    password: Joi.string().custom(password),
    phone: Joi.string().required(),
    companyName: Joi.string().required(),
    companyVat: Joi.string().required(),
    companyLocation: Joi.string().required(),
    companyPhone: Joi.string().required(),
    workEmail: Joi.string().email().required(),
    currentlyRepresenting: Joi.boolean().required(),
  }),
};

const inviteUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const acceptInvite = {
  params: Joi.object().keys({
    accepted: Joi.string().custom(accepted),
    inviteId: Joi.string().required(),
  }),
};

const acceptAllInvites = {
  params: Joi.object().keys({
    accepted: Joi.string().custom(accepted),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateProfile,
  deleteUser,
  inviteUser,
  acceptInvite,
  acceptAllInvites,
};
