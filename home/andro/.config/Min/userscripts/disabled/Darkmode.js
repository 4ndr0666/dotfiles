// ==UserScript==
// @name Enhanced Dark Mode
// @match *
// @run-at document-start
// ==/UserScript==

var style = document.createElement('style');

style.textContent = `
  html, body {
    background-color: #555; /* Dark background */
    color: #151515; /* Light text */
  }

  a, a:visited {
    color: #15FFFF; /* Light blue for links */
  }

  iframe, img, video, canvas {
    filter: invert(90%) !important;
  }

  /* Additional styles based on your CSS file can be added here */
`;

document.head.appendChild(style);
