// ==UserScript==
// @name        PreventPageVisibility
// @match       *://*/*
// ==/UserScript==

(function() {
    'use strict';

    // Events to block
    let events_to_block = [
        "visibilitychange",
        "webkitvisibilitychange",
        "mozvisibilitychange",
        "hasFocus",
        "blur",
        "focus",
        "mouseleave"
    ];

    // Block events on document and window
    for (let event_name of events_to_block) {
        document.addEventListener(event_name, function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }, true);

        window.addEventListener(event_name, function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }, true);
    }

    // Override focus-related properties
    document.hasFocus = function () { return true; };
    document.onvisibilitychange = null;
    Object.defineProperty(document, "visibilityState", { value: "visible" });
    Object.defineProperty(document, "hidden", { value: false });
    Object.defineProperty(document, "mozHidden", { value: false });
    Object.defineProperty(document, "webkitHidden", { value: false });
    Object.defineProperty(document, "webkitVisibilityState", { value: "visible" });
})();
