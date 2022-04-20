const COLUMN_INDEX = [
	RESULT_ID
	, TITLE
	, DOUBLE_FLAG
	, UPDATE_TIME
] = [
	"ResultId"
	, "Title"
	, "CheckA"
	, "UpdatedTime"
]

function checkDouble() {
	if ($p.siteId() !== SITE_ID_SHUKKA_JISSEKI) {
		console.log(header)
		utilSetMessage(message = 'サイトIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
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
					},
					// 重複無効フラグ
					{
						"ColumnName": DOUBLE_FLAG
					},
					// 更新日時
					{
						"ColumnName": UPDATE_TIME
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
			extractData(records)
		}
	})

}

function extractData(records) {
	console.log(records)

	records = records.map(item => item[COLUMN_INDEX.indexOf(TITLE)])
	records = records.filter(function (x, i, self) {
		return self.indexOf(x) !== self.lastIndexOf(x)
	})
	console.log(records)
}