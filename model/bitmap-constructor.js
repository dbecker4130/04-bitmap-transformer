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

// ---------- GETTERS -----------------

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

// ---------- SETTERS -----------------
Bitmap.prototype.setWidth(width) {
  //TODO: How do we deal with a change in width?
  //      If this is changed without a change to
  //      the pixel array, the image will
  //      be very weird.
  return this; //To chain seters
};
Bitmap.prototype.setHeight(height) {
  //NOTE: Same concerns as with width.
  return this; //To chain seters
};
//Convenience proxy method.
Bitmap.prototype.setDimensions(width, height) {
  this.setWidth(width);
  this.setHeight(height);
  return this; //To chain seters
};
Bitmap.prototype.setColorArray(colors) {
  //TODO: Check length of colors = this.getColorArray()
  //TODO: Check that the items in the array are valid color objects
  //        { red, blue, green, alpha } Order doesn't matter.
  //TODO: Write the colors array back into this.buf
  //TODO: Make sure for each color object, that we write
  //      the bytes in the correct order. See getColorArray
  return this; //To chain seters
};
Bitmap.prototype.setPixelArray(pixels) {
  // pixels should be an array of bytes
  //TODO: Does pixels.length == this.getPixelArray().length?
  //      What do we do if it doesn't?
  //TODO: Are the values in pixels within the size of our color array?
  //TODO: Write the pixels to this.buf, see getPixelArray
  return this; //To chain seters
};

Bitmap.prototype.transform = function(operator) {
  operator(this); //Let the operator mess with this
  return this; //To chain transforms
}

module.exports = exports = {};
exports.Bitmap = Bitmap;
