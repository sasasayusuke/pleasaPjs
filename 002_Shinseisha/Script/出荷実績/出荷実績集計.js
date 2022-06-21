
const COLUMN_INDEX_ACHIEVEMENT = [
	SHOUHIN_CODE_A
	, YEAR
	, MONTH
	, SHUKKA_SUURYOU_KYUSHU
	, SHUKKA_SUURYOU_KANTO
	, SHUKKA_SUURYOU_HOKKAIDO
] = [
	$p.getColumnName("商品ｺｰﾄﾞ")
	, $p.getColumnName("年")
	, $p.getColumnName("月")
	, $p.getColumnName("九州出荷数量")
	, $p.getColumnName("関東出荷数量")
	, $p.getColumnName("北海道出荷数量")
]

const COLUMN_INDEX_TRADE = [
	SHOUHIN_CODE_SALE
	, SHOUHIN_CODE_ORDER
	, KOUKAN_RATE
	, INVALID
] = [
	"ClassA"
	, "ClassB"
	, "NumC"
	, "CheckA"
]

const COLUMN_INDEX_ITEM = [
	RESULT_ID
	, SHOUHIN_CODE_I
] = [
	"ResultId"
	, "ClassA"
]

const OUTPUT_HEADER = [
	OUTPUT_SHOUHIN_CODE
	, OUTPUT_JISSEKI_KYUSHU
	, OUTPUT_JISSEKI_KANTO
	, OUTPUT_JISSEKI_HOKKAIDO
	, OUTPUT_KIKAN
	, OUTPUT_KIKAN_PAIR
] = [
	"商品ｺｰﾄﾞ"
	, "九州直近一年間出荷実績"
	, "関東直近一年間出荷実績"
	, "北海道直近一年間出荷実績"
	, "出荷実績計測期間"
	, "出荷実績計測期間(交換ペア)"
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

	let achievements = await utilExportAjax(
		TABLE_ID_SHUKKA_JISSEKI
		, COLUMN_INDEX_ACHIEVEMENT
		, {"ClassB": `[${utilGetDate("","YYYY") - 1}, ${utilGetDate("","YYYY")}]`}
	)

	let data = extractData(achievements.Response.Content)

	let trades = await utilExportAjax(
		TABLE_ID_KOUKAN_PAIR
		, COLUMN_INDEX_TRADE
	)

	data = exchangePair(data, trades.Response.Content)
	let header = data.shift()

	let items = await utilExportAjax(
		TABLE_ID_SHOUHIN
		, COLUMN_INDEX_ITEM
	)

	let itemRecords = utilConvertCsvTo2D(items.Response.Content)

	let itemHeader = itemRecords.shift()

	if (itemHeader.length !== COLUMN_INDEX_ITEM.length) {
		console.log(itemHeader)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
	}

	// Result ID を含んだ商品マスタと突合
	let table = utilJoinLeft(itemRecords, data, val = 0, arr1KeyIndex = 1)

	// 重複商品ｺｰﾄﾞ列削除
	table = table.map(v => {
		v.splice(COLUMN_INDEX_ITEM.length, 1)
		return v
	})

	// ヘッダ生成
	table.unshift(["ID", ...header])
	utilDownloadCsv(utilConvert2DToCsv(table), '出荷実績集計_' + utilGetDate("", "YYYY_MM_DD hh_mm_ss"))

	/**
	 * 出荷実績を抽出する関数です。
	 */
	function extractData(achievementContent) {
		let records = utilConvertCsvTo2D(achievementContent)
		let header = records.shift()
		if (header.length !== COLUMN_INDEX_ACHIEVEMENT.length) {
			console.log(header)
			utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
		}
		records = records
			// 直近一年間(先月から)　のデータを抽出
			.filter(record => {
				if (+utilGetDate("","MM") == 1) {
					// 1月の場合は、去年のデータだけ抽出
					return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == (utilGetDate("","YYYY") - 1)
				} else {
					// その他の月の場合
					if (record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == utilGetDate("","YYYY")) {
						// 今年のデータであれば、先月以前を抽出
						return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(MONTH)] < utilGetDate("","MM")
					} else if (record[COLUMN_INDEX_ACHIEVEMENT.indexOf(YEAR)] == (utilGetDate("","YYYY") - 1)) {
						// 去年のデータであれば、今月以降を抽出
						return record[COLUMN_INDEX_ACHIEVEMENT.indexOf(MONTH)] >= utilGetDate("","MM")
					}
				}
			})
		// 商品コードごとに分割
		let shouhinList = utilDivide2DArray(records, COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_CODE_A))

		// 出荷実績集計作成処理
		let table = []
		// ヘッダー情報入力
		table.push(OUTPUT_HEADER)

		for (let codes of shouhinList) {
			let record = []
			let count = codes.length
			record.push(codes[0][COLUMN_INDEX_ACHIEVEMENT.indexOf(SHOUHIN_CODE_A)])
			for (let place of [SHUKKA_SUURYOU_KYUSHU, SHUKKA_SUURYOU_KANTO, SHUKKA_SUURYOU_HOKKAIDO]) {
				let amounts = codes.map(item => +item[COLUMN_INDEX_ACHIEVEMENT.indexOf(place)])
				// 直近12ヶ月分の出荷実績が12ヶ月分ある場合（12ヶ月の各倉庫在庫合計 - 各倉庫売上最大値 - 各倉庫売上最小値）
				if (count >= 12) {
					amounts.splice(amounts.indexOf(Math.min.apply(null, amounts)), 1)
					amounts.splice(amounts.indexOf(Math.max.apply(null, amounts)), 1)
				}
				// 倉庫ごとの出荷実績
				record.push(getAchievementAmount(amounts))
			}
			// 集計期間
			record.push(count)
			// 集計期間（交換ペア）
			record.push(0)
			table.push(record)
		}

		return table
	}

	/**
	 * 直近一年間出荷実績数量を算出する関数です。
	 * ( = Nヶ月分の在庫合計 / N * 12 )
	 */
	function getAchievementAmount(list) {
		return Math.round(list.reduce((sum, val) => sum + val, 0) / list.length * 12)
	}

	/**
	 * 交換ペアに登録された変換を行う
	 */
	function exchangePair (achievementData, tradeContent) {

		// 無効化　:　チェックなし
		let records = utilConvertCsvTo2D(tradeContent).filter(record => record[COLUMN_INDEX_TRADE.indexOf(INVALID)] == '')

		let header = records.shift()
		if (header.length !== COLUMN_INDEX_TRADE.length) {
			console.log(header)
			utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
		}
		let achievementHeader = achievementData.shift()

		let keyIndex = achievementHeader.length

		// left join
		let mergeTable = utilJoinLeft(achievementData, records, "")

		mergeTable = mergeTable
			// 交換ペアに登録されたもの変換する
			.map(v => {
				if (utilIsNull(v[keyIndex])) {
					return v.slice(0, keyIndex)
				} else {
					return [
						v[keyIndex + COLUMN_INDEX_TRADE.indexOf(SHOUHIN_CODE_ORDER)]
						, Math.ceil(v[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_KYUSHU)] * v[keyIndex + COLUMN_INDEX_TRADE.indexOf(KOUKAN_RATE)])
						, Math.ceil(v[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_KANTO)] * v[keyIndex + COLUMN_INDEX_TRADE.indexOf(KOUKAN_RATE)])
						, Math.ceil(v[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_HOKKAIDO)] * v[keyIndex + COLUMN_INDEX_TRADE.indexOf(KOUKAN_RATE)])
						, v[OUTPUT_HEADER.indexOf(OUTPUT_KIKAN_PAIR)]
						, v[OUTPUT_HEADER.indexOf(OUTPUT_KIKAN)]
					]
				}
			})
		mergeTable = utilDivide2DArray(mergeTable, 0)
			.map(v => {
				if (v.length > 1) {
					return [
						v[0][OUTPUT_HEADER.indexOf(OUTPUT_SHOUHIN_CODE)]
						, v.reduce((sum, elem) => {
							return sum + elem[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_KYUSHU)]
						}, 0)
						, v.reduce((sum, elem) => {
							return sum + elem[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_KANTO)]
						}, 0)
						, v.reduce((sum, elem) => {
							return sum + elem[OUTPUT_HEADER.indexOf(OUTPUT_JISSEKI_HOKKAIDO)]
						}, 0)
						, v.reduce((sum, elem) => {
							return sum + elem[OUTPUT_HEADER.indexOf(OUTPUT_KIKAN)]
						}, 0)
						, v.reduce((sum, elem) => {
							return sum + elem[OUTPUT_HEADER.indexOf(OUTPUT_KIKAN_PAIR)]
						}, 0)
					]
				} else {
					return v[0]
				}
			})

		mergeTable.unshift(achievementHeader)
		return mergeTable

	}
}
