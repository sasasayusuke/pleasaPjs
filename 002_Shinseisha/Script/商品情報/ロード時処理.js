
$p.events.on_editor_load = function () {
	utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
	utilAddButton('checkOrder', '発注チケット作成', checkOrder)
}
