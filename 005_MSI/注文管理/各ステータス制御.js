
// 納期確認中以降読み込み制御項目
let readOnlyItemsAfterCheckingDelivery = [
    "税率"
    , "数量"
    , "数量単位(日)"
    , "単価"
    , "単価＄"
    , "仕入先注文備考"
]
// 出荷済以降読み込み制御項目
let readOnlyItemsAfterconfirmedDelivery = [
    ...readOnlyItemsAfterCheckingDelivery
    , "入荷日"

]
    // 出荷済以降読み込み制御項目
let readOnlyItemsAfterShipped = [
    ...readOnlyItemsAfterconfirmedDelivery
    , "出荷予定日"
    , "出荷完了日"
    , "納品日"
    , "納品先"
    , "納品先会社名"
    , "納品先事業所名"
    , "郵便番号"
    , "住所"
    , "担当者"
    , "電話番号"
    , "FAX番号"
]

// 検収済以降読み込み制御項目
let readOnlyItemsAfterAccepted = [
    ...readOnlyItemsAfterShipped
    , "入金予定日"
    , "請求月日"

]
// 完了以降読み込み制御項目
let readOnlyItemsAfterClose = [
    ...readOnlyItemsAfterAccepted
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
            readOnlyItemsAfterconfirmedDelivery.forEach(v => commonChangeReadOnly(v))
            break
        // 出荷済
        case WIKI_STATUS_ORDER_CONTROL.shipped.value:
            readOnlyItemsAfterShipped.forEach(v => commonChangeReadOnly(v))
            break
        // 検収済
        case WIKI_STATUS_ORDER_CONTROL.accepted.value:
            readOnlyItemsAfterAccepted.forEach(v => commonChangeReadOnly(v))
            break
        // 完了
        case WIKI_STATUS_ORDER_CONTROL.closed.value:
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['UpdateCommand', 'Process_9'])
            break
        // キャンセル
        case WIKI_STATUS_ORDER_CONTROL.cancel.value:
            readOnlyItemsAfterClose.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['UpdateCommand', 'Process_9'])

            break
        default:
            // その他のステータスの場合エラー
            commonSetMessage("不正status", ERROR, true)
            break
    }
})
