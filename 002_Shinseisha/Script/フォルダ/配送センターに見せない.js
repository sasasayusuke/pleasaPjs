// 管理者以外に見せない
async function hiddenFolder() {
    // 管理者グループか社長を取得
    let groupCodeJson = await utilExportGroupAjax([GROUP_ID_ADMIN, GROUP_ID_PRESIDENT])
    let groups = groupCodeJson.Response.Data

    let members = groups.map(v => v.GroupMembers.map(w => +w.split(",")[1])).flat(Infinity)
    if (!members.includes($p.userId())) {
        document.getElementById("SiteMenu").querySelector(`[data-value="${TABLE_ID_SHIIRESAKI}"]`).hidden = true
    }
}
hiddenFolder()