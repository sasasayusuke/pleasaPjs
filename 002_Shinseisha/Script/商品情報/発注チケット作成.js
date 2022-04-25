
const COLUMN_INDEX = [
	RESULT_ID
	, SHOUHIN_CODE
	, TORIHIKI_SHURYOU
	, HAIBAN
	, HACCHUU_SHIIRESAKI_CODE
	, LEAD_TIME
	, MINIMUM_LOT
	, STATUS
	, CHECK_KB
	, KYUSHU_HACCHU_POINT
	, KANTO_HACCHU_POINT
	, HOKKAIDO_HACCHU_POINT
	, ZENKOKU_HACCHU_POINT
	, TO_KYUSHU
	, TO_KANTO
	, TO_HOKKAIDO
	, TO_ZENKOKU
	, KYUSHU_ZAIKO
	, KANTO_ZAIKO
	, HOKKAIDO_ZAIKO
	, ZENKOKU_ZAIKO
	, KYUSHU_1M_ZAIKO
	, KANTO_1M_ZAIKO
	, HOKKAIDO_1M_ZAIKO
	, ZENKOKU_1M_ZAIKO
	, NEW_FLAG
] = [
	"ResultId"
	// 商品コード
	, "Title"
	// 仕入先情報~~取引終了
	, "Class099~" + SITE_ID_SHIIRESAKI + ",CheckA"
	// 廃番
	, "CheckA"
	// 発注仕入先コード
	, "Class099"
	// リードタイム
	, "NumA"
	// 最小ロット
	, "Num039"
	// 発注管理~~連携ステータス
	, "ClassA~~" + SITE_ID_HACCHU_KANRI + ",Status"
	// チェック区分
	, "ClassF"
	// 九州発注点
	, "Num004"
	// 関東発注点
	, "Num005"
	// 北海道発注点
	, "Num006"
	// 全国発注点
	, "Num007"
	// 九州まで
	, "Num008"
	// 関東まで
	, "Num009"
	// 北海道まで
	, "Num010"
	// 全国まで
	, "Num011"
	// 九州現在庫数量
	, "NumB"
	// 関東現在庫数量
	, "NumC"
	// 北海道現在庫数量
	, "NumD"
	// 全国現在庫数量
	, "NumE"
	// 九州一ヶ月分在庫
	, "NumR"
	// 関東一ヶ月分在庫
	, "NumS"
	// 北海道一ヶ月分在庫
	, "NumT"
	// 全国一ヶ月分在庫
	, "NumU"
	// 新商品フラグ
	, "CheckB"
]
/**
 * 発注チケット作成をする関数です。
 */
