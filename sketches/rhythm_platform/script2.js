/* initialize Global state */
let dragged, offsetX, offsetY;
let minus_button, plus_button, clear_button;
let newBGN = 4;
let draggedWindow = false;
let selected = [];
let is_playing = false;
let play_button;
let buttons = [];
/* audio samples */
let kick = new Tone.Player("/amusements/bounce2/samples/kick.wav");
let snare = new Tone.Player("/amusements/bounce2/samples/snare.wav");
let hh = new Tone.Player("/amusements/bounce2/samples/hihat.ogg");
let oh = new Tone.Player("/amusements/bounce2/samples/oh.wav");
kick.toMaster();
snare.toMaster();
hh.toMaster();
oh.toMaster();
Tone.Buffer.on('load', start);

let balls = [];
let ball_generators = [];
let objects = [];
let spinners = [];
let selectedBG = null;
// We only need one transport event to update the rotation status of each gear, since
// we'll update the rotation value of all the gears at the same rate
let FRAMERATE = 30;
let BGSIZE = 24;
let SIDEBAR_X;
let sliderLength = 128;
let global_tempo = 120;
Tone.Transport.scheduleRepeat(animate, 1 / FRAMERATE);

/* Tone.js timing setup */

function setup() {
  createCanvas(displayWidth, windowHeight);

  spinners.push({
    x: 1200,
    y: 400,
    w: 50,
    h: 10,
    rate: 1,
    active: 0,
    rotation: 0,
  });
  SIDEBAR_X = displayWidth - 128 - 16;
  play_button = {
    x: displayWidth - 128 - 16,
    y: 16,
    text: 'play',
    w: 128,
    h: 64,
    selected: false,
  };

  clear_button = {
    x: displayWidth - 128 - 16,
    y: windowHeight - 64 - 16,
    text: 'clear',
    w: 128,
    h: 64,
    selected: false,
  };
  plus_button = {
      x: displayWidth - 64 + 16,
      y: 64 + 32,
      text: '+',
      w: 32,
      h: 32,
      selected: false,
      circle: true,
    };
  minus_button = {
      x: displayWidth -128-16,
      y: 64 + 32,
      text: '-',
      w: 32,
      h: 32,
      selected: false,
      circle: true,
    };
  buttons = [
    {
      x: displayWidth - 128 + 16,
      y: 64 + 32,
      text: newBGN,
      w: 64,
      h: 64,
      selected: false,
      circle: true,
    },
    {
      x: displayWidth - 128 - 16 ,
      y: 128 + 16 * 3,
      text: 'kick',
      audio: kick,
      w: 128,
      h: 64,
      selected: false,
    },
    {
      x: displayWidth - 128 - 16 ,
      y: 16 * 4 + 64 * 3,
      text: 'snare',
      audio: snare,
      w: 128,
      h: 64,
      selected: false,
    },
    {
      x: displayWidth - 128 - 16 ,
      y: 16 * 5 + 64 * 4,
      text: 'hihat',
      audio: hh,
      w: 128,
      h: 64,
      selected: false,
    },
    {
      x: displayWidth - 128 - 16 ,
      y: 16 * 6 + 64 * 5,
      text: 'openhat',
      audio: oh,
      w: 128,
      h: 64,
      selected: false,
    }
  ]

}

function start() {
  Tone.Transport.start();
}

function drawBall(ball) {
  circle(ball.x, ball.y, ball.r);
}

function drawBalls() {
  balls.forEach(function(f) {
    drawBall(f);
  })
}

function drawBallGenerator(bg) {
  push();
  noStroke();
  let color = '#B6CDBD';
  if (bg.selected) {
    color = '#5C715E';
  }
  fill(color);
  circle(bg.x + bg.w/2, bg.y + bg.w/2, bg.w);
  fill("#FFF");
  textAlign(CENTER, CENTER);
  text(bg.rate, bg.x + bg.w/2, bg.y + bg.h / 2);
  pop();
}

