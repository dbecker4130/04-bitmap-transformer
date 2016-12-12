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

// example of a constructor that takes in a param and returns
//  the transform function that uses the param.
exports.rotate = function(angle) {
  if(!angle) throw new Error('missing angle param');
  if(angle % 90 !== 0) throw new Error('angle not a multiple of 90');
  return function(bitmap) {
    var steps = angle / 90;
    var phase = steps % 4;
    // -3 < phase < 3
    if(phase < 0) phase += 4;
    // 0 < phase < 3
    for(let i = 0; i < phase; i++) {
      bitmap.transform(exports.rotateRight);
    }
  };
};
