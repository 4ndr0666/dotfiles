// ==UserScript==
// @name Auto-Refresh Specific Page
// @match https://app.tensorpix.ai/video
// @run-at document-end
// ==/UserScript==

setTimeout(() => {
  window.location.reload();
}, 60000); // Reloads every 60000 milliseconds (1 minute)
