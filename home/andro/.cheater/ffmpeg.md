# FFMPEG Cheater

## 1. Installation

This section provides a comprehensive guide for compiling FFmpeg with support for various modern codecs and hardware acceleration. For simpler installation, consider using your system's package manager (e.g., `sudo apt install ffmpeg` on Debian/Ubuntu, `brew install ffmpeg` on macOS), though a compiled version often includes more features.

### Compile FFmpeg with NVDEC, VAAPI, libx265, VP9, AV1 Support

This installation follows the [official FFmpeg Compilation Guide for Ubuntu](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu).

```bash
sudo mkdir -p /opt/ffmpeg_sources
sudo chown $USER:$USER /opt/ffmpeg_sources
cd /opt/ffmpeg_sources

# Install build dependencies
sudo apt update
sudo apt install -y autoconf automake build-essential cmake git libass-dev libfreetype6-dev \
  libsdl2-dev libtool libva-dev libvdpau-dev libvorbis-dev libxcb1-dev libxcb-shm0-dev \
  libxcb-xfixes0-dev pkg-config texinfo wget zlib1g-dev libx264-dev libx265-dev libnuma-dev \
  libvpx-dev libfdk-aac-dev libmp3lame-dev libopus-dev libsvtav1-dev libaom-dev libdav1d-dev \
  libgnutls28-dev

# Clone FFmpeg source
git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg
cd ffmpeg

# Configure FFmpeg with desired features
./configure \
  --prefix="$HOME/ffmpeg_build" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$HOME/ffmpeg_build/include" \
  --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
  --extra-libs="-lpthread -lm" \
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
  --enable-nonfree # For libfdk-aac

# Build and install FFmpeg
make -j$(nproc)
make install
hash -r # Refresh shell's command hash
```

---

## 2. Custom FFmpeg Snippets

### High Quality
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slower -crf 18 -c:a copy output.mp4
```
### Lossless
```bash
ffmpeg -i input.mov -c:v libx264 -crf 0 output.mp4
```
### Deinterlace
```bash
ffmpeg -i input.mp4 -vf yadif output.mp4
```
### Stabilize
```bash
ffmpeg -i input.mp4 -vf vidstabdetect=shakiness=10:accuracy=15:result=transforms.trf -f null -
ffmpeg -i input.mp4 -vf vidstabtransform=smoothing=30:input=transforms.trf -c:v libx264 -crf 18 -preset slow output.mp4
```
### Speedup / Slowdown
```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
```
### Output to 60fps
```bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -r 60 output.mp4
```
### High Frame Rate Slow Motion
```bash
ffmpeg -i input.mp4 -filter:v "minterpolate=fps=240:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1, setpts=4.0*PTS",scale=1920:1080:flags=lanczos -an -c:v libx264 -preset faster -crf 18 output_slowmotion.mp4
```
### Cut
```bash
ffmpeg -ss 00:00:30 -i input.mp4 -to 00:00:40 -c copy output.mp4
```
### Merge
```bash
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```
### Rotate
```bash
ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
```
### Reverse
```bash
ffmpeg -i input.mp4 -vf reverse reversed.mp4
```
### Loop
```bash
ffmpeg -stream_loop 3 -i input.mp4 -c copy output.mp4
```
### Looperang (Ping-Pong Video)
```bash
ffmpeg -i input.mov \
-filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]" \
-map "[v]" output_pingpong.mp4
```
### Thumbnails (Extract 1 per sec in 10-20s range)```bash
ffmpeg -ss 00:00:10 -to 00:00:20 -i input.mp4 -vf "fps=1" -qscale:v 2 "thumb%04d.jpg"
```
### Extract all frames
```bash
ffmpeg -i input.mp4 frame%04d.png
```
### Create Single Frame
```bash
ffmpeg -ss 00:00:10 -i input.mp4 -vframes 1 frame.png
```
### Create lossless PNG frame
```bash
ffmpeg -ss 00:00:10 -i input.mp4 -vframes 1 -f image2 -vcodec png frame_lossless.png
```
### Create Tiled Mosaic from Frames
```bash
ffmpeg -ss 13 -i test.mov -frames 1 -vf "select=not(mod(n\,400)),scale=854:480,tile=8x4" tile_every_400th.png
```
### Create Tiled Mosaic from Scene Changes
```bash
ffmpeg -i input.webm -vf "select=gt(scene\,0.4),scale=854:480,tile" -frames:v 1 preview_scene_change.png
```
### Remove Audio
```bash
ffmpeg -i input.mp4 -an output_no_audio.mp4
```
### Merge Audio
```bash
ffmpeg -i video.mp4 -i audio.opus -c:v copy -c:a aac -strict experimental output_with_audio.mp4
```
### Download M3U8 Stream
```bash
ffmpeg -i "http://example.com/stream.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```
### Record Screencast
```bash
ffmpeg -f x11grab -r 25 -s 1280x720 -i :0.0 output_screencast.mkv
```
### Live Stream
```bash
ffmpeg -f alsa -ac 2 -i hw:0,0 -f x11grab -framerate 30 -video_size 1280x720 \
-i :0.0+0,0 -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
-vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
-f flv rtmp://live.twitch.tv/app/<stream_key>
```
### Reduce Video Filesize
```bash
ffmpeg -i input.mov -c:v libx264 -crf 24 output_reduced.mp4
```
### Reduce Video Filesize (Grayscale, Resize, Compress)
```bash
ffmpeg -i video.mov -vf "eq=saturation=0,scale=640x480" -c:v libx264 -crf 24 output_grayscale_640x480.mp4
```
### Deblock and Denoise Video
```bash
ffmpeg -i input.mp4 -vf "hqdn3d,deblock" output_denoised.mp4
```
### Natural Color Correction
```bash
ffmpeg -i input.mp4 -vf "eq=brightness=0.15:contrast=1.3:saturation=0.9,colorbalance=rs=-0.1:gs=0.05:bs=0.05" -c:v libx264 -crf 18 -preset slow output_color_corrected.mp4
```
### Tonemap HDR (BT.2020) to SDR (BT.709)
```bash
ffmpeg -i file.mkv -vf "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable,zscale=t=bt709:m=bt709:r=tv,format=yuv420p" -crf 20 -acodec copy output_sdr.mkv
```
### Change Video Metadata Title
```bash
ffmpeg -i input.mp4 -metadata title="My New Video Title" -c copy output_with_title.mp4
```
### Batch Encode Multiple Files
```bash
for f in *.m4a; do ffmpeg -i "$f" -codec:v copy -codec:a libmp3lame -q:a 2 "newfiles/${f%.m4a}.mp3"; done```
*Note: `newfiles/` must exist.*
### Extract Single Image at Frame
```bash
# example usage: extract_frame 00:00:10 input.mp4 output_frame
extract_frame() {
    local timestamp="$1"
    local input_file="$2"
    local output_base="$3"
    ffmpeg -ss "$timestamp" -i "$input_file" -qmin 1 -q:v 1 -qscale:v 2 -frames:v 1 -huffman optimal "$output_base.jpg"
}
```
Where `ss` offset = frame_number / FPS.

