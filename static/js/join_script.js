const socket = io('http://localhost:5000'); // Adjust if using ngrok/heroku

socket.emit('join_room', roomId);

let audioContext;
let workletNode;

// document.getElementById("join").addEventListener("click", () => {
//     if (!audioContext || audioContext.state === "suspended") {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     }

//     socket.on("receive_data", (arrayBuffer) => {
//         const floatArray = new Float32Array(arrayBuffer);
//         const audioBuffer = audioContext.createBuffer(1, floatArray.length, audioContext.sampleRate);
//         audioBuffer.copyToChannel(floatArray, 0);

//         const source = audioContext.createBufferSource();
//         source.buffer = audioBuffer;
//         source.connect(audioContext.destination);
//         source.start();
//     });

//     console.log("Audio context started and socket connected.");
// });

document.getElementById("join").addEventListener("click", async () => {
    if (!audioContext || audioContext.state === "suspended") {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Load the subscriber AudioWorklet
    await audioContext.audioWorklet.addModule('/static/js/subscriber-worklet.js');

    // Create AudioWorkletNode
    workletNode = new AudioWorkletNode(audioContext, 'subscriber-processor');
    workletNode.connect(audioContext.destination);

    // Feed received audio data to worklet
    socket.on("receive_data", (arrayBuffer) => {
        workletNode.port.postMessage(arrayBuffer, [arrayBuffer]);
    });

    console.log("Audio context + worklet ready, connected to server.");
});