
let pdid    = "pattern-dialog-id"
let ap      = "area-pattern"
let asu     = "area-split-unit"
let asc     = "area-split-cost"
let anm     = 'area-new-model'
let im      = 'input-model'
let iv      = "input-volume"
let ijp     = "input-jpy-parent"
let iup     = "input-usd-parent"
let irp     = "input-rate-parent"
let icj     = "input-cost-jpy"
let icu     = "input-cost-usd"
let iuj     = "input-unit-jpy"
let iuu     = "input-unit-usd"
let ir      = "input-rate"
let smp     = 'select-model-parent'
let sm      = 'select-model'
let svu     = "select-volume-unit"
let sin     = "select-item-name"
let sc      = 'select-currency'
let sb      = "select-branch"
let ss      = 'select-supplier'
let cm      = 'check-message'

let neccesaryBranchFlag = false

let splitUnitIndex = 0
let splitUnitIndexList = []
let splitUnitBranchMaxNo = 0

let splitCostIndex = 0
let splitCostIndexList = []
let splitCostBranchMaxNo = 0

let supplierBranchMaxNo = 0

let patterns = [
    UPDATE_MODEL        = "pattern-UpdateModel"
    , UPDATE_SUPPLIER   = "pattern-UpdateSupplier"
    , SPLIT_UNIT        = "pattern-SplitUnit"
    , SPLIT_COST        = "pattern-SplitCost"
]
// SI 通し番号 会社ID 枝番
let siNoSplits = commonGetVal("仕入先注文番号").split("-")