---

## 3. Expanded FFmpeg Usage & Advanced Examples

This section provides more detailed explanations and additional advanced commands, building upon the basic functionalities shown above.

### 3.1 Basic Conversions and Information

#### Quick Format Conversion

Convert a file to any other format by simply changing the output extension. FFmpeg will try to use suitable default codecs.

```bash
ffmpeg -i input.mp4 output.avi
ffmpeg -i input.mov output.mp4
```

#### Remux (Change Container Without Re-encoding)

Change the container format (e.g., MKV to MP4) without re-encoding the video and audio streams, preserving quality and speeding up the process.

```bash
ffmpeg -i input.mkv -c copy output.mp4
ffmpeg -i input.mkv -c:v copy -c:a copy output.mp4 # Explicitly copy video and audio
```

### 3.2 Video Encoding & Manipulation

#### High-Quality Encoding (H.264 / H.265)

Utilize the Constant Rate Factor (CRF) for H.264/H.265 encoding, balancing quality and file size. Lower CRF values mean higher quality (0 is lossless, 23 is default, 18-20 is visually lossless). `preset` controls encoding speed vs. compression efficiency.

```bash
# H.264 (libx264) with CRF 18 (visually lossless) and slower preset
ffmpeg -i input.mp4 -c:v libx264 -preset slower -crf 18 -c:a copy output.mp4

# H.265 (libx265) for better compression (iOS Airdrop compatible tag `hvc1`)
ffmpeg -i input.mp4 -c:v libx265 -vtag hvc1 -preset medium -crf 24 -c:a copy output.mp4

# Lossless H.264 encoding (very large files)
ffmpeg -i input.mov -c:v libx264 -crf 0 output.mp4
```
More: [FFmpeg H.264 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)

#### Convert to WebM (VP8/VP9)

Convert videos to the WebM format, often used for web video. VP9 offers better compression than VP8.

**VP8 Encoding:**
```bash
ffmpeg -i input.mov -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis output.webm
```

