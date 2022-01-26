
$p.events.on_grid_load = function () {
	window.setInterval(function() {
		Array.from(document.querySelectorAll('td.invalidation span'))
		.filter(v => v.classList.contains('ui-icon-circle-check'))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains("invalid")) {
				v.parentNode.parentNode.classList.add('invalid')
			}
		})

		Array.from(document.querySelectorAll('td.expiration p.time'))
		.filter(v => utilIsOverDate(v.innerHTML.split(' ')[0]))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains('expire')) {
				v.parentNode.parentNode.classList.add('expire')
			}
		})
	}, 500)

}