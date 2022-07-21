// 不要項目削除
$p.events.on_editor_load_arr.push(function () {
    commonRemoveElements(['NewMenuContainer', 'OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
})