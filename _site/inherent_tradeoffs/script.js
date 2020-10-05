function getDimensions(n) {
  return Math.ceil(Math.sqrt(n));
}

function eTriangle(x, y, r, p5) {
  let a = [];
  r = r/2;
   for (let i=0; i<3; i++) {
      a.push(x + r * Math.cos(Math.PI/6 + i * 2 * Math.PI/3));
      a.push(y + r * Math.sin(Math.PI/6 + i * 2 * Math.PI/3));
   }
   p5.triangle(a[0], a[1], a[2], a[3], a[4], a[5]);
}

// Return n-array of rates (0-1)
function generateGroupRates(n) {
  let a = [];
  for(let i = 0; i < n; i++) {
    a.push(Math.random());
  }
  return a;
}

// Return array of size (n_per_group * group_rates)
function generatePeople(n_per_group, n_groups) {
  let a = [];

  let col_w = getDimensions(n_per_group);
  let r = 20;
  let p = 1;
  let r_total = r + p;
  let group_w = col_w * r + 100; // 20 padding

  let accRate = 0.8; // 80% accuracy rate overall;
  for(let group_i = 0; group_i < n_groups; group_i++) {
    for(let i = 0; i < n_per_group; i++) {
      let positive;
      let row = Math.floor(i / col_w);
      let col = i % col_w;
      a.push({
        id: group_i * n_per_group + i,
        group_id: group_i,
        positive: false,
        label: false,
        show: false,
        getCoords: function() {
          return [group_w * group_i + col * r_total + r_total/2, row * r_total + r_total/2];
        },
        timer: 0,
      })
    }
  }
  console.log(a)
  return a;
}


function inBox(x, y, boxCenter, boxR) {
  return (x > boxCenter[0] - boxR && x < boxCenter[0] + boxR && y > boxCenter[1] - boxR && y < boxCenter[1] + boxR)
}

let s1 = function(p5) {
  let people, init_group_rates, drag, mouseRight;
  let sliders = [];
  let n_groups = 2;
  let n_per_group = 100;

  let col_w = getDimensions(n_per_group);
  let r = 20;
  let p = 1;
  let r_total = r + p;
  let group_w = col_w * r + 100; // 20 padding

  let drawPeople = function() {
    // for now separate by group
    for(let group_i = 0; group_i < sliders.length; group_i++) {
      let tp = fn = fp = tn = 0;
      for(let i = 0; i < n_per_group; i++) {
        p5.push();
        p5.noStroke()
        let person = people[group_i * n_per_group + i];
        if (person.label) {
          p5.fill(10, 10, 10);
        } else {
          p5.fill(130, 130, 130);
        }
        let row = Math.floor(i / col_w);
        let col = i % col_w;
        p5.translate(person.getCoords()[0], person.getCoords()[1]);
        if (person.show) {
          if (person.positive) {
            p5.rotate(Math.PI/4);
            p5.rect(-r/2, -2, r, 4);
            p5.rect(-2, -r/2, 4, r);
          } else {
            p5.circle(0, 0, r-2);
            p5.push();
            p5.fill(250);
            //p5.translate(person.getCoords()[0], person.getCoords()[1]);
            p5.circle(0, 0, r-10);
            p5.pop();
          }
        } else {
          p5.rect(-r/2, -r/2, r, r);
        }
        p5.pop();
        if (person.positive && person.label) {
          tp++;
        } else if (person.positive && !person.label) {
          fn++;
        } else if (!person.positive && person.label) {
          fp++;
        } else if (!person.positive && !person.label) {
          tn++;
        }
      }
      p5.stroke(10);
      // calc error rate
      p5.text("correctly labeled (TP): " + tp, group_i * group_w, col_w * r_total + 40)
      p5.text("correctly unlabeled (TN): " + fp, group_i * group_w, col_w * r_total + 100)
      p5.text("incorrectly labeled (FP): " + fp, group_i * group_w, col_w * r_total + 80)
      p5.text("missed (FN): " + fn, group_i * group_w, col_w * r_total + 60)
      p5.text("positive class label rate:" + (tp) + "/" + (tp + fn) + " (" + (tp / (tp + fn)).toFixed(2) + ")", group_i * group_w, col_w * r_total + 120)
      p5.text("negative class label rate:" + (tn) + "/" + (tn + fp) + " (" + (tn / (tn + fp)).toFixed(2) + ")", group_i * group_w, col_w * r_total + 140)
    }
  }

  p5.setup = function() {
    init_group_rates = generateGroupRates(n_groups)
    people = generatePeople(n_per_group, n_groups);
    p5.createCanvas(800,500)
    const rect = document.getElementById('sketch1').getBoundingClientRect();
    let left = rect.left + window.scrollX;
    let top = rect.top + window.scrollY;
    for(let i = 0; i < n_groups; i++) {
      let s = p5.createSlider(0, 1, init_group_rates[i], 0.01);
      s.style('width', '170px');
      s.position(i * group_w + 20 + left, col_w * r_total + 20 + top);
      sliders.push(s);
    }
  }

  p5.draw = function() {
    p5.background(250);
    drawPeople();
    // update sliders
    sliders.forEach(function(s, i) {
      p5.stroke(10)
      p5.text((s.value() * 100).toFixed(0) + "%", i * group_w, col_w * r_total + 20);
      let counter = 0.5 / n_per_group;
      for(let person_i = 0; person_i < n_per_group; person_i++) {
        people[i * n_per_group + person_i].positive = counter < s.value()
        counter += 1.0 / n_per_group;
      }
    })
    if (drag) {
        people.forEach(function(person) {
        if (inBox(p5.mouseX, p5.mouseY, person.getCoords(), 10)) {
          if (person.timer == 0) {
            if (mouseRight) {
              person.label = !person.label;
            } else {
              person.show = !person.show;
            }

            person.timer = 1
          }
        } else {
          person.timer = 0;
        }
      })
    }
  }

  p5.mousePressed = function() {
    console.log('pressed', p5.mouseButton);
    mouseRight = p5.mouseButton === p5.RIGHT;
    drag = true;
  }

  p5.mouseReleased = function() {
    drag = false;
    people.forEach(function(person) {
      person.timer = 0;
    })

    return false;
  }
}

// multiple visual components:
// group membership
// label
// class membership
// 3 dimensions:
// shape, color, position

new p5(s1, 'sketch1') // load s1 into sketch1
document.getElementById('sketch1').oncontextmenu = function(e) {
    e.preventDefault();
    return false;
}
