
// 分割納品

let readOnlyItemsAfterCheckingDelivery = [
    "税率"
    , "数量"
    , "数量単位(日)"
    , "単価"
    , "単価＄"
]
let readOnlyItemsAfterClose = [
    ...readOnlyItemsAfterCheckingDelivery
    , "営業担当者"
]

$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('注文ステータス')
    switch(status) {
        case WIKI_STATUS_ORDER_CONTROL.announce.value:
            break

        case WIKI_STATUS_ORDER_CONTROL.receipt.value:
            break

        case WIKI_STATUS_ORDER_CONTROL.checkingDelivery.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            commonAddButton('divideDelivery', openDevideDeliveryDialog, '分納')
            break

        case WIKI_STATUS_ORDER_CONTROL.adjustment.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            commonAddButton('divideDelivery', openDevideDeliveryDialog, '分納')
            break

        case WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break

        case WIKI_STATUS_ORDER_CONTROL.shipped.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break

        case WIKI_STATUS_ORDER_CONTROL.accepted.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break

        case WIKI_STATUS_ORDER_CONTROL.closed.value:
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['Process_9'])

            break

        case WIKI_STATUS_ORDER_CONTROL.cancel.value:
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['Process_9'])

            break
        default:
            // その他のステータスの場合エラー
            commonSetMessage("不正status", ERROR)
            break
    }
})
