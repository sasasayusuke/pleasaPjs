
let removeIds = ['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail']
$p.events.on_editor_load = function () {
    removeIds.forEach(v => document.getElementById(v).remove())
}