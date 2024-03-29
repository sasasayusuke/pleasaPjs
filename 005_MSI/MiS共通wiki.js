  var version = 3

  // 注文管理 ビュー
  var VIEW_ORDER_CONTROL = {
  sale: {
      index: 1,
      value: "営業担当者用",
  }
  , development: {
      index: 2,
      value: "開発担当者用",
  }
  , destination: {
      index: 3,
      value: "DestitationList用",
  }
}

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
  function convertOrderClassNameToIndex(name) {
    for (let v of Object.keys(WIKI_ORDER_CLASS)) {
        if (WIKI_ORDER_CLASS[v].name == name) {
            return WIKI_ORDER_CLASS[v].index
        }
    }
}
  // 会社区分
  var WIKI_COMPANY_CLASS = {
    MSI: {
      index: 76366,
      name: "自社",
    },
    AGENCY: {
      index: 76365,
      name: "代理店",
    },
    CUSTOMER_VIA_AGENCY: {
      index: 76364,
      name: "顧客（代理店経由）",
    },
    CUSTOMER_DIRECT: {
      index: 76363,
      name: "顧客（直販）",
    },
    SUPPLIER: {
      index: 76362,
      name: "仕入先",
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
