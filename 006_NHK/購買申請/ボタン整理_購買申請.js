
// ======　一覧　===========================
$p.events.on_grid_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveGridButtons("検索", "一括削除", "インポート", "エクスポート")
    // ボタン追加
    commonAddButton('updateReport', updateReport, '報告書申請', "申請を取りまとめて報告書を申請", "", "ui-icon-document")

})
// ======　編集　===========================
$p.events.on_editor_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveEditorButtons("検索", "メール", "削除", "コメント削除", "PC購買申請")
})
// ======　HTML読み込んでから　==============
$(function () {
    // 不要ボタン削除
    if($p.action() == "edit") commonRemoveEditorButtons( "PC購買申請")
})
