### PGP KEYS
```bash
# --- // Dl PGP key:
wget https://www.expressvpn.com/expressvpn_release_public_key_0xAFF2A1415F6A3A38.asc

# --- // Import the PGP Key:
gpg --import expressvpn_release_public_key_0xAFF2A1415F6A3A38.asc

# --- // Verify_fingerprint:
gpg --fingerprint release@expressvpn.com
Verify the fingerprint of the PGP key is 1D0B 09AD 6C93 FEE9 3FDD BD9D AFF2 A141 5F6A 3A38.

# --- // Verify_signature_of_installer:
gpg --verify [name of the signature file you downloaded].asc
```

### PROTOCOLS
```bash
# --- // LightwayTCP:
expressvpn protocol lightway_tcp

# --- // LightwayUDP:
expressvpn protocol lightway_udp

# --- // OpenVPNTCP:
expressvpn protocol tcp

# --- // OpenVPNUDP:
expressvpn protocol udp

# --- // Auto:
expressvpn protocol auto
```

### PROTECTION_FEATURES
```bash
# --- // All_features:
expressvpn preferences set block_all true/false

# --- // Block_trackers:
expressvpn preferences set block_trackers true/false

# --- // Block_malicious_sites:
expressvpn preferences set block_malicious true/false

# --- // Block_ads:
expressvpn preferences set block_ads true/false

# --- // Block_adult_sites:
expressvpn preferences set block_adult true/false
```

### OPT_OUT
```bash
# --- // Opt_out_of_sending_diagnostics:
expressvpn preferences set send_diagnostics false
```

### Manual_DNS_CONFIG:
```bash
mkdir /etc/resolvconf/resolv.conf.d
touch /etc/resolvconf/resolv.conf.d/base
vim /etc/resolvconf/resolv.conf.d/base:
`nameserver 208.67.222.222`
`nameserver 208.67.220.220`
sudo mv /etc/resolv.conf /etc/resolv.conf.backup
sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf
sudo resolvconf -u
sudo systemctl-restart NetworkManger
```
