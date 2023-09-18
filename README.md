# audio-worklet-loader

Audio Worklet loader for webpack.

<span style="color: orange;">**Warning:** We do not yet support WEBPACK 4!</span>

## Getting Started
To begin, you'll need to install worker-loader:
```shell
npm install audio-worklet-loader --save-dev
```

## Inlined
For use without config in **webpack.config.js**
```js
import randomNoise from "audio-worklet-loader!./random-noise.worklet.js";
```

## Config
### Config for Javascript
**webpack.config.js**
```js
module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.worklet\.js$/,
                loader: "audio-worklet-loader",
            },
        ],
    },
    ...
};
```

### Config for Typescript

Note that `audio-worklet-loader` need to be appeared before `ts-loader`.

**webpack.config.js**
```js
module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.worklet\.ts$/,
                loader: "audio-worklet-loader",
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    ...
};
```

### More
To import files without specifying an extension `import code from './code'` instead of `import code from './code.js'`
```js
module.exports = {
    ...,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    ...
}
```

## Example
For view full of this example, please go to GitHub repository and take a look in the example folder.

**index.js**
```js
import randomNoise from "./random-noise.worklet.js"

async function main() {
    const audioCtx = new AudioContext();
    await audioCtx.audioWorklet.addModule(randomNoise);
    const audioBufferSource = audioCtx.createBufferSource();
    const audioWorkletNode = new AudioWorkletNode(audioCtx, "random-noise");
    audioBufferSource.connect(audioWorkletNode);
    audioWorkletNode.connect(audioCtx.destination);
    audioBufferSource.start();
    console.log("Successfuly!!!");
}

main();
```

**random-noise.worklet.js**
```js
class RandomNoise extends AudioWorkletProcessor {
	constructor() {  
		super();
	}  
	  
	process(inputs, outputs) {  
		const output = outputs[0];  
		  
		for (let channel = 0; channel < output.length; ++channel) {  
			const outputChannel = output[channel];  
			  
			for (let i = 0; i < outputChannel.length; ++i) {  
				// Generate a random number between -1 and 1  
				// Assign the random value to the output channel  
				outputChannel[i] = Math.random() * 2 - 1;  
			}  
		}
		  
		return true;  
	}  
}  
  
// Register the AudioWorklet processor  
registerProcessor("random-noise", RandomNoise);
```

And run webpack via your preferred method.

## Options

|                 Name                  |            Type             |             Default             | Description                             |
| :-----------------------------------: | :-------------------------: | :-----------------------------: |:----------------------------------------|
|        **[`inline`](#inline)**        | `'no-fallback'\|'fallback'` |           `undefined`           | Allow to inline the worklet as a `BLOB` |


### `inline`
Type: `'fallback' | 'no-fallback'`
Default: `undefined`

Allow to inline the Audio Worklet as a `BLOB`.

Inline mode with the `fallback` still bundle worklet file (although we do not need this file), to disable this behavior 
just use `no-fallback` value.

**webpack.config.js**

```js
module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.worklet\.js/,
                loader:  path.resolve("loader/loader.js"),
                options: {
                    inline: "no-fallback",
                }
            }
        ]
    },
    ...
};
```

## Contributing
Please take a moment to read our contributing guidelines if you haven't yet done so.
[CONTRIBUTING](https://github.com/webpack-contrib/worker-loader/blob/HEAD/.github/CONTRIBUTING.md)

## Testing

With webpack 4:

**package.json**
```json
{
    "devDependencies": {
        "ts-loader": "^5.4.5",
        "webpack": "^4.0.0",
        "webpack-cli": "^3.3.12"
    }
}
```

With webpack 5:

**package.json**
```json
{
    "devDependencies": {
        "ts-loader": "^9.4.4",
        "webpack": "^5.88.2",
        "webpack-cli": "^5.1.4"
    }
}
```

## Issues
If you have any issues when using audio-worklet-loader please create an issue in GitHub homepage of a project
and show me version of webpack or webpack-cli, ts-loader, ... for me.
I will check it as soon as possible.