// ==UserScript==
// @name Combined_Custom_Scrollbars
// @match *
// @run-at document-start
// ==/UserScript==

var style = document.createElement('style')

style.textContent = `
html, body {
  margin: 0;
  padding: 0;
}

body {
  overflow: overlay;
}

/* width and height */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Transparent Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  visibility: hidden;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  visibility: visible;
}
`

document.head.appendChild(style)
