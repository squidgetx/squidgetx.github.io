require 'pry'

fn = 1
colors = []
while fn < 6251
  output = `convert frames/#{fn.to_s.rjust(5,'0')}.png -colorspace rgb -scale 1x1 -format "%[pixel: p{0,0}]" info:`
  colors << output
  fn += 1
  printf("#{fn}/6251\r")
end

f = File.open("colors.tx", "w+")
g = File.open("frames.tx", "w+")

co = colors[0]
colors.each_with_index do |c, index|
  f.puts c
  if co != c
    co = c
    g.puts index
  end
end



