let TEXTSIZE = 16
let LINESIZE = TEXTSIZE * 1.15
let NEUTRAL_COLOR = '#AF7DAF'
let SELECT_COLOR = '#6464C8'
let UNSELECT_COLOR = '#FA9696'
let TEXT_COLOR = '#0A0A0A'
let TEXT_COLOR_LIGHT = '#FAFAFA'

// Version 4.0
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

let createButton = function(
  p5, x, y, w, h, text, cb, altText=null
) {
  return {
    draw: function() {
      // TODO: color theme
      let textColor = 10;
      let fillColor = 250;
      if (this.isHover) {
        textColor = 250;
        fillColor = 30;
      }
      p5.push();
      p5.rectMode(p5.CENTER)
      p5.fill(fillColor);
      if (this.isHover) {
        p5.stroke(fillColor);
      } else {
        p5.stroke(textColor);

      }
      p5.rect(x, y, w, h)
      p5.pop();
      p5.textAlign(p5.CENTER, p5.CENTER)
      p5.noStroke();
      p5.fill(textColor);
      if (this.isClicked && altText != null) {
        p5.text(altText, x, y)
      } else {
        p5.text(text, x, y)
      }
    },
    checkClicked: function() {
      if (inBox(p5.mouseX, p5.mouseY, [x, y], w/2, h/2)) {
        cb();
        this.isClicked = !this.isClicked;
      }
    },
    checkHover: function() {
      this.isHover = inBox(p5.mouseX, p5.mouseY, [x, y], w/2, h/2)
    },
    isClicked: false,
  }
}

Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }

  return this;
}

function inBox(x, y, boxCenter, boxW, boxH) {
  return (x > boxCenter[0] - boxW && x < boxCenter[0] + boxW && y > boxCenter[1] - boxH && y < boxCenter[1] + boxH)
}

function fractionText(str1, str2, x, y, p5) {
    p5.push()
    p5.textAlign(p5.CENTER)
    p5.text(str1, x, y - 5)
    p5.stroke(70)
    p5.line(x - 30, y, x + 30, y)
    p5.noStroke()
    p5.text(str2, x, y + 13)
    p5.pop()
}

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}
// end utilities

function getDimensions(n) {
  return Math.ceil(Math.sqrt(n)) + 1;
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
    a.push(gaussianRand());
  }
  return a;
}

// Return array of size (n_per_group * group_rates)
function generatePeople(n_per_group, n_groups, sort_positive=false) {
  let a = [];

  let n_cols = getDimensions(n_per_group);
  let n_unified_cols = getDimensions(n_per_group * n_groups);

  let accRate = 0.8; // 80% accuracy rate overall;
  for(let group_i = 0; group_i < n_groups; group_i++) {
    a[group_i] = [];
    for(let i = 0; i < n_per_group; i++) {
      let positive;
      let row = Math.floor(i / n_cols);
      let col = i % n_cols;
      a[group_i].push({
        id: group_i * n_per_group + i,
        index: i,
        group_id: group_i,
        positive: false,
        label: false,
        show: false,
        timer: 0,
      })
    }
  }
  for(let i = 0; i < n_groups; i++) {
    a[i] = a[i].shuffle()
    a[i].forEach(function(person, index) {
      person.getGroupCoords = function() {
        return[
          index % n_cols,
          Math.floor(index / n_cols)
        ]
      }
    })
  }
  a = a.flat()
  a.shuffle()
  a.forEach(function(person, index) {
    person.getUnifiedCoords = function() {
      return [
        index % n_unified_cols,
        Math.floor(index / n_unified_cols),
      ]
    }
  });
  return a.sort((a,b) => a.id - b.id)
}

