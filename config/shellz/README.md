# Zsh Vi Mode Keybinding Setup

Enhance your Zsh experience with customized Vi-style keybindings, intuitive navigation, and seamless integration with powerful tools like `lf` and `fzf`. This setup transforms your terminal into a more efficient and visually responsive environment, leveraging the familiarity of Vim keybindings.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Keybindings Overview](#keybindings-overview)
  - [Vi Mode Navigation](#vi-mode-navigation)
  - [Tab Completion with Vim Keys](#tab-completion-with-vim-keys)
  - [Cursor Shape Indicators](#cursor-shape-indicators)
  - [Directory Navigation with `lf`](#directory-navigation-with-lf)
  - [Quick Commands](#quick-commands)
  - [Edit Command Line in Vim](#edit-command-line-in-vim)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Vi Mode Integration:** Utilize familiar Vim keybindings for efficient command-line editing.
- **Enhanced Tab Completion:** Navigate tab completion menus using `h`, `j`, `k`, `l` keys.
- **Dynamic Cursor Shapes:** Visual indicators for different Vi modes (Insert and Command).
- **Directory Switching with `lf`:** Quickly navigate directories using the `lf` file manager.
- **Quick Access Commands:** Execute frequently used commands with simple keybindings.
- **Vim-based Command Line Editing:** Edit complex commands seamlessly in Vim.

## Prerequisites

Ensure the following tools are installed on your system:

- **Zsh:** The Z Shell.
- **lf:** A terminal file manager. [Install lf](https://github.com/gokcehan/lf)
- **fzf:** A general-purpose command-line fuzzy finder. [Install fzf](https://github.com/junegunn/fzf)
- **Vim:** For editing command lines. [Install Vim](https://www.vim.org/download.php)

## Installation

1. **Backup Existing `.zshrc`:**

   ```bash
   cp ~/.zshrc ~/.zshrc.backup
   ```

2. **Update `.zshrc`:**

   Replace your existing `.zshrc` with the provided configuration or append the keybinding setup to your current `.zshrc`.

   ```bash
   # Add the keybinding setup here
   ```

3. **Apply Changes:**

   Reload your Zsh configuration:

   ```bash
   source ~/.zshrc
   ```

## Keybindings Overview

### Vi Mode Navigation

Enable Vi mode to use Vim-like keybindings for command-line editing.

- **Activate Vi Mode:**

  ```bash
  bindkey -v
  ```

- **Switch to Insert Mode:** Press `i` in Command mode.
- **Switch to Command Mode:** Press `Esc` in Insert mode.

### Tab Completion with Vim Keys

Navigate through tab completion menus using Vim navigation keys.

- **`h`:** Move cursor backward (`vi-backward-char`).
- **`j`:** Move down in the menu (`vi-down-line-or-history`).
- **`k`:** Move up in the menu (`vi-up-line-or-history`).
- **`l`:** Move cursor forward (`vi-forward-char`).
- **`Backspace (^?)`:** Delete character backward (`backward-delete-char`).

### Cursor Shape Indicators

Visual feedback on the current mode through cursor shapes.

- **Insert Mode:** Beam cursor (`⨉`).
- **Command Mode:** Block cursor (`█`).

This is handled automatically by the configuration, changing the cursor shape based on the current mode.

### Directory Navigation with `lf`

Quickly switch directories using the `lf` file manager bound to `Ctrl + O`.

- **Activate Directory Switcher:**

  Press `Ctrl + O` to launch `lf`. Select a directory, and the shell will `cd` into it.

### Quick Commands

Execute frequently used commands with simple keybindings.

- **Bookmark Command (`bc -lq`):**

  Press `Ctrl + A` to execute `bc -lq`. *(Ensure `bc` is configured as per your setup.)*

- **Change Directory with `fzf`:**

  Press `Ctrl + F` to execute a command that changes the directory based on `fzf` selection.

  ```bash
  cd "$(dirname "$(fzf)")"
  ```

### Edit Command Line in Vim

For complex command editing, use Vim directly within the terminal.

- **Activate Vim Editor:**

  Press `Ctrl + E` to open the current command line in Vim for editing. After saving and exiting Vim, the edited command will be executed.

## Customization

Feel free to modify the keybindings to suit your workflow:

- **Change Keybindings:**

  Edit the `bindkey` lines in your `.zshrc` to assign different keys.

- **Adjust Cursor Shapes:**

  Modify the escape sequences in the `zle-keymap-select` function to use different cursor styles.

- **Modify Timeout:**

  Adjust the `KEYTIMEOUT` value to change the delay for key sequence recognition.

## Troubleshooting

- **Cursor Shape Not Changing:**

  Ensure your terminal emulator supports cursor shape changes via escape sequences. Check terminal settings or try a different emulator.

- **Keybindings Not Working:**

  Verify that `zsh` is your active shell and that the keybinding configurations are correctly added to `.zshrc`. Reload the configuration with `source ~/.zshrc`.

- **`lf` or `fzf` Not Found:**

  Ensure that `lf` and `fzf` are installed and available in your `PATH`. Install them using your package manager or from their official repositories.

## License

This configuration is provided under the [MIT License](LICENSE).

---

*Happy Zsh-ing! 🚀*
