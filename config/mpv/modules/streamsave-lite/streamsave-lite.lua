-- streamsave-lite.lua

local options = require 'mp.options'
local utils = require 'mp.utils'
local msg = require 'mp.msg'

-- Initialize the update table
local update = {}

-- Default user settings, can be changed in streamsave.conf
local opts = {
    save_directory  = "/storage/Downloads",  -- Output file directory
    dump_mode       = "ab",                  -- <ab|current|continuous>
    output_label    = "increment",           -- <increment|range|timestamp|overwrite>
    force_extension = ".mkv",                -- Custom file extension if set
    force_title     = "MyCustomTitle",       -- Custom title used for the filename
    range_marks     = true,                  -- Set chapters at A-B loop points
}

-- Define valid modes and labels
local cycle_modes = {"ab", "current", "continuous"}
local mode_info = {continuous = "Continuous", ab = "A-B loop", current = "Current position"}
local labels = {increment = true, range = true, timestamp = true, overwrite = true}

-- Define valid codecs for webm and mp4 containers
local webm = {vp8 = true, vp9 = true, vorbis = true, opus = true}
local mp4 = {h264 = true, hevc = true, aac = true}

-- Internal state
local file = {}
local loop = {}
local chapter_list = {}
local ab_chapters = {}

-- Read options from the config file
options.read_options(opts, "streamsave", function(changed)
    for k, _ in pairs(changed) do
        if update[k] then update[k]() end
    end
end)

-- Validate user options
local function validate_opts()
    if not cycle_modes[opts.dump_mode] then
        msg.error("Invalid dump_mode '" .. opts.dump_mode .. "'")
        opts.dump_mode = "ab"
    end
    if not labels[opts.output_label] then
        msg.error("Invalid output_label '" .. opts.output_label .. "'")
        opts.output_label = "increment"
    end
end

-- Append a slash to the path if needed
local function append_slash(path)
    return path:match("[\\/]", -1) and path or path .. "/"
end

-- Update save directory option
function update.save_directory()
    opts.save_directory = append_slash(mp.command_native({"expand-path", opts.save_directory}))
end

-- Update force title option
function update.force_title()
    if opts.force_title ~= "" then
        file.title = opts.force_title
    else
        file.title = mp.get_property("media-title", "untitled")
    end
end

-- Update force extension option
function update.force_extension()
    if opts.force_extension ~= "" then
        file.ext = opts.force_extension
    else
        file.ext = ".mkv"
    end
end

-- Update range marks option
function update.range_marks()
    if opts.range_marks then
        chapter_points()
    else
        mp.set_property_native("chapter-list", chapter_list)
        ab_chapters = {}
    end
end

-- Set up the file name using the media title
function title_change(_, media_title)
    if opts.force_title == "" and media_title then
        file.title = media_title:gsub("[\\/:*?\"<>|]", ".")
    end
end

-- Determine container format based on codecs
function container()
    local audio = mp.get_property("audio-codec-name", "none")
    local video = mp.get_property("video-format", "none")
    local file_format = mp.get_property("file-format")
    if file_format then
        if webm[video] and webm[audio] then
            file.ext = ".webm"
        elseif mp4[video] and mp4[audio] then
            file.ext = ".mp4"
        else
            file.ext = ".mkv"
        end
    else
        file.ext = nil
    end
end

-- Flip A-B loop points if needed
local function range_flip()
    loop.a = mp.get_property_number("ab-loop-a")
    loop.b = mp.get_property_number("ab-loop-b")
    if loop.a and loop.b and loop.a > loop.b then
        loop.a, loop.b = loop.b, loop.a
        mp.set_property_number("ab-loop-a", loop.a)
        mp.set_property_number("ab-loop-b", loop.b)
    end
end

-- Get A-B loop range as string
local function loop_range()
    return mp.get_property_osd("ab-loop-a") .. " - " .. mp.get_property_osd("ab-loop-b")
end

-- Set up the file name based on options
local function set_name(label)
    return opts.save_directory .. file.title .. label .. file.ext
end

