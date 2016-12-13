# Bitmap Transformer
### Team: Geoff, Danny, Megan
# About The Bitmap Transformer

The Bitmap Transformer uses JavaScript functions to load, transform and save a .bmp file. This requires the use of Node buffers to manipulate binary data.

# How To Use

Clone this repository, run `git clone https://github.com/dbecker4130/04-bitmap-transformer.git`.

Run `npm i` to install dependencies.

We have created a CLI. To use it type:

`node transform-bitmap.js img/your-image-name.bmp img/your-new-image-name.bmp transform-name`

The transforms that we have implemented are:

- `rotate=angle`
-- Rotate takes a parameter that is any angle divisible by 90 degrees. It will rotate the image as requested.
- `grayScale`
-- No parameters are needed. This averages RGB values and returns the image in grayscale.
- `stripeOne`
-- This recreates the image with every other pixel turned black.
- `stripeTwo`
-- This recreates the image with every other pixel turned black, offset one two the stripeOne transform. If you run an image through stripeOne and run that newly created image through stripeTwo you will end up with an image that is completely black.

# How To Incorporate Into Your Node Project
```sh
$ cd 04-bitmap-transformer
$ npm install -D chai gulp gulp-eslint gulp-mocha
```