$p.events.on_editor_load_arr.push(async function () {
    commonRemoveElements([pdid])
    let html = `
        <div id="${pdid}" class="dialog" title="型番・仕入先・数量変更">
            <div id="menuTab" style="margin: 10px 55px; padding: 5px;">
                <div id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Radio">
                    <input id="${patterns[patterns.indexOf(UPDATE_MODEL)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(UPDATE_MODEL)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Label" for="${patterns[patterns.indexOf(UPDATE_MODEL)]}" class="radio-label">型番を変更する</label>
                </div>
                <div id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Radio">
                    <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Label" for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}" class="radio-label">仕入先を変更する</label>
                </div>
                <div id="${patterns[patterns.indexOf(SPLIT_UNIT)]}Radio">
                    <input id="${patterns[patterns.indexOf(SPLIT_UNIT)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(SPLIT_UNIT)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(SPLIT_UNIT)]}Label" for="${patterns[patterns.indexOf(SPLIT_UNIT)]}" class="radio-label">単価ごとに数量を分割する</label>
                </div>
                <div id="${patterns[patterns.indexOf(SPLIT_COST)]}Radio">
                    <input id="${patterns[patterns.indexOf(SPLIT_COST)]}" type="radio" name="radio" value="${patterns[patterns.indexOf(SPLIT_COST)]}" style="position: relative; top: 2px; margin: 8px;">
                    <label id="${patterns[patterns.indexOf(SPLIT_COST)]}Label" for="${patterns[patterns.indexOf(SPLIT_COST)]}" class="radio-label">原価ごとに数量を分割する</label>
                </div>
            </div>

            <div id="${patterns[patterns.indexOf(UPDATE_MODEL)]}Area" class="${ap}">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + sm}">型番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(UPDATE_MODEL)] + sm}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + sm}" class="control-dropdown" onchange="displayControlNewModel('${patterns[patterns.indexOf(UPDATE_MODEL)]}')">
                            </select>
                            <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + sm + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id=${patterns[patterns.indexOf(UPDATE_MODEL)] + anm}>

                    <div class="field-wide">
                        <p class="field-label">
                            <label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + im}">新規型番</label>
                        </p>
                        <div class="field-control">
                            <div class="container-normal">
                                <input id="${patterns[patterns.indexOf(UPDATE_MODEL)] + im}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + im}" class="control-textbox valid" type="text" value="" placeholder="新規型番">
                            </div>
                        </div>
                        <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + im + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                    </div>

                    <div class="field-normal both">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + sin}">品名</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_MODEL)] + sin}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + sin}" class="control-dropdown">
                                    <option value="">&nbsp;</option>
                                    <option value="${WIKI_ITEM_NAME.socket.name}">${WIKI_ITEM_NAME.socket.name}</option>
                                    <option value="${WIKI_ITEM_NAME.substrate.name}">${WIKI_ITEM_NAME.substrate.name}</option>
                                    <option value="${WIKI_ITEM_NAME.parts.name}">${WIKI_ITEM_NAME.parts.name}</option>
                                    <option value="${WIKI_ITEM_NAME.processed.name}">${WIKI_ITEM_NAME.processed.name}</option>
                                </select>
                                <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + sin + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                            </div>
                        </div>
                    </div>

                    <div class="field-normal both">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + svu}">数量単位</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_MODEL)] + svu}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + svu}" class="control-dropdown">
                                    <option value="">&nbsp;</option>
                                    <option value="${WIKI_VOLUME_UNIT.ko.name}">${WIKI_VOLUME_UNIT.ko.name}</option>
                                    <option value="${WIKI_VOLUME_UNIT.shiki.name}">${WIKI_VOLUME_UNIT.shiki.name}</option>
                                    <option value="${WIKI_VOLUME_UNIT.mai.name}">${WIKI_VOLUME_UNIT.mai.name}</option>
                                    <option value="${WIKI_VOLUME_UNIT.hon.name}">${WIKI_VOLUME_UNIT.hon.name}</option>
                                </select>
                                <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + svu + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                            </div>
                        </div>
                    </div>

                    <div class="field-normal both">
                        <p class="field-label">
                            <label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + icj}">原価</label>
                        </p>
                        <div class="field-control">
                            <div class="container-normal">
                                <input id="${patterns[patterns.indexOf(UPDATE_MODEL)] + icj}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + icj}" class="control-textbox valid" type="text" value="${commonGetVal("原価")}" placeholder="原価" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                            </div>
                        </div>
                        <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + icj + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                    </div>

                    <div class="field-normal">
                        <p class="field-label">
                            <label for="${patterns[patterns.indexOf(UPDATE_MODEL)] + icu}">原価＄</label>
                        </p>
                        <div class="field-control">
                            <div class="container-normal">
                                <input id="${patterns[patterns.indexOf(UPDATE_MODEL)] + icu}" name="${patterns[patterns.indexOf(UPDATE_MODEL)] + icu}" class="control-textbox valid" type="text" value="${commonGetVal("原価＄")}" placeholder="原価＄" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                            </div>
                        </div>
                        <p id="${patterns[patterns.indexOf(UPDATE_MODEL)] + icu + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                    </div>
                </div>

                <div class="command-center">
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="updateModel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>変更</button>
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>

            <div id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}Area" class="${ap}">
                <div class="field-wide">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}">仕入先</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss}" class="control-dropdown" onchange="displayControlSupplier('${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}')">
                            </select>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + ss + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id=${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + smp}>
                    <div class="field-wide">
                        <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sm}">型番</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sm}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sm}" class="control-dropdown" onchange="displayControlNewModel('${patterns[patterns.indexOf(UPDATE_SUPPLIER)]}')">
                                </select>
                                <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sm + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                            </div>
                        </div>
                    </div>

                    <div id=${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + anm}>
                        <div class="field-wide">
                            <p class="field-label">
                                <label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + im}">新規型番</label>
                            </p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + im}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + im}" class="control-textbox valid" type="text" value="" placeholder="新規型番">
                                </div>
                            </div>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + im + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>

                        <div class="field-normal both">
                            <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sin}">品名</label></p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sin}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sin}" class="control-dropdown">
                                        <option value="">&nbsp;</option>
                                        <option value="${WIKI_ITEM_NAME.socket.name}">${WIKI_ITEM_NAME.socket.name}</option>
                                        <option value="${WIKI_ITEM_NAME.substrate.name}">${WIKI_ITEM_NAME.substrate.name}</option>
                                        <option value="${WIKI_ITEM_NAME.parts.name}">${WIKI_ITEM_NAME.parts.name}</option>
                                        <option value="${WIKI_ITEM_NAME.processed.name}">${WIKI_ITEM_NAME.processed.name}</option>
                                    </select>
                                    <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sin + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                                </div>
                            </div>
                        </div>

                        <div class="field-normal both">
                            <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + svu}">数量単位</label></p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + svu}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + svu}" class="control-dropdown">
                                        <option value="">&nbsp;</option>
                                        <option value="${WIKI_VOLUME_UNIT.ko.name}">${WIKI_VOLUME_UNIT.ko.name}</option>
                                        <option value="${WIKI_VOLUME_UNIT.shiki.name}">${WIKI_VOLUME_UNIT.shiki.name}</option>
                                        <option value="${WIKI_VOLUME_UNIT.mai.name}">${WIKI_VOLUME_UNIT.mai.name}</option>
                                        <option value="${WIKI_VOLUME_UNIT.hon.name}">${WIKI_VOLUME_UNIT.hon.name}</option>
                                    </select>
                                    <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + svu + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                                </div>
                            </div>
                        </div>

                        <div class="field-normal both">
                            <p class="field-label">
                                <label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icj}">原価</label>
                            </p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icj}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icj}" class="control-textbox valid" type="text" value="${commonGetVal("原価")}" placeholder="原価" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                                </div>
                            </div>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icj + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>

                        <div class="field-normal">
                            <p class="field-label">
                                <label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icu}">原価＄</label>
                            </p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <input id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icu}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icu}" class="control-textbox valid" type="text" value="${commonGetVal("原価＄")}" placeholder="原価＄" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                                </div>
                            </div>
                            <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + icu + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>

                        <div class="field-normal ${sb}">
                            <p class="field-label"><label for="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sb}">枝番</label></p>
                            <div class="field-control">
                                <div class="container-normal">
                                    <select id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sb}" name="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sb}" class="control-dropdown">
                                    </select>
                                    <p id="${patterns[patterns.indexOf(UPDATE_SUPPLIER)] + sb + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="updateSupplier();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>変更</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>

            <div id="${patterns[patterns.indexOf(SPLIT_UNIT)]}Area" class="${ap}">
                <p style="text-align: center;">
                    分割する合計量が1以上の${atLoadVolume}以下になるように入力してください。<br>
                </p>

                <div class="field-normal both">
                    <p class="field-label">
                        <button id="plusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="addSplitUnit();">
                            <span class="ui-button-icon ui-icon ui-icon-circle-plus"></span>
                        </button>
                        <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + sc}">通貨区分</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sc}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + sc}" class="control-dropdown" onchange="displayControlCurrency('${patterns[patterns.indexOf(SPLIT_UNIT)]}')">
                                <option value="${WIKI_CURRENCY_CLASS.JPY.name}">${WIKI_CURRENCY_CLASS.JPY.name}</option>
                                <option value="${WIKI_CURRENCY_CLASS.USD.name}">${WIKI_CURRENCY_CLASS.USD.name}</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sc + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id="${patterns[patterns.indexOf(SPLIT_UNIT)] + irp}" class="field-normal">
                    <p class="field-label">
                        <label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + ir}">レート</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${patterns[patterns.indexOf(SPLIT_UNIT)] + ir}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + ir}" class="control-textbox valid" type="text" value="${commonGetVal("レート")}" placeholder="レート" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                        </div>
                    </div>
                    <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + ir + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                </div>

                <div id="${asu}"></div>

                <div class="field-normal ${sb}">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(SPLIT_UNIT)] + sb}">枝番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sb}" name="${patterns[patterns.indexOf(SPLIT_UNIT)] + sb}" class="control-dropdown">
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_UNIT)] + sb + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div class="command-center">
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="createSplit('${SPLIT_UNIT}');" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>分割</button>
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>
            <div id="${patterns[patterns.indexOf(SPLIT_COST)]}Area" class="${ap}">
                <p style="text-align: center;">
                    分割する合計量が1以上の${atLoadVolume}以下になるように入力してください。<br>
                </p>

                <div class="field-normal both">
                    <p class="field-label">
                        <button id="plusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="addSplitCost();">
                            <span class="ui-button-icon ui-icon ui-icon-circle-plus"></span>
                        </button>
                        <label for="${patterns[patterns.indexOf(SPLIT_COST)] + sc}">仕入先通貨区分</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_COST)] + sc}" name="${patterns[patterns.indexOf(SPLIT_COST)] + sc}" class="control-dropdown" onchange="displayControlCurrency('${patterns[patterns.indexOf(SPLIT_COST)]}')">
                                <option value="${WIKI_CURRENCY_CLASS.JPY.name}">${WIKI_CURRENCY_CLASS.JPY.name}</option>
                                <option value="${WIKI_CURRENCY_CLASS.USD.name}">${WIKI_CURRENCY_CLASS.USD.name}</option>
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_COST)] + sc + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id="${patterns[patterns.indexOf(SPLIT_COST)] + irp}" class="field-normal">
                    <p class="field-label">
                        <label for="${patterns[patterns.indexOf(SPLIT_COST)] + ir}">原価レート</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${patterns[patterns.indexOf(SPLIT_COST)] + ir}" name="${patterns[patterns.indexOf(SPLIT_COST)] + ir}" class="control-textbox valid" type="text" value="${commonGetVal("原価レート")}" placeholder="原価レート" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                        </div>
                    </div>
                    <p id="${patterns[patterns.indexOf(SPLIT_COST)] + ir + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                </div>

                <div id="${asc}"></div>

                <div class="field-normal ${sb}">
                    <p class="field-label"><label for="${patterns[patterns.indexOf(SPLIT_COST)] + sb}">枝番</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${patterns[patterns.indexOf(SPLIT_COST)] + sb}" name="${patterns[patterns.indexOf(SPLIT_COST)] + sb}" class="control-dropdown">
                            </select>
                            <p id="${patterns[patterns.indexOf(SPLIT_COST)] + sb + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div class="command-center">
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="createSplit('${SPLIT_COST}');" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>分割</button>
                    <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
                </div>
            </div>

        </div>
    `

    $('#Application').append(html)

    patterns.forEach(v => document.getElementById(v).addEventListener('click', function() {
        Array.from(document.getElementsByClassName(ap)).forEach(w => w.hidden = true)
        document.getElementById(v + 'Area').hidden = false
    }))
    document.getElementById(patterns[patterns.indexOf(UPDATE_MODEL)]).click()

    displayControlNewModel(patterns[patterns.indexOf(UPDATE_MODEL)])
    displayControlNewModel(patterns[patterns.indexOf(UPDATE_SUPPLIER)])

    displayControlCurrency(patterns[patterns.indexOf(SPLIT_UNIT)], commonGetVal('通貨区分'))
    displayControlCurrency(patterns[patterns.indexOf(SPLIT_COST)], commonGetVal('通貨区分'))

    addSplitUnit()
    addSplitCost()

    let orderClass = commonGetVal('注文区分')
    let orderStatus = commonGetVal('注文ステータス', true)
    // 注文区分：他社製品
    if (orderClass == WIKI_ORDER_CLASS.other_company_product.name) {
        await setSuppOptions(patterns[patterns.indexOf(UPDATE_SUPPLIER)])
        if (orderStatus >= WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index) {
            // 仕入先注文書発行後（他社製品かつ納期確認中以降）のときは枝番を有効にする
            neccesaryBranchFlag = true
            await setBranchOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(SPLIT_UNIT)], "(新規作成)")
            await setBranchOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(SPLIT_COST)], "(新規作成)")
        }
    // 注文区分：自社製品
    } else {
        document.getElementById(patterns[patterns.indexOf(UPDATE_SUPPLIER)] + "Radio").hidden = true
        document.getElementById(patterns[patterns.indexOf(SPLIT_COST)] + "Radio").hidden = true
    }
    Array.from(document.getElementsByClassName(sb)).map(v => v.hidden = !neccesaryBranchFlag)

    await setModelOptions(commonGetVal('仕入先', true), patterns[patterns.indexOf(UPDATE_MODEL)], "(新規作成)")
})

