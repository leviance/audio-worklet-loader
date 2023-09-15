import {log} from "./utils";

class AudioDecoder extends AudioWorkletProcessor {
    initWorklet = false;

    constructor() {
        super();

        log("[AUDIO-WORKLET-PROCESSOR]: Init.");

        this.port.onmessage = (e) => {
            const {message} = e.data;

            switch (message) {
                case "INIT":
                    console.log("[AUDIO-DECODER]: Init audio worklet node processor.");
                    break;

                default:
                    console.log("[AUDIO-DECODER]: Unhandled message.");
                    break;
            }
        }
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

        if (!this.initWorklet) {
            // @ts-ignore
            this.port.postMessage({message: "INIT"});
            this.initWorklet = true;
        }

        return true;
    }
}

// Register the AudioWorklet processor
registerProcessor("audio-decoder", AudioDecoder);