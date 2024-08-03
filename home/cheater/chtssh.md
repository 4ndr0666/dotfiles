# --- // VERIFY_SSH_KEY:
```bash
ls ~/.ssh
```

# --- // GENERATE_KEY:
```bash
ssh-keygen -t rsa -b 4096 -C "01_dolor.loftier@icloud.com"
```

# --- // COPY_PUBLIC_KEY:
```bash
cat ~/.ssh/id_rsa.pub
```

# --- // CORRECT_PERMS:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

