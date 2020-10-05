/* initialize Global state */

let green1 = '#F5F9F1';
let green2 = '#E4F5D4';
let green3 = '#B6CDBD';
let green4 = '#5C715E';
let red = '#F0C9C9';
let landscape = [];
let colors = [green1, green2, green3, green4, red];
let color1 = green1;
let color2 = green3;
let color3 = green4;
let string = '';
let cursor = 0;
let row = 0;

function setup() {
  createCanvas(640, 640);
  Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
  }
}

function keyTyped() {
  color1 = colors.randomElement();
  color2 = colors.randomElement();
  color3 = colors.randomElement();
  string += key;
  cursor++;
  if (cursor > 5) {
    cursor = 0;
    row++;
  }
}

function draw() {
  background(color1);
  if (frameCount % 80 > 40) {
    push();
    noStroke();
    fill(color2);
    rect(cursor*100,row*180,100,180);
    pop();
  }
  textFont('Courier');
  textAlign(LEFT, TOP);
  textSize(180);
  fill(color3);
  for (i = 0; i < string.length; i+=6) {
    text(string.substring(i, i + 6), 0, i/6 * 160);
  }

}
