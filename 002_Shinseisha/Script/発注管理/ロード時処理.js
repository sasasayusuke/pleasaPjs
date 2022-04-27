
$p.events.on_editor_load = function () {
    removeElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	createFlow()

}

$p.events.on_grid_load = function () {
	addButton('sumMove', '移動残集計', sumMove)
	addButton('linkageSMILE', 'SMILE連携', linkageSMILE)
}