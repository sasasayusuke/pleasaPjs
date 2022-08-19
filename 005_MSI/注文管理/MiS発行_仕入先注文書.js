
const srid = "supplierRemarkExcelDownloadDialog"
const srm1 = "supplierRequestMemo1"
const srm2 = "supplierRequestMemo2"

const sid = "supplierExcelDownloadDialog"
const st = "supplierTarget"
const sd = "supplierDate"
const sdc = "supplierDelveryClass"
const sr = "supplierRemarks"
const sp = "supplierPrint"

const mt = "menuTab"
const ma = "menuArea"
const rl = "radioLabel"
const sm = "supplierMenu"
const cm = "checkMessage"

let supplierData = {}
let suppliers = []
let suppDesiredDelivery = ""
let suppDeliveryClass = ""
let suppDeliveryDate = ""
let suppDestination = ""

let x1 = "国内向け円建"
let x2 = "海外向け円建"
let x3 = "海外向けドル建"


$p.events.on_grid_load_arr.push(function () {
    let htmlReq = `
        <div id="${sid}" class="dialog" title="先行依頼書&仕入先注文書出力">
            <div class="section-fields-container" style="width: 95%">
                <div><label class="field-section"><span></span>先行依頼書</label></div>
            </div>
            <div class="field-markdown">
                <p class="field-label"><label for="${srm1}">MEMO1</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="${srm1}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${srm1}'));" style="">
                            <pre><br></pre>
                        </div>
                        <div id="${srm1}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${srm1}'));">
                        </div>
                        <textarea id="${srm1}" name="${srm1}" class="control-markdown applied" placeholder="MEMO1" style="height: 100px; display: none;">
                        </textarea>
                    </div>
                </div>
            </div>

            <div class="field-markdown">
                <p class="field-label"><label for="${srm2}">MEMO2</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="${srm2}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${srm2}'));" style="">
                            <pre><br></pre>
                        </div>
                        <div id="${srm2}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${srm2}'));">
                        </div>
                        <textarea id="${srm2}" name="${srm2}" class="control-markdown applied" placeholder="MEMO2" style="height: 100px; display: none;">
                        </textarea>
                    </div>
                </div>
            </div>
            <div class="section-fields-container" style="width: 95%">
                <div><label class="field-section"><span></span>仕入先注文</label></div>
            </div>
            <div id='${mt}'>
            </div>
            <div id='${ma}'>
            </div>

            <p class="message-dialog"></p>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="downloadSupplierExcel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>

    `
    $('#Application').append(htmlReq)

})

