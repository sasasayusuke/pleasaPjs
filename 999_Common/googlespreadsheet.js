const ROW_HEADER = 1
const ROW_BODY = 3
const COL_NO = 0
const COL_NAME = 1
const COL_TYPE = 2
// const COL_NAME = 1
// const COL_NAME = 1
// const COL_NAME = 1

let TypeClass = {
	name: 'Class',
	value: '分類項目',
	count: 0
}
let TypeNumber = {
	name: 'Num',
	value: '数値項目',
	count: 0
}
let TypeDate = {
	name: 'Date',
	value: '日付項目',
	count: 0
}
let TypeDescription = {
	name: 'Description',
	value: '説明項目',
	count: 0
}
let TypeCheck = {
	name: 'Check',
	value: 'チェック項目',
	count: 0
}

let json = {}
let gridColumns = []


function getData() {

	let sheet = SpreadsheetApp.getActiveSheet()
	let maxRow = sheet.getLastRow()//行数
	let maxColumn = sheet.getLastColumn()//列数
	let range = sheet.getRange(ROW_BODY, 1, maxRow - ROW_BODY + 1, maxColumn)
	let values = range.getValues()

	values.forEach(v => {
		let typeName = ''
		switch (v[COL_TYPE]) {
			case TypeClass.value:
				TypeClass.count++
				typeName = TypeClass.name + padding(TypeClass.count)
				break
			case TypeNumber.value:
				TypeNumber.count++
				typeName = TypeNumber.name + padding(TypeNumber.count)
				break
			case TypeDate.value:
				TypeDate.count++
				typeName = TypeDate.name + padding(TypeDate.count)
				break
			case TypeDescription.value:
				TypeDescription.count++
				typeName = TypeDescription.name + padding(TypeDescription.count)
				break
			case TypeCheck.value:
				TypeCheck.count++
				typeName = TypeCheck.name + padding(TypeCheck.count)
				break
		}
		gridColumns.push(typeName)
	})
	json['GridColumns'] = gridColumns
	console.log(json)
	//整形してテキストに
	// return JSON.stringify(json, null, '\t')
}

function padding (num, size = 3, min = 0, max = '9'.repeat(size)) {
	const padding = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + padding).substr(-1 * +size)
}

// function getData() {
//	 let sheet = SpreadsheetApp.getActiveSheet()
//	 let maxRow = sheet.getLastRow()//行数 -
//	 let maxColumn = sheet.getLastColumn()//列数 |
//	 let keys = []
//	 let ret = []

//	 //1列目のkeyの名前取得
//	 for (let i = 1 i <= maxColumn i++) {
//		 keys.push(sheet.getRange(i, 1).getValue())
//	 }

//	 //データ
//	 for (let y = 2 y <= maxRow y++) {
//		 let json = {}
//		 for (let x = 1 x <= maxColumn x++) {
//			 json[keys[x-1]] = sheet.getRange(y, x).getValue()
//		 }
//		 ret.push(json)
//	 }

//	 //整形してテキストに
//	 return JSON.stringify(ret, null, '\t')
// }


function main() {
	let html = HtmlService.createTemplateFromFile("dialog").evaluate()
	SpreadsheetApp.getUi().showModalDialog(html, "ファイルダウンロード")
}

function onOpen() {
	// メニューバーにカスタムメニューを追加
	let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	let entries = [{
		name : "jsonで出力",
		functionName : "main"
	}]
	spreadsheet.addMenu("Pleasanter用Json作成", entries)
}