$p.events.on_grid_load_arr.push(function () {

    // ビュー切り替えで実行
    let elemView = document.getElementById("ViewSelector")
    if (commonIsNull(elemView)) return
    if (+elemView.value == VIEW_ORDER_CONTROL.destination.index) {
        commonAddButton('preCheckDestination', preCheckDestination, 'DestinationList出力')
    } else {
        commonAddButton('preCheckMsi', preCheckMsi, 'MiS番号発行')
    }
    commonAddButton('preCheckClaim', preCheckClaim, '請求書発行')

})

// 選択レコード取得
let selectedData = {}

const COLS = [
    // 制御判定で使用する項目
    ORDER_STATUS            = "注文ステータス"
    , ORDER_CLASS           = "注文区分"
    , CUSTOMER              = "顧客名（契約先）"
    , OFFICE                = "事業所名"
    , SUPPLIER              = "仕入先"
    , ENDUSER               = "エンドユーザ"
    , AGENT                 = "代理店名"
    , CURRENCY_CLASS        = "通貨区分"
    , DESTINATION           = "納品先"
    // 国内情報
    , DELIVERY_COMPANY      = "納品先会社名"
    , DELIVERY_OFFICE       = "納品先事業所名"
    , POST_CODE             = "郵便番号"
    , ADDRESS               = "住所"
    , MANAGER               = "担当者"
    , PHONE_NO              = "電話番号"
    , FAX_NO                = "FAX番号"
    // 海外情報
    , SOLD_TO               = "SOLD TO"
    , SOLD_TO_ATTEN         = "SOLD TO ATTEN"
    , SOLD_TO_ADDRESS       = "SOLD TO ADDRESS"
    , SOLD_TO_TEL           = "SOLD TO TEL"
    , SHIP_TO               = "SHIP TO"
    , SHIP_TO_ATTEN         = "SHIP TO ATTEN"
    , SHIP_TO_ADDRESS       = "SHIP TO ADDRESS"
    , SHIP_TO_TEL           = "SHIP TO TEL"
    , SHIP_FROM_COUNTRY     = "SHIP FROM Country"
    , SHIP_TO_COUNTRY       = "SHIP TO Country"
    , PAYMENT_TERM          = "Payment Terms"
    , FORWARDER             = "Forwarder"
    // 帳票で使用する項目
    , SALES_MANAGER         = "営業担当者"
    , CH_NO                 = "注文管理番号"
    , ITEM_NAME             = "品名"
    , MODEL_NO              = "型番"
    , VOLUME                = "数量"
    , UNIT_PRICE            = "単価"
    , PRICE                 = "金額"
    , PRICE_USD             = "金額＄"
    , SUB_TOTAL             = "小計"
    , TAX_PRICE             = "税額"
    , COMMISSION            = "コミッション率"
    , MIS_NO                = "MiS番号"
    , CUSTOMER_CH_NO        = "客先注文番号"
    , CUSTOMER_LIMIT        = "顧客希望納期"
    , ANSWER_LIMIT          = "回答納期"
    , REQUEST_REMARK        = "先行依頼書備考"
    , SUPPLIER_REMARK       = "仕入先注文備考"
    , SCHEDULED_SHIP        = "出荷予定日"


]

