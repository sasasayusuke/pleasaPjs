
$p.events.on_editor_load = function () {
    let removeIds = ['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail']
    removeIds.forEach(v => document.getElementById(v).remove())
}

$p.events.on_grid_load = function () {
	let target = document.getElementById('MainCommands')
	let elemMove = document.createElement('button')
	elemMove.id='sumMove'
	elemMove.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elemMove.onclick = sumMove
	elemMove.innerText = '移動残集計'
	target.appendChild(elemMove)

	let elemLinkage = document.createElement('button')
	elemLinkage.id='linkageSMILE'
	elemLinkage.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elemLinkage.onclick = linkageSMILE
	elemLinkage.innerText = 'SMILE連携'

	target.appendChild(elemLinkage)
}