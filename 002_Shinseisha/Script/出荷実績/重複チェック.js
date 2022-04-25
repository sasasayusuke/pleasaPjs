const COLUMN_INDEX_CHECK = [
	RESULT_ID
	, TITLE
	, CREATE_TIME
] = [
	"ResultId"
	// 商品ｺｰﾄﾞ_年月
	, "Title"
	// 作成日時
	, "CreatedTime"
]

async function check() {

	let checkRecords = await utilExportAjax(
		SITE_ID_SHUKKA_JISSEKI
		, COLUMN_INDEX_CHECK
	)

	checkRecords = checkRecords.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
	let header = checkRecords.shift()
	if (header.length !== COLUMN_INDEX_CHECK.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
	}
	checkDouble(checkRecords)


	function checkDouble(records) {
		// Title 重複行のみ抽出
		records = records
			.filter((record, index, self) => {
				return self.map(v => v[COLUMN_INDEX_CHECK.indexOf(TITLE)]).indexOf(record[COLUMN_INDEX_CHECK.indexOf(TITLE)]) !== self.map(v => v[COLUMN_INDEX_CHECK.indexOf(TITLE)]).lastIndexOf(record[COLUMN_INDEX_CHECK.indexOf(TITLE)])
			})
			// Title昇順 作成日時降順 ソート
			.sort((a, b) => {
				if (a[COLUMN_INDEX_CHECK.indexOf(TITLE)] !== b[COLUMN_INDEX_CHECK.indexOf(TITLE)]) {
					// Title昇順ソート
					return a[COLUMN_INDEX_CHECK.indexOf(TITLE)] > b[COLUMN_INDEX_CHECK.indexOf(TITLE)] ? 1 : -1
				}
				// 作成日時降順ソート
				return b[COLUMN_INDEX_CHECK.indexOf(CREATE_TIME)].replace(/[^0-9]/g, '') - a[COLUMN_INDEX_CHECK.indexOf(CREATE_TIME)].replace(/[^0-9]/g, '')
			})

		// 更新API呼び出し
		let cnt = 0
		let tmp
		let check = false
		for (let record of records) {
			// タイトル変わったらcntを0に戻す。1行目はfalseで更新する。
			if (tmp !== record[COLUMN_INDEX_CHECK.indexOf(TITLE)]) [cnt, check] = [0, false]
			// 同タイトルの2行目以降はtrueで更新する。
			if (cnt++ == 1) check = true

			utilUpdateAjax(
				id = record[COLUMN_INDEX_CHECK.indexOf(RESULT_ID)]
				, ClassHash = {}
				, NumHash= {}
				, DateHash= {}
				, DescriptionHash= {}
				, CheckHash = {
					CheckA : check
				}
				, addFunc = ""
			)

			// タイトルを代入
			tmp = record[COLUMN_INDEX_CHECK.indexOf(TITLE)]
		}
	}
}