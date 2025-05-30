// ==UserScript==
// @name         Auto ad skipper for YouTube
// @name:ja      youtube自動広告スキップ
// @namespace    https://greasyfork.org/users/732692-wildlion
// @version      1.1.6
// @description  This addon skips youtube ad automatically (This is not an ad blocker)
// @description:ja youtubeの広告を自動的にスキップします
// @author       WildLion
// @match        https://www.youtube.com/*
// @grant        none
// @license      MIT
// @downloadURL https://openuserjs.org/install/WildLion/Auto_ad_skipper_for_YouTube.user.js
// @updateURL https://greasyfork.org/scripts/420923-auto-ad-skipper-for-youtube/code/Auto%20ad%20skipper%20for%20YouTube.user.js
// ==/UserScript==

var checkIntv = 500; //Rate of checking if ad is shown(in millisecond)

var enabled = true;
document.getElementById('start').insertAdjacentHTML('beforeend', '<div id="adskipperbtn">(Ad skipper enabled)</div>');

document.getElementById('adskipperbtn').addEventListener('mouseover', function () {
  document.getElementById('adskipperbtn').innerText = (enabled) ? 'Click to disable' : 'Click to enable';
});

document.getElementById('adskipperbtn').addEventListener('mouseout', function () {
  document.getElementById('adskipperbtn').innerText = (enabled) ? '(Ad skipper enabled)' : '(Ad skipper disabled)';
});

document.getElementById('adskipperbtn').addEventListener('click', function () {
  enabled = (enabled) ? false : true;
  document.getElementById('adskipperbtn').innerText = (enabled) ? '(Ad skipper enabled)' : '(Ad skipper disabled)';
});

document.getElementById('adskipperbtn').style.fontSize = 'large';

window.setInterval(function () {
  if (enabled) {
    if (document.contains(document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0])) {
      document.getElementsByClassName('ytp-ad-skip-button ytp-button')[0].click();
    }
    if (document.contains(document.getElementsByClassName('ytp-ad-overlay-close-button')[0])) {
      document.getElementsByClassName('ytp-ad-overlay-close-button')[0].click();
    }
  }
}, String(checkIntv));
