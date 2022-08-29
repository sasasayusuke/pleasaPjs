
let pdid = "pattern-dialog-id"
let sn  = "split-num"
let bn  = "branch-num"
let msp = 'model-selected-parent'
let ms  = 'model-select'
let ss  = 'supplier-select'
let cm  = 'check-message'
let patterns = [
    UPDATE_MODEL        = "pattern-UpdateModel"
    , SPLIT_ORDER       = "pattern-SplitOrder"
    , UPDATE_SUPPLIER   = "pattern-UpdateSupplier"
]
$p.events.on_editor_load_arr.push(async function () {
    commonRemoveElements([pdid])
    let html = `
    <div id="${pdid}" class="dialog" title="型番・仕入先・数量変更">
        <div id="menuTab" style="margin: 10px 55px; padding: 5px;">
            <div>
                <input id="${patterns[patterns.indexOf(UPDATE_MODEL)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(UPDATE_MODEL)]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Label" for="${patterns[patterns.indexOf(UPDATE_MODEL)]}" class="radio-label">仕入先を変更せず型番を修正する</label>
            </div>
            <div>
                <input id="${patterns[patterns.indexOf(SPLIT_ORDER)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(SPLIT_ORDER)]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[patterns.indexOf(SPLIT_ORDER)]}Label" for="${patterns[patterns.indexOf(SPLIT_ORDER)]}" class="radio-label">仕入先を変更せず数量を分割する</label>
            </div>
            <div>
                <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" style="position: relative; top: 2px; margin: 8px;">
                <label id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Label" for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" class="radio-label">仕入先を変更する</label>
            </div>
        </div>

        <div id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Area" class="patternArea">
            <div class="field-markdown">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}">型番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}" class="control-dropdown">
                                <option value="">&nbsp;</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="updateModel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>修正</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
            </div>
        </div>

        <div id="${patterns[patterns.indexOf(SPLIT_ORDER)]}Area" class="patternArea">
            <p style="text-align: center;">
                分割する量は1以上の${atLoadVolume}以下の整数を入力してください。<br>
            </p>
            <div class="field-normal both">
                <p class="field-label">
                    <label for="${patterns[patterns.indexOf(SPLIT_ORDER)] + sn}">数量</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${patterns[patterns.indexOf(SPLIT_ORDER)] + sn}" name="${patterns[patterns.indexOf(SPLIT_ORDER)] + sn}" class="control-textbox valid" type="text" value="" placeholder="数量" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                    </div>
                </div>
                <p id="${patterns[patterns.indexOf(SPLIT_ORDER)] + sn + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
            </div>

            <div class="field-normal both">
                <p class="field-label">
                    <label for="${patterns[patterns.indexOf(SPLIT_ORDER)] + bn}">枝番</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${patterns[patterns.indexOf(SPLIT_ORDER)] + bn}" name="${patterns[patterns.indexOf(SPLIT_ORDER)] + bn}" class="control-textbox valid" type="text" value="1" placeholder="枝番" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                    </div>
                </div>
                <p id="${patterns[patterns.indexOf(SPLIT_ORDER)] + bn + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
            </div>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="splitOrder();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>分割</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
            </div>
        </div>

        <div id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Area" class="patternArea">
            <div class="field-markdown">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}">仕入先</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" class="control-dropdown" onchange="changeSuppOption()">
                                <option value="">&nbsp;</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id=${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + msp} class="field-markdown">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms}">型番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms}" class="control-dropdown">
                                <option value="">&nbsp;</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div class="field-normal both">
                    <p class="field-label">
                        <label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bn}">枝番</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bn}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bn}" class="control-textbox valid" type="text" value="" placeholder="枝番" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                        </div>
                    </div>
                    <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bn + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                </div>
            </div>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="updateSupplier();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>変更</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
            </div>
        </div>
    </div>
    `
    $('#Application').append(html)
    await setModelOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(UPDATE_MODEL)] + ms)
    await setSuppOptions(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss)

    patterns.forEach(v => document.getElementById(v).addEventListener('click', function() {
        Array.from(document.getElementsByClassName('patternArea')).forEach(w => w.hidden = true)
        document.getElementById(v + 'Area').hidden = false
    }))
    document.getElementById(patterns[0]).click()
})

