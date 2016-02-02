
var randomColor = function() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}


window.onload = function() {
  $('.nav').each(function(index, n) {
    $(this).css("background-color", randomColor());
  });
}

