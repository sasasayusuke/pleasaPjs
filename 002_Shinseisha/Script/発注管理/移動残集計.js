$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumMove'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumMove
	elem.innerText = '移動残集計'

	target.appendChild(elem)
}
let indexCount = 0

const COL_INDEX_SHOUHIN_CODE = indexCount++
const COL_INDEX_IN_SOUKO = indexCount++
const COL_INDEX_OUT_SOUKO = indexCount++
const COL_INDEX_HACCHUU_SUURYOU = indexCount++
const COL_INDEX_STATUS = indexCount++

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
		url: "/api/items/" + SITE_ID_HACCHU_KANRI + "/export",
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
		// 発注管理連携ステータス : " 出荷済"," 移動中"," 補充済"　のデータを抽出
		records = records.filter(record => [" 出荷済", " 移動中"," 補充済"].includes(record[COL_INDEX_STATUS]))

		// ヘッダー情報入力
		let header = [shouhin_code , kyushu_move, kanto_move, hokkaido_move] = ["商品ｺｰﾄﾞ" , "九州移動残数量", "関東移動残数量", "北海道移動残数量"]

		let tmp = {}
		let codes = {}

		for (let r of records) {
			let key = r[COL_INDEX_SHOUHIN_CODE] + ',' + r[COL_INDEX_IN_SOUKO]
			if (!(key in tmp)) tmp[key] = 0
			if (!(r[COL_INDEX_SHOUHIN_CODE] in codes)) codes[r[COL_INDEX_SHOUHIN_CODE]] = 0
			tmp[key] += +r[COL_INDEX_HACCHUU_SUURYOU]
			if (r[COL_INDEX_STATUS] == " 出荷済") {
				// 発注管理連携ステータス : " 出荷済"の場合
				key = r[COL_INDEX_SHOUHIN_CODE] + ',' + r[COL_INDEX_OUT_SOUKO]
				if (!(key in tmp)) tmp[key] = 0
				tmp[key] -= +r[COL_INDEX_HACCHUU_SUURYOU]
			}
		}
		// 移動残集計作成処理
		let tbl = generate2DArray(Object.keys(codes).length, header.length, 0)
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
				utilSetMessage(message = " 出荷済 または 移動中 または 補充済 の " + code + 'の倉庫区分に異常または未入力項目があります。', type = WARNING)
				return
			}
			tbl.find(v => v[0] == code)[columnIndex] = tmp[t]
		}
		tbl.unshift(header)

		utilDownloadCsv(utilConvert2DToCsv(tbl), '移動残集計_' + utilGetDate("", "YYYY_MM_DD hh_mm_ss"))
	}
}
