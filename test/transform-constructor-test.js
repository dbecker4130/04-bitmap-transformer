'use strict';

const expect = require('chai').expect;

const transforms = require('../model/transform-constructor.js');
const helper = require('../lib/bitmap-file-helper.js');

describe('Transform Constructor', function() {
  describe('#rotateRight', function() {
    var expectedBitmap;
    before('loading expected bitmap result', function(done) {
      helper.load('./img/test-rotated-90.bmp', function(err, data) {
        if(err) return done(err);
        expectedBitmap = data;
        done();
      });
    });
    it('should rotate bitmap 90 degrees clockwise', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, data) {
        if(err) return done(err);
        var bm = data;
        bm.transform(transforms.rotateRight);
        // var check = expectedBitmap.buf.toString('base64');
        // var got = bm.buf.toString('base64');
        // expect(got).to.equal(check);
        expect(expectedBitmap).to.deep.equal(bm);

        //Checking if 4 more rotates leaves us the same.
        bm.transform(transforms.rotateRight)
          .transform(transforms.rotateRight)
          .transform(transforms.rotateRight)
          .transform(transforms.rotateRight);

        expect(expectedBitmap).to.deep.equal(bm);

        done();
      });
    });
  });

  describe('#rotate', function() {
    var expectedBitmap;
    before('loading expected bitmap result', function(done) {
      helper.load('./img/test-rotated-90.bmp', function(err, data) {
        if(err) return done(err);
        expectedBitmap = data;
        done();
      });
    });
    it('should fail with bogus angles', function() {
      var rotate = transforms.rotate;
      expect(function() {
        rotate(55);
      }).to.throw(Error);
      expect(function() {
        rotate(-55);
      }).to.throw(Error);
      expect(function() {
        rotate('goat');
      }).to.throw(Error);
      expect(function() {
        rotate(null);
      }).to.throw(Error);
    });
    it('should handle positive angles in multiples of 90', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, bitmap) {
        if(err) return done(err);
        bitmap.transform(transforms.rotate(450));
        expect(expectedBitmap).to.deep.equal(bitmap);
        done();
      });
    });
    it('should handle negative angles in multiples of 90', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, bitmap) {
        if(err) return done(err);
        bitmap.transform(transforms.rotate(-270));
        expect(expectedBitmap).to.deep.equal(bitmap);
        done();
      });
    });
  });

  describe('#grayScale', function() {
    var expectedBitmap;
    before('loading expected bitmap result', function(done) {
      helper.load('./img/test-grayscale.bmp', function(err, data) {
        if(err) return done(err);
        expectedBitmap = data;
        done();
      });
    });
    it('should average rbg and return grayscale image', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, data) {
        if(err) return done(err);
        var bm = data;
        bm.transform(transforms.grayScale);
        expect(expectedBitmap).to.deep.equal(bm);
        done();
      });
    });
  });

  describe('#stripeOne', function() {
    var expectedBitmap;
    before('loading expected bitmap result', function(done) {
      helper.load('./img/test-stripe-one.bmp', function(err, data) {
        if(err) return done(err);
        expectedBitmap = data;
        done();
      });
    });
    it('should have every other pixel be black', function(done) {
      helper.load('./img/palette-bitmap.bmp', function(err, data) {
        if(err) return done(err);
        var bm = data;
        bm.transform(transforms.stripeOne);
        expect(expectedBitmap).to.deep.equal(bm);
        done();
      });
    });
  });

  describe('#stripeTwo', function() {
    var expectedBitmap;
    before('loading expected bitmap result', function(done) {
      helper.load('./img/test-stripe-two.bmp', function(err, data) {
        if(err) return done(err);
        expectedBitmap = data;
        done();
      });
    });
    it('should have every other pixel be black', function(done) {
      helper.load('./img/test-stripe-one.bmp', function(err, data) {
        if(err) return done(err);
        var bm = data;
        bm.transform(transforms.stripeTwo);
        expect(expectedBitmap).to.deep.equal(bm);
        done();
      });
    });
  });

});
