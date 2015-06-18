var highlightEmail = function() {
  var email = document.getElementById("email");
 // email.style.fontSize =
  var font = email.style.fontSize.replace("px","");
  if (font) {
    email.style.fontSize = parseInt(font) + 2 + "px";
  } else {
    email.style.fontSize = "14px";
  }
  email.style.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}


window.onload = function() {
  var c = document.getElementById("compliment");
  var compliments = [
    "Did you know you have enchanting eyes?",
    "Did you know your hair looks awesome today?",
    "The outfit you picked today looks great on you.",
    "You have a very professional attitude.",
    "The color of your eyes is really striking.",
    "Did you know you give off a real aura of confidence?"
      ];
  var index = Math.floor(Math.random() * compliments.length);
  var string = compliments[index];
  c.innerHTML = string;
  console.log(index);
}

