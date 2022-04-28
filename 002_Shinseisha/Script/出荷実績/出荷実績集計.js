
const COLUMN_INDEX_ACHIEVEMENT = [
	SHOUHIN_RESULT_ID
	, SHOUHIN_CODE
	, YEAR
	, MONTH
	, KYUSHU_SHUKKA_SUURYOU
	, KANTO_SHUKKA_SUURYOU
	, HOKKAIDO_SHUKKA_SUURYOU
	, DOUBLE_FLAG
] = [
	"ClassA~" + TABLE_ID_SHOUHIN + ",ResultId"	// 商品マスタResultID
	, $p.getColumnName("商品ｺｰﾄﾞ")
	, $p.getColumnName("年")
	, $p.getColumnName("月")
	, $p.getColumnName("九州出荷数量")
	, $p.getColumnName("関東出荷数量")
	, $p.getColumnName("北海道出荷数量")
	, $p.getColumnName("重複無効フラグ")
]

async function sumAchievement() {
	let ans = window.confirm('出荷実績集計を開始しますか?')
	if (!ans) {
		console.log('出荷実績集計を開始しますか? : Noを押下しました。')
		return
	}
	console.log('出荷実績集計を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== TABLE_ID_SHUKKA_JISSEKI) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	await checkDouble()
	let records = await utilExportAjax(
		TABLE_ID_SHUKKA_JISSEKI
		, COLUMN_INDEX_ACHIEVEMENT
	)

	records = records.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
	let header = records.shift()
	if (header.length !== COLUMN_INDEX_ACHIEVEMENT.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
	}

	utilDownloadCsv(extractData(records), '出荷実績集計_' + utilGetDate(date = "", format = "YYYY_MM_DD hh_mm_ss"))

	function extractData(records) {
		records = records
			// 重複無効フラグ : チェックなし　のデータを抽出
			.filter(record => record[COLUMN_INDEX_ACHIEVEMENT.indexOf(DOUBLE_FLAG)] == '')
			// 直近一年間(先月から)　のデータを抽出
			.filter(record => {
				if (utilGetDate("","MM") == 1) {
					// 1月の場合は、去年のデータだけ抽出
					return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == (utilGetDate("","YYYY") - 1)
				} else {
					// その他の場合
					if (record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == utilGetDate("","YYYY")) {
						// 今年のデータであれば、先月以前を抽出
						return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(MONTH)] < utilGetDate("","MM")
					} else if (record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == (utilGetDate("","YYYY") - 1)) {
						// 去年のデータであれば、今月以降を抽出
						return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(MONTH)] >= utilGetDate("","MM")
					}
				}
			})
			// 商品コード降順ソート
			.sort((a, b) =>  b[COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_RESULT_ID)] > a[COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_RESULT_ID)] ? 1 : -1)

		// 商品コードごとに分割
		let shouhinList = []
		let shouhinCodes = []
		let tmp = ""
		for (let record of records) {
			if (tmp !== record[COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_RESULT_ID)]) {
				shouhinList.push(shouhinCodes)
				shouhinCodes = []
			}
			shouhinCodes.push(record)
			tmp = record[COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_RESULT_ID)]
		}
		shouhinList.push(shouhinCodes)
		shouhinList = shouhinList.filter(v => !utilIsNull(v))
		// 出荷実績集計作成処理
		let table = []
		// ヘッダー情報入力
		table.push(["ID", "商品ｺｰﾄﾞ", "出荷実績計測期間", "九州直近一年間出荷実績", "関東直近一年間出荷実績", "北海道直近一年間出荷実績"])

		for (let codes of shouhinList) {
			let record = []
			let count = codes.length
			record.push(codes[0][COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_RESULT_ID)])
			record.push(codes[0][COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_CODE)])
			record.push(count)
			for (let place of [KYUSHU_SHUKKA_SUURYOU, KANTO_SHUKKA_SUURYOU, HOKKAIDO_SHUKKA_SUURYOU]) {
				let amounts = codes.map(item => +item[COLUMN_INDEX_ACHIEVEMENT.indexOf(place)])
				// 直近１２ヶ月以上の出荷実績がある場合（12ヶ月分の各倉庫在庫合計 - 各倉庫売上最大値 - 各倉庫売上最小値）
				if (count >= 12) {
					amounts.splice(amounts.indexOf(Math.min.apply(null, amounts)), 1)
					amounts.splice(amounts.indexOf(Math.max.apply(null, amounts)), 1)
					console.log(codes)
					if (count > 12) {
						console.log("1年間のデータが13個以上あります。")
					}
				// その他の場合　
				} else {
					console.log("1年間のデータが11個以下しかありません。")
					console.log(codes)
				}

				record.push(getAchievementAmount(amounts))
			}
			table.push(record)
		}

		return utilConvert2DToCsv(table)
	}

	/**
	 * 直近一年間出荷実績数量を算出する関数です。
	 * ( = Nヶ月分の在庫合計 / N * 12 )
	 */
	function getAchievementAmount(list) {
		return Math.round(list.reduce((sum, val) => sum + val, 0) / list.length * 12)
	}
}
