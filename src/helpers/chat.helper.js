const moment = require('moment');

module.exports.formatMessage = function (conversation, currentLoggedUser) {
  return {
    ...conversation._doc,
    myMessage: String(conversation._doc.sender?._id) == String(currentLoggedUser),
    username: conversation?._doc?.sender?.name,
    time: moment(conversation?._doc?.createdAt).fromNow(),
    companyName: 'Test company',
    seen: true,
  };
};

module.exports.getFileTypeByName = (fileName) => {
  return fileName?.split?.('.')?.pop?.() || 'Unknown';
};

module.exports.verifyAnswersByTypes = ({ answer, type }) => {
  if (type === 'multiple') {
    // must be a number
    return !isNaN(answer);
  }
  if (type === 'checkbox') {
    // must be an array
    let result = false;
    if (Array.isArray(answer)) {
      result = true;
      // check if every answer in array is a number
      if (!answer.every((ans) => !isNaN(ans))) {
        result = false;
      }
    }
    return true;
  }
  if (type == 'shortAnswer') {
    return typeof answer === 'string';
  }
};

module.exports.getPercentage = (total, count) => {
  console.log('will be ', (count * 100) / total || 0);
  return Math.round((count * 100) / total || 0);
};
