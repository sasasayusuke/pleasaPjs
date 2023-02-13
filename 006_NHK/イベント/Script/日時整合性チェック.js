
$p.events.before_send_Create_arr.push(function () {
    return dateCheck()
})
$p.events.before_send_Update_arr.push(function () {
    return dateCheck()
})

function dateCheck() {
    let purchaseExpire = commonGetVal("購買依頼報告書締切日")
    let pcSettingExpire = commonGetVal("パソコン設定登録書締切日")
    if (commonIsNull(purchaseExpire)) {
        commonMessage(WARNING, "購買依頼報告書締切日は必須入力してください。")
        return false
    }
    if (commonIsNull(pcSettingExpire)) {
        commonMessage(WARNING, "パソコン設定登録書締切日は必須入力してください。")
        return false
    }
    purchaseExpire = +commonGetDate(new Date(purchaseExpire), undefined, undefined, "YYYYMMDD")
    pcSettingExpire = +commonGetDate(new Date(pcSettingExpire), undefined, undefined, "YYYYMMDD")
    let today = +commonGetDate(undefined, undefined, undefined, "YYYYMMDD")

    if (today >= purchaseExpire) {
        commonMessage(WARNING, "購買依頼報告書締切日は今日より後を入力してください。")
        return false
    }
    if (purchaseExpire > pcSettingExpire) {
        commonMessage(WARNING, "パソコン設定登録書締切日は購買依頼報告書締切日以降を入力してください。")
        return false
    }
    return true

}