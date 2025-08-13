// ==UserScript==
// @name         Close new tabs for ptc websites
// @namespace    Close new tabs for ptc websites
// @version      0.6
// @description  Closes the newly opened tabs when clicked from another tab
// @author       engageub
// @match        *://*/*
// @run-at       document-start
// @grant        window.close

// ==/UserScript==
//Stopping Alert and confirm window
unsafeWindow.alert=function(){};
unsafeWindow.confirm = function(){};



(function() {
    'use strict';


    //Close by Window Name for dropz website
    setTimeout(function(){
        if(window.self == top  && window.name == "popUpWindowMyDropz"){
            window.close();
        }
    },10000)
    
    //Close by window Name for everve
    setTimeout(function(){
        if(window.self == top  && (window.name == "EvervepopUpWindow")){
            window.close();
        }
    },40000)
    
    //If the url is stopped in shortlinks, move to previous url after 120 seconds
    if(window.self == top && window.name.includes("https://")){
        setTimeout(function(){
            let url = window.name;
            if(!url.includes(window.location.hostname)){
                window.name = "nextWindowUrl";
                window.location.href = url;
            }
        },120000)
    }


    //The timeout set is 120 seconds, you can change this accordingly
    if(window.self == top && window.history.length == 1){
        setTimeout(function(){
            window.close();
        },120000);
    }


})();