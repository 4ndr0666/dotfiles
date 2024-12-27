# Vim Cheat Sheet

## Basic Editing

- **Open File:**  
  `vim <filename>`  
  Open a file with Vim.

- **Save and Quit:**  
  `:wq`  
  Save changes and quit Vim.

- **Quit without Saving:**  
  `:q!`  
  Quit Vim without saving changes.

## Navigation

- **Move Cursor:**  
  `h` - Left  
  `j` - Down  
  `k` - Up  
  `l` - Right  

- **Move to Line Start:**  
  `0`  
  Move to the beginning of the line.

- **Move to Line End:**  
  `$`  
  Move to the end of the line.

- **Go to Line Number:**  
  `<number>G`  
  Jump to a specific line.

- **Go to First Line:**  
  `gg`  
  Move to the first line of the file.

- **Go to Last Line:**  
  `G`  
  Move to the last line of the file.

## Editing Text

- **Insert Mode:**  
  `i`  
  Enter insert mode at the cursor.

- **Append Text:**  
  `a`  
  Append text after the cursor.

- **Open New Line Below:**  
  `o`  
  Open a new line below the current line.

- **Delete Character:**  
  `x`  
  Delete the character under the cursor.

- **Delete Word:**  
  `dw`  
  Delete from the cursor to the end of the word.

- **Delete Line:**  
  `dd`  
  Delete the current line.

- **Copy (Yank) Line:**  
  `yy`  
  Copy the current line.

- **Paste:**  
  `p`  
  Paste the yanked text after the cursor.

- **Cut and Paste Line:**  
  `ddp`  
  Cut the current line and paste it below.

- **Undo:**  
  `u`  
  Undo the last change.

- **Redo:**  
  `Ctrl + r`  
  Redo the last undone change.

## Visual Mode

- **Enter Visual Mode:**  
  `v`  
  Start visual mode for character selection.

- **Select Line in Visual Mode:**  
  `V`  
  Select the entire line in visual mode.

- **Select Block in Visual Mode:**  
  `Ctrl + v`  
  Start block visual mode for column selection.

## Text Objects

- **Delete Inside Quotes:**  
  `di"`  
  Delete everything inside quotes.

- **Copy Inside Parentheses:**  
  `yi(`  
  Yank everything inside parentheses.

## Indentation

- **Auto-indent Line:**  
  `=`  
  Automatically indent the current line.

- **Indent Entire Document:**  
  `gg=G`  
  Indent the entire document.

## Search and Replace

- **Search for Text:**  
  `/pattern`  
  Search forward for a pattern.

- **Repeat Search:**  
  `n`  
  Move to the next occurrence of the search.

- **Search and Replace in Line:**  
  `:s/old/new/g`  
  Replace all occurrences of 'old' with 'new' in the current line.

- **Search and Replace in Document:**  
  `:%s/old/new/g`  
  Replace all occurrences in the entire document.

## Spell Checking

- **Enable Spell Check:**  
  `:set spell`  
  Turn on spell checking.

- **Disable Spell Check:**  
  `:set nospell`  
  Turn off spell checking.

## Miscellaneous

- **Open Help for Command:**  
  `:help <command>`  
  Get help for a specific command.

- **Execute Normal Mode Command in Insert Mode:**  
  `Ctrl + o <command>`  
  Execute a normal mode command while in insert mode.

- **Move Cursor Half Screen Up:**  
  `Ctrl + u`  
  Move the cursor up by half a screen.

- **Move Cursor Half Screen Down:**  
  `Ctrl + d`  
  Move the cursor down by half a screen.

- **Position Cursor on Screen:**
  - `H` - Move cursor to the top third of the screen.
  - `M` - Move cursor to the middle of the screen.
  - `L` - Move cursor to the bottom third of the screen.
