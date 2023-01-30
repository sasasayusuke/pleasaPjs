try {
    if (context.UserData.Triggered === undefined) {
        let results = items.Get(TABLE_INFO["部局情報"].index, '{}');
        for (let result of results) {
            let apiModel = items.New()
            apiModel[commonGetColumnName("購買報告書", "イベント")] = model.ResultId
            apiModel[commonGetColumnName("購買報告書", "申請部局")] = result[commonGetColumnName("部局情報", "部局名")]
            context.UserData.Triggered = true
            items.Create(TABLE_INFO["購買報告書"].index, apiModel)
        }

    }
} catch (e) {
    context.Log(e)
}