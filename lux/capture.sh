ffmpeg -f x11grab -s 1366:768 -r 30 -i :0.0 -vcodec libx264 -preset ultrafast -crf 0 ~/out.mkv
