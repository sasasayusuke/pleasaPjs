
$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('注文ステータス')
    switch (status) {
        case WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.value:
            commonAddButton('delivery', openDeliveryDialog, '納品または分納')
            break
        //default:
        //    // その他のステータスの場合エラー
        //    commonSetMessage("不正status", ERROR)
        //    break
    }
})
