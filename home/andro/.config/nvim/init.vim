" Init.vim
"
" Author: 4ndr0666
" # ======================= // INIT.VIM //
"
" Leader Key Configuration
let mapleader =","

" ── Plug bootstrap ────────────────────────────────────────────────────────────
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
Plug 'plasticboy/vim-markdown' " Markdown syntax highlighting
Plug 'ryanoasis/vim-devicons' " Cool icons for nerd tree
Plug 'preservim/nerdtree'
Plug 'junegunn/goyo.vim'
Plug 'jreybert/vimagit'
Plug 'vimwiki/vimwiki'
Plug 'vim-airline/vim-airline'
Plug 'tpope/vim-commentary'
Plug 'ap/vim-css-color'
Plug 'EdenEast/nightfox.nvim' " Theme plugin
" Modern LSP & completion
Plug 'dense-analysis/ale'
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/nvim-cmp'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
call plug#end()

" ── General settings ──────────────────────────────────────────────────────────
" Force True Color for Nightfox to prevent visual artifact gaps
set termguicolors
set title
set bg=light
set mouse=a
set nohlsearch
set clipboard+=unnamedplus
set noshowmode
set noruler
set laststatus=0
set noshowcmd
colorscheme nightfox

" Basics
nnoremap c "_c
filetype plugin on
syntax on
set encoding=utf-8
set number relativenumber

" Autocompletion menu
set wildmode=longest,list,full

" Disable auto-comment on newline
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o

" Dot repeat over visual block
vnoremap . :normal .<CR>

" Markdown Edits
let g:vim_markdown_autowrite = 1
let g:vim_markdown_no_extensions_in_markdown = 1
let g:vim_markdown_conceal = 0
let g:vim_markdown_override_foldtext = 0
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_new_list_item_indent = 0

" Markdown auto format tables
inoremap <silent> <Bar>   <Bar><Esc>:call <SID>align()<CR>a

" Goyo prose mode
map <leader>f :Goyo \| set bg=light \| set linebreak<CR>

" Spell-check
map <leader>o :setlocal spell! spelllang=en_us<CR>

" Splits open bottom/right
set splitbelow splitright

" NERDTree
map <leader>n :NERDTreeToggle<CR>
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
let NERDTreeBookmarksFile = stdpath('data') . '/NERDTreeBookmarks'

" vim-airline
if !exists('g:airline_symbols')
	let g:airline_symbols = {}
endif
let g:airline_symbols.colnr = ' C:'
let g:airline_symbols.linenr = ' L:'
let g:airline_symbols.maxlinenr = ' '
let g:airline#extensions#whitespace#symbol = '!'

" Shortcutting split navigation, saving a keypress:
map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

" Replace ex mode with gq
map Q gq

" Check file in shellcheck:
map <leader>s :!clear && shellcheck -x %<CR>

" Replace all is aliased to S.
	nnoremap S :%s//g<Left><Left>

" Compile document
map <leader>c :w! \| !compiler "%:p"<CR>

" Preview output
map <leader>p :!opout "%:p"<CR>

" Clean tex build files on leave
autocmd VimLeave *.tex !latexmk -c %

