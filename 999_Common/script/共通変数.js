var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "https://kyowa-konpo.sdt-autolabo.com"

/**
 * テーブル情報
 * サイト複製時には、新しく割り振れたテーブルIDを入力し直してください。
 * 廃止してTABLE_INFO へ 移行予定（ステータスとかフォーマットとかも）
 *
 */
var TABLE = [
  // 会社区分
  TABLE_ID_COMPANY_CLASS                    = 122
  // 売上集計区分
  , TABLE_ID_SALE_CLASS                     = 123
  // 計算書区分
  , TABLE_ID_STATEMENT_CLASS                = 124
  // 買掛集計区分
  , TABLE_ID_BUY_CLASS                      = 1552
  // 部材区分
  , TABLE_ID_ELEMENT_CLASS                  = 1563
  // 会社マスタ
  , TABLE_ID_COMPANY_MASTER                 = 126
  // 工場マスタ
  , TABLE_ID_FACTORY_MASTER                 = 127
  // 部材マスタ
  , TABLE_ID_ELEMENT_MASTER                 = 2028
  // 商品マスタ
  , TABLE_ID_COMMODITY_MASTER               = 128
  // 社員マスタ
  , TABLE_ID_EMPLOYEE_MASTER                = 213
  // 車両マスタ
  , TABLE_ID_CAR_MASTER                     = 381
  // 製品在庫管理
  , TABLE_ID_COMMODITY_STOCK                = 118
  // 部材在庫管理
  , TABLE_ID_ELEMENT_STOCK                  = 2400
  // 計算書管理
  , TABLE_ID_STATEMENT                      = 206
  // 見積管理
  , TABLE_ID_ESTIMATE                       = 2858
  // 売掛管理
  , TABLE_ID_SELL_ORDER                     = 130
  // 買掛管理
  , TABLE_ID_BUY_ORDER                      = 129
  // 製造管理
  , TABLE_ID_MANUFACTURE                    = 1561
  // 運行管理
  , TABLE_ID_DELIVERY                       = 380
  // 配送引き取り依頼管理
  , TABLE_ID_PICK_UP_REQUEST                = 6272
  // 処理ログ（commonLogで使用）
  , TABLE_ID_PROCESS_LOG                    = 16641
  // メッセージログ（commonLogで使用）
  , TABLE_ID_MESSAGE_LOG                    = 96
  // 出力帳票ログ
  , TABLE_ID_PRINT_LOG                      = 24790
  // エクセルフォーマット（downloadExcelで使用）
  , TABLE_ID_EXCEL_FORMAT                   = 399
  // 納品書台帳
  , TABLE_ID_DELIVERY_BOOK                  = 36023
  // 請求書台帳
  , TABLE_ID_CLAIM_BOOK                     = 36025
]

var FORMAT = [
  // 見積書フォーマット
  FORMAT_ID_ESTIMATION                    = "01"
  // 先行依頼書フォーマット
  , FORMAT_ID_REQUEST                     = "02"
  // 納品書・納品書控・物品受領書フォーマット
  , FORMAT_ID_DELIVERY_WITH_RECEIPT       = "06"
  // 納品書・納品書控フォーマット
  , FORMAT_ID_DELIVERY                    = "07"
  // 仕入先注文フォーマット
  , FORMAT_ID_SUPPLIER                    = "08"
  // DestinationListフォーマット
  , FORMAT_ID_DISTINATION                 = "09"
  // 請求書フォーマット
  , FORMAT_ID_CLAIM                       = "10"
  // 仕入報告書フォーマット
  , FORMAT_ID_BUY_REPORT                  = "12"
  // 売上報告書フォーマット
  , FORMAT_ID_SALE_REPORT                 = "13"
  // 梱包明細書フォーマット
  , FORMAT_ID_PACKING_DETAIL              = "15"
]

/**
 * テーブル情報
 * サイト複製時には、新しく割り振れたテーブルIDを入力し直してください。
 */
