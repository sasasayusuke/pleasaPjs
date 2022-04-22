const COLUMN_INDEX = [
	RESULT_ID
	, TITLE
	, CREATE_TIME
] = [
	"ResultId"
	, "Title"
	, "CreatedTime"
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
					// 作成日時
					{
						"ColumnName": CREATE_TIME
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
	// Title 重複行のみ抽出
	records = records
		.filter((record, index, self) => {
			return self.map(v => v[COLUMN_INDEX.indexOf(TITLE)]).indexOf(record[COLUMN_INDEX.indexOf(TITLE)]) !== self.map(v => v[COLUMN_INDEX.indexOf(TITLE)]).lastIndexOf(record[COLUMN_INDEX.indexOf(TITLE)])
		})
		// Title昇順 作成日時降順 ソート
		.sort((a, b) => {
			if (a[COLUMN_INDEX.indexOf(TITLE)] !== b[COLUMN_INDEX.indexOf(TITLE)]) {
				// Title昇順ソート
				if (a[COLUMN_INDEX.indexOf(TITLE)] > b[COLUMN_INDEX.indexOf(TITLE)]) return 1
				if (a[COLUMN_INDEX.indexOf(TITLE)] < b[COLUMN_INDEX.indexOf(TITLE)]) return -1
			}
			// 作成日時降順ソート
			return b[COLUMN_INDEX.indexOf(CREATE_TIME)].replace(/[^0-9]/g, '') - a[COLUMN_INDEX.indexOf(CREATE_TIME)].replace(/[^0-9]/g, '')
		})

	// 更新API呼び出し
	let cnt = 0
	let tmp
	let check = false
	for (let record of records) {
		// タイトル変わったらcntを0に戻す。1行目はfalseで更新する。
		if (tmp !== record[COLUMN_INDEX.indexOf(TITLE)]) {
			cnt = 0
			check = false
		}
		// 同タイトルの2行目以降はtrueで更新する。。
		if (cnt++ == 1) check = true

		update(
			ClassHash = {}
			, NumHash= {}
			, DateHash= {}
			, DescriptionHash= {}
			, CheckHash = {
				CheckA : check
			}
			, addFunc = ""
			, id = record[COLUMN_INDEX.indexOf(RESULT_ID)]
		)

		// タイトルを代入
		tmp = record[COLUMN_INDEX.indexOf(TITLE)]
	}

}