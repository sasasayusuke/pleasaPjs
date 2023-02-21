    try {
        if (context.UserData.Triggered === undefined) {
            context.UserData.Triggered = true
            switch (context.ControlId) {
                case 'Process_1':
                    // 報告書提出
                    updateReport()
                    break
            }
        } else {
            context.Error('trigger')
        }


    } catch (e) {
        context.Log(e.stack)
        context.Error('error。')
    }