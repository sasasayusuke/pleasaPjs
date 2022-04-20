const COLUMN_INDEX = [
	RESULT_ID
	, TITLE
] = [
	"ResultId"
	, "Title"
]

function checkDouble() {

	$.ajax({
		type: "POST",
		url: "/api/items/" + SITE_ID_SHUKKA_JISSEKI + "/export",
		contentType: 'application/json',
		data:JSON.stringify({
			"ApiVersion": 1.1,
			"Export": {
				"Columns":[
					{
						"ColumnName": RESULT_ID
					},
					// 商品ｺｰﾄﾞ_年月
					{
						"ColumnName": TITLE
					}
				],
				"Header": true,
				"Type": "csv"
			},
			"View": {
				"ColumnSorterHash": {
					"ResultId": "asc"
				},
			}
		}),
		success: function(data){
			records = data.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
			let header = records.shift()
			if (header.length !== COLUMN_INDEX.length) {
				console.log(header)
				utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
			}
			extractData()
		}
	})

}


