document.addEventListener('wansati:panel-open', function (event) {
	if (!event.detail || event.detail.id !== 'wansati-side-wishlist') {
		return;
	}

	var firstFocusable = document.querySelector('#wansati-side-wishlist a, #wansati-side-wishlist button');

	if (firstFocusable) {
		window.setTimeout(function () {
			firstFocusable.focus();
		}, 80);
	}
});
