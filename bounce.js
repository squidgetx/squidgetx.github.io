var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var c, ctx, cW, cH;
var balls = [];
var g = 1;
var floor;
var acc=4;
var n = 0;

var draw_circle = function(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI *2, false);
  ctx.fill();
}

var play_sound = function(ball) {
  T("sin", {freq: ball.note, mul: 0.5}).play();
}

var animate = function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,cW,cH);
    for(i = 0; i < n; i++) {
      ball = balls[i];
      if (ball.ypos/acc + ball.r > floor) {
        ball.ypos = (floor - ball.r)*acc;
        ball.yvel = (-.8) * ball.yvel;
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
    ctx.fillText(n.toString(),100,100);
}

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

var randomNote = function() {
  var n = Math.floor(Math.random() * 100);
  console.log(n);
  return Math.pow(2, n/12)*110;
}

window.onload = function() {
  c = document.getElementById("canvas");
  c.style.backgroundColor = randomColor();
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  cW = c.width;
  cH = c.height;
  floor = cH;
  ctx = c.getContext("2d");

  c.addEventListener("mousemove", function(event) {
    balls.push({xpos: event.pageX, ypos: event.pageY*acc, r: Math.random()*24 + 3, yvel: 0, xvel: 0, color: randomColor(), note: randomNote()});
    n += 1;
  });

  c.addEventListener("click", function(event) {
    // make everything explode!
    var x = event.pageX;
    var y = event.pageY;
    for(i = 0; i < n; i++) {
      var dX = balls[i].xpos - x;
      var dY = balls[i].ypos/acc - y;
      var d = Math.sqrt(dX*dX + dY*dY) * balls[i].r /2;
      balls[i].xvel = 64/(d/dX);
      balls[i].yvel = 64*acc/(d/dY);
    }
    c.style.backgroundColor = randomColor();
  });

  animate();
}