function openPatternDialog() {
    $("#" + pdid).dialog({
        modal: !0,
        width: "500",
        resizable: !1
    })
}

async function setModelOptions(supplierId, parentId) {
    commonRemoveElementChilds(parentId)
    let target = document.getElementById(parentId)
    // ID 、型番
    let productItems = ['ResultId', 'ClassB']
    let productRecords = await commonExportAjax(
        TABLE_ID_PRODUCT_INFO
        , productItems
        // 会社名で絞る
		, {"ClassH": `["${supplierId}"]`}
		, false
		, false
    )
    let models = commonConvertCsvTo2D(productRecords.Response.Content)
    let empty = document.createElement('option')
    empty.value = ""
    target.appendChild(empty)

    models.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[productItems.indexOf('ResultId')]
        // 型番をtextに入力
        elem.innerHTML = v[productItems.indexOf('ClassB')]
        target.appendChild(elem)
    })
    target.value = commonGetVal("型番", true)

}

async function setSuppOptions(parentId) {
    commonRemoveElementChilds(parentId)
    let target = document.getElementById(parentId)
    // ID 、会社名
    let companyItems= ['ResultId', 'Title']
    let companyRecords = await commonExportAjax(
        TABLE_ID_COMPANY_INFO
        , companyItems
        // 会社区分で絞る
		, {"ClassJ": `["${WIKI_COMPANY_CLASS.SUPPLIER.index}"]`}
		, false
		, false
    )
    let supps = commonConvertCsvTo2D(companyRecords.Response.Content)
    let empty = document.createElement('option')
    empty.value = ""
    target.appendChild(empty)

    supps.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[companyItems.indexOf('ResultId')]
        // 仕入先名をtextに入力
        elem.innerHTML = v[companyItems.indexOf('Title')]
        target.appendChild(elem)
    })
    target.value = commonGetVal("仕入先", true)
    changeSuppOption()
}

async function changeSuppOption() {
    let suppId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss).value
    // 仕入先に空以外が選択されたとき
    if (suppId > TABLE_ID_COMPANY_INFO) {
        document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + msp).hidden = false
        await setModelOptions(suppId, patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms)
    // 仕入先に空が選択されたとき
    } else {
        document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + msp).hidden = true
    }
}

//パターン１
async function updateModel() {
    let modelId = +document.getElementById(patterns[patterns.indexOf(UPDATE_MODEL)] + ms).value
    // 型番に空が選択されたとき
    if (modelId < TABLE_ID_PRODUCT_INFO) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`型番を選択してください。`, WARNING)
        return
    }

    // 型番を更新
    await commonUpdateAjax(
        $p.id()
        , {
            "ClassK": modelId
        }
    )
    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm('型番の更新が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}

//パターン２
async function splitOrder() {
    let splitVolume = +$('#' + patterns[patterns.indexOf(SPLIT_ORDER)] + sn).val()
    let branchNo = +$('#' + patterns[patterns.indexOf(SPLIT_ORDER)] + bn).val()
    if (isNaN(atLoadVolume) || isNaN(splitVolume) || splitVolume >= atLoadVolume || splitVolume < 1) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`入力数量が異常です。分割する量は1以上の${atLoadVolume}より少ない整数を入力してください。`, ERROR)
        return false
    }
    if (isNaN(branchNo) || branchNo < 1) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`枝番には1以上の整数を入力してください。`, ERROR)
        return false
    }


    let itemHash = {}

    let supplierOrderBookId = await existBranch(branchNo)
    if (!supplierOrderBookId) {
        return false
    }
    itemHash[$p.getColumnName("数量")] = splitVolume
    itemHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
    let deleteLabels = ["注文管理番号"]

    let resultC = await commonCopyRecordAjax(
        itemHash
        , deleteLabels
        , commonGetVal("注文ステータス", true)
        , `
            ${SERVER_URL}/items/${$p.id()}
            から ${splitVolume} 個の注文が分割作成されました。
        `
    )
    console.log(resultC)
    let resultU = await commonUpdateAjax(
        $p.id()
        , {}
        , {
            [$p.getColumnName("数量")]: atLoadVolume - splitVolume
        }
        , {}
        , {}
        , {}
        , commonGetVal("注文ステータス", true)
        , `
            ${SERVER_URL}/items/${resultC.Id}
            へ ${splitVolume} 個の注文が分割作成されました。
        `
    )
    console.log(resultU)

    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm(splitVolume + '個の注文の分割が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }

}

