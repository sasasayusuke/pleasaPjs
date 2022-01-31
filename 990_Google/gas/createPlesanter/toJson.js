const MARK_OK = '〇'
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const HEADER_START_ROW = 2
const SITE_START_ROW = 12
const TABLE_START_ROW = 23

const ROW = 0
const COL = 1

let cell = {
	header_info: {
		UserId: [HEADER_START_ROW + 1, 4],
		LoginId: [HEADER_START_ROW + 2, 4],
		Version: [HEADER_START_ROW + 3, 4],
		Server: [HEADER_START_ROW + 4, 4],
		CreatorName: [HEADER_START_ROW + 5, 4],
		PackageTime: [HEADER_START_ROW + 6, 4],
		IncludeSitePermission: [HEADER_START_ROW + 7, 4],
		IncludeRecordPermission: [HEADER_START_ROW + 8, 4],
		IncludeColumnPermission: [HEADER_START_ROW + 9, 4],
	},
	site_info: {
		TenantId: [SITE_START_ROW + 1, 4],
		Body: [SITE_START_ROW + 2, 4],
		GridGuide: [SITE_START_ROW + 3, 4],
		EditorGuide: [SITE_START_ROW + 4, 4],
		Publish: [SITE_START_ROW + 5, 4],
		DisableCrossSearch: [SITE_START_ROW + 6, 4],
		ReferenceType: [SITE_START_ROW + 7, 4],
	},
	table_info: {
		Index: [TABLE_START_ROW , 1],
		Name: [TABLE_START_ROW , 2],
		Type: [TABLE_START_ROW , 3],
		Format: [TABLE_START_ROW , 4],
		Editor: [TABLE_START_ROW , 5],
		Link: [TABLE_START_ROW , 6],
		Filter: [TABLE_START_ROW , 7],
		List: [TABLE_START_ROW , 8],
		Length: [TABLE_START_ROW , 9],
		Decimal: [TABLE_START_ROW , 10],
		Min: [TABLE_START_ROW , 11],
		Max: [TABLE_START_ROW , 12],
		Default: [TABLE_START_ROW , 13],
		Unit: [TABLE_START_ROW , 14],
		Required: [TABLE_START_ROW , 15],
		Duplicate: [TABLE_START_ROW , 16],
		Choise: [TABLE_START_ROW , 17],
		Description: [TABLE_START_ROW , 18],
		Cellcss: [TABLE_START_ROW , 19],
		Multiple: [TABLE_START_ROW , 20],
		Nowrap: [TABLE_START_ROW , 21],
	},
}

