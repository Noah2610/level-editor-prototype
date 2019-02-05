let g:ale_rust_rls_toolchain = 'nightly'

nmap <leader>r :!cargo build<CR>
nmap <leader>t :!cargo test -- --nocapture<CR>
