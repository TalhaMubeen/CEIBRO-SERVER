const moment = require('moment');

module.exports.formatMessage = function(conversation, currentLoggedUser) {
  console.log('by me is',  String(conversation._doc.sender?._id) == String(currentLoggedUser))
    return {
      ...conversation._doc,
      myMessage: String(conversation._doc.sender?._id) == String(currentLoggedUser),
      username: conversation?._doc?.sender?.name,
      time: moment(conversation?._doc?.createdAt).fromNow(),
      companyName: "Test company",
      seen: true,
    }
}