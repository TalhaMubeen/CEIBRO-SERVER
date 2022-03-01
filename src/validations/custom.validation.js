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
  if (!value.match(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)) {
    return helpers.message(
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
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
