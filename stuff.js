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

