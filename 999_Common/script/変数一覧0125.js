var api_version = 1.0

var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "https://pcls-dev.cit.nhk.or.jp"

var TABLE_INFO = {
    "イベント": {
        index: 5460,
        status: `
            100,下書き,下書,status-new
            200,受付中,受付中,status-preparation
            900,終了,終了,status-closed
        `,
        column: {
            "DateA": {
                "label": "購買依頼報告書締切日",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
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
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [],
                "display": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [],
                "display": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [],
                "display": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [],
                "display": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [],
                "display": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [],
                "display": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [],
                "display": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [],
                "display": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [],
                "display": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "display": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [],
                "display": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [],
                "display": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [],
                "display": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [],
                "display": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [],
                "display": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [],
                "display": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [],
                "display": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [],
                "display": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [],
                "display": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [],
                "display": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [],
                "display": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [],
                "display": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [],
                "display": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [],
                "display": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [],
                "display": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [],
                "display": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [],
                "display": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [],
                "display": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [],
                "display": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [],
                "display": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
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
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [],
                "display": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    "メッセージログ": {
        index: 5474,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "解析用",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    "処理ログ": {
        index: 5475,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "display": []
            },
            "NumA": {
                "label": "進捗率",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    "帳票出力ログ": {
        index: 5473,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "処理ログ",
                "readOnly": [],
                "display": []
            },
            "AttachmentsA": {
                "label": "出力帳票",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "解析用",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "説明C",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "説明D",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "説明E",
                "readOnly": [],
                "display": []
            }
        }
    },
    "部局情報": {
        index: 5679,
        column: {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [],
                "display": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "display": []
            }
        }
    },
    "在庫管理": {
        index: 8929,
        column: {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [],
                "display": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [],
                "display": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [],
                "display": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [],
                "display": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "優先DNS",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "代替DNS",
                "readOnly": [],
                "display": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [],
                "display": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [],
                "display": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [],
                "display": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [],
                "display": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [],
                "display": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [],
                "display": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [],
                "display": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [],
                "display": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [],
                "display": []
            },
            "ClassU": {
                "label": "貸出ステータス",
                "readOnly": [],
                "display": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [],
                "display": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [],
                "display": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [],
                "display": []
            },
            "ClassY": {
                "label": "優先MAC",
                "readOnly": [],
                "display": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [],
                "display": []
            },
            "Class001": {
                "label": "備品シール",
                "readOnly": [],
                "display": []
            },
            "Class002": {
                "label": "過放電シール",
                "readOnly": [],
                "display": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "PC管理センターキッティング開始日",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "設置場所/配布部署",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "管理担当者（職員番号）",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,DateD": {
                "label": "貸出開始日",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,DateE": {
                "label": "貸出終了日",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassA": {
                "label": "貸出申請書ID",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassC": {
                "label": "申請部局名",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassF": {
                "label": "担当者名",
                "readOnly": [],
                "display": []
            }
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
            "DateA": {
                "label": "購買依頼報告書締切日",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5456": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [],
                "display": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [],
                "display": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [],
                "display": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [],
                "display": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [],
                "display": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [],
                "display": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [],
                "display": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [],
                "display": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [],
                "display": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "display": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [],
                "display": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [],
                "display": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [],
                "display": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [],
                "display": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [],
                "display": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [],
                "display": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [],
                "display": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [],
                "display": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [],
                "display": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [],
                "display": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [],
                "display": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [],
                "display": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [],
                "display": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [],
                "display": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [],
                "display": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [],
                "display": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [],
                "display": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [],
                "display": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [],
                "display": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [],
                "display": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5455": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [],
                "display": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5474": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "解析用",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5475": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "display": []
            },
            "NumA": {
                "label": "進捗率",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5473": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "処理ログ",
                "readOnly": [],
                "display": []
            },
            "AttachmentsA": {
                "label": "出力帳票",
                "readOnly": [],
                "display": []
            },
            "DescriptionB": {
                "label": "解析用",
                "readOnly": [],
                "display": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "DescriptionC": {
                "label": "説明C",
                "readOnly": [],
                "display": []
            },
            "DescriptionD": {
                "label": "説明D",
                "readOnly": [],
                "display": []
            },
            "DescriptionE": {
                "label": "説明E",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "5679": {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [],
                "display": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "display": []
            }
        }
    },
    {
        "8929": {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [],
                "display": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [],
                "display": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [],
                "display": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [],
                "display": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [],
                "display": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [],
                "display": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [],
                "display": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [],
                "display": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [],
                "display": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [],
                "display": []
            },
            "ClassK": {
                "label": "優先DNS",
                "readOnly": [],
                "display": []
            },
            "ClassL": {
                "label": "代替DNS",
                "readOnly": [],
                "display": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [],
                "display": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [],
                "display": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [],
                "display": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [],
                "display": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [],
                "display": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [],
                "display": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [],
                "display": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [],
                "display": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [],
                "display": []
            },
            "ClassU": {
                "label": "貸出ステータス",
                "readOnly": [],
                "display": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [],
                "display": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [],
                "display": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [],
                "display": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [],
                "display": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [],
                "display": []
            },
            "ClassY": {
                "label": "優先MAC",
                "readOnly": [],
                "display": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [],
                "display": []
            },
            "Class001": {
                "label": "備品シール",
                "readOnly": [],
                "display": []
            },
            "Class002": {
                "label": "過放電シール",
                "readOnly": [],
                "display": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [],
                "display": []
            },
            "DateB": {
                "label": "PC管理センターキッティング開始日",
                "readOnly": [],
                "display": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [],
                "display": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [],
                "display": []
            },
            "ClassH": {
                "label": "設置場所/配布部署",
                "readOnly": [],
                "display": []
            },
            "ClassJ": {
                "label": "管理担当者（職員番号）",
                "readOnly": [],
                "display": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "display": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "display": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "display": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "display": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "display": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "display": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,DateD": {
                "label": "貸出開始日",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,DateE": {
                "label": "貸出終了日",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassA": {
                "label": "貸出申請書ID",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassC": {
                "label": "申請部局名",
                "readOnly": [],
                "display": []
            },
            "Class003~5450,ClassF": {
                "label": "担当者名",
                "readOnly": [],
                "display": []
            }
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
    for (let c of columnNames) obj[tableId][c.ColumnName] = {
        label: c.LabelText,
        readOnly: [],
        display: [],
    }
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

