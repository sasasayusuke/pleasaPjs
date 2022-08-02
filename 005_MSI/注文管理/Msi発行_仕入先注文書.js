

const supplierDialogId = "supplierExcelDownloadDialog"
const supplierTarget = "supplierTarget"
const supplierDate = "supplierDate"
const supplierRemarks = "supplierRemarks"
const supplierPrint = "supplierPrint"
const supplierRequestTargetgetDate = "supplierRequestTargetgetDate"
const supplierRequestRemarks = "supplierRequestRemarks"

let x1 = "国内向け円建"
let x2 = "海外向け円建"
let x3 = "海外向けドル建"

$p.events.on_grid_load_arr.push(function () {

    let html = `
        <div id="${supplierDialogId}" class="dialog" title="先行依頼書&仕入先注文書出力">
            <div class="field-normal">
                <p class="field-label"><label for="${supplierRequestTargetgetDate}">回答希望日</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${supplierRequestTargetgetDate}" name="${supplierRequestTargetgetDate}" class="control-textbox datepicker valid" type="text" value="" placeholder="回答希望日" autocomplete="off" data-format="Y/m/d" data-step="10" tabindex="-1">
                        <div class="ui-icon ui-icon-clock current-time">
                        </div>
                    </div>
                </div>
            </div>

            <div class="field-markdown">
                <p class="field-label"><label for="${supplierRequestRemarks}">備考</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="${supplierRequestRemarks}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${supplierRequestRemarks}'));" style="">
                            <pre><br></pre>
                        </div>
                        <div id="${supplierRequestRemarks}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${supplierRequestRemarks}'));">
                        </div>
                        <textarea id="${supplierRequestRemarks}" name="${supplierRequestRemarks}" class="control-markdown applied" placeholder="備考" style="height: 100px; display: none;">
                        </textarea>
                    </div>
                </div>
            </div>

            <div class="field-normal">
                <p class="field-label"><label for="${supplierTarget}">希望納期</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <select id="${supplierTarget}" name="${supplierTarget}" class="control-dropdown" onchange="displayControlAsap()">
                            <option value="">&nbsp;</option>
                            <option value="${WIKI_DELIVERY_LIMIT.ASAP.name}">${WIKI_DELIVERY_LIMIT.ASAP.name}</option>
                            <option value="${WIKI_DELIVERY_LIMIT.DATE.name}">${WIKI_DELIVERY_LIMIT.DATE.name}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="${supplierDate}Field" class="field-normal" style="">
                <p class="field-label"><label for="${supplierDate}">納入日付</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${supplierDate}" name="${supplierDate}" class="control-textbox datepicker valid" type="text" value="" placeholder="回答希望日" autocomplete="off" data-format="Y/m/d" data-step="10" tabindex="-1">
                        <div class="ui-icon ui-icon-clock current-time">
                        </div>
                    </div>
                </div>
            </div>

            <div id="${supplierRemarks}Field" class="field-markdown">
                <p class="field-label">
                    <label for="${supplierRemarks}">納入先：直送</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="${supplierRemarks}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${supplierRemarks}'));"><pre><br></pre>
                        </div>
                        <div id="${supplierRemarks}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${supplierRemarks}'));">
                        </div>
                        <textarea id="${supplierRemarks}" name="${supplierRemarks}" class="control-markdown upload-image applied" placeholder="納入先：直送" style="height: 100px; display: none;">
                        </textarea>
                        <div class="ui-icon ui-icon-image button-upload-image" onclick="$p.selectImage('${supplierRemarks}');">
                        </div>
                        <div class="ui-icon ui-icon-video" onclick="$p.openVideo('${supplierRemarks}');">
                        </div>
                        <input id="${supplierRemarks}.upload-image-file" name="${supplierRemarks}.upload-image-file" class="hidden upload-image-file" type="file" accept="image/*" data-id="${supplierRemarks}">
                    </div>
                </div>
            </div>
            <div class="field-normal">
            <p class="field-label"><label for="${supplierPrint}">出力仕入先注文形式</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <select id="${supplierPrint}" name="${supplierPrint}" class="control-dropdown">
                            <option value="">&nbsp;</option>
                            <option value="${x1}">${x1}</option>
                            <option value="${x2}">${x2}</option>
                            <option value="${x3}">${x3}</option>
                        </select>
                    </div>
                </div>
            </div>

            <p class="message-dialog"></p>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="downloadSupplierExcel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
`

    $('#Application').append(html)

})

