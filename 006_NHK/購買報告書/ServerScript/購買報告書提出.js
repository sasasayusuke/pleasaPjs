
function updateReport() {
    let selectData = {
        View: {
            ColumnFilterHash: {
                Status: serverConvertArrToMul(serverGetStatuses("購買申請","PC管理者確認待ち")[0].index),
                // ClassA : ["8428"]
                [serverGetColumnName("購買申請", "イベント")]: serverConvertArrToMul(model[serverGetColumnName("購買報告書", "イベント")]),
            }
        }
    }
    let results = items.Get(TABLE_INFO["購買申請"].index, JSON.stringify(selectData))

    let values = []
    for (let result of results) {

        let updateData = {
            Status: serverGetStatuses("購買申請", "報告書申請済み")[0].index,
            ClassHash:{
                [serverGetColumnName("購買申請", "ワークフロー")]: model.ResultId,
            }
        }

        items.Update(result.ResultId, JSON.stringify(updateData))
        for (let itemLabels of getItemLabels(ITEM_LABELS, false)) {
            if (serverIsNull(result[serverGetColumnName("購買申請", itemLabels[ITEM_LABELS.indexOf("パソコン形状")])])) continue
            let value = []
            for (let label of itemLabels) {
                value.push(result[serverGetColumnName("購買申請", label)])
            }
            values.push(value)
        }
        context.Log(result.ResultId)
        context.Log(serverGetColumnName("購買申請", "ワークフロー"))

    }
    let indexes = [
        ITEM_LABELS.indexOf("パソコン形状"),
        ITEM_LABELS.indexOf("経理科目"),
        ITEM_LABELS.indexOf("細節"),
        ITEM_LABELS.indexOf("部局メモ"),
        ITEM_LABELS.indexOf("送付先住所"),
    ]
    values = serverSum2DArray(values, indexes, ITEM_LABELS.indexOf("台数"))
    values = serverSort2DArray(values, indexes)


    context.Log('報告書提出処理')
    //context.Error('あなたは本件を完了にすることが出来ません。')

    let arr =[]
    let headers = ITEM_LABELS
    let aligns = [12, -8, 6, 6, 8, 15, 15]
    arr.push(headers)
    arr.push(aligns)
    arr.push(...values)

    model.DescriptionA = serverConvert2DToMd(arr)
    //model.DescriptionB = serverConvert2DToMd(arr)
}
