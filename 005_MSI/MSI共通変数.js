  var version = 1

  // テーブル
  var TABLE = {
    COUNTRY_NO: {
        index: 12,
        name: "国番号マスタ",
    }
    , COMMISSION_RATE: {
        index: 6,
        name: "コミッション率マスタ",
    }
    , END_USER: {
      index: 8,
      name: "エンドユーザマスタ",
    }
    , INVOICE_NO: {
      index: 5,
      name: "インボイス番号マスタ",
    }
    , COMPANY_CLASS: {
      index: 1809,
      name: "会社区分",
    }
    , COMPANY_INFO: {
      index: 15,
      name: "会社情報",
    }
    , OFFICE_INFO: {
      index: 3319,
      name: "事業所情報",
    }
    , PERSON_INFO: {
      index: 4,
      name: "個人情報",
    }
    , ESTIMATION_BOOK: {
      index: 9,
      name: "見積台帳",
    }
    , PRODUCT_INFO: {
      index: 10,
      name: "製品情報",
    }
    , ORDER_CONTROL: {
      index: 11,
      name: "注文管理",
    }
    , REQUEST_BOOK: {
      index: 13,
      name: "先行依頼台帳",
    }
    , SUPPLIER_ORDER_BOOK: {
      index: 17,
      name: "仕入先注文台帳",
    }
    , INVOICE_BOOK: {
      index: 14,
      name: "請求書台帳",
    }
    , EXCEL_FORMAT: {
      index: 7,
      name: "エクセルフォーマット",
    }
    , ORDER_INPUT_FORM: {
      index: 1756,
      name: "注文台帳入力フォーム",
    }
  }

  // フォーマット
  var FORMAT = {
    REQUEST: {
      index: 1,
      name: "先行依頼書",
    }
    , ESTIMATION: {
        index: 2,
        name: "見積書",
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

  var SETTING_SHEET_NAME = "setting"
  var TEMPLATE_SHEET_NAME = "template"
  var SERVER_URL = "https://mis-tech.sdt-autolabo.com/"
