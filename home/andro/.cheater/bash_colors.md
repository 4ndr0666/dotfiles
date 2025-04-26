# Author: 4ndr0666
# ========================== // BASH TRUECOLOR DEFAULTS //

## Terminal Color Initialization________________

**Safe TrueColor & Fallbacks**

```bash
# Force 24-bit color mode if not already set
case "${COLORTERM}" in
  truecolor | 24bit) ;;  # Already OK
  *) export COLORTERM="24bit" ;;  # Set to safe default
esac

# Advanced or Plain Text Color Functions
if command -v tput >/dev/null && [[ -t 1 ]]; then
    GLOW() { printf '%s\n' "$(tput setaf 6)[✔️] $*$(tput sgr0)"; }
    BUG()  { printf '%s\n' "$(tput setaf 1)[❌] $*$(tput sgr0)"; }
    INFO() { printf '%s\n' "$(tput setaf 4)[→]  $*$(tput sgr0)"; }
else
    GLOW() { printf '[OK] %s\n' "$*"; }
    BUG()  { printf '[ERR] %s\n' "$*"; }
    INFO() { printf '[..] %s\n' "$*"; }
fi
