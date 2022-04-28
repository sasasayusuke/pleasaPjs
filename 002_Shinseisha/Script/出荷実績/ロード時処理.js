
$p.events.on_editor_load = function () {
    utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
	utilAddButton('sumAchievement', '出荷実績集計', sumAchievement)
}