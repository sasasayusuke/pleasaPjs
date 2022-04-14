$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumMove'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumMove
	elem.innerText = '移動残集計'

	target.appendChild(elem)
}

let records = []

function sumMove() {
	let ans = window.confirm('移動残集計を開始しますか?')
	if (!ans) {
		console.log('移動残集計を開始しますか? : Noを押下しました。')
		return
	}
	console.log('移動残集計を開始しますか? : Yesを押下しました。')
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
						"ColumnName": "ClassA"
					},
					// 連携ステータス
					{
						"ColumnName": "Status"
					}
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
	    	// 発注管理連携ステータス : " 移動中"," 補充済"　のデータ
			return [" 移動中"," 補充済"].includes(record[2])
		})

		console.log(records)

	}

}
