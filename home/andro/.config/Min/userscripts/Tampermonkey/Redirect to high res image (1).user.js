// ==UserScript==
// @name        Redirect to high res image
// @namespace   RedirectToHiRes
// @include     *imagetwist.com/*
// @include     *imgspice.com/*
// @include     *turboimagehost.com/*.html
// @include     *acidimg.cc/*
// @include     *imx.to/*
// @include     *pixhost.to/*
// @include     *imagebam.com/*
// @include     *imgbox.com/*
// @include     *kropic.com/*
// @include     *vipr.im*
// @include     /.*imagevenue\.com\/[^\/]+/
// @grant       none
// @version     1.3
// @author      codingjoe
// @description Automatically redirects the browser to the full resolution image for any landing page on imagetwist.com imgspice.com acidimg.cc imx.to pixhost.to imagebam.com imgbox.com kropic.com vipr.im
// @run-at      document-idle
// @license     MIT
// ==/UserScript==


function goToImage() {
    location.href = document.querySelector(".centred").src;
}

(function() {
    'use strict';
    let img;

    if (location.href.includes("imagetwist.com")) {
        let arr = Array.from(document.querySelectorAll("a")).filter(r => r.innerText === "Continue to your image");
        img = document.querySelector(".pic");

        if (img) {
            location.href = img.src;
        } else {
            if (arr.length > 0) {
                arr[0].click();
            }
        }
    } else if (location.href.includes("imgspice.com")) {
        img = document.querySelector("#imgpreview");
        
        if (img) {
            location.href = img.src;
        }
    } else if (location.href.includes("turboimagehost.com")) {
        img = document.querySelector(".uImage");
        
        if (img) {
            location.href = img.src;
        }
    } else if (location.href.includes("acidimg.cc")) {
        let btn = document.querySelector("input[type=submit]");

        if (btn) {
            btn.click();

            window.setTimeout(function() {
              goToImage();
            }, 2000);
        } else {
            goToImage();
        }
    } else if (location.href.includes("imx.to")) {
        let blueButton = document.querySelector(".button") || document.querySelector("#continuebutton");

        if (blueButton != null) {
            blueButton.click();
            window.setTimeout(function() {
                goToImage();
            }, 500);
        } else {
            goToImage();
        }
    } else if (location.href.includes("pixhost.to")) {
        img = document.querySelector("img#image");
        
        if (img) {
            // redirect to full res
            location.href = img.src;
        }
    } else if (location.href.includes("imagebam.com")) {
        let anchor = Array.from(document.querySelectorAll("a")).filter(r => r.innerText === "Continue to your image");
        img = document.querySelector("img.main-image");
        
        if (img) {
            // redirect to full res
            location.href = img.src;
        } else {
            if (anchor.length > 0) {
                // click "Continue to your image"
                anchor[0].click();
            }
        }
    } else if (location.href.includes("imgbox.com")) {
        img = document.querySelector("img.image-content");
        
        if (img) {
            // redirect to full res
            location.href = img.src;
        }
    } else if (location.href.includes("kropic.com")) {
        let btn = Array.from(document.querySelectorAll("input[type='submit']")).filter(r => r.value === "Continue to image...");
        let img = document.querySelector("img.pic");
        
        if (img) {
            // redirect to full res
            location.href = img.src;
        } else {
            if (btn.length > 0) {
                // click "Continue to image..."
                btn[0].click();
            }
        }
    } else if (location.href.includes("vipr.im")) {
        img = document.querySelector(".img-responsive");

        if (img) {
            location.href = img.src;
        }
    } else if (location.href.includes("imagevenue")) {
        let div = Array.from(document.querySelectorAll("div.row")).filter(r => r.className == "row" && r.querySelectorAll("img").length == 1);
        
        if (div.length > 0) {
            img = div[0].querySelector("img[alt]");
            
            if (img) {
                location.href = img.src;
            }
        }
    }
    
    return false;
})();