var TABLE_INFO = {
  会社区分: {
    index: TABLE_ID_COMPANY_CLASS,
    name: "会社区分",
  },
  売上集計区分: {
    index: TABLE_ID_SALE_CLASS,
    name: "売上集計区分",
  },
  計算書区分: {
    index: TABLE_ID_STATEMENT_CLASS,
    name: "計算書区分",
  },
  買掛集計区分: {
    index: TABLE_ID_BUY_CLASS,
    name: "買掛集計区分",
  },
  部材区分: {
    index: TABLE_ID_ELEMENT_CLASS,
    name: "部材区分",
  },
  会社マスタ: {
    index: TABLE_ID_COMPANY_MASTER,
    name: "会社マスタ",
  },
  工場マスタ: {
    index: TABLE_ID_FACTORY_MASTER,
    name: "工場マスタ",
  },
  商品マスタ: {
    index: TABLE_ID_COMMODITY_MASTER,
    name: "商品マスタ",
  },
  社員マスタ: {
    index: TABLE_ID_EMPLOYEE_MASTER,
    name: "社員マスタ",
  },
  車両マスタ: {
    index: TABLE_ID_CAR_MASTER,
    name: "車両マスタ",
  },
  部材マスタ: {
    index: TABLE_ID_ELEMENT_MASTER,
    name: "部材マスタ",
  },
  製品在庫管理: {
    index: TABLE_ID_COMMODITY_STOCK,
    name: "製品在庫管理",
  },
  部材在庫管理: {
    index: TABLE_ID_ELEMENT_STOCK,
    name: "部材在庫管理",
  },
  計算書管理: {
    index: TABLE_ID_STATEMENT,
    name: "計算書管理",
  },
  見積管理: {
    index: TABLE_ID_ESTIMATE,
    name: "見積管理",
  },
  売掛管理: {
    index: TABLE_ID_SELL_ORDER,
    name: "売掛管理",
  },
  買掛管理: {
    index: TABLE_ID_BUY_ORDER,
    name: "買掛管理",
  },
  製造管理: {
    index: TABLE_ID_MANUFACTURE,
    name: "製造管理",
  },
  運行管理: {
    index: TABLE_ID_DELIVERY,
    name: "運行管理",
  },
  配送引取依頼管理: {
    index: TABLE_ID_PICK_UP_REQUEST,
    name: "配送引取依頼管理",
  },
  処理ログ: {
    index: TABLE_ID_PROCESS_LOG,
    name: "処理ログ",
  },
  メッセージログ: {
    index: TABLE_ID_MESSAGE_LOG,
    name: "メッセージログ",
  },
  帳票出力ログ: {
    index: TABLE_ID_PRINT_LOG,
    name: "帳票出力ログ",
  },
  エクセルフォーマット: {
    index: TABLE_ID_EXCEL_FORMAT,
    name: "エクセルフォーマット",
  },
  請求書台帳: {
    index: TABLE_ID_CLAIM_BOOK,
    name: "請求書台帳",
  },
  納品書台帳: {
    index: TABLE_ID_DELIVERY_BOOK,
    name: "納品書台帳",
  },
}

// 会社区分
var WIKI_COMPANY_CLASS = {
  DELIVERY: {
    index: 143,
    name: "配送業者",
  },
  SUPPLIER: {
    index: 141,
    name: "仕入先",
  },
  CUSTOMER: {
    index: 140,
    name: "顧客",
  }
}

// 計算書区分
var WIKI_STATEMENT_CLASS = {
  PL: {
    index: 147,
    name: "パレット",
  },
  BOX: {
    index: 148,
    name: "木箱",
  },
  WHOLESALE: {
    index: 3033,
    name: "卸売",
  },
  EXPENSE: {
    index: 51267,
    name: "卸売",
  },
}

// 仕入区分
var WIKI_PURCHASE_CLASS = {
  ELEMENT: {
    index: 0,
    name: "部材",
  },
  WHOLESALE: {
    index: 1,
    name: "卸売",
  }
}

// 単位区分
var WIKI_UNIT_CLASS = {
  HON: {
    index: 1,
    name: "本",
  },
  KO: {
    index: 2,
    name: "個",
  },
  BANDL: {
    index: 9,
    name: "B/L",
  }
}

// 売上集計区分
var WIKI_SALE_CLASS = {
  WHOLESALE: {
    index: 193,
    name: "卸売",
  },
  PL: {
    index: 194,
    name: "PL",
  },
  PL_SUPPLY: {
    index: 195,
    name: "PL(支給材)",
  },
  BOX: {
    index: 196,
    name: "木箱(組立)",
  },
  BOX_PENDING: {
    index: 197,
    name: "木箱(未組立)",
  },
  BOX_SUPPLY: {
    index: 198,
    name: "木箱(支給材)",
  },
  PACKAGE: {
    index: 199,
    name: "梱包",
  },
  SKID: {
    index: 200,
    name: "スキットのみ",
  },
  SKID_SUPPLY: {
    index: 201,
    name: "スキットのみ(支給材)",
  },
  CUT: {
    index: 202,
    name: "カット品",
  },
  OTHER: {
    index: 203,
    name: "その他",
  }
}