function openPatternDialog() {
    $("#" + pdid).dialog({
        modal: !0,
        width: "800",
        resizable: !1
    })
}

function addSplitUnit() {
    let div = document.createElement("div")
    splitUnitIndex++
    splitUnitIndexList.push(splitUnitIndex)
    div.id = asu + splitUnitIndex
    let pattern = patterns[patterns.indexOf(SPLIT_UNIT)]
    div.innerHTML =
    `
        <div class="field-normal both" >
            <p class="field-label">
                <button id="minusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="deleteSplitUnit('${splitUnitIndex}')">
                    <span class="ui-button-icon ui-icon ui-icon-circle-minus"></span>
                </button>
                <label for="${pattern + iv + splitUnitIndex}">数量</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + iv + splitUnitIndex}" name="${pattern + iv + splitUnitIndex}" class="control-textbox valid" type="text" value="" placeholder="数量" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + iv + splitUnitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${pattern + ijp}">
            <p class="field-label">
                <label for="${pattern + iuj + splitUnitIndex}">単価</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + iuj + splitUnitIndex}" name="${pattern + iuj + splitUnitIndex}" class="control-textbox valid" type="text" value="${commonGetVal("単価")}" placeholder="単価" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + iuj + splitUnitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${pattern + iup}">
            <p class="field-label">
                <label for="${pattern + iuu + splitUnitIndex}">単価＄</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + iuu + splitUnitIndex}" name="${pattern + iuu + splitUnitIndex}" class="control-textbox valid" type="text" value="${commonGetVal("単価＄")}" placeholder="単価＄" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + iuu + splitUnitIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>
    `

    document.getElementById(asu).appendChild(div)
    displayControlCurrency(pattern)
}

