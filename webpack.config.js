const path = require("path");

module.exports = {
    // entry: "./example/javascript/index.js", // For javascript
    entry: "./example/typescript/index.ts", // For typescript
    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },
    mode: "development",
    target: "web",
    module: {
        rules: [
            // For javascript
            // {
            //     test: /\.worklet\.js/,
            //     loader:  path.resolve("loader/loader.js"),
            //     options: {
            //         inline: "no-fallback",
            //     }
            // },

            // For typescript
            {
                test: /\.worklet\.ts$/,
                loader: path.resolve("loader/loader.js"),
                options: {
                    inline: "no-fallback"
                }
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}