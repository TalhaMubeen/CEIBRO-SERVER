function filterArray(dataArray, key) {
  // example
  // data = [{ firstName, surName, _id }]
  // key = _id

  return dataArray?.filter?.((obj, index) => {
    return dataArray?.findIndex((tempObj) => String(tempObj[key]) === String(obj[key])) === index;
  });
}

module.exports = {
  filterArray,
};
