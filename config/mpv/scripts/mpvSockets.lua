-- mpvSockets.lua

local utils = require 'mp.utils'
local msg = require 'mp.msg'

local ipc_socket = "/tmp/mpvsocket"

-- Function to send JSON command to mpv IPC server
function send_json_command(command)
    local json_command = utils.format_json({ command = command })
    local args = { "socat", "-", ipc_socket }
    local process = utils.subprocess({ args = args, cancellable = false, input_data = json_command })
    if process.status ~= 0 then
        msg.error("Failed to send command: " .. (process.stderr or "Unknown error"))
    else
        msg.info("Command sent successfully: " .. json_command)
    end
end

-- Function to show text on OSD
function show_text(message)
    send_json_command({ "osd-msg", "show-text", message })
end

mp.register_script_message("send_json_command", send_json_command)
mp.register_script_message("show_text", show_text)