**VP9 Encoding (Single Pass):**
```bash
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 1M -c:a libvorbis output.webm
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 31 -b:v 1M output.webm
```

**VP9 Encoding (Two-Pass for Best Quality):**
```bash
# Pass 1: Analyze video (no output file)
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 1M -pass 1 -an -f null /dev/null
# Pass 2: Encode with analyzed data
ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 1M -pass 2 -c:a libopus output.webm
```
More: [FFmpeg VP9 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)

#### Deinterlace Video

Apply the YADIF filter to deinterlace interlaced video content (e.g., old TV recordings).

```bash
ffmpeg -i input.mp4 -vf yadif output.mp4
```

#### Stabilize Shaky Video (Requires `libvidstab`)

Use the `vidstab` filter for video stabilization. This is a two-pass process.

1.  **Detect Transforms**: Analyze the video for shakiness and save transformation data.
    ```bash
    ffmpeg -i input.mp4 -vf vidstabdetect=shakiness=10:accuracy=15:result=transforms.trf -f null -
    ```
2.  **Apply Transforms**: Apply the detected transformations to stabilize the video.
    ```bash
    ffmpeg -i input.mp4 -vf vidstabtransform=smoothing=30:input=transforms.trf -c:v libx264 -crf 18 -preset slow output.mp4
    ```

#### Adjust Video Speed (PTS Filter)

Modify video playback speed by manipulating Presentation Timestamps (PTS). Audio will likely need to be re-encoded or processed separately.

*   **Slow Down (e.g., 2x slower)**:
    ```bash
    ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" output.mp4
    ```
*   **Speed Up (e.g., 2x faster)**:
    ```bash
    ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
    ```
*   **Speed Up and Adjust Frame Rate**:
    ```bash
    ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -r 60 output.mp4
    ```

#### High Frame Rate Slow-Motion (Minterpolate Filter)

Generate slow-motion video by interpolating frames, creating a smoother effect for high frame rates. This is computationally intensive.

```bash
ffmpeg -i input.mp4 -filter:v "minterpolate=fps=240:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1, setpts=4.0*PTS",scale=1920:1080:flags=lanczos -an -c:v libx264 -preset faster -crf 18 output_slowmotion.mp4
```

#### Cut Video (Trim)

Cut a segment from a video file.

*   **Without Re-encoding (fastest, preserves quality, but cut points may be imprecise to keyframes)**:
    ```bash
    ffmpeg -ss 00:00:30 -i input.mp4 -to 00:00:40 -c copy output.mp4
    # -ss [start_time] -i input.mp4 -t [duration] -c copy output.mp4 (original note, kept for context)
    ```
*   **With Re-encoding (precise cut points, allows codec changes)**:
    ```bash
    ffmpeg -ss 00:00:30 -i input.mp4 -to 00:00:40 -c:v libx264 -c:a aac -b:a 128k output.mp4
    # -ss [start_time] -i input.mp4 -t [duration] -c:v libx264 -c:a aac -b:a 128k output.mp4 (original note, kept for context)
    ```

#### Merge Videos (Concatenate)

Combine multiple video files into one. Ensure all input videos have the same codecs and resolutions for best results with `concat`.

1.  **Create a text file (e.g., `list.txt`)** with paths to your video files:
    ```
    file 'video1.mp4'
    file 'video2.mp4'
    file 'video3.mp4'
    ```
2.  **Concatenate the videos**:
    ```bash
    ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
    ```

#### Rotate Video

Rotate a video using the `transpose` filter. Metadata-only rotation is faster if supported by the player.

*   **Rotate 90 degrees clockwise (re-encodes)**:
    ```bash
    ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
    # transpose values: 0=90° CCW+vertical flip, 1=90° CW, 2=90° CCW, 3=90° CW+vertical flip (original note, kept for context)
    ```
*   **Rotate 180 degrees (re-encodes)**:
    ```bash
    ffmpeg -i input.mp4 -vf "transpose=2,transpose=2" output.mp4
    ```
*   **Rotate by editing metadata only (no re-encoding, e.g., for iOS AirDrop issues)**:
    ```bash
    ffmpeg -i input.m4v -map_metadata 0 -metadata:s:v rotate="90" -codec copy output.m4v
    ```

#### Reverse a Video

Play a video backward.

```bash
ffmpeg -i input.mp4 -vf reverse reversed.mp4
```

#### Loop a Video Multiple Times

Loop a video a specified number of times. Use `-1` for infinite loop.

