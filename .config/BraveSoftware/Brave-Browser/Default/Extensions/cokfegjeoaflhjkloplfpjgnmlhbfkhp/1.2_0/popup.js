var print = function() {
	chrome.storage.sync.get(null, function(result) {
		console.log(result);
	});
};

window.addEventListener('load', function() {
	var getHost = function(url) {
		var a = document.createElement('a');
		a.href = url;
		return a.hostname;
	};

	var get = function(id) {
		return document.getElementById(id);
	};

	var site = 'unknown';

	chrome.tabs.getSelected(null, function(tab) {
		site = getHost(tab.url);
		get('domain').innerText = site;

		chrome.storage.sync.get(site, function(result) {
			if(typeof result[site] === 'undefined') {
				get('site_enabled').checked = false;
				get('site').value = 0;
				get('site_span').innerText = '0';
			} else {
				get('site_enabled').checked = true;
				get('site').value = Math.round(result[site] * 50);
				get('site_span').innerText = '' + Math.round(result[site] * 50);
			}
		});	
	});

	get('default').addEventListener('change', function(event) {
		var v = event.target.valueAsNumber / 50;
		chrome.storage.sync.set({ default: v });
		get('default_span').innerText = '' + Math.round(v * 50);
	}, false);

	get('site').addEventListener('change', function(event) {
		var v = event.target.valueAsNumber / 50;
		var patch = {};
		patch[site] = v;
		chrome.storage.sync.set(patch);
		get('site_enabled').checked = true;
		get('site_span').innerText = '' + Math.round(v * 50);
	}, false);

	get('site_enabled').addEventListener('change', function(event) {
		if(event.target.checked) {
			var patch = {};
			patch[site] = get('site').valueAsNumber / 50;
			chrome.storage.sync.set(patch);
		} else {
			chrome.storage.sync.remove(site);
		}
	}, false);

	chrome.storage.sync.get('default', function(result) {
		if(typeof result.default === 'undefined') {
			result.default = 2/50;
			chrome.storage.sync.set(result);
		}

		get('default_span').innerText = '' + Math.round(result.default * 50);
		get('default').value = Math.round(result.default * 50);
		
	});

}, false);