//パターン３
async function updateSupplier() {
    let suppId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss).value
    let modelId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms).value
    // 仕入先または型番に空が選択されたとき
    if (suppId < TABLE_ID_COMPANY_INFO || modelId < TABLE_ID_PRODUCT_INFO) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`仕入先と型番を選択してください。`, WARNING)
        return
    }

    let supplierOrderBookId = await existBranch(branchNo)
    if (!supplierOrderBookId) {
        return false
    }


    // 仕入先と型番を更新
    await commonUpdateAjax(
        $p.id()
        , {
            "ClassK": modelId
            , "ClassV": supplierOrderBookId
        }
    )
    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm('仕入先と型番の更新が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}

/**
 * 枝番存在確認
 * @param {Number}      branchNo 枝番
 *
 * @rerurn              ある場合は既存仕入先注文書台帳IDを返却する / ない場合は新規作成仕入先注文書台帳IDを返却する
 *                      エラーの場合はfalse
 */
async function existBranch(branchNo) {

    // 枝番で仕入先注文書検索
    let siNoSplits = commonGetVal("仕入先注文番号").split("-")
    siNoSplits[3] = branchNo
    let newNo = siNoSplits.join('-')

    // ID 、仕入先注文番号、 通貨区分
    let siItems = ['ResultId', 'ClassA', 'ClassC']
    let siRecords = await commonExportAjax(
        TABLE_ID_SUPPLIER_ORDER_BOOK
        , siItems
        , {}
        , false
        , false
    )
    // 同枝番存在確認
    siRecords = commonConvertCsvTo2D(siRecords.Response.Content)
    siRecords = siRecords.filter(v => v[siItems.indexOf('ClassA')] == newNo)

    let siId = 0
    // 枝番を新規作成
    if (siRecords.length == 0) {
        let createData = {
            "DateA": formatYYYYMMDD(new Date()),
            //"NumA": totalJpy,                          //07.合計金額
            //"NumB": totalUsd,                          //07.合計金額＄
            "NumC": branchNo,                            //07.枝番
            "ClassB": commonGetVal("仕入先", true),     //07.仕入先会社名
            "ClassC": commonGetVal("通貨区分", true),    //07.通貨区分
            "ClassD": commonGetVal("仕入先", true),     //07.仕入先会社名ID
            //"ClassE": suppDesiredDelivery,             //07.希望納期（ASAP,日付）
            //"ClassF": suppDeliveryClass,               //07.納入区分
            "ClassG": commonGetVal("MiS番号", true),     //07.MiS番号
            //"DateB": suppDeliveryDate,                 //07.納入日付
            //"DescriptionA": suppDestination,           //07.納品先
        }

        try {
            let retCreateParentRecord = await createParentRecord(TABLE_ID_SUPPLIER_ORDER_BOOK, createData)
            siId = retCreateParentRecord.Id
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:数量分割エラー１", ERROR, true)
            return false
        }

        try {
            await commonUpdateAjax(
                siId
                , {'ClassA': newNo}
            )
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:数量分割エラー２", ERROR, true)
            return false
        }

    // 枝番が存在するので紐づける
    } else if (siRecords.length == 1) {
        if (siRecords[0][siItems.indexOf('ClassC')] != commonGetVal("通貨区分")) {
            commonSetMessage("通貨区分が異なるため。異常終了しました。", ERROR, true, true, siRecords)
            return false
        }

        siId = siRecords[0][siItems.indexOf('ResultId')]
    // 異常レコード
    } else {
        commonSetMessage("仕入先注文番号が同番が存在するため。異常終了しました。", ERROR, true, true, siRecords)
        return false
    }
    return siId
}