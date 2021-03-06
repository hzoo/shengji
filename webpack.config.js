var autoprefixer = require('autoprefixer-core');
var path = require('path');
var webpack = require('webpack');

var isDev =
  process.env.NPM_CONFIG_PRODUCTION === false ||
  process.env.NPM_CONFIG_PRODUCTION === undefined;

var loaders = isDev ?
['react-hot', 'babel?stage=1'] :
['babel?stage=1'];

var config = {
  cache: true,
  resolve: {
    extensions: ['', '.js']
  },
  entry: [
    './app.js'
  ],
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8888/public/build/'
  },
  module: {
    loaders: [{
      test: /\.(jsx|js)$/,
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

if (isDev) {
  // faster source maps
  config.devtool = 'eval-source-map';
  config.entry = [
      'webpack-dev-server/client?http://localhost:8888',
      'webpack/hot/dev-server',
      './app.js'
  ];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
} else {
  config.plugins = [
    // keeps hashes consistent between compilations
    new webpack.optimize.OccurenceOrderPlugin(),
    // minifies your code
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ];
}

module.exports = config;
