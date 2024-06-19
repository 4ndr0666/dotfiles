-- record_stream.lua

local mp = require 'mp'
local utils = require 'mp.utils'

-- Function to start recording the stream
local function start_recording()
    local stream_url = mp.get_property("path")
    if not stream_url then
        mp.msg.error("No stream URL found!")
        return
    end
    
    local output_file = mp.get_property("working-directory") .. "/recorded_stream.mp4"
    local args = {
        "ffmpeg", "-i", stream_url, "-c", "copy", output_file
    }
    
    local process = utils.subprocess_detached({ args = args })
    if process.error then
        mp.msg.error("Failed to start recording: " .. process.error)
    else
        mp.msg.info("Recording started: " .. output_file)
    end
end

-- Function to dump the cache to a file
local function dump_cache()
    local cache_dump_file = mp.get_property("working-directory") .. "/cache_dump.bin"
    local args = {
        "mpv", "--cache-dump", cache_dump_file
    }
    
    local process = utils.subprocess_detached({ args = args })
    if process.error then
        mp.msg.error("Failed to dump cache: " .. process.error)
    else
        mp.msg.info("Cache dumped to: " .. cache_dump_file)
    end
end

-- Key bindings
mp.add_key_binding("r", "start_recording", start_recording)
mp.add_key_binding("d", "dump_cache", dump_cache)

mp.msg.info("Script loaded: Press 'r' to start recording, 'd' to dump cache.")

