
let requestDialogId = "requestExcelDownloadDialog"
let requestMemo1 = "requestMemo1"
let requestMemo2 = "requestMemo2"

let htmlReq = `
    <div id=${requestDialogId} class="dialog" title="先行依頼書出力">

        <div class="field-markdown">
            <p class="field-label"><label for="${requestMemo1}">MEMO1</label></p>
            <div class="field-control">
                <div class="container-normal">
                    <div id="${requestMemo1}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${requestMemo1}'));">
                        <pre><br></pre>
                    </div>
                    <div id="${requestMemo1}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${requestMemo1}'));">
                    </div>
                    <textarea id="${requestMemo1}" name="${requestMemo1}" class="control-markdown applied" placeholder="MEMO1" style="height: 100px; display: none;">
                    </textarea>
                </div>
            </div>
        </div>

        <div class="field-markdown">
            <p class="field-label"><label for="${requestMemo2}">MEMO2</label></p>
            <div class="field-control">
                <div class="container-normal">
                    <div id="${requestMemo2}.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#${requestMemo2}'));" style="">
                        <pre><br></pre>
                    </div>
                    <div id="${requestMemo2}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#${requestMemo2}'));">
                    </div>
                    <textarea id="${requestMemo2}" name="${requestMemo2}" class="control-markdown applied" placeholder="MEMO2" style="height: 100px; display: none;">
                    </textarea>
                </div>
            </div>
        </div>

        <p class="message-dialog"></p>
        <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="downloadRequestExcel();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>戻る</button>
        </div>
    </div>
`

    $('#Application').append(htmlReq)

function openRequestExcelDownloadDialog() {
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
        commonSetMessage("先行依頼書作成中のため、ブラウザを閉じないようにお願い致します。", WARNING, true)

        // 帳票フォーマットを検索
        let retDownloadExcel
        try {
            retDownloadExcel = await downloadExcel(FORMAT_ID_REQUEST)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー１", ERROR, true)
            return false
        }
        if (retDownloadExcel.Response.TotalCount !== 1) {
            return false
        }

        // 帳票を格納
        exc = retDownloadExcel.Response.Data[0]
        createData["DateA"] = formatYYYYMMDD(new Date()), // 04.先行依頼書作成日
        createData["DescriptionA"] = $('#' + requestMemo1).val() // 04.先行依頼書 MEMO1
        createData["DescriptionB"] = $('#' + requestMemo2).val() // 04.先行依頼書 MEMO2

    }

    try {
        retCreateParentRecord = await createParentRecord(TABLE_ID_REQUEST_BOOK, createData)
    } catch (err) {
        console.log(err)
        commonSetMessage("先行依頼書:帳票ダウンロードエラー２", ERROR, true)
        return false
    }

    // 作成されたレコードのIDを取得
    let targetID = retCreateParentRecord.Id
    let updateData = {
        Status: WIKI_STATUS_ORDER_CONTROL.checkingDelivery.index
        , [commonGetId("MiS番号", false)]: targetID
    }

    try {
        // 選択した注文管理レコードを更新
        await editSelectedRecord(updateData)
    } catch (err) {
        console.log(err)
        commonSetMessage("先行依頼書:帳票ダウンロードエラー３", ERROR, true)
        return false
    }
    if (printFlg) {

        // 帳票を作成
        let retCreateExcel
        try {
            retCreateExcel = await createExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC)
            console.log(retCreateExcel)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー４", ERROR, true)
            return false
        }

        try {
                // 選考依頼書台帳に帳票を添付
            await commonUpdateAttachment(targetID, "AttachmentsA", retCreateExcel.workbook, retCreateExcel.filename)
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー５", ERROR, true)
            return false
        }

        try {
            // ファイルをダウンロード
            await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
        } catch (err) {
            console.log(err)
            commonSetMessage("先行依頼書:帳票ダウンロードエラー６", ERROR, true)
            return false
        }
    }

    // 終了する
    if (finishFlg) {
        $p.clearMessage()
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

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)
        worksheet.name = filename

        let rec = await commonGetData(
            ["ClassA"]
            , {"ResultId": `[${targetID}]`}
            , false
            , TABLE_ID_REQUEST_BOOK
        )
        let misNo = rec.Response.Data[0]["MiS番号"]

        getCell("B24", worksheet).value = $('#' + requestMemo1).val() // MEMO1
        getCell("AT24", worksheet).value = $('#' + requestMemo2).val() // MEMO2
        getCell("H3", worksheet).value  = selectedData.display[0][CUSTOMER] //顧客名
        getCell("H4", worksheet).value  = selectedData.display[0][OFFICE] //事業所名
        getCell("H5", worksheet).value  = selectedData.display[0][ENDUSER] //エンドユーザ
        getCell("H6", worksheet).value  = selectedData.display[0][AGENT] //代理店
        getCell("CJ5", worksheet).value = misNo //MiS番号
        getCell("CJ4", worksheet).value = formatYYYYMMDD(new Date()) //作成日

        let rowNumber = 9
        for (let record of selectedData.display) {
            getCell("B" + rowNumber, worksheet).value   = record[SALES_MANAGER] //　営業担当者
            getCell("G" + rowNumber, worksheet).value   = record[CH_NO] //　注文管理番号
            if (!commonIsNull(record[DESTINATION])) {
                if (record[DESTINATION].indexOf("国内") == 0) {
                    getCell("M" + rowNumber, worksheet).value   = record[DELIVERY_OFFICE] // 納品先事業所
                } else if (record[DESTINATION].indexOf("海外") == 0) {
                    getCell("M" + rowNumber, worksheet).value   = record[SHIP_TO_COUNTRY] // 送り先国名
                }
            }
            getCell("R" + rowNumber, worksheet).value   = record["品名"] //　品名
            getCell("V" + rowNumber, worksheet).value   = record[MODEL_NO] //　型番
            getCell("AH" + rowNumber, worksheet).value  = record[VOLUME] //　数量
            getCell("AM" + rowNumber, worksheet).value  = record[MEASURE] //　単位
            getCell("AO" + rowNumber, worksheet).value  = record[UNIT_PRICE] //　単価
            getCell("AT" + rowNumber, worksheet).value  = record[SUB_TOTAL] //　金額
            getCell("AY" + rowNumber, worksheet).value  = record[COMMISSION] //　コミッション率
            getCell("BC" + rowNumber, worksheet).value  = record[CUSTOMER_CH_NO] //　客先注文番号
            getCell("BI" + rowNumber, worksheet).value  = record[CUSTOMER_LIMIT] //　顧客希望納期
            getCell("BO" + rowNumber, worksheet).value  = record[SUPPLIER] //　仕入先
            getCell("BT" + rowNumber, worksheet).value  = record[REQUEST_REMARK] //　先行依頼備考
            rowNumber++
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true

        return { workbook: workbook, filename: filename + getNow() + ".xlsx" }
    }
}
