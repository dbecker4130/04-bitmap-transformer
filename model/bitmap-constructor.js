'use strict';

function Bitmap(buf) {
  if(!buf) throw new Error('missing source buffer');
  //tODO: Make buf a private property.
  this.buf = buf;

  if(this.getType() !== 'BM') throw new Error('unknown type, should be BM');

  if(this.getNumColors() < 0) throw new Error('num colors should be a positive integer');

  let w = this.getWidth();
  let h = this.getHeight();
  if(this.getPixelArray().length !== w * h) throw new Error('pixel array size does not equal w * h');

  //note: the first row of the image is the bottom row
}

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
Bitmap.prototype.getNumColors = function() {
  return this.buf.readInt32LE(46);
};
Bitmap.prototype.getColorArray = function() {
  var numColors = this.buf.readInt32LE(46);
  var dibSize = this.buf.readUInt32LE(14);

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
    // return new Error;
    throw new Error('number of colors does not match up');
  }

  for (let i = 0; i < numColors; i++) {
    // if (colors[i])
    if (typeof(colors[i]) !== 'object') {
      // return error? what do we want to do here?
      // return new Error;
      throw new Error('colors array does not contain objects');
    }
    if ((!colors[i].hasOwnProperty('blue')) || (!colors[i].hasOwnProperty('red')) || (!colors[i].hasOwnProperty('green')) || (!colors[i].hasOwnProperty('alpha'))) {
      // return error? what do we want to do here?
      // return new Error;
      throw new Error('color object does not contain correct keys');
      // )
    }
    if ((colors[i].blue > 255) || (colors[i].red > 255) || (colors[i].green > 255) || (colors[i].alpha > 255)) {
      throw new Error('color values are out of bounds');
    }
    if ((colors[i].blue < 0) || (colors[i].red < 0) || (colors[i].green < 0) || (colors[i].alpha < 0)) {
      throw new Error('color values are negative');
    }
  }

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
  if(!Array.isArray(pixels)) {
    throw new Error('invalid pixel array');
  }
  //tODO: Possibly make a getPixelOffset method
  var pixelOffset = this.buf.readUInt32LE(10);
  var numPixels = this.getWidth() * this.getHeight();

  if(pixels.length > numPixels) {
    throw new Error('param pixels is too long to fit in this bitmap');
  }

  // pixels should be an array of integers in the range [0, numColors -1];
  var numColors = this.getNumColors();
  var numToWrite = Math.min(pixels.length, numPixels);
  pixels = pixels.slice(0,numToWrite);
  pixels.forEach(function(pixel) {
    if(!Number.isInteger(pixel)) {
      throw new Error('invalid color value');
    }
    if(pixel < 0 || pixel > numColors - 1) {
      throw new Error('color value out of bounds');
    }
  });

  for(let i = 0; i < numToWrite; i++) {
    var offset = pixelOffset + i;
    this.buf.writeUInt8(pixels[i], offset);
  }

  return this; //To chain seters
};

Bitmap.prototype.transform = function(operator) {
  if(!operator) throw new Error('missing operator');
  //TODO: Determine if operator is a function that takes in a bitmap?!?
  operator(this); //Let the operator mess with this
  return this; //To chain transforms
};

module.exports = exports = {};
exports.Bitmap = Bitmap;
