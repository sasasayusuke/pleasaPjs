
function updateReport() {
    let data = {
        View: {
            ColumnFilterHash: {
                "Status": commonConvertArrToMul(commonGetStatuses("購買申請","PC管理者確認待ち")[0].index),
                // ClassA : ["8428"]
                [commonGetColumnName("購買申請", "イベント")]: commonConvertArrToMul(model[commonGetColumnName("購買報告書", "イベント")]),
            }
        }
    }
    let results = items.Get(TABLE_INFO["購買申請"].index, JSON.stringify(data))

    for (let result of results) {
        context.Log(result.ResultId)
    }

        context.Log('報告書提出処理')
        //context.Error('あなたは本件を完了にすることが出来ません。')
        model.DescriptionA = `[md]| パソコン形状 | 購入台数 | 経理科目 | 細節 | 部局メモ | 送付先住所 | 備考 |
|:------------|--------:|:--------|:-----|:--------|:-----|:-----|
|?|11111|1151|11A|1111|||111|
|?|0|||||||`
}

function getSummary() {
    let md = ["[md]|"]
    return
}