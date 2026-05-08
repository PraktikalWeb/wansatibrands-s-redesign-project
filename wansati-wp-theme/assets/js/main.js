(function () {
	function syncPanelTriggers(panelId, expanded) {
		document.querySelectorAll('[data-open-panel="' + panelId + '"]').forEach(function (trigger) {
			trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
		});
	}

	function syncSearchTriggers(expanded) {
		document.querySelectorAll('[data-open-search]').forEach(function (trigger) {
			trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
		});
	}

	function closeSearch() {
		var searchOverlay = document.getElementById('wansati-search-overlay');

		if (!searchOverlay) {
			return;
		}

		searchOverlay.classList.remove('is-active');
		searchOverlay.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('has-search-open');
		syncSearchTriggers(false);
		document.dispatchEvent(new CustomEvent('wansati:search-close'));
	}

	function closePanel(panelId) {
		var panel = document.getElementById(panelId);

		if (!panel) {
			return;
		}

		panel.classList.remove('is-active');
		panel.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('has-panel-open');
		syncPanelTriggers(panelId, false);
		document.dispatchEvent(new CustomEvent('wansati:panel-close', { detail: { id: panelId } }));
	}

	function closeAllPanels() {
		document.querySelectorAll('.wansati-panel.is-active').forEach(function (panel) {
			closePanel(panel.id);
		});
	}

	function openPanel(panelId) {
		var panel = document.getElementById(panelId);

		if (!panel) {
			return;
		}

		closeSearch();
		closeAllPanels();
		panel.classList.add('is-active');
		panel.setAttribute('aria-hidden', 'false');
		document.body.classList.add('has-panel-open');
		syncPanelTriggers(panelId, true);
		document.dispatchEvent(new CustomEvent('wansati:panel-open', { detail: { id: panelId } }));
	}

	function openSearch() {
		var searchOverlay = document.getElementById('wansati-search-overlay');

		if (!searchOverlay) {
			return;
		}

		closeAllPanels();
		searchOverlay.classList.add('is-active');
		searchOverlay.setAttribute('aria-hidden', 'false');
		document.body.classList.add('has-search-open');
		syncSearchTriggers(true);
		document.dispatchEvent(new CustomEvent('wansati:search-open'));
	}

	function initHeroSlider() {
		var hero = document.querySelector('[data-hero-slider]');

		if (!hero) {
			return;
		}

		var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
		var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-dot]'));
		var currentIndex = 0;

		if (slides.length < 2) {
			return;
		}

		function activate(index) {
			slides.forEach(function (slide, slideIndex) {
				slide.classList.toggle('is-active', slideIndex === index);
			});

			dots.forEach(function (dot, dotIndex) {
				dot.classList.toggle('is-active', dotIndex === index);
			});

			currentIndex = index;
		}

		dots.forEach(function (dot, index) {
			dot.addEventListener('click', function () {
				activate(index);
			});
		});

		window.setInterval(function () {
			activate((currentIndex + 1) % slides.length);
		}, 5000);
	}

	function initHeaderState() {
		var header = document.querySelector('[data-header]');
		var lastScrollY = window.scrollY;

		if (!header) {
			return;
		}

		function updateHeader() {
			var currentScrollY = Math.max(0, window.scrollY);
			var scrolledDown = currentScrollY > lastScrollY;

			header.classList.toggle('is-scrolled', currentScrollY > 24);
			header.classList.toggle('is-hidden', currentScrollY > 150 && scrolledDown);

			lastScrollY = currentScrollY;
		}

		window.addEventListener('scroll', updateHeader, { passive: true });
		updateHeader();
	}

	document.addEventListener('click', function (event) {
		var openPanelTrigger = event.target.closest('[data-open-panel]');
		var closePanelTrigger = event.target.closest('[data-close-panel]');
		var openSearchTrigger = event.target.closest('[data-open-search]');
		var closeSearchTrigger = event.target.closest('[data-close-search]');
		var panelBackdrop = event.target.classList.contains('wansati-panel') ? event.target : null;
		var searchBackdrop = event.target.classList.contains('wansati-search-overlay') ? event.target : null;

		if (openPanelTrigger) {
			event.preventDefault();
			openPanel(openPanelTrigger.getAttribute('data-open-panel'));
			return;
		}

		if (closePanelTrigger) {
			event.preventDefault();
			closePanel(closePanelTrigger.getAttribute('data-close-panel'));
			return;
		}

		if (openSearchTrigger) {
			event.preventDefault();
			openSearch();
			return;
		}

		if (closeSearchTrigger) {
			event.preventDefault();
			closeSearch();
			return;
		}

		if (panelBackdrop) {
			closePanel(panelBackdrop.id);
			return;
		}

		if (searchBackdrop) {
			closeSearch();
		}
	});

	document.addEventListener('keydown', function (event) {
		if (event.key !== 'Escape') {
			return;
		}

		closeSearch();
		closeAllPanels();
	});

	document.addEventListener('DOMContentLoaded', function () {
		initHeroSlider();
		initHeaderState();
	});
})();
