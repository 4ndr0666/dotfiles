var title = "Download Reddit Video - RedditSave";

chrome.contextMenus.create({
     "title": title,
     "contexts":["link"],
     "id": "all"
 });
 
chrome.contextMenus.onClicked.addListener(onClickHandler);
 
chrome.browserAction.onClicked.addListener(function(activeTab) {
    let host = "https://redditsave.com"

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url

        const redditPostUrlRegex = /https?:\/\/((www\.)|(pay\.)|(i\.)|(old\.)|(np\.)|(new\.))?reddit\.com\/((r)|(user)|(u))\/(\w+)\/comments\/([a-z0-9]{2,10})(\/?$|\/\w*)/im

        if (redditPostUrlRegex.test(url)) {
          let newPage = host + "/r/" + url.split("/r/")[1] + "?ref=ch"

          chrome.tabs.create({
              url: newPage
          });
        } else {
          alert('This is not a valid reddit post')
        }

    });

});
