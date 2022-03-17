
var PUBLIC_FLG = true

readScreenInfo(PUBLIC_FLG)
readPanfletInfo(PUBLIC_FLG)

utilImport('css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css')
utilImport('css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css')
utilImport('js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js')

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

// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	setImage()
	setSlick()
}, 2000)

function setImage() {
	let sort = 'NumA'
	let image = 'Body'

	let allowData = []
	let target = utilQuerySelector('.slider')

	// if (USER_ID == 1 || USER_ID == 2 || USER_ID == 7) {
	// 	// 全店舗にアクセスを許可 (1:管理者, 2:SMSデータテック, 7:ホテルフロント)
	// 	allowData = shopData
	// } else {
	// 	// その他のアカウントは各自店舗のみアクセスを許可
	// 	allowData = utilFilterObject(shopData, allowUserId, USER_ID)
	// }
	allowData = panfletData

	allowData = utilSortObject(
		allowData,
		{
			category: sort,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let div = document.createElement('div')

		let img = new Image()
		img.src = utilGetImageSrc(v[image], PUBLIC_FLG, true)

		div.appendChild(img)
		target.appendChild(div)
	})
}

function setSlick() {
	$('.slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1
	})
}
