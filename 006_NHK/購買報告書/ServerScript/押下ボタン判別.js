    try {
        if (context.UserData.Triggered === undefined) {
            context.UserData.Triggered = true
            switch (context.ControlId) {
                case 'Process_1':
                    // 報告書提出
                    updateReport()
                    break
                case 'Process_5':
                    // 報告書差し戻し
                    backReport()
                    break
                case 'Process_6':
                    // 報告書差し戻し
                    backReport()
                    break
                case 'Process_7':
                    // 報告書差し戻し
                    backReport()
                    break
                case 'Process_8':
                    // 報告書差し戻し
                    backReport()
                    break

            }
        } else {
            context.Error('trigger')
        }


    } catch (e) {
        context.Log(e.stack)
        context.Error('error。')
    }