function drawBallGenerators() {
  ball_generators.forEach(function(bg) {
    drawBallGenerator(bg);
  })
}

function drawSpinners() {

}

function testCollide(x, y, o) {
  return x > o.x && x < o.x + o.w && y > o.y && y < o.y + o.h;
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 8) {
    // delete key
    objects = objects.filter(function(o) {return !o.selected });
    ball_generators.filter(function(o) { return o.selected }).map(function(o) { Tone.Transport.clear(o.func)});
    ball_generators = ball_generators.filter(function(o) {return !o.selected });
  }
}

function mouseReleased() {
  dragged = null;
  draggedWindow = false;
}

function mousePressed() {
  let contact = false;
  if (testCollide(mouseX, mouseY, clear_button)) {
    ball_generators.map(function(a) { Tone.Transport.clear(a.func)});
    ball_generators = [];
    objects = [];
    return;
  }
  selected = buttons.filter(function(a) { return a.selected});
  if (selected.length > 0 && mouseX < SIDEBAR_X) {
    if (selected[0].circle) {
      addBallGenerator(newBGN, mouseX, mouseY);
    } else {
      addObject(selected[0].text, selected[0].audio, mouseX, mouseY);
    }
    selected = selected.map(function(a) { a.selected = false});
    return;
  }
  ball_generators.forEach(function(bg) {
    bg.selected = false;
    if (testCollide(mouseX, mouseY, bg)) {
      offsetX = bg.x-mouseX;
      offsetY = bg.y-mouseY;
      selectedBG = bg;
      dragged = bg;
      contact = true;
      bg.selected = true;
    }
  });
  objects.forEach(function(bg) {
    bg.selected = false;
    if (testCollide(mouseX, mouseY, bg)) {
      offsetX = bg.x-mouseX;
      offsetY = bg.y-mouseY;
      dragged = bg;
      contact = true;
      bg.selected = true;
    }
  });
  if (testCollide(mouseX, mouseY, play_button)) {
    play_button.selected = !play_button.selected;
    play_button.text = play_button.selected ? 'stop' : 'play';
    if (play_button.selected) {
      Tone.context.resume();
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
    }
    return;
  }
  if (testCollide(mouseX, mouseY, minus_button)) {
    if (newBGN > 1) {
      newBGN --;
      buttons[0].text = newBGN;
    }
      return;
  }
  if (testCollide(mouseX, mouseY, plus_button)) {
    newBGN ++;
    buttons[0].text = newBGN;
    return;
  }
  buttons.forEach(function(b) {
    b.selected = false;
    if (testCollide(mouseX, mouseY, b)) {
      b.selected = true;
      contact = true;
    }
  })
  if (contact) {
    return;
  }
  offsetX = mouseX;
  offsetY = mouseY;
  draggedWindow = true;
}

function drawObjects() {
  objects.forEach(function(o) {
    drawObject(o);
  });
}

function drawObject(o) {
  push();
  if (o.active > 0) {
    fill('#F0C9C9');
    o.active--;
  } else if (o.selected) {
    fill('#5C715E');
  } else {
    fill('#B6CDBD');
  }
  noStroke();
  rect(o.x, o.y, o.w, o.h);
  fill('#F5F9F1');
  textAlign(CENTER, CENTER);
  textSize(16);
  text(o.text, o.x + o.w/2, o.y + o.h/2);
  pop();
}

function addObject(name, audio, x, y) {
  objects.push({
    x: x,
    y: y,
    w: 50,
    h: 16,
    audio: audio,
    active: 0,
    text: name,
  });
}

function addBall(bg) {
  balls.push({
    x: bg.x + bg.w,
    y: bg.y,
    r: 8,
    vx: 2,
    vy: 0,
  });
}

function addBallGenerator(rate, x, y) {
  let new_bg = {
    x: x,
    y: y,
    rate: rate,
    func: Tone.Transport.scheduleRepeat(function(time) {
      // generate ball
      addBall(new_bg);
    }, 60 * 4 / Tone.Transport.bpm.value / rate, Tone.Transport.nextSubdivision("4n")),
    h: BGSIZE,
    w: BGSIZE,
  };
  console.log( Tone.Transport.nextSubdivision("4n"));
  ball_generators.push(new_bg);
}

