try {
    context.Log('決裁ルートに伴う画面表示');
    switch (context.UserData.FinCode) {
        case 300:
            siteSettings.Sections[3].Hide = true;
            siteSettings.Sections[4].Hide = true;
            break;
        case 400:
            siteSettings.Sections[4].Hide = true;
            break;
        case 900:
            break;
        default:
            siteSettings.Sections[2].Hide = true;
            siteSettings.Sections[3].Hide = true;
            siteSettings.Sections[4].Hide = true;
    }
} catch (e){
    context.Log(e.stack);
}