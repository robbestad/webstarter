const decodeBase64Image = require('./decodeBase64Image');
const cloudinary = require('cloudinary');
const config = require('./config/config');
const fs = require('fs');
const {resizeImage} = require('./src/helperfncs');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

const maxWidth = 1500;
const maxHeight = 1500;

const upload = (body) => {
  return new Promise((resolve, reject) => {
    const tempName = new Date().getTime();
    console.log(body.photo.length/1024);
    const imageBuffer = decodeBase64Image(body.photo);
    fs.writeFile('temp/' + tempName + '.jpg', imageBuffer.data, err => {
      if (err) reject(err);
      cloudinary.uploader.upload('temp/' + tempName + '.jpg', result => {
          console.log("result from cloudinary");
          console.log(result);
          let imageUrl = result.secure_url;
          if (result.width > maxWidth) {
            imageUrl = result.secure_url.replace('upload/', 'upload/c_scale,w_1000/');
          }
          const {width, height} = result;
          const {sw, sh} = resizeImage(width, height, maxWidth, maxHeight);

          resolve({
            width,
            height,
            sw,
            sh,
            imageUrl
          });
        },
        {public_id: "facer/" + tempName});
    });
  });
};
module.exports = upload;