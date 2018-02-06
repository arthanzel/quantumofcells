const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("build/qoc.css");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "build/qoc.js"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(["css-loader"])
            },
            {
                test: /\.styl$/,
                use: extractCSS.extract(["css-loader", "stylus-loader"])
            }
        ]
    },
    plugins: [
        extractCSS
    ]
};