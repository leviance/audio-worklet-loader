const randomNoise = require("./random-noise.worklet");

async function main() {
    console.log(randomNoise);
    const audioCtx = new AudioContext();
    await audioCtx.audioWorklet.addModule(randomNoise);
    const audioWorkletNode = new AudioWorkletNode(audioCtx, "my-audio-worklet");
    console.log("Init audio worklet success");
}

main();