const API_VERSION = 1.0

const SETTING_SHEET_NAME = "setting"
const TEMPLATE_SHEET_NAME = "template"

const LOADING_SCRIPT_LIST = [
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js",
]

const SERVER_URL = "https://pcls-dev.cit.nhk.or.jp"
const MDI_SYSMTE_USER_ID = 10
const PCLS_SYSMTE_USER_ID = 11


const FORMAT_ID_DEPARTMENT  = "01"  //部局別・機種別集計表
const FORMAT_ID_MODEL       = "02"  //機種別・部局別集計表
const FORMAT_ID_SPREAD      = "03"  //スプレッドシート


const TABLE_INFO = {
    "イベント": {
        index: 5460,
        status: `
            100,下書き,下書,status-new
            200,購買申請受付開始,購買開始,status-preparation
            300,購買申請受付終了,購買終了,status-review
            600,PC設定準備中,設定準備,status-preparation
            700,PC設定受付開始,設定開始,status-review
            900,終了,終了,status-closed
        `,
    },
    "PC設定": {
        index: 5464,
        status: `
            100,未提出,未提出,status-new
            900,提出済,提出済,status-closed
        `,
    },
    "パソコン形状登録": {
        index: 5461,
    },
    "購買申請": {
        index: 5456,
    },
    "購買報告書": {
        index: 5455,
        status: `
            100,未確認,未確認,status-preparation
            200,経理担当者承認待ち,経理待,status-review
            300,照査者承認待ち,照査者待,status-review
            400,決定者承認待ち,決定者待,status-review
            500,承認済み,承認済,status-inprogress
            900,完了,完,status-closed
            910,却下,却下,status-rejected
        `,
    },
    "貸出申請": {
        index: 32923,
        status: `
            100,未提出,未提出,status-new
            200,承認待ち,承認待,status-review
            900,承認済み,承認済,status-closed
            910,却下,却下,status-rejected
        `,
    },
    "貸出状況一覧": {
        index: 18961,
        status: `
            100,貸出準備,貸出準備,status-preparation
            400,貸出中,貸出中,status-review
            900,完了,完了,status-closed
            910,在庫割当待,在庫割当待,status-rejected
        `,
    },
    "在庫管理": {
        index: 8929,
        status: `
            100,発送済,発送済,status-closed
            150,キッティング依頼,キッティング,status-preparation
            200,利用不可,利用不可,status-inprogress
            300,在庫,在庫,status-review
            900,返納,返納,status-rejected
        `,

    },
    "パソコン形状": {
        index: 8715,
    },
    "職員情報": {
        index: 34774,
    },
    "部局情報": {
        index: 34047,
    },
    "担当情報": {
        index: 36195,
    },
    "担当コード": {
        index: 34754,
    },
    "組織変更対応": {
        index: 34039,
    },
    "祝日情報": {
        index: 85987,
    },
    "CSVファイル連携": {
        index: 8711,
    },
    "ボタン表示制御設定": {
        index: 57410,
    },
    "サイト表示制御": {
        index: 62906,
    },
    "テーブルアクセス制御設定": {
        index: 57400,
    },
    "Excelフォーマット": {
        index: 86349,
    },
    "メール送信ログ": {
        index: 87295,
        status: `
            100,送信準備中,送信準備中,status-new
            150,送信中,送信中,status-preparation
            200,送信済み,送信済み,status-inprogress
            300,エラー,エラー,status-review
        `,
    },
    //"メッセージログ": {
    //    index: 5474,
    //},
    //"処理ログ": {
    //    index: 5475,

    //},
    //"帳票出力ログ": {
    //    index: 5473,
    //},
}

const CODE_INFO = {
    "在庫種別": `
        1,貸出,貸出,status-review
        2,購買,購買,status-inprogress
    `,
    "スタッフ・共有機用": `
        0,スタッフ・共有機用
        1,職員モバイル用
    `,
}

/**
 * 項目名等が変更されたら
 * await commonGetAllColumnNames()
 * で最新状態を取得し更新
 *
 * readOnly, hiddenの設定はこちらを直接変更してください。
 */
