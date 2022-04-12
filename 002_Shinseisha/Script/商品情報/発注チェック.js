$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = checkOrder
	elem.innerText = '発注チェック'

	target.appendChild(elem)
}

function checkOrder() {
	let ans = window.confirm('発注チェックを開始しますか?')
	if (!ans) {
		console.log('発注チェックを開始しますか? : Noを押下しました。')
		return
	}
	console.log('発注チェックを開始しますか? : Yesを押下しました。')
	let records = []
	$p.apiGet({
		'id': $p.siteId(),
		"view": {
			"ColumnFilterHash": {
				"Status" : "[100,900]"
			}
		},
		'done': function (data) {
			records = data.Response.Data
			console.log(records)
		},
		'fail': function (data) {
			utilSetMessage($p.siteId() + 'との通信が失敗しました。', ERROR)
			return
		},
		'always': function (data) {
			console.log('商品レコード取得')
		}
	})
	console.log('oooo')



}
