const path = require("path");

// Matches only the last occurrence of sourceMappingURL
const innerRegex = /\s*[#@]\s*sourceMappingURL\s*=\s*(.*?(?=[\s'"]|\\n|\*\/|$)(?:\\n)?)\s*/;

const sourceMappingURLRegex = RegExp(
    "(?:" +
    "/\\*" +
    "(?:\\s*\r?\n(?://)?)?" +
    "(?:" +
    innerRegex.source +
    ")" +
    "\\s*" +
    "\\*/" +
    "|" +
    "//(?:" +
    innerRegex.source +
    ")" +
    ")" +
    "\\s*"
);

const sourceURLWebpackRegex = RegExp("\\/\\/#\\ssourceURL=webpack-internal:\\/\\/\\/(.*?)\\\\n");

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

module.exports = {
    sourceMappingURLRegex,
    sourceURLWebpackRegex,
    genBlob,
    genURL
}