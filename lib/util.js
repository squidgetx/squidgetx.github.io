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

//https://stackoverflow.com/questions/23575218/convert-decimal-number-to-fraction-in-javascript-or-closest-fraction

let gcd = (a, b) => {
  if (b < 0.0000001) {
    return a;                
    // Since there is a limited precision we need to limit the value.
  }

  return gcd(b, Math.floor(a % b));           
  // Discard any fractions due to limitations in precision.
}

let floatToFrac = function(fraction) {

  var len = fraction.toString().length - 2;

  var denominator = Math.pow(10, len);
  var numerator = fraction * denominator;

  var divisor = gcd(numerator, denominator);    

  numerator /= divisor;                       
  denominator /= divisor;                    
  return [numerator, denominator]
}


// Create a button in the given p5 instance.
// Returns an object with draw, checkClicked, and checkHover methods
// The button is an object
// x, y, w, h, text, cb(isClicked), altText, textColor, fillColor
let createButton = function(
p5, button 
) {
return {
  draw: function() {
    // TODO: color theme
    let textColor = button.textColor;
    let fillColor = button.fillColor;
    if (this.isHover) {
      textColor = button.fillColor;
      fillColor = button.textColor;
    }

    p5.push();
    p5.rectMode(p5.CENTER)
    p5.fill(fillColor);
    p5.noStroke();
    p5.rect(button.x, button.y, button.w, button.h)
    p5.pop();
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.noStroke();
    p5.fill(textColor);
    if (this.isClicked && button.altText != null) {
      p5.text(button.altText, button.x, button.y)
    } else {
      p5.text(button.text, button.x, button.y)
    }
  },
  handleReleased: function() {
    if (inBox(p5.mouseX, p5.mouseY, button.x - button.w/2, button.y - button.h/2, button.w, button.h)) {
      button.cb(this.isClicked);
      this.isClicked = !this.isClicked
    }
  },
  handleMoved: function() {
    this.isHover = inBox(p5.mouseX, p5.mouseY, button.x - button.w/2, button.y - button.h/2, button.w, button.h)
  },
  handlePressed: function() {},
  getCursor: function() {
    if (p5.mouseY > 0 && p5.mouseY < p5.height) {
      if (this.isHover) {
        return 'pointer'
      } 
    }
    return null
  },
  isClicked: false,
}
}

// x, y, slider_w, slider_h, slider_color, ctl_w, ctl_h, ctl_color, init, min, max, onChange(val)
let createSlider = function(
p5, slider 
) {
return {
  name: 'slider',
  draw: function() {
    p5.push();
    p5.noStroke();
    p5.fill(slider.slider_color);
    p5.rect(slider.x, slider.y, slider.slider_w, slider.slider_h)
    p5.stroke(slider.slider_color)
    p5.fill(slider.ctl_color)
    p5.rect(this.xPos + slider.x, slider.y - slider.ctl_h/2, slider.ctl_w, slider.ctl_h)
    p5.pop();
    if (this.isGrabbed) {
      this.xPos = p5.constrain(p5.mouseX - slider.x, 0, slider.slider_w)
      this.value = p5.map(this.xPos, 0, slider.slider_w, Math.sqrt(slider.min), Math.sqrt(slider.max)) ** 2
      //this.value = p5.map(this.xPos, 0, slider.slider_w, slider.min, slider.max)
      slider.onChange(this.value)
    }

  },
  handlePressed: function() {
    this.isGrabbed = this.isHover;
  },
  handleReleased: function() {
    this.isGrabbed = false
  },
  handleMoved: function() {
    if (!this.isGrabbed) {
      this.isHover = inBox(p5.mouseX, p5.mouseY, this.xPos + slider.x, slider.y - slider.ctl_h / 2, slider.ctl_w, slider.ctl_h)
    }
  },
  getCursor: function() {
    if (p5.mouseY > 0 && p5.mouseY < p5.height) {
      if (this.isGrabbed) {
        return 'grabbing'
      } else if (this.isHover) {
        return 'grab'
      } 
    }
    return null
  },
  xPos: p5.map(Math.sqrt(slider.init), Math.sqrt(slider.min), Math.sqrt(slider.max), 0, slider.slider_w) + slider.x,
  isHover: false,
  isGrabbed: false,
  value: slider.init,
}
}

let setCursor = function(p5, ui) {
  // given an array of objects with a getCursor method, return the first non-null 
  // value
  if (p5.mouseY > 0 && p5.mouseY < p5.height) {
    let cursor = ui.map(e => e.getCursor()).find(e => e != null)
    if (cursor != undefined) {
      p5.cursor(cursor)
    } else {
      p5.cursor('auto')
    }
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

function inBox(x, y, boxX, boxY, boxW, boxH) {
return (x > boxX && x < boxX + boxW && y > boxY && y < boxY + boxH)
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
