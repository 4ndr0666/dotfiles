// ==UserScript==
// @name All Popups Blocker
// @match *://*/*
// ==/UserScript==

(function() {
    'use strict';

    // Function to block popups
    function blockPopups() {
        console.log('Popup blocked');
        return false;
    }

    // Override the window.open function to block popups
    window.open = blockPopups;
    parent.open = blockPopups;
    this.open = blockPopups;
})();
