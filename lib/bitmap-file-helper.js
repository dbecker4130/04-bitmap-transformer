'use strict';

const fs = require('fs');
const Bitmap = require('../model/bitmap-constructor.js').Bitmap;

module.exports = exports = {};

exports.load = function(filepath, callback) {
  fs.readFile(filepath, function (err, data) {
    if(err) return callback(err);
    var bm = new Bitmap();
    bm.type = data.toString('utf-8', 0, 2);
    bm.size = data.readInt32LE(2);
    bm.width = data.readUInt32LE(18);
    bm.height = data.readUInt32LE(22);
    callback(null, bm);
  });
};

exports.save = function(filepath, bitmap, callback) {

};
