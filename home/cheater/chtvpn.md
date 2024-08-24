# ExpressVPN Cheat Sheet

## PGP Keys

### Download PGP Key
```bash
wget https://www.expressvpn.com/expressvpn_release_public_key_0xAFF2A1415F6A3A38.asc
```

### Import the PGP Key
```bash
gpg --import expressvpn_release_public_key_0xAFF2A1415F6A3A38.asc
```

### Verify Fingerprint
```bash
gpg --fingerprint release@expressvpn.com
```
Verify that the fingerprint of the PGP key is:
```
1D0B 09AD 6C93 FEE9 3FDD BD9D AFF2 A141 5F6A 3A38
```

### Verify Signature of Installer
```bash
gpg --verify [name_of_the_signature_file].asc
```

## Protocols

### Set Protocol to Lightway TCP
```bash
expressvpn protocol lightway_tcp
```

### Set Protocol to Lightway UDP
```bash
expressvpn protocol lightway_udp
```

### Set Protocol to OpenVPN TCP
```bash
expressvpn protocol tcp
```

### Set Protocol to OpenVPN UDP
```bash
expressvpn protocol udp
```

### Set Protocol to Auto
```bash
expressvpn protocol auto
```

## Protection Features

### Enable/Disable All Features
```bash
expressvpn preferences set block_all true/false
```

### Enable/Disable Block Trackers
```bash
expressvpn preferences set block_trackers true/false
```

### Enable/Disable Block Malicious Sites
```bash
expressvpn preferences set block_malicious true/false
```

### Enable/Disable Block Ads
```bash
expressvpn preferences set block_ads true/false
```

### Enable/Disable Block Adult Sites
```bash
expressvpn preferences set block_adult true/false
```

## Opt-Out

### Opt-Out of Sending Diagnostics
```bash
expressvpn preferences set send_diagnostics false
```

## Manual DNS Configuration

### Configure DNS Manually
```bash
sudo mkdir -p /etc/resolvconf/resolv.conf.d
sudo touch /etc/resolvconf/resolv.conf.d/base
```
Edit the `/etc/resolvconf/resolv.conf.d/base` file with the following content:
```bash
nameserver 208.67.222.222
nameserver 208.67.220.220
```
Then, run the following commands:
```bash
sudo mv /etc/resolv.conf /etc/resolv.conf.backup
sudo ln -s /run/resolvconf/resolv.conf /etc/resolv.conf
sudo resolvconf -u
sudo systemctl restart NetworkManager
```
