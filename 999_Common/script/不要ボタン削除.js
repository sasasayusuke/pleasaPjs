$p.events.on_grid_load_arr.push(function () {
	// 不要ボタン削除
    commonRemoveElements(['BulkDeleteCommand', 'EditImportSettings', 'OpenExportSelectorDialogCommand'])
})
$p.events.on_editor_load_arr.push(function () {
	// 不要ボタン削除
    let removes = ['OpenCopyDialogCommand', 'DeleteCommand', 'EditOutgoingMail']
    // コメントのｘ削除
    let i = 1
    while (document.getElementById("DeleteComment," + i)) {
        removes.push("DeleteComment," + i++)
    }
    commonRemoveElements(removes)
})