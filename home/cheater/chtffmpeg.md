
# FFmpeg Cheat Sheet

## Install
```bash
cd ~/ffmpeg_sources && \
wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
tar xjvf ffmpeg-snapshot.tar.bz2 && \
cd ffmpeg && \
PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
  --prefix="$HOME/ffmpeg_build" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$HOME/ffmpeg_build/include" \
  --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
  --extra-libs="-lpthread -lm" \
  --ld="g++" \
  --bindir="$HOME/bin" \
  --enable-gpl \
  --enable-gnutls \
  --enable-libaom \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-libfreetype \
  --enable-libmp3lame \
  --enable-libopus \
  --enable-libsvtav1 \
  --enable-libdav1d \
  --enable-libvorbis \
  --enable-libvpx \
  --enable-libx264 \
  --enable-libx265 \
  --enable-nvdec \
  --enable-vaapi \
  --enable-nonfree && \
PATH="$HOME/bin:$PATH" make && \
make install && \
hash -r
```

## Jiggle Mode
```bash
ffmpeg -loglevel info -i vid-speedup.mp4 -preset veryslow -crf 17 -subq 10 -me_range 64 -partitions p8x8,p4x4,b8x8,i8x8,i4x4 -vf "minterpolate=fps=90:mi_mode=mci,scale=h=1844:w=1036:flags=experimental,setpts=PTS*4" output.mp4
```

## Quick Convert
```bash
ffmpeg -i vid.mp4 vid.*(avi,mov,webm,mkv)
```

## Remux an MKV File into MP4
```bash
ffmpeg -i vid.mkv -c:v copy -c:a copy vid.mp4
```

## High-Quality Encoding
```bash
ffmpeg -i vid.mp4 -preset slower -crf 18 vid.mp4
```

## Cutting

1. Without Re-encoding:
   ```bash
   ffmpeg -ss [start] -i vid.mp4 -t [duration] -c copy vid.mp4
   ```

2. With Re-encoding:
   ```bash
   ffmpeg -ss [start] -i vid.mp4 -t [duration] -c:v libx264 -c:a aac -strict experimental -b:a 128k vid.mp4
   ```

## Merging

1. Make a `.txt` file with all of the video files in order like this:

   ```
   file 'vid.mp4'
   file 'vid2.mp4'
   file 'vid3.mp4'
   file 'vid4.mp4'
   ```

2. Concatenate the files:
   ```bash
   ffmpeg -f concat -i list.txt -c copy vid.mp4
   ```

## Create Thumbnails
```bash
ffmpeg -ss 00:08:20 -to 00:08:33 -i vid.mp4 -vf "fps=1" -qscale:v 2 -strftime 1 "thumb-%Y%m%d%H%M%S.png" -hide_banner
```

* Add `2> error.log` for error handling

## Rotate a Video

Rotate 90 degrees clockwise:
```bash
ffmpeg -i vid.mov -vf "transpose=1" vid.mov
```

For the transpose parameter you can pass:
- `0 = 90CounterClockwise and Vertical Flip (default)`
- `1 = 90Clockwise`
- `2 = 90CounterClockwise`
- `3 = 90Clockwise and Vertical Flip`

* Use `-vf "transpose=2,transpose=2"` for 180 degrees.

## Create a Video Slideshow from Images

Parameters: `-r` marks the image framerate (inverse time of each image); `-vf fps=25` marks the true framerate of the output.

```bash
ffmpeg -r 1/5 -i img%03d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p vid.mp4
```

## Extract Images from a Video

1. Extract all frames:
   ```bash
   ffmpeg -i vid.mp4 thumb%04d.jpg -hide_banner
   ```

2. Extract a frame each second:
   ```bash
   ffmpeg -i vid.mp4 -vf fps=1 thumb%04d.jpg -hide_banner
   ```

3. Extract only one frame:
   ```bash
   ffmpeg -i vid.mp4 -ss 00:00:10.000 -vframes 1 thumb.jpg
   ```

## Rip Streaming Media

1. Locate the playlist file, e.g., using Chrome > F12 > Network > Filter: m3u8
2. Download and concatenate the video fragments:
   ```bash
   ffmpeg -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

   If you get a "Protocol 'https not on whitelist 'file,crypto'!" error, add the `protocol_whitelist` option:
   ```bash
   ffmpeg -protocol_whitelist "file,http,https,tcp,tls" -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

## Kill Audio
```bash
ffmpeg -i vid.mp4 -an vid.mp4
```

## Trim Audio
```bash
ffmpeg -i audio_file.mp3 -ss [start_time] -to [end_time] -c copy trimmed_audio_file.mp3
```

## Deinterlace
```bash
ffmpeg -i vid.mp4 -vf yadif vid.mp4
```

## Metadata: Change the Title
```bash
ffmpeg -i vid.mp4 -map_metadata -1 -metadata title="My Title" -c:v copy -c:a copy vid.mp4
```

## Deblock and Denoise
```bash
ffmpeg -i vid.mp4 -vf "hqdn3d,deblock" vid.mp4
```

## Adjust Speed

Slow Motion:
```bash
ffmpeg -i vid.mp4 -filter:v "setpts=4.0*PTS" vid.mp4
```

Speed-Up:
```bash
ffmpeg -i vid.mp4 -filter:v "setpts=0.5*PTS" vid.mp4
```

## Stabilize

* Requirements: `libvidstab` installed with FFmpeg.

1. Detect transforms:
   ```bash
   ffmpeg -i vid.mp4 -vf vidstabdetect -f null -
   ```

2. Apply transforms:
   ```bash
   ffmpeg -i vid.mp4 -vf vidstabtransform=smoothing=5:input="transforms.trf" vidstab.mp4
   ```