function getCoords(person, sp, sorted = 0) {
  let base_coords = person.getGroupCoords();
  let group_offset = person.group_id * sp.group_w + sp.offsetL;
  let group_coords =
    [
      base_coords[0] * sp.r_total + sp.r_total/2 + group_offset,
      base_coords[1] * sp.r_total + sp.r_total/2 + sp.offsetT,
    ];
  base_coords = person.getUnifiedCoords()
  group_offset = sp.offsetL_unified;
  let unified_coords = [
    base_coords[0] * sp.r_total + sp.r_total/2 + group_offset,
    base_coords[1] * sp.r_total + sp.r_total/2 + sp.offsetT,
  ]

  let sorted_coords = group_coords;

  // sorted coordinates (only works in group mode)
  let threshold = Math.floor(sp.sliders[person.group_id].value() * sp.n_per_group);
  let newidx = person.index;
  let offset = 0;
  if (person.index > threshold) {
    // they are in the negative group
    // basically recalculate the coords based on the idx
    newidx = person.index - threshold - 1
    offset = Math.floor(threshold / sp.n_cols) + 1
  }
  base_coords = [newidx % sp.n_cols, Math.floor(newidx / sp.n_cols)]
  group_offset = person.group_id * sp.group_w + sp.offsetL;
  sorted_coords = [
    base_coords[0] * sp.r_total + sp.r_total/2 + group_offset,
    (base_coords[1] + offset)* sp.r_total + sp.r_total/2 + sp.offsetT,
  ]
  // Now, interpolate unified 0-1 between the two coordinates
  let uniGroupCoords = [
    (unified_coords[0] * sp.unified + group_coords[0] * (1 - sp.unified)),
    (unified_coords[1] * sp.unified + group_coords[1] * (1 - sp.unified)),
  ];
  return [
    sorted_coords[0] * sp.sorted + uniGroupCoords[0] * (1 - sp.sorted),
    sorted_coords[1] * sp.sorted + uniGroupCoords[1] * (1 - sp.sorted),
  ];
}

function drawPeople(p5, sketch, table=[], highlightBox = null) {
    // for now separate by group
    let r = sketch.r
    for(let group_i = 0; group_i < sketch.sliders.length; group_i++) {
      let tp = fn = fp = tn = 0;
      for(let i = 0; i < sketch.n_per_group; i++) {
        let weight = 4
        p5.push();
        p5.noStroke()
        let person = sketch.people[group_i * sketch.n_per_group + i];
        if (person.label) {
          p5.fill(100, 100, 200);
        } else {
          p5.fill(250, 150, 150);
        }
        let row = Math.floor(i / sketch.n_cols);
        let col = i % sketch.n_cols;
        p5.translate(
          getCoords(person, sketch)[0],
          getCoords(person, sketch)[1],
        );
        if (person.show) {
          if (highlightBox != null) {
            if (person.group_id == highlightBox[0] || highlightBox[0] == -1) {
              let tableRow = table[highlightBox[1]]
              if (tableRow.mode == 'tp' && person.label && person.positive) {
                weight = 6
              }
              if (tableRow.mode == 'nLabeled' && person.label) {
                weight = 6
              }
              if (tableRow.mode == 'tn' && !person.label && !person.positive) {
                weight = 6
              }
              if (tableRow.mode == 'nUnlabeled' && !person.label) {
                weight = 6
              }
              if (tableRow.mode == 'fn' && !person.label && person.positive) {
                weight = 6
              }
              if (tableRow.mode == 'fp' && person.label && !person.positive) {
                weight = 6
              }
              if (tableRow.mode == 'nNegative' && !person.positive) {
                weight = 6
              }
              if (tableRow.mode == 'nPositive' && person.positive) {
                weight = 6
              }
            }
          }
          if (person.positive) {
            p5.rotate(Math.PI/4);
            p5.rect(-r/2, -weight/2, r, weight);
            p5.rect(-weight/2, -r/2, weight, r);
          } else {
            p5.circle(0, 0, r-2);
            p5.push();
            p5.fill(250);
            p5.circle(0, 0, r-2-weight*2);
            p5.pop();
          }
        } else {
          p5.rect(-r/2, -r/2, r, r);
        }
        p5.pop();
      }
      p5.stroke(10);
    }
  }

