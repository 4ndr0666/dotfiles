let bookmarks = null, sidebar = null, list = document.createElement("ul"), isBookmarkExist = null;

function initSidebar() {
    sidebar = document.createElement("div"), sidebar.id = "new-tab-sidebar", sidebar.innerHTML = `<div class="wrap">\n        <img class="new-tab-logo" src="${chrome.runtime.getURL("img/128x128.png")}">\n        \n    </div>`, 
    sidebar.children[0].appendChild(generateBookmarksList()), document.body.appendChild(sidebar);
}

function generateBookmarksList() {
    let s = "";
    for (let i = 0; i < bookmarks.length; i++) bookmarks[i].pin && (s += `<li><a href="${bookmarks[i].url}"><img class="fav" src="${"https://www.google.com/s2/favicons?domain=" + bookmarks[i].url}"><span class="title">${bookmarks[i].title}</span></a></li>`);
    return s.length > 0 ? (isBookmarkExist = !0, sidebar.classList.remove("hidden")) : (isBookmarkExist = !1, 
    sidebar.classList.add("hidden")), list.innerHTML = s, list;
}

function checkSettings() {
    chrome.storage.local.get([ "showSidebar" ], (res => {
        1 == res.showSidebar && isBookmarkExist ? sidebar.classList.remove("hidden") : sidebar.classList.add("hidden");
    }));
}

function getBookmarks() {
    return new Promise((resolve => {
        chrome.storage.local.get([ "bookmarks" ], (res => {
            bookmarks = res.bookmarks, resolve(res.bookmarks);
        }));
    }));
}

chrome.runtime.onMessage.addListener((msg => {
    "update-sidebar" === msg.action && getBookmarks().then((res => {
        bookmarks = res, generateBookmarksList();
    }));
})), setTimeout((() => {
    getBookmarks().then((res => {
        bookmarks = res, initSidebar(), checkSettings(), window.onfocus = () => {
            checkSettings();
        };
    }));
}), 200);