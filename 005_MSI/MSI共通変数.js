  var version = 3

  var SETTING_SHEET_NAME = "setting"
  var TEMPLATE_SHEET_NAME = "template"
  var SERVER_URL = "https://mis-tech.sdt-autolabo.com"

/**
 * テーブル情報
 * サイト複製時には、新しく割り振れたテーブルIDを入力し直してください。
 *
 */

  //国番号マスタ
  var TABLE_ID_COUNTRY_NO           = 12
  //コミッション率マスタ
  var TABLE_ID_COMMISSION_RATE      = 6
  //エンドユーザマスタ
  var TABLE_ID_END_USER             = 8
  //インボイス番号マスタ
  var TABLE_ID_INVOICE_NO           = 5
  //会社区分
  var TABLE_ID_COMPANY_CLASS        = 1809
  //会社情報
  var TABLE_ID_COMPANY_INFO         = 15
  //事業所情報
  var TABLE_ID_OFFICE_INFO          = 3319
  //個人情報
  var TABLE_ID_PERSON_INFO          = 4
  //見積台帳
  var TABLE_ID_ESTIMATION_BOOK      = 21036
  //製品情報
  var TABLE_ID_PRODUCT_INFO         = 10
  //注文管理台帳
  var TABLE_ID_ORDER_CONTROL_BOOK   = 34288//11
  //先行依頼台帳
  var TABLE_ID_REQUEST_BOOK         = 34289//13
  //仕入先注文台帳
  var TABLE_ID_SUPPLIER_ORDER_BOOK  = 17
  //請求書台帳
  var TABLE_ID_INVOICE_BOOK         = 14
  //エクセルフォーマット
  var TABLE_ID_EXCEL_FORMAT         = 7
  //注文台帳入力フォーム
  var TABLE_ID_ORDER_INPUT_FORM     = 1756


  // 先行依頼書フォーマット
  var FORMAT_ID_REQUEST = "01"
  // 見積書フォーマット
  var FORMAT_ID_ESTIMATION = "02"

  // 注文区分
  var WIKI_ORDER_CLASS = {
    existing_product: {
      index: 0,
      name: "自社既存品",
    },
    new_product: {
      index: 1,
      name: "自社新規開発品",
    },
    other_company_product: {
      index: 2,
      name: "他社製品",
    }
  }
  // 会社区分
  var WIKI_COMPANY_CLASS = {
    MSI: {
      index: 1816,
      name: "自社",
    },
    AGENCY: {
      index: 1817,
      name: "代理店",
    },
    CUSTOMER_VIA_AGENCY: {
      index: 1818,
      name: "顧客（代理店経由）",
    },
    CUSTOMER_DIRECT: {
      index: 1819,
      name: "顧客（直販）",
    },
    SUPPLIER: {
      index: 1820,
      name: "仕入先",
    }
  }

  // 注文管理ステータス
  var WIKI_STATUS_ORDER_CONTROL = {
    announce: {
      index: 100,
      value: "注文内示",
      label: "注文内示",
      style: "status-new"
    }
    , receipt: {
        index: 200,
        value: "注文書受領",
        label: "注文書受領",
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
        value: "前倒し調整中",
        label: "前倒し調整中",
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

