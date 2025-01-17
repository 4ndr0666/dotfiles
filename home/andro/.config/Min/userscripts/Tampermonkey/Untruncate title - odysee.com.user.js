// ==UserScript==
// @name        Untruncate title - odysee.com
// @namespace   Violentmonkey Scripts
// @match       https://odysee.com/*
// @grant       none
// @version     0.0.1
// @author      diehardzg
// @description Untruncates odysee video titles
// ==/UserScript==

var css = document.createElement("style");
css.innerHTML=`
  .claim-tile__title .truncated-text {
    display: block !important;
  }
`;
document.head.appendChild(css);