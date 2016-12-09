'use strict';

const bmHelper = require('./lib/bitmap-file-helper.js');

bmHelper.load('./img/palette-bitmap.bmp', function(err, bitMapData) {
  console.log(bitMapData.colors[28]);
  console.dir(bitMapData);
});
