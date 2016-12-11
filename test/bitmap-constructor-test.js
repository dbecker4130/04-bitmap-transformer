'use strict';

const expect = require('chai').expect;
const BMC = require('../model/bitmap-constructor.js');

describe('Bitmap Constructor', function() {
  describe('#Bitmap', function() {
    it('should fail on a bogus buffer', function() {
      //TODO: Try new Bitmap() and new Bitmap(junk)
    });
    it('should create a bitmap with a valid buffer', function() {
      //TODO: Where does the buffer get created?
      //      Do we need to use an async test here?
      //TODO: Verify that we get a valid bitmap object for the buf
    });
  });

  //TODO: Can we load up a valid bitmap to use in all the tests?
  //      Perhaps the before() method?

  describe('#getType', function() {
    it('should return a valid type', function() {
      //TODO: A valid type is a 2 character string.
      //TODO: Check the wiki spec for valid types.
    });
  });

  describe('#getWidth', function() {
    it('should match the width of our test bitmap', function() {
      //TODO: assert that the width of our test BM matches what we expect.
    });
  });

  describe('#getHeight', function() {
    it('should match the height of our test bitmap', function() {
      //TODO: assert that the height of our test BM matches what we expect.
    });
  });

  describe('#getColorArray', function() {
    it('should be an array', function() {
      //TODO: Check the typeof
    });
    it('should have elements that are color objects', function() {
      //TODO: Check EACH element of the array to verify that
      //      they conform to a color object.
    });
    //TODO: Possibly check that it's the size we expect.
  });

  describe('#getPixelArray', function() {
    it('should be an array', function() {
      //TODO: Check the typeof
    });
    it('should have elements that are bytes', function() {
      //TODO: Iterate the array to see if the values
      //      are in the range we expect.
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
    it('should correctly alter the pixel array', function() {
      //TODO: Similar process to the other set tests
    });
    it('should fail with bogus values', function() {
      //TODO: Try with null, empty, strings, etc
      //TODO: Try an array with some bogus and/or out of range numbers.
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
