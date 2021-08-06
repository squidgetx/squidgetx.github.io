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

var flelastic = 0.9;

var c, ctx, cW, cH;
var balls = [];
var g = 1;
var floor;
var acc=4;
var n = 0;
var key = 0;

var cchord = [0,1,2,3,4,5,6,7,8,9,10,11,12];

var chords = [[0,4,7,9,11],
              [0,4,7],
              [0,4,7,11],
              [0,4,7,10],
              [0,3,7],
              [0,3,7,8,10],
              [0,7],
              [0,2,4,7,11]];

require(["/lib/flocking-all.min.js"], function() {
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
  floor = cH;
  ctx = c.getContext("2d");

  c.addEventListener("mousemove", function(event) {
    if (Math.random() < 0.1) {
      var s = Math.random() * 60;
      balls.push({
        xpos: event.pageX,
        ypos: event.pageY*acc, 
        r: (60 - s)*3/2 + 3, 
        yvel: 0, 
        xvel: 0, 
        color: randomColor(), 
        synth: flock.synth({
          synthDef: {
            id: "carrier",
            ugen: "flock.ugen.sin",
            freq: randomNote(s),
            mul: 0
          }
        })
      });
      n += 1;
    }
  });

  c.addEventListener("mousedown", function(event) {
    // make everything explode!
    var x = event.pageX;
    var y = event.pageY;
    for(i = 0; i < n; i++) {
      var dX = balls[i].xpos - x;
      var dY = balls[i].ypos/acc - y;
      var d = Math.sqrt(dX*dX + dY*dY) * balls[i].r / 4;
      balls[i].xvel = 128/(d/dX);
      balls[i].yvel = 128*acc/(d/dY);
    }
    c.style.backgroundColor = randomColor();
    key = Math.floor(Math.random()*12);
  });

  $('#reset').click(function(event) {
    balls = [];
    n = 0;
  });
  
  var note_update = function() {
    var n = parseInt(this.id);
    var i = cchord.indexOf(n);
    if (i > -1) {
      cchord.splice(i, 1);
      addClass(this, "off");
    } else {
      cchord.push(n);
      removeClass(this, "off");
    }
    console.log(cchord);
  }

  notes = document.getElementsByClassName("nbutton");
  for(var i = 0; i < 12; i++) {
    notes[i].addEventListener("click", note_update);
  }

  $('#pull').click(function(event) {
    $('.navbar').toggleClass('navbar-active');
  });
  
  animate();

});

var draw_circle = function(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI *2, false);
  ctx.fill();
}


var play_sound = function(ball) {
  vel = Math.sqrt(Math.pow(ball.xvel, 2) + Math.pow(ball.yvel, 2));
  vel = vel/50;
  if (Math.abs(ball.yvel/50) < 0.1) {
    return; 
  }
  if (vel > 0.8) {
    vel = 0.8;
  }
  ball.synth.set({
    "carrier.mul": {
      id: "env",
       ugen: "flock.ugen.envGen",
       envelope: {
         type: "flock.envelope.adsr",
         attack: 0.01,
         decay: vel + 1,
         peak: vel,
         sustain: 0,
         release: 0.5,
       },
       gate: 1
    }
  });
  ball.synth.play();
  

}

var animate = function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,cW,cH);
    for(i = 0; i < n; i++) {
      ball = balls[i];
      if (ball.ypos/acc + ball.r > floor) {
        ball.ypos = (floor - ball.r)*acc;
        ball.yvel = (-flelastic) * ball.yvel;
        ball.xvel = .96 * ball.xvel;
        play_sound(ball);
      }
      if (ball.xpos - ball.r < 0) {
        play_sound(ball);
        ball.xvel = -.8 * ball.xvel;
        ball.xpos = ball.r;
      }
      if (ball.xpos + ball.r > cW) {
        play_sound(ball);
        ball.xvel = -.8 * ball.xvel;
        ball.xpos = cW - ball.r;
      }
      ball.yvel += g;
      ball.ypos += ball.yvel;
      ball.xpos += ball.xvel;
      
      draw_circle(ctx, ball.xpos, ball.ypos/acc, ball.r, ball.color);
    }
    ctx.font = '40pt Calibri';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(n.toString(),100,150);
}

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}


var randomNote = function(n) {
 // var n = Math.floor(Math.random() * 60);
  // note 0 is A2
  var k = n % 12;
  var diff = 12;
  var f = 0;
  for(var j = 0; j < cchord.length; j++) {
    if (Math.abs(k - cchord[j]) < diff) {
      diff = Math.abs(k - cchord[j]);
      f = cchord[j];
    }
  }
  n = 12*Math.floor(n/12) + f;
  return Math.pow(2, n/12)*55;
}

