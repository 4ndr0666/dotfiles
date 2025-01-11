# FFMPEG Cheatsheet

## Installation

This will install the latest Ffmpeg static binaries to `opt` without libx265.

```bash
sudo mkdir -p /opt/ffmpeg_sources && \
sudo chown andro:andro ffmpeg_sources && \
cd /opt/ffmpeg_sources && \
        wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
        tar xjvf ffmpeg-snapshot.tar.bz2 && \
        cd ffmpeg && \
        PATH="$PWD/bin:$PATH" PKG_CONFIG_PATH="$PWD/ffmpeg_build/lib/pkgconfig" ./configure \
          --prefix="$PWD/ffmpeg_build" \
          --pkg-config-flags="--static" \
          --extra-cflags="-I$PWD/ffmpeg_build/include" \
          --extra-ldflags="-L$PWD/ffmpeg_build/lib" \
          --extra-libs="-lpthread -lm" \
          --ld="g++" \
          --bindir="$PWD/bin" \
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
          --enable-nvdec \
          --enable-vaapi \
          --enable-nonfree && \
        PATH="$PWD/bin:$PATH" make && \
        make install && \
        hash -r
```

- - -

## HQ Encoding

Use the `crf` (Constant Rate Factor) parameter to control the output quality. The lower crf, the higher the quality (range: 0-51). The default value is 23, and visually lossless compression corresponds to `-crf 18`. Use the `preset` parameter to control the speed of the compression process. Additional info: https://trac.ffmpeg.org/wiki/Encode/H.264

````
ffmpeg -i in.mp4 -preset slower -crf 18 out.mp4
````

### HQ Deinterlace

Deinterlacing using "yet another deinterlacing filter".

````
ffmpeg -i in.mp4 -vf yadif out.mp4
````

### Convert to WebM

#### VP8

`libvpx` is the VP8 video encoder for ​WebM. [FFmpeg and WebM Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/VP8) will walk you through webm specifics.

In this example, `input.mov` is converted to `output.webm` with a constant rate factor of `10` (lower is higher quality) at a bitrate of `1M`. Changing the bitrate to something lower (e.g. `700K`) will result in lower file sizes and lower quality. If your video does not have audio, you may leave off the `-acodec libvorbis` part.

```bash
ffmpeg -i input.mov -vcodec libvpx -qmin 0 -qmax 50 -crf 10 -b:v 1M -acodec libvorbis output.webm
```

#### VP9

VP9 can encode videos at half the file size :smile::clap: You can check out Google's [VP9 encoding guide](https://sites.google.com/a/webmproject.org/wiki/ffmpeg/vp9-encoding-guide) for their recommend settings or the [FFmpeg VP9 guide](https://trac.ffmpeg.org/wiki/Encode/VP9).

Here's an example from the FFmpeg guide:

```bash
ffmpeg -i input.mov -vcodec libvpx-vp9 -b:v 1M -acodec libvorbis output.webm
```

And here's Google's "Best Quality (Slowest) Recommended Settings". You need to run the first line(s). It will create a log file (and warn you the out.webm is empty). On the second pass, the video will be output.

```bash
ffmpeg -i <source> -c:v libvpx-vp9 -pass 1 -b:v 1000K -threads 1 -speed 4 \
  -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
  -g 9999 -aq-mode 0 -an -f webm /dev/null


ffmpeg -i <source> -c:v libvpx-vp9 -pass 2 -b:v 1000K -threads 1 -speed 0 \
  -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 \
  -g 9999 -aq-mode 0 -c:a libopus -b:a 64k -f webm out.webm
```
  
### HQ Deshake

```
ffmpeg -i input.mkv -vf 'select=not(mod(n\,20))',setpts=0.05*PTS,mestimate=hexbs,vidstabdetect=shakiness=10:result=transforms.trf
ffmpeg -i input.mkv -vf 'select=not(mod(n\,20))',setpts=0.05*PTS,mestimate=hexbs,vidstabtransform=crop=black:smoothing=0:optzoom=0
```

Or for pass 2

```bash
ffmpeg -i MOV_3147.mp4 -vf 'select=not(mod(n\,20))',setpts=0.05*PTS,vidstabtransform=crop=black:smoothing=180:optzoom=0:interpol=bicubic -an -vcodec libx265 -crf 16 -tune grain wolken-2-deshake.mkv
```

### Tonemap a ITU.2020 (HDR, high gamut, ususally 4K) video to ITU.709 (1080p)

```bash
ffmpeg -i file.mkv -vf zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable,zscale=t=bt709:m=bt709:r=tv,format=yuv420p -crf 20 -acodec copy output.mkv
```
Also see: https://stevens.li/guides/video/converting-hdr-to-sdr-with-ffmpeg/


### Optical Flow

```bash
ffmpeg -i input.mkv -filter:v "minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'" output.mkv
```

Experimental:

