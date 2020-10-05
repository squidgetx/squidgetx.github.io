var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/* utility */
/* http://jaketrent.com/post/addremove-classes-raw-javascript/ */
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

var c, ctx, cW, cH;
var balls = [];
var floor;
var n = 0;
var tempo = 32;
var mouseX, mouseY;
var counter = 0;
var maxCellSize = 80;
var initSize = 10;
var notes = [0,12,7,4,16,11,5,1];

var player = {};

function gaussianRand() {
  var rand = 0;
  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }
  return rand / 6;
}

var chooseNote = function(dissonance) {
  var index = -1;
  while ( index < 0 || index >= 1) {
    var rand = gaussianRand() * 2 - 1;
    index = rand*0.75 + dissonance;
  }
  return notes[Math.trunc(index * notes.length)];
}

var getScore = function() {
  return player.size/400;
}

var getDissonance = function() {
  return Math.min(getScore(), 1);
}
var tinycolor;

require(["../../lib/flocking-all.min.js", "../../lib/tinycolor.js"], function(f, t) {
  tinycolor = t;
  enviro = flock.init();
  var context = enviro.audioSystem.context;
  var compressor = flock.environment.audioSystem.nativeNodeManager.createOutputNode({
    node: "DynamicsCompressor",
    props: {}
  });
  compressor.knee.value = 0;
  compressor.threshold.value = -3;
  compressor.ratio.value = 20;
  compressor.attack.value = 0;
  compressor.release.value = 200;

  enviro.play();
  c = document.getElementById("canvas");
  c.style.backgroundColor = randomColor();
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  cW = c.width;
  cH = c.height;
  console.log("width: " + cW + ", height: " + cH);
  floor = cH;
  ctx = c.getContext("2d");
  mouseY = cH/2;
  mouseX = cW/2;
  c.addEventListener("mousemove", function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });

  init();
  animate();

});

var init = function() {
 // initialize player
  player.xpos = mouseX;
  player.mergers = [];
  player.ypos = mouseY;
  player.xvel = 0;
  player.yvel = 0;
  player.size = initSize;
  player.target = initSize;
  player.step = 0;
  player.color = '#000';
  balls = [];
  n = 0;
}

var draw_circle = function(ctx, circle) {
  ctx.fillStyle = circle.color;
  ctx.beginPath();
  ctx.arc(circle.xpos, circle.ypos, circle.size, 0, Math.PI *2, false);
  ctx.fill();
}

var draw_mergers = function(ctx, circle) {
  for(var i = 0; i < circle.mergers.length; i++) {
    draw_circle(ctx, circle.mergers[i]);
  }
}

// Sound //

var newCellSynth = function(pan, freq) {
  return flock.synth({
    synthDef: {
      id: "pan",
      ugen: "flock.ugen.pan2",
      pan: pan,
      source: {
        id: "filter",
        ugen: "flock.ugen.filter.biquad.lp",
        freq: freq, 
        source: {
          id: "noise",
          ugen: "flock.ugen.whiteNoise",
          mul: {
            id: "env",
            ugen: "flock.ugen.envGen",
            envelope: {
              type: "flock.envelope.adsr",
              attack: 0.01,
              decay: 0.5,
              peak: 0.3,
              sustain: 0,
              release: 0.5,
            },
            gate: 1
          },
        }
      }
    }
  });
}

var playNewCell = function(cell) {
  var pan = cell.xpos/cW * 2 - 1;
  var ffreq = cell.size * 50 + 300;
  var s = newCellSynth(pan, ffreq);
  s.play();
  window.setTimeout(function() {
    s.destroy();
  }, 1000);
}

var newMergeSynth = function(freq, mul, famp, pan) {
  return flock.synth({
    synthDef: {
      id: "pan",
      ugen: "flock.ugen.pan2",
      pan: pan,
      source: {
        id: "filter",
        ugen: "flock.ugen.filter.biquad.lp",
        source: {
          id: "adder",
          ugen: "flock.ugen.sum",
          sources: genSources(freq, mul),
        },
        freq: famp,
      }
    }
  });
}

var genSources = function(freq, mul) {
  return [
    {
      ugen: "flock.ugen.saw",
      freq: freq,
      mul: mul
    }, {
      ugen: "flock.ugen.saw",
      freq: freq * 1.01,
      mul: mul
    }
  ];
}

var genFilterFreq = function(ampenv) {
  return ampenv * 1000 + 50;
}

var play_merge_sound = function(large, small, player) {
  var ratio = large.size/small.size;
  var octave = Math.trunc(clamp(ratio/4,0,4)) + 3;
  if (player) {
    octave = Math.trunc(clamp((1 - getScore()) * 7, 1, 7));
  }
  var pan = large.xpos/cW * 2 - 1;
  var note = octave * 12 + chooseNote(getDissonance())
  var mergeSynth = newMergeSynth(
      flock.midiFreq(note),
      {
        id: "env",
         ugen: "flock.ugen.envGen",
         envelope: {
           type: "flock.envelope.adsr",
           attack: small.size/48 + 0.75,
           decay: small.size/48 + 0.75,
           peak: 0.5,
           sustain: 0,
           release: 0.5,
         },
         gate: 1
      },
      Math.min(10000, ratio/maxCellSize * 100 + 400),
      pan
  );
  mergeSynth.play();
  window.setTimeout(function() {
    mergeSynth.destroy();
  }, 10000);
}

var outofbounds = function(ball) {
  return ball.xpos < -maxCellSize || ball.xpos > (cW + maxCellSize) || ball.ypos < -maxCellSize || ball.ypos > cH + maxCellSize;
}

