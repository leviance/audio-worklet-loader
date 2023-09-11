const path = require("path");

module.exports = {
    entry: "./src/typescript/index.ts",
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    mode: "development",
    target: "web",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.worklet.ts$/,
                use: [path.resolve("loader/loader.js"), "ts-loader"]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}