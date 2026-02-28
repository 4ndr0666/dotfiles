#!/usr/bin/env bash
# 4NDR0init v1.0
# Synchronous initialization for D-Bus, Environment, and Portals.
set -e

# --- PHASE 1: D-Bus Sentinel (The Idempotent Check) ---
# We verify connectivity before doing anything else.
if ! dbus-send --session --dest=org.freedesktop.DBus \
    --type=method_call --print-reply \
    /org/freedesktop/DBus org.freedesktop.DBus.Peer.Ping >/dev/null 2>&1; then
    
    echo "[!] D-Bus unreachable. Attempting recovery..."
    if [[ -S "/run/user/${UID}/bus" ]]; then
        export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/${UID}/bus"
    else
        eval "$(dbus-launch --sh-syntax --exit-with-session)"
    fi
fi

# --- PHASE 2: Environment Propagation ---
# This replaces the 'exec-once = dbus-update...' lines in your config.
# We explicitly export these to the systemd user session so services can see them.
systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP DBUS_SESSION_BUS_ADDRESS
dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP DBUS_SESSION_BUS_ADDRESS
# Notifications
echo "[*] Initializing Notification Daemon..."
kill_quietly swaync  # Just in case
kill_quietly mako    # Ensure clean slate
sleep 0.5
mako &

# --- PHASE 3: Portal Reset (The Kill & Revive) ---
echo "[*] Resetting Portals..."
sleep 1
kill_quietly xdg-desktop-portal-hyprland
kill_quietly xdg-desktop-portal-gtk  # Ensure this is dead
kill_quietly xdg-desktop-portal-wlr
kill_quietly xdg-desktop-portal-gnome
kill_quietly xdg-desktop-portal
sleep 1

# 1. Start the Hyprland backend (Screenshare/Windows)
/usr/lib/xdg-desktop-portal-hyprland &
sleep 2

# 2. Start the GTK backend (File Pickers/Settings)
# 4NDR0: Essential for usability, optional for purity.
if [[ -x /usr/lib/xdg-desktop-portal-gtk ]]; then
    /usr/lib/xdg-desktop-portal-gtk &
fi
sleep 2

# 3. Start the Core (The Router)
/usr/lib/xdg-desktop-portal &
echo "[+] Core Initialization Complete."
