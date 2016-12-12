'use strict';

function Bitmap(buf) {
  //TODO: What happens if !buf ?
  //TODO: Make buf a private property.
  this.buf = buf;

  //TODO: check that the type is what we can handle/expect.
  //TODO: Verify that numColors > 0
  //TODO: What else can/should be checked at the time of creation?

  //NOTE: the first row of the image is the bottom row
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
Bitmap.prototype.setWidth = function(width) {
  //TODO: Is width a number, and is it in a range we expect?
  //TODO: How do we deal with a change in width?
  //      If this is changed without a change to
  //      the pixel array, the image will
  //      be very weird.
  return this; //To chain seters
};
Bitmap.prototype.setHeight = function(height) {
  //NOTE: Same concerns as with width.
  return this; //To chain seters
};
//Convenience proxy method.
Bitmap.prototype.setDimensions = function(width, height) {
  this.setWidth(width);
  this.setHeight(height);
  return this; //To chain seters
};
Bitmap.prototype.setColorArray = function(colors) {
  var dibSize = this.buf.readUInt32LE(14);
  var numColors = this.buf.readInt32LE(46);
  //TODO: Check length of colors = this.getColorArray()
  if(colors.length !== numColors) {
    // What does in here? Return an error?
    return new Error;
  }
  //TODO: Check that the items in the array are valid color objects
  //        { red, blue, green, alpha } Order doesn't matter.
  // NOTE line 95 - 106 to be put back in at later time, do not delete

  for (let i = 0; i < numColors; i++) {
    // if (colors[i])
    if (typeof(colors[i]) !== 'object') {
      // return error? what do we want to do here?
      return new Error;
    }
    if ((!colors[i].hasOwnProperty('blue')) || (!colors[i].hasOwnProperty('red')) || (!colors[i].hasOwnProperty('green')) || (!colors[i].hasOwnProperty('alpha'))) {
      // return error? what do we want to do here?
      return new Error;
    }
    if ((colors[i].blue > 255) || (colors[i].red > 255) || (colors[i].green > 255) || (colors[i].alpha > 255)) {
      // return error? what do we want to do here?
    }
  }

  //TODO: Write the colors array back into this.buf
  //TODO: Make sure for each color object, that we write
  //      the bytes in the correct order. See getColorArray
  var position = dibSize + 14;
  for (let i = 0; i < numColors; i++) {
    this.buf.writeUInt8(colors[i].blue, position++);
    this.buf.writeUInt8(colors[i].green, position++);
    this.buf.writeUInt8(colors[i].red, position++);
    this.buf.writeUInt8(colors[i].alpha, position++);
  }
  return this; //To chain seters
};
Bitmap.prototype.setPixelArray = function(pixels) {
  //TODO: Possibly make a getPixelOffset method
  var pixelOffset = this.buf.readUInt32LE(10);
  var numPixels = this.getWidth() * this.getHeight();

  // pixels should be an array of bytes
  //TODO: Does pixels.length == this.getPixelArray().length?
  //      What do we do if it doesn't?
  if(pixels.length !== numPixels) {
    // In an async pattern, we'd return callback(new Error('pixels length does not match'));
    // However, perhaps we should just write out the
    // min of either pixels.length or numPixels.
  }

  //TODO: Are the values in pixels within the size of our color array?

  var numToWrite = Math.min(pixels.length, numPixels);

  for (let i = 0; i < numToWrite; i++) {
    var offset = pixelOffset + i;
    this.buf.writeUInt8(pixels[i], offset);
  }

  return this; //To chain seters
};

Bitmap.prototype.transform = function(operator) {
  operator(this); //Let the operator mess with this
  return this; //To chain transforms
};

module.exports = exports = {};
exports.Bitmap = Bitmap;
