-- ~/.config/nvim/lua/cmp_setup.lua

local cmp = require('cmp')

cmp.setup({
  completion = {
    keyword_length = 3,
  },
  sources = {
    { name = 'nvim_lsp' },
    -- add more sources if needed
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
    -- You can add Tab-completion or others here if desired
  }),
})
