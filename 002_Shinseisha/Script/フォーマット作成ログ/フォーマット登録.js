
// 発注管理テーブル
const COLUMN_INDEX_ORDER = [
	ISSUE_ID
	, MAKER_CODE
	, SHOUHIN_CODE
	, IN_SOUKO
	, OUT_SOUKO
	, HACCHUU_SUURYOU
	, STATUS
] = [
	"IssueId"
	, "ClassA~" + TABLE_ID_SHOUHIN + ",Class099"// 発注仕入先コード
	, "ClassA"
	, "ClassF"
	, "ClassG"
	, "NumA"
	, "Status"
]

async function createFormat() {
	let ans = window.confirm('フォーマット登録を開始しますか?')
	if (!ans) {
		console.log('フォーマット登録を開始しますか? : Noを押下しました。')
		return
	}
	console.log('フォーマット登録を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== TABLE_ID_FORMAT_LOG) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let records = await utilExportAjax(
		TABLE_ID_HACCHU_KANRI
		, COLUMN_INDEX_ORDER
	)
	records = records.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
	let header = records.shift()
	if (header.length !== COLUMN_INDEX_ORDER.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	extractData(records)

	function extractData(records) {
		// 発注管理連携ステータス : " 確認済", " 出荷済", " 補充済"　のデータを抽出
		records = records.filter(record => {
			return [
				WIKI_STATUS_HACCHU_KANRI.confirmed.value
				, WIKI_STATUS_HACCHU_KANRI.shipped.value
				, WIKI_STATUS_HACCHU_KANRI.filled.value
			].includes(record[COLUMN_INDEX_ORDER.indexOf(STATUS)])
		})

		// エラー処理（異常データなのでRPA中断）
		records.forEach(record => {
			if ([WIKI_STATUS_HACCHU_KANRI.shipped.value, WIKI_STATUS_HACCHU_KANRI.filled.value].includes(record[COLUMN_INDEX_ORDER.indexOf(STATUS)]) && record[COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO)] == "") {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID)] + ' 出荷済 または 補充済 のデータは出庫倉庫を入力してください。', type = ERROR)
			}
			if (record[COLUMN_INDEX_ORDER.indexOf(HACCHUU_SUURYOU)] <= 0) {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID)] + ' 発注数量は1以上を入力してください。', type = ERROR)
			}
			if (record[COLUMN_INDEX_ORDER.indexOf(IN_SOUKO)] == record[COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO)]) {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID)] + ' 入庫倉庫と出庫倉庫が同じです。', type = ERROR)
			}
		})

		// 確認済のデータに絞って引数に渡す
		createMakerOrderFormat(records.filter(record => record[COLUMN_INDEX_ORDER.indexOf(STATUS)] == WIKI_STATUS_HACCHU_KANRI.confirmed.value))
		//let response = await Promise.all(records.map(record => {
		//	return utilUpdateAjax(
		//		id = record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID)]
		//		, ClassHash = {}
		//		, NumHash= {}
		//		, DateHash= {}
		//		, DescriptionHash= {}
		//		, CheckHash = {
		//			CheckA : false
		//		}
		//		, addFunc = ""
		//	)
		//}))
	}

	/**
	 * メーカーコード×倉庫コードに分割した発注書を作成
	 *
	 * @param {Array} records 確認済チケット
	 *
	 */
	function createMakerOrderFormat(records) {
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
	}

}
