function focusWansatiSideCart() {
	var firstFocusable = document.querySelector('#wansati-side-cart a, #wansati-side-cart button');

	if (!firstFocusable) {
		return;
	}

	window.setTimeout(function () {
		firstFocusable.focus();
	}, 80);
}

document.addEventListener('wansati:panel-open', function (event) {
	if (!event.detail || event.detail.id !== 'wansati-side-cart') {
		return;
	}

	focusWansatiSideCart();
});

if (window.jQuery) {
	window.jQuery(function ($) {
		$(document.body).on('added_to_cart', function () {
			var cartToggle = document.querySelector('[data-open-panel="wansati-side-cart"]');

			if (cartToggle) {
				cartToggle.click();
			}
		});
	});
}
