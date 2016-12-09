'use strict';

const fs = require('fs');
const Bitmap = require('../model/bitmap-constructor.js').Bitmap;

module.exports = exports = {};

exports.load = function(filepath, callback) {
  fs.readFile(filepath, function (err, data) {
    if(err) return callback(err);
    var bm = new Bitmap();
    bm.type = data.toString('utf-8', 0, 2);

    // TODO: check that the type is what we can handle/expect.

    bm.size = data.readInt32LE(2);

    var pixelOffset = data.readUInt32LE(10);
    console.log(pixelOffset);

    var dibSize = data.readUInt32LE(14);
    console.log(dibSize);

    bm.width = data.readUInt32LE(18);
    bm.height = data.readUInt32LE(22);
    bm.bitsPerPixel = data.readUInt16LE(28);
    var numColors = data.readInt32LE(46);

    // TODO: Verify that numColors > 0

    bm.colors = [];
    var pos = dibSize + 14;
    for(let i = 0; i < numColors; i++) {
      var color = {};
      color.blue  = data.readUInt8(pos++);
      color.green = data.readUInt8(pos++);
      color.red   = data.readUInt8(pos++);
      color.alpha = data.readUInt8(pos++);
      bm.colors.push(color);
    }

    var numPixels = bm.width * bm.height;
    bm.pixels = [];
    for (let i = 0; i < numPixels; i++) {
      var offset = pixelOffset + i;
      bm.pixels.push(data.readUInt8(offset));
    }
    // the first row of the image is the bottom row
    callback(null, bm);
  });
};

exports.save = function(filepath, bitmap, callback) {

};
