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
    , DELIVERY_CLASS        = "納入区分"
    , DESTINATION           = "納品先"
    , DELIVERY_COMPANY      = "納品先会社名"
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
    , REQUEST_REMARK        = "先行依頼書備考"
    , SUPPLIER_REMARK       = "仕入先注文備考"
    , SCHEDULED_SHIP        = "出荷予定日"
    , DELIVERY_OFFICE       = "納品先事業所名"
    , DESTINATION_COMPANY   = "送り先会社名"
    , DESTINATION_COUNTRY   = "送り先国名"
    , SEND_COUNTRY          = "送り元国名"
    , COURIER               = "宅配業者"
    , MANAGER               = "担当者"
    , SE_NO                 = "請求書番号"
    , TAX_PRICE             = "税額"
    , ADDRESS               = "住所"
    , PHONE_NO              = "電話番号"
    , CLAIM_COMPANY         = "請求先会社名"
    , CLAIM_ADDRESS         = "請求先住所"
    , DESTINATION_ADDRESS   = "送り先住所"
    , DESTINATION_PHONE_NO  = "送り先電話番号"
    , PAYMENT_TERM          = "支払条件"


]

async function getData() {
    colIds = COLS.map(v => commonGetId(v, false))
    // 定義した項目が存在しない場合
    if (colIds.some(v => commonIsNull(v))) {
        commonSetMessage("定義した項目が存在しません。スクリプトを確認してください。", ERROR, true)
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
    await getData()
    let selects = $p.selectedIds()

    // 選択レコードのステータスチェック「注文内示」または「注文書受領」
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]), WIKI_STATUS_ORDER_CONTROL.announce.index, WIKI_STATUS_ORDER_CONTROL.receipt.index]).length > 2) {
        commonSetMessage("選択したデータにMiS番号が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }

    // 選択レコードの「注文区分」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_CLASS])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「注文区分」が一致したレコードを選択してください。", WARNING)
        return false
    }
    // 選択レコードの「通貨区分」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[CURRENCY_CLASS])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「通貨区分」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 選択レコードの「顧客名（契約先）」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[CUSTOMER])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「顧客名（契約先）」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 選択レコードの「事業所名」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[OFFICE])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「事業所名」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 選択レコードの「代理店名」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[AGENT])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「代理店名」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 選択レコードの「エンドユーザ」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[ENDUSER])]).length > 1) {
        commonSetMessage("MiS番号を発行するには「エンドユーザ」が一致したレコードを選択してください。", WARNING)
        return false
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

        openRequestExcelDownloadDialog(selectedData)

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

        // 選択レコードの「納入区分」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[DELIVERY_CLASS])]).length > 1) {
            commonSetMessage("仕入先注文を作成するには「納入区分」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 開始時ログ登録
        commonSetMessage('他社製品フロー', NORMAL, true, false, selectedData)

        openSupplierExcelDownloadDialog(selectedData)

    // 不正区分
    } else {
        commonSetMessage("選択したレコードの注文区分が不正な値です。", ERROR, true)
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
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]),  WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.index]).length > 1) {
        commonSetMessage("選択したデータにMiS番号が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
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

async function preCheckClaim() {
    $p.clearMessage()
    await getData()
    let selects = $p.selectedIds()

    // 選択件数チェック
    let cnt = 15
    if (selects.length > cnt) {
        commonSetMessage(`選択するデータは${cnt}件以下にしてください。`, WARNING)
        return false
    }

    // 選択レコードのステータスチェック「納期確定」
    if (commonUniqueArray([...selectedData.value.map(v => v[ORDER_STATUS]),  WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.index]).length > 1) {
        commonSetMessage("選択したデータにMiS番号が発行済みのものが含まれます。\r\n出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }

    // 納品先が未選択のものが存在
    if (selectedData.display.map(v => v[DESTINATION]).some(v => commonIsNull(v))) {
        commonSetMessage(`納品先が未選択のものが選択されています。`, WARNING)
        return false
    }

    // 選択レコードの「納品先」項目一致チェック
    if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION])]).length > 1) {
        commonSetMessage("請求書を発行するには「納品先」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 全「納品先」が一致してるので1行目から取得
    // 国内の場合
    if (selectedData.value[0][DESTINATION].indexOf("国内") == 0) {
        // 選択レコードの「請求先会社名」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[CLAIM_COMPANY])]).length > 1) {
            commonSetMessage("請求書を発行するには「請求先会社名」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「請求先住所」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[CLAIM_ADDRESS])]).length > 1) {
            commonSetMessage("請求書を発行するには「請求先住所」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「送り先会社名」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION_COMPANY])]).length > 1) {
            commonSetMessage("請求書を発行するには「送り先会社名」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「送り先住所」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION_ADDRESS])]).length > 1) {
            commonSetMessage("請求書を発行するには「送り先住所」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「送り先電話番号」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION_PHONE_NO])]).length > 1) {
            commonSetMessage("請求書を発行するには「送り先電話番号」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「送り先国名」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[DESTINATION_COUNTRY])]).length > 1) {
            commonSetMessage("請求書を発行するには「送り先国名」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「送り元国名」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[SEND_COUNTRY])]).length > 1) {
            commonSetMessage("請求書を発行するには「送り元国名」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「宅配業者」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[COURIER])]).length > 1) {
            commonSetMessage("請求書を発行するには「宅配業者」が一致したレコードを選択してください。", WARNING)
            return false
        }
        // 選択レコードの「支払条件」項目一致チェック
        if (commonUniqueArray([...selectedData.value.map(v => v[PAYMENT_TERM])]).length > 1) {
            commonSetMessage("請求書を発行するには「支払条件」が一致したレコードを選択してください。", WARNING)
            return false
        }

    } else if (selectedData.value[0][DESTINATION].indexOf("海外") == 0) {

    }

    downloadDestitationExcel(selectedData)
}