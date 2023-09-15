import randomNoise from "./random-noise.worklet";

const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");

const audioCtx = new AudioContext();

console.log(randomNoise);

playBtn.addEventListener("click", async () => {
    await audioCtx.audioWorklet.addModule(randomNoise);
    const audioBufferSource = audioCtx.createBufferSource();
    const audioWorkletNode = new AudioWorkletNode(audioCtx, "audio-decoder");

    audioWorkletNode.port.postMessage({
        message: "INIT"
    })

    audioWorkletNode.port.onmessage = (e) => {
        const {message} = e.data;

        switch (message) {
            case "INIT":
                console.log("Init audio worklet node success.");
                break;

            default:
                console.log("Unhandled message from audio decoder.");
        }
    }

    audioBufferSource.connect(audioWorkletNode);
    audioWorkletNode.connect(audioCtx.destination);
    audioBufferSource.start();
})

stopBtn.addEventListener("click", async () => {
    const startTime = performance.now();
    await audioCtx.suspend();
    console.log(performance.now() - startTime);
})