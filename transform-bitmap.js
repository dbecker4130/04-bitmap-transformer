'use strict';

const helper = require('./lib/bitmap-file-helper.js');
const transforms = require('./model/transform-constructor.js');

if(process.argv.length < 5) {
  printUsage();
  return 0;
}

var srcFile = process.argv[2];
var dstFile = process.argv[3];
var chain   = process.argv.slice(4);

helper.load(srcFile, function(err, bitmap) {
  if(err) throw err;
  for(let i = 0; i < chain.length; i++) {
    var nv = chain[i].split('=');
    var name = nv[0];
    var operation = transforms[name];
    if(nv.length == 2) {
      operation = operation(nv[1]);
    }
    // var operation = transforms[chain[i]];
    bitmap.transform(operation);
  }
  helper.save(dstFile, bitmap, function(err) {
    if(err) throw err;
    console.log('SUCCESS');
  });
});

function printUsage() {
  //TODO: Use process.stdout instead of console.log
  console.log('Usage:\nnode transform-bitmap.js src_file dst_file trransform1 [transform2 ...]');
  console.log('  src_file: bitmap file to load to be transformed');
  console.log('  dst_file: where to write the transformed bitmap');
  console.log('  transforms: Series of transforms to perform, sepearated by spaces');
}
