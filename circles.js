var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var c;
var ctx;
var xpos = 384;
var ypos = -700;
var r = 284;

var draw_circle = function(ctx, x, y, r) {
  ctx.fillStyle = "#00FF00";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI *2, false);
  ctx.fill();
}

var animate = function() {
    requestAnimationFrame(animate);
    ypos += 1;
    ctx.clearRect(0,0,c.width,c.height);
    draw_circle(ctx, xpos, ypos/4, r);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,c.height*.8,c.width,c.height*.25);
}

window.onload = function() {
  c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  xpos = c.width/2;
  r = xpos * .4;
  y = -c.height;
  ctx = c.getContext("2d");
  animate();
}