function getStats(people) {
  let tp = fn = fp = tn = 0;
  let groupStats = [];
  people.forEach(function(person) {
    if (groupStats[person.group_id] == undefined) {
      groupStats[person.group_id] = {
        tp: 0,
        fn: 0,
        fp: 0,
        tn: 0,
      }
    }
    if (person.positive && person.label) {
      tp++;
      groupStats[person.group_id].tp++;
    } else if (person.positive && !person.label) {
      fn++;
      groupStats[person.group_id].fn++;
    } else if (!person.positive && person.label) {
      fp++;
      groupStats[person.group_id].fp++;
    } else if (!person.positive && !person.label) {
      tn++;
      groupStats[person.group_id].tn++;
    }
    groupStats[person.group_id].nLabeled = groupStats[person.group_id].tp + groupStats[person.group_id].fp;
    groupStats[person.group_id].nUnlabeled = groupStats[person.group_id].tn + groupStats[person.group_id].fn;
    groupStats[person.group_id].nPositive = groupStats[person.group_id].fn + groupStats[person.group_id].tp;
    groupStats[person.group_id].nNegative = groupStats[person.group_id].tn + groupStats[person.group_id].fp;
    groupStats[person.group_id].accuracy = groupStats[person.group_id].tp / (groupStats[person.group_id].tp + groupStats[person.group_id].fp);
    groupStats[person.group_id].negAccuracy = groupStats[person.group_id].tn / (groupStats[person.group_id].fn + groupStats[person.group_id].tn);
    groupStats[person.group_id].fpRate = groupStats[person.group_id].fp /  groupStats[person.group_id].nNegative;
    groupStats[person.group_id].fnRate = groupStats[person.group_id].fn / groupStats[person.group_id].nPositive;
  })
  return {
    tp: tp,
    fn: fn,
    fp: fp,
    tn: tn,
    fpRate: fp / (fp + tn),
    fnRate: fn / (tp + fn),
    nLabeled: tp + fp,
    nUnlabeled: tn + fn,
    nPositive: fn + tp,
    accuracy: tp / (tp + fp),
    negAccuracy: tn / (fn + tn),
    groupStats: groupStats
  }
}

function getSketchParams(people, sliders, n_groups, n_per_group, offsetT, p5) {
  let n_cols = getDimensions(n_per_group);
  let r = TEXTSIZE * 1.5;
  let p = 1;
  let group_padding = 20
  let group_w = n_cols * (r + p) + group_padding;
  let unified_w = getDimensions(n_per_group * n_groups) * r;
  let offsetL = (p5.width - group_w * n_groups + group_padding) / 2;
  let offsetL_unified = (p5.width - unified_w) / 2;
  return {
    people: people,
    sliders: sliders,
    n_groups: n_groups,
    n_per_group: n_per_group,
    n_cols: n_cols,
    r: r,
    p: p,
    r_total: r + p,
    group_w: group_w,
    group_w_no_pad: n_cols * (r + p),
    offsetL: offsetL,
    offsetT: offsetT,
    offsetL_unified: offsetL_unified,
    unified: 0,
    sorted: 0,
    unifiedDir: false,
    sortedDir: false,
    highlightBox: null,
  };
}

let s0params = {
  width: 800,
  height: 360,
  offsetT: 100,
  base: 180,
  interval: 20,
  n_groups: 2,
  n_per_group: 9,
  actionText: "Reveal Accuracy",
  actionAltText: "Hide Accuracy",
  actionCb: function(sp) {
    return function() {
      sp.people.forEach(function(p) { p.show = !p.show })
    }
  },
  resetCb: function(sp) {
    sp.unified = 1;
    sp.unifiedDir = true;
    sp.actionButton.isClicked = false;
    sp.people.forEach(function(p) { p.label = Math.random() < 0.3 });
  },
  title: "A Medical Example",
  groupNames: ["Men", "Women"],
  table: [],
  drawCb: function(sp, p5) {
    p5.push();
    p5.textAlign(p5.CENTER)
    p5.noStroke()
    p5.fill(70)
    p5.text("Imagine each square represents a prognosis result for a cancer patient.", p5.width/2, 45);
    p5.text("Click to adjust the recommendation.", p5.width/2, 45 + LINESIZE)
    let stats = getStats(sp.people);
    let base = 220
    p5.text("" + stats.nLabeled + " of these patients have been labeled with a mild prognosis...", p5.width/2, base + LINESIZE)
    if (sp.actionButton.isClicked) {
      p5.text(stats.tp + " of those patients went on to beat cancer (" + (stats.accuracy * 100).toFixed(0) + "% accuracy)", p5.width/2, base + LINESIZE * 2)
    }
    p5.pop();
  }
}

