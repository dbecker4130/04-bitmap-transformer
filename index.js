'use strict';

const bmHelper = require('./lib/bitmap-file-helper.js');
const transforms = require('./model/transform-constructor.js');

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

  // makeBlackAndSave(bitMapData);
  // rotateRightAndSave(bitMapData);
  // rotate180AndSave(bitMapData);
  switchColorAndSave(bitMapData);
});

function switchColorAndSave(bitmap) {
  var colors = bitmap.getColorArray();
  colors[0] = {
    red: 255,
    blue: 255,
    green: 255,
    alpha: 0
  };
  bitmap.setColorArray(colors);
  bmHelper.save('./temp/color-swap.bmp', bitmap, function(err) {
    if(err) console.log(err);
    console.log('saved color swap');
  });
}

function rotate180AndSave(bitmap) {
  bitmap.transform(transforms.rotate(180));
  bmHelper.save('./temp/rotated-180.bmp', bitmap, function(err) {
    if(err) console.log(err);
    console.log('saved rotated 180 bmp');
  });
}

function rotateRightAndSave(bitmap) {
  bitmap.transform(transforms.rotateRight);
  bmHelper.save('./temp/rotated-90.bmp', bitmap, function(err, data) {
    if(err) console.log(err);
    console.log('done saving rotated data:', data);
  });
}

function makeBlackAndSave(bitmap) {
  var pixels = bitmap.getPixelArray();
  for(let i in pixels) {
    pixels[i] = 0; //Setting all pixels to color 0.
  }
  bitmap.setPixelArray(pixels);
  bmHelper.save('./temp/black.bmp', bitmap, function(err, data) {
    if(err) console.log(err);
    console.log('done saving data:', data);
  });

}
