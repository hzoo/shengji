'use strict';
var autoprefixer = require('autoprefixer-core');
var path = require('path');
var webpack = require('webpack');

function isDev() {
  return process.env.NPM_CONFIG_PRODUCTION === false ||
    process.env.NPM_CONFIG_PRODUCTION === undefined;
}

var loaders = isDev() ?
[
  'react-hot',
  'babel?experimental&optional=selfContained'
] :
['babel?experimental&optional=selfContained'];

var config = {
  cache: true,
  resolve: {
    extensions: ['', '.js']
  },
  entry: [
    './app.jsx'
  ],
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8888/public/build'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loaders: loaders
    }, {
    //   test: /\.jsx$/,
    //   loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    // }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.(woff|woff2|eot|ttf|svg([\?]?.*))$/,
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  // externals: {
  //   //don't bundle the 'react' npm package with our bundle.js
  //   //but get it from a global 'React' variable
  //   'react': 'React'
  // },
  node: {
    fs: 'empty'
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ]
};

if (isDev()) {
  // faster source maps
  config.devtool = 'eval';
  config.entry = [
      'webpack-dev-server/client?http://localhost:8888',
      'webpack/hot/dev-server',
      './app.jsx'
  ];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = config;
