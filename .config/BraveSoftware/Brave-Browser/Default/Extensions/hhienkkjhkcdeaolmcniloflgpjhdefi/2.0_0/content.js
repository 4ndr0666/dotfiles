function onClickHandler(info, tab) {
  var link = info.linkUrl;
  
  const redditPostUrlRegex = /https?:\/\/((www\.)|(pay\.)|(i\.)|(old\.)|(np\.)|(new\.))?reddit\.com\/((r)|(user)|(u))\/(\w+)\/comments\/([a-z0-9]{2,10})(\/?$|\/\w*)/im
  
  if (redditPostUrlRegex.test(link)) {
	 
	 chrome.tabs.create({
		url: "https://redditsave.com/r/"  + link.split("/r/")[1] + "?ref=ch"
	  });
         
     } else {
		 alert('This is not a valid reddit post')
     }
  
};
