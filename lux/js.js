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

var start_capture = function() {
  cc = new CanvasCapture({
    debug: false,
    fps: 24,
    inCanvasEl: c,
    outWidth: cW,
    outHeight: cH
  });
  cc.start();
}
  
require(['lib/capture.js'], start_capture);

var finish_capture = function () {
  cc.stop();
  cc.getImage();
}

var draw_circle = function(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI *2, false);
  ctx.fill();
}

var add_ball = function() {
  balls.push({
    xpos: Math.random() * cW,
    ypos: Math.random() * cH,
    r: Math.random() * 32 + 16,
    yvel: 0, 
    xvel: 0, 
    speed: Math.random() * 2,
    color: randomColor()
  });
  n += 1;
  bgcolor = randomColor();
}

var remove_ball = function() {
  balls.shift();
  n--;
  bgcolor = randomColor();
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
    ctx.drawImage(mask, 0, 0, cW, cH);

   }

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

window.onload = function() {
  c = document.getElementById("canvas");
  bgcolor = randomColor();
  cW = c.width;
  cH = c.height;
  floor = cH;
  ctx = c.getContext("2d");
  mask.src = 'mask.png'

  window.setInterval(function() {
    if (Math.random() < 0.7) {
      if (Math.random() < 0.6) {
        add_ball();
      } else if (n > 1) { 
        remove_ball();
      }
    }
  }, 2500);

  animate();
}
