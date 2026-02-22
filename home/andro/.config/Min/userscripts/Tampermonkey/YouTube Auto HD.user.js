// ==UserScript==
// @author      yasingedik
// @name        YouTube Auto HD
// @namespace   m
// @include     *.youtube.com/watch*
// @downloadURL	https://openuserjs.org/install/yasingedik/m/YouTube_Auto_HD.user.js
// @updateURL   https://openuserjs.org/install/yasingedik/m/YouTube_Auto_HD.user.js
// @version     1.1
// ==/UserScript==

var customQuality = true;
var quality = "720"; // ["240", "360", "480", "720", "1080"]

if (customQuality)
{
	var qualitySwap = {"240":"small", "360":"medium", "480":"large", "720":"hd720", "1080":"hd1080"};

	unsafeWindow.onYouTubePlayerReady = function (playerId) {
		location.href = 'javascript:void((function () { document.getElementById("movie_player").setPlaybackQuality("' + qualitySwap[quality] + '"); })())';
	};
}
