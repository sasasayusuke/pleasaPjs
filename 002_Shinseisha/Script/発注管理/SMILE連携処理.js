
const COLUMN_INDEX_LINKAGE = [
	ISSUE_ID
	, MAKER_CODE
	, SHOUHIN_CODE
	, IN_SOUKO
	, OUT_SOUKO
	, HACCHUU_SUURYOU
	, STATUS
] = [
	"IssueId"
	// 発注仕入先コード
	, "ClassA~" + SITE_ID_SHOUHIN + ",Class099"
	// 商品コード
	, "ClassA"
	// 入庫倉庫
	, "ClassF"
	// 出庫倉庫
	, "ClassG"
	// 発注数量
	, "NumA"
	// 連携ステータス
	, "Status"
]

async function linkageSMILE() {
	let ans = window.confirm('SMILE連携を開始しますか?')
	if (!ans) {
		console.log('SMILE連携を開始しますか? : Noを押下しました。')
		return
	}
	console.log('SMILE連携を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== SITE_ID_HACCHU_KANRI) {
		console.log(header)
		utilSetMessage(message = 'サイトIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let records = await utilExportAjax(
		SITE_ID_HACCHU_KANRI
		, COLUMN_INDEX_LINKAGE
	)
	records = records.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
	let header = records.shift()
	if (header.length !== COLUMN_INDEX_LINKAGE.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	utilDownloadCsv(extractData(records), 'SMILE連携_' + utilGetDate(date = "", format = "YYYY_MM_DD hh_mm_ss"))

	function extractData(records) {
		// 発注管理連携ステータス : " 出荷済"," 移動中"," 補充済"　のデータを抽出
		records = records.filter(record => [" 出荷済", " 移動中"," 補充済"].includes(record[COLUMN_INDEX_LINKAGE.indexOf(STATUS)]))

		// エラー処理（異常データなのでRPA中断）
		records.forEach(record => {
			if (record[COLUMN_INDEX_LINKAGE.indexOf(OUT_SOUKO)] == "") {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_LINKAGE.indexOf(ISSUE_ID)] + ' 出庫倉庫が入力されてません。', type = ERROR)
			}
			if (record[COLUMN_INDEX_LINKAGE.indexOf(HACCHUU_SUURYOU)] <= 0) {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_LINKAGE.indexOf(ISSUE_ID)] + ' 発注数量は1以上を入力してください。', type = ERROR)
			}
			if (record[COLUMN_INDEX_LINKAGE.indexOf(IN_SOUKO)] == record[COLUMN_INDEX_LINKAGE.indexOf(OUT_SOUKO)]) {
				utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_LINKAGE.indexOf(ISSUE_ID)] + ' 入庫倉庫と出庫倉庫が同じです。', type = ERROR)
			}
		})

		// ヘッダー情報入力
		let header = [shouhin_code , kyushu_move, kanto_move, hokkaido_move] = ["商品ｺｰﾄﾞ" , "九州移動残数量", "関東移動残数量", "北海道移動残数量"]

		let tmp = {}
		let codes = {}

		for (let r of records) {
			let key = r[COLUMN_INDEX_LINKAGE.indexOf(SHOUHIN_CODE)] + ',' + r[COLUMN_INDEX_LINKAGE.indexOf(IN_SOUKO)]
			if (!(key in tmp)) tmp[key] = 0
			if (!(r[COLUMN_INDEX_LINKAGE.indexOf(SHOUHIN_CODE)] in codes)) codes[r[COLUMN_INDEX_LINKAGE.indexOf(SHOUHIN_CODE)]] = 0
			tmp[key] += +r[COLUMN_INDEX_LINKAGE.indexOf(HACCHUU_SUURYOU)]
			if (r[COLUMN_INDEX_LINKAGE.indexOf(STATUS)] == " 出荷済") {
				// 発注管理連携ステータス : " 出荷済"の場合
				key = r[COLUMN_INDEX_LINKAGE.indexOf(SHOUHIN_CODE)] + ',' + r[COLUMN_INDEX_LINKAGE.indexOf(OUT_SOUKO)]
				if (!(key in tmp)) tmp[key] = 0
				tmp[key] -= +r[COLUMN_INDEX_LINKAGE.indexOf(HACCHUU_SUURYOU)]
			}
		}
		// SMILE連携作成処理
		let tbl = utilGenerate2DArray(Object.keys(codes).length, header.length, 0)
		for (let r = 0; r < tbl.length; r++) {
			tbl[r][0] = Object.keys(codes)[r]
		}

		for (let t in tmp) {
			let [code, souko] = t.split(',')
			let columnIndex = 0
			if (souko == " 九州倉庫") {
				columnIndex = header.indexOf(kyushu_move)
			} else if (souko == " 関東倉庫") {
				columnIndex = header.indexOf(kanto_move)
			} else if (souko == " 北海道倉庫") {
				columnIndex = header.indexOf(hokkaido_move)
			} else {
				utilSetMessage(message = " 出荷済 または 移動中 または 補充済 の " + code + 'の倉庫区分に異常または未入力項目があります。', type = ERROR)
			}
			tbl.find(v => v[0] == code)[columnIndex] = tmp[t]
		}
		tbl.unshift(header)

		return utilConvert2DToCsv(tbl)
	}
}
