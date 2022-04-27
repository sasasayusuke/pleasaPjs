
$p.events.on_editor_load = function () {
    removeElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
	addButton('sumAchievement', '出荷実績集計', sumAchievement)
}