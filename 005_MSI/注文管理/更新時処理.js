
$p.events.after_send_Update = async function () {
    let VOLUME_AT_UPDATE = commonConvertCTo1(commonGetVal("数量"))
    let COST_JPY_AT_UPDATE = commonConvertCTo1(commonGetVal("原価"))
    let COST_USD_AT_UPDATE = commonConvertCTo1(commonGetVal("原価＄"))
    let linkId = commonGetVal("仕入先注文番号", true)

    // 円合計差分
    let diffJpy = VOLUME_AT_UPDATE * COST_JPY_AT_UPDATE - VOLUME_AT_LOAD * COST_JPY_AT_LOAD
    // ドル合計差分
    let diffUsd = VOLUME_AT_UPDATE * COST_USD_AT_UPDATE - VOLUME_AT_LOAD * COST_USD_AT_LOAD

	if (diffJpy == 0 && diffUsd == 0) return false

    if (!commonIsNull(linkId)) {
        let records = await commonExportAjax(
            TABLE_ID_SUPPLIER_ORDER_BOOK
            , ["NumA", "NumB"]
            , {"ResultId": `[${linkId}]`}
            , false
            , false
        )
        let sumJpy = commonConvertCTo1(commonConvertCsvTo2D(records.Response.Content)[0][0])
        let sumUsd = commonConvertCTo1(commonConvertCsvTo2D(records.Response.Content)[0][1])

        commonUpdateAjax(
            linkId,
            {
                "NumA" : sumJpy + diffJpy
                , "NumB" : sumUsd + diffUsd
            },
            {},
            {},
            {},
            {},
        )
    }
}