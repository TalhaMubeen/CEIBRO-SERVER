function filterArray(dataArray, key) {
  // example
  // data = [{ firstName, surName, _id }]
  // key = _id

  return dataArray?.filter?.((obj, index) => {
    return dataArray?.findIndex((tempObj) => String(tempObj[key]) === String(obj[key])) === index;
  });
}

function getUniqueFileName(file) {
  const originalname = file?.originalname;
  const extension = originalname.split(".");
  return file?.fieldname + "-" + Date.now() + "." + extension[extension.length - 1];
}




module.exports = {
  filterArray,
  getUniqueFileName
};
