$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = checkOrder
	elem.innerText = '発注チェック'

	target.appendChild(elem)
}
let indexCount = 0

const COL_INDEX_RESULT_ID = indexCount++
const COL_INDEX_SHOUHIN_CODE = indexCount++
const COL_INDEX_TORIHIKI_SHURYOU = indexCount++
const COL_INDEX_HAIBAN = indexCount++
const COL_INDEX_HACCHUU_SHIIRESAKI_CODE = indexCount++
const COL_INDEX_LEAD_TIME = indexCount++
const COL_INDEX_STATUS = indexCount++
const COL_INDEX_CHECK_KB = indexCount++

const COL_INDEX_TO_KYUSHU = indexCount++
const COL_INDEX_TO_KANTO = indexCount++
const COL_INDEX_TO_HOKKAIDO = indexCount++
const COL_INDEX_TO_ZENKOKU = indexCount++

const COL_INDEX_KYUSHU_ZAIKO = indexCount++
const COL_INDEX_KANTO_ZAIKO = indexCount++
const COL_INDEX_HOKKAIDO_ZAIKO = indexCount++
const COL_INDEX_ZENKOKU_ZAIKO = indexCount++

const COL_INDEX_KYUSHU_1M_ZAIKO = indexCount++
const COL_INDEX_KANTO_1M_ZAIKO = indexCount++
const COL_INDEX_HOKKAIDO_1M_ZAIKO = indexCount++
const COL_INDEX_ZENKOKU_1M_ZAIKO = indexCount++

let records = []


