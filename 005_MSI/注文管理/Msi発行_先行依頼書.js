
const requestDialogId = "requestExcelDownloadDialog"
const requestTargetgetDate = "requestTargetgetDate"
const requestRemarks = "requestRemarks"

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




async function downloadRequestExcel() {

    // 帳票フォーマットを検索
    let retDownloadExcel
    try {
        retDownloadExcel = await downloadExcel(FORMAT_ID_ESTIMATION)
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー１", WARNING)
        return false
    }
    if (retDownloadExcel.Response.TotalCount !== 1) {
        return false
    }

    // 先行依頼書台帳にデータを新規作成
    let retCreateParentRecord
    try {
        retCreateParentRecord = await createParentRecord()
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー２", WARNING)
        return false
    }
    // 作成されたレコードのIDを取得
    let targetID = retCreateParentRecord.Id
    try {
        // 選択した注文管理レコードを更新
        await editSelectedRecord(commonGetId("MiS注番", false), targetID)
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー３", WARNING)
        return false
    }
    // 先行依頼書台帳にデータを新規作成
    let retCreateExcel
    // 帳票を作成
    var res = retDownloadExcel.Response.Data[0]

    try {
        retCreateExcel = await createExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
        console.log(retCreateExcel)
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー４", WARNING)
        return false
    }

    try {
            // 選考依頼書台帳に帳票を添付
        await editParentRecord(targetID, retCreateExcel.workbook, retCreateExcel.filename)
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー５", WARNING)
        return false
    }

    try {
        // ファイルをダウンロード
        await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
    } catch (err) {
        console.log(err)
        commonSetMessage("帳票ダウンロードエラー６", WARNING)
        return false
    }

    // ダイアログをクローズ
    $p.closeDialog($('#' + requestDialogId));

    // メッセージを表示
    commonSetMessage("エクセルファイルを出力しました。", SUCCESS)


    function createParentRecord() {
        const today = new Date();
        return $p.apiCreate({
            id: TABLE_ID_REQUEST_BOOK,
            data: {
                "DateA": formatYYYYMMDD(today),
                "DateB": $('#' + requestTargetgetDate).val(),
                "DescriptionA": $('#' + requestRemarks).val()
            },
            'done': function (data) {
                console.log('通信が成功しました。');
                console.log(data);
            },
            'fail': function (error) {
                console.log('通信が失敗しました。');
            },
            'always': function (data) {
                console.log('通信が完了しました。');
            }
        });
    }

    async function createExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
        const data = new Uint8Array(res.data);
        const workbook = new ExcelJS.Workbook();
        const today = new Date();

        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

        worksheet.name = filename
        let retSelectedDiplayValue = await getSelectedDiplayValue()
        const resSelectedDiplayValue = retSelectedDiplayValue.Response.Data

        worksheet.getRow(24).getCell(8).value = $('#' + requestTargetgetDate).val() //回答希望日
        worksheet.getRow(25).getCell(8).value = $('#' + requestRemarks).val() //備考
        worksheet.getRow(3).getCell(8).value = resSelectedDiplayValue[0]["顧客名（契約先）"] //顧客名
        worksheet.getRow(4).getCell(8).value = resSelectedDiplayValue[0]["事業所名"] //事業所名
        worksheet.getRow(5).getCell(8).value = resSelectedDiplayValue[0]["エンドユーザ"] //エンドユーザ
        worksheet.getRow(6).getCell(8).value = resSelectedDiplayValue[0]["代理店名"] //代理店
        worksheet.getRow(5).getCell(83).value = resSelectedDiplayValue[0]["MiS注番"] //MiS注番
        worksheet.getRow(4).getCell(83).value = formatYYYYMMDD(today) //作成日

        let rowNumber = 9
        for (let index in resSelectedDiplayValue) {
            let record = resSelectedDiplayValue[index]
            worksheet.getRow(rowNumber).getCell(2).value = record["営業担当者"]
            worksheet.getRow(rowNumber).getCell(8).value = record["注文管理番号"]
            worksheet.getRow(rowNumber).getCell(16).value = record["顧客名（契約先）"]
            worksheet.getRow(rowNumber).getCell(21).value = record["品名"]
            worksheet.getRow(rowNumber).getCell(26).value = record["型番"]
            worksheet.getRow(rowNumber).getCell(34).value = record["数量"]
            worksheet.getRow(rowNumber).getCell(38).value = record["単価"]
            worksheet.getRow(rowNumber).getCell(42).value = record["金額"]
            worksheet.getRow(rowNumber).getCell(47).value = record["コミッション率"]
            worksheet.getRow(rowNumber).getCell(53).value = record["客先注文番号"]
            worksheet.getRow(rowNumber).getCell(63).value = record["先行依頼希望納期"]
            worksheet.getRow(rowNumber).getCell(67).value = record["回答納期"]
            worksheet.getRow(rowNumber).getCell(71).value = record["連絡事項"]
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}
