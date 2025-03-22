# Sed Cheat-sheet

## Remove all backslashes from a file 

```shell
sed 's/\\//g' input.txt > output.txt
```

## Place single-quotes around every word in a file

```shell
sed -E "s/^'?([^']+)'?$/\'\1\'/" input.txt > output.txt
```
