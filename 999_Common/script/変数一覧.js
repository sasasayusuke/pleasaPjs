var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "http://13.115.63.209"

var TABLE_INFO = {
    "購買申請": {
        index: 5099,
    },
    "購買報告書（※ワークフロー）": {
        index: 5103,
    },
    メッセージログ: {
        index: 5147,
    },
    処理ログ: {
        index: 5148,
    },
}

var STATUS_INFO = {
    国調PC申請システム: {
        name: "申請ステータス",
        value: `
            100,下書,下書,status-new
            200,申請待,申請待,status-preparation
            300,申請済,申請済,status-closed
        `
    },
}

var VIEW_INFO = {

}

var CODE_INFO = {
    計算書区分: {

    }
}