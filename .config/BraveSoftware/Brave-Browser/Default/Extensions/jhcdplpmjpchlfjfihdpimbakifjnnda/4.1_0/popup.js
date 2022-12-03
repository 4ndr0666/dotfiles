
function read_options() {
  // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
    shortcuts: true,
    settings: true,
    devtools: true,
    about: true,
    review: true                            
    },                          
    function(items) {
    tfShortcuts = items.shortcuts;
    tfSettings = items.settings;
    tfDevTools = items.devtools;
    tfAbout = items.about;
    tfReview = items.review;
    
    if (tfSettings == 0) {document.getElementById("SettingsLink").addEventListener('click', function () {chrome.tabs.create({active: true, url: "chrome://settings"});}); document.getElementById("SettingsLink").href = "chrome://settings/"; document.getElementById("carrot1").innerHTML =""; }
    if (tfAbout == 0) {document.getElementById("AboutLink").addEventListener('click', function() {chrome.tabs.create({active: true, url: "chrome://settings/help"});}); document.getElementById("AboutLink").href = "chrome://about/"; document.getElementById("carrot5").innerHTML =""; }
    if (tfDevTools == 0) {document.getElementById("DevToolsLink").addEventListener('click',function() {chrome.tabs.create({active: true, url: "chrome://inspect"});}); document.getElementById("carrot2").innerHTML = ""; }
    if (tfShortcuts == 0) {document.getElementById("shortcut1").innerHTML = ""; document.getElementById("shortcut2").innerHTML = ""; document.getElementById("shortcut3").innerHTML = ""; document.getElementById("shortcut4").innerHTML = "";}
    if (tfReview == 0) {list1 = document.getElementById("remove1"); list1.removeChild(list1.childNodes[0]);}
  });

}
document.addEventListener('DOMContentLoaded', read_options);


function linkToSettings() {
    var setlink = document.getElementsByName("SettingsLink");
    for (var i = 0; i < setlink.length; i++) {
        (function () {
            var aln = setlink[i];
            var location = aln.href;
            aln.onclick = function () {
                chrome.tabs.create({active: true, url: "chrome://settings"});
            };
        })();
    }
}

function linkToAbout() {
    var abtlinks = document.getElementsByName("AboutLink");
    for (var i = 0; i < abtlinks.length; i++) {
        (function () {
            var ln = abtlinks[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByName("ChromeLink");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

function hello() {
  chrome.tabs.executeScript({
    file: 'alert.js'
  }); 
}

document.getElementById('clickme').addEventListener('click', hello);

function justdoit() {
chrome.tabs.query({lastFocusedWindow: true, active: true}, function (tab) {
  var tabUrl = tab[0].url;
  var myNewUrl = "view-source:" + tabUrl;

chrome.tabs.update(tab.id, {url: myNewUrl});
}); 
};


document.getElementById('tryitnow').addEventListener('click', justdoit);

document.getElementById('go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});