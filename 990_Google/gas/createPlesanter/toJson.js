const MARK_OK = '〇'

const ROW_HEADER = 1
const ROW_BODY = 21

const COL_NAME = 1
const COL_TYPE = 2
const COL_EDITOR = 3
const COL_LINK = 4
const COL_FILTER = 5
const COL_LIST = 6
const COL_LENGTH = 7
const COL_DECIMAL = 8
const COL_MIN = 9
const COL_MAX = 10
const COL_DEFAULT = 11
const COL_UNIT = 13
const COL_REQUIRED = 14
const COL_CHOISE = 16
const COL_DESCRIPTION = 17
const COL_CELLCSS = 18

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let type = {
	TypeTitle : {
		value: 'Title',
		name: 'タイトル',
		count: 0,
	},
	TypeBody : {
		value: 'Body',
		name: '内容',
		count: 0,
	},
	TypeComplete : {
		value: 'CompletionTime',
		name: '完了',
		count: 0,
	},
	TypeClass : {
		value: 'Class',
		name: '分類項目',
		count: 0,
	},
	TypeNumber : {
		value: 'Num',
		name: '数値項目',
		count: 0,
	},
	TypeDate : {
		value: 'Date',
		name: '日付項目',
		count: 0,
	},
	TypeDescription : {
		value: 'Description',
		name: '説明項目',
		count: 0,
	},
	TypeCheck : {
		value: 'Check',
		name: 'チェック項目',
		count: 0,
	},
	TypeAttach : {
		value: 'Attachments',
		name: '添付ファイル項目',
		count: 0,
	},
}

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
let Convertor = {
	SiteId: 0,
	SiteTitle: '',
	ReferenceType: '',
	IncludeData: false,
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
		Version: 1.017,
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
		NoDisplayIfReadOnly: false,
	},
	Publish: false,
	DisableCrossSearch: false,
	Comments: [],
}
let Permission = {
	SiteId: 0,
	Permissions: [],
}
let Permission_children = {
	ReferenceId: 0,
	DeptId: 0,
	GroupId: 0,
	UserId: 0,
	PermissionType: 511,
}

let userIdList = []
let loginIdList = []


function getSheetName() {
	return SpreadsheetApp.getActiveSheet().getName()
}

