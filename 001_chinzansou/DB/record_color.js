$p.events.on_grid_load = function () {
	window.setInterval(function() {
		utilQuerySelector('td.invalidation span', true)
		.filter(v => v.classList.contains('ui-icon-circle-check'))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains("invalid")) {
				v.parentNode.parentNode.classList.add('invalid')
			}
		})

		utilQuerySelector('td.expiration p.time', true)
		.filter(v => utilIsOverDate(v.innerHTML.split(' ')[0]))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains('expire')) {
				v.parentNode.parentNode.classList.add('expire')
			}
		})
	}, 500)

}