## Search for every instance of lx and replace it with LX:
```bash
:%s/lx/\LX/g
```
- **Take note:** Replacing every instance of '\Lx' will throw an error.

- **(`\`):** The backslash before `LOG_FILE` can cause Vim to interpret `\L` as a special sequence.

To replace all instances of `log_file` with `LOG_FILE` use the following command **without** the backslash:
```bash
:%s/log_file/LOG_FILE/g
```

## Replace every instance of Lx:
```bash
:$s/Lx//g
```

## Remove every number, period and hyphen:
```bash
:%s/[0-9.-]//g
```

## Erase a single word from file:
```bash
sed -i 's/word//g' filename.txt
```

## Remove anything after the first space in each line
```bash
sed -i 's/ .*$//' filename.txt
```

## Sort and remove all dupes
```bash
vi +'%!sort | uniq' +wq filename.txt
```



