try {
    if (context.UserData.Triggered === undefined) {
        let results = items.Get(TABLE_INFO["イベント"].index, '{}');
        for (let result of results) {
            let apiModel = items.New()
            apiModel[commonGetColumnName(TABLE_INFO["購買報告書"].index, "イベント")] = model.ResultId
            context.UserData.Triggered = true
            items.Create(TABLE_INFO["購買報告書"].index, apiModel)
        }

    }
} catch (e) {
    context.Log(e)
}