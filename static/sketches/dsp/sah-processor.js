class SampleAndHoldProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.outVal = 0;
    this.found = false;
  }
  process (inputs, outputs, parameters) {
    // assume single channel
    // single output
    const output = outputs[0][0]
    // 2 inputs; first is signal to be sampled, second is trigger signal
    let sampSig = inputs[0][0];
    let ctlSig = inputs[1][0];

    for (let i = 0; i < ctlSig.length; i++) {
      // assume channel length is the same for everyone...?
      if (ctlSig[i] > 0 && !this.found) {
        this.outVal = sampSig[i];
        this.found = true;
      }
      if (ctlSig[i] < 0) {
        this.found = false;
      }
      output[i] = this.outVal;
    }
  //  console.log(output)
    return true
  }
}
// test

registerProcessor('sample-and-hold-processor', SampleAndHoldProcessor)