```bash
ffmpeg -loglevel info -i vid-speedup.mp4 -preset veryslow -crf 17 -subq 10 -me_range 64 \
-partitions p8x8,p4x4,b8x8,i8x8,i4x4 \
-vf "minterpolate=fps=90:mi_mode=mci,scale=h=1844:w=1036:flags=experimental,setpts=PTS*4" output.mp4
```

### Stabilize

Requires `libvidstab`.
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

Add `2> error.log` for error handling.

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

Variation 4.
```bash
ffmpeg -f image2 -framerate 12 -i foo-%03d.jpeg -s WxH foo.avi
```

Variation 5 (40x speed):
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
   
## Ripping Streaming Media

1. Acquire m3u8 url: `youtube-dl` used with the -g flag will print out the m3u8 url and exit. 

2. Download and concatenate the video fragments:

   ```bash
   ffmpeg -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

   If you get a "Protocol 'https not on whitelist 'file,crypto'!" error, add the `protocol_whitelist` option:

   ```bash
   ffmpeg -protocol_whitelist "file,http,https,tcp,tls" -i "path_to_playlist.m3u8" -c copy -bsf:a aac_adtstoasc vid.mp4
   ```

**Optionally**, create a small one-liner helper script:

```bash
echo "Enter m3u8 link:";read link;echo "Enter output filename:";read filename;ffmpeg -i "$link"  -c copy $filename.mp4
```

- - -

# Advanced

### Encoding multiple files

You can use a Bash "for loop" to encode all files in a directory:
```bash
for f in *.m4a; do ffmpeg -i "$f" -codec:v copy -codec:a libmp3lame -q:a 2 newfiles/"${f%.m4a}.mp3"; done
```

### Extract Single Image from a Video at Specified Frame
```bash
vf [ss][filename][outputFileName]
```

where `vf` is a custom bash script as follows:

```bash
ffmpeg -ss $1 -i $2 -qmin 1 -q:v 1 -qscale:v 2 -frames:v 1 -huffman optimal $3.jpg
```

ss offset = frame number divided by FPS of video = the decimal (in milliseconds) ffmpeg needs i.e. 130.5<br>

### Duplicate Video Multiple Times
```bash
ffmpeg -stream_loop 3 -i input.mp4 -c copy output.mp4
```

### Rotate Video by editing metadata (without re-encoding).
```bash
ffmpeg -i input.m4v -map_metadata 0 -metadata:s:v rotate="90" -codec copy output.m4v
```

### Reduce Filesize
```bash
ffmpeg -i input.mov -vcodec libx264 -crf 24 output.mp4
```

It reduced a 100mb video to 9mb.. Very little change in video quality.

```bash
ffmpeg -i video.mov -vf eq=saturation=0 -s 640x480 -c:v libx264 -crf 24 output.mp4
```
makes a grayscale version and scale to 640x480

### Convert MP4 to WEBM
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 31 -b:v 1M output.webm
```
[more info](http://trac.ffmpeg.org/wiki/Encode/VP9)

### Reverse a video
```bash
ffmpeg -i vid.mp4 -vf reverse reversed.mp4
```

### Looperang 
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]reverse,fifo[r];[0:v][r] concat=n=2:v=1 [v]" -map "[v]" output.mp4
```
Concat a video with a reversed copy of itself for ping-pong looping effect

### Create tiled mosaic from every n-th frame in a video file
```bash
ffmpeg -ss 13 -i test.mov -frames 1 -vf "select=not(mod(n\,400)),scale=854:480,tile=8x4" tile.png
```

### Created tiled mosaic by scene change in a video file
```bash
ffmpeg -i YosemiteHDII.webm -vf "select=gt(scene\,0.4),scale=854:480,tile" -frames:v 1 preview.png
```

do the same process but export the frames individually

```bash
ffmpeg -i YosemiteHDII.webm -vf "select=gt(scene\,0.4),scale=854:480" -vsync vfr frame_%04d.png
```

### Convert H.264 to H.265 to correct for iOS Airdrop error message
```bash
ffmpeg -i input.mp4 -c:v libx265 -vtag hvc1 -c:a copy output.mp4
```

- - -

# Basics

### Quick Convert

```bash
ffmpeg -i vid.mp4 vid.*(avi,mov,webm,mkv)
```

### Remux MKV to MP4

```bash
ffmpeg -i vid.mkv -c:v copy -c:a copy vid.mp4
```

### Kill Audio

```bash
ffmpeg -i vid.mp4 -an vid.mp4
```

### Trim Audio

```bash
ffmpeg -i audio_file.mp3 -ss [start_time] -to [end_time] -c copy trimmed_audio_file.mp3
```

### Deblock and Denoise

```bash
ffmpeg -i vid.mp4 -vf "hqdn3d,deblock" vid.mp4
```

### Metadata: Change the title

````
ffmpeg -i in.mp4 -map_metadata -1 -metadata title="My Title" -c:v copy -c:a copy out.mp4
````

### Tools

https://ffmpeg.lav.io/ is an interactive resource to compose FFmpeg actions.