async function checkOrder() {
	let ans = window.confirm('発注チケット作成を開始しますか?')
	if (!ans) {
		console.log('発注チケット作成を開始しますか? : Noを押下しました。')
		return
	}
	console.log('発注チケット作成を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== SITE_ID_SHOUHIN) {
		console.log(header)
		utilSetMessage(message = 'サイトIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let records = await utilExportAjax(
		SITE_ID_SHOUHIN
		, COLUMN_INDEX
	)

	records = records.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
	let header = records.shift()
	if (header.length !== COLUMN_INDEX.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	utilDownloadCsv(extractData(records), '発注チケット作成_' + utilGetDate(date = "", format = "YYYY_MM_DD hh_mm_ss"))


	/**
	 * レコードを抽出する関数です。
	 */
	function extractData(records) {
		records = records
			// 取引終了　:　チェックなし
			.filter(record => record[COLUMN_INDEX.indexOf(TORIHIKI_SHURYOU)] == '')
			// 廃番　:　チェックなし
			.filter(record => record[COLUMN_INDEX.indexOf(HAIBAN)] == '')
			// 発注仕入先コード　:　入力あり
			.filter(record => record[COLUMN_INDEX.indexOf(HACCHUU_SHIIRESAKI_CODE)] !== '')
			// リードタイム　:　1以上
			.filter(record => record[COLUMN_INDEX.indexOf(LEAD_TIME)] >= 1)
			// 最小ロット　:　1以上
			.filter(record => record[COLUMN_INDEX.indexOf(MINIMUM_LOT)] >= 1)

		// 発注管理テーブルに"確認待","確認済","出庫準備中","出庫済"のチケットがない商品
		let tmpObj = {}
		records
			.filter(record => [" 確認待"," 確認済"," 出荷準備中"," 出荷済"].includes(record[COLUMN_INDEX.indexOf(STATUS)]))
			.forEach(record => tmpObj[record[COLUMN_INDEX.indexOf(RESULT_ID)]] = record[COLUMN_INDEX.indexOf(SHOUHIN_CODE)])

		records = records
			// 発注管理連携ステータス : "確認待","確認済","出庫準備中","出庫済"　を持つ商品を排除
			.filter(record =>  !(record[COLUMN_INDEX.indexOf(RESULT_ID)] in tmpObj))
			// ResultId重複削除
			.filter((record, index, self) => self.map(item => item[COLUMN_INDEX.indexOf(RESULT_ID)]).indexOf(record[COLUMN_INDEX.indexOf(RESULT_ID)]) === index)

		// 発注チケット作成処理
		let ticketList = []
		// ヘッダー情報入力
		ticketList.push(["商品ｺｰﾄﾞ", "作成日", "確認期日", "入庫倉庫", "発注根拠", "発注数量"])
		let date = new Date()
		let now = utilGetDate(date)
		let tommorow = utilGetDate(date.setDate(date.getDate() + 1))
		tommorow
		for (let r of records) {
			let ticket = []
			// 商品ｺｰﾄﾞ
			ticket.push(r[COLUMN_INDEX.indexOf(SHOUHIN_CODE)])
			// 作成日
			ticket.push(now)
			// 確認期日(作成日から１日後)
			ticket.push(tommorow)

			if (r[COLUMN_INDEX.indexOf(CHECK_KB)] == ' 九州のみ') {
				// 全国閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_ZENKOKU)] < 0) {
					// 入庫倉庫：九州
					ticket.push(' 九州倉庫')
					// 発注根拠
					ticket.push(getOrderReason(r))
					// 発注数量
					ticket.push(getOrderAmount(r[COLUMN_INDEX.indexOf(ZENKOKU_HACCHU_POINT)], r[COLUMN_INDEX.indexOf(TO_ZENKOKU)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))
					ticketList.push(ticket)
				}
			} else if (r[COLUMN_INDEX.indexOf(CHECK_KB)] == ' 全国') {
				let ticketCopy = Array.from(ticket)
				// 九州閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_KYUSHU)] < 0) {
					// 入庫倉庫：九州
					ticketCopy.push(' 九州倉庫')
					// 発注根拠
					ticketCopy.push(getOrderReason(r))
					// 発注数量
					ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(KYUSHU_HACCHU_POINT)], r[COLUMN_INDEX.indexOf(TO_KYUSHU)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 関東閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_KANTO)] < 0) {
					// 入庫倉庫：関東
					ticketCopy.push(' 関東倉庫')
					// 発注根拠
					ticketCopy.push(getOrderReason(r))
					// 発注数量
					ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(KANTO_HACCHU_POINT)], r[COLUMN_INDEX.indexOf(TO_KANTO)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 北海道閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_HOKKAIDO)] < 0) {
					// 入庫倉庫：北海道
					ticketCopy.push(' 北海道倉庫')
					// 発注根拠
					ticketCopy.push(getOrderReason(r))
					// 発注数量
					ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(HOKKAIDO_HACCHU_POINT)], r[COLUMN_INDEX.indexOf(TO_HOKKAIDO)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))
					ticketList.push(ticketCopy)
				}
			} else {
			// チェック区分　:　チェックしない
				continue
			}
		}

		return utilConvert2DToCsv(ticketList)
	}

	/**
	 * 発注数量を算出する関数です。
	 * ( = （発注まで - 発注点） を 超える最小ロットの倍数)
	 */
	function getOrderAmount(orderPoint, toOrder, minimumLot) {
		return Math.ceil((orderPoint - toOrder) / minimumLot) * minimumLot
	}

	/**
	 * 発注根拠を算出する関数です。
	 */
	function getOrderReason(record) {
		let advice =
`
${record[COLUMN_INDEX.indexOf(NEW_FLAG)] == 1 ? '新商品の可能性がある商品です。' : ''}
${record[COLUMN_INDEX.indexOf(TO_ZENKOKU)] < 0 ? '”メーカー発注”をしてください。' : '”メーカー発注”または”倉庫間移動”をしてください。'}
`

		let reason =
`
現在在庫
	九州 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KYUSHU_ZAIKO)], 7)}	関東 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KANTO_ZAIKO)], 7)}	北海道 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(HOKKAIDO_ZAIKO)], 7)}	全国 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(ZENKOKU_ZAIKO)], 7)}

1ヶ月分在庫
	九州 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KYUSHU_1M_ZAIKO)], 7)}	関東 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KANTO_1M_ZAIKO)], 7)}	北海道 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(HOKKAIDO_1M_ZAIKO)], 7)}	全国 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(ZENKOKU_1M_ZAIKO)], 7)}

発注点
	九州 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KYUSHU_HACCHU_POINT)], 7)}	関東 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(KANTO_HACCHU_POINT)], 7)}	北海道 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(HOKKAIDO_HACCHU_POINT)], 7)}	全国 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(ZENKOKU_HACCHU_POINT)], 7)}

発注まで
	九州 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(TO_KYUSHU)], 7)}	関東 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(TO_KANTO)], 7)}	北海道 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(TO_HOKKAIDO)], 7)}	全国 : ${utilPaddingRight(record[COLUMN_INDEX.indexOf(TO_ZENKOKU)], 7)}

リードタイム : ${record[COLUMN_INDEX.indexOf(LEAD_TIME)]}
最小ロット　 : ${record[COLUMN_INDEX.indexOf(MINIMUM_LOT)]}
`
		return advice + reason
	}

}
