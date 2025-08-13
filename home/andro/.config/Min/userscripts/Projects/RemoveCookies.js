// ==UserScript==
// @name Delete Cookies for Current Site
// @match *://*/*
// @run-at document-start
// ==/UserScript==

(function() {
    var currentDomain = window.location.hostname;

    // Function to delete all cookies for the current domain
    function deleteCookies(domain) {
        // API call to get all cookies for the domain
        // and delete them
        // This is pseudocode as Min may not support such API calls
        browser.cookies.getAll({domain: domain}, function(cookies) {
            for(var i = 0; i < cookies.length; i++) {
                browser.cookies.remove({url: "http://" + domain + cookies[i].path, name: cookies[i].name});
            }
        });
    }

    // Delete cookies for the current domain
    deleteCookies(currentDomain);
})();