function deleteSplitUnit(i) {
    splitUnitIndexList = splitUnitIndexList.filter(v => v != i)
    document.getElementById(asu + i).remove()
}


function addSplitCost() {
    let div = document.createElement("div")
    splitCostIndex++
    splitCostIndexList.push(splitCostIndex)
    div.id = asc + splitCostIndex
    let pattern = patterns[patterns.indexOf(SPLIT_COST)]
    div.innerHTML =
    `
        <div class="field-normal both" >
            <p class="field-label">
                <button id="minusIcon" class="button button-icon ui-button ui-corner-all ui-widget" onClick="deleteSplitCost('${splitCostIndex}')">
                    <span class="ui-button-icon ui-icon ui-icon-circle-minus"></span>
                </button>
                <label for="${pattern + iv + splitCostIndex}">数量</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + iv + splitCostIndex}" name="${pattern + iv + splitCostIndex}" class="control-textbox valid" type="text" value="" placeholder="数量" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + iv + splitCostIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${pattern + ijp}">
            <p class="field-label">
                <label for="${pattern + icj + splitCostIndex}">原価</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + icj + splitCostIndex}" name="${pattern + icj + splitCostIndex}" class="control-textbox valid" type="text" value="${commonGetVal("原価")}" placeholder="原価" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + icj + splitCostIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>

        <div class="field-normal ${pattern + iup}">
            <p class="field-label">
                <label for="${pattern + icu + splitCostIndex}">原価＄</label>
            </p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="${pattern + icu + splitCostIndex}" name="${pattern + icu + splitCostIndex}" class="control-textbox valid" type="text" value="${commonGetVal("原価＄")}" placeholder="原価＄" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p id="${pattern + icu + splitCostIndex + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
        </div>
    `

    document.getElementById(asc).appendChild(div)
    displayControlCurrency(pattern)
}

