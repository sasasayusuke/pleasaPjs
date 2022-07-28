

$p.events.on_grid_load_arr.push(function () {
	if ($p.siteId() !== TABLE_ID_ORDER_CONTROL_BOOK) {
		commonSetMessage(message = "テーブルIDを修正してください。スクリプトタブから共通変数を確認してください。", type = ERROR)
	}
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
})
$p.events.on_editor_load_arr.push(function () {
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
})
