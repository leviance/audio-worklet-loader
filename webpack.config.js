const path = require("path");

module.exports = {
    entry: "./example/javascript/index.js", // For javascript
    // entry: "./example/typescript/index.ts", // For typescript
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    mode: "development",
    target: "web",
    module: {
        rules: [
            // For javascript
            {
                test: /\.worklet\.js/,
                use:  path.resolve("loader/loader.js")
            },

            // For typescript
            // {
            //     test: /\.worklet\.ts$/,
            //     use: path.resolve("loader/loader.js")
            // },
            // {
            //     test: /\.ts$/,
            //     use: "ts-loader",
            //     exclude: /node_modules/
            // },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}