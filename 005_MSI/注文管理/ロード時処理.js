
let VOLUME_AT_LOAD = 0
let COST_JPY_AT_LOAD = 0
let COST_USD_AT_LOAD = 0


$p.events.on_grid_load_arr.push(function () {
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
})
$p.events.on_editor_load_arr.push(function () {
	// 不要ボタン削除
    commonRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
	commonSetFlowchart(
		"注文ステータス"
		, Object.keys(WIKI_STATUS_ORDER_CONTROL).map(v => WIKI_STATUS_ORDER_CONTROL[v])
	)
	VOLUME_AT_LOAD = commonConvertCTo1(commonGetVal("数量"))
    COST_JPY_AT_LOAD = commonConvertCTo1(commonGetVal("原価"))
    COST_USD_AT_LOAD = commonConvertCTo1(commonGetVal("原価＄"))
})