function animate(time) {
  // move all balls
  spinners.forEach(function(spinner) {
    spinner.rotation += 1;
  });
  balls.forEach(function(ball, index) {
    let newx = ball.x + ball.vx;
    let newy = ball.y + ball.vy;
    if (newy > displayWidth) {
      balls.slice(index, 1);
    }
    // check collisions
    for(let i = 0; i < objects.length; i++) {
      object = objects[i];
      for(let j = 0; j < 4; j++) {
        let nx = ball.x + ball.vx * j / 4;
        let ny = ball.y + ball.vy * j / 4;
        if (nx > object.x && nx < object.x + object.w && ny > object.y && ny < object.y + object.h) {
          // there is a collision
          // back the ball up
          dY = object.y - ball.y;
          dX = ball.vx * dY / ball.vy;
          ball.vy = -ball.vy;
          newy = ball.y + dY;
          newx = ball.x + dX;
          object.audio.volume.value = Math.abs(ball.vy) - 12;
          console.log(Math.abs(ball.vy)/8 - 12);
          object.audio.restart(time);
          object.active = 10;
          break;
        }
      }
    }
    ball.vy += 1;
    ball.x = newx;
    ball.y = newy;
  });
}

function overlap(o, x1, y1, w, h) {
  //console.log(o.x + o.w, x2);
  if (w < 0) {
    x1 = x1 + w;
    w = -w;
  }
  if (h < 0) {
    y1 = y1 + h;
    h = -h;
  }
  return (o.x > x1 && o.x + o.w < x1 + w && o.y > y1 && o.y + o.h < y1 + h);
}

function drawDragWindow() {
  if (draggedWindow == true) {
    push();
    stroke('#B6CDBD');
    noFill();
    rect(offsetX, offsetY, mouseX - offsetX, mouseY - offsetY);
    pop();
    // select elements
    objects = objects.map(function(o) {
      o.selected = overlap(o, offsetX, offsetY, mouseX - offsetX, mouseY - offsetY);
      return o;
    });
    ball_generators = ball_generators.map(function(o) {
      o.selected = overlap(o, offsetX, offsetY, mouseX - offsetX, mouseY - offsetY);
      return o;
    });
  }
}

function drawButton(button) {
  push();
  fill('#B6CDBD');
  if (button.selected) {
    fill('#5C715E');
  }
  noStroke();
  if (button.circle) {
    circle(button.x + button.w/2, button.y + button.w/2, button.w);
  } else {
    rect(button.x, button.y, button.w, button.h);
  }
  fill('#F5F9F1');
  textAlign(CENTER, CENTER);
  textSize(64);
  text(button.text, button.x + button.w / 2, button.y + button.h / 2);
  pop();
}

function drawSidebar() {
  // play/pause button
  drawButton(play_button);
  drawButton(minus_button);
  drawButton(plus_button);
  drawButton(clear_button);
  buttons.forEach(function(b) { drawButton(b); });
}

function drawDraft() {
  selected = buttons.filter(function(a) { return a.selected});
  if (selected.length > 0 && mouseX < SIDEBAR_X) {
    if (selected[0].circle) {
      drawBallGenerator({
        rate: newBGN,
        x: mouseX,
        y: mouseY,
        w: BGSIZE,
        h: BGSIZE,
      })
    } else {
      drawObject({
        text: selected[0].text,
        x: mouseX,
        y: mouseY,
        w: 50,
        h: 16,
      })
    }
  }
}

function draw() {
  background('#F5F9F1');
  drawBalls();
  drawBallGenerators();
  drawObjects();
  drawDragWindow();
  drawSidebar();
  drawDraft();
  if (dragged != null) {
    dragged.x = mouseX + offsetX;
    dragged.y = mouseY + offsetY;
  }
}
