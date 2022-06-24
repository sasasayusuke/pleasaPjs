
const COLUMN_INDEX = [
	RESULT_ID
	, SHOUHIN_CODE
	, TORIHIKI_JOUTAI
	, SHIIRE_TANKA
	, HAIBAN
	, HACCHUU_SHIIRESAKI_CODE
	, LEAD_TIME
	, MINIMUM_LOT
	, STATUS
	, CHECK_KB
	, HACCHU_POINT_KYUSHU
	, HACCHU_POINT_KANTO
	, HACCHU_POINT_HOKKAIDO
	, HACCHU_POINT_ZENKOKU
	, TO_KYUSHU
	, TO_KANTO
	, TO_HOKKAIDO
	, TO_ZENKOKU
	, ZANGETSU_KYUSHU
	, ZANGETSU_KANTO
	, ZANGETSU_HOKKAIDO
	, ZANGETSU_ZENKOKU
	, ZAIKO_KYUSHU
	, ZAIKO_KANTO
	, ZAIKO_HOKKAIDO
	, ZAIKO_ZENKOKU
	, ZAIKO_KYUSHU_1M
	, ZAIKO_KANTO_1M
	, ZAIKO_HOKKAIDO_1M
	, ZAIKO_ZENKOKU_1M
	, JISSEKI_KYUSHU
	, JISSEKI_KANTO
	, JISSEKI_HOKKAIDO
	, JISSEKI_ZENKOKU
	, JISSEKI_KEISOKU_KIKAN
] = [
	"ResultId"
	, $p.getColumnName("商品ｺｰﾄﾞ")
	, "Class099~" + TABLE_ID_SHIIRESAKI + ",Class074"
	, $p.getColumnName("標準仕入単価")
	, $p.getColumnName("廃番")
	, $p.getColumnName("発注仕入先ｺｰﾄﾞ")
	, $p.getColumnName("リードタイム")
	, $p.getColumnName("最小ロット")
	, "ClassA~~" + TABLE_ID_HACCHU_KANRI + ",Status"	// 発注管理~~連携ステータス
	, $p.getColumnName("チェック区分")
	, $p.getColumnName("九州発注点")
	, $p.getColumnName("関東発注点")
	, $p.getColumnName("北海道発注点")
	, $p.getColumnName("全国発注点")
	, $p.getColumnName("九州まで")
	, $p.getColumnName("関東まで")
	, $p.getColumnName("北海道まで")
	, $p.getColumnName("全国まで")
	, $p.getColumnName("九州残月表示")
	, $p.getColumnName("関東残月表示")
	, $p.getColumnName("北海道残月表示")
	, $p.getColumnName("全国残月表示")
	, $p.getColumnName("九州在庫数量")
	, $p.getColumnName("関東在庫数量")
	, $p.getColumnName("北海道在庫数量")
	, $p.getColumnName("全国在庫数量")
	, $p.getColumnName("九州一ヶ月分在庫")
	, $p.getColumnName("関東一ヶ月分在庫")
	, $p.getColumnName("北海道一ヶ月分在庫")
	, $p.getColumnName("全国一ヶ月分在庫")
	, $p.getColumnName("九州直近一年間出荷実績")
	, $p.getColumnName("関東直近一年間出荷実績")
	, $p.getColumnName("北海道直近一年間出荷実績")
	, $p.getColumnName("全国直近一年間出荷実績")
	, $p.getColumnName("出荷実績計測期間")
]

const OUTPUT_TICKET_COLUMN = [
	"商品ｺｰﾄﾞ"
	, "チケット作成日"
	, "確認期日"
	, "仕入単価"
	, "現在在庫数量_九州"
	, "現在在庫数量_関東"
	, "現在在庫数量_北海道"
	, "現在在庫数量_合計"
	, "残月_九州"
	, "残月_関東"
	, "残月_北海道"
	, "残月_全体"
	, "1か月分在庫_九州"
	, "1か月分在庫_関東"
	, "1か月分在庫_北海道"
	, "1か月分在庫_全国"
	, "年間出荷実績_九州"
	, "年間出荷実績_関東"
	, "年間出荷実績_北海道"
	, "年間出荷実績_全国"
	, "自動判定結果"
	, "入庫倉庫"
	, "発注数量"
]
/**
 * 発注チケット作成をする関数です。
 */
