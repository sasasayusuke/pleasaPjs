try {
    context.Log('自動メール通知');
    let user = users.Get(model.Manager);
    let notification = notifications.New();
    if (user.UserId > 0) {
        notification.Address = '[User' + user.UserId + ']';
        switch (model.Status) {
            case 200:
            case 300:
            case 400:
                notification.Title = '承認依頼：' + model.Title;
                notification.Body = user.Name + '殿：掲題の承認依頼が届いています。';
                notification.Send();
                break;
            case 900:
                notification.Title = '可決：' + model.Title;
                notification.Body = user.Name + '殿：掲題の申請が可決されました。';
                notification.Send();
                break;
            case 920:
                notification.Title = '否決：' + model.Title;
                notification.Body = user.Name + '殿：掲題の申請が否決されました。';
                notification.Send();
                break;
        }
    }
} catch (e){
    context.Log(e.stack);
}