(function() {
  var docReady = function(f) {
    if (document.readyState === "loading") {
      return window.addEventListener("DOMContentLoaded", f);
    } else {
      return f();
    }
  };

// This focuses the page
	docReady(function() { return window.location = "file:///home/fra/.config/browser/startpage/index.html"; });

// This focuses the omnibar
	// docReady(function() { return chrome.tabs.update({ url: "../index.html" });
})();
