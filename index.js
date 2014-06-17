! function(name, definition) {
	if (typeof module != 'undefined' && module.exports) module.exports = definition();
	else if (typeof define == 'function') define(definition);
	else this[name] = definition();
}('sticky', function() {

	var requiredOriginStyles = ['position', 'top', 'left', 'z-index'];

	return function(selector, top) {

		var elements = document.querySelectorAll(selector);
		if (!elements || elements.length == 0) {
			return;
		}

		Array.prototype.forEach.call(elements, function(el) {
			sticky(el, top);
		});
	}

	function sticky(el, top) {
		var requiredTop = top || 0;
		var originRect = el.getBoundingClientRect();
		var originTop = originRect.top + window.pageYOffset;
		var originLeft = originRect.left + window.pageXOffset;

		var styles = {
			position: 'fixed',
			top: requiredTop + 'px',
			left: originLeft + 'px',
			'z-index': 9999,
			width: originRect.width
		}

		var originStyles = {}
		requiredOriginStyles.forEach(function(key) {
			originStyles[key] = el.style[key];
		});

		var onscroll;
		if (window.onscroll) {
			onscroll = window.onscroll;
		}
		window.onscroll = function() {
			if (window.pageYOffset > originTop - requiredTop) {
				for (key in styles) {
					el.style[key] = styles[key];
				}
			} else {
				for (key in originStyles) {
					el.style[key] = originStyles[key];
				}
			}
			onscroll && onscroll()
		}
	}

});