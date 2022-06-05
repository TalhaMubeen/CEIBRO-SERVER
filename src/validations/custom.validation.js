const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    return helpers.message(
      'Password must contain at least 8 characters, one uppercase, one number'
    );
  }
  return value;
};

const accepted = (value, helpers) => {
  if (value !== 'true' && value !== 'false') {
    return helpers.message('accepted value must be boolean');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  accepted,
};
