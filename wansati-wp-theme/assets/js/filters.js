document.addEventListener('click', function (event) {
	var toggle = event.target.closest('[data-filter-toggle]');

	if (!toggle) {
		return;
	}

	var targetId = toggle.getAttribute('data-filter-toggle');
	var target = document.getElementById(targetId);

	if (!target) {
		return;
	}

	event.preventDefault();
	target.classList.toggle('is-open');
	toggle.classList.toggle('is-open');
});
