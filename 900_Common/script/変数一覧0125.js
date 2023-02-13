var api_version = 1.0

var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "https://pcls-dev.cit.nhk.or.jp"

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
                "hidden": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5456": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [],
                "hidden": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [],
                "hidden": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [],
                "hidden": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [],
                "hidden": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [],
                "hidden": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [],
                "hidden": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [],
                "hidden": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [],
                "hidden": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [],
                "hidden": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [],
                "hidden": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [],
                "hidden": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [],
                "hidden": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [],
                "hidden": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [],
                "hidden": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [],
                "hidden": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "hidden": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [],
                "hidden": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [],
                "hidden": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [],
                "hidden": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [],
                "hidden": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [],
                "hidden": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [],
                "hidden": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [],
                "hidden": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [],
                "hidden": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [],
                "hidden": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [],
                "hidden": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [],
                "hidden": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [],
                "hidden": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [],
                "hidden": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [],
                "hidden": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [],
                "hidden": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [],
                "hidden": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [],
                "hidden": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [],
                "hidden": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [],
                "hidden": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5455": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [],
                "hidden": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [],
                "hidden": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [],
                "hidden": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [],
                "hidden": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5474": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionC": {
                "label": "解析用",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5475": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "hidden": []
            },
            "NumA": {
                "label": "進捗率",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5473": {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ログ",
                "readOnly": [],
                "hidden": []
            },
            "AttachmentsA": {
                "label": "出力帳票",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "解析用",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionC": {
                "label": "説明C",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "説明D",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "説明E",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "5679": {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    {
        "8929": {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [],
                "hidden": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [],
                "hidden": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [],
                "hidden": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [],
                "hidden": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [],
                "hidden": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [],
                "hidden": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [],
                "hidden": []
            },
            "ClassK": {
                "label": "優先DNS",
                "readOnly": [],
                "hidden": []
            },
            "ClassL": {
                "label": "代替DNS",
                "readOnly": [],
                "hidden": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [],
                "hidden": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [],
                "hidden": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [],
                "hidden": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [],
                "hidden": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [],
                "hidden": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [],
                "hidden": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [],
                "hidden": []
            },
            "ClassU": {
                "label": "貸出ステータス",
                "readOnly": [],
                "hidden": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [],
                "hidden": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [],
                "hidden": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassY": {
                "label": "優先MAC",
                "readOnly": [],
                "hidden": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [],
                "hidden": []
            },
            "Class001": {
                "label": "備品シール",
                "readOnly": [],
                "hidden": []
            },
            "Class002": {
                "label": "過放電シール",
                "readOnly": [],
                "hidden": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [],
                "hidden": []
            },
            "DateB": {
                "label": "PC管理センターキッティング開始日",
                "readOnly": [],
                "hidden": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [],
                "hidden": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [],
                "hidden": []
            },
            "ClassH": {
                "label": "設置場所/配布部署",
                "readOnly": [],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理担当者（職員番号）",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,DateD": {
                "label": "貸出開始日",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,DateE": {
                "label": "貸出終了日",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassA": {
                "label": "貸出申請書ID",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassC": {
                "label": "申請部局名",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassF": {
                "label": "担当者名",
                "readOnly": [],
                "hidden": []
            }
        }
    }
]
 */


var TABLE_INFO = {
    "イベント": {
        index: 5460,
        status: `
            100,下書き,下書,status-new
            200,受付中,受付,status-preparation
            800,購買依頼報告書締切,購締切,status-closed
            900,終了,終了,status-closed
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `,
        column: {
            "DateA": {
                "label": "購買依頼報告書締切日",
                "readOnly": [200, 800, 900],
                "hidden": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [200, 800, 900],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "パソコン形状登録": {
        index: 5461,
    },
    "購買申請": {
        index: 5456,
        status: `
            100,PC管理者確認待ち,確認待ち,status-preparation
            300,差し戻し,差し戻し,status-rejected
            400,報告書申請済み,申請済み,status-review
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `,
        column: {
            "ClassA": {
                "label": "イベント",
                "readOnly": [400],
                "hidden": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [400],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [400],
                "hidden": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [400],
                "hidden": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [400],
                "hidden": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [400],
                "hidden": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [400],
                "hidden": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [400],
                "hidden": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [400],
                "hidden": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [400],
                "hidden": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [400],
                "hidden": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [400],
                "hidden": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [400],
                "hidden": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [400],
                "hidden": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [400],
                "hidden": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [400],
                "hidden": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [400],
                "hidden": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [400],
                "hidden": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [400],
                "hidden": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [400],
                "hidden": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [400],
                "hidden": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [400],
                "hidden": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [400],
                "hidden": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [400],
                "hidden": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [400],
                "hidden": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [400],
                "hidden": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [400],
                "hidden": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [400],
                "hidden": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [400],
                "hidden": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [400],
                "hidden": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [400],
                "hidden": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [400],
                "hidden": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [400],
                "hidden": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [400],
                "hidden": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [400],
                "hidden": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [400],
                "hidden": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [400],
                "hidden": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [400],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [400],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [400],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [400],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [400],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [400],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [400],
                "hidden": []
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
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [],
                "hidden": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [],
                "hidden": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [],
                "hidden": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [],
                "hidden": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [],
                "hidden": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [],
                "hidden": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "メッセージログ": {
        index: 5474,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionC": {
                "label": "解析用",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "処理ログ": {
        index: 5475,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [],
                "hidden": []
            },
            "NumA": {
                "label": "進捗率",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "帳票出力ログ": {
        index: 5473,
        column: {
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ログ",
                "readOnly": [],
                "hidden": []
            },
            "AttachmentsA": {
                "label": "出力帳票",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionB": {
                "label": "解析用",
                "readOnly": [],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionC": {
                "label": "説明C",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionD": {
                "label": "説明D",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionE": {
                "label": "説明E",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "部局情報": {
        index: 5679,
        column: {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [],
                "hidden": []
            }
        }
    },
    "在庫管理": {
        index: 8929,
        column: {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [],
                "hidden": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [],
                "hidden": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [],
                "hidden": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [],
                "hidden": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [],
                "hidden": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [],
                "hidden": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [],
                "hidden": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [],
                "hidden": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [],
                "hidden": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [],
                "hidden": []
            },
            "ClassK": {
                "label": "優先DNS",
                "readOnly": [],
                "hidden": []
            },
            "ClassL": {
                "label": "代替DNS",
                "readOnly": [],
                "hidden": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [],
                "hidden": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [],
                "hidden": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [],
                "hidden": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [],
                "hidden": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [],
                "hidden": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [],
                "hidden": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [],
                "hidden": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [],
                "hidden": []
            },
            "ClassU": {
                "label": "貸出ステータス",
                "readOnly": [],
                "hidden": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [],
                "hidden": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [],
                "hidden": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [],
                "hidden": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [],
                "hidden": []
            },
            "ClassY": {
                "label": "優先MAC",
                "readOnly": [],
                "hidden": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [],
                "hidden": []
            },
            "Class001": {
                "label": "備品シール",
                "readOnly": [],
                "hidden": []
            },
            "Class002": {
                "label": "過放電シール",
                "readOnly": [],
                "hidden": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [],
                "hidden": []
            },
            "DateB": {
                "label": "PC管理センターキッティング開始日",
                "readOnly": [],
                "hidden": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [],
                "hidden": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [],
                "hidden": []
            },
            "ClassH": {
                "label": "設置場所/配布部署",
                "readOnly": [],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理担当者（職員番号）",
                "readOnly": [],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,DateD": {
                "label": "貸出開始日",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,DateE": {
                "label": "貸出終了日",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassA": {
                "label": "貸出申請書ID",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassC": {
                "label": "申請部局名",
                "readOnly": [],
                "hidden": []
            },
            "Class003~5450,ClassF": {
                "label": "担当者名",
                "readOnly": [],
                "hidden": []
            }
        }
    },
}

var CODE_INFO = {
    "計算書区分": {

    }
}

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
        readOnly: [STATUS_PROCESSING, STATUS_ERROR],
        hidden: [],
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
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"column" in TABLE_INFO) {
            let message = `共通関数commonGetColumnName：column未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let column = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].column
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v].label == label)
        if (data.length == 0) {
            let message = `共通関数commonGetColumnName：ラベル名不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (data.length > 1) {
            let message = `共通関数commonGetColumnName：ラベル名重複。${label}`
            commonMessage(STATUS_ERROR, message)
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
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数commonGetStatus：status未登録。${table}`
            commonMessage(STATUS_ERROR, message)
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


/**
 * statusを取得
 * @param {String}      tableId     テーブルID
 * @return {String}     tableName
 */
function commonGetTableName(tableId) {
    try {
        table = Object.keys(TABLE_INFO).filter(v => TABLE_INFO[v].index == tableId)
        if (table.length == 0) {
            let message = `共通関数commonGetTableName：テーブルID不正。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (table.length > 1) {
            let message = `共通関数commonGetTableName：テーブルが2重で登録されています。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        return table[0]

    } catch (err) {
        // 再スロー
        throw err
    }
}

