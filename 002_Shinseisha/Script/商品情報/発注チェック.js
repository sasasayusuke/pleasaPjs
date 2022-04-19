$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = checkOrder
	elem.innerText = '発注チェック'

	target.appendChild(elem)
}

const RESULT_ID_COL = 0
const SHOUHIN_CODE_COL = 1
const TORIHIKI_SHURYOU_COL = 2
const HAIBAN_COL = 3
const HACCHUU_SHIIRESAKI_CODE_COL = 4
const LEAD_TIME_COL = 5
const STATUS_COL = 6
const CHECK_KB_COL = 7

const TO_KYUSHU_COL = 8
const TO_KANTO_COL = 9
const TO_HOKKAIDO_COL = 10
const TO_ZENKOKU_COL = 11

const KYUSHU_ZAIKO_COL = 12
const KANTO_ZAIKO_COL = 13
const HOKKAIDO_ZAIKO_COL = 14
const ZENKOKU_ZAIKO_COL = 15

const KYUSHU_1M_ZAIKO_COL = 16
const KANTO_1M_ZAIKO_COL = 17
const HOKKAIDO_1M_ZAIKO_COL = 18
const ZENKOKU_1M_ZAIKO_COL = 19

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
		url: "/api/items/" + $p.siteId() + "/export",
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
						"ColumnName": "Class099~47950,CheckA"
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
						"ColumnName": "ClassA~~26839,Status"
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
				"Header": false,
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
			extractData()
		}
	})

	function extractData() {
		records = records.filter(record => {
			// 取引終了　:　チェックなし
			return record[TORIHIKI_SHURYOU_COL] == ''
		}).filter(record => {
			// 廃番　:　チェックなし
			return record[HAIBAN_COL] == ''
		}).filter(record => {
			// 発注仕入先コード　:　入力あり
			return record[HACCHUU_SHIIRESAKI_CODE_COL] !== ''
		}).filter(record => {
			// リードタイム　:　1以上
			return record[LEAD_TIME_COL] >= 1
		})

		let tmpObj = {}
		records.filter(record => {
			return [" 確認待"," 確認済"," 出荷準備中"," 出荷済"].includes(record[STATUS_COL])
		}).forEach(record => {
			tmpObj[record[RESULT_ID_COL]] = record[SHOUHIN_CODE_COL]
		})

		records = records.filter(record => {
			// 発注管理連携ステータス : "確認待","確認済","出庫準備中","出庫済"　を持つ商品を排除
			return !(record[RESULT_ID_COL] in tmpObj)
		}).filter((record, i, self) => {
			// ResultId重複削除
			return self.map(item => item[RESULT_ID_COL]).indexOf(record[RESULT_ID_COL]) === i
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
			ticket.push(r[SHOUHIN_CODE_COL])
			// 作成日
			ticket.push(now)
			// 確認期日(作成日から１日後)
			ticket.push(tommorow)

			if (r[CHECK_KB_COL] == ' 九州のみ') {
				// 全国閾値がマイナス
				if (r[TO_ZENKOKU_COL] < 0) {
					// 入庫倉庫：九州
					ticket.push(' 九州倉庫')
					// 発注根拠
					ticket.push(getReason(r))
					// 発注数量
					ticket.push(Math.ceil(-r[TO_ZENKOKU_COL]))
					ticketList.push(ticket)
				}
			} else if (r[CHECK_KB_COL] == ' 全国') {
				let ticketCopy = Array.from(ticket)
				// 九州閾値がマイナス
				if (r[TO_KYUSHU_COL] < 0) {
					// 入庫倉庫：九州
					ticketCopy.push(' 九州倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[TO_KYUSHU_COL]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 関東閾値がマイナス
				if (r[TO_KANTO_COL] < 0) {
					// 入庫倉庫：関東
					ticketCopy.push(' 関東倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[TO_KANTO_COL]))
					ticketList.push(ticketCopy)
				}
				ticketCopy = Array.from(ticket)
				// 北海道閾値がマイナス
				if (r[TO_HOKKAIDO_COL] < 0) {
					// 入庫倉庫：北海道
					ticketCopy.push(' 北海道倉庫')
					// 発注根拠
					ticketCopy.push(getReason(r))
					// 発注数量
					ticketCopy.push(Math.ceil(-r[TO_HOKKAIDO_COL]))
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
		let advice = record[TO_ZENKOKU_COL] < 0 ? '”メーカー発注”をしてください。' : '”メーカー発注”または”倉庫間移動”をしてください。'
		let reason =
`現在在庫
	九州 : ${utilPaddingRight(record[KYUSHU_ZAIKO_COL], 7)}	関東 : ${utilPaddingRight(record[KANTO_ZAIKO_COL], 7)}	北海道 : ${utilPaddingRight(record[HOKKAIDO_ZAIKO_COL], 7)}	全国 : ${utilPaddingRight(record[ZENKOKU_ZAIKO_COL], 7)}

1ヶ月分在庫
	九州 : ${utilPaddingRight(record[KYUSHU_1M_ZAIKO_COL], 7)}	関東 : ${utilPaddingRight(record[KANTO_1M_ZAIKO_COL], 7)}	北海道 : ${utilPaddingRight(record[HOKKAIDO_1M_ZAIKO_COL], 7)}	全国 : ${utilPaddingRight(record[ZENKOKU_1M_ZAIKO_COL], 7)}

発注まで
	九州 : ${utilPaddingRight(record[TO_KYUSHU_COL], 7)}	関東 : ${utilPaddingRight(record[TO_KANTO_COL], 7)}	北海道 : ${utilPaddingRight(record[TO_HOKKAIDO_COL], 7)}	全国 : ${utilPaddingRight(record[TO_ZENKOKU_COL], 7)}

`
		return reason + advice
	}

}
