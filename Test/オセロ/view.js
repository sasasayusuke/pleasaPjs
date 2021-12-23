
var PUBLIC_FLG = false

$p.events.on_grid_load = function () {

	let html =  `
	<div id="utilHeader"></div>

	<div id="othello"></div>
	<div id="utilFooter"></div>
	<div id="utilClock"></div>

	`
	$("#SiteMenu").prepend(html)
	// 上へアイコン削除
	$("nav.cf")[1].remove()

}