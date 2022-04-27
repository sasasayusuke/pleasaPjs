// テーブルID

// 仕入先情報
var TABLE_ID_SHIIRESAKI          = 70574
// 商品情報
var TABLE_ID_SHOUHIN             = 70578
// 出荷実績
var TABLE_ID_SHUKKA_JISSEKI      = 70572
// 発注管理
var TABLE_ID_HACCHU_KANRI        = 70576
// RPA実行状況
var TABLE_ID_RPA_STATUS          = 70573
// RPA実行ログ
var TABLE_ID_RPA_LOG             = 70577
// 作成フォーマットログ
var TABLE_ID_FORMAT_LOG          = 70571


// フローID

//仕入先マスタ同期
var FLOW_ID_SHIIRESAKI_DOUKI        = 73996
//商品マスタ同期
var FLOW_ID_SHOUHIN_DOUKI           = 73998
//SMILE連携
var FLOW_ID_SMILE_RENKEI            = 73997
//在庫数同期＆発注管理チケット作成
var FLOW_ID_ZAIKO_DOUKI_AND_TICKET  = 73995
//月次出荷実績登録
var FLOW_ID_SHUKKA_JISSEKI_TOUROKU  = 73994


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
