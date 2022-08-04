

$p.events.on_grid_load_arr.push(function () {
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
})
$p.events.on_editor_load_arr.push(function () {
	// 新規作成リンク先変更
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE_ID_ORDER_INPUT_FORM}/index`)
	commonSetFlowchart(
		"注文ステータス"
		, [
			WIKI_STATUS_ORDER_CONTROL.announce
			, WIKI_STATUS_ORDER_CONTROL.receipt
			, WIKI_STATUS_ORDER_CONTROL.checkingDelivery
			, WIKI_STATUS_ORDER_CONTROL.adjustment
			, WIKI_STATUS_ORDER_CONTROL.confirmedDelivery
			, WIKI_STATUS_ORDER_CONTROL.shipped
			, WIKI_STATUS_ORDER_CONTROL.accepted
			, WIKI_STATUS_ORDER_CONTROL.closed
			, WIKI_STATUS_ORDER_CONTROL.cancel
		]
	)
})