function displayControlAsap() {
    // 納入日付　表示制御
    if ($('#' + supplierTarget).val() == WIKI_DELIVERY_LIMIT.DATE.name) {
        // 表示化
        commonHideElements(supplierDate + "Field", false)
    } else {
        commonHideElements(supplierDate + "Field")
        document.getElementById(supplierDate).value = ""
    }
}
function displayControlDirect() {
    // 納入先：直送　表示制御
    if (selectedData.display[0][DELIVERY_CLASS] == WIKI_DELIVERY_CLASS.DIRECT.name) {
        // 表示化
        commonHideElements(supplierRemarks + "Field", false)
    } else {
        commonHideElements(supplierRemarks + "Field")
        document.getElementById(supplierRemarks).value = ""
    }
}

function openSupplierExcelDownloadDialog() {

    displayControlAsap()
    displayControlDirect()
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#" + supplierDialogId).dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

async function downloadSupplierExcel() {
    // ダイアログをクローズ
    $p.closeDialog($('#' + supplierDialogId));
    let printId = ""
    let usdFlg = false
    let foreignFlg = false
    if ($('#' + supplierPrint).val() == x1) {
        printId = FORMAT_ID_SUPPLIER
    } else if ($('#' + supplierPrint).val() == x2) {
        printId = FORMAT_ID_SUPPLIER_FOREIGN_JPY
        foreignFlg = true
    } else if ($('#' + supplierPrint).val() == x3) {
        printId = FORMAT_ID_SUPPLIER_FOREIGN_USD
        usdFlg = true
        foreignFlg = true
    } else {
        commonSetMessage("出力仕入先注文形式を選択してください", WARNING)
        return false

    }

    requestTargetgetDate = supplierRequestTargetgetDate
    requestRemarks = supplierRequestRemarks
    let reqId = await downloadRequestExcel(false)

    // 帳票フォーマットを検索
    let retDownloadExcel = {}
     // 帳票を格納
    let exc = {}

    // 仕入先注文書台帳にデータを新規作成
    let retCreateParentRecord ={}
    // 帳票を作成
    let retCreateExcel = {}

    let today = formatYYYYMMDD(new Date())
    // 合計金額
    let total = selectedData.display.reduce((sum, elem) => {
        return sum + (elem[usdFlg ? "原価＄" : "原価"] * elem[VOLUME])
    }, 0)

    let targetID = ""

    let createData = {
        "DateA": today,
        "ClassB": selectedData.display[0][SUPPLIER], //07.仕入先会社名
        "ClassC": total, //07.合計金額
        "ClassE": $('#' + supplierTarget).val(), //07.希望納期（ASAP,日付）
        "DateB": $('#' + supplierDate).val(), //07.日付
        "DescriptionA": $('#' + supplierRemarks).val(), //07.納品先
    }

    try {
        retCreateParentRecord = await createParentRecord(TABLE_ID_SUPPLIER_ORDER_BOOK, createData)
    } catch (err) {
        console.log(err)
        commonSetMessage("仕入先注文書:帳票ダウンロードエラー１", ERROR)
        return false
    }

    for (let formatId of [FORMAT_ID_SUPPLIER, FORMAT_ID_SUPPLIER_FOREIGN_JPY, FORMAT_ID_SUPPLIER_FOREIGN_USD]) {
        try {
            retDownloadExcel = await downloadExcel(formatId)
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー２", ERROR)
            return false
        }
        if (retDownloadExcel.Response.TotalCount !== 1) {
            return false
        }
        // 帳票を格納
        exc = retDownloadExcel.Response.Data[0]

        // 作成されたレコードのIDを取得
        targetID = retCreateParentRecord.Id

        let updateData = {
                Status: WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index
                , [commonGetId("仕入先注文番号", false)]: targetID
                , [commonGetId("注文日", false)]: today
        }

        try {
        // 選択した注文管理レコードを更新
            await editSelectedRecord(updateData)
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー３", ERROR)
            return false
        }

        try {
            retCreateExcel = await createExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC)
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー４", ERROR)
            return false
        }

        try {
            let att = ""
            if (formatId == FORMAT_ID_SUPPLIER) {
                att = "AttachmentsA"
            } else if (formatId == FORMAT_ID_SUPPLIER_FOREIGN_JPY) {
                att = "AttachmentsB"
            } else if (formatId == FORMAT_ID_SUPPLIER_FOREIGN_USD) {
                att = "AttachmentsC"
            }
            // 仕入先注文書台帳に帳票を添付
            await editParentRecord(targetID, att, retCreateExcel.workbook, retCreateExcel.filename)
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー５", ERROR)
            return false
        }
        if (formatId == printId)
        try {
            // ファイルをダウンロード
            await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
        } catch (err) {
            console.log(err)
            commonSetMessage("仕入先注文書:帳票ダウンロードエラー６", ERROR)
            return false
        }
    }
    let finalAns = window.confirm('更新と帳票出力が完了しました。画面をリロードしますがよろしいでしょうか?')
	if (finalAns) {
		// キャッシュからリロード
		location.reload(false)
	}

    async function createExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()



        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)
        worksheet.name = filename

        let recS = await getSelectedData(["ClassA"] ,targetID, TABLE_ID_SUPPLIER_ORDER_BOOK)
        let siNo = recS.Response.Data[0]["仕入先注文台帳番号"]

        let recR = await getSelectedData(["ClassA"] ,reqId, TABLE_ID_REQUEST_BOOK)
        let misNo = recR.Response.Data[0]["MiS注番"]


        cell("Y4", worksheet).value = today.split("/")[0] // 注文年
        cell("AB4", worksheet).value = today.split("/")[1] // 注文月
        cell("AD4", worksheet).value = today.split("/")[2] // 注文日
        cell("Z5", worksheet).value = siNo //仕入先注文台帳番号
        cell("B5", worksheet).value = selectedData.display[0][SUPPLIER] //仕入先
        cell("G13", worksheet).value = total //合計
        cell("G15", worksheet).value = selectedData.display[0]["条件"] //支払条件
        // 納入区分が日付だったら納入日付を入力
        if ($('#' + supplierTarget).val() == WIKI_DELIVERY_LIMIT.DATE.name) {
            cell("G17", worksheet).value = $('#' + supplierDate).val()
        } else {
            cell("G17", worksheet).value = $('#' + supplierTarget).val()
        }

        cell("C32", worksheet).value = $('#' + supplierRemarks).val() //納品先
        cell("AB35", worksheet).value = misNo //MiS注番

        let rowNumber = 20
        for (let record of selectedData.display) {
            cell("C" + rowNumber, worksheet).value = record[MODEL_NO] //型番
            let volume = record[VOLUME]
            let unit = record[usdFlg ? "原価＄" : "原価"]
            cell("K" + rowNumber, worksheet).value = volume //数量
            cell("N" + rowNumber, worksheet).value = unit //単価
            cell("Q" + rowNumber, worksheet).value = volume * unit //金額
            cell("T" + rowNumber, worksheet).value = foreignFlg ? record[SUPPLIER_REMARK] : "" //仕入先備考
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}