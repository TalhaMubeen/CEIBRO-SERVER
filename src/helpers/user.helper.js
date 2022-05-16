const mapUsers = (users) => {
  return users.map((user) => ({
    value: user._id,
    label: user.firstName + ' ' + user.surName,
  }));
};

const uniqueBy = (data, key) => {
  return data.filter((row, index) => row && data.findIndex((innerRow) => innerRow?.[key] === row?.[key]) === index);
};

module.exports = {
  mapUsers,
  uniqueBy,
};
