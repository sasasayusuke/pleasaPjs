
function backReport() {
    let selectData = {
        View: {
            ColumnFilterHash: {
                Status: serverConvertArrToMul(serverGetStatuses("購買申請", "報告書申請済み")[0].index),
                // ClassA : ["8428"]
                [serverGetColumnName("購買申請", "イベント")]: serverConvertArrToMul(model[serverGetColumnName("購買報告書", "イベント")]),
                // 作成者所属部局
                //Class193 : ,
            }
        }
    }
    let results = items.Get(TABLE_INFO["購買申請"].index, JSON.stringify(selectData))

    for (let result of results) {
        let updateData = {
            Status: serverGetStatuses("購買申請", "PC管理者確認待ち")[0].index,
        }
        items.Update(result.ResultId, JSON.stringify(updateData))
    }

    context.Log('報告書差し戻し処理')


    model.DescriptionA = ""
}
