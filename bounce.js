var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var c;
var ctx;
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

var animate = function() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,c.width,c.height);
    for(i = 0; i < n; i++) {
      if (balls[i].ypos/acc + balls[i].r > floor) {
        balls[i].ypos = (floor - balls[i].r)*acc;
        balls[i].yvel = (-.8) * balls[i].yvel;
        balls[i].xvel = .96 * balls[i].xvel;
      }
      if (balls[i].xpos - balls[i].r < 0) {
        balls[i].xvel = -.8 * balls[i].xvel;
        balls[i].xpos = balls[i].r;
      }
      if (balls[i].xpos + balls[i].r > c.width) {
        balls[i].xvel = -.8 * balls[i].xvel;
        balls[i].xpos = c.width - balls[i].r;
      }
      balls[i].yvel += g;
      balls[i].ypos += balls[i].yvel;
      balls[i].xpos += balls[i].xvel;
      
      draw_circle(ctx, balls[i].xpos, balls[i].ypos/acc, balls[i].r, balls[i].color);
    }
    ctx.font = '40pt Calibri';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(n.toString(),100,100);
}

var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

window.onload = function() {
  c = document.getElementById("canvas");
  c.style.backgroundColor = randomColor();
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  floor = c.height;
  ctx = c.getContext("2d");

  c.addEventListener("mousemove", function(event) {
    balls.push({xpos: event.pageX, ypos: event.pageY*acc, r: Math.random()*24 + 1, yvel: 0, xvel: 0, color: randomColor()});
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
