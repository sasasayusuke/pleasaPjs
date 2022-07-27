

$p.events.on_editor_load_arr.push(function () {
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE.ORDER_INPUT_FORM.index}/index`)
})
$p.events.on_grid_load_arr.push(function () {
	$("li#NewMenuContainer").find("a").attr('href',`/items/${TABLE.ORDER_INPUT_FORM.index}/index`)
})
