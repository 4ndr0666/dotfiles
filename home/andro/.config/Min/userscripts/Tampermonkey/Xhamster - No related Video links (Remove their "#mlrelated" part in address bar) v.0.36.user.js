// ==UserScript==
// @name            Xhamster - No related Video links (Remove their "#mlrelated" part in address bar) v.0.36
// @version 0.36
// @description	    Remove "#mlrelated" part in address bar (when you open a related video from the Video page)
//
// @namespace https://greasyfork.org/users/7434
// @author janvier57

// @include https://*xhamster.com/movies/*
// @include https://xhamster.com/videos/*

// @include      https://*.xhamster.com/movies/*
// @include      https://*.xhamster.com/videos/*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @autor Phlegomatic  / janvier56
// FROM:  https://greasyfork.org/forum/discussion/comment/54300/#Comment_54300
// @grant none
// @run-at document-start

// ==/UserScript==

var Check = "#mlrelated"; // what you removed
var currentLocation = window.location.href; // get current URL

if(currentLocation.includes(Check)){ // check if contains
var URL = currentLocation.replace(Check, ""); // replace
window.location = URL; // goto adjusted URL
}