const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 100mb.
    fileSize: 1024 * 1024 * 1024,
  },
});

module.exports.multerUpload = upload;

module.exports.awsConfig = {
  region: 'eu-north-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
