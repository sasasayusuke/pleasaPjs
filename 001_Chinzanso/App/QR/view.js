

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

// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilViewQRcode(utilQuerySelector('meta[name="description"]').content)
}, 1000)
