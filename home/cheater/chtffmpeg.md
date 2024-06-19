# FFmpeg cheat sheet

## Quick convert:
ffmpeg -i vid.mp4 vid.*(avi,mov,webm,mkv)
``

### Remux an MKV file into MP4:
ffmpeg -i vid.mkv -c:v copy -c:a copy vid.mp4
```

### High-quality encoding:
ffmpeg -i vid.mp4 -preset slower -crf 18 vid.mp4
```

### Cutting:
1. Without re-encoding:
ffmpeg -ss [start] -i vid.mp4 -t [duration] -c copy vid.mp4

2. With re-encoding:
ffmpeg -ss [start] -i vid.mp4 -t [duration] -c:v libx264 -c:a aac -strict experimental -b:a 128k vid.mp4
```

### Merging:
1. Make a .txt file with all of the video files in order like this:

---

file 'vid.mp4'
file 'vid2.mp4'
file 'vid3.mp4'
file 'vid4.mp4'

---

2. ffmpeg -f concat -i list.txt -c copy vid.mp4
```

### Create thumbs
ffmpeg -ss 00:08:20 -to 00:08:33 -i vid.mp4 -vf "fps=1" -qscale:v 2 -strftime 1 "thumb-%Y%m%d%H%M%S.png" -hide_banner

* add '2> error.log' for error handling
```

### Rotate a video
Rotate 90 clockwise:
ffmpeg -i vid.mov -vf "transpose=1" vid.mov

For the transpose parameter you can pass:

---

0 = 90CounterCLockwise and Vertical Flip (default)
1 = 90Clockwise
2 = 90CounterClockwise
3 = 90Clockwise and Vertical Flip

---

* Use `-vf "transpose=2,transpose=2"` for 180 degrees.
```

### Create a video slideshow from images
Parameters: `-r` marks the image framerate (inverse time of each image); `-vf fps=25` marks the true framerate of the output.

ffmpeg -r 1/5 -i img%03d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p vid.mp4
```

### Extract images from a video
1. Extract all frames:
ffmpeg -i vid.mp4 thumb%04d.jpg -hide_banner

2. Extract a frame each second:
ffmpeg -i vid.mp4 -vf fps=1 thumb%04d.jpg -hide_banner

3. Extract only one frame:
ffmpeg -i vid.mp4 -ss 00:00:10.000 -vframes 1 thumb.jpg
```

### Rip streaming media
1. Locate the playlist file, e.g. using Chrome > F12 > Network > Filter: m3u8
2. Download and concatenate the video fragments:

---

ffmpeg -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4

---

If you get a "Protocol 'https not on whitelist 'file,crypto'!" error, add the `protocol_whitelist` option:

---

ffmpeg -protocol_whitelist "file,http,https,tcp,tls" -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4

```

### Kill audio:
ffmpeg -i vid.mp4 -an vid.mp4
```

### Trim audio:
ffmpeg -i audio_file.mp3 -ss [start_time] -to [end_time] -c copy trimmed_audio_file.mp3
```

### Deinterlace:
ffmpeg -i vid.mp4 -vf yadif vid.mp4
```

### Metadata: Change the title
ffmpeg -i vid.mp4 -map_metadata -1 -metadata title="My Title" -c:v copy -c:a copy vid.mp4
```

### Deblock and denoise:
ffmpeg -i vid.mp4 -vf "hqdn3d,deblock" vid.mp4
```

### Adjust speed:
Slow-mo:
ffmpeg -i vid.mp4 -filter:v "setpts=4.0*PTS" vid.mp4

Speed-up:
ffmpeg -i vid.mp4 -filter:v "setpts=0.5*PTS" vid.mp4
```

### Stabilize:
* Requirements==libvidstab installed with ffmpeg.

1. ffmpeg -i vid.mp4 -vf vidstabdetect -f null -

2. ffmpeg -i vid.mp4 -vf vidstabtransform=smoothing=5:input="transforms.trf" vidstab.mp4
```
