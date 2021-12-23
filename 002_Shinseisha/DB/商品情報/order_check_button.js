$p.events.on_grid_load = function () {
	target = utilQuerySelector('div#MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = function() {
		alert('発注チェック')
	}
	elem.innerText = '発注チェック'

	target.appendChild(elem)

}

