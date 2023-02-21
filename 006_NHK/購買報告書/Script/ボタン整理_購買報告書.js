
// ======　一覧　===========================
$p.events.on_grid_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveGridButtons("検索", "一括削除", "インポート", "エクスポート")
    commonAddButton('sendMailToUnconfirmed', sendMailToUnconfirmed, '未確認者へメール', "ステータスが未確認の部局担当者にメールを送ります", "", "ui-icon-mail-open")
})
// ======　編集　===========================
$p.events.on_editor_load_arr.push(function () {
    // 不要ボタン削除
    commonRemoveEditorButtons("検索", "メール", "コピー", "削除", "コメント削除", "PC購買申請")
})
// ======　HTML読み込んでから　==============
$(function () {
    // 不要ボタン削除
    if($p.action() == "edit") commonRemoveEditorButtons( "PC購買申請")
})