```bash
# Loop 3 times
ffmpeg -stream_loop 3 -i input.mp4 -c copy output.mp4

# Loop indefinitely
ffmpeg -stream_loop -1 -i input.mp4 -c copy looped_infinite.mp4
```

#### Looperang (Ping-Pong Video)

Create a video that plays forward then immediately reverses and plays backward.

```bash
ffmpeg -i input.mov \
-filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[v]" \
-map "[v]" output_pingpong.mp4
```

### 3.3 Image and Frame Manipulation

#### Create Thumbnails

Extract images from a video at specific intervals or times.

*   **Extract one frame per second between 00:00:10 and 00:00:20**:
    ```bash
    ffmpeg -ss 00:00:10 -to 00:00:20 -i input.mp4 -vf "fps=1" -qscale:v 2 "thumb%04d.jpg"
    ```
*   **Extract all frames**:
    ```bash
    ffmpeg -i input.mp4 frame%04d.png
    ```
*   **Extract a single frame at 10 seconds**:
    ```bash
    ffmpeg -ss 00:00:10 -i input.mp4 -vframes 1 frame.png
    ```
*   **Extract a single lossless PNG frame at 10 seconds**:
    ```bash
    ffmpeg -ss 00:00:10 -i input.mp4 -vframes 1 -f image2 -vcodec png frame_lossless.png
    ```

#### Create Video Slideshow from Images

Combine a series of images into a video slideshow. Images should be sequentially named (e.g., `img001.png`, `img002.png`).

```bash
# Basic slideshow (5 seconds per image)
ffmpeg -framerate 1/5 -i img%03d.png -c:v libx264 -r 30 -pix_fmt yuv420p slideshow.mp4

# Slideshow with interpolation for smoother transitions (experimental for high frame rate)
ffmpeg -framerate 1/3 -i frame_%d.jpg -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=60'" -c:v libx264 -r 60 -pix_fmt yuv420p slideshow_interpolated.mp4
```

#### Create Tiled Mosaic from Frames

Generate a single image mosaic from video frames (e.g., every Nth frame or based on scene changes).

*   **Mosaic from every 400th frame (from 13 seconds in)**:
    ```bash
    ffmpeg -ss 13 -i test.mov -frames 1 -vf "select=not(mod(n\,400)),scale=854:480,tile=8x4" tile_every_400th.png
    ```
*   **Mosaic based on scene changes (scene change threshold > 0.4)**:
    ```bash
    ffmpeg -i input.webm -vf "select=gt(scene\,0.4),scale=854:480,tile" -frames:v 1 preview_scene_change.png
    ```

### 3.4 Audio Manipulation

#### Remove Audio from Video (Mute)

Strip the audio track from a video file.

```bash
ffmpeg -i input.mp4 -an output_no_audio.mp4
```

#### Trim Audio

Cut a segment from an audio file.

```bash
ffmpeg -i input.mp3 -ss 00:00:30 -to 00:01:00 -c copy output_trimmed.mp3
```

#### Merge Audio with Video

Combine a separate audio file with a video file.

```bash
ffmpeg -i video.mp4 -i audio.opus -c:v copy -c:a aac -strict experimental output_with_audio.mp4
```

### 3.5 Streaming and Capture

#### Download M3U8 Stream

Download and convert an M3U8 adaptive bitrate stream to MP4.

```bash
ffmpeg -i "http://example.com/stream.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```
If you encounter protocol whitelist errors:
```bash
ffmpeg -protocol_whitelist "file,http,https,tcp,tls" -i "http://example.com/stream.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
```
**Quick helper script for M3U8:**
```bash
echo "Enter m3u8 link:"; read link; echo "Enter output filename:"; read filename; ffmpeg -i "$link" -c copy "$filename.mp4"
```

#### Record Screencast (Linux X11)

Record your desktop screen using the X11 grabber. Adjust `-s` for resolution and `-r` for frame rate.

```bash
ffmpeg -f x11grab -r 25 -s 1280x720 -i :0.0 output_screencast.mkv
```

#### Live Streaming (e.g., to Twitch)

Stream your desktop and audio to a live streaming service. Replace `<stream_key>` with your actual stream key.

```bash
ffmpeg -f alsa -ac 2 -i hw:0,0 -f x11grab -framerate 30 -video_size 1280x720 \
-i :0.0+0,0 -c:v libx264 -preset veryfast -b:v 1984k -maxrate 1984k -bufsize 3968k \
-vf "format=yuv420p" -g 60 -c:a aac -b:a 128k -ar 44100 \
-f flv rtmp://live.twitch.tv/app/<stream_key>
```

