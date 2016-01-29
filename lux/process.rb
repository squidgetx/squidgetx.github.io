fn = 76
while true
  break unless system("convert ~/code/blog/lux/img/#{fn}.png -crop 2560x1006+0+155 ~/code/blog/lux/img2/#{fn - 75}.png");
  break unless system("convert ~/code/blog/lux/img2/#{fn - 75}.png -resize 2632x1035\! ~/code/blog/lux/img3/#{fn - 75}.png")
  fn += 1;
  puts fn - 75;
end
