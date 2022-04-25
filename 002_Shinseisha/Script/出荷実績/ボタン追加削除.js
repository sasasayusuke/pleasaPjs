
$p.events.on_editor_load = function () {
    let removeIds = ['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail']
    removeIds.forEach(v => document.getElementById(v).remove())
}

$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumAchievement'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumAchievement
	elem.innerText = '出荷実績集計'

	target.appendChild(elem)
}