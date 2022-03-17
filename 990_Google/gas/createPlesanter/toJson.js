const MARK_OK = '〇'
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const HEADER_START_ROW = 2
const TABLE_START_ROW = 26
const INPUT_START_COL = 5


let json = {
	HeaderInfo: {
		BaseSiteId: 0,
		Server: '',
		CreatorName: '',
		PackageTime: '',
		Convertors: [],
		IncludeSitePermission: true,
		IncludeRecordPermission: true,
		IncludeColumnPermission: true,
	},
	Sites: [],
	Data: [],
	Permissions: [],
	PermissionIdList: {
		DeptIdList: [],
		GroupIdList: [],
		UserIdList: [],
	}
}

let Site = {
	TenantId: 0,
	SiteId: 0,
	Title: '',
	Body: '',
	GridGuide: '',
	EditorGuide: '',
	ReferenceType: '',
	ParentId: 0,
	InheritPermission: 0,
	SiteSettings: {
		Version: 0,
		ReferenceType: '',
		GridColumns: [],
		FilterColumns: [],
		EditorColumnHash: {
			General: [],
		},
		TabLatestId: 0,
		Tabs: [],
		SectionLatestId: 0,
		Sections: [],
		LinkColumns: [],
		Columns: [],
		Links: [],
		Exports: [],
		Styles: [],
		Scripts: [],
		NoDisplayIfReadOnly: false,
	},
	Publish: false,
	DisableCrossSearch: false,
	Comments: [],
}


