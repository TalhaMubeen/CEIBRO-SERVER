const mapUsers = (users) => {
  return users.map((user) => ({
    value: user._id,
    label: user.firstName + ' ' + user.surName,
  }));
};

module.exports = {
  mapUsers,
};
