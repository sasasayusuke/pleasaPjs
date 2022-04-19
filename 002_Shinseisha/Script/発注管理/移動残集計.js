$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumMove'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumMove
	elem.innerText = '移動残集計'

	target.appendChild(elem)
}

const SHOUHIN_CODE_COL = 0
const IN_SOUKO_COL = 1
const OUT_SOUKO_COL = 2
const HACCHUU_SUURYOU_COL = 3
const STATUS_COL = 4

let records = []

function sumMove() {
	let ans = window.confirm('移動残集計を開始しますか?')
	if (!ans) {
		console.log('移動残集計を開始しますか? : Noを押下しました。')
		return
	}
	console.log('移動残集計を開始しますか? : Yesを押下しました。')
	$.ajax({
		type: "POST",
		url: "/api/items/" + $p.siteId() + "/export",
		contentType: 'application/json',
		data:JSON.stringify({
			"ApiVersion": 1.1,
			"Export": {
				"Columns":[
					// 商品コード
					{
						"ColumnName": "ClassA"
					},
					// 入庫倉庫
					{
						"ColumnName": "ClassF"
					},
					// 出庫倉庫
					{
						"ColumnName": "ClassG"
					},
					// 発注数量
					{
						"ColumnName": "NumA"
					},
					// 連携ステータス
					{
						"ColumnName": "Status"
					}
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
		// 発注管理連携ステータス : " 出荷済"," 移動中"," 補充済"　のデータを抽出
		records = records.filter(record => [" 出荷済", " 移動中"," 補充済"].includes(record[STATUS_COL]))

		// ヘッダー情報入力
		let header = ["商品ｺｰﾄﾞ" , "九州移動残数量", "関東移動残数量", "北海道移動残数量"]

		let tmp = {}
		let codes = {}

		for (let r of records) {
			let key = r[SHOUHIN_CODE_COL] + ',' + r[IN_SOUKO_COL]
			if (!(key in tmp)) tmp[key] = 0
			if (!(r[SHOUHIN_CODE_COL] in codes)) codes[r[SHOUHIN_CODE_COL]] = 0
			tmp[key] += +r[HACCHUU_SUURYOU_COL]
			if (r[STATUS_COL] == " 出荷済") {
				// 発注管理連携ステータス : " 出荷済"の場合
				key = r[SHOUHIN_CODE_COL] + ',' + r[OUT_SOUKO_COL]
				if (!(key in tmp)) tmp[key] = 0
				tmp[key] -= +r[HACCHUU_SUURYOU_COL]
			}
		}
		// 移動残集計作成処理
		let tbl = generate2DArray(Object.keys(codes).length, header.length, 0)
		for (let r = 0; r < tbl.length; r++) {
			tbl[r][0] = Object.keys(codes)[r]
		}

		for (let t in tmp) {
			let [code, souko] = t.split(',')
			let columIndex = 0
			if (souko == " 九州倉庫") {
				columIndex = 1
			} else if (souko == " 関東倉庫") {
				columIndex = 2
			} else if (souko == " 北海道倉庫") {
				columIndex = 3
			} else {
				utilSetMessage(message = " 出荷済 または 移動中 または 補充済 の " + code + 'の倉庫区分に異常または未入力項目があります。', type = WARNING)
				return
			}
			tbl.find(v => v[0] == code)[columIndex] = tmp[t]
		}
		tbl.unshift(header)

		utilDownloadCsv(utilConvert2DToCsv(tbl), '移動残集計_' + utilGetDate("", "YYYY_MM_DD hh_mm_ss"))
	}
}
