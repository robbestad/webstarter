const decodeBase64Image = require('./decodeBase64Image');
const cloudinary = require('cloudinary');
const config = require('./config/config');
const fs = require('fs');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

const upload = (body) => {
  return new Promise((resolve, reject) => {
    const tempName = new Date().getTime();
    console.log(body.photo);
    const imageBuffer = decodeBase64Image(body.photo);
    fs.writeFile('temp/' + tempName + '.jpg', imageBuffer.data, err => {
      if (err) reject(err);
      cloudinary.uploader.upload('temp/' + tempName + '.jpg', result => {
          console.log("result from cloudinary");
          console.log(result);
          resolve(result.secure_url);
        },
        {public_id: "facer/" + tempName});
    });
  });
};
module.exports = upload;