exports.resizeImage = (w, h, maxWidth = 1000, maxHeight = 1000) => {
  let sw = w;
  let sh = h;
  let aspect = w / h;
  if (sw > maxWidth) {
    sw = maxWidth;
    sh = ~~(sw / aspect);
  }
  if (sh > maxHeight) {
    aspect = w / h;
    sh = maxHeight;
    sw = ~~(sh * aspect);
  }
  return {sw, sh};
};

exports.toImg = (encodedData) => {
  const imgElement = document.createElement('img');
  imgElement.src = encodedData;
  return imgElement;
};

exports.toPNG = (canvas) => {
  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  return img;
};


exports.toJPG = (canvas) => {
  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/jpg');
  return img;
};

exports.debug = (msg, level) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  level = level || 'info';
  console.log(level + ': ' + msg);
};
