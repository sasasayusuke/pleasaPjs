// 納期再調整以降読み込み制御項
let readOnlyItemsAfterAdjustment = [
    "仕入先注文備考"
]

// 入荷確定以降読み込み制御項目
let readOnlyItemsAfterconfirmedArrival = [
    ...readOnlyItemsAfterAdjustment
    , "営業担当者"
    , "納入仕様書発行"
    , "納入仕様書担当者"
    , "入荷日"
]
// 納期確定以降読み込み制御項目
let readOnlyItemsAfterconfirmedDelivery = [
    ...readOnlyItemsAfterconfirmedArrival
    , "出荷予定日"
    , "納品日"
]
// 出荷済以降読み込み制御項目
let readOnlyItemsAfterShipped = [
    ...readOnlyItemsAfterconfirmedDelivery
    , "先行依頼書備考"
    , "納品先"
    // 納品先：国内
    , "納品先会社名"
    , "納品先事業所名"
    , "郵便番号"
    , "住所"
    , "担当者"
    , "電話番号"
    , "FAX番号"
    // 納品先：海外
    , "SOLD TO"
    , "SOLD TO ATTEN"
    , "SOLD TO ADDRESS"
    , "SOLD TO TEL"
    , "SHIP TO"
    , "SHIP TO ATTEN"
    , "SHIP TO ADDRESS"
    , "SHIP TO TEL"
    , "SHIP FROM Country"
    , "SHIP TO Country"
    , "Forwarder"
    , "アカウント番号"
    , "海外情報備考"
]

// 検収済以降読み込み制御項目
let readOnlyItemsAfterAccepted = [
    ...readOnlyItemsAfterShipped
    , "入金予定日"

]
// 完了以降読み込み制御項目
let readOnlyItemsAfterClose = [
    ...readOnlyItemsAfterAccepted
    , "入金完了日"
    , "客先注文番号"
]

let readOnlyItemsAfterCancel = [
    ...readOnlyItemsAfterClose
    , "コミッション率"
    , "エンドユーザ"
    , "レート"
    , "数量"
    , "数量単位(日)"
    , "単価"
    , "単価＄"
    , "原価"
    , "原価＄"
    , "原価レート"
    , "客先注文番号"
]

$p.events.on_editor_load_arr.push(function (){
    // 各ステータス制御
    let status = commonGetVal('注文ステータス')

    switch(status) {
        // 先行手配
        case WIKI_STATUS_ORDER_CONTROL.arrangement.value:
            break
        // 納期確認中
        case WIKI_STATUS_ORDER_CONTROL.checkingDelivery.value:
            break
        // 納期再調整
        case WIKI_STATUS_ORDER_CONTROL.adjustment.value:
            readOnlyItemsAfterAdjustment.forEach(v => commonChangeReadOnly(v))
            break
        // 入荷確定
        case WIKI_STATUS_ORDER_CONTROL.confirmedArrival.value:
            readOnlyItemsAfterconfirmedArrival.forEach(v => commonChangeReadOnly(v))
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
            commonRemoveElements(['Process_9'])
            break
        // キャンセル
        case WIKI_STATUS_ORDER_CONTROL.cancel.value:
            readOnlyItemsAfterCancel.forEach(v => commonChangeReadOnly(v))
            commonRemoveElements(['Process_9'])
            break
        default:
            // その他のステータスの場合エラー
            commonSetMessage("不正status", ERROR, true)
            break
    }
})
