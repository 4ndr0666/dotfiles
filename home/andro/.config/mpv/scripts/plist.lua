-- Creates Playlist of Directory/Folder 

local utils = require 'mp.utils'
local msg = require 'mp.msg'

-- User options
local options = {
    width = 750,
    height = 600,
    file_extensions = { "mp4", "mkv", "avi", "mov", "webm", "gif" },
    playlist_file = utils.join_path(os.getenv("HOME"), "mpv_playlist.m3u")
}

-- Function to prompt the user for a directory using kdialog or zenity
local function select_directory()
    local args
    if os.execute("command -v kdialog >/dev/null") == 0 then
        args = { "kdialog", "--getexistingdirectory", os.getenv("HOME") }
    elseif os.execute("command -v zenity >/dev/null") == 0 then
        args = { "zenity", "--file-selection", "--directory", "--title=Select a directory" }
    else
        mp.osd_message("Neither kdialog nor zenity found. Cannot open file dialog.")
        return nil
    end

    local res = mp.command_native({ name = "subprocess", args = args, capture_stdout = true })
    if res.status == 0 then
        local dir = res.stdout:gsub("\n", "")
        mp.osd_message("Directory selected: " .. dir)
        return dir
    else
        mp.osd_message("Directory selection canceled.")
        return nil
    end
end

-- Function to generate a playlist file from the selected directory
local function generate_playlist(dir)
    if not dir then return end
    local playlist_file = io.open(options.playlist_file, "w")
    if not playlist_file then
        mp.osd_message("Failed to create playlist file.")
        return
    end

    for _, ext in ipairs(options.file_extensions) do
        local args = { "find", dir, "-type", "f", "-iname", "*." .. ext }
        local res = mp.command_native({ name = "subprocess", args = args, capture_stdout = true })
        if res.status == 0 and res.stdout and res.stdout ~= "" then
            playlist_file:write(res.stdout)
        else
            msg.warn("No files found with extension " .. ext)
        end
    end

    playlist_file:close()
    mp.osd_message("Playlist created: " .. options.playlist_file)
end

-- Function to shuffle the playlist and move the currently playing file to the start
local function shuffle_playlist()
    mp.command('playlist-shuffle')
    local pos = mp.get_property_number('playlist-pos')
    if pos then
        mp.commandv('playlist-move', pos, 0)
        mp.osd_message('Playlist shuffled and current file moved to start.')
    end
end

-- Main function to select a directory, generate a playlist, shuffle it, and play
local function main()
    local dir = select_directory()
    if dir then
        generate_playlist(dir)
        mp.commandv('loadfile', options.playlist_file)
        mp.osd_message("Loading playlist and starting playback.")
        shuffle_playlist()
    end
end

-- Bind the main function to a key (Ctrl+l)
mp.add_key_binding("Ctrl+l", "generate_and_play_playlist", main)
