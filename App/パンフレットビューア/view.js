
var PUBLIC_FLG = true

readScreenInfo(PUBLIC_FLG)
readPanfletInfo(PUBLIC_FLG)

utilImport('css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css')
utilImport('css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css')
utilImport('javascript', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js')

$p.events.on_grid_load = function () {

	let html =  `
		<div id='utilHeader'></div>
		<div class='sec_inner'>
			<div class='slider'>
			</div>
		</div>

		<div id='utilFooter'></div>
		<div id='utilImage-QR'></div>

	`
	$('#MainContainer').prepend(html)

	$('#Header').remove()
	$('#Application').remove()
}

