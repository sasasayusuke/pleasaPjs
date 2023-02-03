
$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('注文ステータス')

    switch(status) {
        case "下書き":
            commonAddButton('accept', accept, '受付開始', 'イベントの受付を開始します')
            break
        case "受付中":

            break
        case "終了":
            break
        default:
            // その他のステータスの場合エラー
            commonSetMessage("不正status", ERROR, true)
            break
    }
})
