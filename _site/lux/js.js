var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var c, ctx, cW, cH, cc;
var balls = [];
var bgcolor = '#FF00FF'
var g = 1;
var floor;
var n = 0;
var count = 1;
var speed = 2;
var mask = new Image();
var enviro;


require(["../lib/flocking-all.min.js"], function() {
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
  bgcolor = '#000000';
  
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  cW = c.width;
  cH = c.height;
  floor = cH;
  ctx = c.getContext("2d");

  var rate = 0.65

  window.setTimeout(function() {
    rate = 0.5;
    console.log("1 minute");
  }, 60000);

  window.setTimeout(function() {
    rate = 0.4;
    console.log("2 minutesk");
  }, 120000);

  window.setTimeout(function() {
    rate = 0;
    console.log("3 minutesk");
  }, 180000);

  window.setInterval(function() {
    if (Math.random() < 0.7) {
      if (Math.random() < rate) {
        add_ball();
      } else if (n > 0) { 
        remove_ball();
      }
    }
  }, 2500);

  animate();


});

var draw_circle = function(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI *2, false);
  ctx.fill();
}

var random_exp = function(rate) {
  var n = Math.log(Math.random())/(-rate)*220 + 165;
  if (n > 660) {
    n = [165,220,440,660][Math.floor(Math.random() * 4)]
  }
  return n;
}

var play_sound = function() {
  var synth = flock.synth({
    synthDef: {
      ugen: "flock.ugen.sin",
      freq: random_exp(1),
      mul: {
          ugen: "flock.ugen.envGen",
          envelope: {
            type: "flock.envelope.adsr",
            attack: 0.01,
            decay: 2,
            peak: 0.8,
            sustain: 0,
            release: 0.5
          },
          gate: 1
      }
    }
  });
}

var add_ball = function() {
  balls.push({
    xpos: Math.random() * cW,
    ypos: Math.random() * cH,
    r: Math.random() * 128 + 32,
    yvel: 0, 
    xvel: 0, 
    speed: Math.random() * 3,
    color: randomColor()
  });
  n += 1;
  bgcolor = randomColor();
  play_sound();
}

var remove_ball = function() {
  balls.shift();
  n--;
  bgcolor = randomColor();
  play_sound();
}

var animate = function() {
    requestAnimationFrame(animate);
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0,0,cW,cH);
    for(i = 0; i < n; i++) {
      ball = balls[i];
      ball.xpos += Math.random() * ball.speed * 2 - ball.speed;
      ball.ypos += Math.random() * ball.speed * 2 - ball.speed;
      draw_circle(ctx, ball.xpos, ball.ypos, ball.r, ball.color);
    }
    //ctx.drawImage(mask, 0, 0, cW, cH);

   }

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