### 3.6 Advanced Filters & Specific Use Cases

#### Make Icons

**Forge Sigil 1 (Primary Manifest Icon 128x128):**

```bash
ffmpeg -i https://raw.githubusercontent.com/4ndr0666/4ndr0site/refs/heads/main/static/cyanglassarch.png -vf scale=128:128 icon128.png
```

**Forge Sigil 2 (Toolbar Active Icon 48x48):**

```bash
ffmpeg -i https://raw.githubusercontent.com/4ndr0666/4ndr0site/refs/heads/main/static/cyanglassarch.png -vf scale=48:48 icon48.png
```

**Forge Sigil 3 (Toolbar Dormant Icon 48x48):**

```bash
ffmpeg -i https://raw.githubusercontent.com/4ndr0666/4ndr0site/refs/heads/main/static/cyanglassarch.png -vf "scale=48:48,format=gray" icons/disabled48.png
```

**Forge Sigil 4 (Popup Dormant Icon 16x16):**

```bash
ffmpeg -i https://raw.githubusercontent.com/4ndr0666/4ndr0site/refs/heads/main/static/cyanglassarch.png -vf "scale=16:16,format=gray" icons/disabled16.png
```

#### Reduce Video Filesize

Compress a large video efficiently using `libx264` and a higher CRF value (e.g., 24-28 for more compression).

```bash
ffmpeg -i input.mov -c:v libx264 -crf 24 output_reduced.mp4
```
*   **Grayscale, Resize, and Compress**:
    ```bash
    ffmpeg -i video.mov -vf "eq=saturation=0,scale=640x480" -c:v libx264 -crf 24 output_grayscale_640x480.mp4
    ```

#### Deblock and Denoise Video

Apply `hqdn3d` (high quality deinterlace/denoise) and `deblock` filters to clean up video artifacts.

```bash
ffmpeg -i input.mp4 -vf "hqdn3d,deblock" output_denoised.mp4
```

#### Natural Color Correction

Adjust brightness, contrast, saturation, and color balance for improved visual presentation.

```bash
ffmpeg -i input.mp4 -vf "eq=brightness=0.15:contrast=1.3:saturation=0.9,colorbalance=rs=-0.1:gs=0.05:bs=0.05" -c:v libx264 -crf 18 -preset slow output_color_corrected.mp4
```

#### Tonemap HDR (BT.2020) to SDR (BT.709)

Convert HDR video to SDR, crucial for playback on non-HDR displays. This uses a complex filter chain.

```bash
ffmpeg -i file.mkv -vf "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable,zscale=t=bt709:m=bt709:r=tv,format=yuv420p" -crf 20 -acodec copy output_sdr.mkv
```
[Detailed Guide for HDR to SDR Conversion](https://stevens.li/guides/video/converting-hdr-to-sdr-with-ffmpeg/)

### 3.7 Metadata

#### Change Video Metadata Title

Set or modify the title metadata of a video file without re-encoding.

```bash
ffmpeg -i input.mp4 -metadata title="My New Video Title" -c copy output_with_title.mp4
```
To remove all existing metadata and then add a title:
```bash
ffmpeg -i in.mp4 -map_metadata -1 -metadata title="My New Title" -c:v copy -c:a copy out.mp4
```

### 3.8 Utilities and Best Practices

#### Encode Multiple Files (Batch Processing)

Use a `for` loop to process multiple files in a directory. This example converts `.m4a` audio files to `.mp3`.

```bash
for f in *.m4a; do ffmpeg -i "$f" -codec:v copy -codec:a libmp3lame -q:a 2 "newfiles/${f%.m4a}.mp3"; done
```
*Note: `newfiles/` must exist.*

#### Custom Function for Extracting Single Image at Frame

This is a bash function that wraps an FFmpeg command to extract a high-quality JPEG at a specific time.

```bash
# Example usage: extract_frame 00:00:10 input.mp4 output_frame
extract_frame() {
    local timestamp="$1"
    local input_file="$2"
    local output_base="$3"
    ffmpeg -ss "$timestamp" -i "$input_file" -qmin 1 -q:v 1 -qscale:v 2 -frames:v 1 -huffman optimal "$output_base.jpg"
}
```
Where `ss` offset = frame_number / FPS.

---

## 4. References

*   [Official FFmpeg Documentation](https://ffmpeg.org/documentation.html)
*   [FFmpeg H.264 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
*   [FFmpeg VP9 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)
*   [FFmpeg Interactive Filter Composer](https://ffmpeg.lav.io/) - Useful for building complex filter chains.
