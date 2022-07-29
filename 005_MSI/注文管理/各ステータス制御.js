
// 納期確認中以降読み込み制御項目
let readOnlyItemsAfterCheckingDelivery = [
    "税率"
    , "数量"
    , "数量単位(日)"
    , "単価"
    , "単価＄"
    , "仕入先注文備考"
    , "納入区分"
]
// 完了以降読み込み制御項目
let readOnlyItemsAfterClose = [
    ...readOnlyItemsAfterCheckingDelivery
    , "営業担当者"
]

$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('注文ステータス')
    switch(status) {
        // 注文内示
        case WIKI_STATUS_ORDER_CONTROL.announce.value:
            break
        // 注文書受領
        case WIKI_STATUS_ORDER_CONTROL.receipt.value:
            break
        // 納期確認中
        case WIKI_STATUS_ORDER_CONTROL.checkingDelivery.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            commonAddButton('divideDelivery', openDevideDeliveryDialog, '分納')
            break
        // 前倒し調整中
        case WIKI_STATUS_ORDER_CONTROL.adjustment.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            commonAddButton('divideDelivery', openDevideDeliveryDialog, '分納')
            break
        // 納期確定
        case WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break
        // 出荷済
        case WIKI_STATUS_ORDER_CONTROL.shipped.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break
        // 検収済
        case WIKI_STATUS_ORDER_CONTROL.accepted.value:
            readOnlyItemsAfterCheckingDelivery.forEach(v => commonChangeReadOnly(v))
            break
        // 完了
        case WIKI_STATUS_ORDER_CONTROL.closed.value:
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['Process_9'])
            break
        // キャンセル
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