function deleteSplitCost(i) {
    splitCostIndexList = splitCostIndexList.filter(v => v != i)
    document.getElementById(asc + i).remove()
}

function displayControlNewModel(pattern) {
    let newFlg = document.getElementById(pattern + sm).value < 0
    document.getElementById(pattern + anm).hidden = !newFlg
}

function displayControlCurrency(pattern, currency) {
    currency = commonIsNull(currency) ? $('#' + pattern + sc).val() : currency
    if (neccesaryBranchFlag) {
        unsetBranchOptions(pattern, currency)
    }
    document.getElementById(pattern + sc).value = currency
    if (currency == WIKI_CURRENCY_CLASS.JPY.name) {
        document.getElementById(pattern + irp).hidden = true
        Array.from(document.getElementsByClassName(pattern + ijp)).map(v => v.hidden = false)
        Array.from(document.getElementsByClassName(pattern + iup)).map(v => v.hidden = true)
    } else if (currency == WIKI_CURRENCY_CLASS.USD.name) {
        document.getElementById(pattern + irp).hidden = false
        Array.from(document.getElementsByClassName(pattern + ijp)).map(v => v.hidden = true)
        Array.from(document.getElementsByClassName(pattern + iup)).map(v => v.hidden = false)
    } else {
        commonSetMessage(`通貨区分を選択されていません。`, WARNING)
        return false
    }
}

function unsetBranchOptions(pattern, currency) {
    Array.from(document.querySelectorAll(`#${pattern + sb} option`)).forEach(v => {
        if (v.className == currency || commonIsNull(v.className)) {
            v.hidden = false
        } else {
            v.hidden = true
        }
    })
}

async function displayControlSupplier(pattern) {
    let suppId = +document.getElementById(pattern + ss).value
    // 仕入先に空以外が選択されたとき
    if (suppId > TABLE_ID_COMPANY_INFO) {
        document.getElementById(pattern + smp).hidden = false
        await setModelOptions(suppId, pattern, "(新規作成)")
        if (neccesaryBranchFlag) {
            await setBranchOptions(suppId, pattern, "(新規作成)")
        }
    // 仕入先に空が選択されたとき
    } else {
        document.getElementById(pattern + smp).hidden = true
    }
    displayControlNewModel(pattern)
}

