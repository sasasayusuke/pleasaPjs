
var shopData = []
console.log('店舗情報 : ' + SITE_URL + shopDBId + '/index')

async function readShopInfo (public = false) {
	if (public) {
		let settings = {
            'url': SITE_API_URL + shopDBId + '/get',
			'method': 'POST',
			'timeout': 0,
			'headers': {
				'Content-Type': 'application/json'
			},
			'data': JSON.stringify({
				'ApiKey': API_KEY
			}),
		}
		$.ajax(settings).done(function (response) {
			shopData = response.Response.Data
			console.log(shopData)
		})
	} else {
		$p.apiGet({
			'id': shopDBId,
			'done': function (data) {
				shopData = data.Response.Data
				console.log(shopData)
			},
			'fail': function (data) {
				alert(shopDBId + 'との通信が失敗しました。')
			},
			'always': function (data) {
			}
		})
	}
}


