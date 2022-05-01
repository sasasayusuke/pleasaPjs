
$p.events.on_editor_load = function () {
	utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	utilAddButton('download', 'ダウンロード', download)
}

$p.events.on_grid_load = function () {
	utilAddButton('createFormat', 'フォーマット登録', createFormat)
}
