try {
    context.Log('決裁ルートの自動選択');
    if (model.NumA < 200000) {
        context.UserData.FinCode = 300;
        model.ClassB = manager(context.DeptId, 3).UserId;
    } else if (model.NumA < 1000000) {
        context.UserData.FinCode = 400;
        model.ClassB = manager(context.DeptId, 3).UserId;
        model.ClassC = manager(context.DeptId, 4).UserId;
    } else {
        context.UserData.FinCode = 900;
        model.ClassB = manager(context.DeptId, 3).UserId;
        model.ClassC = manager(context.DeptId, 4).UserId;
        model.ClassD = officer().UserId;
    }

    function manager(deptId, groupId) {
        let members = groups.Get(groupId).GetMembers();
        for (let member of members) {
            if (member.UserId > 0) {
                let user = users.Get(member.UserId);
                if (user.DeptId === context.DeptId) {
                    return user;
                }
            }
        }
    }

    function officer () {
        let users = depts.Get(2).GetMembers()
        for (let user of users) {
            return user;
        }
    }
} catch (e){
    context.Log(e.stack);
}