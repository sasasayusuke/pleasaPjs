
$p.events.on_editor_load = function () {
	utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	utilAddButton('download', download, 'ダウンロード')
}

$p.events.on_grid_load = function () {
	utilAddButton('createFormat', createFormat, 'フォーマット登録', 'display:none;')
}