-- Increment filename if needed
local function increment_filename()
    if set_name("-" .. (file.inc or 1)) ~= file.name then
        file.inc = 1
        file.name = set_name("-" .. file.inc)
    end
    while utils.file_info(file.name) do
        file.inc = file.inc + 1
        file.name = set_name("-" .. file.inc)
    end
end

-- Generate range stamp for file name
local function range_stamp(mode)
    local file_range
    if mode == "ab" then
        file_range = "-[" .. loop_range():gsub(":", ".") .. "]"
    elseif mode == "current" then
        file_range = "-[0 - " .. mp.get_property_osd("playback-time", "0"):gsub(":", ".") .. "]"
    else
        increment_filename()
        return
    end
    file.name = set_name(file_range)
    local i = 1
    while utils.file_info(file.name) do
        i = i + 1
        file.name = set_name(file_range .. "-" .. i)
    end
end

-- Write cache to file
local function write_cache(mode, quiet)
    if not (file.title and file.ext) or file.pending == 2 then return end
    range_flip()
    if opts.output_label == "increment" then
        increment_filename()
    elseif opts.output_label == "range" then
        range_stamp(mode)
    elseif opts.output_label == "timestamp" then
        file.name = set_name(os.date("%y%m%d-%H%M-%S"))
    elseif opts.output_label == "overwrite" then
        file.name = set_name("")
    end
    file.pending = (file.pending or 0) + 1
    loop.continuous = mode == "continuous" or (mode == "ab" and loop.a and not loop.b)
    local commands = {
        name = mode == "ab" and "ab-loop-dump-cache" or "dump-cache",
        filename = file.name,
        start = mode == "current" and 0 or nil,
        ["end"] = mode == "current" and mp.get_property_number("playback-time", 0) or nil,
        _flags = quiet and {} or {"osd-msg"}
    }
    local function on_write_finish(success)
        if utils.file_info(file.name) then
            if success then
                msg.info("Finished writing cache to: " .. file.name)
            else
                msg.warn("Possibly broken file created at: " .. file.name)
            end
        else
            msg.error("File not written.")
        end
        file.pending = file.pending - 1
    end
    file.writing = mp.command_native_async(commands, on_write_finish)
end

-- Handle mode switch
local function mode_switch(value)
    if value == "cycle" then
        opts.dump_mode = cycle_modes[(modes[opts.dump_mode] % #cycle_modes) + 1]
    else
        opts.dump_mode = value
    end
    mp.osd_message("Cache write mode: " .. mode_info[opts.dump_mode])
end

-- Align cache to keyframes
local function align_cache()
    if not loop.aligned then
        range_flip()
        loop.a_revert = loop.a
        loop.b_revert = loop.b
        mp.command("ab-loop-align-cache")
        loop.aligned = true
        mp.osd_message("Adjusted range: " .. loop_range())
    else
        mp.set_property_native("ab-loop-a", loop.a_revert)
        mp.set_property_native("ab-loop-b", loop.b_revert)
        loop.aligned = false
        mp.osd_message("A-B loop: " .. loop_range())
    end
end

-- Update chapter points
function chapter_points()
    if not opts.range_marks then return end
    range_flip()
    ab_chapters = {}
    if loop.a then
        ab_chapters[1] = {title = "A loop point", time = loop.a}
    end
    if loop.b then
        ab_chapters[#ab_chapters + 1] = {title = "B loop point", time = loop.b}
    end
    mp.set_property_native("chapter-list", ab_chapters)
end

-- Stop writing the file
local function stop()
    mp.abort_async_command(file.writing or {})
end

mp.observe_property("media-title", "string", title_change)
mp.observe_property("audio-codec-name", "string", container)
mp.observe_property("video-format", "string", container)
mp.observe_property("ab-loop-a", "native", chapter_points)
mp.observe_property("ab-loop-b", "native", chapter_points)

mp.register_event("file-loaded", function()
    chapter_points()
    file.loaded = true
end)

mp.register_script_message("streamsave-lite-mode", mode_switch)
mp.add_key_binding("Alt+z", "mode-switch", function() mode_switch("cycle") end)
mp.add_key_binding("d", "stop-cache-write", stop)
mp.add_key_binding("c", "align-cache", align_cache)
mp.add_key_binding("s", "cache-write", function() write_cache(opts.dump_mode) end)
