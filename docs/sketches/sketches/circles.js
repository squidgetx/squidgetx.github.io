/* initialize Global state */

let green1 = '#F5F9F1';
let green2 = '#E4F5D4';
let green3 = '#B6CDBD';
let green4 = '#5C715E';
let red = '#F0C9C9';
let flames = [];
let colors = [green1, green2, green3, green4, red];

function setup() {
  createCanvas(600, 600);
  Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}
}

function nextColor(color) {
  if (color == green4) {
    return green3;
  } else if (color == green3) {
    return green2;
  } else {
    return green1;
  }
}

function draw() {
  background(green1);
  if (Math.random() < 0.1) {
    flames.push({
      x: Math.random() * 600,
      y: 800,
      color: colors.randomElement(),
      lifespan: Math.random() * 500,
    })
  }
  flames.forEach(function(f) {
    push();
    fill(f.color);
    noStroke();
    circle(f.x, f.y, f.lifespan),
    f.y --;

    pop();
  })
}
