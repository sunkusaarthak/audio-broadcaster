class SubscriberProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.queue = [];
        this.port.onmessage = (event) => {
            const floatData = new Float32Array(event.data);
            this.queue.push(floatData);
        };
    }

    process(inputs, outputs) {
        const output = outputs[0];
        const outChannel = output[0];

        if (this.queue.length > 0) {
            const chunk = this.queue.shift();
            for (let i = 0; i < outChannel.length; i++) {
                outChannel[i] = chunk[i] || 0;  // Fill silence if chunk smaller
            }
        } else {
            // No data? Fill with silence
            outChannel.fill(0);
        }

        return true;
    }
}

registerProcessor('subscriber-processor', SubscriberProcessor);