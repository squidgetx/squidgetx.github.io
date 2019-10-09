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
  createCanvas(windowWidth, windowHeight);
  Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
  }
  angleMode(DEGREES);
}

function keyTyped() {
  if (key == ' ') {
    autoShatter = !autoShatter;
  }
}

let cracks = [];
let cross_cracks = [];

function shatter(x, y) {

  size = Math.pow(Math.random(), 2) * 468;
  // Add several cracks which radiate outward
  // Random circular crack segments
  // Cracks represented as arrays of points which will be connected by lines
  let cracksystem = {
    x: x,
    y: y,
    cracks: [],
    stages: 0
  };
  for(let i = 0; i < 360; i++) {
    if (Math.random() < 0.02) {
      // add initial segments to the system
      cracksystem.cracks.push([{
        x: x,
        y: y,
        theta: i,
        length: Math.random() * size,
       }]);
    }
  }
  cracks.push(cracksystem);
}

function getEndpoint(segment) {
  // returns x2, y2 given x1, y1, theta, length
  return {
    x: segment.x + cos(segment.theta) * segment.length,
    y: segment.y + sin(segment.theta) * segment.length,
  }

}

function propogate() {
  // propogate each crack
  // cracks: [
 //    [{segment}, {segmentarray}]
 //    [{segment}, {segmentarray}]

  //]
  cracks = cracks.map(function(cracksystem) {
    // c = collection of segments
    if (cracksystem.stages == 5) {
      return cracksystem;
    }
    let segments = cracksystem.cracks.map(function(segments) {
      let length = segments.length;
      let last_segment = segments[segments.length - 1];
      let coordinates = getEndpoint(last_segment);
      segments.push({
        x: coordinates.x,
        y: coordinates.y,
        // randomly vary angle by 5 degrees
        theta: last_segment.theta + Math.random() * 90 - 90,
        length: Math.random() * size,
      });
      return segments;
    });
    return {
      x: cracksystem.x,
      y: cracksystem.y,
      cracks: segments,
      stages: cracksystem.stages+1,
    }
  });

  cracks.forEach(function(cracksystem) {
    for(let index = 0; index < cracksystem.cracks.length; index++) {
      let segments = cracksystem.cracks[index];
      if (cracksystem.stages == 5) {
        return;
      }
      let length = segments.length;
      if (length > 5 || length == 0) {
        // don't propogate for finished crack segments
        return;
      }
      if (Math.random() < 0.8) {
        let j = index + 1;
        if (j == cracksystem.cracks.length) {
          j = 0;
        }
        if (cracksystem.cracks[j].length == 0) {
          return;
        }
        let seg1_index = Math.floor(Math.random() * cracksystem.cracks[index].length);
        let seg2_index = Math.floor(Math.random() * cracksystem.cracks[j].length);
        cross_cracks.push({
          seg1x: cracksystem.cracks[index][seg1_index].x,
          seg1y: cracksystem.cracks[index][seg1_index].y,
          seg2x: cracksystem.cracks[j][seg2_index].x,
          seg2y: cracksystem.cracks[j][seg2_index].y,
          ox: cracksystem.x,
          oy: cracksystem.y,
          color: colors.randomElement(),
        });
      }
    }
  });
}

function drawCracks() {
  cracks.forEach(function(cracksystem) {
    cracksystem.cracks.forEach(function(segments) {
      segments.forEach(function(segment) {
        let coord = getEndpoint(segment);
        stroke(green2);
        line(segment.x, segment.y, coord.x, coord.y);
      });
    });
  });
  cross_cracks.forEach(function (cc) {
    fill(cc.color);
    stroke(cc.color);
    triangle(cc.seg1x, cc.seg1y, cc.seg2x, cc.seg2y, cc.ox, cc.oy);
  })
}

function mousePressed() {
  is_shatter = true;
}

function mouseReleased() {
  is_shatter = false;
}

function draw() {
  background(color1);
  drawCracks();
  if (is_shatter) {
    shatter(mouseX, mouseY);
  }
  propogate();
  if (autoShatter) {
    shatter(autoX, autoY);
    autoX += Math.random() * 10 - 10;
    autoY += Math.random() * 10 - 10;
    if (autoX < 0 || autoX > windowWidth) {
      autoX = Math.random() * windowWidth;
    }
    if (autoY < 0 || autoY > windowHeight) {
      autoY = Math.random() * windowHeight;
    }
  }

  if (cracks.length == 100) {
    cracks.shift();
  }
}