function getData() {

	try {
		var sheet = SpreadsheetApp.getActiveSheet()

		// 入力情報
		let inputInfo = {
			headerInfo: {
				TenantId: '',
				Version: '',
				Server: '',
				CreatorName: '',
				PackageTime: '',
				SiteID: '',
				Body: '',
				GridGuide: '',
				EditorGuide: '',
				IncludeSitePermission: '',
				IncludeRecordPermission: '',
				IncludeColumnPermission: '',
				Publish: '',
				DisableCrossSearch: '',
				ReferenceType: '',
				UserId: '',
				LoginId: '',
				PermissionType: '',
				StyleTitle: '',
				StyleContent: '',
				ScriptTitle: '',
				ScriptContent: '',
			},
			tableInfo: {
				Index: '',
				Name: '',
				Type: '',
				Format: '',
				Editor: '',
				Link: '',
				Filter: '',
				List: '',
				Length: '',
				Decimal: '',
				Min: '',
				Max: '',
				Default: '',
				Unit: '',
				Required: '',
				Duplicate: '',
				Choise: '',
				Description: '',
				Cellcss: '',
				Multiple: '',
				Nowrap: '',
			},
		}
		// テーブル型情報
		let referenceTypeObjects = {
			Results : {
				value: 'Results',
				name: '記録テーブル',
				count: 0,
			},
			Issues : {
				value: 'Issues',
				name: '期限付きテーブル',
				count: 0,
			},
		}

		// 型情報
		let typeObjects = {
			Title : {
				value: 'Title',
				name: 'タイトル',
				count: 0,
			},
			Body : {
				value: 'Body',
				name: '内容',
				count: 0,
			},
			CompletionTime : {
				value: 'CompletionTime',
				name: '完了',
				count: 0,
			},
			Class : {
				value: 'Class',
				name: '分類項目',
				count: 0,
			},
			Num : {
				value: 'Num',
				name: '数値項目',
				count: 0,
			},
			Date : {
				value: 'Date',
				name: '日付項目',
				count: 0,
			},
			Description : {
				value: 'Description',
				name: '説明項目',
				count: 0,
			},
			Check : {
				value: 'Check',
				name: 'チェック項目',
				count: 0,
			},
			Attachments : {
				value: 'Attachments',
				name: '添付ファイル項目',
				count: 0,
			},
			Section : {
				value: 'Section',
				name: '見出し',
				count: 0,
			},
		}
		let h = inputInfo.headerInfo
		let t = inputInfo.tableInfo
		// ヘッダー入力情報の読み込み
		Object.keys(h).forEach((value, index) => {
			if (value == 'UserId' || value == 'LoginId' || value == 'PermissionType' || value == 'StyleTitle' || value == 'StyleContent'|| value == 'ScriptTitle' || value == 'ScriptContent') {
				h[value] = sheet.getRange(HEADER_START_ROW + index, INPUT_START_COL, 1, 20).getValues()[0].filter(Boolean)
			} else {
				h[value] = sheet.getRange(HEADER_START_ROW + index, INPUT_START_COL).getValue()
			}
		})

		// テーブル入力情報の読み込み
		let maxRow = sheet.getLastRow()//最終行
		let maxColumn = sheet.getLastColumn()//最終列
		let tableValues = sheet.getRange(TABLE_START_ROW, 1, maxRow - TABLE_START_ROW + 1, maxColumn).getValues()


		// ヘッダー入力情報の書き込み
		Site.TenantId = h.TenantId
		Site.SiteId = h.SiteID
		Site.Title = sheet.getName()
		Site.Body = h.Body
		Site.GridGuide = h.GridGuide
		Site.EditorGuide = h.EditorGuide
		Site.ReferenceType = h.ReferenceType
		Site.Publish = h.Publish
		Site.DisableCrossSearch = h.DisableCrossSearch
		Site.SiteSettings.Version = h.Version

		if ([referenceTypeObjects.Issues.value, referenceTypeObjects.Results.value].includes(h.ReferenceType)) {
			Site.SiteSettings.ReferenceType = h.ReferenceType
		} else {
			throw new Error('テーブル型情報が間違っています。')
		}

		json.HeaderInfo.BaseSiteId = h.SiteID
		json.HeaderInfo.Server = h.Server
		json.HeaderInfo.CreatorName = h.CreatorName
		json.HeaderInfo.PackageTime = h.PackageTime
		json.HeaderInfo.IncludeSitePermission = h.IncludeSitePermission
		json.HeaderInfo.IncludeRecordPermission = h.IncludeRecordPermission
		json.HeaderInfo.IncludeColumnPermission = h.IncludeColumnPermission

		// Convertor情報を追加　
		let convertorInfo = {
			SiteId: h.SiteID,
			SiteTitle: '',
			ReferenceType: '',
			IncludeData: false,
		}
		convertorInfo.SiteTitle = Site.Title
		convertorInfo.ReferenceType = Site.ReferenceType
		json.HeaderInfo.Convertors.push(convertorInfo)


		// 許可情報を追加
		let permissionInfo = {
			SiteId: h.SiteID,
			Permissions: [],
		}
		for (let i = 0; i < h.UserId.length; i++) {
			permissionInfo.Permissions.push({
				ReferenceId: h.SiteID,
				DeptId: 0,
				GroupId: 0,
				UserId: h.UserId[i],
				PermissionType: h.PermissionType[i],
			})
			json.PermissionIdList.UserIdList.push({
				UserId: h.UserId[i],
				LoginId: h.LoginId[i],
			})
		}
		json.Permissions.push(permissionInfo)


		// style情報を追加
		for (let i = 0; i < h.StyleTitle.length; i++) {
			Site.SiteSettings.Styles.push({
				Id: i + 1,
				Title: h.StyleTitle[i],
				All: true,
				Body: h.StyleContent[i],
			})
		}

		// script情報を追加
		for (let i = 0; i < h.ScriptTitle.length; i++) {
			Site.SiteSettings.Scripts.push({
				Id: i + 1,
				Title: h.ScriptTitle[i],
				All: true,
				Body: h.ScriptContent[i],
			})
		}


	// テーブル入力情報の書き込み
		tableValues.forEach((v, i) => {
			//　型
			let tobj = ""
			if (Object.keys(typeObjects).filter(k => typeObjects[k].name == v[getIndex(t, 'Type')]).length == 1){
				tobj = Object.keys(typeObjects).filter(k => typeObjects[k].name == v[getIndex(t, 'Type')])[0]
			} else {
				throw new Error('不正な型が入力されています。')
			}
			//　型名
			let tname = ''

			// 型名：見出し項目
			if (tobj == typeObjects.Section.value) {
				Site.SiteSettings.SectionLatestId++
				Site.SiteSettings.Sections.push({
					Id: Site.SiteSettings.SectionLatestId,
					LabelText: v[getIndex(t, 'Name')],
					AllowExpand: true,
					Expand: true,
				})
				tname = '_Section-' + Site.SiteSettings.SectionLatestId

			// 型名：タイトル
			} else if (tobj == typeObjects.Title.value) {
				if (typeObjects[tobj].count > 1) {
					throw new Error(typeObjects[tobj].name + 'が２つ以上あります')
				}
				tname = typeObjects[tobj].value

			// 型名：内容
			} else if (tobj == typeObjects.Body.value) {
				if (typeObjects[tobj].count > 1) {
					throw new Error(typeObjects[tobj].name + 'が２つ以上あります')
				}
				tname = typeObjects[tobj].value

			// 型名：完了
			} else if (tobj == typeObjects.CompletionTime.value) {
				if (h.ReferenceType !== referenceTypeObjects.Issues.value) {
					throw new Error('記録テーブル以外で完了項目は使えません。')
				}
				if (typeObjects[tobj].count > 1) {
					throw new Error(typeObjects[tobj].name + 'が２つ以上あります')
				}
				tname = typeObjects[tobj].value

			// 型名：その他の項目
			} else {
				if (typeObjects[tobj].count > ALPHABET.length - 1) {
					tname = typeObjects[tobj].value + getPadding(typeObjects[tobj].count - ALPHABET.length + 1)
				} else {
					tname = typeObjects[tobj].value + ALPHABET[typeObjects[tobj].count]
				}
			}
			typeObjects[tobj].count++


			// エディタ項目情報追加
			if (v[getIndex(t, 'Editor')] == MARK_OK) {
				Site.SiteSettings.EditorColumnHash.General.push(tname)

				let editObj = {
					ColumnName: tname,
					LabelText: v[getIndex(t, 'Name')],
					Description: v[getIndex(t, 'Description')],
					FORMAT: v[getIndex(t, 'Format')],
					MaxLength: v[getIndex(t, 'Length')],
					Min: v[getIndex(t, 'Min')],
					Max: v[getIndex(t, 'Max')],
					DefaultInput: v[getIndex(t, 'Default')],
					Unit: v[getIndex(t, 'Unit')],
					DecimalPlaces: v[getIndex(t, 'Decimal')],
					ValidateRequired: v[getIndex(t, 'Required')] == MARK_OK,
					NoDuplication: v[getIndex(t, 'Duplicate')] == MARK_OK,
					MultipleSelections: v[getIndex(t, 'Multiple')] == MARK_OK,
					NoWrap: v[getIndex(t, 'Nowrap')] == MARK_OK,
					ExtendedCellCss: v[getIndex(t, 'Cellcss')],
				}

				let choiseText = isNaN(v[getIndex(t, 'Choise')]) ? v[getIndex(t, 'Choise')].replaceAll("[", "").replaceAll("]", "") : v[getIndex(t, 'Choise')]
				if (choiseText == '') {

				} else if (isNaN(choiseText)) {
					editObj.ChoicesText = v[getIndex(t, 'Choise')]
				} else {
					editObj.ChoicesText = "[[" + choiseText + "]]"
					// リンクの設定
					editObj.Link = true
					Site.SiteSettings.Links.push({
						ColumnName: tname,
						SiteId: choiseText,
					})
				}

				// 空のプロパティを削除
				for(let key in editObj) {
					if(editObj[key] == ""){
						delete editObj[key]
					}
				}
				Site.SiteSettings.Columns.push(editObj)
			}

			// リンク項目情報追加
			if (v[getIndex(t, 'Link')] == MARK_OK) {
				Site.SiteSettings.LinkColumns.push(tname)
			}

			// フィルタ項目情報追加
			if (v[getIndex(t, 'Filter')] == MARK_OK) {
				Site.SiteSettings.FilterColumns.push(tname)
			}

			// 一覧項目情報追加
			if (v[getIndex(t, 'List')] == MARK_OK) {
				Site.SiteSettings.GridColumns.push(tname)
			}

			// 採番クラス書き出し
			sheet.getRange(TABLE_START_ROW + i, 1).setValue(tname)
		})
		json.Sites.push(Site)


		return getJson()
	} catch(error) {
		Browser.msgBox(error)
	}
	finally {
		Logger.log("finallyの処理です。")
	}
}


