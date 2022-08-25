
let changeModelDialogId = "changeModelDialog"
let sn = "split-num"
let bn = "branch-num"
let ms = 'model-select'
let ss = 'supplier-select'
let cm = 'check-message'
let patterns = [
    "patternChangeModel"
    , "patternSplit"
    , "patternChangeSupplier"
]
$p.events.on_editor_load_arr.push(async function () {
    commonRemoveElements([changeModelDialogId])
    let htmlSep = `
    <div id="${changeModelDialogId}" class="dialog" title="型番・仕入先・数量変更">
        <div id="menuTab" style="margin: 10px 55px; padding: 5px;">
            <div>
                <input id="${patterns[0]}" type="radio" name="radio" value="${patterns[0]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[0]}Label" for="${patterns[0]}" class="radio-label">仕入先を変更せず型番を修正する</label>
            </div>
            <div>
                <input id="${patterns[1]}" type="radio" name="radio" value="${patterns[1]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[1]}Label" for="${patterns[1]}" class="radio-label">仕入先を変更せず数量を分割する</label>
            </div>
            <div>
                <input id="${patterns[2]}" type="radio" name="radio" value="${patterns[2]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[2]}Label" for="${patterns[2]}" class="radio-label">仕入先を変更する</label>
            </div>
        </div>

        <div id="${patterns[0]}Area" class="patternArea">
            <div class="field-markdown">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[0] + ms}">型番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[0] + ms}" name="${patterns[0] + ms}" class="control-dropdown">
                                <option value="">&nbsp;</option>
                            </select>
                            <p id="${patterns[0] + ms + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="${patterns[1]}Area" class="patternArea">
            <div class="field-normal both">
                <p class="field-label">
                    <label for="${patterns[1] + sn}">数量</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${patterns[1] + sn}" name="${patterns[1] + sn}" class="control-textbox valid" type="text" value="" placeholder="数量" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                    </div>
                </div>
                <p id="${patterns[1] + sn + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
            </div>

            <div class="field-normal both">
                <p class="field-label">
                    <label for="${patterns[1] + bn}">枝番</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${patterns[1] + bn}" name="${patterns[1] + bn}" class="control-textbox valid" type="text" value="" placeholder="枝番" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                    </div>
                </div>
                <p id="${patterns[1] + bn + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
            </div>
        </div>

        <div id="${patterns[2]}Area" class="patternArea">
            <div class="field-markdown">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[2] + ss}">仕入先</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[2] + ss}" name="${patterns[2] + ss}" class="control-dropdown">
                                <option value="">&nbsp;</option>
                            </select>
                            <p id="${patterns[2] + ss + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="changeModel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
        </div>
    </div>
    `
    $('#Application').append(htmlSep)

    let items = ['ResultId', 'ClassB']
    let supps
    let records = await commonExportAjax(
        TABLE_ID_PRODUCT_INFO
        , items
		, {"ClassH": `["${commonGetVal('仕入先', true)}"]`}
		, false
		, false
    )
    let models = commonConvertCsvTo2D(records.Response.Content)
    models.forEach(v => {
        let elem = document.createElement('option')
        elem.value = v[items.indexOf('ResultId')]
        elem.innerHTML = v[items.indexOf('ClassB')]
        document.getElementById(patterns[0] + ms).appendChild(elem)
    })

    patterns.forEach(v => document.getElementById(v).addEventListener('click', function() {
        Array.from(document.getElementsByClassName('patternArea')).forEach(w => w.hidden = true)
        document.getElementById(v + 'Area').hidden = false
    }))
    document.getElementById(patterns[0]).click()

})

function openChangeModelDialog() {
    $("#" + changeModelDialogId).dialog({
        modal: !0,
        width: "500",
        resizable: !1
    })
}

async function getModel() {
    return commonExportAjax(
        TABLE_ID_PRODUCT_INFO
        , ['ClassA']
    )
}

async function changeModel() {
    let deliverVolume = +$('#' + changeModelNumArea).val()
    if (isNaN(atLoadVolume) || isNaN(deliverVolume) || deliverVolume >= atLoadVolume || deliverVolume < 1) {
        $p.closeDialog($('#' + changeModelDialogId))
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

    $p.closeDialog($('#' + changeModelDialogId))
    let finalAns = window.confirm(deliverVolume + '個分納されました画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}
