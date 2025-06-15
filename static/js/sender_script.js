const socket = io('http://localhost:5000'); // Adjust if using ngrok/heroku

// Use the roomId variable passed from the HTML
socket.emit('create_room', roomId);

// function startBroadcast() {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//         const audioContext = new AudioContext();
//         const source = audioContext.createMediaStreamSource(stream);

//         const processor = audioContext.createScriptProcessor(4096, 1, 1);

//         source.connect(processor);
//         processor.connect(audioContext.destination);

//         processor.onaudioprocess = (event) => {
//             const input = event.inputBuffer.getChannelData(0); // mono audio
//             const pcmData = new Float32Array(input); // Copy buffer

//             // Convert to transferable raw buffer (e.g. Float32Array)
//             socket.emit("broadcast_data", pcmData.buffer); // send to server
//         };
//     });
// }

async function startBroadcast() {
    const audioContext = new AudioContext();
  
    await audioContext.audioWorklet.addModule('/static/js/publisher-worklet.js');
  
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(stream);
  
    const workletNode = new AudioWorkletNode(audioContext, 'publisher-processor');

    let recordBuffer;
    workletNode.port.onmessage = (event) => {
      // Receive raw audio from processor
      const chunk = event.data;
      socket.emit('broadcast_data', chunk);
    };
  
    source.connect(workletNode).connect(audioContext.destination);
}