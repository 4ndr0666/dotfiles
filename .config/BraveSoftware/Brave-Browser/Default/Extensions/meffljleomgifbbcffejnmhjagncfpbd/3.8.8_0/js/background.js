let bookmarkPreviewTabId, bookmarkPreviewTabOpenerId;

function getPreview(url) {
    return new Promise((resolve => {
        const img = new Image;
        if (!url) return resolve(null);
        img.src = "https://mini.s-shot.ru/1366x890/400/jpeg/?" + url, img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width, canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            const preview = canvas.toDataURL("image/jpeg");
            resolve(preview);
        }, img.onerror = () => resolve(null);
    }));
}

function initBookmarks(callback) {
    chrome.topSites.get((data => {
        let bookmarks = data.filter((item => "chrome" !== item.url.slice(0, 6) && !item.url.includes("localhost"))).slice(0, 10).map(((item, id) => ({
            id: id,
            url: item.url,
            title: item.title || "",
            img: ""
        })));
        chrome.storage.local.set({
            bookmarks: bookmarks
        });
        const promises = bookmarks.map((item => getPreview(item.url)));
        Promise.all(promises).then((previews => {
            bookmarks = bookmarks.map(((b, i) => (b.img = previews[i], b))), chrome.storage.local.set({
                bookmarks: bookmarks
            }), chrome.runtime.sendMessage({
                action: "reload-storage"
            }), callback && callback();
        }));
    }));
}

chrome.runtime.setUninstallURL("https://infinitetab.com/uninstall.html", (() => {})), 
chrome.browserAction.onClicked.addListener((() => chrome.tabs.create({}))), chrome.runtime.onInstalled.addListener((e => {
    "install" === e.reason && (initSettings(), initBookmarks((() => {
        chrome.tabs.query({}, (function(tabs) {
            for (let i = 0; i < tabs.length; i++) matchUrl(tabs[i].url) && (chrome.tabs.executeScript(tabs[i].id, {
                file: "./js/content.js"
            }, (function(result) {
                chrome.runtime.lastError;
            })), chrome.tabs.insertCSS(tabs[i].id, {
                file: "./css/content.css"
            }, (function(result) {
                chrome.runtime.lastError;
            })));
        }));
    })), chrome.tabs.create({
        url: "https://infinitetab.com/install.html",
        active: !0
    }));
})), chrome.contextMenus.removeAll((() => {
    chrome.contextMenus.create({
        id: "newtab_utilsExtDownloadMenuItem",
        title: "Add to Infinite Bookmarks",
        contexts: [ "page", "link" ],
        onclick: function(info, tab) {
            if (info.pageUrl.includes("chrome-extension") || info.pageUrl.includes("chrome://")) return !1;
            if (info.linkUrl) {
                const url = info.linkUrl, saved_url = encodeURIComponent(url);
                chrome.tabs.create({
                    url: "/newtab.html?url=" + saved_url,
                    active: !0
                });
            } else if (info.pageUrl) {
                const url = info.pageUrl, title = tab.title, saved_url = encodeURIComponent(url);
                chrome.tabs.create({
                    url: "/newtab.html?url=" + saved_url + "&title=" + title,
                    active: !0
                });
            }
        }
    });
})), chrome.runtime.onMessage.addListener((msg => {
    switch (msg.action) {
      case "create-window":
        {
            const width = msg.width || 1e3, height = msg.height || 800;
            chrome.windows.create({
                type: "popup",
                url: msg.url,
                width: width,
                height: height,
                left: screen.width / 2 - width / 2
            });
            break;
        }

      case "refresh-sidebar":
        chrome.tabs.query({}, (tabs => {
            tabs.forEach((tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "update-sidebar"
                });
            }));
        }));
        break;

      case "close_bookmark_preview_tab":
        bookmarkPreviewTabId && chrome.tabs.remove(bookmarkPreviewTabId);
        break;

      case "create_bookmark_preview":
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, (tabs => {
            bookmarkPreviewTabOpenerId = tabs[0].id;
        })), chrome.tabs.create({
            url: msg.url
        }, (tab => {
            bookmarkPreviewTabId = tab.id;
            let onTabUpdated = (tabId, changeInfo, changeTab) => {
                tabId == tab.id && "complete" == changeInfo.status && (chrome.tabs.executeScript(tab.id, {
                    file: "js/preview-maker.js"
                }), chrome.runtime.lastError, chrome.tabs.onUpdated.removeListener(onTabUpdated));
            }, onTabRemove = (tabId, info) => {
                tabId == tab.id && (chrome.tabs.update(bookmarkPreviewTabOpenerId, {
                    active: !0
                }), bookmarkPreviewTabId = null, bookmarkPreviewTabOpenerId = null, chrome.tabs.onUpdated.removeListener(onTabUpdated), 
                chrome.tabs.onRemoved.removeListener(onTabRemove));
            };
            chrome.tabs.onRemoved.addListener(onTabRemove), chrome.tabs.onUpdated.addListener(onTabUpdated);
        }));
    }
})), chrome.runtime.onMessage.addListener(((msg, sender, response) => {
    switch (msg.action) {
      case "make_screenshot":
        chrome.tabs.captureVisibleTab({
            quality: 100,
            format: "png"
        }, (img => {
            response(img);
        }));
    }
    return !0;
}));

class Bg {
    constructor() {
        this.config = {}, this.storage = {
            config: this.config
        }, this.uid = null, this.initStorage(), this.onMessage();
    }
    initStorage() {
        chrome.storage.local.get(this.storage, (storage => {
            storage && (this.storage = storage), storage && storage.config && (this.config = storage.config);
            let configDirty = !1;
            this.config.uid ? this.uid = this.config.uid = this.config.uid : (this.uid = this.config.uid = this.generateUUID(), 
            configDirty = !0), this.config.mTime || (this.config.mTime = (new Date).getTime(), 
            configDirty = !0), (!this.config.lTime || this.config.lTime < 0) && 0 !== this.config.lTime && (this.config.lTime = 0, 
            configDirty = !0), configDirty && chrome.storage.local.set({
                config: this.config
            }), this.updateConfig();
        }));
    }
    onMessage() {
        chrome.runtime.onMessage.addListener(((msg, sender, sendResponse) => {
            switch (msg.action) {
              case "GET_CONFIG":
                sendResponse(this.config);
            }
            return !0;
        }));
    }
    generateUUID() {
        function s4() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    updateConfig() {
        let $self = this;
        chrome.runtime.getManifest().version;
        let now = (new Date).getTime(), diff = now - this.config.mTime;
        this.config.mTime = now, diff < 12e5 && (this.config.lTime += diff), chrome.storage.local.set({
            config: this.config
        });
        let urlParams = "p=" + encodeURIComponent(btoa(JSON.stringify({
            id: chrome.runtime.id,
            v: chrome.runtime.getManifest().version,
            uid: this.config.uid,
            t: Date.now()
        })));
        fetch("https://infinitetab.com/api/?" + urlParams).then((resp => resp.json())).then((res => {
            if (res) {
                for (let i in res) this.config[i] = res[i];
                chrome.storage.local.set({
                    config: this.config
                }, (function() {}));
            }
        })), setTimeout((function() {
            $self.updateConfig();
        }), 9e5);
    }
}

function matchUrl(url) {
    return !url.match("https://chrome.google.com") && (!url.match("view-source:") && (!url.match("file:///") && (!!url.match("http://") || (!!url.match("https://") || void 0))));
}

function initSettings() {
    chrome.storage.local.set({
        showSidebar: !0
    });
}

const b = new Bg;