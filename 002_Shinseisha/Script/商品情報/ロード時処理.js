
$p.events.on_editor_load = function () {
	removeElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
	addButton('checkOrder', '発注チケット作成', checkOrder)
}