async function setModelOptions(supplierId, pattern, topLabel = "") {
    commonRemoveElementChilds(pattern + sm)
    let target = document.getElementById(pattern + sm)
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

async function setSuppOptions(pattern, topLabel = "") {
    commonRemoveElementChilds(pattern + ss)
    let target = document.getElementById(pattern + ss)
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
    displayControlSupplier(pattern)
}

async function setBranchOptions(supplierId, pattern, topLabel = '') {
    commonRemoveElementChilds(pattern + sb)
    let target = document.getElementById(pattern + sb)
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

    books = books
        .filter(v => v[bookItems.indexOf('ClassA')].split('-')[2] == supplierId)
        .filter(v => v[bookItems.indexOf('ClassG')] == commonGetVal('MiS番号'))

    let curr = ""
    if (pattern == patterns[patterns.indexOf(SPLIT_UNIT)]) {
        curr = $('#' + pattern + sc).val()
        if (commonIsNull(books)) {
            splitUnitBranchMaxNo = 0
        } else {
            splitUnitBranchMaxNo = Math.max.apply(null ,books.map(v => +v[bookItems.indexOf('ClassA')].split("-")[3]))
        }
    } else if (pattern == patterns[patterns.indexOf(UPDATE_SUPPLIER)]) {
        curr = commonGetVal("通貨区分")
        if (commonIsNull(books)) {
            supplierBranchMaxNo = 0
        } else {
            supplierBranchMaxNo = Math.max.apply(null ,books.map(v => +v[bookItems.indexOf('ClassA')].split("-")[3]))
        }
    }
    let empty = document.createElement('option')
    empty.value = NEW
    empty.innerHTML = topLabel
    target.appendChild(empty)

    books.forEach(v => {
        let elem = document.createElement('option')
        // IDをvalueに入力
        elem.value = v[bookItems.indexOf('ResultId')]
        // 通貨区分をclassに入力
        elem.className = v[bookItems.indexOf('ClassC')]
        // 型番をtextに入力
        elem.innerHTML = v[bookItems.indexOf('ClassA')].split('-')[3]
        target.appendChild(elem)
    })

    unsetBranchOptions(pattern, curr)
    // 初期選択
    target.value = ""
}

//パターン１
async function updateModel() {
    let pattern = patterns[patterns.indexOf(UPDATE_MODEL)]
    let modelId = +document.getElementById(pattern + sm).value
    // 型番に空が選択されたとき
    if (isNaN(modelId) || modelId == 0) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`型番を選択してください。`, WARNING)
        return false
    }

    let classHash = {}
    let numHash = {}
    if (modelId == NEW) {
        // 型番を作成
        modelId = await createModel("", pattern)
        if (!modelId) {
            return false
        }
        classHash[$p.getColumnName("数量単位(日)")] = $('#' + pattern + svu).val()
        numHash[$p.getColumnName("原価")] = +$('#' + pattern + icj).val()
        numHash[$p.getColumnName("原価＄")] = +$('#' + pattern + icu).val()
    }
    classHash[$p.getColumnName("型番")] = modelId

    // 型番を更新
    await commonUpdateAjax(
        $p.id()
        , classHash
        , numHash
    )
    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm('型番の更新が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}

//パターン２
async function updateSupplier() {
    let pattern = patterns[patterns.indexOf(UPDATE_SUPPLIER)]
    let suppId = +document.getElementById(pattern + ss).value
    let modelId = +document.getElementById(pattern + sm).value
    let supplierOrderBookId = +document.getElementById(pattern + sb).value

    // 仕入先に空が選択されたとき
    if (isNaN(suppId) || suppId == 0) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`仕入先を選択してください。`, WARNING)
        return false
    }

    // 型番に空が選択されたとき
    if (isNaN(modelId) || modelId == 0) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`型番を選択してください。`, WARNING)
        return false
    }

    let classHash = {}
    let numHash = {}
    // 枝番チェック
    if (neccesaryBranchFlag) {
        if (isNaN(supplierOrderBookId) || supplierOrderBookId == 0) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`枝番を選択してください。`, WARNING)
            return false
        }
    }

    if (modelId == NEW) {
        // 型番を作成
        modelId = await createModel(suppId, pattern)
        if (!modelId) {
            return false
        }
        classHash[$p.getColumnName("数量単位(日)")] = $('#' + pattern + svu).val()
        numHash[$p.getColumnName("原価")] = +$('#' + pattern + icj).val()
        numHash[$p.getColumnName("原価＄")] = +$('#' + pattern + icu).val()
    }
    if (neccesaryBranchFlag) {
        if (supplierOrderBookId == NEW) {
            // 最新の枝番を作成
            supplierOrderBookId = await createBranch(suppId, supplierBranchMaxNo + 1, commonGetVal("通貨区分", true))
            if (!supplierOrderBookId) {
                return false
            }
            classHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
        }
    }
    classHash[$p.getColumnName("型番")] = modelId
    classHash[$p.getColumnName("仕入先")] = suppId

    // 仕入先と型番を更新
    await commonUpdateAjax(
        $p.id()
        , classHash
        , numHash
    )
    $p.closeDialog($('#' + pdid))
    let finalAns = window.confirm('仕入先と型番の更新が完了しました。画面をリロードしますがよろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    }
}