//Json出力
function getJson () {
	return JSON.stringify(json, null, '\t')
}

//objectの何番目か返却
function getIndex (obj, str) {
	return Object.keys(obj).indexOf(str)
}

//パディング
function getPadding (num, size = 3, min = 0, max = '9'.repeat(size)) {
	const count = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + count).substr(-1 * +size)
}

//スプレッドシート読み込み時に実行
function onOpen() {
	//メニューバーにJSON出力用メニューを追加
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	var entries = [{
		name : "このテーブルのみJSONで出力",
		functionName : "toSingleJson"
	},
	{
		name : "複数テーブルをまとめてJSONで出力",
		functionName : "toMultiJson"
	}]
	spreadsheet.addMenu("pleasanter用JSON出力", entries)
}

//このテーブルのみJSONで出力するダウンロードダイアログ表示
function toSingleJson() {
	//ダイアログテンプレート読み込み
	var dl_html = HtmlService.createTemplateFromFile("downloadSingleDialog").evaluate()

	//ダイアログ表示
	SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード")
}

//複数テーブルをまとめてJSONで出力するダウンロードダイアログ表示
function toMultiJson() {
	//ダイアログテンプレート読み込み
	var dl_html = HtmlService.createTemplateFromFile("downloadMultiDialog").evaluate()

	//ダイアログ表示
	SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード")
}

function getSheetName() {
	return SpreadsheetApp.getActiveSheet().getName()
}

