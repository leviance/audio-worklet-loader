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

module.exports = {
    sourceMappingURLRegex,
    sourceURLWebpackRegex
}