//パターン３
async function createSplit(pattern) {
    let supplierOrderBookId = +document.getElementById(pattern + sb).value
    let rate = $('#' + pattern + ir).val()
    let taxRate = 0

    let currencyId = ""
    let currencyValue = ""
    let list = []
    // 通貨チェック
    if (pattern == SPLIT_UNIT) {
        list = splitUnitIndexList
        if (WIKI_CURRENCY_CLASS.JPY.name == $('#' + pattern + sc).val()) {
            rate = 0
            taxRate = 10
            currencyId = iuj
            currencyValue = WIKI_CURRENCY_CLASS.JPY.value
        } else if (WIKI_CURRENCY_CLASS.USD.name == $('#' + pattern + sc).val()) {
            taxRate = 0
            currencyId = iuu
            currencyValue = WIKI_CURRENCY_CLASS.USD.value
            if (isNaN(rate) || rate < 0) {
                $p.closeDialog($('#' + pdid))
                commonSetMessage(`レートの値が不正です。`, WARNING)
                return false
            }
        } else {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`通貨区分が選択されていません。`, ERROR)
            return false
        }
    } else if (pattern == SPLIT_COST) {
        list = splitCostIndexList
        if (WIKI_CURRENCY_CLASS.JPY.name == $('#' + pattern + sc).val()) {
            currencyId = icj
            currencyValue = WIKI_CURRENCY_CLASS.JPY.value
        } else if (WIKI_CURRENCY_CLASS.USD.name == $('#' + pattern + sc).val()) {
            currencyId = icu
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
    } else {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`不正パターン`, ERROR)
        return false
    }

    // 枝番チェック
    if (neccesaryBranchFlag) {
        if (isNaN(supplierOrderBookId) || supplierOrderBookId == 0) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`枝番を選択してください。`, WARNING)
            return false
        } else if (supplierOrderBookId == NEW) {
            // 最新の枝番を作成
            supplierOrderBookId = await createBranch(commonGetVal("仕入先", true), splitUnitBranchMaxNo + 1, currencyValue)
            if (!supplierOrderBookId) {
                return false
            }
        }
    }


    //単価、数量チェック
    let sum = 0
    for (let index of list) {
        let cnt = +$('#' + pattern + iv + index).val()
        let val = +$('#' + pattern + currencyId + index).val()
        if (isNaN(atLoadVolume) || isNaN(cnt) || cnt > atLoadVolume || cnt < 1) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`入力数量が異常です。分割する量は1以上の${atLoadVolume}以下の整数を入力してください。`, WARNING)
            return false
        }
        if (isNaN(atLoadVolume) || isNaN(val) ||val < 1) {
            $p.closeDialog($('#' + pdid))
            commonSetMessage(`入力単価が異常です。`, WARNING)
            return false
        }
        sum = sum + cnt
    }
    if (sum > atLoadVolume) {
        $p.closeDialog($('#' + pdid))
        commonSetMessage(`分割する合計量が1以上の${atLoadVolume}以下になるように入力してください。`, WARNING)
        return false
    }

    let sumVolume = 0
    for (let index of list) {
        let splitVolume = +$('#' + pattern + iv + index).val()
        let splitValue = +$('#' + pattern + currencyId + index).val()

        sumVolume = sumVolume + splitVolume
        // 仕入先注文書台帳の更新のみ
        if (sumVolume == atLoadVolume) {
            let classHash = {}
            let numHash = {}

            if (pattern == SPLIT_UNIT) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    numHash[$p.getColumnName("単価")] = splitValue
                } else {
                    numHash[$p.getColumnName("単価")] = splitValue * rate
                    numHash[$p.getColumnName("単価＄")] = splitValue
                }
                classHash[$p.getColumnName("通貨区分")] = currencyValue
                numHash[$p.getColumnName("税率")] = taxRate
                numHash[$p.getColumnName("レート")] = rate
            } else if (pattern == SPLIT_COST) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    numHash[$p.getColumnName("原価")] = splitValue
                } else {
                    numHash[$p.getColumnName("原価")] = splitValue * rate
                    numHash[$p.getColumnName("原価＄")] = splitValue
                }
                classHash[$p.getColumnName("仕入先通貨区分")] = currencyValue
                numHash[$p.getColumnName("原価レート")] = rate

            }
            classHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId


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

            if (pattern == SPLIT_UNIT) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    itemHash[$p.getColumnName("単価")] = splitValue
                } else {
                    numHash[$p.getColumnName("単価")] = splitValue * rate
                    numHash[$p.getColumnName("単価＄")] = splitValue
                }
                itemHash[$p.getColumnName("通貨区分")] = currencyValue
                itemHash[$p.getColumnName("税率")] = taxRate
                itemHash[$p.getColumnName("レート")] = rate
            } else if (pattern == SPLIT_COST) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    itemHash[$p.getColumnName("原価")] = splitValue
                } else {
                    itemHash[$p.getColumnName("原価")] = splitValue * rate
                    itemHash[$p.getColumnName("原価＄")] = splitValue
                }
                itemHash[$p.getColumnName("仕入先通貨区分")] = currencyValue
                itemHash[$p.getColumnName("原価レート")] = rate

            }
            itemHash[$p.getColumnName("数量")] = splitVolume
            itemHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId

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
            let numHash = {}

            if (pattern == SPLIT_UNIT) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    numHash[$p.getColumnName("単価")] = splitValue
                } else {
                    numHash[$p.getColumnName("単価")] = splitValue * rate
                    numHash[$p.getColumnName("単価＄")] = splitValue
                }
                classHash[$p.getColumnName("通貨区分")] = currencyValue
                numHash[$p.getColumnName("税率")] = taxRate
                numHash[$p.getColumnName("レート")] = rate
            } else if (pattern == SPLIT_COST) {
                if (currencyValue == WIKI_CURRENCY_CLASS.JPY.value) {
                    numHash[$p.getColumnName("原価")] = splitValue
                } else {
                    numHash[$p.getColumnName("原価")] = splitValue * rate
                    numHash[$p.getColumnName("原価＄")] = splitValue
                }
                classHash[$p.getColumnName("仕入先通貨区分")] = currencyValue
                numHash[$p.getColumnName("原価レート")] = rate

            }
            classHash[$p.getColumnName("仕入先注文番号")] = supplierOrderBookId
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

