$p.events.on_grid_load_arr.push(function () {
	// 不要ボタン削除
    commonRemoveGridButton("検索", "一括削除", "インポート", "エクスポート")
})
$p.events.on_editor_load_arr.push(function () {
	// 不要ボタン削除
    commonRemoveEditorButton("検索", "戻る", "削除", "コメント削除")
})