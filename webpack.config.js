'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: '/firNutriotion/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/firNutriotion/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
