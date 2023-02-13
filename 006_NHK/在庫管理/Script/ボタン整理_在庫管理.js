
// ======　一覧　===========================
$p.events.on_grid_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveGridButtons("検索", "一括削除", "インポート", "エクスポート")
    // ボタン追加
    commonAddButton('updateReport', searchDuplicate, 'PC名重複検索', "重複しているPC名を検索します", "", "ui-icon-search")

})
// ======　編集　===========================
$p.events.on_editor_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveEditorButtons("検索", "メール", "削除", "コメント削除")
})
// ======　HTML読み込んでから　==============
$(function () {
})