var distance = function(ball1, ball2) {
  return Math.sqrt(
      Math.pow(ball1.xpos - ball2.xpos, 2) + Math.pow(ball1.ypos - ball2.ypos, 2)
  );
}

var merge = function(large, small, player) {
  large.target = Math.sqrt(Math.pow(small.size,2) + Math.pow(large.size, 2));
  large.step = (large.target - large.size)/64;
  var tmass = large.size + small.size;
  large.xvel = (large.xvel * large.size + small.xvel * small.size)/tmass;
  large.yvel = (large.yvel * large.size + small.yvel * small.size)/tmass;
  large.targetcolor = tinycolor.mix(large.color, small.color).toHexString();
  large.mergers.push(small);
  play_merge_sound(large, small, player);
}

var collides = function(ball1, ball2) {
  return distance(ball1, ball2) < (ball1.size + ball2.size);
}

var addCell = function() {
  var horizontal = Math.random() > 0.5;
  var back = Math.random() > 0.5;
  var xpos, ypos, xvel, yvel, size;
  xpos = Math.random() * cW;
  ypos = Math.random() * cH;
  yvel = Math.random() * 2 + 0.2;
  yvel = back ? -yvel : yvel;
  xvel = Math.random() * 2 + 0.2;
  xvel = back ? -xvel : xvel;
  size = Math.random() * maxCellSize + 1;
  if (horizontal) {
    xpos = back ? size + cW : -size;
    yvel = 0;
  } else {
    ypos = back ? size + cH : -size;
    xvel = 0;
  }
  var color = randomColor();
  var newball = {
    size: size,
    target: size,
    step: 0,
    xvel: xvel,
    yvel: yvel,
    xpos: xpos,
    ypos: ypos,
    color: color,
    targetcolor: color,
    mergers: []
  }
  balls.push(newball);
  n++;
  playNewCell(newball);
}

var handleMergers = function(ball) {
  var toRemove = [];
  for(j = 0; j < ball.mergers.length; j++) {
    var merger = ball.mergers[j];
    var dX = ball.xpos - merger.xpos;
    var dY = ball.ypos - merger.ypos;
    merger.xpos = merger.xpos + ball.xvel + dX/64;
    merger.ypos = merger.ypos + ball.yvel + dY/64;
    merger.color = ball.color;
    if (distance(merger, ball) < merger.size) {
      toRemove.push(j);
    }
  }
  for(j = 0; j < toRemove.length; j++) {
    ball.mergers.splice(toRemove[j], 1);
  }

}

var animate = function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,cW,cH);
    
    var startT = 40;
    tempo = Math.trunc(startT - clamp(getScore() * startT, 0, startT) + 1)

    // Spawn new cells
    if (counter % tempo == 0) {
      if (Math.random() > 0.5) {
        addCell();
      }
    }
    counter++;

    // Move all balls
    for(var i = 0; i < n; i++) {
      ball = balls[i];
      ball.ypos += ball.yvel;
      ball.xpos += ball.xvel;
      // Grow if necessary
      if (ball.size < ball.target) {
        ball.size += ball.step;
      }

      // Change colors if necessary
      ball.color = tinycolor.mix(ball.color, ball.targetcolor, 5);
      // handle merging animation
      handleMergers(ball);

    }

    if (player.size < player.target) {
      player.size += player.step;
    }

    // Move player
    var maxSpd = Math.max(0.1,8 - (getScore() * 8));
    var factor = 256 * getScore() + 256;
    player.xvel = player.xvel * 0.9 + (mouseX - player.xpos)/factor;
    player.yvel = player.yvel * 0.9 + (mouseY - player.ypos)/factor;

    if (Math.abs(player.xvel) > maxSpd) {
      player.xvel = maxSpd * Math.sign(player.xvel);
    }
    if (Math.abs(player.yvel) > maxSpd) {
      player.yvel = maxSpd * Math.sign(player.yvel);
    }
    player.xpos += player.xvel;
    player.ypos += player.yvel;
    
    handleMergers(player);

    // Check for out of bounds
    var toRemove = [];
    for(var i = 0; i < n; i++) {
      if (outofbounds(balls[i])) {
        toRemove.push(i);
      }
    }
    for(var i = 0; i < toRemove.length; i++) {
      balls.splice(toRemove[i], 1);
      n--;
    }

    toRemove = [];
    // Check for collisions
    for(var i = 0; i < n; i++) {
      if (collides(balls[i], player)) {
        // Player eat
        if (balls[i].size > player.size) {
          // death
          init();
        } else {
          toRemove.push(i);
          merge(player, balls[i], true);
        }
      } else {
        for(j = i + 1; j < n; j++) {
          if (collides(balls[i], balls[j])) {
            if (balls[i].size > balls[j].size) {
              toRemove.push(j);
              merge(balls[i], balls[j], false);
            } else {
              toRemove.push(i);
              merge(balls[j], balls[i], false);
            }
          }
        }
      }
    }
    for(var i = 0; i < toRemove.length; i++) {
      balls.splice(toRemove[i], 1);
      n--;
    }

    // Draw everything
    for(var i = 0; i < n; i++) {
      ball = balls[i];
      draw_mergers(ctx, ball);
      draw_circle(ctx, ball);
    }

    player.color = tinycolor.mix(player.color, player.targetcolor, 5);
    draw_mergers(ctx, player);
    draw_circle(ctx, player);
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.xpos, player.ypos - 1, 8, Math.PI/4, 3*Math.PI/4, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(player.xpos - 3, player.ypos - 2, 1.5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.xpos + 3, player.ypos - 2, 1.5, 0, Math.PI * 2, false);
    ctx.fill();

/*
    ctx.font = '10pt Calibri';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(x.toString(),x,y);
    ctx.fillText(y.toString(),x,y + 10);
    */

}

