
var numArea = "numArea"
var dialogId = "devideDeliveryDialog"
$p.events.on_editor_load_arr.push(function () {
    let html = `
    <div id="${dialogId}" class="dialog" title="納品">
        <p style="text-align: center;">納品する分だけ入力してください。</p>
        <div id="Results_NumField" class="field-normal both">
            <p class="field-label" style="">
                <label for="${numArea}">納品個数</label>
            </p><div class="field-control">
            <div class="container-normal">
                <input id="${numArea}" name="${numArea}" class="control-textbox valid" type="text" value="" placeholder="納品個数" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
            </div>
        </div>
        <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="devideDelivery();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
        </div>
    </div>
    `
    $('#Application').append(html)

})

function openDevideDeliveryDialog() {
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#" + dialogId).dialog({
        modal: !0,
        width: "500",
        height: "180",
        resizable: !1
    })
}

async function devideDelivery() {
    let volume = +commonGetVal("数量")
    let deliverVolume = +$('#' + numArea).val()
    if (isNaN(volume) || isNaN(deliverVolume) || deliverVolume >= volume || deliverVolume < 1) {
        $p.closeDialog($('#' + dialogId))
        commonSetMessage("入力数量が異常です。分納する量は1以上の数量より少ない整数を入力してください。", ERROR)
        return
    }

    // 分割納品
    let createItemList = [
    // 全般タブ
        "注文区分"
        , "営業担当者"
        , "受注年月日"
        , "会社区分"
        , "顧客名（契約先）"
        , "事業所名"
        , "代理店名"
        , "コミッション率"
        , "エンドユーザ"
        , "MiS見積番号"
        , "客先注文番号"
        , "納入仕様書発行"
        , "納入仕様書担当者"
        , "型番"
        , "品名"
        , "通貨区分"
        , "レート"
        , "税率"
        , "数量単位(日)"
        , "単価"
        , "金額"
        , "小計"
        , "税額"
        , "単価＄"
        , "金額＄"
    // 先行依頼書タブ
        , "MiS注番"
        , "MiS営業"
        , "顧客希望納期"
        , "回答納期"
        , "連絡事項"
        , "先行依頼書備考"
    // 仕入先注文タブ
        , "仕入先"
        , "注文日"
        , "仕入先注文番号"
        , "仕入先注文備考"
        , "納入区分"
    // 納品管理タブ
        , "入荷日"
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
        , "請求先会社名"
        , "請求先担当者"
        , "請求先住所"
        , "請求先電話番号"
        , "送り先会社名"
        , "送り先担当者"
        , "送り先住所"
        , "送り先電話番号"
        , "送り元国名"
        , "送り先国名"
        , "宅配業者"
        , "支払条件"
        , "アカウント番号"
        , "海外情報備考"
    // 請求管理タブ
        , "請求書番号"
        , "入金予定日"
        , "請求月日"
    ]
    let classHash = {}
    let numHash = {}
    let dateHash = {}
    let descriptionHash = {}
    let checkHash = {}
    numHash[commonGetId("数量", false)] = deliverVolume

    for (let v of createItemList) {
        key = commonGetId(v, false)
        if (commonIsNull(key)) {
            $p.closeDialog($('#' + dialogId))
            commonSetMessage(v + "という項目が存在しません。スクリプトを確認してください。", ERROR)
        }
        if (key.includes("Class")) {
            classHash[key] = commonGetVal(v, false)
        } else if (key.includes("Num")) {
            numHash[key] = commonGetVal(v)
        } else if (key.includes("Date")) {
            dateHash[key] = commonIsNull(commonGetVal(v)) ? commonGetDateEmpty() : commonGetVal(v)
        } else if (key.includes("Description")) {
            descriptionHash[key] = commonGetVal(v)
        } else if (key.includes("Check")) {
            checkHash[key] = commonGetVal(v)
        }
    }

    let resultC = await commonCreateAjax(
        TABLE_ID_ORDER_CONTROL_BOOK
        , classHash
        , numHash
        , dateHash
        , descriptionHash
        , checkHash
        , commonGetVal("注文ステータス", false)
        , `
            ${SERVER_URL}/items/${$p.id()}
            から ${deliverVolume} 個の分納が作成されました。
        `
    )
    console.log(resultC)
    let resultU = await commonUpdateAjax(
        $p.id()
        , {}
        , {
            [commonGetId("数量", false)]: volume - deliverVolume
        }
        , {}
        , {}
        , {}
        , commonGetVal("注文ステータス", false)
        , `
            ${SERVER_URL}/items/${resultC.Id}
            へ ${deliverVolume} 個の分納を作成しました。
        `
    )
    console.log(resultU)

    $p.closeDialog($('#' + dialogId))
    let finalAns = window.confirm(deliverVolume + '個分納されました画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}
