var api_version = 1.0

var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "http://13.115.63.209"

var TABLE_INFO = {
    "イベント": {
        index: 5460,
        status: `
            100,下書き,下書,status-new
            200,受付中,受付中,status-preparation
            900,終了,終了,status-closed
        `,
        column: {
            "DateA": "購買依頼報告書締切日",
            "DateB": "パソコン設定登録書締切日",
            "Status": "状況",
            "ClassB": "イベントタイトル",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    "購買申請": {
        index: 5456,
        status: `
            100,PC管理者確認待ち,確認待ち,status-preparation
            400,報告書申請済み,申請済み,status-review
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `,
        column: {
            "ClassA": "イベント",
            "ClassB": "ワークフロー",
            "Status": "状況",
            "NumA": "台数1",
            "ClassC": "パソコン形状1",
            "ClassD": "経理科目1",
            "ClassE": "細節1",
            "ClassF": "部局メモ1",
            "ClassH": "パソコン形状2",
            "ClassI": "経理科目2",
            "ClassJ": "細節2",
            "ClassK": "部局メモ2",
            "NumB": "台数2",
            "ClassM": "パソコン形状3",
            "ClassN": "経理科目3",
            "ClassO": "細節3",
            "ClassP": "部局メモ3",
            "NumC": "台数3",
            "ClassR": "パソコン形状4",
            "ClassS": "パソコン形状5",
            "ClassT": "パソコン形状6",
            "ClassU": "パソコン形状7",
            "ClassV": "パソコン形状8",
            "ClassW": "パソコン形状9",
            "NumD": "購買台数入力 - 項目数",
            "DescriptionA": "購買台数",
            "ClassX": "申請部局コード",
            "ClassY": "申請部局名",
            "ClassZ": "納入先部局コード",
            "Class001": "納入先部局名",
            "Class002": "氏名",
            "Class003": "外線番号",
            "Class004": "内線番号",
            "Class005": "メールアドレス",
            "Class006": "送付先住所1",
            "DescriptionB": "備考",
            "DescriptionC": "備考1",
            "DescriptionD": "備考2",
            "DescriptionE": "備考3",
            "ClassG": "送付先住所2",
            "ClassL": "送付先住所3",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    "購買報告書": {
        index: 5455,
        status: `
            100,未確認,未確認,status-new
            150,提出済,提出済,status-review
            200,経理担当者承認待ち,経理待,status-preparation
            300,照査者承認待ち,照査者待,status-preparation
            400,決定者承認待ち,決定者待,status-inprogress
            500,NT承認待ち,NT待,status-inprogress
            900,完了,完,status-closed
            910,差戻し,差戻,status-rejected
        `,
        column: {
            "ClassA": "イベント",
            "Status": "ステータス",
            "ClassC": "経理担当 - 氏名",
            "ClassD": "経理担当 - 役職",
            "ClassE": "照査者 - 氏名",
            "ClassF": "照査者 - 役職",
            "ClassG": "決定者 - 氏名",
            "ClassH": "決定者 - 役職",
            "DateA": "経理担当 - 承認日",
            "DateB": "照査者 - 承認日",
            "DateC": "決定者 - 承認日",
            "DescriptionA": "購買台数",
            "ClassB": "申請部局",
            "ClassI": "提出者",
            "ClassJ": "内線",
            "ClassK": "外線",
            "ClassL": "メールアドレス",
            "DescriptionB": "備考",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    "メッセージログ": {
        index: 5474,
        column: {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "DescriptionB": "内容",
            "ClassB": "テーブルID",
            "DescriptionC": "解析用",
            "ClassC": "レコードID",
            "DescriptionD": "更新済ID",
            "DescriptionE": "作成済ID",
            "ClassD": "処理ID",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    "処理ログ": {
        index: 5475,
        column: {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "DescriptionB": "内容",
            "ClassB": "テーブルID",
            "ClassC": "レコードID",
            "DescriptionD": "更新済ID",
            "DescriptionE": "作成済ID",
            "NumA": "進捗率",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    "帳票出力ログ": {
        index: 5473,
        column: {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "ClassB": "テーブルID",
            "ClassC": "レコードID",
            "ClassD": "処理ログ",
            "AttachmentsA": "出力帳票",
            "DescriptionB": "解析用",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン",
            "DescriptionC": "説明C",
            "DescriptionD": "説明D",
            "DescriptionE": "説明E"
        }
    },
    "部局情報": {
        index: 5679,
        column: {
            "ClassA": "部局コード",
            "ClassB": "部局名",
            "ClassC": "親部局コード",
            "Owner": "担当者",
            "ResultId": "ID",
            "Status": "状況",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン",
            "ClassC~5679,ClassB": "部局名",
            "ClassC~5679,ClassA": "部局コード"
        }
    },
}

var CODE_INFO = {
    "計算書区分": {

    }
}

/**
 * 下記コマンドで取得
 * Promise.all(Object.keys(TABLE_INFO).map(async key => commonGetColumnNames(TABLE_INFO[key].index)))
 *
 *
[
    {
        "5460": {
            "DateA": "購買依頼報告書締切日",
            "DateB": "パソコン設定登録書締切日",
            "Status": "状況",
            "ClassB": "イベントタイトル",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    {
        "5456": {
            "ClassA": "イベント",
            "ClassB": "ワークフロー",
            "Status": "状況",
            "NumA": "台数1",
            "ClassC": "パソコン形状1",
            "ClassD": "経理科目1",
            "ClassE": "細節1",
            "ClassF": "部局メモ1",
            "ClassH": "パソコン形状2",
            "ClassI": "経理科目2",
            "ClassJ": "細節2",
            "ClassK": "部局メモ2",
            "NumB": "台数2",
            "ClassM": "パソコン形状3",
            "ClassN": "経理科目3",
            "ClassO": "細節3",
            "ClassP": "部局メモ3",
            "NumC": "台数3",
            "ClassR": "パソコン形状4",
            "ClassS": "パソコン形状5",
            "ClassT": "パソコン形状6",
            "ClassU": "パソコン形状7",
            "ClassV": "パソコン形状8",
            "ClassW": "パソコン形状9",
            "NumD": "購買台数入力 - 項目数",
            "DescriptionA": "購買台数",
            "ClassX": "申請部局コード",
            "ClassY": "申請部局名",
            "ClassZ": "納入先部局コード",
            "Class001": "納入先部局名",
            "Class002": "氏名",
            "Class003": "外線番号",
            "Class004": "内線番号",
            "Class005": "メールアドレス",
            "Class006": "送付先住所1",
            "DescriptionB": "備考",
            "DescriptionC": "備考1",
            "DescriptionD": "備考2",
            "DescriptionE": "備考3",
            "ClassG": "送付先住所2",
            "ClassL": "送付先住所3",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    {
        "5455": {
            "ClassA": "イベント",
            "Status": "ステータス",
            "ClassC": "経理担当 - 氏名",
            "ClassD": "経理担当 - 役職",
            "ClassE": "照査者 - 氏名",
            "ClassF": "照査者 - 役職",
            "ClassG": "決定者 - 氏名",
            "ClassH": "決定者 - 役職",
            "DateA": "経理担当 - 承認日",
            "DateB": "照査者 - 承認日",
            "DateC": "決定者 - 承認日",
            "DescriptionA": "購買台数",
            "ClassB": "申請部局",
            "ClassI": "提出者",
            "ClassJ": "内線",
            "ClassK": "外線",
            "ClassL": "メールアドレス",
            "DescriptionB": "備考",
            "Owner": "担当者",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    {
        "5474": {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "DescriptionB": "内容",
            "ClassB": "テーブルID",
            "DescriptionC": "解析用",
            "ClassC": "レコードID",
            "DescriptionD": "更新済ID",
            "DescriptionE": "作成済ID",
            "ClassD": "処理ID",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    {
        "5475": {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "DescriptionB": "内容",
            "ClassB": "テーブルID",
            "ClassC": "レコードID",
            "DescriptionD": "更新済ID",
            "DescriptionE": "作成済ID",
            "NumA": "進捗率",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン"
        }
    },
    {
        "5473": {
            "Status": "状況",
            "ClassA": "処理ID",
            "DescriptionA": "メッセージ",
            "ClassB": "テーブルID",
            "ClassC": "レコードID",
            "ClassD": "処理ログ",
            "AttachmentsA": "出力帳票",
            "DescriptionB": "解析用",
            "Manager": "管理者",
            "Owner": "担当者",
            "ResultId": "ID",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン",
            "DescriptionC": "説明C",
            "DescriptionD": "説明D",
            "DescriptionE": "説明E"
        }
    },
    {
        "5679": {
            "ClassA": "部局コード",
            "ClassB": "部局名",
            "ClassC": "親部局コード",
            "Owner": "担当者",
            "ResultId": "ID",
            "Status": "状況",
            "Title": "タイトル",
            "UpdatedTime": "更新日時",
            "Comments": "コメント",
            "Updator": "更新者",
            "Ver": "バージョン",
            "ClassC~5679,ClassB": "部局名",
            "ClassC~5679,ClassA": "部局コード"
        }
    }
]
 */


/**
 * columnNameの集合を取得
 * @param {String}    tableId テーブルID
 * @return {Object}   obj
 */
async function commonGetColumnNames(tableId) {
    let columnNames = {}
    // 取得済み(保存用変数から取得)

    let data = await fetch(`${SERVER_URL}/items/${tableId}/index`)
    let html = await data.text()
    let dom = new DOMParser().parseFromString(html, 'text/html')
    columnNames = JSON.parse(dom.getElementById("Columns").value)
    let obj = {}
    obj[tableId] = {}
    // 保存用変数
    for (let c of columnNames) obj[tableId][c.ColumnName] = c.LabelText
    return obj
}

/**
 * columnNameを取得
 * @param {String}    table テーブル名
 * @param {String}    label ラベル名
 * @return {String}   columnName
 */
function commonGetColumnName(table, label) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetColumnName：テーブル名不正。${table}`
            commonMessage(ERROR, message)
            throw new Error(message)
        }
        if (!"column" in TABLE_INFO) {
            let message = `共通関数commonGetColumnName：column未登録。${table}`
            commonMessage(ERROR, message)
            throw new Error(message)
        }
        let column = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].column
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v] == label)
        if (data.length == 0) {
            let message = `共通関数commonGetColumnName：ラベル名不正。${label}`
            commonMessage(ERROR, message)
            throw new Error(message)
        } else if (data.length > 1) {
            let message = `共通関数commonGetColumnName：ラベル名重複。${label}`
            commonMessage(ERROR, message)
            throw new Error(message)
        }
        return data[0]
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * statusを取得
 * @param {String}      table     テーブル名
 * @param {Boolean}     format    成形
 * @return {String}     status
 */
function commonGetStatuses(table, format = true) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetStatus：テーブル名不正。${table}`
            commonMessage(ERROR, message)
            throw new Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数commonGetStatus：status未登録。${table}`
            commonMessage(ERROR, message)
            throw new Error(message)
        }
        let status = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].status
        if (format) {
            status = status.trim().split("\n")
                .map(v => v.trim())
                .map(v => {
                    val = v.split(",")
                    let obj = {}
                    obj.index = val[0]
                    obj.name = val[1]
                    obj.label = val[2]
                    obj.style = val[3]
                    return obj
                })
        }
        return status
    } catch (err) {
        // 再スロー
        throw err
    }
}

