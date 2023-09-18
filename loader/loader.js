const {validate} = require("schema-utils");
const { getOptions } = require("loader-utils");
const path = require("path");
const LoaderError = require("./loader-error");
const SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");
const supportWebpack5 = require("./supportWebpack5");
const supportWebpack4 = require("./supportWebpack4");

const schema = {
    "type": "object",
    "properties": {
        "inline": {
            "enum": ["no-fallback", "fallback"],
            "description": "Allow to inline the Audio Worklet Processor as a BLOB.",
            "link": "https://github.com/leviance/audio-worklet-loader#inline"
        },
    },
    "additionalProperties": false
}

function AudioWorkletLoader(source) {
    // if (!this.webpack)
    //     throw new LoaderError({name: "Worklet Loader", message: "This loader is only usable with webpack"});
    //
    // const useWebpack5 = require("webpack/package.json").version.startsWith("5.");
    // const options = this.getOptions();
    // // console.log(path.parse(this.resourcePath));
    //
    // const callback = this.async();
    // const compiler = this._compilation.createChildCompiler("audio-worklet-loader");
    //
    // compiler.runAsChild((err, entries, compilation) => {
    //     if (err) return callback(err);
    //
    //     try {
    //         const getWorkletPath = JSON.stringify(path.join(__dirname, 'workletToBlob.js'));
    //         return callback(null, `module.exports = require(${getWorkletPath})(${JSON.stringify(source)})`);
    //     }
    //     catch (e) {
    //         return callback(new Error("Failed to compile Audio Worklet processor."));
    //     }
    // })
    // return source;
}

function pitch(request) {
    this.cacheable(false);

    if (this.target !== "web")
        throw new LoaderError({name: "Worklet Loader", message: "This loader is only support for target: web"});

    const cb = this.async();
    const workletCtx = {options: {filename: "[name].js"}};
    const useWebpack5 = require("webpack/package.json").version.startsWith("5.");
    const options = useWebpack5 ? this.getOptions() : getOptions(this);

    validate(schema, options, {name: "Audio Worklet Loader", baseDataPath: "options"});

    workletCtx.request = request;
    workletCtx.compiler = this._compilation.createChildCompiler("audio-worklet-loader", workletCtx.options);
    new SingleEntryPlugin(this.context, `!!${request}`, path.parse(this.resourcePath).name).apply(workletCtx.compiler);

    useWebpack5 ? supportWebpack5(this, workletCtx, options, cb) : supportWebpack4(this, workletCtx, options, cb);
}

module.exports = AudioWorkletLoader;
module.exports.pitch = pitch;