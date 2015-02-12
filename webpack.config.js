'use strict';
var autoprefixer = require('autoprefixer-core');

module.exports = {
  entry: ["./app.jsx"],
  output: {
    path: "./public/build",
    filename: "bundle.js",
    publicPath: 'build/'
  },
  module: {
    // disable jscs here until esnext fixed in #729
    // jscs: disable
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: '6to5?experimental&optional=selfContained'
    }, {
      // test: /\.jsx$/,
      // loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    // }, {
      test: /\.css$/,
      loader: "style!css!postcss"
    }, {
      test: /\.json$/,
      loader: "json"
    }]
    // jscs: enable
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React'
  },
  node: {
    fs: "empty"
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ]
};
