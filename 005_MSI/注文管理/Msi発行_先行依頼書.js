
let requestDialogId = "requestExcelDownloadDialog"
let requestTargetgetDate = "requestTargetgetDate"
let requestRemarks = "requestRemarks"

$p.events.on_grid_load_arr.push(function () {
    let html = `
        <div id=${requestDialogId} class="dialog" title="先行依頼書出力">
            <div class="field-normal">
                <p class="field-label"><label for="${requestTargetgetDate}">回答希望日</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="${requestTargetgetDate}" name="${requestTargetgetDate}" class="control-textbox datepicker valid" type="text" value="" placeholder="回答希望日" autocomplete="off" data-format="Y/m/d" data-step="10" tabindex="-1">
                        <div class="ui-icon ui-icon-clock current-time">
                        </div>
                    </div>
                </div>
            </div>

            <div class="field-markdown">
                <p class="field-label"><label for="${requestRemarks}">備考</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="${requestRemarks}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${requestRemarks}'));" style="">
                            <pre><br></pre>
                        </div>
                        <div id="${requestRemarks}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${requestRemarks}'));">
                        </div>
                        <textarea id="${requestRemarks}" name="${requestRemarks}" class="control-markdown applied" placeholder="備考" style="height: 100px; display: none;">
                        </textarea>
                    </div>
                </div>
            </div>

            <p class="message-dialog"></p>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="downloadRequestExcel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
`

    $('#Application').append(html)

})

function openRequestExcelDownloadDialog() {
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#" + requestDialogId).dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

async function downloadRequestExcel(finishFlg = true, printFlg = true) {
    // 帳票を格納
    let exc = {}
    // 先行依頼書台帳にデータを新規作成
    let retCreateParentRecord = {}
    let createData = {
        "ClassB": selectedData.value[0][ORDER_CLASS], // 04.注文区分
    }
    if (printFlg) {
        // ダイアログをクローズ
        $p.closeDialog($('#' + requestDialogId));

        // 帳票フォーマットを検索
        let retDownloadExcel
        try {
            retDownloadExcel = await downloadExcel(FORMAT_ID_REQUEST)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー１", ERROR)
            return false
        }
        if (retDownloadExcel.Response.TotalCount !== 1) {
            return false
        }

        // 帳票を格納
        exc = retDownloadExcel.Response.Data[0]
        createData["DateA"] = formatYYYYMMDD(new Date()), // 04.先行依頼書作成日
        createData["DateB"] = $('#' + requestTargetgetDate).val(), // 04.先行依頼書回答希望日
        createData["DescriptionA"] = $('#' + requestRemarks).val() // 04.先行依頼書備考

    }

    try {
        retCreateParentRecord = await createParentRecord(TABLE_ID_REQUEST_BOOK, createData)
    } catch (err) {
        console.log(err)
        commonSetMessage("先行依頼書:帳票ダウンロードエラー２", ERROR)
        return false
    }
    let targetID = ""
    if (printFlg) {
        // 作成されたレコードのIDを取得
        targetID = retCreateParentRecord.Id
        let updateData = {
            Status: WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index
            , [commonGetId("MiS注番", false)]: targetID
        }

        try {
            // 選択した注文管理レコードを更新
            await editSelectedRecord(updateData)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー３", ERROR)
            return false
        }

        // 帳票を作成
        let retCreateExcel
        try {
            retCreateExcel = await createExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC)
            console.log(retCreateExcel)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー４", ERROR)
            return false
        }

        try {
                // 選考依頼書台帳に帳票を添付
            await editParentRecord(targetID, "AttachmentsA", retCreateExcel.workbook, retCreateExcel.filename)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー５", ERROR)
            return false
        }

        try {
            // ファイルをダウンロード
            await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー６", ERROR)
            return false
        }
    }

    // 終了する
    if (finishFlg) {
        let finalAns = window.confirm(`更新${printFlg ? "と帳票出力" : ""}が完了しました。画面をリロードしますがよろしいでしょうか?`)
        if (finalAns) {
            // キャッシュからリロード
            location.reload(false)
        }
    // そのまま別依頼書作成を続行する
    } else {
        return targetID
    }

    async function createExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
        const data = new Uint8Array(res.data);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);
        worksheet.name = filename

        let rec = await getSelectedData(["ClassA"] ,targetID, TABLE_ID_REQUEST_BOOK)
        let misNo = rec.Response.Data[0]["MiS注番"]

        cell("H24", worksheet).value = $('#' + requestTargetgetDate).val() //回答希望日
        cell("H25", worksheet).value = $('#' + requestRemarks).val() //備考
        cell("H3", worksheet).value  = selectedData.display[0][CUSTOMER] //顧客名
        cell("H4", worksheet).value  = selectedData.display[0][OFFICE] //事業所名
        cell("H5", worksheet).value  = selectedData.display[0][ENDUSER] //エンドユーザ
        cell("H6", worksheet).value  = selectedData.display[0][AGENT] //代理店
        cell("CE5", worksheet).value = misNo //MiS注番
        cell("CE4", worksheet).value = formatYYYYMMDD(new Date()) //作成日

        let rowNumber = 9
        for (let record of selectedData.display) {
            cell("B" + rowNumber, worksheet).value   = record[SALES_MAN] //　営業担当者
            cell("H" + rowNumber, worksheet).value   = record[CH_NO] //　注文管理番号
            cell("P" + rowNumber, worksheet).value   = record[CUSTOMER] //顧客名
            cell("U" + rowNumber, worksheet).value   = record[ITEM_NAME] //　品名
            cell("Z" + rowNumber, worksheet).value   = record[MODEL_NO] //　型番
            cell("AH" + rowNumber, worksheet).value  = record[VOLUME] //　数量
            cell("AL" + rowNumber, worksheet).value  = record[UNIT_PRICE] //　単価
            cell("AP" + rowNumber, worksheet).value  = record[PRICE] //　金額
            cell("AU" + rowNumber, worksheet).value  = record[COMMISSION] //　コミッション率
            cell("BA" + rowNumber, worksheet).value  = record[CUSTOMER_CH_NO] //　客先注文番号
            cell("BK" + rowNumber, worksheet).value  = record[CUSTOMER_LIMIT] //　顧客希望納期
            cell("BO" + rowNumber, worksheet).value  = record[ANSWER_LIMIT] //　回答納期
            cell("BS" + rowNumber, worksheet).value  = record[INFORMATION] //　連絡事項
            rowNumber++
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + ".xlsx" }
    }
}
