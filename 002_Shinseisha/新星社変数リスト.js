// テーブルID

// 仕入先情報
var TABLE_ID_SHIIRESAKI         = 1866559
// 商品情報
var TABLE_ID_SHOUHIN            = 1866563
// 出荷実績
var TABLE_ID_SHUKKA_JISSEKI     = 1866558
// 発注管理
var TABLE_ID_HACCHU_KANRI       = 1866557
// 交換ペア
var TABLE_ID_KOUKAN_PAIR        = 1866560
// RPA実行状況
var TABLE_ID_RPA_STATUS         = 1866564
// RPA実行ログ
var TABLE_ID_RPA_LOG            = 1866561
// 作成書類ログ
var TABLE_ID_SHORUI_LOG         = 1866562


// プロセスID

//在庫数同期＆発注管理チケット作成
var PROCESS_ID_ZAIKO_DOUKI_AND_TICKET  = 1869924
//SMILE連携
var PROCESS_ID_SMILE_RENKEI            = 1869923
//月次出荷実績登録
var PROCESS_ID_SHUKKA_JISSEKI_TOUROKU  = 1869927
//仕入先マスタ同期
var PROCESS_ID_SHIIRESAKI_DOUKI        = 1869926
//商品マスタ同期
var PROCESS_ID_SHOUHIN_DOUKI           = 1869925


// グループID

//サイト管理者
var GROUP_ID_ADMIN      = 1
//社長
var GROUP_ID_PRESIDENT  = 2
//九州配送センター
var GROUP_ID_KYUSHU     = 3
//関東配送センター
var GROUP_ID_KANTO      = 4


// 商品情報 ビュー
var VIEW_SHOUHIN = {
    basic: {
        index: 7,
        value: "基本情報",
    }
    , president: {
        index: 8,
        value: "社長確認用",
    }
}

// 発注管理 ビュー
var VIEW_HACCHU_KANRI = {
    warehouse: {
        index: 1,
        value: "倉庫担当者確認用",
    }
    , crosstab: {
        index: 2,
        value: "確認待合計参照",
    }
    , president: {
        index: 3,
        value: "社長確認用",
    }
}

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

// 作成書類ログ 連携ステータス
var WIKI_STATUS_FORMAT_LOG  = {
    inprogress: {
        index: 100,
        value: "処理中",
        label: "処理中",
        style: "status-inprogress"
    }
    , normal: {
        index: 900,
        value: "連携成功",
        label: "連携成功",
        style: "status-closed"
    }
    , error: {
        index: 999,
        value: "連携失敗",
        label: "連携失敗",
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
        label: "メーカー発注",
        style: "status-preparation"
    }
    , move: {
        index: 2,
        value: "倉庫間移動",
        label: "倉庫間移動",
        style: "status-inprogress"
    }
}


// 商品情報 在庫品種別
var WIKI_ZAIKOHIN_KB  = {
    sheet: {
        index: 1,
        value: "シート",
    }
    , media: {
        index: 2,
        value: "メディア",
    }
    , panel: {
        index: 3,
        value: "パネル",
    }
    , bis: {
        index: 4,
        value: "飾りビス",
    }
    , small: {
        index: 5,
        value: "小物",
    }
}


var NORMAL  = 'normal'
var WARNING = 'warning'
var ERROR   = 'error'
var NEW     = 'new'
