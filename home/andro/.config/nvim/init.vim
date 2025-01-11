" =============================================================================
"                                INIT.VIM CONFIGURATION
" =============================================================================
"
" Author: andro@theworkpc
" Date: 2024-11-24
" Description: Enhanced Neovim configuration with optimized ALE integration,
"              streamlined plugin management, and improved settings for better
"              performance and maintainability.
"
" =============================================================================

" ---------------------------
" 1. Leader Key Configuration
" ---------------------------
let mapleader = ","

" ---------------------------
" 2. Plugin Manager Setup
" ---------------------------
" Ensure vim-plug is installed
let plug_path = fnamemodify(stdpath('config') . '/autoload/plug.vim', ':p')
if empty(glob(plug_path))
    echo "Downloading junegunn/vim-plug to manage plugins..."
    silent execute '!mkdir -p ' . fnamemodify(plug_path, ':h')
    silent execute '!curl -fLo ' . plug_path . ' --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
    autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" ---------------------------
" 3. Plugin Installation
" ---------------------------
call plug#begin(stdpath('data') . '/plugged')

" Plugin List
Plug 'tpope/vim-surround'
Plug 'itchyny/lightline.vim'            " Lightweight statusline
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'                " Fuzzy finder
Plug 'mbbill/undotree'                  " Visual undo history
Plug 'godlygeek/tabular'                " Text alignment
Plug 'plasticboy/vim-markdown'          " Markdown support
Plug 'ryanoasis/vim-devicons'           " Icons for filetypes
Plug 'Xuyuanp/nerdtree-git-plugin'      " NERDTree Git integration
Plug 'preservim/nerdtree'               " File explorer
Plug 'junegunn/goyo.vim'                " Distraction-free writing
Plug 'jreybert/vimagit'                 " Git integration
Plug 'vimwiki/vimwiki'                  " Personal wiki
Plug 'vim-airline/vim-airline'          " Status/tabline
Plug 'tpope/vim-commentary'             " Easy commenting
Plug 'ap/vim-css-color'                 " CSS color highlighting
Plug 'dense-analysis/ale'               " Asynchronous Lint Engine
Plug 'lifepillar/vim-mucomplete'        " Auto-completion
Plug 'neovim/nvim-lspconfig'            " LSP configurations
Plug 'hrsh7th/nvim-cmp'                 " Completion engine
Plug 'hrsh7th/cmp-nvim-lsp'             " LSP source for nvim-cmp
Plug 'EdenEast/nightfox.nvim'           " Theme

call plug#end()

" ---------------------------
" 4. General Settings
" ---------------------------
" UI Settings
set title
set background=light
colorscheme nightfox
set number relativenumber
set encoding=utf-8
set clipboard=unnamedplus
set mouse=a
set cursorline
set nohlsearch
set noerrorbells
set noshowmode
set noruler
set laststatus=2
set noshowcmd
set splitbelow splitright

" Highlight CursorLine
highlight CursorLine ctermbg=Yellow cterm=bold guibg=#2b2b2b

" Persistent undo
set undodir=~/.vim/undodir
set undofile

" Spell-check toggle
nnoremap <leader>o :setlocal spell! spelllang=en_us<CR>

" Autocompletion wildmode
set wildmode=longest,list,full

" Disable automatic commenting on newline
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Perform dot commands over visual blocks
vnoremap . :normal .<CR>

" ---------------------------
" 5. Key Mappings
" ---------------------------
" F5 to toggle Undotree
nnoremap <F5> :UndotreeToggle<CR>:UndotreeFocus<CR>

" Split navigation shortcuts
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Replace Ex mode with gq
nnoremap Q gq

" Check file with shellcheck
nnoremap <leader>s :!clear && shellcheck -x %<CR>

" Open bibliography files
nnoremap <leader>b :vsp $BIB<CR>
nnoremap <leader>r :vsp $REFER<CR>

" Replace all with substitution
nnoremap S :%s//g<Left><Left>

" Compile document
nnoremap <leader>c :w! <bar> !compiler "%:p"<CR>

" Open corresponding output file
nnoremap <leader>p :!opout "%:p"<CR>

" Toggle statusbar visibility
nnoremap <leader>h :call ToggleHiddenAll()<CR>

" ---------------------------
" 6. Plugin Configurations
" ---------------------------

" ---------------------------
" 6a. NERDTree Configuration
" ---------------------------
map <leader>n :NERDTreeToggle<CR>
let NERDTreeBookmarksFile = stdpath('data') . '/NERDTreeBookmarks'
let NERDTreeShowHidden = 1

" Remove NERDTree if it's the only window
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

" ---------------------------
" 6b. Vimwiki Configuration
" ---------------------------
let g:vimwiki_list = [{
    \ 'path': '~/.local/share/nvim/vimwiki/',
    \ 'syntax': 'markdown',
    \ 'ext': '.md'
    \ }]
let g:vimwiki_ext2syntax = {
    \ '.Rmd': 'markdown',
    \ '.rmd': 'markdown',
    \ '.md': 'markdown',
    \ '.markdown': 'markdown',
    \ '.mdown': 'markdown'
    \ }