let drawTable = function(p5, sp, p) {
  p5.noStroke()
  p5.fill(70);
  p5.push()
  p5.textAlign(p5.LEFT, p5.CENTER)
  p5.textStyle(p5.BOLD)
  p5.text(p.groupNames[0], sp.offsetL, sp.offsetT - 15)
  p5.text(p.groupNames[1], sp.offsetL + sp.group_w , sp.offsetT - 15)
  for(let i = 0; i < p.table.length; i++) {
    p5.textAlign(p5.RIGHT, p5.CENTER)
    p5.text(p.table[i].label, sp.offsetL - LINESIZE, p.base + p.interval * i + (Math.floor(i / 2) * p.interval * 0.5))
  }
  p5.pop()

  let stats = getStats(sp.people)

  p5.push()
  p5.textAlign(p5.LEFT, p5.CENTER)
  for(let i = 0; i < p.table.length; i++) {
    for(let j = 0; j < sp.n_groups; j++) {
      let xLeft = sp.offsetL + j * sp.group_w;
      let yCenter = p.base + p.interval * i + (Math.floor(i / 2) * p.interval * 0.5);
      p5.push();
      p5.fill(pSBC(0.5, p.table[i].fillColor));
      if (sp.highlightBox != null) {
        if (sp.highlightBox[0] == j && sp.highlightBox[1] == i) {
          p5.fill(pSBC(0.2, p.table[i].fillColor));
        }
      }
      p5.rectMode(p5.CORNER)
      p5.rect(
        xLeft,
        yCenter  - LINESIZE / 2,
        p.table[i].getValue(stats, j) / p.n_per_group * (sp.group_w_no_pad),
        LINESIZE,
      )
      p5.pop();
      p5.text(
        p.table[i].getValue(stats, j),
        xLeft,
        yCenter,
      )
    }
  }
  for(let i = 0; i < p.table.length; i+=2) {
    for(let j = 0; j < sp.n_groups; j++) {
      let xLeft = sp.offsetL + j * sp.group_w;
      let yCenter = p.base + p.interval * i + (Math.floor(i / 2) * p.interval * 0.5);
      p5.push()
      p5.textSize(25)
      p5.textAlign(p5.RIGHT, p5.CENTER)
      p5.text(
        (p.table[i].getValue(stats, j) / p.table[i + 1].getValue(stats,j) * 100).toFixed(0) + "%",
        xLeft + sp.group_w_no_pad,
        yCenter + 0.5 * p.interval,
      )
      p5.pop()
    }
  }
  p5.pop();

  // draw highlight boxes
  /*
  p5.push()
  if (sp.highlightBox !== null) {
    p5.rectMode(p5.CENTER)
    p5.fill(210)
    p5.rect(
      sp.highlightBox[0] * sp.group_w + sp.offsetL + sp.group_w_no_pad / 2 - 2,
      sp.highlightBox[1] * p.interval + p.base + Math.floor(sp.highlightBox[1]/2) * p.interval / 2,
      sp.group_w_no_pad,
      p.interval * 0.8,
    )
  }
  p5.pop()
  */
}

