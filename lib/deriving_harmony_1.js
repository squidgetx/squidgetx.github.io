window.onload = () => {

  let SYNTH, SYNTH2, GUITAR;
  let TONE_ON = false;
  let TONE_START;

  let global_init_tone  = function() {
    if (!TONE_ON) {
      Tone.start().then(() =>{
        console.log('Tone started')
        GUITAR = new Tone.Synth().toDestination();
        SYNTH = new Tone.Synth().toDestination();
        SYNTH2 = new Tone.Synth().toDestination();
        SYNTH.volume.value = -6
        SYNTH2.volume.value = -6
        SYNTH.envelope.release = 0
        SYNTH.envelope.attack = 0
        SYNTH2.envelope.release = 0
        SYNTH2.envelope.attack = 0
        TONE_ON = true
        TONE_START = Tone.now()
        Tone.Transport.start()
      })
    }
  }

  let SKETCHES;

  let disableAudioExcept = function(sketchName) {
    SKETCHES.forEach(s => {
      if (s.name !== sketchName) {
        s.stopAudio()
      }
    })
  }

  let s0_guitar = function() {
    return {
      name: 's0_guitar',
      stopAudio: () => {},
      sketch: (p5) => {
        const STRINGLEN = 500
        const STRING_H = 3
        const MARKER_H = 24
        const MARKER_W = 8
        const DISPLACEMENT_MAX = 100
        let energy = 0
        let counter = 0
        let markerX = 10
        let offsetX
        let movingObj, highlightObj
        
        let stringX = STRINGLEN / 2
        let stringY = 0

        let drawString = function() {
        // first, draw the string that isn't vibrating
        const midpoint = p5.height/2
        p5.strokeWeight(0)
        p5.fill('grey')
        p5.rect(offsetX, midpoint, markerX, STRING_H)

        // then, draw the marker widget
        p5.push()
        p5.fill('white')
        p5.stroke('black')
        p5.strokeWeight(2)
        p5.rect(offsetX + markerX, midpoint - MARKER_H/2, MARKER_W, MARKER_H)
        p5.pop()

        // next, draw the string segments as 2 lines
        let x = offsetX + markerX + MARKER_W
        let y = midpoint + STRING_H / 2

        
        p5.stroke('black')
        p5.strokeWeight(STRING_H)

        // draw the string as a series of lines in the shape of a sin wave
        let str_len = STRINGLEN - markerX - MARKER_W
        for(let i = 0; i < str_len; i++) {
          let y1 = Math.sin(i * 3.14 / str_len) * stringY + midpoint + STRING_H / 2
          p5.line(x + i, y, x + i + 1, y1)
          y = y1
        }
        //p5.line(stringOffsetX, stringOffsetY, stringOffsetX + stringX, stringOffsetY + stringY)
        //p5.line(offsetX + STRINGLEN, stringOffsetY, stringOffsetX + stringX, stringOffsetY + stringY)
      }

      let getObj = function(mouseX, mouseY) {
        let padding = 2
        if (inBox(mouseX, mouseY, offsetX + markerX - padding , p5.height/2 - MARKER_H/2 - padding, MARKER_W + padding * 2, MARKER_H + padding * 2)) {
          return 'marker'
        }
        if (inBox(mouseX, mouseY, offsetX + markerX + MARKER_W - padding, p5.height/2 - STRING_H/2 - padding, STRINGLEN - markerX - MARKER_W + padding * 2, STRING_H + padding * 2)) {
          return 'string'
        }
        return null
      }

      let getStringCoords = function(mouseX, mouseY) {
        // Return the coordinates
        let y = mouseY - p5.height/2
        return [
          (STRINGLEN - MARKER_W - markerX) / 2,
          p5.constrain(y, -DISPLACEMENT_MAX, DISPLACEMENT_MAX),
        ]
      }

      let getMarkerCoord = function(mouseX) {
        let x = mouseX - offsetX
        return p5.constrain(x, 0, STRINGLEN)
      }



      p5.setup = function() {
        p5.createCanvas(640, 240)
        offsetX = (p5.width - STRINGLEN) / 2
      }

      p5.draw = function() {
        p5.background('white')
        p5.fill('green')
        p5.stroke('green')

        // handle movement
        if (movingObj == 'marker') {
          markerX = getMarkerCoord(p5.mouseX)
          let stringCoords = getStringCoords(p5.mouseX, p5.mouseY)
          stringX = stringCoords[0]
        } else if (movingObj == 'string') {
          let stringCoords = getStringCoords(p5.mouseX, p5.mouseY)
          stringX = stringCoords[0]
          stringY = stringCoords[1]
        }
        // change the tempo right at the loop ending

        if (highlightObj) {
          p5.cursor('grab')
        } else {
          p5.cursor('auto')
        }
        if (movingObj) {
          p5.cursor('grabbing')
        } 
        if (energy > 1) {
          // string energy
          // calculate frequency based on marker:
          let len = STRINGLEN - markerX
          let mod = 200 / len 
          stringY = Math.cos(counter * mod) * energy
          counter += 1
          energy *= 0.98
          if (TONE_ON) {
            let v = p5.map(Math.abs(energy), 0, DISPLACEMENT_MAX, 0, 0.9)
            v = Math.log(v) * 4
            GUITAR.set({
              frequency: mod * 240,
            })
            GUITAR.volume.rampTo(v, 0.01)
          }
        } else {
          if (TONE_ON)
            GUITAR.triggerRelease(Tone.now())
        }
        drawString()
      }

      p5.mousePressed = function() {
        global_init_tone()
        movingObj = getObj(p5.mouseX, p5.mouseY)
        if (movingObj == 'string') {
          // kill any existing motion
          energy = 0
        }
        if (TONE_ON) {
          GUITAR.triggerRelease(Tone.now())
        }
      }

      p5.mouseReleased = function() {
        if (movingObj == 'string') {
          energy = stringY
          counter = 0
          // Todo this should be abstracted out
          let len = STRINGLEN - markerX
          let mod = 200 / len 
          GUITAR.triggerAttack(mod * 240, Tone.now())
        }
        movingObj = null
      }

      p5.mouseMoved = function() {
        highlightObj = getObj(p5.mouseX, p5.mouseY)
      }
    }
  }
  }

  let pendulum_template = function(freq, mult, s) {
    const Y_OFF = 32
    const FPS = 30
    const RED = '#d43245'
    const BLUE = '#1f68bf'
    let bpm = freq
    let playNote1, playNote2
    let pendulum1, pendulum2
    let updateLoop
    let toneOffset = 0
    let audioOn = false;
    let ui = []
    let stopAudio = function(kill_button=true) {
        audioOn = false
        if (ui && kill_button) {
          ui[0].isClicked = false
        }
        if (playNote1) {
          playNote1.stop()
          playNote2.stop()
        }
      }
    return {
      name: s,
      stopAudio: stopAudio,
      sketch: function(p5) {
      p5.setup = function() {
        p5.frameRate(FPS)
        pendulum1 = {
          x: 0,
          y: 0,
          l: 100,
          r: 24,
          color: RED,
          t: 0,
          freq: freq,
          nextFreq: freq,
        }
        pendulum2 = {
          x: 0,
          y: 0,
          l: 130,
          r: 24,
          color: BLUE,
          t: 0,
          freq: freq * mult,
          nextFreq: freq * mult,
        }
        p5.createCanvas(640, 320)
        ui[0] = createButton(p5, {
          x:640 - 60,
          y:240,
          w:120,
          h:30,
          text: "Enable Audio",
          altText: "Disable Audio",
          textColor: 'black',
          fillColor: '#ddd',
          cb: function(isClicked) {
            if (isClicked) {
              stopAudio(false) // don't reset the button)
            } else {
              enableAudio()
            }
          }
        })
        ui[1] = createSlider(p5, {
          x: 10,
          y: 10,
          slider_w: 120,
          slider_h: 2,
          ctl_w: 8,
          ctl_h: 20,
          slider_color: 'black',
          ctl_color: 'white',
          init: 0.6,
          min: 0.5,
          max: 240,
          onChange: (val) => {
            // reset tone
            if (val != pendulum1.freq) {
              pendulum1.freq = val
              pendulum2.freq = val * mult
              if (!playNote1) {
                return
              }
              if (val < 30) {
                playNote1.stop()
                playNote2.stop()

                playNote1.interval = 1 / val
                playNote2.interval = 1 / (val * mult)

                TONE_START = Tone.now()

                playNote1.start()
                playNote2.start()
              } else {
                playNote1.interval = 1 / val
                playNote2.interval = 1 / (val * mult)
              }
            }
          }
        })

      }
      
      let enableAudio = function() {
        global_init_tone()
        audioOn = true
        // Disable other audios
        disableAudioExcept(s)
        playNote1 = new Tone.Loop(t => {
          SYNTH.triggerAttack(200, t)
          let release = p5.min(0.14, 1 / pendulum1.freq / 3)
          SYNTH.triggerRelease(t + release)
          //pendulum1.r = 48
          //Tone.Transport.scheduleOnce(t => pendulum1.r = 24, t + 1 / FPS)
        }, 1/pendulum1.freq)

        playNote2 = new Tone.Loop(t => {
            SYNTH2.triggerAttack(200 * mult, t)
            let release = p5.min(0.14, 1 / pendulum2.freq / 2)
            SYNTH2.triggerRelease(t + release)
            //pendulum2.r = 48
           // Tone.Transport.scheduleOnce(t => pendulum2.r = 24, t + 1 / FPS)
        }, 1 / pendulum2.freq)

        // We want to trigger the loop to start with the next "hit" of each pendulum
        let off = Tone.now() - TONE_START + toneOffset
        let delay = (Math.ceil(off * pendulum1.freq) - off * pendulum1.freq) / pendulum1.freq

        playNote1.start(Tone.now() + delay)

        let delay2 = (Math.ceil(off * pendulum2.freq) - off * pendulum2.freq) / pendulum2.freq
        playNote2.start(Tone.now() + delay2)
      }

     

      let updatePendulums = function(t) {
        updatePendulum(t, pendulum1)
        updatePendulum(t, pendulum2)
      }

      let updatePendulum = function(t, p) {
        // Update the X, Y position of the pendulums.
        // If using the Tone clock, we update the positions using the Tone.JS clock event, 
        // then use the P5 animation loop to draw 
        // This way even if we drop frames the animation is still synced to the tone clock

        // use the p5 clock if tone hasn't started yet
        if (TONE_ON) {
          t = t - TONE_START + toneOffset
        }
        p.t = Math.sin(t * Math.PI * p.freq + Math.PI) * Math.PI / 3 + Math.PI / 2
        p.x = Math.cos(p.t) * p.l + p5.width * 0.6
        p.y = Math.sin(p.t) * p.l + Y_OFF
      }

      let drawPendulum = function(p) {
        p5.push()
        p.last_frame_t = p.frame_t
        p.frame_t = p.t
        let x = p.x
        let y = p.y
        if (p.frame_t >= Math.PI / 2 && p.last_frame_t <= Math.PI/2 || (p.frame_t <= Math.PI/2 && p.last_frame_t >= Math.PI/2)) {
          x = p5.width * 0.6
          y = p.l + Y_OFF
          p5.fill(p.color)
        } else {
          p5.fill('white')
        }
        p5.stroke('grey')
        p5.line(p5.width * 0.6, Y_OFF, x, y)
          p5.strokeWeight(2)
          p5.stroke(p.color)
        p5.circle(x, y, p.r)
                p5.pop()
      }

      p5.draw = function() {
        p5.background(255, 200)
        // If for some reason the ToneJS clock hasn't started yet, 
        // use the p5 clock 
        if (!TONE_ON) {
          updatePendulums(p5.frameCount/FPS/2)
        }
        p5.fill('grey')
        const ctx = p5.drawingContext;

        p5.push()
        ctx.setLineDash([5,10])
        p5.stroke('grey')
        p5.strokeWeight(2)
        p5.line(p5.width*0.6, Y_OFF * 3, p5.width*0.6, p5.height - Y_OFF * 3)
        p5.pop()

        drawPendulum(pendulum1)
        drawPendulum(pendulum2)

        // Draw the tempo of the blue slider
        let frac = floatToFrac(mult)


        ui.forEach((e) => {
          e.draw()
        })
        setCursor(p5, ui)

        if (TONE_ON && updateLoop == null) {
          updateLoop = new Tone.Loop(t => {
            updatePendulums(t)
          }, 1 / FPS).start(Tone.now())
        }
      }

      p5.mouseMoved = function() {
        ui.forEach((e) => e.handleMoved())
      }

      p5.mousePressed = function() {
        ui.forEach(e => e.handlePressed())
      }

      p5.mouseReleased = function() {
        ui.forEach(e => e.handleReleased())
      }

      p5.mouseClicked = function() {
         global_init_tone()
      }
    }
  }

  }
  // Next:
  // Improve Copy
  // Introduce multiploer
  // Text for where the thingy is?
  // Jeez im tired
  // oh it should scale somehow, we should sac the visuals not the audio at high speed. maybe we can use the bpm and schedule the timing?

  SKETCHES = [
    s0_guitar(),
    pendulum_template(0.6, 2, 's1_pendulum'),
    pendulum_template(0.6, 1.37, 's2_pendulum'),
    pendulum_template(0.6, 1.5, 's3_pendulum'),
  ]

  for(s of SKETCHES) {
    new p5(s.sketch, s.name)
  }

}