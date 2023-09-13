# audio-worklet-loader

Audio Worklet loader for webpack.

## Getting Started
To begin, you'll need to install worker-loader:
```shell
npm install audio-worklet-loader --save-dev
```

## Inlined
There will be support in the future.

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
                use: { loader: "audio-worklet-loader" },
            },
        ],
    },
    ...
};
```

### Config for Typescript
**webpack.config.js**
```js
module.exports = {
    ...,
    module: {
        rules: [
            {
                test: /\.worklet\.ts$/,
                // you need to install ts-loader first (if it does not exist!).
                use: ["audio-worklet-loader", "ts-loader"],
            }
        ],
    },
    ...
};
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
There will be support in the future.

## Contributing

## Issues
If you have any issues when using audio-worklet-loader please create an issue in GitHub homepage of a project, 
I will check it as soon as possible.