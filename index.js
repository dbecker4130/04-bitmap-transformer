'use strict';

const bmHelper = require('./lib/bitmap-file-helper.js');

bmHelper.load('./img/palette-bitmap.bmp', function(err, bitMapData) {
  // console.log(bitMapData.colors[28]);
  console.dir(bitMapData);

  bmHelper.save('./img/test.bmp', bitMapData, function(err, data) {
    if(err) console.log('error:', err); //TODO: Just log for test
    console.log('data:', data);
  });
});
