
var PUBLIC_FLG = true

readScreenInfo(PUBLIC_FLG)

$p.events.on_grid_load = function () {

	let html =  `
		<div id='utilHeader'></div>
		<div id='utilImage-QR'></div>
		<div id='utilFooter'></div>
	`
	$('#MainContainer').prepend(html)

	$('#Header').remove()
	$('#Application').remove()
}

