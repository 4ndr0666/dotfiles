" INIT.VIM CONFIGURATION
"
" Author: 4ndr0666
" Date: 12-30-24
" ---------------------------
"
" Leader Key Configuration
let mapleader =","

if ! filereadable(system('echo -n "${XDG_CONFIG_HOME:-$HOME/.config}/nvim/autoload/plug.vim"'))
	echo "Downloading junegunn/vim-plug to manage plugins..."
	silent !mkdir -p ${XDG_CONFIG_HOME:-$HOME/.config}/nvim/autoload/
	silent !curl "https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim" > ${XDG_CONFIG_HOME:-$HOME/.config}/nvim/autoload/plug.vim
	autocmd VimEnter * PlugInstall
endif

map ,, :keepp /<++><CR>ca<
imap ,, <esc>:keepp /<++><CR>ca<

call plug#begin(system('echo -n "${XDG_CONFIG_HOME:-$HOME/.config}/nvim/plugged"'))
Plug 'tpope/vim-surround'
Plug 'itchyny/lightline.vim' "Highlights lines
Plug 'plasticboy/vim-markdown' "Markdown syntax highlighting
Plug 'preservim/nerdtree'
Plug 'junegunn/goyo.vim'
Plug 'jreybert/vimagit'
Plug 'vimwiki/vimwiki'
Plug 'vim-airline/vim-airline'
Plug 'tpope/vim-commentary'
Plug 'ap/vim-css-color'
Plug 'dense-analysis/ale'
Plug 'lifepillar/vim-mucomplete'
Plug 'neovim/nvim-lspconfig'   " LSP configuration plugin
Plug 'hrsh7th/nvim-cmp'        " Completion plugin
Plug 'hrsh7th/cmp-nvim-lsp'    " LSP completion source for nvim-cmp
Plug 'EdenEast/nightfox.nvim'  " Theme plugin
call plug#end()

set title
set bg=light
set mouse=a
set nohlsearch
if has('clipboard')
  let g:clipboard = {
        \ 'name': 'wl-clipboard',
        \ 'copy': {
        \   '+': 'wl-copy',
        \   '*': 'wl-copy',
        \ },
        \ 'paste': {
        \   '+': 'wl-paste -n',
        \   '*': 'wl-paste -n',
        \ },
        \ 'cache_enabled': 0
        \ }
endif
set clipboard+=unnamedplus
set noshowmode
set noruler
set laststatus=0
set noshowcmd
colorscheme nightfox

" Some basics:
	nnoremap c "_c
	filetype plugin on
	syntax on
	let g:auto_save = 1
	let g:auto_save_events = ["InsertLeave", "TextChanged"]
	set encoding=utf-8
	set number relativenumber

" Highlight CursorLine
	set cursorline
	highlight CursorLine ctermbg=Yellow cterm=bold guibg=#2b2b2b

" Enable mucompletion:
	let g:mucomplete#enable_auto_at_startup = 1
	let g:mucomplete#completion_delay = 1

" Disable automatic commenting on newline
	autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Perform dot commands over visual blocks:
	vnoremap . :normal .<CR>

" Goyo plugin makes text more readable when writing prose:
	map <leader>f :Goyo \| set bg=light \| set linebreak<CR>

" Spell-check set to <leader>o, 'o' for 'orthography':
	map <leader>o :setlocal spell! spelllang=en_us<CR>

" Splits open at the bottom and right, which is non-retarded, unlike vim defaults.
	set splitbelow splitright

" Nerd tree
	map <leader>n :NERDTreeToggle<CR>
	autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
	let NERDTreeBookmarksFile = stdpath('data') . '/NERDTreeBookmarks'
    let NERDTreeShowHidden=1

" Markdown Edits
    let g:vim_markdown_autowrite = 1
    let g:vim_markdown_no_extensions_in_markdown = 1
    let g:vim_markdown_conceal = 0
    let g:vim_markdown_override_foldtext = 0
    let g:vim_markdown_folding_disabled = 1
    let g:vim_markdown_new_list_item_indent = 0

    " Markdown auto format tables
    inoremap <silent> <Bar>   <Bar><Esc>:call <SID>align()<CR>a

" vim-airline
	if !exists('g:airline_symbols')
		let g:airline_symbols = {}
	endif
	let g:airline_symbols.colnr = ' C:'
	let g:airline_symbols.linenr = ' L:'
	let g:airline_symbols.maxlinenr = '☰ '

" Shortcutting split navigation, saving a keypress:
	map <C-h> <C-w>h
	map <C-j> <C-w>j
	map <C-k> <C-w>k
	map <C-l> <C-w>l

" Replace ex mode with gq
	map Q gq

" Check file in shellcheck:
	map <leader>s :!clear && shellcheck -x %<CR>

" Open my bibliography file in split
	map <leader>b :vsp<space>$BIB<CR>
	map <leader>r :vsp<space>$REFER<CR>

" Replace all is aliased to S.
	nnoremap S :%s//g<Left><Left>

" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>c :w! \| !compiler "%:p"<CR>

" Open corresponding .pdf/.html or preview
	map <leader>p :!opout "%:p"<CR>

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	autocmd VimLeave *.tex !texclear %

" Ensure files are read as what I want:
	let g:vimwiki_ext2syntax = {'.Rmd': 'markdown', '.rmd': 'markdown','.md': 'markdown', '.markdown': 'markdown', '.mdown': 'markdown'}
	map <leader>v :VimwikiIndex<CR>
	let g:vimwiki_list = [{'path': '~/.local/share/nvim/vimwiki', 'syntax': 'markdown', 'ext': '.md'}]
	autocmd BufRead,BufNewFile /tmp/calcurse*,~/.calcurse/notes/* set filetype=markdown
	autocmd BufRead,BufNewFile *.ms,*.me,*.mom,*.man set filetype=groff
	autocmd BufRead,BufNewFile *.tex set filetype=tex

" ALE (Asynchronous Lint Engine) Configuration
        let g:ale_disable_lsp = 1        " Disable ALE's built-in LSP features
        let g:ale_fix_on_save = 1       " Enable ALE fixers on save

" Configure ALE fixers
	   let g:ale_fixers = {
	    	\ '*': ['remove_trailing_lines', 'trim_whitespace'],
 		    \ 'sh': ['shfmt', 'remove_trailing_lines', 'trim_whitespace'],
    		\ 'python': ['autopep8', 'pyright'],
    		\ 'lua': ['lua_ls', 'stylua'],
    		\ 'javascript': ['eslint'],
    		\ 'markdown': ['prettier'],
    		\ }

" Configure ALE linters
	let g:ale_linters = {
	    	\ 'python': ['flake8', 'pylint'],
	    	\ 'javascript': ['eslint'],
	    	\ 'lua': ['luacheck'],
	    	\ 'sh': ['shfmt', 'remove_trailing_lines', 'trime_whitespace'],
	    	\ 'tex': ['chktex'],
	    	\ }

" ALE navigation mappings
nmap <silent> <leader>k <Plug>(ale_previous_wrap)
nmap <silent> <leader>j <Plug>(ale_next_wrap)

" Enable ALE integration with vim-airline
let g:airline#extensions#ale#enabled = 1

" Save file as sudo on files that require root permission
	cabbrev w!! execute 'silent! write !sudo tee % >/dev/null' <bar> edit!

" Enable Goyo by default for mutt writing
	autocmd BufRead,BufNewFile /tmp/neomutt* :Goyo 80 | call feedkeys("jk")
	autocmd BufRead,BufNewFile /tmp/neomutt* map ZZ :Goyo!\|x!<CR>
	autocmd BufRead,BufNewFile /tmp/neomutt* map ZQ :Goyo!\|q!<CR>

" Automatically deletes all trailing whitespace and newlines at end of file on save. & reset cursor position
 	autocmd BufWritePre * let currPos = getpos(".")
	autocmd BufWritePre * %s/\s\+$//e
	autocmd BufWritePre * %s/\n\+\%$//e
  	autocmd BufWritePre *.[ch] %s/\%$/\r/e " add trailing newline for ANSI C standard
 	 autocmd BufWritePre *neomutt* %s/^--$/-- /e " dash-dash-space signature delimiter in emails
  	autocmd BufWritePre * cal cursor(currPos[1], currPos[2])

" When shortcut files are updated, renew bash and ranger configs with new material:
	autocmd BufWritePost bm-files,bm-dirs !shortcuts

" Run xrdb whenever Xdefaults or Xresources are updated.
	autocmd BufRead,BufNewFile Xresources,Xdefaults,xresources,xdefaults set filetype=xdefaults
	autocmd BufWritePost Xresources,Xdefaults,xresources,xdefaults !xrdb %

" Recompile dwmblocks on config edit.
	autocmd BufWritePost ~/.config/zsh/aliasrc !cd ~; source .zshrc && { killall -q zsh;setsid -f terminal }

" Turns off highlighting on the bits of code that are changed, so the line that is changed is highlighted but the actual text that has changed stands out on the line and is readable.
if &diff
    highlight! link DiffText MatchParen
endif

" Function for toggling the bottom statusbar:
let s:hidden_all = 0
function! ToggleHiddenAll()
    if s:hidden_all  == 0
        let s:hidden_all = 1
        set noshowmode
        set noruler
        set laststatus=0
        set noshowcmd
    else
        let s:hidden_all = 0
        set showmode
        set ruler
        set laststatus=2
        set showcmd
    endif
endfunction
nnoremap <leader>h :call ToggleHiddenAll()<CR>
" Load command shortcuts generated from bm-dirs and bm-files via shortcuts script.
" Here leader is ";".
" So ":vs ;cfz" will expand into ":vs /home/<user>/.config/zsh/.zshrc"
" if typed fast without the timeout.
silent! source ~/.config/nvim/shortcuts.vim
