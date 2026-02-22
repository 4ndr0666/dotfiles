// ==UserScript==
// @name Enhanced JSON Viewer
// @match *
// @run-at document-end
// ==/UserScript==

document.addEventListener('DOMContentLoaded', () => {
  let pretags = document.querySelectorAll('pre');

  pretags.forEach(pre => {
    try {
      let text = pre.textContent;
      let parsed = JSON.parse(text);
      pre.textContent = JSON.stringify(parsed, null, 2);
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.wordWrap = 'break-word';
    } catch (e) {
      // Not valid JSON, do nothing
    }
  });
});
