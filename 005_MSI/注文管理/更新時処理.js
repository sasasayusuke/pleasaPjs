
$p.events.after_send_Update = async function () {
    let atUpdateVolume = commonConvertCTo1(commonGetVal("数量"))
    let atUpdateCostJpy = commonConvertCTo1(commonGetVal("原価"))
    let atUpdateCostUsd = commonConvertCTo1(commonGetVal("原価＄"))
    let atUpdateUnit = commonConvertCTo1(commonGetVal("単価"))
	let atUpdateTaxRate = commonConvertCTo1(commonGetVal("税率"))

    let linkSuppId = commonGetVal("仕入先注文番号", true)
    let linkClaimId = commonGetVal("請求書番号", true)

    if (!commonIsNull(linkSuppId)) {
        // 円合計原価差分
        let diffCostJpy = atUpdateVolume * atUpdateCostJpy - atLoadVolume * atLoadCostJpy
        // ドル合計原価差分
        let diffCostUsd = atUpdateVolume * atUpdateCostUsd - atLoadVolume * atLoadCostUsd

        if (diffCostJpy != 0 || diffCostUsd != 0) {
            let item = [
                colSumCostJpy = "NumA"
                , colSumCostUsd = "NumB"
            ]

            let records = await commonExportAjax(
                TABLE_ID_SUPPLIER_ORDER_BOOK
                , item
                , {"ResultId": `[${linkSuppId}]`}
                , false
                , false
            )
            let record = commonConvertCsvTo2D(records.Response.Content)[0]
            let sumJpy = commonConvertCTo1(record[item.indexOf(colSumCostJpy)])
            let sumUsd = commonConvertCTo1(record[item.indexOf(colSumCostUsd)])

            commonUpdateAjax(
                linkSuppId,
                {},
                {
                    [colSumCostJpy] : sumJpy + diffCostJpy
                    , [colSumCostUsd] : sumUsd + diffCostUsd
                },
                {},
                {},
                {},
            )
        }
    }

	if (!commonIsNull(linkClaimId)) {
        // 小計差分
        let diffSubtotal = atUpdateVolume * atUpdateUnit - atLoadVolume * atLoadUnit
        // 税額差分
        let diffTax = (atUpdateVolume * atUpdateUnit * atUpdateTaxRate - atLoadVolume * atLoadUnit * atLoadTaxRate) / 100
        // 金額差分
        let diffPrice = diffTax + diffSubtotal

        if (diffSubtotal != 0 || diffTax != 0 || diffPrice != 0) {
            let item = [
                colTax = "NumA"
                , colSumPrice = "NumB"
                , colSubtotal = "NumC"
            ]

            let records = await commonExportAjax(
                TABLE_ID_CLAIM_BOOK
                , item
                , {"ResultId": `[${linkClaimId}]`}
                , false
                , false
            )
            let record = commonConvertCsvTo2D(records.Response.Content)[0]
            let sumTax = commonConvertCTo1(record[item.indexOf(colTax)])
            let sumPrc = commonConvertCTo1(record[item.indexOf(colSumPrice)])
            let sumSbt = commonConvertCTo1(record[item.indexOf(colSubtotal)])

            commonUpdateAjax(
                linkClaimId,
                {},
                {
                    [colTax] : sumTax + diffTax
                    , [colSumPrice] : sumPrc + diffPrice
                    , [colSubtotal] : sumSbt + diffSubtotal
                },
                {},
                {},
                {},
            )
        }
    }

}