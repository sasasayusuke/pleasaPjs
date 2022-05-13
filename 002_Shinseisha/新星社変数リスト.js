// テーブルID

// 仕入先情報
var TABLE_ID_SHIIRESAKI         = 103337
// 商品情報
var TABLE_ID_SHOUHIN            = 103336
// 出荷実績
var TABLE_ID_SHUKKA_JISSEKI     = 103338
// 発注管理
var TABLE_ID_HACCHU_KANRI       = 103334
// RPA実行状況
var TABLE_ID_RPA_STATUS         = 103333
// RPA実行ログ
var TABLE_ID_RPA_LOG            = 103332
// 作成書類ログ
var TABLE_ID_SHORUI_LOG         = 103335
// 交換ペア
var TABLE_ID_KOUKAN_PAIR        = 103339



// プロセスID

//在庫数同期＆発注管理チケット作成
var PROCESS_ID_ZAIKO_DOUKI_AND_TICKET  = 104090
//SMILE連携
var PROCESS_ID_SMILE_RENKEI            = 104087
//月次出荷実績登録
var PROCESS_ID_SHUKKA_JISSEKI_TOUROKU  = 104091
//仕入先マスタ同期
var PROCESS_ID_SHIIRESAKI_DOUKI        = 104089
//商品マスタ同期
var PROCESS_ID_SHOUHIN_DOUKI           = 104088

// 仕入先情報 取引状態
var WIKI_STATUS_TORIHIKI = {
    inprogress: {
        index: 100,
        value: "取引中",
        label: "取引中",
        style: "status-inprogress"
    }
    , end: {
        index: 900,
        value: "取引終了",
        label: "取引終了",
        style: "status-closed"
    }
}

// 発注管理 連携ステータス
var WIKI_STATUS_HACCHU_KANRI  = {
    waiting: {
        index: 100,
        value: "確認待",
        label: "確認待",
        style: "status-preparation"
    }
    , confirmed: {
        index: 200,
        value: "確認済",
        label: "確認済",
        style: "status-preparation"
    }
    , preparing: {
        index: 300,
        value: "出荷準備中",
        label: "出荷準備中",
        style: "status-preparation"
    }
    , shipped: {
        index: 400,
        value: "出荷済",
        label: "出荷済",
        style: "status-inprogress"
    }
    , moving: {
        index: 500,
        value: "移動中",
        label: "移動中",
        style: "status-inprogress"
    }
    , filled: {
        index: 800,
        value: "補充済",
        label: "補充済",
        style: "status-review"
    }
    , closed: {
        index: 900,
        value: "クローズ",
        label: "クローズ",
        style: "status-closed"
    }
    , error: {
        index: 999,
        value: "エラー",
        label: "エラー",
        style: "status-rejected"
    }
}

// RPA実行ログ プロセスステータス
var WIKI_STATUS_RPA_LOG  = {
    inprogress: {
        index: 100,
        value: "処理中",
        label: "処理中",
        style: "status-inprogress"
    }
    , normal: {
        index: 900,
        value: "正常終了",
        label: "正常終了",
        style: "status-closed"
    }
    , error: {
        index: 999,
        value: "異常終了",
        label: "異常終了",
        style: "status-rejected"
    }
}


// 発注管理 倉庫区分
var WIKI_SOUKO_KB  = {
    kyushu: {
        index: 1,
        value: "九州倉庫",
    }
    , kanto: {
        index: 2,
        value: "関東倉庫",
    }
    , hokkaido: {
        index: 3,
        value: "北海道倉庫",
    }
}
function convertSoukoValueToIndex(value) {
    for (let souko of Object.keys(WIKI_SOUKO_KB)) {
        if (WIKI_SOUKO_KB[souko].value == value) {
            return WIKI_SOUKO_KB[souko].index
        }
    }
}
// 作成書類ログ 書類フォーマット区分
var WIKI_SHORUI_FORMAT_KB = {
    in: {
        index: 1,
        value: "入庫指示書",
    }
    , out: {
        index: 2,
        value: "出庫指示書",
    }
    , order: {
        index: 3,
        value: "メーカー発注書",
    }
}
function convertShoruiValueToIndex(value) {
    for (let shorui of Object.keys(WIKI_SHORUI_FORMAT_KB)) {
        if (WIKI_SHORUI_FORMAT_KB[shorui].value == value) {
            return WIKI_SHORUI_FORMAT_KB[shorui].index
        }
    }
}

// 商品情報 チェック区分
var WIKI_CHECK_KB  = {
    uncheck: {
        index: 0,
        value: "チェックしない",
    }
    , onlyKyushu: {
        index: 1,
        value: "九州のみ",
    }
    , all: {
        index: 9,
        value: "全国",
    }
}


// 商品情報 適用区分
var WIKI_TEKIYOU_KB  = {
    order: {
        index: 1,
        value: "メーカー発注",
    }
    , move: {
        index: 2,
        value: "倉庫間移動",
    }
}


//在庫品種別
//1,シート
//2,メディア
//3,パネル
//4,飾りビス
//5,小物


var NORMAL    = 'normal'
var WARNING   = 'warning'
var ERROR     = 'error'
