last = 0
first = true
printf("[")
while true
  line = gets
  break if line.nil?
  printf(", ") unless first
  first = false
  line = Integer(line.strip)
  printf("#{line - last}")
  last = line
end

printf("]")

