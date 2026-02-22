// ==UserScript==
// @name AutoRetry Broken Images
// @match http*://*
// @run-at document-end
// ==/UserScript==

document.images.forEach(img => {
  if (!img.complete || img.naturalHeight === 0) {
    img.addEventListener('error', function retry() {
      setTimeout(() => img.src = img.src, 10000); // Tries to reload every 10 seconds
    });
  }
});
