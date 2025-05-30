// ==UserScript==
// @name        Google Disable SafeSearch automatically
// @description Disable Google SafeSearch automatically
// @namespace   Mikhoul
// @include        http*://*.google.*/search*
// @include        http://*.google.*/imgres*

// @version     1.01
// @grant       none
// ==/UserScript==
var url = window.location.href;
var safe = "&safe=off";
if(url.indexOf(safe) == -1){
  url += safe;
  window.location = url;
}