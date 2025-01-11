## One-liner FFMPEG Proper Install

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

## Optical Flow

```bash
ffmpeg -i input.mkv -filter:v "minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'" output.mkv
```

## Experimental Optical Flow

```bash
ffmpeg -loglevel info -i vid-speedup.mp4 -preset veryslow -crf 17 -subq 10 -me_range 64 \
-partitions p8x8,p4x4,b8x8,i8x8,i4x4 \
-vf "minterpolate=fps=90:mi_mode=mci,scale=h=1844:w=1036:flags=experimental,setpts=PTS*4" output.mp4
```

## Stabilize

* Requirements: `libvidstab` installed with `FFmpeg`.

1. Detect transforms to a file:

   ```bash
   ffmpeg -i vid.mp4 -vf vidstabdetect -f null -
   ```

2. Apply transforms file:

   ```bash
   ffmpeg -i vid.mp4 -vf vidstabtransform=smoothing=5:input="transforms.trf" vidstab.mp4
   ```

## Adjust Video Speed (PTS)

### Slow Down (lengthen timestamps)

- Multiplier must be greater than 1.

   ```bash
   ffmpeg -i vid.mp4 -filter:v "setpts=4.0*PTS" vid.mp4
   ```

### Speed Up (shorten timestamps)

1. Double the speed by shortening the presentation timestamps 
   in half (e.g., `0.5*PTS`). 
   Note: This method drops frames to achieve the desired speed.

   ```bash
   ffmpeg -i vid.mp4 -filter:v "setpts=0.5*PTS" vid.mp4
   ```
   
2. Quadruple the speed by increasing the framerate (e.g., 4fps to 16fps).

   ```bash
   ffmpeg -i vid.mkv -r 16 -filter:v "setpts=0.25*PTS" vid.mkv
   ```

## Cut

1. Without Re-encoding:

   ```bash
   ffmpeg -ss [start] -i vid.mp4 -t [duration] -c copy vid.mp4
   ```
   
2. With Re-encoding:

   ```bash
   ffmpeg -ss [start] -i vid.mp4 -t [duration] -c:v libx264 -c:a aac -strict experimental -b:a 128k vid.mp4
   ```

## Merge

1. Make a `.txt` file and append all video files:

   ```bash
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
ffmpeg -ss 00:08:20 -to 00:08:33 -i vid.mp4 -vf "fps=1" \
-qscale:v 2 -strftime 1 "thumb-%Y%m%d%H%M%S.png" -hide_banner
```

* Add `2> error.log` for error handling.

## Rotate a Video

Rotate 90 degrees clockwise:

```bash
ffmpeg -i vid.mov -vf "transpose=1" vid.mov
```

For the `transpose` parameter, you can pass:

- `0 = 90CounterClockwise and Vertical Flip (default)`
- `1 = 90Clockwise`
- `2 = 90CounterClockwise`
- `3 = 90Clockwise and Vertical Flip`

* Use `-vf "transpose=2,transpose=2"` for 180 degrees.

## Create a Video Slideshow from Images

- Parameters: `-r` marks the image framerate (inverse time of each image); `-vf fps=25` marks the true framerate of the output.
- Images names start at `frame_0.jpg` then ascend.
 
Variation 1:
```bash
ffmpeg -r 1/5 -i img%03d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p vid.mp4
```

Variation 2 (truncates images that wont work):
```bash
ffmpeg -framerate 1/3 -i frame_%d.jpg -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -r 30 -pix_fmt yuv420p slideshow.mp4
```

Variation 3 (Adds interpolation):
```bash
ffmpeg -framerate 1/3 -i frame_%d.jpg -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2, minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=60'" -c:v libx264 -r 60 -pix_fmt yuv420p slideshow.mp4
```

Variation 4 (40x speed):
```bash
ffmpeg -framerate 1/3 -i frame_%d.jpg -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p" -c:v libx264 -r 120 -pix_fmt yuv420p -s 1280x720 slideshow.mp4
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

1. Acquire the `m3u8` file.

2. Download and concatenate the video fragments:

   ```bash
   ffmpeg -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

   If you get a "Protocol 'https not on whitelist 'file,crypto'!" error, add the `protocol_whitelist` option:

   ```bash
   ffmpeg -protocol_whitelist "file,http,https,tcp,tls" -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

## Quick Convert

```bash
ffmpeg -i vid.mp4 vid.*(avi,mov,webm,mkv)
```

## Remux MKV to MP4

```bash
ffmpeg -i vid.mkv -c:v copy -c:a copy vid.mp4
```

## High-Quality Encoding

```bash
ffmpeg -i vid.mp4 -preset slower -crf 18 vid.mp4
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

## Change the Title

```bash
ffmpeg -i vid.mp4 -map_metadata -1 -metadata title="My Title" -c:v copy -c:a copy vid.mp4
```

## Deblock and Denoise

```bash
ffmpeg -i vid.mp4 -vf "hqdn3d,deblock" vid.mp4
```

## One-liner to Record Screencast

```bash
ffmpeg -f x11grab -r 25 -s 800x600 -i :0.0 /tmp/outputFile.mpg
```

## Lossless Streaming

```bash
ffmpeg -f alsa -ac 2 -i hw:0,0 -f x11grab -framerate 30 -video_size 1280x720 \
-i :0.0+0,0 -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
-vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
-f flv rtmp://live.twitch.tv/app/<stream key>
```
