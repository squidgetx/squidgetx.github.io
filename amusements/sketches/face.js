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
let is_shatter = false;
let size = 10;
let autoShatter = false;
let autoX = 300;
let autoY = 300;

function setup() {
  createCanvas(600, 600);
  Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
  }
}
let c = 0.8;
let blink = false;
let bg = green4;
let face = green2;
let eyes = green3;
let beyes = green2;

function draw() {
  background(bg);
  fill(face);
  noStroke();
  // head
  ellipse(300, 255, 300, 325);
  ellipse(300, 300, 300, 400);

  // eyes
  if (blink) {
    fill(face);
  } else {
    fill(eyes);
  }
  arc(230, 320, 110, 110, PI+c, -c, CHORD);
  arc(230, 240, 110, 110, c, PI-c, CHORD);

  arc(370, 320, 110, 110, PI+c, -c, CHORD);
  arc(370, 240, 110, 110, c, PI-c, CHORD);

  if (!blink && Math.random() < 0.01) {
    blink = true;
    if (Math.random() < 0.5) {
      bg = colors.randomElement();
      eyes = colors.randomElement();
      face = colors.randomElement();
      beyes = colors.randomElement();
      // if all colors the same, reroll once
      if (bg == eyes  && bg == face && bg == beyes) {
        bg = colors.randomElement();
        eyes = colors.randomElement();
        face = colors.randomElement();
        beyes = colors.randomElement();
      }
    }
  }
  if (blink && Math.random() < 0.1) {
    blink = false;

  }

}
