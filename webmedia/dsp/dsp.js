let t  = new Tone.Oscillator({frequency: 100}).start();
let s = new Tone.Oscillator({frequency: 101}).start();

let wf = new Tone.Waveform();
function setup() {
  createCanvas(1024, 100)
}

function mousePressed() {
  f();
}

function draw() {
  background(0);
  let c = wf.getValue()
  c.forEach((v, i) => {
    fill(255)
    stroke(255)
    strokeWeight(5)
    line(i, 50 + v * 40, i+1, 50 + c[i+1] * 40)
  })
  s.frequency.value = mouseY;
  t.frequency.value = mouseX;
}

function f() {
  const audioContext = Tone.context._context
  audioContext.audioWorklet.addModule('./sah-processor.js').then(() => {
  let sahNode = new AudioWorkletNode(audioContext, 'sample-and-hold-processor', {numberOfInputs: 2});
  s.connect(sahNode, 0, 0)
  t.connect(sahNode, 0, 1)
  let neg = new Tone.Negate();
  sahNode.connect(neg);
  let wrap = new Tone.WaveShaper(val => {
    if (val > 1) {
      return val - 1;
    }
    if (val < 0) {
      return val + 1;
    }
  })
  let add = new Tone.Add(0);
  s.connect(add, 0, 0)
  neg.connect(add, 0, 1);
  add.connect(wrap);
  let wrap2 = new Tone.WaveShaper(val => {
    return val - 0.5;
  })
  wrap.connect(wrap2);
  wrap2.connect(wf)
  wrap2.toMaster();
})
}
