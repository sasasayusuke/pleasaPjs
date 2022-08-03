$p.events.on_grid_load_arr.push(function () {

    // ビュー切り替えで実行
    let elemView = document.getElementById("ViewSelector")
    if (commonIsNull(elemView)) return
    if (+elemView.value == VIEW_ORDER_CONTROL.destination.index) {
        commonAddButton('preCheckDestination', preCheckDestination, 'DestinationList出力')
    } else {
        commonAddButton('preCheckMsi', preCheckMsi, 'Mi番号発行')
    }
    commonAddButton('claimPreCheck', claimPreCheck, '請求書発行')

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
    , DELIVERY_CLASS        = "納入区分"
    , DESTINATION           = "納品先"
    // 帳票で使用する項目
    , SALES_MAN             = "営業担当者"
    , CH_NO                 = "注文管理番号"
    , ITEM_NAME             = "品名"
    , MODEL_NO              = "型番"
    , VOLUME                = "数量"
    , UNIT_PRICE            = "単価"
    , PRICE                 = "金額"
    , COMMISSION            = "コミッション率"
    , MIS_NO                = "MiS番号"
    , CUSTOMER_CH_NO        = "客先注文番号"
    , CUSTOMER_LIMIT        = "顧客希望納期"
    , ANSWER_LIMIT          = "回答納期"
    , INFORMATION           = "連絡事項"
    , SUPPLIER_REMARK       = "仕入先注文備考"
    , SCHEDULED_SHIP        = "出荷予定日"
    , DELIVERY_DESTINATION  = "納品先会社名"
    , SEND_DESTINATION      = "送り先会社名"
    , COURIER               = "宅配業者"
]

async function getData() {
    colIds = COLS.map(v => commonGetId(v, false))
    // 定義した項目が存在しない場合
    if (colIds.some(v => commonIsNull(v))) {
        commonSetMessage("定義した項目が存在しません。スクリプトを確認してください。", ERROR)
    }
    // 別テーブルから取得する項目を追加
    colIds = [
        , "ResultId"
        , ...colIds
        , commonGetId(MODEL_NO, false) + "~" + TABLE_ID_PRODUCT_INFO + ",NumA"          //原価
        , commonGetId(MODEL_NO, false) + "~" + TABLE_ID_PRODUCT_INFO + ",NumC"          //原価＄
        , commonGetId(CUSTOMER, false) + "~" + TABLE_ID_COMPANY_INFO + ",DescriptionB"  //条件
        , commonGetId(SUPPLIER, false) + "~" + TABLE_ID_COMPANY_INFO + ",ClassF"        //検査成績書要否
    ]

    let selects = $p.selectedIds()
    if (selects.length === 0) {
        commonSetMessage("データが選択されていません。", WARNING)
        return false
    }

    let tmp = await getSelectedData(colIds, selects)
    selectedData.display = tmp.Response.Data
    tmp = await getSelectedData(colIds, selects, $p.siteId(), false)
    selectedData.value = tmp.Response.Data

}

async function preCheckMsi() {
    $p.clearMessage()
    await getData()
    let selects = $p.selectedIds()

    // 選択レコードのステータスチェック「注文内示」または「注文書受領」
    if (commonUniqueArray([...selectedData.display.map(v => v[ORDER_STATUS]), WIKI_STATUS_ORDER_CONTROL.announce.value, WIKI_STATUS_ORDER_CONTROL.receipt.value]).length > 2) {
        commonSetMessage("選択したデータにMiS注番が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }

    // 選択レコードの「注文区分」一致チェック
    if (commonUniqueArray([...selectedData.display.map(v => v[ORDER_CLASS])]).length > 1) {
        commonSetMessage("「注文区分」が一致したレコードを選択してください。", WARNING)
        return false
    }
    // 選択レコードの「通貨区分」一致チェック
    if (commonUniqueArray([...selectedData.display.map(v => v[CURRENCY_CLASS])]).length > 1) {
        commonSetMessage("「通貨区分」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 選択レコードの項目一致チェック
    if (commonUniqueArray([...selectedData.display.map(v => v[CUSTOMER] + v[OFFICE] + v[AGENT] + v[ENDUSER])]).length > 1) {
        commonSetMessage("Mis発行を作成するには「顧客名（契約先）」「事業所名」「代理店名」「エンドユーザ」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 全「注文区分」が一致してるので1行目から取得
    // 自社既存品フロー
    if (selectedData.display[0][ORDER_CLASS] == WIKI_ORDER_CLASS.existing_product.name) {
        let cnt = 15
        if (selects.length > cnt) {
            commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
            return false
        }


        openRequestExcelDownloadDialog(selectedData)

    // 自社新規開発品フロー
    } else if (selectedData.display[0][ORDER_CLASS] == WIKI_ORDER_CLASS.new_product.name) {
        let ans = window.confirm('Misを発行してよろしいですか？\r\n先行依頼書、開発依頼書は作成されません。')
        if (ans) {
            // 帳票なしで注番取得
            downloadRequestExcel(true, false)
        }

    // 他社製品フロー
    } else if (selectedData.display[0][ORDER_CLASS] == WIKI_ORDER_CLASS.other_company_product.name) {
        // 選択件数チェック
        let cnt = 10
        if (selects.length > cnt) {
            commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
            return false
        }

        // 選択レコードの項目一致チェック
        if (commonUniqueArray([...selectedData.display.map(v => v[SUPPLIER] + v[DELIVERY_CLASS])]).length > 1) {
            commonSetMessage("仕入先注文を作成するには「仕入先」「納入区分」が一致したレコードを選択してください。", WARNING)
            return false
        }
        openSupplierExcelDownloadDialog(selectedData)

    // 不正区分
    } else {
        commonSetMessage("選択したレコードの注文区分が不正な値です。", ERROR)
    }
}

async function preCheckDestination() {
    $p.clearMessage()
    await getData()
    let selects = $p.selectedIds()

    // 選択件数チェック
    let cnt = 150
    if (selects.length > cnt) {
        commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
        return false
    }

    // 選択レコードのステータスチェック「納期確定」
    if (commonUniqueArray([...selectedData.display.map(v => v[ORDER_STATUS]),  WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.value]).length > 1) {
        commonSetMessage("選択したデータにMiS注番が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }
    // 定義した項目が存在しない場合

    // 納品先が未選択のものが存在
    if (selectedData.display.map(v => v[DESTINATION]).some(v => commonIsNull(v))) {
        commonSetMessage(`納品先が未選択のものが選択されています。`, WARNING)
        return false
    }
    downloadDestitationExcel(selectedData)
}