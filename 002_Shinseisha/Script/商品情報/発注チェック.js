$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = checkOrder
	elem.innerText = '発注チェック'

	target.appendChild(elem)
}

let records = []

function checkOrder() {
	let ans = window.confirm('発注チェックを開始しますか?')
	if (!ans) {
		console.log('発注チェックを開始しますか? : Noを押下しました。')
		return
	}
	console.log('発注チェックを開始しますか? : Yesを押下しました。')
	$.ajax({
		type: "POST",
		url: "/api/items/" + $p.siteId() + "/export",
		contentType: 'application/json',
		data:JSON.stringify({
			"ApiVersion": 1.1,
			"Export": {
				"Columns":[
					{
						"ColumnName": "ResultId"
					},
					// 商品コード
					{
						"ColumnName": "Title"
					},
					// 廃番
					{
						"ColumnName": "CheckA"
					},
					// 発注仕入先コード
					{
						"ColumnName": "Class099"
					},
					// リードタイム
					{
						"ColumnName": "NumA"
					},
					// 発注管理連携ステータス
					{
						"ColumnName": "ClassA~~26839,Status"
					},
					// チェック区分
					{
						"ColumnName": "ClassF"
					},
					// 九州まで
					{
						"ColumnName": "Num008"
					},
					// 関東まで
					{
						"ColumnName": "Num009"
					},
					// 北海道まで
					{
						"ColumnName": "Num010"
					},
					// 全国まで
					{
						"ColumnName": "Num011"
					},
				],
				"Header": false,
				"Type": "csv"
			},
			"View": {
				"ColumnSorterHash": {
					"ResultId": "asc"
				},
			}
		}),
		success: function(data){
			records = []
			for (let r of data.Response.Content.split(/\n/)) {
				records.push(JSON.parse(`[${r}]`))
			}
			extractData()
		}
	})
	function extractData() {
		console.log(records)
		records = records.filter(record => {
			// 発注チェック　:　チェックなし
			return record[2] == ''
		}).filter(record => {
			// 発注仕入先コード　:　入力あり
			return record[3] !== ''
		}).filter(record => {
		// リードタイム　:　入力あり
			return record[4] > 0
		})
		.filter(record => {
		// 発注管理連携ステータス : "確認待","確認済","出庫準備中","出庫済"　以外のデータ
			return ![" 確認待"," 確認済"," 出荷準備中"," 出荷済"].includes(record[5])
		})

		console.log(records)

	}

}
