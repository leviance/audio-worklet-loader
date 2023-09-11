const path = require("path");
const LoaderError = require("./loader-error");

function AudioWorkletLoader(source) {
    if (!this.webpack)
        throw new LoaderError({name: "Worklet Loader", message: "This loader is only usable with webpack"});

    const callback = this.async();
    const compiler = this._compilation.createChildCompiler("worker");

    compiler.runAsChild((err, entries, compilation) => {
        if (err) return callback(err);

        try {
            const getWorkletPath = JSON.stringify(path.join(__dirname, 'getWorklet.js'));
            return callback(null, `module.exports = require(${getWorkletPath})(${JSON.stringify(source)})`);
        }
        catch (e) {
            return callback(new Error("Failed to compile Audio Worklet processor."));
        }
    })
}

module.exports = AudioWorkletLoader;