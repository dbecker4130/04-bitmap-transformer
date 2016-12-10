'use strict';

//NOTE: I prefer buf to buff -Geoff
function Bitmap(buf) {
  this.buf = buf;
  this.type = buf.toString('utf-8', 0, 2);

  // TODO: check that the type is what we can handle/expect.

  this.size = buf.readInt32LE(2);

  var pixelOffset = buf.readUInt32LE(10);
  // console.log(pixelOffset);

  var dibSize = buf.readUInt32LE(14);
  // console.log(dibSize);

  this.width = buf.readUInt32LE(18);
  this.height = buf.readUInt32LE(22);
  this.bitsPerPixel = buf.readUInt16LE(28);
  var numColors = buf.readInt32LE(46);

  // TODO: Verify that numColors > 0

  this.colors = [];
  var pos = dibSize + 14;
  for(let i = 0; i < numColors; i++) {
    var color = {};
    color.blue  = buf.readUInt8(pos++);
    color.green = buf.readUInt8(pos++);
    color.red   = buf.readUInt8(pos++);
    color.alpha = buf.readUInt8(pos++);
    this.colors.push(color);
  }

  var numPixels = this.width * this.height;
  this.pixels = [];
  for (let i = 0; i < numPixels; i++) {
    var offset = pixelOffset + i;
    this.pixels.push(buf.readUInt8(offset));
  }
  // the first row of the image is the bottom row

}
Bitmap.prototype.transform = function(operator) {

};

module.exports = exports = {};
exports.Bitmap = Bitmap;