" Ensure files are read as what I want:
let g:vimwiki_ext2syntax = {'.Rmd': 'markdown', '.rmd': 'markdown','.md': 'markdown', '.markdown': 'markdown', '.mdown': 'markdown'}
map <leader>v :VimwikiIndex<CR>
let g:vimwiki_list = [{'path': '~/.local/share/nvim/vimwiki', 'syntax': 'markdown', 'ext': '.md'}]
autocmd BufRead,BufNewFile /tmp/calcurse*,~/.calcurse/notes/* set filetype=markdown
autocmd BufRead,BufNewFile *.ms,*.me,*.mom,*.man set filetype=groff
autocmd BufRead,BufNewFile *.tex set filetype=tex

" Sudo write
cabbrev w!! execute 'silent! write !sudo tee % >/dev/null' <bar> edit!

" Automatically deletes all trailing whitespace and newlines at end of file on save. & reset cursor position
autocmd BufWritePre * let currPos = getpos(".")
autocmd BufWritePre * %s/\s\+$//e
autocmd BufWritePre * %s/\n\+\%$//e
autocmd BufWritePre *.[ch] %s/\%$/\r/e " add trailing newline for ANSI C standard
autocmd BufWritePre *neomutt* %s/^--$/-- /e " dash-dash-space signature delimiter in emails
autocmd BufWritePre * cal cursor(currPos[1], currPos[2])

" Turns off highlighting on the bits of code that are changed, so the line that is changed is highlighted but the actual text that has changed stands out on the line and is readable.
if &diff
    highlight! link DiffText MatchParen
endif

" Function for toggling the bottom statusbar:
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
nnoremap <leader>h :call ToggleHiddenAll()<CR>

" ── ALE Configuration (Linter de-confliction) ────────────────────────────────
let g:ale_linters_explicit = 1
let g:ale_linters = {
\   'sh': ['shellcheck'],
\   'bash': ['shellcheck'],
\   'python': ['flake8'],
\   'markdown': ['vale'],
\}
" Explicitly disable ALE for TS/JS as the LSP handles it
let g:ale_pattern_options = {
\   '\.tsx\?$': {'ale_enabled': 0},
\   '\.jsx\?$': {'ale_enabled': 0},
\   '\.js\?$': {'ale_enabled': 0},
\}

" ── Modern LSP & CMP Setup (Neovim 0.11+) ───────────────────────────────────
lua << EOF
-- 1. Kill ALE LSP interference
vim.g.ale_disable_lsp = 1
vim.g.ale_lsp_suggestions = 0

-- 2. Disable Deno LSP auto-attach
vim.g.loaded_deno = 1
vim.g.markdown_fenced_languages = {}

-- 3. UI Gap Mitigation (Borders for LSP floats)
vim.diagnostic.config({
  float = { border = "rounded" }
})
vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, { border = "rounded" })
vim.lsp.handlers["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, { border = "rounded" })

-- 4. CMP Engine Setup
local cmp = require('cmp')
cmp.setup({
  window = {
    completion = cmp.config.window.bordered(),
    documentation = cmp.config.window.bordered(),
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-b>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.abort(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
  }),
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
  }, {
    { name = 'buffer' },
    { name = 'path' },
  })
})

-- 5. Broadcast CMP capabilities to LSP
local capabilities = require('cmp_nvim_lsp').default_capabilities()

-- Generic Root Directory Resolver (Mitigates Neovim 0.11 type crash)
local function get_safe_root(fname, markers)
  local search_path = fname
  if type(fname) == 'number' then
    search_path = vim.api.nvim_buf_get_name(fname)
  end
  if type(search_path) ~= 'string' or search_path == "" then
    search_path = vim.fn.getcwd()
  end

  local match = vim.fs.find(markers, { upward = true, path = search_path })[1]
  return match and vim.fs.dirname(match) or vim.fn.getcwd()
end

-- 6. Register LSP configurations
vim.lsp.config('ts_ls', {
  cmd = { 'typescript-language-server', '--stdio' },
  capabilities = capabilities,
  root_dir = function(fname)
    return get_safe_root(fname, { 'tsconfig.json', 'jsconfig.json', 'package.json' })
  end,
  filetypes = { 'javascript', 'javascriptreact', 'typescript', 'typescriptreact' },
  settings = {
    typescript = {
      inlayHints = {
        includeInlayParameterNameHints = 'all',
        includeInlayVariableTypeHints = true,
      }
    },
  },
})

vim.lsp.config('eslint', {
  cmd = { 'vscode-eslint-language-server', '--stdio' },
  capabilities = capabilities,
  root_dir = function(fname)
    return get_safe_root(fname, { '.eslintrc', '.eslintrc.js', '.eslintrc.json', 'package.json' })
  end,
  filetypes = { 'javascript', 'javascriptreact', 'typescript', 'typescriptreact' },
  settings = { format = { enable = true } },
})

-- 7. Natively enable servers (Neovim 0.11+)
vim.lsp.enable('ts_ls')
vim.lsp.enable('eslint')

-- 8. Auto-format on save
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = { "*.js", "*.jsx", "*.ts", "*.tsx" },
  callback = function()
    vim.lsp.buf.format({ async = false })
  end,
})

-- 9. LSP attach debug + keymaps
vim.api.nvim_create_autocmd("LspAttach", {
  callback = function(args)
    local client = vim.lsp.get_client_by_id(args.data.client_id)
    if not client then return end

    local opts = { buffer = args.buf, noremap = true, silent = true }
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, opts)
    vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, opts)
    vim.keymap.set('n', '<leader>gr', vim.lsp.buf.references, opts)
  end,
})
EOF

" ── Load command shortcuts ────────────────────────────────────────────────────
silent! source ${XDG_CONFIG_HOME:-$HOME/.config}/nvim/shortcuts.vim
