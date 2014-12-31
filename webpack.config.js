module.exports = {
    entry: "./public/js/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: './public/js/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};