'use strict';

const expect = require('chai').expect;
const Bitmap = require('../model/bitmap-constructor.js').Bitmap;
const helper = require('../lib/bitmap-file-helper.js');

//NOTE: test runs from project root, so we use . instead of ..
const testFilepath = './img/palette-bitmap.bmp';

describe('Bitmap Constructor', function() {
  var testBitmap;
  before('loading test bitmap with helper', function(done) {
    helper.load(testFilepath, function(err, data) {
      if(err) return done(err);
      // console.log('setting testBitmap =',data);
      testBitmap = data;
      done();
    });
  });

  describe('#Bitmap', function() {
    it('should fail on a bogus buffer', function() {
      //TODO: Try new Bitmap() and new Bitmap(junk)
    });
    it('should create a bitmap with a valid buffer', function() {
      expect(testBitmap).to.be.an.instanceof(Bitmap);
      //TODO: Where does the buffer get created?
      //      Do we need to use an async test here?
      //TODO: Verify that we get a valid bitmap object for the buf
    });
  });

  //TODO: Can we load up a valid bitmap to use in all the tests?
  //      Perhaps the before() method?

  describe('#getType', function() {
    it('should return a valid type', function() {
      // console.log('testBitmap:',testBitmap);
      var type = testBitmap.getType();
      expect(type).to.be.a('string');
      expect(type).to.equal('BM');
    });
  });

  describe('#getWidth', function() {
    it('should match the width of our test bitmap', function() {
      var width = testBitmap.getWidth();
      expect(width).to.be.a('number');
      expect(width).to.equal(100);
    });
  });

  describe('#getHeight', function() {
    it('should match the height of our test bitmap', function() {
      var height = testBitmap.getHeight();
      expect(height).to.be.a('number');
      expect(height).to.equal(100);
    });
  });

  describe('#getColorArray', function() {
    it('should be an array', function() {
      var colors = testBitmap.getColorArray();
      expect(colors).to.be.an('array');

    });
    it('should have elements that are color objects', function() {
      var colors = testBitmap.getColorArray();
      colors.forEach(function(color) {
        expect(color).to.have.property('red');
        expect(color).to.have.property('green');
        expect(color).to.have.property('blue');
        expect(color).to.have.property('alpha');
      });

    });
    //TODO: Possibly check that it's the size we expect.
  });

  describe('#getPixelArray', function() {
    // console.log('testBitmap:',testBitmap);
    it('should be an array', function() {
      var pixels = testBitmap.getPixelArray();
      expect(pixels).to.be.an('array');
    });
    it('should have elements that are numbers', function() {
      //TODO: Test for different size color tables, but
      //      for now we can just test our single case.
      var pixels    = testBitmap.getPixelArray();
      var numPixels = testBitmap.getWidth() * testBitmap.getHeight();
      expect(pixels).to.have.lengthOf(numPixels);
      //TODO: Iterate the array to see if the values
      //      are in the range we expect.
      //  OR  We can compare the SHA of pixels to a known result.
    });
  });

  describe('#setWidth', function() {
    it('should alter the width', function() {
      //TODO: If getWidth test is good, then we should
      //      be able to change the width and get that value
      //      back. Not sure how else to test this.
      //      We could maybe dig into the bitmap's buffer
      //      to verify that the value was stored correctly,
      //      but assuming the get calls are pulling from the
      //      buffer, and the get tests pass, we should
      //      probably be ok using the get to check the set.
    });
    it('should fail with bogus values', function() {
      //Try with null, empty, strings, etc
    });
  });

  describe('#setHeight', function() {
    it('should alter the height', function() {
      //TODO: See notes on width
    });
    it('should fail with bogus values', function() {
      //Try with null, empty, strings, etc
    });
  });

  describe('#setColorArray', function() {
    it('should correctly alter the color array', function() {
      //TODO: Similar process to the other set tests
    });
    it('should fail with bogus values', function() {
      //TODO: Try with null, empty, strings, etc
      //TODO: Try an array with bogus or non-color object values.
      //TODO: Try with color objects that have invalid values.
    });
  });

  describe('#setPixelArray', function() {

    it('should correctly alter the pixel array', function(done) {
      //Since we are altering a bitmap, we are loading
      //another copy of the bitmap to see if we can
      //make the changes we expect.
      helper.load(testFilepath, function(err, data) {
        if(err) return done(err);
        var bm = data;
        var pixels = bm.getPixelArray();
        for(let i in pixels) {
          pixels[i] = 0; //Setting all pixels to color 0.
        }
        bm.setPixelArray(pixels);
        //Now check that we get back the same pixels we just set.
        pixels = bm.getPixelArray();
        for(let i in pixels) {
          expect(pixels[i]).to.equal(0);
        }
        done();
      });
    });
    it('should fail with bogus values', function(done) {
      helper.load(testFilepath, function(err, bitmap) {
        if(err) return done(err);
        expect(function() {
          bitmap.setPixelArray();
        }).to.throw(Error);
        expect(function() {
          bitmap.setPixelArray('hi there, I am not an array');
        }).to.throw(Error);
        expect(function() {
          bitmap.setPixelArray(null);
        }).to.throw(Error);

        var pixels = bitmap.getPixelArray();
        pixels[0] = 'this is not a valid pixel value';
        expect(function() {
          bitmap.setPixelArray(pixels);
        }).to.throw(Error);
        pixels[0] = 2734734; //Big ass index
        expect(function() {
          bitmap.setPixelArray(pixels);
        }).to.throw(Error);
        pixels[0] = -200;
        expect(function() {
          bitmap.setPixelArray(pixels);
        }).to.throw(Error);

        done();
      });
    });
  });

  describe('#transform', function() {
    it('should fail on a bogus or non-conforming operator', function() {
      //TODO: Try null, empty, non-function
      //TODO: Try a function that isn't an operation
    });
    it('should return the bitmap when complete', function() {
      //TODO: Need a valid test transform to apply on the bitmap.
      //TODO: Make sure that the transform op returns the test bitmap.
    });
    //NOTE: We should test all our transform operations in
    //      the transform-constructor-test.
  });

});