function openSupplierExcelDownloadDialog() {
    suppliers = commonUniqueArray(selectedData.value.map(v => v[SUPPLIER]))
    setSupplierModal()
    displayControlAsap()
    displayControlDirect()
    $("#" + sid).dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

function setSupplierModal() {
    //ラジオ要素取得
	let target = document.getElementById(mt)
    //ラジオ子要素削除
    while(target.lastChild){
        target.removeChild(target.lastChild);
    }
    //モーダル要素取得
	let area = document.getElementById(ma)
    //モーダル子要素削除
    while(area.lastChild){
        area.removeChild(area.lastChild);
    }

	suppliers.forEach(elem => {
		let radioDiv = document.createElement('div')
		let radioInput = document.createElement('input')
        // 仕入先名
        let elemName = selectedData.display.filter(w => w["ID"] == selectedData.value.filter(v => v[SUPPLIER] == elem)[0]["ID"]) [0][SUPPLIER]
        let elemClass = sm + elem
		radioInput.id = elem
		radioInput.type = 'radio'
		radioInput.name = 'radio'
		radioInput.value = elem
		radioInput.addEventListener('click' ,function() {
			Array.from(document.querySelectorAll(`div .${sm}`)).forEach(w => w.hidden = true)
			Array.from(document.querySelectorAll(`div .${elemClass}.${sm}`)).forEach(w => w.hidden = false)
		})
		let radioLabel = document.createElement('label')
		radioLabel.id = rl + elem
		radioLabel.innerHTML = elemName
		radioLabel.htmlFor = elem
		radioLabel.className = 'radio-label'
		radioDiv.appendChild(radioInput)
		radioDiv.appendChild(radioLabel)
		target.appendChild(radioDiv)
        target.style.margin = '10px 55px'
        target.style.padding = '5px'
        radioInput.style.position = 'relative'
        radioInput.style.top = '2px'
        radioInput.style.margin = '8px'

        let htmlSupp = `
            <div id="${elem + srid}" class="${elemClass + " " + sm}">
                <div class="field-markdown">
                    <div class="field-normal">
                    <p class="field-label"><label for="${elem + st}">希望納期</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${elem + st}" name="${elem + st}" class="control-dropdown" onchange="displayControlAsap()">
                                <option value="">&nbsp;</option>
                                <option value="${WIKI_DELIVERY_LIMIT.ASAP.name}">${WIKI_DELIVERY_LIMIT.ASAP.name}</option>
                                <option value="${WIKI_DELIVERY_LIMIT.DATE.name}">${WIKI_DELIVERY_LIMIT.DATE.name}</option>
                            </select>
                            <p id="${elem + st + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id="${elem + sd}Field" class="field-normal" style="">
                    <p class="field-label"><label for="${elem + sd}">納入日付</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${elem + sd}" name="${elem + sd}" class="control-textbox datepicker valid" type="text" value="" placeholder="回答希望日" autocomplete="off" data-format="Y/m/d" data-step="10" tabindex="-1">
                            <div class="ui-icon ui-icon-clock current-time">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field-markdown">
                    <div class="field-normal">
                    <p class="field-label"><label for="${elem + sdc}">納入区分</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${elem + sdc}" name="${elem + sdc}" class="control-dropdown" onchange="displayControlDirect()">
                                <option value="">&nbsp;</option>
                                <option value="${WIKI_DELIVERY_CLASS.MIS.name}">${WIKI_DELIVERY_CLASS.MIS.name}</option>
                                <option value="${WIKI_DELIVERY_CLASS.DIRECT.name}">${WIKI_DELIVERY_CLASS.DIRECT.name}</option>
                            </select>
                            <p id="${elem + sdc + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>

                <div id="${elem + sr}Field" class="field-markdown">
                    <p class="field-label">
                        <label for="${elem + sr}">納入先：直送</label>
                    </p>
                    <div class="field-control">
                        <div class="container-normal">
                            <div id="${elem + sr}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${elem + sr}'));"><pre><br></pre>
                            </div>
                            <div id="${elem + sr}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${elem + sr}'));">
                            </div>
                            <textarea id="${elem + sr}" name="${elem + sr}" class="control-markdown upload-image applied" placeholder="納入先：直送" style="height: 100px; display: none;">
                            </textarea>
                            <input id="${elem + sr}.upload-image-file" name="${elem + sr}.upload-image-file" class="hidden upload-image-file" type="file" accept="image/*" data-id="${elem + sr}">
                        </div>
                    </div>
                </div>
                <div class="field-normal">
                <p class="field-label"><label for="${elem + sp}">出力仕入先注文形式</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${elem + sp}" name="${elem + sp}" class="control-dropdown">
                                <option value="">&nbsp;</option>
                                <option value="${x1}">${x1}</option>
                                <option value="${x2}">${x2}</option>
                                <option value="${x3}">${x3}</option>
                            </select>
                            <p id="${elem + sp + cm}" style="color: red; font-weight: bold; visibility: hidden;">必須項目です</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        let menuDiv = document.createElement('div')
        menuDiv.innerHTML = htmlSupp

        area.append(menuDiv)
        Array.from(document.querySelectorAll('input[name="radio"]'))[0].click()

        // datePicker 生成
        $p.apply()
	})
}

function displayControlAsap() {
    for (let id of suppliers) {
        // 納入日付　表示制御
        if ($('#' + id + st).val() == WIKI_DELIVERY_LIMIT.DATE.name) {
            // 表示化
            commonHideElements(id + sd + "Field", false)
        } else {
            commonHideElements(id + sd + "Field")
            document.getElementById(id + sd).value = ""
        }
    }

}
function displayControlDirect() {
    for (let id of suppliers) {
        // 納入先：直送　表示制御
        if ($('#' + id + sdc).val() == WIKI_DELIVERY_CLASS.DIRECT.name) {
            // 表示化
            commonHideElements(id + sr + "Field", false)
        } else {
            commonHideElements(id + sr + "Field")
            document.getElementById(id + sr).value = ""
        }
    }
}

async function downloadSupplierExcel() {

    let alertFlg = false
    // 入力チェック
    for (let id of suppliers) {
        let checkFlg = false
        // すべての希望納期が入力されているか
        if ([WIKI_DELIVERY_LIMIT.ASAP.name, WIKI_DELIVERY_LIMIT.DATE.name].includes($('#' + id + st).val())) {
            document.getElementById(id + st + cm).style["visibility"] = 'hidden'
        } else {
            document.getElementById(id + st + cm).style["visibility"] = 'visible'
            checkFlg = true
        }

        // すべての納入区分が入力されているか
        if ([WIKI_DELIVERY_CLASS.MIS.name, WIKI_DELIVERY_CLASS.DIRECT.name].includes($('#' + id + sdc).val())) {
            document.getElementById(id + sdc + cm).style["visibility"] = 'hidden'
        } else {
            document.getElementById(id + sdc + cm).style["visibility"] = 'visible'
            checkFlg = true
        }

        // すべての出力仕入先注文形式が入力されているか
        if ([x1, x2, x3].includes($('#' + id + sp).val())) {
            document.getElementById(id + sp + cm).style["visibility"] = 'hidden'
        } else {
            document.getElementById(id + sp + cm).style["visibility"] = 'visible'
            checkFlg = true
        }
        // ラベルを赤くする
        if (checkFlg) {
            document.getElementById(rl + id).style["color"] = 'red'
            document.getElementById(rl + id).style["font-weight"] = 'bolder'
            alertFlg = checkFlg
        } else {
            document.getElementById(rl + id).style["color"] = 'black'
            document.getElementById(rl + id).style["font-weight"] = 'bold'
        }
    }
    // アラートメッセージ
    if (alertFlg) {
        alert("すべての仕入先に対して、必須項目を入力してください")
        return false
    }
    // ダイアログをクローズ
    $p.closeDialog($('#' + sid))

    requestMemo1 = srm1
    requestMemo2 = srm2
    let today = formatYYYYMMDD(new Date())
    let totalJpy = 0
    let totalUsd = 0

    let reqId = await downloadRequestExcel(false)
    let printId = ""
    let supOrderId = ""

    // let usdFlg = false
    // let foreignFlg = false

    commonSetMessage("仕入先注文書作成中のため、ブラウザを閉じないようにお願い致します。", WARNING, true)

    for (let id of suppliers) {
        // display値データ変換
        supplierData.display = selectedData.display.filter(x => selectedData.value.filter(v => v[SUPPLIER] == id).map(w => w["ID"]).includes(x["ID"]))
        supplierData.value = selectedData.value.filter(x => selectedData.value.filter(v => v[SUPPLIER] == id).map(w => w["ID"]).includes(x["ID"]))

        if ($('#' + id + sp).val() == x1) {
            printId = FORMAT_ID_SUPPLIER
        } else if ($('#' + id + sp).val() == x2) {
            printId = FORMAT_ID_SUPPLIER_FOREIGN_JPY
            // foreignFlg = true
        } else if ($('#' + id + sp).val() == x3) {
            printId = FORMAT_ID_SUPPLIER_FOREIGN_USD
            // usdFlg = true
            // foreignFlg = true
        }

        // 帳票フォーマットを検索
        let retDownloadExcel = {}
        // 帳票を格納
        let exc = {}

        // 仕入先注文書台帳にデータを新規作成
        let retCreateParentRecord ={}
        // 帳票を作成
        let retCreateExcel = {}

        suppDesiredDelivery = $('#' + id + st).val()
        suppDeliveryClass = $('#' + id + sdc).val()
        suppDeliveryDate = $('#' + id + sd).val()
        suppDestination = $('#' + id + sr).val()

        // 合計金額
        totalJpy = supplierData.display.reduce((sum, elem) => {
            return sum + (elem[COST_JPY] * elem[VOLUME])
        }, 0)
        // 合計金額＄
        totalUsd = supplierData.display.reduce((sum, elem) => {
            return sum + (elem[COST_USD] * elem[VOLUME])
        }, 0)

        let createData = {
            "DateA": today,
            "NumA": totalJpy,                                   //07.合計金額
            "NumB": totalUsd,                                   //07.合計金額＄
            "ClassB": supplierData.value[0][SUPPLIER],          //07.仕入先会社名
            "ClassC": supplierData.value[0][CURRENCY_CLASS],    //07.通貨区分
            "ClassE": suppDesiredDelivery,                      //07.希望納期（ASAP,日付）
            "ClassF": suppDeliveryClass,                        //07.納入区分
            "ClassG": reqId,                                    //07.仕入先注文番号
            "DateB": suppDeliveryDate,                          //07.納入日付
            "DescriptionA": suppDestination,                    //07.納品先
        }

        try {
            retCreateParentRecord = await createParentRecord(TABLE_ID_SUPPLIER_ORDER_BOOK, createData)
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー１", ERROR, true)
            return false
        }

        for (let formatId of [FORMAT_ID_SUPPLIER, FORMAT_ID_SUPPLIER_FOREIGN_JPY, FORMAT_ID_SUPPLIER_FOREIGN_USD]) {
            let att = ""
            let usdFlg = false
            let foreignFlg = false
            if (formatId == FORMAT_ID_SUPPLIER) {
                att = "AttachmentsA"
            } else if (formatId == FORMAT_ID_SUPPLIER_FOREIGN_JPY) {
                att = "AttachmentsB"
                foreignFlg = true
            } else if (formatId == FORMAT_ID_SUPPLIER_FOREIGN_USD) {
                att = "AttachmentsC"
                usdFlg = true
                foreignFlg = true
            }

            try {
                retDownloadExcel = await downloadExcel(formatId)
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書:帳票ダウンロードエラー２", ERROR, true)
                return false
            }
            if (retDownloadExcel.Response.TotalCount !== 1) {
                return false
            }
            // 帳票を格納
            exc = retDownloadExcel.Response.Data[0]

            // 作成されたレコードのIDを取得
            supOrderId = retCreateParentRecord.Id

            try {
                retCreateExcel = await createExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC, usdFlg, foreignFlg)
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書:帳票ダウンロードエラー３", ERROR, true)
                return false
            }

            try {

                // 仕入先注文書台帳に帳票を添付
                await commonUpdateAttachment(supOrderId, att, retCreateExcel.workbook, retCreateExcel.filename)
            } catch (err) {
                console.log(err)
                commonSetMessage("仕入先注文書:帳票ダウンロードエラー４", ERROR, true)
                return false
            }
            if (formatId == printId) {
                try {
                    // ファイルをダウンロード
                    await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename)
                } catch (err) {
                    console.log(err)
                    commonSetMessage("仕入先注文書:帳票ダウンロードエラー５", ERROR, true)
                    return false
                }
            }
        }

        let updateData = {
            Status: WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index
            , [commonGetId("注文日", false)]: today
        }

        try {

            // 選択した注文管理レコードを更新
            await Promise.all(selectedData.value.filter(v => v[SUPPLIER] == id).map(async record => {

                return commonUpdateAjax(
                    record["ID"]
                    , {
                        [$p.getColumnName("仕入先注文番号")]: supOrderId
                    }
                    , {}
                    , {
                        [$p.getColumnName("注文日")]: today
                    }
                    , {}
                    , {}
                    , WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index // 納期確認中
                )
            }))
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー６", ERROR, true)
            return false
        }
    }

    $p.clearMessage()
    let finalAns = window.confirm('更新と帳票出力が完了しました。画面をリロードしますがよろしいでしょうか?')
	if (finalAns) {
		// キャッシュからリロード
		location.reload(false)
	}

    async function createExcel(guid, filename, usdFlg, foreignFlg) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)
        worksheet.name = filename

        let recS = await commonGetData(
            ["ClassA"]
            , {"ResultId": `[${supOrderId}]`}
            , false
            , TABLE_ID_SUPPLIER_ORDER_BOOK
        )
        let siNo = recS.Response.Data[0]["仕入先注文番号"]

        let recR = await commonGetData(
            ["ClassA"]
            , {"ResultId": `[${reqId}]`}
            , false
            , TABLE_ID_REQUEST_BOOK
        )
        let misNo = recR.Response.Data[0]["MiS番号"]
        if (foreignFlg) {
            getCell("Y4", worksheet).value = today // 注文年月日
        } else {
            getCell("Y4", worksheet).value = today.split("/")[0] // 注文年
            getCell("AB4", worksheet).value = today.split("/")[1] // 注文月
            getCell("AD4", worksheet).value = today.split("/")[2] // 注文日
        }

        getCell("Z5", worksheet).value = siNo //仕入先注文番号
        getCell("B5", worksheet).value = supplierData.display[0][SUPPLIER] //仕入先
        getCell("G13", worksheet).value = usdFlg ? totalUsd : totalJpy //合計
        // 納入区分が日付だったら納入日付を入力
        if (suppDesiredDelivery == WIKI_DELIVERY_LIMIT.DATE.name) {
            getCell("G17", worksheet).value = suppDeliveryDate
        } else {
            getCell("G17", worksheet).value = suppDesiredDelivery
        }

        getCell("C32", worksheet).value = suppDestination //納品先
        getCell("AB35", worksheet).value = misNo //MiS番号

        let rowNumber = 20
        for (let record of supplierData.display) {
            getCell("C" + rowNumber, worksheet).value = record[MODEL_NO] //型番
            let volume = record[VOLUME]
            let unit = record[usdFlg ? COST_USD : COST_JPY]
            getCell("K" + rowNumber, worksheet).value = volume //数量
            getCell("N" + rowNumber, worksheet).value = unit //単価
            getCell("Q" + rowNumber, worksheet).value = volume * unit //金額
            getCell("T" + rowNumber, worksheet).value = record[SUPPLIER_REMARK] //仕入先備考
            if (foreignFlg) {
                getCell("AF" + rowNumber, worksheet).value = record[MEASURE]  //数量単位
            } else {
                getCell("M" + rowNumber, worksheet).value = record[MEASURE]  //数量単位
            }
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}