function getData() {

	var sheet = SpreadsheetApp.getActiveSheet()
	var maxRow = sheet.getLastRow()//行数
	var maxColumn = sheet.getLastColumn()//列数
	var range = sheet.getRange(ROW_BODY + 2, 1, maxRow - ROW_BODY - 1, maxColumn)
	var values = range.getValues()


	// Header情報
	getHeaderInfo(sheet)

	// Site情報
	values.forEach(v => {
		let typeName = ''
		let typeObj = Object.keys(type).filter(k => type[k].name == v[COL_TYPE])[0]
		// 型項目情報追加
		if ([type.TypeTitle.name, type.TypeBody.name, type.TypeComplete.name].includes(v[COL_TYPE])) {
			if (type[typeObj].count > 0) {
				console.log(type[typeObj].name + 'が２つ以上あります')
			}
			typeName = type[typeObj].value
			type[typeObj].count++
		} else {
			if (type[typeObj].count > 25) {
				typeName = type[typeObj].value + padding(type[typeObj].count - 25)
			} else {
				typeName = type[typeObj].value + ALPHABET[type[typeObj].count]
			}
			type[typeObj].count++
		}

		// エディタ項目情報追加
		if (v[COL_EDITOR] == MARK_OK) {
			Site.SiteSettings.EditorColumnHash.General.push(typeName)
			Site.SiteSettings.Columns.push({
				ColumnName: typeName,
				LabelText: v[COL_NAME],
				MaxLength: v[COL_LENGTH],
				Min: v[COL_MIN],
				Max: v[COL_MAX],
				DefaultInput: v[COL_DEFAULT],
				Unit: v[COL_UNIT],
				DecimalPlaces: v[COL_DECIMAL],
				ValidateRequired: v[COL_REQUIRED] == MARK_OK ? true : false,
			})
		}

		// リンク項目情報追加
		if (v[COL_LINK] == MARK_OK) {
			Site.SiteSettings.LinkColumns.push(typeName)
		}

		// フィルタ項目情報追加
		if (v[COL_FILTER] == MARK_OK) {
			Site.SiteSettings.FilterColumns.push(typeName)
		}

		// 一覧項目情報追加
		if (v[COL_LIST] == MARK_OK) {
			Site.SiteSettings.GridColumns.push(typeName)
		}
	})
	json.Sites.push(Site)
	//整形してテキストに
	return JSON.stringify(json, null, '\t')

}
function getHeaderInfo (sheet) {
	let name_col = 3
	var maxColumn = sheet.getLastColumn()//列数
	var range = sheet.getRange(ROW_HEADER, name_col, ROW_BODY - 1, maxColumn)
	var values = range.getValues()


	values.forEach(v => {
		if (v[0] == 'UserId') {
			v.shift()
			userIdList = v.filter(v => v.length !== 0)

		} else if (v[0] == 'LoginId') {
			v.shift()
			loginIdList = v.filter(v => v.length !== 0)

		} else if (v[0] == 'Version') {
			Site.SiteSettings.Version = v[1]

		} else if (v[0] == 'Server') {
			json.HeaderInfo.Server = v[1]

		} else if (v[0] == 'CreatorName') {
			json.HeaderInfo.CreatorName = v[1]

		} else if (v[0] == 'PackageTime') {
			json.HeaderInfo.PackageTime = v[1]

		} else if (v[0] == 'IncludeSitePermission') {
			json.HeaderInfo.IncludeSitePermission = v[1]

		} else if (v[0] == 'IncludeRecordPermission') {
			json.HeaderInfo.IncludeRecordPermission = v[1]

		} else if (v[0] == 'IncludeColumnPermission') {
			json.HeaderInfo.IncludeColumnPermission = v[1]

		} else if (v[0] == 'TenantId') {
			Site.TenantId = v[1]

		} else if (v[0] == 'Body') {
			Site.Body = v[1]

		} else if (v[0] == 'GridGuide') {
			Site.GridGuide = v[1]

		} else if (v[0] == 'EditorGuide') {
			Site.EditorGuide = v[1]

		} else if (v[0] == 'Publish') {
			Site.Publish = v[1]

		} else if (v[0] == 'DisableCrossSearch') {
			Site.DisableCrossSearch = v[1]

		} else if (v[0] == 'ReferenceType') {
			Site.ReferenceType = v[1]
			Site.SiteSettings.ReferenceType = v[1]
		}
	})
	for (let i = 0; i < userIdList.length; i++) {
		// オブジェクトをコピー
		let permission = { ...Permission_children }
		permission.UserId = userIdList[i]
		Permission.Permissions.push(permission)
		json.PermissionIdList.UserIdList.push({
			UserId: userIdList[i],
			LoginId: loginIdList[i]
		})
	}
	json.Permissions.push(Permission)

	Site.Title = sheet.getName()
	// オブジェクトをコピー
	let convertor = { ...Convertor }
	convertor.SiteTitle = Site.Title
	convertor.ReferenceType = Site.ReferenceType
	json.HeaderInfo.Convertors.push(convertor)

}

function padding (num, size = 3, min = 0, max = '9'.repeat(size)) {
	const count = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + count).substr(-1 * +size)
}


//スプレッドシート読み込み時に実行
function onOpen() {
	//メニューバーにJSON出力用メニューを追加
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	var entries = [{
		name : "JSONで出力",
		functionName : "toJson"
	}]
	spreadsheet.addMenu("pleasanter用JSON出力", entries)
}

//ダウンロードダイヤログ表示
function toJson() {
	//ダイヤログテンプレート読み込み
	var dl_html = HtmlService.createTemplateFromFile("downloadDialog").evaluate()

	//ダイヤログ表示
	SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード")
}


