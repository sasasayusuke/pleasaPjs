
let atLoadVolume = 0
let atLoadCostJpy = 0
let atLoadCostUsd = 0
let atLoadUnit = 0
let atLoadTaxRate = 0


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
	atLoadVolume = commonConvertCTo1(commonGetVal("数量"))
    atLoadCostJpy = commonConvertCTo1(commonGetVal("原価"))
    atLoadCostUsd = commonConvertCTo1(commonGetVal("原価＄"))
	atLoadUnit = commonConvertCTo1(commonGetVal("単価"))
	atLoadTaxRate = commonConvertCTo1(commonGetVal("税率"))
})
