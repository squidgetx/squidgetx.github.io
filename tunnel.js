var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var c, ctx, cW, cH, x, y;
var n = 100;
var width = 100;
var res = 5;
var steep = 8;
var game_over = 0;
var pSize = 10;

var walls = [];

var animate = function() {
  requestAnimationFrame(animate);
  if (!game_over) {
    if ((x < walls[0]) || (x > walls[0] + width)) {
      game_over = 1;
      return;
    }

    walls.shift();
    walls.push(walls[walls.length - 1] + Math.random()*steep - steep/2);

    ctx.clearRect(0, 0, cW, cH);

    for(var i = 0; i < n; i++) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, i*res, walls[i], res);
      ctx.fillRect(walls[i] + width, i*res , cW - walls[i] - width, res);
    };

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(x, y, pSize, pSize);

  }

}


window.onload = function() {
  c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  cW = c.width;
  cH = c.height;
  floor = cH;
  ctx = c.getContext("2d");
  x = cW/2 - pSize/2;
  y = n*res;
  for(var i = 0; i < n; i++ ) {
    walls.push(cW/2 - width/2);
  }
  console.log(x);
  console.log(y);
  animate();
}