async function getData() {
    colIds = COLS.map(v => commonGetId(v, false))
    // 定義した項目が存在しない場合
    if (colIds.some(v => commonIsNull(v))) {
        commonSetMessage("定義した項目が存在しません。スクリプトを確認してください。", ERROR, true, true, colIds)
        return false
    }
    // 別テーブルから取得する項目を追加
    colIds = [
        , "ResultId"
        , ...colIds
        , commonGetId(MODEL_NO, false) + "~" + TABLE_ID_PRODUCT_INFO + ",NumA"                  //原価
        , commonGetId(MODEL_NO, false) + "~" + TABLE_ID_PRODUCT_INFO + ",NumC"                  //原価＄
        , commonGetId(CUSTOMER, false) + "~" + TABLE_ID_COMPANY_INFO + ",ClassI"                //伝票形式
        , commonGetId(CUSTOMER, false) + "~" + TABLE_ID_COMPANY_INFO + ",DescriptionB"          //条件
        , commonGetId(CUSTOMER, false) + "~" + TABLE_ID_COMPANY_INFO + ",ClassF"                //検査成績書要否
    ]

    let selects = $p.selectedIds()

    let tmpDisp = await commonGetData(
        colIds
        , {"ResultId": `[${selects}]`}
        , false
    )
    tmpVal = await commonGetData(
        colIds
        , {"ResultId": `[${selects}]`}
        , true
    )
    selectedData.display = tmpDisp.Response.Data
    selectedData.value = tmpVal.Response.Data

}

async function preCheckMsi() {
    $p.clearMessage()
    let selects = $p.selectedIds()
    if (selects.length === 0) {
        commonSetMessage("データが選択されていません。", WARNING)
        return false
    }

    await getData()

    // 選択レコードのステータスチェック「注文内示」または「注文書受領」
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]), WIKI_STATUS_ORDER_CONTROL.announce.index, WIKI_STATUS_ORDER_CONTROL.receipt.index]).length > 2) {
        commonSetMessage("選択したデータにMiS番号が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }
    // 選択レコードの項目一致チェック
    let checkItems = [
        ORDER_CLASS         // 注文区分
        , CURRENCY_CLASS    // 通貨区分
        , CUSTOMER          // 顧客区分
        , OFFICE            // 事業所
        , AGENT             // 代理店
        , ENDUSER           // エンドユーザー
    ]
    for (let item of checkItems) {
        // 選択レコードの項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[item])]).length > 1) {
            commonSetMessage(`MiS番号を発行するには「${item}」が一致したレコードを選択してください。`, WARNING)
            return false
        }
    }

    // 全「注文区分」が一致してるので1行目から取得
    // 自社既存品フロー
    if (selectedData.value[0][ORDER_CLASS] == WIKI_ORDER_CLASS.existing_product.index) {
        let cnt = 15
        if (selects.length > cnt) {
            commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
            return false
        }

        // 開始時ログ登録
        commonSetMessage('自社既存品フロー', NORMAL, true, false, selectedData)

        openRequestExcelDownloadDialog()

    // 自社新規開発品フロー
    } else if (selectedData.value[0][ORDER_CLASS] == WIKI_ORDER_CLASS.new_product.index) {
        let ans = window.confirm('MiS番号を発行してよろしいですか？\r\n先行依頼書、開発依頼書は作成されません。')
        if (ans) {
            // 開始時ログ登録
            commonSetMessage('自社新規開発品フロー', NORMAL, true, false, selectedData)
            // 帳票なしで注番取得
            downloadRequestExcel(true, false)
        }

    // 他社製品フロー
    } else if (selectedData.value[0][ORDER_CLASS] == WIKI_ORDER_CLASS.other_company_product.index) {
        // 選択件数チェック
        let cnt = 10
        if (selects.length > cnt) {
            commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
            return false
        }

        // 開始時ログ登録
        commonSetMessage('他社製品フロー', NORMAL, true, false, selectedData)

        openSupplierExcelDownloadDialog()

    // 不正区分
    } else {
        commonSetMessage("選択したレコードの注文区分が不正な値です。", ERROR, true)
    }
}

