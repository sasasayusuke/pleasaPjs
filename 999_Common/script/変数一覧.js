var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "http://13.115.63.209"

var TABLE_INFO = {
    "購買申請": {
        index: 5456,
        status: `
            100,下書き,下書き,status-new
            200,PC管理者確認待ち,確認待ち,status-preparation
            300,PC管理者確認済み,確認済み,status-inprogress
            400,報告書申請済み,申請済み,status-review
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `
    },
    "購買報告書": {
        index: 5455,
        status: `
            100,未確認,未確認,status-new
            200,経理担当者承認待ち,経理待,status-preparation
            300,照査者承認待ち,照査者待,status-preparation
            400,決定者承認待ち,決定者待,status-inprogress
            500,NT承認待ち,NT待,status-inprogress
            900,完了,完,status-closed
            910,差戻し,差戻,status-rejected
        `
    },
    "メッセージログ": {
        index: 5474,
    },
    "処理ログ": {
        index: 5475,
    },
    "帳票出力ログ": {
        index: 5473,
    },
}

var CODE_INFO = {
    "計算書区分": {

    }
}