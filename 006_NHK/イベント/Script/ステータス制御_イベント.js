
$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('Status')

    switch(status) {
        case "下書き":
            commonAddButton('accept', accept, '受付開始', 'イベントの受付を開始します')
            break
        case "受付中":
            break
        case "購買依頼報告書締切":
            commonAddButton('printSpread', printSpread, 'エクセル出力', "ステータスが購買締切以降であればエクセル出力できます。", "", "ui-icon-print")
            break
        case "終了":
            commonAddButton('printSpread', printSpread, 'エクセル出力', "ステータスが購買締切以降であればエクセル出力できます。", "", "ui-icon-print")
            break
        default:
            // その他のステータスの場合エラー
            commonMessage(STATUS_ERROR, "不正status")
            break
    }
})
