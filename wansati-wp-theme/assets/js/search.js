function focusWansatiSearchOverlay() {
	var searchInput = document.querySelector('[data-search-overlay-input]');

	if (!searchInput) {
		return;
	}

	window.setTimeout(function () {
		searchInput.focus();
		searchInput.select();
	}, 80);
}

function initWansatiSearchForms() {
	document.querySelectorAll('.wansati-search-form').forEach(function (form) {
		form.addEventListener('submit', function (event) {
			var searchInput = form.querySelector('input[type="search"]');

			if (!searchInput) {
				return;
			}

			searchInput.value = searchInput.value.trim();

			if (!searchInput.value) {
				event.preventDefault();
				searchInput.focus();
				return;
			}

			var searchOverlay = document.getElementById('wansati-search-overlay');

			if (searchOverlay && searchOverlay.classList.contains('is-active')) {
				searchOverlay.classList.remove('is-active');
				searchOverlay.setAttribute('aria-hidden', 'true');
				document.body.classList.remove('has-search-open');
			}
		});
	});
}

document.addEventListener('wansati:search-open', focusWansatiSearchOverlay);
document.addEventListener('DOMContentLoaded', initWansatiSearchForms);
