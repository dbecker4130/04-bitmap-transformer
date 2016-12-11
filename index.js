'use strict';

const bmHelper = require('./lib/bitmap-file-helper.js');

//TODO: I suggest we change bitMapData to bitmap. -Geoff
bmHelper.load('./img/palette-bitmap.bmp', function(err, bitMapData) {
  // console.log(bitMapData.colors[28]);
  // console.dir(bitMapData);
  // for(var prop in bitMapData) {
  //   console.log(prop);
  // }
  console.log(bitMapData.getColorArray());
  console.log(bitMapData.getPixelArray());

  // bmHelper.save('./img/test.bmp', bitMapData, function(err, data) {
  //   if(err) console.log('error:', err); //TODO: Just log for test
  //   console.log('data:', data);
  // });

  var pixels = bitMapData.getPixelArray();
  for(let i in pixels) {
    pixels[i] = 0; //Setting all pixels to color 0.
  }
  bitMapData.setPixelArray(pixels);
  bmHelper.save('./temp/black.bmp', bitMapData, function(err, data) {
    if(err) console.log(err);
    console.log('done saving data:', data);
  });

});
