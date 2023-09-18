const {sourceURLWebpackRegex, sourceMappingURLRegex, genBlob, genURL} = require("./utils");

module.exports = function runAsChild(loaderContext, workletCtx, options, callback) {
    workletCtx.compiler.runAsChild((error, entries, compilation) => {
        if (error) {
            return callback(error);
        }

        if (entries[0]) {
            const workletFileName = entries[0].files[0];
            let workletSource = compilation.assets[workletFileName].source();

            if (options.inline === "no-fallback") {
                delete loaderContext._compilation.assets[workletFileName];
                if (loaderContext._compilation.assets[`${workletFileName}.map`]) {
                    delete loaderContext._compilation.assets[`${workletFileName}.map`];
                }

                // Remove `/* sourceMappingURL=url */` comment
                workletSource = workletSource.replace(sourceMappingURLRegex, "");

                // Remove `//# sourceURL=webpack-internal` comment
                workletSource = workletSource.replace(sourceURLWebpackRegex, "");
            }

            const workletCode = options.inline === undefined ? genURL(workletFileName) : genBlob(workletSource);
            const workletBuff = Buffer.from(workletCode);

            return callback(null, workletBuff);
        }

        return callback(new Error(`Failed to compile Audio Worklet Processor "${workletCtx.request}" request`));
    });
}