async function createOrderTicket() {
	let ans = window.confirm('発注チケット作成を開始しますか?')
	if (!ans) {
		console.log('発注チケット作成を開始しますか? : Noを押下しました。')
		return
	}
	console.log('発注チケット作成を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== TABLE_ID_SHOUHIN) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let records = await utilExportAjax(
		TABLE_ID_SHOUHIN
		, COLUMN_INDEX
	)

	records = utilConvertCsvTo2D(records.Response.Content)
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
			// 取引状態　:　取引中
			.filter(record => record[COLUMN_INDEX.indexOf(TORIHIKI_JOUTAI)] == WIKI_STATUS_TORIHIKI.inprogress.value)
			// 廃番　:　チェックなし
			.filter(record => record[COLUMN_INDEX.indexOf(HAIBAN)] == '')
			// 発注仕入先コード　:　入力あり
			.filter(record => record[COLUMN_INDEX.indexOf(HACCHUU_SHIIRESAKI_CODE)] !== '')
			// リードタイム　:　1以上
			.filter(record => record[COLUMN_INDEX.indexOf(LEAD_TIME)] >= 1)
			// 最小ロット　:　1以上
			.filter(record => record[COLUMN_INDEX.indexOf(MINIMUM_LOT)] >= 1)

		// 発注管理テーブルに"確認待","確認済","出荷準備中","出荷済"のチケットがない商品
		let tmpObj = {}
		records
			.filter(record => {
				return [
					WIKI_STATUS_HACCHU_KANRI.waiting.value
					, WIKI_STATUS_HACCHU_KANRI.confirmed.value
					, WIKI_STATUS_HACCHU_KANRI.preparing.value
					, WIKI_STATUS_HACCHU_KANRI.shipped.value
				].includes(record[COLUMN_INDEX.indexOf(STATUS)])
			})
			.forEach(record => tmpObj[record[COLUMN_INDEX.indexOf(RESULT_ID)]] = record[COLUMN_INDEX.indexOf(SHOUHIN_CODE)])

		records = records
			// 発注管理連携ステータス : "確認待","確認済","出荷準備中","出荷済"　を持つ商品を排除
			.filter(record =>  !(record[COLUMN_INDEX.indexOf(RESULT_ID)] in tmpObj))
			// ResultId重複削除
			.filter((record, index, self) => self.map(item => item[COLUMN_INDEX.indexOf(RESULT_ID)]).indexOf(record[COLUMN_INDEX.indexOf(RESULT_ID)]) === index)

		// 発注チケット作成処理
		let ticketList = []
		// ヘッダー情報入力
		ticketList.push(OUTPUT_TICKET_COLUMN)
		let date = new Date()
		let now = utilGetDate(date)
		let tommorow = utilGetDate(date.setDate(date.getDate() + 1))
		for (let r of records) {
			let ticket = []
			// 商品ｺｰﾄﾞ
			ticket.push(r[COLUMN_INDEX.indexOf(SHOUHIN_CODE)])
			// チケット作成日
			ticket.push(now)
			// 確認期日(チケット作成日から１日後)
			ticket.push(tommorow)
			// 仕入単価
			ticket.push(r[COLUMN_INDEX.indexOf(SHIIRE_TANKA)])
			// 現在在庫数量_九州
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_KYUSHU)])
			// 現在在庫数量_関東
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_KANTO)])
			// 現在在庫数量_北海道
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_HOKKAIDO)])
			// 現在在庫数量_全国
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_ZENKOKU)])
			// 残月_九州
			ticket.push(r[COLUMN_INDEX.indexOf(ZANGETSU_KYUSHU)])
			// 残月_関東
			ticket.push(r[COLUMN_INDEX.indexOf(ZANGETSU_KANTO)])
			// 残月_北海道
			ticket.push(r[COLUMN_INDEX.indexOf(ZANGETSU_HOKKAIDO)])
			// 残月_全国
			ticket.push(r[COLUMN_INDEX.indexOf(ZANGETSU_ZENKOKU)])
			// 1か月分在庫_九州
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_KYUSHU_1M)])
			// 1か月分在庫_関東
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_KANTO_1M)])
			// 1か月分在庫_北海道
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_HOKKAIDO_1M)])
			// 1か月分在庫_全国
			ticket.push(r[COLUMN_INDEX.indexOf(ZAIKO_ZENKOKU_1M)])
			// 年間出荷実績_九州
			ticket.push(r[COLUMN_INDEX.indexOf(JISSEKI_KYUSHU)])
			// 年間出荷実績_関東
			ticket.push(r[COLUMN_INDEX.indexOf(JISSEKI_KANTO)])
			// 年間出荷実績_北海道
			ticket.push(r[COLUMN_INDEX.indexOf(JISSEKI_HOKKAIDO)])
			// 年間出荷実績_全国
			ticket.push(r[COLUMN_INDEX.indexOf(JISSEKI_ZENKOKU)])
			// 自動判定結果
			ticket.push(getOrderReason(r))
			// チェック区分　:　九州のみ
			if (r[COLUMN_INDEX.indexOf(CHECK_KB)] == WIKI_CHECK_KB.onlyKyushu.value) {
				// 全国閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_ZENKOKU)] < 0) {
					// 入庫倉庫：九州
					ticket.push(WIKI_SOUKO_KB.kyushu.value)
					// 発注数量
					ticket.push(getOrderAmount(r[COLUMN_INDEX.indexOf(HACCHU_POINT_ZENKOKU)], r[COLUMN_INDEX.indexOf(TO_ZENKOKU)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))

					ticketList.push(ticket)
				}
			// チェック区分　:　全国
			} else if (r[COLUMN_INDEX.indexOf(CHECK_KB)] == WIKI_CHECK_KB.all.value) {
				let ticketCopy = Array.from(ticket)
				// 九州閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_KYUSHU)] < 0) {
					// 入庫倉庫：九州
					ticketCopy.push(WIKI_SOUKO_KB.kyushu.value)
					// 発注数量
					ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(HACCHU_POINT_KYUSHU)], r[COLUMN_INDEX.indexOf(TO_KYUSHU)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))

					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 関東閾値がマイナス
				if (r[COLUMN_INDEX.indexOf(TO_KANTO)] < 0) {
					// 入庫倉庫：関東
					ticketCopy.push(WIKI_SOUKO_KB.kanto.value)
					// 発注数量
					ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(HACCHU_POINT_KANTO)], r[COLUMN_INDEX.indexOf(TO_KANTO)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))

					ticketList.push(ticketCopy)
				}
				//ticketCopy = Array.from(ticket)
				// 北海道閾値がマイナス（現在は利用していない。）
				//if (r[COLUMN_INDEX.indexOf(TO_HOKKAIDO)] < 0) {
				//	// 入庫倉庫：北海道
				//	ticketCopy.push(WIKI_SOUKO_KB.hokkaido.value)
				//	// 発注数量
				//	ticketCopy.push(getOrderAmount(r[COLUMN_INDEX.indexOf(HACCHU_POINT_HOKKAIDO)], r[COLUMN_INDEX.indexOf(TO_HOKKAIDO)], r[COLUMN_INDEX.indexOf(MINIMUM_LOT)]))

				//	ticketList.push(ticketCopy)
				//}
			} else {
			// チェック区分　:　チェックしない　または　ブランク
				continue
			}
		}

		return utilConvert2DToCsv(ticketList)
	}

	/**
	 * 発注数量を算出する関数です。
	 * ( = （ 発注点 - 発注まで） を 超える最小ロットの倍数)
	 */
	function getOrderAmount(orderPoint, toOrder, minimumLot) {
		return Math.ceil((orderPoint - toOrder) / minimumLot) * minimumLot
	}

	/**
	 * 自動判定結果を算出する関数です。
	 */
	function getOrderReason(record) {
		return record[COLUMN_INDEX.indexOf(JISSEKI_KEISOKU_KIKAN)] < 6 ? '新商品の可能性がある商品です。 ' : '' + record[COLUMN_INDEX.indexOf(TO_ZENKOKU)] < 0 ? '”メーカー発注”をしてください。' : '”メーカー発注”または”倉庫間移動”をしてください。'
	}
}