const COLUMN_INFO = {
    "イベント": {
        "DateA": {
            "label": "購買依頼報告書締切日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "パソコン設定登録書締切日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "イベント状況",
            "readOnly": [],
            "hidden": []
        },
        "ClassB": {
            "label": "イベントタイトル",
            "readOnly": [
                200,
                300,
                600,
                700,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "年度",
            "readOnly": [
                200,
                300,
                600,
                700,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassA": {
            "label": "イベントID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "PC設定": {
        "ClassA": {
            "label": "申請部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "申請部局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "メンバーシップ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "ワークグループ名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "ログインアカウント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckA": {
            "label": "未定 - ログインアカウント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "管理者権限",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "コンピュータ名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionB": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassT": {
            "label": "企業コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassU": {
            "label": "マンナンバー",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckB": {
            "label": "未定 - マンナンバー",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassV": {
            "label": "氏名 - 使用者情報",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassW": {
            "label": "部局コード - 使用者情報",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "ステータス",
            "readOnly": [],
            "hidden": []
        },
        "ClassX": {
            "label": "相互リンク",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassY": {
            "label": "PC購買申請",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassZ": {
            "label": "パソコン形状",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "送付先住所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "名称",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "管理グループID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "主な設置場所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "備品番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "管理担当",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassP": {
            "label": "ピクルス管理番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassQ": {
            "label": "申請者名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassR": {
            "label": "申請者内線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassS": {
            "label": "申請者外線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class003": {
            "label": "送付先〒",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class004": {
            "label": "担当者氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class005": {
            "label": "担当者内線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class006": {
            "label": "担当者外線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class007": {
            "label": "担当者メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "納品希望日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class008": {
            "label": "管理者権限付与アカウント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class009": {
            "label": "ワークグループ名選択理由",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "年度",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class001": {
            "label": "記入担当者選択",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class010": {
            "label": "記入担当者氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class193": {
            "label": "フィルタ用部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class190": {
            "label": "フィルタ用申請者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class194": {
            "label": "フィルタ用記入担当者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class002": {
            "label": "スタッフ・共有機用",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class011": {
            "label": "イベント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "督促メール送信日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "分類F",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "パソコン形状登録": {
        "ClassA": {
            "label": "イベント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "パソコン形状",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "金額",
            "readOnly": [
                700,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "パソコン形状登録ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "購買申請": {
        "ClassA": {
            "label": "イベント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "購買報告書",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "台数1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "パソコン形状1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "経理科目1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "細節1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "部局メモ1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "パソコン形状2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "経理科目2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "細節2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "部局メモ2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumB": {
            "label": "台数2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "パソコン形状3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "経理科目3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "細節3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassP": {
            "label": "部局メモ3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumC": {
            "label": "台数3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassR": {
            "label": "経理科目4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassV": {
            "label": "パソコン形状5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumD": {
            "label": "購買台数入力 - 項目数",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionA": {
            "label": "購買台数",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassX": {
            "label": "申請部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassY": {
            "label": "申請部局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class002": {
            "label": "氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class003": {
            "label": "外線番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class004": {
            "label": "内線番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class005": {
            "label": "メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class006": {
            "label": "送付先住所1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionB": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "送付先住所2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "送付先住所3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassQ": {
            "label": "パソコン形状4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumE": {
            "label": "台数4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassS": {
            "label": "細節4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassT": {
            "label": "部局メモ4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassU": {
            "label": "送付先住所4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumF": {
            "label": "台数5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassW": {
            "label": "経理科目5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class007": {
            "label": "細節5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class008": {
            "label": "部局メモ5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class009": {
            "label": "送付先住所5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class010": {
            "label": "パソコン形状6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumG": {
            "label": "台数6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class011": {
            "label": "経理科目6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class012": {
            "label": "細節6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class013": {
            "label": "部局メモ6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class014": {
            "label": "送付先住所6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class015": {
            "label": "パソコン形状7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumH": {
            "label": "台数7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class016": {
            "label": "経理科目7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class017": {
            "label": "細節7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class018": {
            "label": "部局メモ7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class019": {
            "label": "送付先住所7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumI": {
            "label": "台数8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class020": {
            "label": "パソコン形状8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumJ": {
            "label": "台数9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class021": {
            "label": "経理科目8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class022": {
            "label": "細節8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class023": {
            "label": "部局メモ8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class024": {
            "label": "送付先住所8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class025": {
            "label": "パソコン形状9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class026": {
            "label": "経理科目9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class027": {
            "label": "細節9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class028": {
            "label": "部局メモ9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class029": {
            "label": "送付先住所9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class030": {
            "label": "パソコン形状10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumK": {
            "label": "台数10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class031": {
            "label": "経理科目10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class032": {
            "label": "細節10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class033": {
            "label": "部局メモ10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class034": {
            "label": "送付先住所10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class041": {
            "label": "備考1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class042": {
            "label": "備考2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class043": {
            "label": "備考3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class044": {
            "label": "備考4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class045": {
            "label": "備考5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class046": {
            "label": "備考6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class047": {
            "label": "備考7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class048": {
            "label": "備考8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class049": {
            "label": "備考9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class050": {
            "label": "備考10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class190": {
            "label": "作成者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class191": {
            "label": "作成者企業コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class192": {
            "label": "作成者職員番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class193": {
            "label": "作成者所属部局",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassZ": {
            "label": "PC購買申請ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class051": {
            "label": "送付先〒1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class052": {
            "label": "送付先〒2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class053": {
            "label": "送付先〒3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class054": {
            "label": "送付先〒4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class055": {
            "label": "送付先〒5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class056": {
            "label": "送付先〒6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class057": {
            "label": "送付先〒7",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class058": {
            "label": "送付先〒8",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class059": {
            "label": "送付先〒9",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class060": {
            "label": "送付先〒10",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "購買報告書": {
        "ClassA": {
            "label": "イベント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "ステータス",
            "readOnly": [],
            "hidden": []
        },
        "ClassC": {
            "label": "経理担当者 - 氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "経理担当者 - 役職",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "照査者 - 氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "照査者 - 役職",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "決定者 - 氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "決定者 - 役職",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "経理担当者 - 承認日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "照査者 - 承認日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateC": {
            "label": "決定者 - 承認日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionA": {
            "label": "購買台数",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "申請部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "提出者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "内線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "外線",
            "readOnly": [
                200,
                300,
                400,
                500,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionB": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "申請部局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "経理担当者選択",
            "readOnly": [
                300,
                400,
                500,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "照査者選択",
            "readOnly": [
                400,
                500,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassP": {
            "label": "決定者選択",
            "readOnly": [
                500,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassR": {
            "label": "購買報告書ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class193": {
            "label": "フィルタ用部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class194": {
            "label": "現在担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class190": {
            "label": "提出者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateD": {
            "label": "提出日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateE": {
            "label": "督促メール送信日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "購買申請件数",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "貸出申請": {
        "Status": {
            "label": "ステータス",
            "readOnly": [],
            "hidden": []
        },
        "ClassB": {
            "label": "申請部局コード",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "申請部局名",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "申請者名",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "申請者外線",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "申請者内線",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "メールアドレス",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "送付先住所",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionA": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionC": {
            "label": "申請事由",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "提出日",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "承認日",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "業務管理者選択",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "NumA": {
            "label": "台数",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassA": {
            "label": "送付先〒",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "担当者氏名",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "担当者内線",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "担当者外線",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "担当者メールアドレス",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateI": {
            "label": "納品希望日",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "業務管理者 - 氏名",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "貸出申請ID",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateC": {
            "label": "利用終了日",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class190": {
            "label": "作成者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class191": {
            "label": "作成者企業コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class192": {
            "label": "作成者職員番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class193": {
            "label": "作成者所属部局",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class194": {
            "label": "フィルタ用業務管理者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                200,
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "貸出状況一覧": {
        "Status": {
            "label": "ステータス",
            "readOnly": [],
            "hidden": []
        },
        "ClassB": {
            "label": "申請部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "申請部局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "申請者名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionC": {
            "label": "貸出機材詳細",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date002": {
            "label": "納入月1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date003": {
            "label": "納入月2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date004": {
            "label": "納入月3",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date005": {
            "label": "納入月4",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date006": {
            "label": "納入月5",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date007": {
            "label": "納入月6",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class008": {
            "label": "A4ノート",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class015": {
            "label": "B5ノート",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class022": {
            "label": "A4ノートワイド",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class058": {
            "label": "A4ノート",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class065": {
            "label": "B5ノート",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class072": {
            "label": "A4ノートワイド",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date052": {
            "label": "納入月1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Date053": {
            "label": "納入月2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "提出日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassA": {
            "label": "貸出申請リンク",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateD": {
            "label": "貸出開始日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateE": {
            "label": "貸出終了日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "在庫リンク",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "貸出状況一覧ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "承認日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateF": {
            "label": "納品希望日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateG": {
            "label": "利用終了日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "送付先〒",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "送付先住所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "申請者外線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "申請者内線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "担当者氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "担当者メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "担当者内線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "担当者外線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassP": {
            "label": "業務管理者 - 氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class190": {
            "label": "申請者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class191": {
            "label": "業務管理者ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "在庫管理": {
        "ClassA": {
            "label": "拠点名（ラベル名）",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "PC名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "ドメイン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "ワークグループ名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "管理者権限付与アカウント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "備品番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "放送局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "郵便番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "住所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassP": {
            "label": "担当者名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassQ": {
            "label": "担当者外線",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassS": {
            "label": "伝票番号",
            "readOnly": [
                100,
                200,
                300,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "着荷予定日",
            "readOnly": [
                100,
                200,
                300,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassT": {
            "label": "受領日（WEB上）",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateD": {
            "label": "返却PC到着日",
            "readOnly": [
                150,
                200,
                300,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassV": {
            "label": "破損・物損・欠損等",
            "readOnly": [
                100,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionA": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassW": {
            "label": "NHK備品番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassX": {
            "label": "シリアル番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassY": {
            "label": "有線MAC",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassZ": {
            "label": "無線MAC",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class003": {
            "label": "貸出状況一覧リンク",
            "readOnly": [
                100,
                150,
                200,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "キッティング開始日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "名称",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "管理グループID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "主な設置場所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "管理担当",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "ステータス",
            "readOnly": [],
            "hidden": []
        },
        "ClassK": {
            "label": "在庫種別",
            "readOnly": [],
            "hidden": []
        },
        "ClassL": {
            "label": "ダミー1",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateC": {
            "label": "ダミー（日付）",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class004": {
            "label": "ダミー2",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassU": {
            "label": "ワークグループ名選択理由",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class001": {
            "label": "ピクルス管理番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class002": {
            "label": "PC設定リンク",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class005": {
            "label": "スタッフ・共有機用",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionB": {
            "label": "利用不可理由",
            "readOnly": [
                100,
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionC": {
            "label": "返納理由",
            "readOnly": [
                100,
                150,
                200,
                990,
                999
            ],
            "hidden": []
        },
        "DateE": {
            "label": "納品希望日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "パソコン形状": {
        "ClassA": {
            "label": "パソコン名称",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "職員情報": {
        "ClassA": {
            "label": "企業コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "職員番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "漢字氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "カナ氏名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "所属コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassG": {
            "label": "登録グループコード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassH": {
            "label": "登録グループ名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassI": {
            "label": "職位",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassJ": {
            "label": "等級コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassK": {
            "label": "役職",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassL": {
            "label": "役職名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "退職年月日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassM": {
            "label": "電話番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassN": {
            "label": "メールアドレス",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassO": {
            "label": "前組織コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "異動年月日",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckA": {
            "label": "承認者フラグ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class001": {
            "label": "ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckB": {
            "label": "NHK職員",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckC": {
            "label": "スタッフ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckD": {
            "label": "記入担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckE": {
            "label": "業務管理者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckF": {
            "label": "経理担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckG": {
            "label": "照査者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckH": {
            "label": "決定者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckI": {
            "label": "システム管理者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckJ": {
            "label": "システム管理補佐",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckK": {
            "label": "特権ユーザ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckL": {
            "label": "パソコン在庫管理者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckZ": {
            "label": "保護フラグ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "部局情報": {
        "ClassA": {
            "label": "部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "部局名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "親部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "郵便番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "住所",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckA": {
            "label": "有効フラグ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckB": {
            "label": "親部局フラグ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "担当情報": {
        "ClassA": {
            "label": "担当コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "企業コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "職員番号",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "担当部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class001": {
            "label": "KEY",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Class002": {
            "label": "ログインID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckZ": {
            "label": "保護フラグ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "担当コード": {
        "ClassA": {
            "label": "担当コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "担当名称",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CheckA": {
            "label": "取得対象",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "組織変更対応": {
        "ClassA": {
            "label": "部局コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "紐付コード",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "祝日情報": {
        "ClassA": {
            "label": "祝日名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "日付",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "CSVファイル連携": {
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CreatedTime": {
            "label": "作成日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "AttachmentsA": {
            "label": "添付ファイルA",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "AttachmentsB": {
            "label": "添付ファイルB",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "AttachmentsC": {
            "label": "添付ファイルC",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "AttachmentsD": {
            "label": "添付ファイルD",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "ボタン表示制御設定": {
        "ClassA": {
            "label": "テーブル名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "権限",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "表示ボタン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "KEY",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "サイト表示制御": {
        "ClassA": {
            "label": "サイト名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "権限",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "テーブルアクセス制御設定": {
        "ClassB": {
            "label": "アクセス可能権限",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassA": {
            "label": "テーブル名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "Excelフォーマット": {
        "ClassA": {
            "label": "フォーマットID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "ボタン名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "ファイル名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DescriptionA": {
            "label": "備考",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "AttachmentsA": {
            "label": "テンプレートファイル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "表示対象サイト名",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    },
    "メール送信ログ": {
        "ResultId": {
            "label": "ID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassA": {
            "label": "メールID",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassB": {
            "label": "メールタイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Body": {
            "label": "メール内容",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateA": {
            "label": "メール送信終了日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Status": {
            "label": "状況",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "DateB": {
            "label": "登録日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassC": {
            "label": "To",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassD": {
            "label": "CC",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassE": {
            "label": "BCC",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "ClassF": {
            "label": "ログ",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "CreatedTime": {
            "label": "作成日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Owner": {
            "label": "担当者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Title": {
            "label": "タイトル",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "UpdatedTime": {
            "label": "更新日時",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Comments": {
            "label": "コメント",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Updator": {
            "label": "更新者",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        },
        "Ver": {
            "label": "バージョン",
            "readOnly": [
                900,
                990,
                999
            ],
            "hidden": []
        }
    }
}