let template = function(p) {
  return function(p5) {
    let sp;
    let drag;

    let reset = function() {
      let init_group_rates = generateGroupRates(p.n_groups)
      let people = generatePeople(p.n_per_group, p.n_groups, true);
      let sliders = [];
      for(let i = 0; i < p.n_groups; i++) {
        sliders.push({
          value: function() {
            return init_group_rates[i]
          }
        });
      }
      sp = getSketchParams(people, sliders, p.n_groups, p.n_per_group, p.offsetT, p5);
      sp.actionButton = createButton(p5, p5.width/2, p.height - (TEXTSIZE * 2) * 2, 140, TEXTSIZE * 1.5, p.actionText, p.actionCb(sp), p.actionAltText)
      sp.resetButton = createButton(p5, p5.width/2, p.height - TEXTSIZE * 2, 140, TEXTSIZE * 1.5, "Reset", reset);
      p.resetCb(sp)
    }

    p5.setup = function() {
      p5.createCanvas(p.width,p.height)
      reset();
    }

    p5.draw = function() {
      p5.background(250);
      p5.textSize(TEXTSIZE)

      // drawTitle
      p5.push();
      p5.fill(10)
      p5.stroke(10)
      p5.textAlign(p5.CENTER)
      p5.text(p.title, p5.width/2, 25)
      p5.pop()


      drawPeople(p5, sp, p.table, sp.highlightBox);
      p.drawCb(sp, p5)
      sp.resetButton.draw();
      sp.actionButton.draw();

      if (sp.unifiedDir) {
        sp.unified += 0.03;
      } else {
        sp.unified -= 0.03;
      }
      if (sp.sortedDir) {
        sp.sorted += 0.03;
      } else {
        sp.sorted -= 0.03;
      }
      sp.unified = p5.constrain(sp.unified, 0, 1);
      sp.sorted = p5.constrain(sp.sorted, 0, 1);

      sp.sliders.forEach(function(s, i) {
        let counter = 0;
        for(let person_i = 0; person_i < sp.n_per_group; person_i++) {
          sp.people[i * sp.n_per_group + person_i].positive = counter < s.value()
          counter += 1.0 / sp.n_per_group;
        }
      })
      if (drag) {
        sp.people.forEach(function(person) {
          if (inBox(p5.mouseX, p5.mouseY, getCoords(person, sp), 10, 10)) {
            if (person.timer == 0) {
                person.label = !person.label;
              person.timer = 1
            }
          } else {
            person.timer = 0;
          }
        })
      }
    }

    p5.mousePressed = function() {
      drag = true;
    }

    p5.mouseReleased = function() {
      drag = false;
      sp.people.forEach(function(person) {
        person.timer = 0;
      })
      sp.actionButton.checkClicked();
      sp.resetButton.checkClicked();
      return false;
    }

    p5.mouseMoved = function() {
      if (!drag) {
        sp.actionButton.checkHover();
        sp.resetButton.checkHover();
        // check table cells for hover
        if (sp.unified == 0) {
          sp.highlightBox = null;
          for(let i = -1; i < sp.n_groups; i++) {
            for(let j = 0; j < p.table.length; j++) {
              if (!p.table[j].allowInteract) {
                continue;
              }
              if (inBox(p5.mouseX, p5.mouseY,
                [sp.offsetL + i * sp.group_w + sp.group_w_no_pad / 2,
                p.base + p.interval * j + (Math.floor(j / 2) * p.interval * 0.5)],
                sp.group_w_no_pad / 2,
                p.interval / 2)) {
                  sp.highlightBox = [i, j];
              }
            }
          }
        }
      }
    }
  }
}

new p5(template(s0params), 'sketch0') // load s0 into sketch1

let s1params = {
  width: 800,
  height: 320,
  base: 180,
  offsetT: 100,
  interval: 20,
  n_groups: 2,
  n_per_group: 10,
  actionText: "Show Genders",
  actionAltText: "Hide Genders",
  actionCb: function(sp) {
    return function() {
      sp.unifiedDir = !sp.unifiedDir
    }
  },
  resetCb: function(sp) {
    sp.unified = 1;
    sp.unifiedDir = true;
    sp.actionButton.isClicked = false;
    sp.people.forEach(function(p) { p.show = true });
    sp.people.forEach(function(p) { p.label = Math.random() < 0.3 });
  },
  title: "A Hiring Example",
  groupNames: ["Men", "Women"],
  table: [
    {
      label: "Passed Interview",
      allowInteract: true,
      mode: "tp",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].tp
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "All Interview",
      allowInteract: true,
      mode: "nLabeled",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].nLabeled
      },
      fillColor: SELECT_COLOR,
    },
  ],
  nTableInteractRows: 2,
  tableLeftOffset: 50,
  drawCb: function(sp, p5) {
    p5.push()
    p5.noStroke()
    p5.fill(70)
    let stats = getStats(sp.people)
    p5.text((stats.accuracy * 100).toFixed(0) + "% of the candidates called back for an interview are qualified", p5.width/2, 45)
    p5.pop()
    if (sp.actionButton.isClicked) {
      drawTable(p5, sp, this);
    }
  }
}

