var version = 1

var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "https://kyowa-konpo.sdt-autolabo.com"

/**
 * テーブル情報
 * サイト複製時には、新しく割り振れたテーブルIDを入力し直してください。
 *
 */
var TABLE = [
  // 会社区分
  , TABLE_ID_COMPANY_CLASS                  = 32
  // 売上集計区分
  , TABLE_ID_SALE_CLASS                     = 31
  // 品名区分
  , TABLE_ID_ITEM_CLASS                     = 33
  // 会社マスタ
  , TABLE_ID_COMPANY_MASTER                 = 34
  // 工場マスタ
  , TABLE_ID_FACTORY_MASTER                 = 30
  // 品名マスタ
  , TABLE_ID_ITEM_MASTER                    = 35
  // 在庫管理
  , TABLE_ID_STOCK                          = 36
  // 計算書管理
  , TABLE_ID_STATEMENT                      = 74
  // 見積管理
  , TABLE_ID_ESTIMATE                       = 75
  // 売掛管理
  , TABLE_ID_SELL_ORDER                     = 130
  // 買掛管理
  , TABLE_ID_BUY_ORDER                      = 129
  // 製造管理
  , TABLE_ID_MANUFACTURE                    = 117
  // メッセージログ（commonSetMessageで使用）
  , TABLE_ID_MESSAGE_LOG                    = 96
  // エクセルフォーマット（downloadExcelで使用）
  , TABLE_ID_EXCEL_FORMAT                   = 97
]

var FORMAT = [
    // 見積書フォーマット
    FORMAT_ID_ESTIMATION                    = "01"
    // 先行依頼書フォーマット
    , FORMAT_ID_REQUEST                     = "02"
    // 請求書フォーマット
    , FORMAT_ID_CLAIM                       = "04"
    // 請求書フォーマット
    , FORMAT_ID_STORAGE_CLAIM               = "05"
    // 納品書フォーマット
    , FORMAT_ID_DELIVERY                    = "06"
    // 受領書注文フォーマット
    , FORMAT_ID_RECEIPT                     = "07"
    // 仕入先注文フォーマット
    , FORMAT_ID_SUPPLIER                    = "08"
    // DestinationListフォーマット
    , FORMAT_ID_DISTINATION                 = "09"
    // Invoiceフォーマット
    , FORMAT_ID_INVOICE                     = "10"
    // PackingListフォーマット
    , FORMAT_ID_PACKING                     = "11"
    // 海外用仕入先向け注文書(JPY)フォーマット
    , FORMAT_ID_SUPPLIER_FOREIGN_JPY        = "14"
    // 海外用仕入先向け注文書(USD)フォーマット
    , FORMAT_ID_SUPPLIER_FOREIGN_USD        = "15"
]


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
// 会社区分
var WIKI_COMPANY_CLASS = {
  KYOWA: {
    index: 144,
    name: "自社",
  },
  DELIVERY: {
    index: 143,
    name: "配送業者",
  },
  CONSIGNOR: {
    index: 142,
    name: "荷主",
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

  // 注文管理ステータス
  var WIKI_STATUS_ORDER_CONTROL = {
    arrangement: {
      index: 100,
      value: "先行手配",
      label: "先行手配",
      style: "status-new"
    }
    , checkingDelivery: {
        index: 300,
        value: "納期確認中",
        label: "納期確認中",
        style: "status-closed"
    }
    , adjustment: {
      index: 350,
      value: "納期再調整",
      label: "納期再調整",
      style: "status-review"
    }
    , confirmedArrival: {
        index: 399,
        value: "入荷確定",
        label: "入荷確定",
        style: "status-review"
    }
    , confirmedDelivery: {
        index: 400,
        value: "納期確定",
        label: "納期確定",
        style: "status-inprogress"
    }
    , shipped: {
        index: 500,
        value: "出荷済",
        label: "出荷済",
        style: "status-preparation"
    }
    , accepted: {
        index: 600,
        value: "検収済",
        label: "検収済",
        style: "status-review"
    }
    , closed: {
        index: 700,
        value: "完了",
        label: "完了",
        style: "status-closed"
    }
    , cancel: {
        index: 900,
        value: "キャンセル",
        label: "キャンセル",
        style: "status-rejected"
    }
  }

  // 通貨区分
  var WIKI_CURRENCY_CLASS = {
    JPY: {
      name: '円',
      value: 'JPY',
    },
    USD: {
      name: 'ドル',
      value: 'USD',
    },
  }

  // 品名
  var WIKI_ITEM_NAME = {
    socket: {
      name: 'ソケット',
      value: 1,
    },
    substrate: {
      name: '基板',
      value: 2,
    },
    parts: {
      name: '部品',
      value: 3,
    },
    processed: {
      name: '加工品',
      value: 4,
    },
  }

  // 数量単位
  var WIKI_VOLUME_UNIT = {
    ko: {
      name: '個',
      value: 1,
    },
    shiki: {
      name: '式',
      value: 2,
    },
    mai: {
      name: '枚',
      value: 3,
    },
    hon: {
      name: '本',
      value: 4,
    },
  }

  // PKG種類
  var WIKI_PKG_TYPE = {
    CRYSTAL: {
      name: 'CRYSTAL',
      value: 1,
    },
    MEMS: {
      name: 'MEMS',
      value: 2,
    },
    SEMI: {
      name: 'SEMI',
      value: 3,
    },
    SENSOR: {
      name: 'SENSOR',
      value: 4,
    },
    CAPACITOR: {
      name: 'CAPACITOR',
      value: 5,
    },
    LD: {
      name: 'LD',
      value: 6,
    },
    OTHER: {
      name: 'その他',
      value: 9,
    },
  }

  // 希望納期
  var WIKI_DELIVERY_LIMIT = {
    ASAP: {
      name: 'ASAP',
      value: 1,
    },
    DATE: {
      name: '日付',
      value: 2,
    },
  }

  // 納入区分
  var WIKI_DELIVERY_CLASS = {
    MIS: {
      name: 'MiS',
      value: 1,
    },
    DIRECT : {
      name: '直送',
      value: 2,
    },
  }

  // 伝票形式
  var WIKI_VOUCHER_CLASS = {
    PRIVATE: {
      name: '専用伝票',
      value: 1,
    },
    MIS : {
      name: 'MiS',
      value: 2,
    },
  }
