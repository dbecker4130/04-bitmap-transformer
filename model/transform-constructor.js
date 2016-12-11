'use strict';

module.exports = exports = {};

exports.rotateRight = function(bitmap) {
  if(!bitmap) return;

  var pixels = bitmap.getPixelArray();
  var width  = bitmap.getWidth();
  var height = bitmap.getHeight();

  var dest = [];

  bitmap.setWidth(height);
  bitmap.setHeight(width);

  //NOTE: row < width, rather than height, because we are rotating.
  for(let row = 0; row < width; row++) {
    for(let col = 0; col < height; col++) {
      var sIndex = col * width + width - 1 - row;
      var dIndex = row * height + col;
      dest[dIndex] = pixels[sIndex];
    }
  }

  bitmap.setPixelArray(dest);
};
