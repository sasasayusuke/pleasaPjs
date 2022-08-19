
var numArea = "numArea"
var dialogId = "devideDeliveryDialog"
$p.events.on_editor_load_arr.push(function () {
    let html = `
    <div id="${dialogId}" class="dialog" title="納品">
        <p style="text-align: center;">
            納品する分だけ入力してください。<br>
            分納する量は1以上の${atLoadVolume}より少ない整数を入力してください。<br>
        </p>
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
    $("#" + dialogId).dialog({
        modal: !0,
        width: "500",
        height: "180",
        resizable: !1
    })
}

async function devideDelivery() {
    let deliverVolume = +$('#' + numArea).val()
    if (isNaN(atLoadVolume) || isNaN(deliverVolume) || deliverVolume >= atLoadVolume || deliverVolume < 1) {
        $p.closeDialog($('#' + dialogId))
        commonSetMessage(`入力数量が異常です。分納する量は1以上の${atLoadVolume}より少ない整数を入力してください。`, ERROR)
        return
    }

    let itemHash = {}
    itemHash[$p.getColumnName("数量")] = deliverVolume
    let deleteLabels = ["注文管理番号"]

    let resultC = await commonCopyRecordAjax(
        itemHash
        , deleteLabels
        , commonGetVal("注文ステータス", true)
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
            [$p.getColumnName("数量")]: atLoadVolume - deliverVolume
        }
        , {}
        , {}
        , {}
        , commonGetVal("注文ステータス", true)
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
