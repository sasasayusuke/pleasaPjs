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
const HAIBAN_COL = 2
const HACCHUU_SHIIRESAKI_CODE_COL = 3
const LEAD_TIME_COL = 4
const STATUS_COL = 5
const CHECK_KB_COL = 6
const TO_KYUSHU_COL = 7
const TO_KANTO_COL = 8
const TO_HOKKAIDO_COL = 9
const TO_ZENKOKU_COL = 10

let records = []
let header = []


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
			extractData()
		}
	})
	function extractData() {
		header = records.shift()
		records = records.filter(record => {
			// 廃番　:　チェックなし
			return record[HAIBAN_COL] == ''
		}).filter(record => {
			// 発注仕入先コード　:　入力あり
			return record[HACCHUU_SHIIRESAKI_CODE_COL] !== ''
		}).filter(record => {
			// リードタイム　:　入力あり
			return record[LEAD_TIME_COL] > 0
		})

		// 発注管理連携ステータス : "確認待","確認済","出庫準備中","出庫済"　を排除
		let tmpObj = {}
		records.filter(record => {
			return [" 確認待"," 確認済"," 出荷準備中"," 出荷済"].includes(record[STATUS_COL])
		}).forEach(record => {
			tmpObj[record[RESULT_ID_COL]] = record[SHOUHIN_CODE_COL]
		})

		records = records.filter(record => {
			return !(record[RESULT_ID_COL] in tmpObj)
		})
		utilDownloadCsv(records, '発注チェック' + utilGetDate("", "_YYYY_MM_DD hh_mm_ss"))

	}

}
