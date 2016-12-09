'use strict';

const bmHelper = require('./lib/bitmap-file-helper.js');

bmHelper.load('./img/palette-bitmap.bmp', function(err, bitMapData) {
  console.dir(bitMapData);
});