new p5(template(s1params), 'sketch1') // load s1 into sketch1

let s2params = {
  width: 800,
  height: 460,
  offsetT: 130,
  base: 270,
  interval: 20,
  n_groups: 2,
  n_per_group: 20,
  actionText: "Show Race",
  actionAltText: "Hide Race",
  actionCb: function(sp) {
    return function() {
      sp.unifiedDir = !sp.unifiedDir
    }
  },
  resetCb: function(sp) {
    sp.unified = 0;
    sp.unifiedDir = false;
    sp.actionButton.isClicked = true;
    sp.people.forEach(function(p) { p.show = true });
    sp.people.forEach(function(p) { p.label = Math.random() < 0.3 });
  },
  title: "A Financial Example",
  groupNames: ["White", "Black"],
  table: [
    {
      label: "Approved and Paid Back",
      allowInteract: true,
      mode: "tp",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].tp
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "All Approved",
      allowInteract: true,
      mode: "nLabeled",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].nLabeled
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "Rejected and Defaulted",
      allowInteract: true,
      mode: "tn",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].tn)
      },
      fillColor: UNSELECT_COLOR,
    },
    {
      label: "All Rejected",
      allowInteract: true,
      mode: "nUnlabeled",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].nUnlabeled)
      },
      fillColor: UNSELECT_COLOR,
    },
  ],
  tableLeftOffset: 50,
  drawCb: function(sp, p5) {
    p5.push()
    p5.noStroke()
    p5.fill(70)
    let stats = getStats(sp.people)
    p5.text((stats.accuracy * 100).toFixed(0) + "% of the approved loan applicants went on to pay back their loan", p5.width/2, 45)
    p5.text("and " + (stats.negAccuracy * 100).toFixed(0) + "% of the rejected applicants defaulted on a different loan within one year.", p5.width/2, 45 + LINESIZE)
    p5.pop()
    if (sp.actionButton.isClicked) {
      drawTable(p5, sp, this);
    }
  }
}

new p5(template(s2params), 'sketch2') // load s1 into sketch1

let s3params = {
  width: 800,
  height: 440,
  base: 250,
  offsetT: 120,
  interval: 20,
  n_groups: 2,
  n_per_group: 20,
  actionText: "Sort",
  actionAltText: "Unsort",
  actionCb: function(sp) {
    return function() {
      sp.sortedDir = !sp.sortedDir
    }
  },
  resetCb: function(sp) {
    sp.unified = 0;
    sp.unifiedDir = false;
    sp.sortedDir = false;
    sp.sorted = 0;
    sp.people.forEach(function(p) { p.show = true });
    randomSelectProportions(sp)
  },
  title: "A Criminal Recidivism Example",
  groupNames: ["Black", "White"],
  table: [
    {
      label: "High Risk and No Arrests",
      allowInteract: true,
      mode: "fp",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].fp
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "All No Arrests",
      allowInteract: true,
      mode: "nNegative",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].nNegative
      },
      fillColor: NEUTRAL_COLOR,
    },
    {
      label: "Low Risk and Arrested",
      allowInteract: true,
      mode: "fn",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].fn)
      },
      fillColor: UNSELECT_COLOR,
    },
    {
      label: "All Arrested",
      allowInteract: true,
      mode: "nPositive",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].nPositive)
      },
      fillColor: NEUTRAL_COLOR,
    },
  ],
  tableLeftOffset: 50,
  drawCb: function(sp, p5) {
    p5.push()
    p5.noStroke()
    p5.fill(70)
    let stats = getStats(sp.people)
    p5.text((stats.fpRate * 100).toFixed(0) + "% of the high-risk offenders had no arrests within 5 years after their judgement.", p5.width/2, 45)
    p5.text((stats.fnRate * 100).toFixed(0) + "% of the low-risk offenders were arrested within 5 years after their judgement.", p5.width/2, 45 + LINESIZE)
    p5.pop()

    drawTable(p5, sp, this);
  }
}