let type = {
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
	Complete : {
		value: 'CompletionTime',
		name: '完了',
		count: 0,
	},
	Class : {
		value: 'Class',
		name: '分類項目',
		count: 0,
	},
	Number : {
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
	Attach : {
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

let userIdList = []
let loginIdList = []

function getData() {

	var sheet = SpreadsheetApp.getActiveSheet()
	try {
		// Header情報
		getHeaderInfo(sheet)
		// Site情報
		getSiteInfo(sheet)
		return getJson()
	} catch(error) {
		Browser.msgBox(error)
	}
	finally {
		Logger.log("finallyの処理です。")
	}
}

function getJson() {
	return JSON.stringify(json, null, '\t')
}

function getSiteInfo(sheet) {

	let maxRow = sheet.getLastRow()//行数
	let maxColumn = sheet.getLastColumn()//列数
	let range = sheet.getRange(TABLE_START_ROW, 1, maxRow - TABLE_START_ROW + 1, maxColumn)
	let values = range.getValues()
	let table = cell.table_info

	// Site情報
	values.forEach((v, index) => {
		let typeName = ''
		let typeObj = Object.keys(type).filter(k => type[k].name == v[table.Type[COL] - 1])[0]
		// 型項目情報追加
		if (v[table.Type[COL] - 1] == type.Section.name) {
			Site.SiteSettings.SectionLatestId++
			Site.SiteSettings.Sections.push({
				Id: Site.SiteSettings.SectionLatestId,
				LabelText: v[table.Name[COL] - 1],
				AllowExpand: true,
				Expand: true,
			})
			typeName = '_' + type[typeObj].value + '-' + Site.SiteSettings.SectionLatestId
		} else if ([type.Title.name, type.Body.name, type.Complete.name].includes(v[table.Type[COL] - 1])) {
			if (type[typeObj].count > 1) {
				throw new Error(type[typeObj].name + 'が２つ以上あります')
			}
			typeName = type[typeObj].value
		} else {
			if (type[typeObj].count > 25) {
				typeName = type[typeObj].value + padding(type[typeObj].count - 25)
			} else {
				typeName = type[typeObj].value + ALPHABET[type[typeObj].count]
			}
		}
		type[typeObj].count++
		// エディタ項目情報追加
		if (v[table.Editor[COL] - 1] == MARK_OK) {
			Site.SiteSettings.EditorColumnHash.General.push(typeName)
			let editObj = {
				ColumnName: typeName,
				LabelText: v[table.Name[COL] - 1],
				ChoicesText: v[table.Choise[COL] - 1],
				Description: v[table.Description[COL] - 1],
				FORMAT: v[table.Format[COL] - 1],
				MaxLength: v[table.Length[COL] - 1],
				Min: v[table.Min[COL] - 1],
				Max: v[table.Max[COL] - 1],
				DefaultInput: v[table.Default[COL] - 1],
				Unit: v[table.Unit[COL] - 1],
				DecimalPlaces: v[table.Decimal[COL] - 1],
				ValidateRequired: v[table.Required[COL] - 1] == MARK_OK,
				NoDuplication: v[table.Duplicate[COL] - 1] == MARK_OK,
				MultipleSelections: v[table.Multiple[COL] - 1] == MARK_OK,
				NoWrap: v[table.Nowrap[COL] - 1] == MARK_OK,
				Link: v[table.Choise[COL] - 1] !== "",
				ExtendedCellCss: v[table.Cellcss[COL] - 1],
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
		if (v[table.Link[COL] - 1] == MARK_OK) {
			Site.SiteSettings.LinkColumns.push(typeName)
		}

		// フィルタ項目情報追加
		if (v[table.Filter[COL] - 1] == MARK_OK) {
			Site.SiteSettings.FilterColumns.push(typeName)
		}

		// 一覧項目情報追加
		if (v[table.List[COL] - 1] == MARK_OK) {
			Site.SiteSettings.GridColumns.push(typeName)
		}

		// 採番クラス書き出し
		sheet.getRange(table.Index[ROW] + index, table.Index[COL]).setValue(typeName)
	})
	json.Sites.push(Site)
}

function getHeaderInfo (sheet) {
	header = cell.header_info
	// セルから情報を参照
	Site.SiteSettings.Version = sheet.getRange(header.Version[ROW], header.Version[COL]).getValue()
	json.HeaderInfo.Server = sheet.getRange(header.Server[ROW], header.Server[COL]).getValue()
	json.HeaderInfo.CreatorName = sheet.getRange(header.CreatorName[ROW], header.CreatorName[COL]).getValue()
	json.HeaderInfo.PackageTime = sheet.getRange(header.PackageTime[ROW], header.PackageTime[COL]).getValue()
	json.HeaderInfo.IncludeSitePermission = sheet.getRange(header.IncludeSitePermission[ROW], header.IncludeSitePermission[COL]).getValue()
	json.HeaderInfo.IncludeRecordPermission = sheet.getRange(header.IncludeRecordPermission[ROW], header.IncludeRecordPermission[COL]).getValue()
	json.HeaderInfo.IncludeColumnPermission = sheet.getRange(header.IncludeColumnPermission[ROW], header.IncludeColumnPermission[COL]).getValue()

	site = cell.site_info
	Site.TenantId = sheet.getRange(site.TenantId[ROW], site.TenantId[COL]).getValue()
	Site.Body = sheet.getRange(site.Body[ROW], site.Body[COL]).getValue()
	Site.GridGuide = sheet.getRange(site.GridGuide[ROW], site.GridGuide[COL]).getValue()
	Site.EditorGuide = sheet.getRange(site.EditorGuide[ROW], site.EditorGuide[COL]).getValue()
	Site.Publish = sheet.getRange(site.Publish[ROW], site.Publish[COL]).getValue()
	Site.DisableCrossSearch = sheet.getRange(site.DisableCrossSearch[ROW], site.DisableCrossSearch[COL]).getValue()
	Site.ReferenceType = Site.SiteSettings.ReferenceType = sheet.getRange(site.ReferenceType[ROW], site.ReferenceType[COL]).getValue()

	// 複数を想定
	userIdList = [sheet.getRange(header.UserId[ROW], header.UserId[COL]).getValue()]
	// 複数を想定
	loginIdList = [sheet.getRange(header.LoginId[ROW], header.LoginId[COL]).getValue()]

	// 許可情報を追加
	let permissionInfo = {
		SiteId: 0,
		Permissions: [],
	}
	for (let i = 0; i < userIdList.length; i++) {
		permissionInfo.Permissions.push({
			ReferenceId: 0,
			DeptId: 0,
			GroupId: 0,
			UserId: userIdList[i],
			PermissionType: 511,
		})
		json.PermissionIdList.UserIdList.push({
			UserId: userIdList[i],
			LoginId: loginIdList[i]
		})
	}
	json.Permissions.push(permissionInfo)

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

//ダウンロードダイアログ表示
function toJson() {
	//ダイアログテンプレート読み込み
	var dl_html = HtmlService.createTemplateFromFile("downloadDialog").evaluate()

	//ダイアログ表示
	SpreadsheetApp.getUi().showModalDialog(dl_html, "JSONファイルをダウンロード")
}

function getSheetName() {
	return SpreadsheetApp.getActiveSheet().getName()
}
