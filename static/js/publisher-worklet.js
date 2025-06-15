class PublisherProcessor extends AudioWorkletProcessor {
    process(inputs) {
      const input = inputs[0];
      if (input && input[0]) {
        const channelData = input[0];
        // Copy Float32 data to transferable buffer
        const chunk = new Float32Array(channelData);
        this.port.postMessage(chunk.buffer, [chunk.buffer]);  // Use transferable buffer
      }
      return true;
    }
}
  
registerProcessor('publisher-processor', PublisherProcessor);  