const path = require("path");
const {sourceURLWebpackRegex, sourceMappingURLRegex} = require("./utils");

/**
 * Generate BLOB from source.
 * @param source string
 * @return string
 */
function genBlob(source) {
    const workletPath = JSON.stringify(path.join(__dirname, "workletToBlob.js"));
    return `module.exports = require(${workletPath})(${JSON.stringify(source)})`;
}

/**
 * Generate URL to Audio Worklet output file.
 * @param workletFileName
 * @return string
 */
function genURL(workletFileName) {
    return `module.exports = __webpack_public_path__ + ${JSON.stringify(workletFileName)}`;
}

module.exports = function runAsChild(loaderContext, workletCtx, options, callback) {
    workletCtx.compiler.runAsChild((error, entries, compilation) => {
        if (error) {
            return callback(error);
        }

        if (entries[0]) {
            const [workletFileName] = [...entries[0].files];
            const cache = workletCtx.compiler.getCache("audio-worklet-loader");
            const cacheIdent = workletFileName;
            const cacheETag = cache.getLazyHashedEtag(compilation.assets[workletFileName]);

            return cache.get(cacheIdent, cacheETag, (getCacheError, content) => {
                if (getCacheError) return callback(getCacheError);

                if (options.inline === "no-fallback") {
                    delete loaderContext._compilation.assets[workletFileName];
                    if (loaderContext._compilation.assets[`${workletFileName}.map`]) {
                        delete loaderContext._compilation.assets[`${workletFileName}.map`];
                    }
                }

                if (content) {
                    return callback(null, content);
                }

                let workletSource = compilation.assets[workletFileName].source();
                if (options.inline === "no-fallback") {
                    // Remove `/* sourceMappingURL=url */` comment
                    workletSource = workletSource.replace(sourceMappingURLRegex, "");

                    // Remove `//# sourceURL=webpack-internal` comment
                    workletSource = workletSource.replace(sourceURLWebpackRegex, "");
                }

                let workletCode = options.inline === undefined ? genURL(workletFileName) : genBlob(workletSource);
                let workletBuff = Buffer.from(workletCode);

                return cache.store(
                    cacheIdent,
                    cacheETag,
                    workletBuff,
                    (storeCacheError) => {
                        if (storeCacheError) {
                            return callback(storeCacheError);
                        }

                        return callback(null, workletBuff);
                    }
                );
            });
        }

        return callback(new Error(`Failed to compile Audio Worklet Processor "${workletCtx.request}" request`));
    });
}
