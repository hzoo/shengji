module.exports = {
    entry: "./public/js/app.jsx",
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js",
        publicPath: './public/js/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {
                test: /\.react.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            { 
                test: /\.css$/,
                loader: "style!css" 
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    }
};