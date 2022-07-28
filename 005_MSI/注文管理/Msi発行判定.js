$p.events.on_grid_load_arr.push(function () {
    commonAddButton('preCheck', preCheck, 'Mi番号発行')
})

const COLS = [
    ORDERSTATUS     = "注文ステータス"
    , ORDERCLASS    = "注文区分"
    , CUSTOMER      = "顧客名（契約先）"
    , OFFICE        = "事業所名"
    , SUPPLIER      = "仕入先"
    , ENDUSER       = "エンドユーザ"
    , AGENT         = "代理店名"
]


async function preCheck() {
    // 定義した項目が存在しない場合
    if (COLS.map(v => commonGetId(v, false)).some(v => commonIsNull(v))) {
        commonSetMessage("定義した項目が存在しません。スクリプトを確認してください。", ERROR)
    }
    let selects = $p.selectedIds()
    if (selects.length === 0) {
        commonSetMessage("データが選択されていません。", WARNING)
        return false
    }

    if (selects.length > 15) {
        commonSetMessage("選択するデータは15件以下にしてください。", WARNING)
        return false
    }

    // 選択レコード取得
    let selectedData = await getSelectedData(COLS.map(v => commonGetId(v, false)), selects)
    selectedData = selectedData.Response.Data

    // 選択レコードのステータスチェック（注文内示または注文書受領）
    if (commonUniqueArray([...selectedData.map(v => v[ORDERSTATUS]), WIKI_STATUS_ORDER_CONTROL.announce.value, WIKI_STATUS_ORDER_CONTROL.receipt.value]).length > 2) {
        commonSetMessage("選択したデータにMiS注番が発行済みのものが含まれます。出力済みの先行依頼書を再出力する場合は先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。", WARNING)
        return false
    }

    // 選択レコードの「注文区分」一致チェック
    if (commonUniqueArray([...selectedData.map(v => v[ORDERCLASS])]).length > 1) {
        commonSetMessage("「注文区分」が一致したレコードを選択してください。", WARNING)
        return false
    }

    // 全「注文区分」が一致してるので1行目から取得
    // 自社既存品フロー
    if (selectedData[0][ORDERCLASS] == WIKI_ORDER_CLASS.existing_product.name) {
        // 選択レコードの項目一致チェック
        if (commonUniqueArray([...selectedData.map(v => v[CUSTOMER] + v[OFFICE] + v[AGENT] + v[ENDUSER])]).length > 1) {
            commonSetMessage("先行依頼書を作成するには「顧客名（契約先）」「事業所名」「代理店名」「エンドユーザ」が一致したレコードを選択してください。", WARNING)
            return false
        }
        openRequestExcelDownloadDialog()
    // 自社新規開発品フロー
    } else if (selectedData[0][ORDERCLASS] == WIKI_ORDER_CLASS.new_product.name) {

    // 他社製品フロー
    } else if (selectedData[0][ORDERCLASS] == WIKI_ORDER_CLASS.other_company_product.name) {
        // 選択レコードの項目一致チェック
        if (commonUniqueArray([...selectedData.map(v => v[SUPPLIER])]).length > 1) {
            commonSetMessage("仕入先注文書を作成するには「仕入先」が一致したレコードを選択してください。", WARNING)
            return false
        }

    // 不正区分
    } else {
        commonSetMessage("選択したレコードの注文区分が不正な値です。", ERROR)
    }

}