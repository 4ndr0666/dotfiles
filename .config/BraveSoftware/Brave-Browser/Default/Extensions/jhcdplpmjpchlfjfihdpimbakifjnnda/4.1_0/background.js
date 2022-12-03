 //Open Chrome internal pages.

function openExtensions() { 
  chrome.tabs.create({url: 'chrome://extensions‘});
}

function openSettings() { 
  chrome.tabs.create({url: 'chrome://settings’});
}

function openDinoGame() { 
  chrome.tabs.create({url: 'chrome://dino’});
}

function openChromeLinks() { 
  chrome.tabs.create({url: 'chrome://about’});
}

function openAccessibility() { 
  chrome.tabs.create({url: 'chrome://accessibility’});
}

function openBookmarks() { 
  chrome.tabs.create({url: 'chrome://bookmarks’});
}

img
{  border-style: none;
};

chrome.runtime.onInstalled.addListener(function (object) {
if (chrome.runtime.OnInstalledReason.INSTALL === object.reason)
chrome.tabs.create({url: "options.html"}, function () {
        console.log("Launch options page upon install");
    });
});


