
const AWS = require('aws-sdk')
const { awsConfig } = require('../config/aws.config');

const s3bucket = new AWS.S3(awsConfig);
console.log('aws configs are', awsConfig)

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        try{
            const fileName = file.originalname.replace(" ", "_");
            const params = {
                Key:  file.originalname,
                Body: file.buffer,
                Bucket: 'ceibro/chat_media',
                ACL:'public-read-write'
            };
            s3bucket.upload(params, (error, data) => {
                if(error) {
                    reject(error);
                }
                resolve(data);
            });
        } catch(e) {
            reject(e);
        }
    });
};


module.exports = {
    uploadFile
}