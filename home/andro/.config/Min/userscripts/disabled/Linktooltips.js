// ==UserScript==
// @name Show Link Tooltips
// @match *
// @run-at document-start
// ==/UserScript==

let tooltip;

function showTooltipFor(link) {
  if (tooltip) {
    tooltip.remove();
  }
  tooltip = document.createElement('div');
  tooltip.setAttribute('style', `
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-top-right-radius: 3px;
    padding: 0.2em;
    font-family: sans-serif;
    font-weight: normal;
    font-size: 13px;
    color: black;
    pointer-events: none;
    white-space: nowrap;
    max-width: 400px;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 2147483647;
    transition: opacity 0.3s;
  `);
  tooltip.textContent = link;
  document.body.appendChild(tooltip);
}

document.body.addEventListener('mouseover', function(e) {
  let target = e.target;
  while (target) {
    if (target.tagName === 'A' && target.href) {
      showTooltipFor(target.href);
      target.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
      break;
    }
    target = target.parentNode;
  }
});
