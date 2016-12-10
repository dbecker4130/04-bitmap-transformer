'use strict';

const fs = require('fs');
const Bitmap = require('../model/bitmap-constructor.js').Bitmap;

module.exports = exports = {};

exports.load = function(filepath, callback) {
  fs.readFile(filepath, function (err, data) {
    if(err) return callback(err);
    var bm = new Bitmap(data);
    //TODO: Possibly store filepath in the bm object, or pass as
    //      constructor param.
    callback(null, bm);
  });
};

exports.save = function(filepath, bitmap, callback) {
  fs.writeFile(filepath, bitmap.buf, function(err, data) {
    if(err) return callback(err);
    callback(null, data);
  });
};
