'use strict';

const expect = require('chai').expect;
const fileHelper = require('../lib/bitmap-file-helper.js');
const Bitmap = require('../model/bitmap-constructor.js').Bitmap;


describe('testing module fileHelper', function (){
  describe('load with bad file paths', function() {
    it('should return an error', function() {
      fileHelper.load(`${__dirname}/dont-exist.bmp`, function(err) {
        expect(err).to.be.an('error');
      });
    });
  });

  describe('load with good file paths', function() {
    describe('load function', function() {
      it('should load a Bitmap', function(done) {
        fileHelper.load('./img/palette-bitmap.bmp', function(err, data) {
          if(err)return done(err);
          expect(data).to.be.instanceof(Bitmap);
        });
        done();
      });
    });
  });
});