map <leader>v :VimwikiIndex<CR>
autocmd BufRead,BufNewFile /tmp/calcurse*,~/.calcurse/notes/* set filetype=markdown
autocmd BufRead,BufNewFile *.ms,*.me,*.mom,*.man set filetype=groff
autocmd BufRead,BufNewFile *.tex set filetype=tex

" ---------------------------
" 6c. ALE (Asynchronous Lint Engine) Configuration
" ---------------------------
let g:ale_disable_lsp = 1        " Disable ALE's built-in LSP features
let g:ale_fix_on_save = 1       " Enable ALE fixers on save

" Configure ALE fixers
let g:ale_fixers = {
    \ '*': ['remove_trailing_lines', 'trim_whitespace'],
    \ 'sh': ['shfmt'],
    \ 'python': ['autopep8'],
    \ 'lua': ['stylua'],
    \ 'javascript': ['eslint'],
    \ 'markdown': ['prettier'],
    \ }

" Configure ALE linters
let g:ale_linters = {
    \ 'python': ['flake8', 'pylint'],
    \ 'javascript': ['eslint'],
    \ 'lua': ['luacheck'],
    \ 'sh': ['shellcheck'],
    \ 'tex': ['chktex'],
    \ }

" ALE navigation mappings
nmap <silent> <leader>k <Plug>(ale_previous_wrap)
nmap <silent> <leader>j <Plug>(ale_next_wrap)

" Enable ALE integration with vim-airline
let g:airline#extensions#ale#enabled = 1

" ---------------------------
" 6d. vim-airline Configuration
" ---------------------------
if !exists('g:airline_symbols')
    let g:airline_symbols = {}
endif
let g:airline_symbols.colnr = ' C:'
let g:airline_symbols.linenr = ' L:'
let g:airline_symbols.maxlinenr = '☰ '

" ---------------------------
" 6e. vim-plug Post-Installation
" ---------------------------
" Automatically install plugins if not already installed
autocmd VimEnter * PlugInstall --sync <bar> source $MYVIMRC

" ---------------------------
" 6f. Other Plugin Configurations
" ---------------------------
" Lightline Configuration
set noshowmode
let g:lightline = {
    \ 'colorscheme': 'wombat',
    \ }

" NERDTree Configuration
let NERDTreeShowHidden = 1

" Undotree Configuration
nnoremap <F5> :UndotreeToggle<CR>:UndotreeFocus<CR>

" Goyo Configuration
map <leader>f :Goyo <bar> set bg=light <bar> set linebreak<CR>

" ---------------------------
" 7. LSP and Completion Configuration (Lua)
" ---------------------------
lua << EOF
-- LSP Configuration using nvim-lspconfig
local lspconfig = require'lspconfig'

-- Enable LSP servers
lspconfig.clangd.setup{}         -- C/C++
lspconfig.pyright.setup{}        -- Python
lspconfig.lua_ls.setup{}         -- Lua

-- Setup nvim-cmp for autocompletion
local cmp = require'cmp'
cmp.setup {
  snippet = {
    expand = function(args)
      vim.fn["vsnip#anonymous"](args.body) -- For vsnip users
    end,
  },
  mapping = {
    ['<Tab>'] = cmp.mapping.select_next_item(),
    ['<S-Tab>'] = cmp.mapping.select_prev_item(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
  },
  sources = {
    { name = 'nvim_lsp' },
    { name = 'vsnip' },              -- For vsnip users
  },
}
EOF

" ---------------------------
" 8. Autocompletion Configuration
" ---------------------------
" (Handled in Lua block above)

" ---------------------------
" 9. Additional Key Mappings and Settings
" ---------------------------
" Save file as sudo
cabbrev w!! execute 'silent! write !sudo tee % >/dev/null' <bar> edit!

" Remove trailing whitespace on save
autocmd BufWritePre * let currPos = getpos(".")
autocmd BufWritePre * %s/\s\+$//e
autocmd BufWritePre * %s/\n\+\%$//e
autocmd BufWritePre *.[ch] %s/\%$/\r/e
autocmd BufWritePre *neomutt* %s/^--$/-- /e
autocmd BufWritePre * call setpos('.', currPos)

" Update shortcuts on file save
autocmd BufWritePost bm-files,bm-dirs !shortcuts

" Diff settings
if &diff
    highlight! link DiffText MatchParen
endif

" Function to toggle statusbar
let s:hidden_all = 0
function! ToggleHiddenAll()
    if s:hidden_all == 0
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

" ---------------------------
" 10. ALE Configuration Enhancements
" ---------------------------
" Ensure ALE uses shfmt for shell scripts
let g:ale_fixers['sh'] = ['shfmt', 'remove_trailing_lines', 'trim_whitespace']

" Ensure ALE uses shellcheck with '-x' for sourcing
let g:ale_linters['sh'] = ['shellcheck']

" ---------------------------
" 11. Final Touches
" ---------------------------
" Source command shortcuts generated from bm-dirs and bm-files via shortcuts script.
" Here leader is ",".
" So ":vs ;cfz" will expand into ":vs /home/<user>/.config/zsh/.zshrc"
" if typed fast without the timeout.
silent! source ~/.config/nvim/shortcuts.vim
