```bash
# --- // Search for every instance of _ and replace it with .
:%s/_/\./g
```

```bash
# --- // Replace every instance of #
:$s/#//g
```

```bash
# --- // Remove every number, period and hyphen:
:%s/[0-9.-]//g
```
