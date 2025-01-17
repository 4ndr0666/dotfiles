// ==UserScript==
// @name         Yandex Zen wide style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://zen.yandex.ru/media/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementsByClassName("article__right")[0].remove();
    document.getElementsByClassName("article__content")[0].style.width = "100%";
    document.getElementsByClassName("article__content")[0].style.marginLeft = 0;
    document.getElementsByClassName("article__middle")[0].style.flex = 1;
    
})();