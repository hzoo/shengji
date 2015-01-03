module.exports = {
  entry: ["./app.jsx"],
  output: {
    path: "./public/build",
    filename: "bundle.js",
    publicPath: 'build/'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React'
  }
};
