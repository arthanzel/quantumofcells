var path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "build/qoc.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};