// ==UserScript==
// @name          Absolute Enable Right Click & Copy for Min
// @match         *://*/*
// @run-at        document-start
// ==/UserScript==

(function() {
    'use strict';

    var isEnabled = true; // Set this to false if you want to start with the script disabled

    var enableRightClickAndCopy = function() {
        if (!isEnabled) return;

        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerText = `* {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
             user-select: text !important;
        }`;
        document.head.appendChild(css);

        document.addEventListener('contextmenu', function(e) {
            e.stopPropagation();
        }, true);
    };

    var toggleScript = function() {
        isEnabled = !isEnabled;
        if (isEnabled) {
            enableRightClickAndCopy();
            alert('Script enabled');
        } else {
            alert('Script disabled');
        }
    };

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == 192) { // Ctrl + `
            toggleScript();
        }
    });

    enableRightClickAndCopy();
})();