// 買掛集計区分
var WIKI_BUY_CLASS = {
  TIMBER: {
    index: 1553,
    name: "材木",
  },
  LVL: {
    index: 1554,
    name: "LVL",
  },
  VENEER: {
    index: 1555,
    name: "ベニヤ",
  },
  NAIL: {
    index: 1556,
    name: "釘、副資材",
  },
  PROCESSING_COST: {
    index: 1557,
    name: "加工費",
  },
  DELIVERY_COST: {
    index: 1558,
    name: "配送費",
  },
  OTHER: {
    index: 203,
    name: "その他",
  }
}

// 部材区分
var WIKI_ELEMENT_CLASS = {
  TIMBER: {
    index: 1564,
    name: "材木",
  },
  LVL: {
    index: 1565,
    name: "LVL",
  },
  VENEER: {
    index: 1566,
    name: "ベニヤ",
  },
  NAIL: {
    index: 1567,
    name: "釘、副資材",
  },
}

// 確保先
var WIKI_TO_RESERVE = {
  WAIT: {
    index: 0,
    name: "指示待",
  },
  SUPPLIER: {
    index: 1,
    name: "仕入先から確保",
  },
  MANUFACTURE: {
    index: 2,
    name: "製造から確保",
  },
  STOCK: {
    index: 3,
    name: "在庫から確保",
  },
  WAREHOUSE: {
    index: 8,
    name: "倉庫に入庫済み",
  },
  SHORT: {
    index: 9,
    name: "調達不足",
  }
}

// 帳票出力フラグ
var WIKI_ISSUED = {
  NO: {
    index: 0,
    name: "なし",
  },
  YES: {
    index: 1,
    name: "あり",
  },
}

function convertNameToIndex(wiki, name) {
  for (let v of Object.keys(wiki)) {
    if (wiki[v].name == name) {
      return wiki[v].index
    }
  }
}

function convertIndexToName(wiki, index) {
  for (let v of Object.keys(wiki)) {
    if (wiki[v].index == index) {
      return wiki[v].name
    }
  }
}

// 売掛管理ステータス
var WIKI_STATUS_SELL_ORDER_CONTROL = {
  draft: {
    index: 100,
    name: "下書"
  },
  reserving: {
    index: 200,
    name: "確保待"
  },
  reserved: {
    index: 300,
    name: "確保済"
  },
  shipping: {
    index: 400,
    name: "出荷待"
  },
  shipped: {
    index: 500,
    name: "出荷済"
  },
  invoiced: {
    index: 600,
    name: "請求済"
  },
  closed: {
    index: 900,
    name: "完了"
  }
}


// 買掛管理ステータス
var WIKI_STATUS_BUY_ORDER_CONTROL  = {
  draft: {
      index: 100,
      name: "下書き",
      label: "下書き",
      style: "status-new"
  }
  , waiting: {
      index: 200,
      name: "発注待ち",
      label: "発注待ち",
      style: "status-preparation"
  }
  , ordered: {
      index: 300,
      name: "発注済み",
      label: "発注済み",
      style: "status-inprogress"
  }
  , stocked: {
      index: 400,
      name: "入荷済み",
      label: "入荷済み",
      style: "status-review"
  }
  , closed: {
      index: 900,
      name: "完了",
      label: "完了",
      style: "status-closed"
  }
  , canceled: {
      index: 990,
      name: "キャンセル",
      label: "キャンセル",
      style: "status-rejected"
  }
}

// 製造管理ステータス
var WIKI_STATUS_MANUFACTURE_CONTROL = {
  instructing: {
      index: 100,
      name: "指示入力待",
      label: "指示入力待",
      style: "status-new"
  }
  , started: {
      index: 300,
      name: "製造中",
      label: "製造中",
      style: "status-inprogress"
  }
  , closed: {
      index: 900,
      name: "完了",
      label: "完了",
      style: "status-closed"
  }
}


  // 売掛管理ビュー
  var VIEW_SELL_ORDER_CONTROL = {
    list: {
        index: 14,
        name: "一覧画面",
    }
  }