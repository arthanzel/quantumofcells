const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("build/qoc.css");

module.exports = {
    entry: {
        qoc: "./src/index.js",
        callback: "./src/callback.js"
    },
    output: {
        filename: "build/[name].js"
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