let randomSelectProportions = function(sp) {
  for(let i = 0; i < sp.n_groups; i++) {
    let selectedNeg = Math.random();
    let selectedPos = Math.random();
    let negCounter = 0;
    let posCounter = 0;
    let numNeg = sp.people.filter(f => f.group_id == i && !f.positive).length
    let numPos = sp.people.filter(f => f.group_id == i && f.positive).length
    let negInterval = 1 / numNeg;
    let posInterval = 1 / numPos;
    for(let j = 0; j < sp.n_per_group; j++) {
      let person = sp.people[i * sp.n_per_group + j]
      if (person.positive) {
        if (posCounter < selectedPos) {
          person.label = true;
        }
        posCounter += posInterval;
      } else {
        if (negCounter < selectedNeg) {
          person.label = true;
        }
        negCounter += negInterval;
      }
    }
  }
}

new p5(template(s3params), 'sketch3') // load s1 into sketch1

let s4params = {
  width: 800,
  height: 560,
  offsetT: 120,
  base: 270,
  interval: 20,
  n_groups: 2,
  n_per_group: 20,
  actionText: "Unsort",
  actionAltText: "Sort",
  actionCb: function(sp) {
    return function() {
      sp.sortedDir = !sp.sortedDir
    }
  },
  resetCb: function(sp) {
    sp.unified = 0;
    sp.unifiedDir = false;
    sp.sortedDir = true;
    sp.sorted = 1;
    sp.people.forEach(function(p) { p.show = true });
    randomSelectProportions(sp)
  },
  title: "A Hiring Example",
  groupNames: ["Men", "Women"],
  table: [
    {
      label: "Interviewed and Qualified",
      allowInteract: true,
      mode: "tp",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].tp
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "All Interviewed",
      allowInteract: true,
      mode: "nLabeled",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].nLabeled
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "Rejected and Unqualified",
      allowInteract: true,
      mode: "tn",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].tn)
      },
      fillColor: UNSELECT_COLOR,
    },
    {
      label: "All Rejected",
      allowInteract: true,
      mode: "nUnlabeled",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].nUnlabeled)
      },
      fillColor: UNSELECT_COLOR,
    },
    {
      label: "Interviewed and Unqualified",
      allowInteract: true,
      mode: "fp",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].fp
      },
      fillColor: SELECT_COLOR,
    },
    {
      label: "All Unqualified",
      allowInteract: true,
      mode: "nNegative",
      getValue: function(stats, group_i) {
        return stats.groupStats[group_i].nNegative
      },
      fillColor: NEUTRAL_COLOR,
    },
    {
      label: "Rejected and Qualified",
      allowInteract: true,
      mode: "fn",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].fn)
      },
      fillColor: UNSELECT_COLOR,
    },
    {
      label: "All Qualified",
      allowInteract: true,
      mode: "nPositive",
      getValue: function(stats, group_i) {
        return (stats.groupStats[group_i].nPositive)
      },
      fillColor: NEUTRAL_COLOR,
    },
  ],
  tableLeftOffset: 50,
  drawCb: function(sp, p5) {
    p5.push()
    p5.noStroke()
    p5.fill(70)
    p5.pop()

    drawTable(p5, sp, this);
  }
}

new p5(template(s4params), 'sketch4') // load s1 into sketch1

// Remove double click behavior, kinda hacky because p5 sucks
setTimeout(function() {
    let canvases = document.getElementsByTagName('canvas')
    for(const c of canvases) {
        c.onselectstart = function () { return false; }
    }
}, 1000)
