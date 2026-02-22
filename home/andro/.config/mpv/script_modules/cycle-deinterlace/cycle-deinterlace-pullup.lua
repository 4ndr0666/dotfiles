
local function pullup_on()
    for _, vf in pairs(mp.get_property_native('vf')) do
        if vf['label'] == pullup_label then
            return "yes"
        end
    end
    return "no"
end

local function do_cycle()
    if pullup_on() == "yes" then
        -- if pullup is on remove it
        mp.command(string.format("vf remove @%s:pullup", pullup_label))
        return
    elseif mp.get_property("deinterlace") == "yes" then
        -- if deinterlace is on, turn it off and insert pullup filter
        mp.set_property("deinterlace", "no")
        mp.command(string.format("vf add @%s:pullup", pullup_label))
        return
    else
        -- if neither is on, turn on deinterlace
        mp.set_property("deinterlace", "yes")
        return
    end
end

local function cycle_deinterlace_pullup_handler()
    do_cycle()
    -- independently determine current state and give user feedback
    mp.osd_message(string.format("deinterlace: %s\n"..
                                     "pullup: %s",
                                 mp.get_property("deinterlace"),
                                 pullup_on()))
end

mp.add_key_binding("D", "cycle-deinterlace-pullup", cycle_deinterlace_pullup_handler)
