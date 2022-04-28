
$p.events.on_editor_load = function () {
    utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	utilQuerySelector(".ui-icon.ui-icon-clock.current-time", true).forEach(v => v.remove())
	utilQuerySelector(".ui-icon.ui-icon-person.current-user", true).forEach(v => v.remove())
	createFlow()

}

$p.events.on_grid_load = function () {
	utilAddButton('sumMove', '移動残集計', sumMove)
}