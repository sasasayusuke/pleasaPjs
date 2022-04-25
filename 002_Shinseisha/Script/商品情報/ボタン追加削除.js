
$p.events.on_editor_load = function () {
    let removeIds = ['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail']
    removeIds.forEach(v => document.getElementById(v).remove())
}

$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = checkOrder
	elem.innerText = '発注チケット作成'

	target.appendChild(elem)
}