/**
 * 製品登録
 * @param {Number}      suppId      仕入先ID
 * @param {Number}      pattern    パターン
 *
 * @rerurn              新規作成した製品台帳IDを返却する
 *                      エラーの場合はfalse
 */
async function createModel(suppId, pattern) {
    // 枝番で仕入先注文書検索
    if(commonIsNull(suppId)) {
        suppId = commonGetVal("仕入先", true)
    }
    let prodId = ''

    let maker = commonGetVal("注文区分") == WIKI_ORDER_CLASS.other_company_product.name ? '他社' : '自社'
    let createData = {
        "ClassA": maker,                            //15.メーカー
        "ClassB": $('#' + pattern + im).val(),      //15.型番
        "ClassF": $('#' + pattern + sin).val(),     //15.品名
        "ClassH": suppId,                           //15.仕入先
        "ClassJ": $('#' + pattern + svu).val(),     //15.数量単位
        "NumA": +$('#' + pattern + icj).val(),       //15.原価
        "NumC": +$('#' + pattern + icu).val(),       //15.原価＄
    }

    try {
        let retCreateParentRecord = await createParentRecord(TABLE_ID_PRODUCT_INFO, createData)
        prodId = retCreateParentRecord.Id
    } catch (err) {
        console.log(err)
        commonSetMessage("仕入先注文書:数量分割エラー１", ERROR, true)
        return false
    }
    return prodId
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

    let siId = ''
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