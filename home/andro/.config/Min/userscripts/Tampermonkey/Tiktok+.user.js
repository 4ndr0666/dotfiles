// ==UserScript==
// @name         Tiktok+
// @namespace    https://greasyfork.org/en/users/175554-reissfeld
// @version      1.3
// @description  add download button & see thumbnail button
// @author       Reissfeld
// @match        https://www.tiktok.com/*
// @icon         https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tiktok.com&size=48
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @license      GNU-V3.0
// @grant        GM_openInTab
// ==/UserScript==
'use strict';
function div(){
    return document.createElement('div')
}

function dltik(link){
    var conta = document.querySelector('.tiktok-5uccoo-DivVideoContainer')
    if(conta != null){
        if(document.querySelectorAll('.downloadtik').length < 1){
            var d = div()
            d.setAttribute('class',"downloadtik")
            d.style = 'position: absolute;bottom: 18px;left: 20px;display: flex;flex-direction: row;'
            var a = document.createElement('a')
            a.setAttribute('href',link)
            a.setAttribute('class','link')
            a.setAttribute('target','_blank')
            a.style = 'background-image: url("https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/arrow-d87dd7466edf4162275ad393d58d2f40.svg");transform: rotate(270deg);background-size: 40px;width: 40px; height: 40px;'
            /*var down = document.createElement('img')
            down.setAttribute('src','https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/web/node/_next/static/images/arrow-d87dd7466edf4162275ad393d58d2f40.svg;')
            down.setAttribute('style','transform: rotate(270deg);width: 40px;')
            a.append(down)*/
            d.append(a)
            var b = document.createElement('a')
            b.setAttribute('class','BG')
            b.setAttribute('href',document.querySelector('.tiktok-7tjqm6-DivBlurBackground').style.backgroundImage.split('"')[1])
            b.setAttribute('target','_blank')
            b.style = 'background-image: url("https://i.imgur.com/p2jeroR.png");background-size: 40px;width: 40px; height: 40px; margin: 0 5px;'
            d.append(b)
            conta.append(d)
        }
        document.querySelector('a.link').href = document.querySelector('video').src
        document.querySelector('a.BG').href = document.querySelector('.tiktok-7tjqm6-DivBlurBackground').style.backgroundImage.split('"')[1]
    }
}

function set(a1,a2){
    document.title = '@'+a1+' - '+a2;
}

function bgImg(){
    var bg = document.querySelector('.video-card-browse').style.backgroundImage.split('"')[1]
    return bg
}
var css = document.createElement('style')
css.innerHTML = `.link:hover, .BG:hover{
        opacity: 0.7;
    }`
css.setAttribute("type","text/css")
document.querySelector('html').append(css);

function warn(){
    if(document.querySelector('.tiktok-1rijwot-DivWarnInfoPosition') != null){
        document.querySelector('.downloadtik').style.bottom = "60px";
    }else{
        document.querySelector('.downloadtik').style.bottom = "18px";
    }
}
//function to enabling control
function enabctrl(){
    if(document.querySelector('video').controls == false){
        document.querySelector('video').controls = true;
        document.querySelector('video').volume = 0.3;
        document.querySelector('video').muted = false;
    }
}

$(document).keydown(function(keyPressed) {
    //press "Ins" to download
    if (keyPressed.keyCode == 45) {
        GM_openInTab (document.querySelector('video').src);
    }
    //press "right arrow" to open profile
    if (keyPressed.keyCode == 39) {
        GM_openInTab (document.querySelector('[data-e2e="browse-user-avatar"]').href);
    }
    //press "left arrow" to open sound
    if (keyPressed.keyCode == 37) {
        GM_openInTab (document.querySelector('[data-e2e="browse-music"] > a').href);
    }
    //press "comma button" to go backward 5 seconds and "shift + comma button" to backward 1 second
    if(keyPressed.shiftKey && keyPressed.keyCode == 188) {
        let vid_currentTime = document.querySelector('video').currentTime;
        document.querySelector('video').currentTime = vid_currentTime - 1;
    }else if(keyPressed.keyCode == 188) {
        let vid_currentTime = document.querySelector('video').currentTime;
        document.querySelector('video').currentTime = vid_currentTime - 5;
    }
    //press "period button" to go backward 5 seconds and "shift + period button" to backward 1 second
    if(keyPressed.shiftKey && keyPressed.keyCode == 190) {
        let vid_currentTime = document.querySelector('video').currentTime;
        document.querySelector('video').currentTime = vid_currentTime + 1;
    }else if(keyPressed.keyCode == 190) {
        let vid_currentTime = document.querySelector('video').currentTime;
        document.querySelector('video').currentTime = vid_currentTime + 5;
    }
});

setInterval(function start(){
    var user = document.querySelector('[data-e2e="browse-username"]');
    var desc = document.querySelector('[data-e2e="browse-video-desc"]');
    var txt;
    if (user == undefined){
        if(location.pathname.includes('/music/') == true){
            let title = document.querySelector('[data-e2e="music-title"]')
            if(title != null){
                let profile = document.querySelector('[data-e2e="music-creator"]').innerText
                document.title = title.innerText+' by '+profile+' | Music on Tiktok'
                enabctrl()
            }else{
                document.title = "This sound isn't available."
            }
        }else if(location.pathname.includes('@') == true){
            let profile = document.querySelector('[data-e2e="user-subtitle"]').innerText
            let title = document.querySelector('[data-e2e="user-title"]').innerText
            document.title = profile+' (@'+title+')';
        }else{
            document.title = 'TikTok - Make Your Day'
        }
    }else{
        if (desc != null){
            set(user.innerText,desc.innerText)
            dltik(document.querySelector('video').src)
            warn()
        }else{
            set(user.innerText,'')
            dltik(document.querySelector('video').src)
            warn()
        }
    }

}, 1000);