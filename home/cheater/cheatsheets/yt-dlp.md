# BluetvsportsTV

## Rutube

 Rutube displays video URLs like the example below:

### Normal URL

```bash
# URL as they display it
https://rutube.ru/play/embed/cd9f5ebaf6b75c8fd2e748888cc3c981?autoplay=1&mute=1
```

### Reformatted Command

```bash
# Remove the "?autoplay=1&mute=1" part of the URL
ytdl https://rutube.ru/play/embed/cd9f5ebaf6b75c8fd2e748888cc3c981 --cookies cookies.txt --write-url-link
```

*Note: Export cookies with [EditThisCookie](https://www.editthiscookie.com/) for accessing restricted content.*
```




------------------------- // TEMPLATE //
# Site Name

## Platform Name

`Explanation of caveats or nuances for this platform`

### Normal URL

```bash
# URL as they display it
https://example.com/video?id=12345&autoplay=1
```

### Reformatted Command

```bash
# Reformatted command for yt-dlp
ytdl https://example.com/video?id=12345 --cookies cookies.txt --write-url-link
```
