# The "printf" Command Cheat Sheet

A concise, organized guide to the `printf` command in POSIX shells  
(e.g., Bash) and `/usr/bin/printf`. Ideal for use with  
`bat --language=md` on Arch Linux or any Unix-like system.

---

## 1. Overview

- **Purpose**: Format and print data to stdout, with precise control and fewer  
  pitfalls than `echo`.  
- **Usage**:  
  ```bash
  printf FORMAT [ARG]...
  ```  
- **Highlights**:  
  - Control width, precision, padding.  
  - Handle escape sequences (`\n`, `\t`, etc.).  
  - Support positional args and dynamic field widths.

---

## 2. Basic Specifiers

| Spec. | Description               | Usage                   | Output    |
|:-----:|:--------------------------|:------------------------|:---------:|
| `%s`  | String                    | ``printf "%s\n" foo``   | foo       |
| `%b`  | Escapes in string         | ``printf "%b\n" "a\nb"``| a<br>b    |
| `%d`  | Signed integer            | ``printf "%d\n" -42``   | -42       |
| `%u`  | Unsigned integer          | ``printf "%u\n" 300``   | 300       |
| `%x`  | Hex (lowercase)           | ``printf "%x\n" 255``   | ff        |
| `%X`  | Hex (uppercase)           | ``printf "%X\n" 255``   | FF        |
| `%o`  | Octal                     | ``printf "%o\n" 64``    | 100       |
| `%f`  | Float (precision .2)      | ``printf "%.2f\n" pi``  | 3.14      |
| `%e`  | Sci. notation (lower)     | ``printf "%e\n" val``   | 1.23e+04  |
| `%E`  | Sci. notation (upper)     | ``printf "%E\n" val``   | 1.23E+04  |
| `%c`  | Single char (ASCII code)  | ``printf "%c\n" 65``    | A         |
| `%%`  | Literal percent           | ``printf "%%\n"``       | %         |

> **Bash extension**: `%q` quotes a string for re-use in shell input.  
> ```bash
> printf "%q\n" "a b"
> # → a\ b
> ```

---

## 3. Escape Sequences

Used with `%b` (or `echo -e`):

| Sequence | Meaning           |
|:--------:|:------------------|
| `\n`     | Newline           |
| `\t`     | Tab               |
| `\r`     | Carriage return   |
| `\a`     | Alert (bell)      |
| `\b`     | Backspace         |
| `\\`     | Backslash         |
| `\"`     | Double quote      |
| `\0NNN`  | Byte as octal NNN |

---

## 4. Flags, Width & Precision

- **Flags** (between `%` and width):  
  - `-` : Left-justify.  
  - `+` : Always print sign.  
  - (space): Prefix space for positive numbers.  
  - `0` : Zero-pad numbers.  
  - `#` : Alternate form (e.g., `0x` for `%x`).  

- **Width**: Minimum field width.  
  - Example: `%8s` pads a string to width 8.

- **Precision**:  
  - Floats: digits after decimal. e.g., `%.3f`.  
  - Strings: max chars. e.g., `%.5s`.

- **Format syntax**:  
  ```
  %[flags][width][.precision]specifier
  ```

---

## 5. Dynamic Width & Precision

Use `*` to take width or precision from args:

```bash
printf "%*.*f\n" 10 3 3.14159
# └─┬─┘ └─┬─┘ └───┬───┘
# width  precision  value
```

---

## 6. Positional Parameters

Select specific arguments by position:

```bash
printf "%2$s is %1$d years old\n" 30 "Alice"
# → Alice is 30 years old
```

---

## 7. Practical Examples

1. **Column output**  
   ```bash
   printf "%-10s %5s\n" Name Score
   printf "%-10s %5.1f\n" Alice 93.5 Bob 88.0
   ```
2. **Zero-pad numbers**  
   ```bash
   printf "ID:%04d\n" {1..3}
   ```
3. **Quote for shell**  
   ```bash
   safe=$(printf "%q" "$user_input")
   eval "echo You entered: $safe"
   ```
4. **Byte-level view**  
   ```bash
   printf "%s" "Hi" | xxd
   ```

---

## 8. Tips & Best Practices

- Always quote format strings and args to avoid word splitting or globbing.  
- Use `%b` when you need escape-sequence interpretation; otherwise `%s` is safer.  
- Bash’s built-in `printf` is faster; `/usr/bin/printf` is more portable.  
- Test edge cases: empty strings, large numbers, non-ASCII.  
- Avoid `%n` in untrusted contexts (POSIX may write memory; Bash ignores `%n`).
