
let pdid    = "pattern-dialog-id"
let sa      = "split-area"
let sn      = "split-num"
let sujp    = "split-unit-jpy-parent"
let suup    = "split-unit-usd-parent"
let suj     = "split-unit-jpy"
let suu     = "split-unit-usd"
let surp    = "split-unit-rate-parent"
let sur     = "split-unit-rate"
let msp     = 'model-selected-parent'
let ms      = 'model-select'
let cs      = 'currency-select'
let bs      = "branch-select"
let ss      = 'supplier-select'
let cm      = 'check-message'

let splitIndex = 0
let splitIndexList = []
let splitBranchMaxNo = 0
let supplierBranchMaxNo = 0

let patterns = [
    UPDATE_MODEL        = "pattern-UpdateModel"
    , UPDATE_SUPPLIER   = "pattern-UpdateSupplier"
    , SPLIT_UNIT        = "pattern-SplitUnit"
    //, SPLIT_COST        = "pattern-SplitCost"
]
// SI 通し番号 会社ID 枝番
let siNoSplits = commonGetVal("仕入先注文番号").split("-")

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
                    <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Label" for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" class="radio-label">仕入先を変更する</label>
                </div>
                <div>
                    <input id="${patterns[patterns.indexOf(SPLIT_UNIT)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(SPLIT_UNIT)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(SPLIT_UNIT)]}Label" for="${patterns[patterns.indexOf(SPLIT_UNIT)]}" class="radio-label">仕入先を変更せず数量を分割する</label>
                </div>
            </div>

            <div id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Area" class="patternArea">
                <div class="field-markdown">
                    <div class="field-wide">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}">型番</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + ms}" class="control-dropdown">
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

            <div id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Area" class="patternArea">
                <div class="field-markdown">
                    <div class="field-wide">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}">仕入先</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" class="control-dropdown" onchange="changeSuppOption()">
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
                                </select>
                                <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                            </div>
                        </div>
                    </div>

                    <div class="field-normal">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs}">枝番</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs}" class="control-dropdown">
                                </select>
                                <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="command-center">
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="updateSupplier();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>変更</button>
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>

            <div id="${patterns[patterns.indexOf(SPLIT_UNIT)]}Area" class="patternArea">
                <p style="text-align: center;">
                    分割する合計量が1以上の${atLoadVolume}以下になるように入力してください。<br>
                </p>

                <div class="field-normal both">
                    <p class="field-label">
                        <button id="plusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="addSplitNum();">
                            <span class="ui-button-icon ui-icon ui-icon-circle-plus"></span>
                        </button>
                        <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + cs}">通貨区分</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_UNIT)] + cs}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + cs}" class="control-dropdown" onchange="displayControlCurrency()">
                                <option value="${WIKI_CURRENCY_CLASS.JPY.name}">${WIKI_CURRENCY_CLASS.JPY.name}</option>
                                <option value="${WIKI_CURRENCY_CLASS.USD.name}">${WIKI_CURRENCY_CLASS.USD.name}</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + cs + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id="${patterns[patterns.indexOf(SPLIT_UNIT)] + surp}" class="field-normal">
                    <p class="field-label">
                        <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + sur}">レート</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sur}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + sur}" class="control-textbox valid" type="text" value="${commonGetVal("レート")}" placeholder="レート" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                        </div>
                    </div>
                    <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sur + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                </div>

                <div id="${sa}"></div>

                <div class="field-normal both">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + bs}">枝番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_UNIT)] + bs}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + bs}" class="control-dropdown">
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + bs + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div class="command-center">
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="splitOrder();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>分割</button>
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>

        </div>
    `

    $('#Application').append(html)
    await setModelOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(UPDATE_MODEL)] + ms, "(新規作成)")
    await setBranchOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(SPLIT_UNIT)] + bs, "(新規作成)")
    await setSuppOptions(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss)

    patterns.forEach(v => document.getElementById(v).addEventListener('click', function() {
        Array.from(document.getElementsByClassName('patternArea')).forEach(w => w.hidden = true)
        document.getElementById(v + 'Area').hidden = false
    }))
    document.getElementById(patterns[0]).click()
    addSplitNum()
    displayControlCurrency(commonGetVal('通貨区分'))
})

function openPatternDialog() {
    $("#" + pdid).dialog({
        modal: !0,
        width: "800",
        resizable: !1
    })
}

function addSplitNum() {
    let div = document.createElement("div")
    splitIndex++
    splitIndexList.push(splitIndex)
    div.id = sa + splitIndex
    div.innerHTML =
    `
        <div class="field-normal both" >
            <p class="field-label">
                <button id="minusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="deleteSplit('${splitIndex}')">
                    <span class="ui-button-icon ui-icon ui-icon-circle-minus"></span>
                </button>
                <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + sn + splitIndex}">数量</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sn + splitIndex}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + sn + splitIndex}" class="control-textbox valid" type="text" value="" placeholder="数量" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sn + splitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${patterns[patterns.indexOf(SPLIT_UNIT)] + sujp}">
            <p class="field-label">
                <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + suj + splitIndex}">単価</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${patterns[patterns.indexOf(SPLIT_UNIT)] + suj + splitIndex}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + suj + splitIndex}" class="control-textbox valid" type="text" value="${commonGetVal("単価")}" placeholder="単価" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + suj + splitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${patterns[patterns.indexOf(SPLIT_UNIT)] + suup}">
            <p class="field-label">
                <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + suu + splitIndex}">単価＄</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${patterns[patterns.indexOf(SPLIT_UNIT)] + suu + splitIndex}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + suu + splitIndex}" class="control-textbox valid" type="text" value="${commonGetVal("単価＄")}" placeholder="単価＄" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + suu + splitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>
    `

    document.getElementById(sa).appendChild(div)
    displayControlCurrency()
}

function deleteSplit(i) {
    splitIndexList = splitIndexList.filter(v => v != i)
    document.getElementById(sa + i).remove()
}

function displayControlCurrency(currency = $('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + cs).val()) {
    document.getElementById(patterns[patterns.indexOf(SPLIT_UNIT)] + cs).value = currency
    if (currency == WIKI_CURRENCY_CLASS.JPY.name) {
        document.getElementById(patterns[patterns.indexOf(SPLIT_UNIT)] + surp).hidden = true
        Array.from(document.getElementsByClassName(patterns[patterns.indexOf(SPLIT_UNIT)] + sujp)).map(v => v.hidden = false)
        Array.from(document.getElementsByClassName(patterns[patterns.indexOf(SPLIT_UNIT)] + suup)).map(v => v.hidden = true)
    } else if (currency == WIKI_CURRENCY_CLASS.USD.name) {
        document.getElementById(patterns[patterns.indexOf(SPLIT_UNIT)] + surp).hidden = false
        Array.from(document.getElementsByClassName(patterns[patterns.indexOf(SPLIT_UNIT)] + sujp)).map(v => v.hidden = true)
        Array.from(document.getElementsByClassName(patterns[patterns.indexOf(SPLIT_UNIT)] + suup)).map(v => v.hidden = false)
    } else {
        commonSetMessage(`通貨区分を選択されていません。`, WARNING)
        return false
    }

}

async function setModelOptions(supplierId, parentId, topLabel = "") {
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
    empty.value = NEW
    empty.innerHTML = topLabel
    target.appendChild(empty)

    models.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[productItems.indexOf('ResultId')]
        // 型番をtextに入力
        elem.innerHTML = v[productItems.indexOf('ClassB')]
        target.appendChild(elem)
    })

    // 初期選択
    target.value = commonGetVal("型番", true)

}

async function setSuppOptions(parentId, topLabel = "") {
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
    empty.value = NEW
    empty.innerHTML = topLabel
    target.appendChild(empty)

    supps.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[companyItems.indexOf('ResultId')]
        // 仕入先名をtextに入力
        elem.innerHTML = v[companyItems.indexOf('Title')]
        target.appendChild(elem)
    })
    // 初期選択
    target.value = commonGetVal('仕入先', true)
    changeSuppOption()
}

async function setBranchOptions(supplierId, parentId, topLabel = '') {
    commonRemoveElementChilds(parentId)
    let target = document.getElementById(parentId)
    // ID 、仕入先注文番号、 通貨区分、 MiS番号
    let bookItems = ['ResultId', 'ClassA', 'ClassC', 'ClassG']
    let bookRecords = await commonExportAjax(
        TABLE_ID_SUPPLIER_ORDER_BOOK
        , bookItems
        , {}
		, false
		, false
    )
    let books = commonConvertCsvTo2D(bookRecords.Response.Content)

    //
    books = books
        .filter(v => v[bookItems.indexOf('ClassA')].split('-')[2] == supplierId)
        .filter(v => v[bookItems.indexOf('ClassG')] == commonGetVal('MiS番号'))

    let empty = document.createElement('option')
    empty.value = NEW
    empty.innerHTML = topLabel
    target.appendChild(empty)
    if (parentId == patterns[patterns.indexOf(SPLIT_UNIT)] + bs) {
        if (commonIsNull(books)) {
            splitBranchMaxNo = 0
        } else {
            splitBranchMaxNo = Math.max.apply(null ,books.map(v => +v[bookItems.indexOf('ClassA')].split("-")[3]))
        }
    } else if (parentId == patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs) {
        if (commonIsNull(books)) {
            supplierBranchMaxNo = 0
        } else {
            supplierBranchMaxNo = Math.max.apply(null ,books.map(v => +v[bookItems.indexOf('ClassA')].split("-")[3]))
        }
    }
    books.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[bookItems.indexOf('ResultId')]
        // 型番をtextに入力
        elem.innerHTML = v[bookItems.indexOf('ClassA')].split('-')[3]
        target.appendChild(elem)
    })

    // 初期選択
    target.value = commonGetVal('仕入先注文番号', true)

}



async function changeSuppOption() {
    let suppId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss).value
    // 仕入先に空以外が選択されたとき
    if (suppId > TABLE_ID_COMPANY_INFO) {
        document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + msp).hidden = false
        await setModelOptions(suppId, patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms, "(新規作成)")
        await setBranchOptions(suppId, patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs, "(新規作成)")
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
        return false
    }

    // 型番を更新
    await commonUpdateAjax(
        $p.id()
        , {
            [$p.getColumnName("型番")]: modelId
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
    let supplierOrderBookId = +document.getElementById(patterns[patterns.indexOf(SPLIT_UNIT)] + bs).value
    let rate = $('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + sur).val()
    let taxRate = 0

    let currencyId = ""
    let currencyValue = ""
    if (WIKI_CURRENCY_CLASS.JPY.name == $('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + cs).val()) {
        rate = 0
        taxRate = 10
        currencyId = suj
        currencyValue = WIKI_CURRENCY_CLASS.JPY.value
    } else if (WIKI_CURRENCY_CLASS.USD.name == $('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + cs).val()) {
        taxRate = 0
        currencyId = suu
        currencyValue = WIKI_CURRENCY_CLASS.USD.value
        if (isNaN(rate) || rate < 0) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`レートの値が不正です。`, WARNING)
            return false
        }
    } else {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`通貨区分が選択されていません。`, WARNING)
        return false
    }

    // 枝番チェック
    if (isNaN(supplierOrderBookId) || supplierOrderBookId == 0) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`枝番を選択してください。`, WARNING)
        return false
    } else if (supplierOrderBookId == NEW) {
        // 最新の枝番を作成
        supplierOrderBookId = await createBranch(commonGetVal("仕入先", true), splitBranchMaxNo + 1, currencyValue)
        if (!supplierOrderBookId) {
            return false
        }
    }


    //単価、数量チェック
    let sumVol = 0
    for (let index of splitIndexList) {
        let vol = +$('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + sn + index).val()
        let unit = +$('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + currencyId + index).val()
        if (isNaN(atLoadVolume) || isNaN(vol) || vol > atLoadVolume || vol < 1) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`入力数量が異常です。分割する量は1以上の${atLoadVolume}以下の整数を入力してください。`, WARNING)
            return false
        }
        if (isNaN(atLoadVolume) || isNaN(unit) ||unit < 1) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`入力単価が異常です。`, WARNING)
            return false
        }
        sumVol = sumVol + vol
    }
    if (sumVol > atLoadVolume) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`分割する合計量が1以上の${atLoadVolume}以下になるように入力してください。`, WARNING)
        return false
    }

    let sumVolume = 0
    for (let index of splitIndexList) {
        let splitVolume = +$('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + sn + index).val()
        let splitUnitJpy = +$('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + suj + index).val()
        let splitUnitUsd = +$('#' + patterns[patterns.indexOf(SPLIT_UNIT)] + suu + index).val()
        if (currencyId == suj) {
            splitUnitUsd = 0
        } else if (currencyId == suu) {
            splitUnitJpy = splitUnitUsd * rate
        }
        sumVolume = sumVolume + splitVolume
        // 仕入先注文書台帳の更新のみ
        if (sumVolume == atLoadVolume) {
            let classHash = {}
            classHash[$p.getColumnName("通貨区分")] = currencyValue
            classHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
            let numHash = {}
            numHash[$p.getColumnName("税率")] = taxRate
            numHash[$p.getColumnName("単価")] = splitUnitJpy
            numHash[$p.getColumnName("単価＄")] = splitUnitUsd
            numHash[$p.getColumnName("レート")] = rate


            try {
                let resultU = await commonUpdateAjax(
                    $p.id()
                    , classHash
                    , numHash
                    , {}
                    , {}
                    , {}
                    , commonGetVal("注文ステータス", true)
                    , `
                        ${SERVER_URL}/items/${supplierOrderBookId}
                        へ 仕入先注文番号を変更しました。
                    `
                )
                console.log(resultU)
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書台帳:仕入先注文番号全量更新エラー", ERROR, true)
                return false
            }
        } else {
            let itemHash = {}
            itemHash[$p.getColumnName("税率")] = taxRate
            itemHash[$p.getColumnName("単価")] = splitUnitJpy
            itemHash[$p.getColumnName("単価＄")] = splitUnitUsd
            itemHash[$p.getColumnName("レート")] = rate
            itemHash[$p.getColumnName("数量")] = splitVolume
            itemHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
            itemHash[$p.getColumnName("通貨区分")] = currencyValue
            let deleteLabels = ["注文管理番号"]
            let resultC = {}
            let resultU = {}
            try {
                resultC = await commonCopyRecordAjax(
                    itemHash
                    , deleteLabels
                    , commonGetVal("注文ステータス", true)
                    , `
                        ${SERVER_URL}/items/${$p.id()}
                        から ${splitVolume} 個の注文が分割作成されました。
                        ${SERVER_URL}/items/${supplierOrderBookId}
                        へ 仕入先注文番号を変更しました。

                    `
                )
                console.log(resultC)
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書台帳:仕入先注文番号分割複製エラー", ERROR, true)
                return false
            }
            let classHash = {}
            classHash[$p.getColumnName("通貨区分")] = currencyValue
            classHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
            let numHash = {}
            numHash[$p.getColumnName("税率")] = taxRate
            numHash[$p.getColumnName("単価")] = splitUnitJpy
            numHash[$p.getColumnName("単価＄")] = splitUnitUsd
            numHash[$p.getColumnName("レート")] = rate
            numHash[$p.getColumnName("数量")] = atLoadVolume - sumVolume
            try {
                resultU = await commonUpdateAjax(
                    $p.id()
                    , classHash
                    , numHash
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
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書台帳:仕入先注文番号分割更新エラー", ERROR, true)
                return false
            }
        }
    }
    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm('注文の分割が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }

}

//パターン３
async function updateSupplier() {
    let suppId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss).value
    let modelId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ms).value
    let supplierOrderBookId = +document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + bs).value

    // 枝番チェック
    if (isNaN(supplierOrderBookId) || supplierOrderBookId == 0) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`枝番を選択してください。`, WARNING)
        return false
    } else if (supplierOrderBookId == NEW) {
        // 最新の枝番を作成
        supplierOrderBookId = await createBranch(suppId, supplierBranchMaxNo + 1, commonGetVal("通貨区分", true))
        if (!supplierOrderBookId) {
            return false
        }
    }
    // 仕入先または型番に空が選択されたとき
    if (suppId < TABLE_ID_COMPANY_INFO || modelId < TABLE_ID_PRODUCT_INFO) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`仕入先と型番を選択してください。`, WARNING)
        return false
    }

    // 仕入先と型番を更新
    await commonUpdateAjax(
        $p.id()
        , {
            "ClassK": modelId
            , "ClassV": suppId
            , [$p.getColumnName("仕入先注文番号")]: supplierOrderBookId
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
 * @param {Number}      suppId      仕入先ID
 * @param {Number}      branchNo    枝番
 *
 * @rerurn              新規作成した仕入先注文書台帳IDを返却する
 *                      エラーの場合はfalse
 */
async function createBranch(suppId, branchNo, currencyClass) {
    // 枝番で仕入先注文書検索
    if(commonIsNull(suppId)) {
        suppId = commonGetVal("仕入先", true)
    } else {
        siNoSplits[2] = suppId
    }
    siNoSplits[3] = branchNo
    let newNo = siNoSplits.join('-')


    let createData = {
        "DateA": formatYYYYMMDD(new Date()),
        //"NumA": totalJpy,                         //07.合計金額
        //"NumB": totalUsd,                         //07.合計金額＄
        "NumC": branchNo,                           //07.枝番
        "ClassB": suppId,                           //07.仕入先会社名
        "ClassC": currencyClass,                    //07.通貨区分
        "ClassD": suppId,                           //07.仕入先会社名ID
        //"ClassE": suppDesiredDelivery,            //07.希望納期（ASAP,日付）
        //"ClassF": suppDeliveryClass,              //07.納入区分
        "ClassG": commonGetVal("MiS番号", true),    //07.MiS番号
        //"DateB": suppDeliveryDate,                //07.納入日付
        //"DescriptionA": suppDestination,          //07.納品先
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

    return siId
}