async function preCheckDestination() {
    $p.clearMessage()
    let selects = $p.selectedIds()
    if (selects.length === 0) {
        commonSetMessage("データが選択されていません。", WARNING)
        return false
    }

    await getData()

    // 選択件数チェック
    let cnt = 150
    if (selects.length > cnt) {
        commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
        return false
    }

    // 選択レコードのステータスチェック「納期確定」
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]),  WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.index]).length > 1) {
        commonSetMessage("注文ステータスが納期確定のデータのみを選んでください。", WARNING)
        return false
    }
    // 定義した項目が存在しない場合

    // 納品先が未選択のものが存在
    if (selectedData.display.map(v => v[DESTINATION]).some(v => commonIsNull(v))) {
        commonSetMessage(`納品先が入力されていません。納品先を入力したデータのみを選択してください。`, WARNING)
        return false
    }
    commonSetMessage('DestinationList出力', NORMAL, true, false, selectedData)
    downloadDestitationExcel(selectedData)
}

async function preCheckClaim() {
    $p.clearMessage()
    let selects = $p.selectedIds()
    if (selects.length === 0) {
        commonSetMessage("データが選択されていません。", WARNING)
        return false
    }

    await getData()

    // 選択件数チェック
    let cnt = 15
    if (selects.length > cnt) {
        commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
        return false
    }

    // 選択レコードのステータスチェック「納期確定」
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]),  WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.index]).length > 1) {
        commonSetMessage("注文ステータスが納期確定のデータのみを選んでください。", WARNING)
        return false
    }

    // 納品先が未選択のものが存在
    if (selectedData.display.map(v => v[DESTINATION]).some(v => commonIsNull(v))) {
        commonSetMessage(`納品先が入力されていません。納品先を入力したデータのみを選択してください。`, WARNING)
        return false
    }
    // 伝票形式が未選択のものが存在
    if (selectedData.display.map(v => v["伝票形式"]).some(v => commonIsNull(v))) {
        commonSetMessage(`会社情報の伝票形式が入力されていません。伝票形式を入力したデータのみを選択してください。`, WARNING)
        return false
    }

    // 選択レコードの「納品先」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION])]).length > 1) {
        commonSetMessage("請求書を発行するには「納品先」が一致したレコードを選択してください。", WARNING)
        return false
    }
    // 選択レコードの「顧客名（契約先）」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[CUSTOMER])]).length > 1) {
        commonSetMessage("請求書を発行するには「顧客名（契約先）」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 全「納品先」が一致してるので1行目から取得
    // 国内の場合
    if (selectedData.display[0][DESTINATION].indexOf("国内") == 0) {
        // 選択レコードの項目一致チェック
        let checkItems = [
            DELIVERY_COMPANY
            , DELIVERY_OFFICE
            , POST_CODE
            , ADDRESS
            , MANAGER
            , PHONE_NO
            , FAX_NO
        ]
        for (let item of checkItems) {
            // 選択レコードの項目一致チェック
            if (commonUniqueArray([...selectedData.value.map(v => v[item])]).length > 1) {
                commonSetMessage(`請求書を発行するには、納品管理タブの国内納品先情報「${item}」が一致したレコードを選択してください。`, WARNING)
                return false
            }
        }
        downloadClaimExcel(false)

    } else if (selectedData.display[0][DESTINATION].indexOf("海外") == 0) {
        // 選択レコードの項目一致チェック
        let checkItems = [
            SOLD_TO
            , SOLD_TO_ATTEN
            , SOLD_TO_ADDRESS
            , SOLD_TO_TEL
            , SHIP_TO
            , SHIP_TO_ATTEN
            , SHIP_TO_ADDRESS
            , SHIP_TO_TEL
            , SHIP_FROM_COUNTRY
            , SHIP_TO_COUNTRY
            , PAYMENT_TERM
            , FORWARDER
        ]
        for (let item of checkItems) {
            // 選択レコードの項目一致チェック
            if (commonUniqueArray([...selectedData.value.map(v => v[item])]).length > 1) {
                commonSetMessage(`請求書を発行するには、納品管理タブの海外納品先情報「${item}」が一致したレコードを選択してください。`, WARNING)
                return false
            }
        }
        downloadClaimExcel(true)

    } else {
        commonSetMessage(`納品先が不正です。`, ERROR)
        return false
    }
}