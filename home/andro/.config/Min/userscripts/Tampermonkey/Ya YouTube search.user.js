// ==UserScript==
// @name         Ya YouTube search
// @name:en      Ya YouTube search
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Search videos in YouTube (from Yandex page).
// @description:en  Search videos in YouTube (from Yandex page).
// @description:ru  Поиск видео на YouTube со страниц Яндекса.
// @author       E11ipS0iD
// @match        https://yandex.ru/*
// @icon         https://www.ellipse-arts.ru/temp/fav.jpg
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  setTimeout(function () {
    var btn = document.querySelectorAll('.HeaderDesktopNavigation-Cutted .HeaderDesktopNavigation-Tab')[2];
    if (btn!==undefined) {
        btn.id = 'ytFromYa';
        btn.innerHTML = 'YouTube';
        var link = document.querySelectorAll('.HeaderDesktopForm-Input')[0].value;
        link = encodeURI(link);
        btn.href = 'https://www.youtube.com/results?search_query=' + link;
        return false;
    }
    var video = document.getElementsByClassName("VideoPlayerMetaInfo-SourceTextLine")[0];
    if (video!==undefined && video.innerHTML == '<b>YouTube</b>') {
        console.log('YouTube player - founded');
        document.location.replace(document.getElementsByClassName("LinkWrapper")[0].href);
        return false;
    }

  }, 200);

})();