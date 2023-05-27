'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: '/fitNutrition/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/fitNutrition/js/'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
