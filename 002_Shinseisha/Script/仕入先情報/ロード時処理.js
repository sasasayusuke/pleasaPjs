
$p.events.on_grid_load = function () {
    removeTable()
}
$p.events.on_editor_load = function () {
    utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
    removeTable()
}

// 管理者以外に見せない
async function removeTable() {
    // 管理者グループか社長を取得
    let groupCodeJson = await utilExportGroupAjax([GROUP_ID_ADMIN, GROUP_ID_PRESIDENT])
    let groups = groupCodeJson.Response.Data

    let members = groups.map(v => v.GroupMembers.map(w => +w.split(",")[1])).flat(Infinity)
    if (!members.includes($p.userId())) {
        document.getElementById("MainForm").remove()
        utilSetMessage("権限がないので参照できません。", WARNING)
    }
}