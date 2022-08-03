const oyaId = 251523
const columns = [
    tumitate = "NumA",
    test = "NumB"
]

$p.events.on_editor_load_arr.push(async function () {


    let records = await commonExportAjax(
        // 親テーブルID
		oyaId
        // 取得したい項目（積立残, NumBはテスト）
		, columns
		// 親レコードID（リンク先）に絞る
        , {"ResultId": `[${commonGetVal("リンク先", false)}]`}

	)
    //　取得後配列に整形
    records = commonConvertCsvTo2D(records.Response.Content)
    // 1行目のNumAを積立残に入力
    commonSetVal("積立残", records[1][columns.indexOf(tumitate)])
})

$p.events.after_send_Update = function () {
    commonUpdateAjax(
        commonGetVal("リンク先", false),
        {},
        {
            // NumA
            [tumitate] : commonGetVal("積立残")
        },
        {},
        {},
        {},
    )
}