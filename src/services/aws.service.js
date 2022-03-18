const AWS = require('aws-sdk');
const { awsConfig } = require('../config/aws.config');
const { getFileTypeByName } = require('../helpers/chat.helper');

const folders = {
  USER_FOLDER: 'users',
  CHAT_FOLDER: 'chat_media',
  PROJECT_FOLDER: 'projects'
};

const s3bucket = new AWS.S3(awsConfig);

const uploadFile = (file, folder = folders.CHAT_FOLDER) => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Key: file.originalname,
        Body: file.buffer,
        Bucket: `ceibro/${folder}`,
        ACL: 'public-read-write',
      };
      s3bucket.upload(params, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve({
          url: data.Location,
          fileType: getFileTypeByName(file.originalname),
          fileName: file.originalname,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  uploadFile,
  bucketFolders: folders,
};
