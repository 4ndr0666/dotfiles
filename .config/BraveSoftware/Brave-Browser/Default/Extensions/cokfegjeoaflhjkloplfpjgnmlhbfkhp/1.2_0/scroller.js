(function() {

	var velocity = 0;
	var pressed_key = 0;

	var velocity_updated = function() {
		chrome.runtime.sendMessage( { "velocity": velocity } );
	};

	chrome.runtime.sendMessage({}, function(response) {
		velocity = response.velocity;
	});

	document.addEventListener('keydown', function(e) {
		if(e.ctrlKey && !e.shiftKey && !e.altKey && (e.which >= 37) && (e.which <= 40)) {
			if((pressed_key == 0) || (pressed_key == e.which)) {
				pressed_key = e.which;
			} else {
				pressed_key = 0;
				velocity = 0;
				velocity_updated();
			}
			e.stopPropagation();
			e.preventDefault();
		}
	}, true);

	document.addEventListener('keyup', function(e) {
		if(e.ctrlKey && !e.shiftKey && !e.altKey && (e.which >= 37) && (e.which <= 40)) {
			pressed_key = 0;
			e.stopPropagation();
			e.preventDefault();
		}
	}, true);

	var animate = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(f) { setTimeout(f, 1000 / 60); };

	var cumulated = 0;

	var step = function() {
		animate(step);
		
		if(pressed_key == 40) {
			velocity += 0.01;
			velocity_updated();
		} else if(pressed_key == 38) {
			velocity -= 0.01;
			velocity_updated();
		} else if((pressed_key == 39) || (pressed_key == 37)) {
			velocity = 0;
			pressed_key = 0;
			velocity_updated();
		}
		cumulated += velocity;
		if(Math.abs(cumulated) >= 1) {
			var scr = Math.round(cumulated);
			window.scrollBy(0, scr);
			cumulated -= scr;
		}
	};

	animate(step);

})();
