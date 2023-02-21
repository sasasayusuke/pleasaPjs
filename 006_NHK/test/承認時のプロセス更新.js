try {
    context.Log('承認時のプロセス更新');
    switch (context.ControlId) {
        case 'Process_1':
            model.Status = 200;
            model.ClassA = "OO";
            break;
    }
    if (model.Status === 900) {
        model.Manager = model.Owner;
    }

    function status(code) {
        if (context.UserData.FinCode === code) {
            return 900;
        } else {
            return code;
        }
    }

    function manager(userId) {
        var user = users.Get(userId);
        if (user) {
            return user.UserId;
        } else {
            return model.Manager;
        }
    }
} catch (e) {
    context.Log(e.stack);
}