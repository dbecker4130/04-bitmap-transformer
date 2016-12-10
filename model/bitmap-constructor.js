'use strict';

function Bitmap(buf) {
  //TODO: What happens if !buf ?
  //TODO: Make buf a private property.
  this.buf = buf;
  // this.type = buf.toString('utf-8', 0, 2);

  // TODO: check that the type is what we can handle/expect.

  // this.size = buf.readInt32LE(2);
  //
  // var pixelOffset = buf.readUInt32LE(10);
  //
  // var dibSize = buf.readUInt32LE(14);
  //
  // this.width = buf.readUInt32LE(18);
  // this.height = buf.readUInt32LE(22);
  // // this.bitsPerPixel = buf.readUInt16LE(28);
  //
  // var numColors = buf.readInt32LE(46);
  //
  // // TODO: Verify that numColors > 0
  //
  // this.colors = [];
  // var pos = dibSize + 14;
  // for(let i = 0; i < numColors; i++) {
  //   var color = {};
  //   color.blue  = buf.readUInt8(pos++);
  //   color.green = buf.readUInt8(pos++);
  //   color.red   = buf.readUInt8(pos++);
  //   color.alpha = buf.readUInt8(pos++);
  //   this.colors.push(color);
  // }
  //
  // var numPixels = this.width * this.height;
  // this.pixels = [];
  // for (let i = 0; i < numPixels; i++) {
  //   var offset = pixelOffset + i;
  //   this.pixels.push(buf.readUInt8(offset));
  // }
  // the first row of the image is the bottom row

}

//TODO: Consider the following alternative to setting
//      each method individually:
/*
Bitmap.prototype = {
  getType: function() { ... },
  getWidth: function() { ... },
  ...
};
*/

Bitmap.prototype.getType = function() {
  return this.buf.toString('utf-8', 0, 2);
};
Bitmap.prototype.getWidth = function() {
  return this.buf.readUInt32LE(18);
};
Bitmap.prototype.getHeight = function() {
  return this.buf.readUInt32LE(22);
};
Bitmap.prototype.getColorArray = function() {
  var numColors = this.buf.readInt32LE(46);
  var dibSize = this.buf.readUInt32LE(14);

  // TODO: Verify that numColors > 0

  var colors = [];
  var pos = dibSize + 14;
  for(let i = 0; i < numColors; i++) {
    var color = {};
    color.blue  = this.buf.readUInt8(pos++);
    color.green = this.buf.readUInt8(pos++);
    color.red   = this.buf.readUInt8(pos++);
    color.alpha = this.buf.readUInt8(pos++);
    colors.push(color);
  }
  return colors;
};
Bitmap.prototype.getPixelArray = function() {
  var pixelOffset = this.buf.readUInt32LE(10);
  var numPixels = this.getWidth() * this.getHeight();
  var pixels = [];
  for (let i = 0; i < numPixels; i++) {
    var offset = pixelOffset + i;
    pixels.push(this.buf.readUInt8(offset));
  }
  return pixels;
};

Bitmap.prototype.transform = function(operator) {
}

module.exports = exports = {};
exports.Bitmap = Bitmap;
