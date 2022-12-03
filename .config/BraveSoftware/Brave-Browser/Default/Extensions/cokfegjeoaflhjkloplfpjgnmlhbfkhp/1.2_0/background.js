
var get_host = function(url) {
	var a = document.createElement('a');
	a.href = url;
	return a.hostname;
};

var set_badge = function(velocity, tabId) {		
	var text = velocity == 0 ? '' : velocity > 0 ?
		'↓' + Math.round(velocity * 50) :
		'↑' + Math.round(-velocity * 50);
	chrome.browserAction.setBadgeText({ 'text': text, 'tabId': tabId });
	chrome.browserAction.setBadgeBackgroundColor({
		'color': '#97c8ec', 
		'tabId': tabId
	});
};

chrome.runtime.onMessage.addListener(
	function(msg, sender, callback) {
		if(typeof sender.tab === 'undefined') return;
		var tabId = sender.tab.id;
		var url = get_host(sender.tab.url);

		if(typeof msg.velocity === 'undefined') {
			set_badge(0, tabId);
			chrome.storage.sync.get(url, function(result) {
				
				if(typeof result[url] === 'undefined') {
					
					chrome.storage.sync.get('default', function(result) {
						if(typeof result.default === 'undefined') {
							callback({ velocity: 2/50 });
							set_badge(2/50, tabId);
						} else {
							callback({ velocity: result.default });
							set_badge(result.default, tabId);
						}
					});

				} else {
					callback({ velocity: result[url] });
					set_badge(result[url], tabId);
				}
			});
			return true;
		} else {
			set_badge(msg.velocity, tabId);
			return false;
		}

	}
);