function checkOrder() {
	let ans = window.confirm('発注チェックを開始しますか?')
	if (!ans) {
		console.log('発注チェックを開始しますか? : Noを押下しました。')
		return
	}
	console.log('発注チェックを開始しますか? : Yesを押下しました。')
	$.ajax({
		type: "POST",
		url: "/api/items/" + SITE_ID_SHOUHIN + "/export",
		contentType: 'application/json',
		data:JSON.stringify({
			"ApiVersion": 1.1,
			"Export": {
				"Columns":[
					{
						"ColumnName": "ResultId"
					},
					// 商品コード
					{
						"ColumnName": "Title"
					},
					// 仕入先情報~~取引終了
					{
						"ColumnName": "Class099~" + SITE_ID_SHIIRESAKI + ",CheckA"
					},
					// 廃番
					{
						"ColumnName": "CheckA"
					},
					// 発注仕入先コード
					{
						"ColumnName": "Class099"
					},
					// リードタイム
					{
						"ColumnName": "NumA"
					},
					// 発注管理~~連携ステータス
					{
						"ColumnName": "ClassA~~" + SITE_ID_HACCHU_KANRI + ",Status"
					},
					// チェック区分
					{
						"ColumnName": "ClassF"
					},
					// 九州まで
					{
						"ColumnName": "Num008"
					},
					// 関東まで
					{
						"ColumnName": "Num009"
					},
					// 北海道まで
					{
						"ColumnName": "Num010"
					},
					// 全国まで
					{
						"ColumnName": "Num011"
					},
					// 九州在庫数量
					{
						"ColumnName": "NumB"
					},
					// 関東在庫数量
					{
						"ColumnName": "NumC"
					},
					// 北海道在庫数量
					{
						"ColumnName": "NumD"
					},
					// 全国在庫数量
					{
						"ColumnName": "NumE"
					},
					// 九州一ヶ月分在庫
					{
						"ColumnName": "NumR"
					},
					// 関東一ヶ月分在庫
					{
						"ColumnName": "NumS"
					},
					// 北海道一ヶ月分在庫
					{
						"ColumnName": "NumT"
					},
					// 全国一ヶ月分在庫
					{
						"ColumnName": "NumU"
					},
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
			records = []
			for (let r of data.Response.Content.split(/\n/)) {
				records.push(JSON.parse(`[${r}]`))
			}
			let header = records.shift()
			if (header.length !== indexCount) {
				console.log(header)
				utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = WARNING)
				return
			}
			extractData()
		}
	})

	function extractData() {
		records = records.filter(record => {
			// 取引終了　:　チェックなし
			return record[COL_INDEX_TORIHIKI_SHURYOU] == ''
		}).filter(record => {
			// 廃番　:　チェックなし
			return record[COL_INDEX_HAIBAN] == ''
		}).filter(record => {
			// 発注仕入先コード　:　入力あり
			return record[COL_INDEX_HACCHUU_SHIIRESAKI_CODE] !== ''
		}).filter(record => {
			// リードタイム　:　1以上
			return record[COL_INDEX_LEAD_TIME] >= 1
		})

		// 発注管理テーブルに"確認待","確認済","出庫準備中","出庫済"のチケットがない商品
		let tmpObj = {}
		records.filter(record => {
			return [" 確認待"," 確認済"," 出荷準備中"," 出荷済"].includes(record[COL_INDEX_STATUS])
		}).forEach(record => {
			tmpObj[record[COL_INDEX_RESULT_ID]] = record[COL_INDEX_SHOUHIN_CODE]
		})

		records = records.filter(record => {
			// 発注管理連携ステータス : "確認待","確認済","出庫準備中","出庫済"　を持つ商品を排除
			return !(record[COL_INDEX_RESULT_ID] in tmpObj)
		}).filter((record, i, self) => {
			// ResultId重複削除
			return self.map(item => item[COL_INDEX_RESULT_ID]).indexOf(record[COL_INDEX_RESULT_ID]) === i
		})

		// 発注チケット作成処理
		let ticketList = []
		// ヘッダー情報入力
		ticketList.push(["商品ｺｰﾄﾞ" , "作成日" ,"確認期日" ,"入庫倉庫" ,"発注根拠", "発注数量"])
		let date = new Date()
		let now = utilGetDate(date)
		let tommorow = utilGetDate(date.setDate(date.getDate() + 1))
		tommorow
		for (let r of records) {
			let ticket = []
			// 商品ｺｰﾄﾞ
			ticket.push(r[COL_INDEX_SHOUHIN_CODE])
			// 作成日
			ticket.push(now)
			// 確認期日(作成日から１日後)
			ticket.push(tommorow)

			if (r[COL_INDEX_CHECK_KB] == ' 九州のみ') {
				// 全国閾値がマイナス
				if (r[COL_INDEX_TO_ZENKOKU] < 0) {
					// 入庫倉庫：九州
					ticket.push(' 九州倉庫')
					// 発注根拠
					ticket.push(getReason(r))
					// 発注数量
					ticket.push(Math.ceil(-r[COL_INDEX_TO_ZENKOKU]))
					ticketList.push(ticket)
				}
			} else if (r[COL_INDEX_CHECK_KB] == ' 全国') {
				let ticketCopy = Array.from(ticket)
				// 九州閾値がマイナス
				if (r[COL_INDEX_TO_KYUSHU] < 0) {
					// 入庫倉庫：九州
					ticketCopy.push(' 九州倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[COL_INDEX_TO_KYUSHU]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 関東閾値がマイナス
				if (r[COL_INDEX_TO_KANTO] < 0) {
					// 入庫倉庫：関東
					ticketCopy.push(' 関東倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[COL_INDEX_TO_KANTO]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 北海道閾値がマイナス
				if (r[COL_INDEX_TO_HOKKAIDO] < 0) {
					// 入庫倉庫：北海道
					ticketCopy.push(' 北海道倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[COL_INDEX_TO_HOKKAIDO]))
					ticketList.push(ticketCopy)
				}
			} else {
			// チェック区分　:　チェックしない
				continue
			}
		}

		utilDownloadCsv(utilConvert2DToCsv(ticketList), '発注チェック_' + utilGetDate(now, "YYYY_MM_DD hh_mm_ss"))

	}

	function getReason(record) {
		let advice = record[COL_INDEX_TO_ZENKOKU] < 0 ? '”メーカー発注”をしてください。' : '”メーカー発注”または”倉庫間移動”をしてください。'
		let reason =
`現在在庫
	九州 : ${utilPaddingRight(record[COL_INDEX_KYUSHU_ZAIKO], 7)}	関東 : ${utilPaddingRight(record[COL_INDEX_KANTO_ZAIKO], 7)}	北海道 : ${utilPaddingRight(record[COL_INDEX_HOKKAIDO_ZAIKO], 7)}	全国 : ${utilPaddingRight(record[COL_INDEX_ZENKOKU_ZAIKO], 7)}

1ヶ月分在庫
	九州 : ${utilPaddingRight(record[COL_INDEX_KYUSHU_1M_ZAIKO], 7)}	関東 : ${utilPaddingRight(record[COL_INDEX_KANTO_1M_ZAIKO], 7)}	北海道 : ${utilPaddingRight(record[COL_INDEX_HOKKAIDO_1M_ZAIKO], 7)}	全国 : ${utilPaddingRight(record[COL_INDEX_ZENKOKU_1M_ZAIKO], 7)}

発注まで
	九州 : ${utilPaddingRight(record[COL_INDEX_TO_KYUSHU], 7)}	関東 : ${utilPaddingRight(record[COL_INDEX_TO_KANTO], 7)}	北海道 : ${utilPaddingRight(record[COL_INDEX_TO_HOKKAIDO], 7)}	全国 : ${utilPaddingRight(record[COL_INDEX_TO_ZENKOKU], 7)}

`
		return reason + advice
	}

}
