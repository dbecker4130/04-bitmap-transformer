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
      expect(function() {
        new Bitmap(); //empty/missing buffer
      }).to.throw(Error);
      //TODO: Create buffers with some bogus values to test
    });
    it('should create a bitmap with a valid buffer', function() {
      expect(testBitmap).to.be.an.instanceof(Bitmap);
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
      //tODO: Test for different size color tables, but
      //      for now we can just test our single case.
      var pixels    = testBitmap.getPixelArray();
      var numPixels = testBitmap.getWidth() * testBitmap.getHeight();
      var numColors = testBitmap.getNumColors();
      expect(pixels).to.have.lengthOf(numPixels);
      pixels.forEach(function(pixel) {
        expect(pixel).to.be.within(0, numColors - 1);
      });
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
    it('should correctly alter the color array', function(done) {
      helper.load(testFilepath, function (err, data) {
        if(err) return done(err);
        var bm = data;
        var colors = bm.getColorArray();
        var testColor = {red: 111, blue: 111, green: 111, alpha: 111};
        for (let i in colors) {
          colors[i] = testColor;
        }
        bm.setColorArray(colors);
        colors = bm.getColorArray();
        for (let i in colors) {
          expect (colors[i]).to.deep.equal(testColor);
        }
        done();
      });
    });
    it('should fail with bogus values', function(done) {
      helper.load(testFilepath, function(err, data) {
        if(err) return done(err);
        expect(function() {
          data.setColorArray();
        }).to.throw(Error);
        expect(function() {
          data.setColorArray('this is not an array');
        }).to.throw(Error);
        expect(function() {
          data.setColorArray({});
        }).to.throw(Error);
        expect(function() {
          data.setColorArray({notAValidColor: 123});
        }).to.throw(Error);
        done();
      });
    });
    it('should fail with non-color objects', function(done) {
      helper.load(testFilepath, function(err, data) {
        var colors = data.getColorArray();
        colors[0] = {animal: 'capybara'};
        expect(function () {
          data.setColorArray(colors);
        }).to.throw(Error);
        colors[0] = 'this is a string';
        expect(function() {
          data.setColorArray(colors);
        }).to.throw(Error);
        colors[0] = null;
        expect(function () {
          data.setColorArray(colors);
        }).to.throw(Error);
        colors[0] = {red: 300, blue: 300, green: 300, alpha: 300};
        expect(function () {
          data.setColorArray(colors);
        }).to.throw(Error);
        done();
      });
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
    it('should fail on a bogus operator', function() {
      expect(function() {
        testBitmap.transform();
      }).to.throw(Error);
      expect(function() {
        testBitmap.transform(null);
      }).to.throw(Error);
      expect(function() {
        testBitmap.transform('grayscale'); //String, not op
      }).to.throw(Error);
    });
    it('should return the bitmap when complete', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, bitmap) {
        if(err) return done(err);
        var check = bitmap.transform(function(bitmap) {
          //no op
        });
        expect(bitmap).to.equal(check);
        done();
      });


      //TODO: Need a valid test transform to apply on the bitmap.
      //TODO: Make sure that the transform op returns the test bitmap.
    });
    //NOTE: We should test all our transform operations in
    //      the transform-constructor-test.
  });

});
