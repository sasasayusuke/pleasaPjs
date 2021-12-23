
var PUBLIC_FLG = true

readMessageMaster(PUBLIC_FLG)
readIconMaster(PUBLIC_FLG)
readScreenInfo(PUBLIC_FLG)
readSheetInfo(PUBLIC_FLG)
readShopInfo(PUBLIC_FLG)

//3秒毎に実行
window.setInterval(function() {
	readSheetInfo(PUBLIC_FLG)
}, 3000)

$p.events.on_grid_load = function () {

	html =  `
		<div id="utilHeader"></div>
		<div id="container"></div>
		<div id="utilFooter"></div>
		<div id="utilClock"></div>
	`
	$("#MainContainer").prepend(html)

	$("#Header").remove()
	$("#Application").remove()

}
