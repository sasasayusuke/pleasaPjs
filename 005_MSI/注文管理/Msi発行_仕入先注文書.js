

const supplierDialogId = "supplierExcelDownloadDialog"
const supplierTargetgetDate = "supplierTargetgetDate"
const supplierRemarks = "supplierRemarks"


$p.events.on_grid_load_arr.push(function () {

    let html = `
        <div id="${supplierDialogId}" class="dialog" title="仕入先注文書出力">
            <div class="field-normal">
                <p class="field-label"><label for="TargetDate">仕入先希望納期</label></p>
                <div class="field-control">
                    <div class="container-normal">
                        <select id="Results_Class017" name="Results_Class017" class="control-dropdown">
                            <option value="">&nbsp;</option>
                            <option value="ASAP">ASAP</option>
                            <option value="日付">日付</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="Results_DateMField" class="field-normal" style="">
                <p class="field-label">
                    <label for="Results_DateM">納入日付</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <input id="Results_DateM" name="Results_DateM" class="control-textbox datepicker applied"
                        type="text" value="" placeholder="納入日付" autocomplete="off" data-format="Y/m/d" data-validate-date="1" data-step="10">
                        <div class="ui-icon ui-icon-clock current-time">
                        </div>
                    </div>
                </div>
            </div>

            <div id="Results_Class002Field" class="field-normal both">
                <p class="field-label">
                    <label for="Results_Class002">納入区分</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <select id="Results_Class002" name="Results_Class002" class="control-dropdown valid" aria-invalid="false">
                            <option value="" selected="selected">&nbsp;</option>
                            <option value="MiS">MiS</option>
                            <option value="仕入先直送">仕入先直送</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="Results_DescriptionDField" class="field-markdown">
                <p class="field-label">
                    <label for="Results_DescriptionD">納入先：直送</label>
                </p>
                <div class="field-control">
                    <div class="container-normal">
                        <div id="Results_DescriptionD.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#Results_DescriptionD'));"><pre><br></pre>
                        </div>
                        <div id="Results_DescriptionD.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#Results_DescriptionD'));">
                        </div>
                        <textarea id="Results_DescriptionD" name="Results_DescriptionD" class="control-markdown upload-image applied" placeholder="納入先：直送" style="height: 100px; display: none;">
                        </textarea>
                        <div class="ui-icon ui-icon-image button-upload-image" onclick="$p.selectImage('Results_DescriptionD');">
                        </div>
                        <div class="ui-icon ui-icon-video" onclick="$p.openVideo('Results_DescriptionD');">
                        </div>
                        <input id="Results_DescriptionD.upload-image-file" name="Results_DescriptionD.upload-image-file" class="hidden upload-image-file" type="file" accept="image/*" data-id="Results_DescriptionD">
                    </div>
                </div>
            </div>

            <p class="message-dialog"></p>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="main();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
`

    $('#Application').append(html)

})

function openSupplierExcelDownloadDialog() {
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#" + supplierDialogId).dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

async function main() {

    async function getTotalData(){
        return $p.apiGet({
            'id': $p.siteId(),
            'data': {
                'View': {
                'ApiDataType': "KeyValues",
                'ApiColumnValueDisplayType': "DisplayValue",
                'GridColumns': [
                        "NumF", // 金額
                        "ClassV", //仕入先会社名
            ],
            'ColumnFilterHash': {
                'ResultId': '[' + $p.selectedIds() + ']',
            },
    }
    },
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data
            return res
        }
        })
    }
const GetTotalSelectedData = await getTotalData();

    let index = 0
    let total = 0
    for (const elem of GetTotalSelectedData.Response.Data){

        total += GetTotalSelectedData.Response.Data[index]["金額"]

     index++

    }

    // 帳票フォーマットを検索
    let retDownloadExcel
    try {
        retDownloadExcel = await downloadExcel()
    } catch (err) {
        console.log(err)
        return false
    }
    if (retDownloadExcel.Response.TotalCount !== 1) {
        return false
    }

    // 仕入先注文書台帳にデータを新規作成
    let retCreateParentRecord
    try {
        retCreateParentRecord = await createParentRecord(total, GetTotalSelectedData.Response.Data[0]["仕入先"]) //引数は何個でも指定できます。
    } catch (err) {
        console.log(err)
        return false
    }
    // 作成されたレコードのIDを取得
    let targetID = retCreateParentRecord.Id

    // 選択した注文管理レコードを更新
    await editSelectedRecord("ClassW", targetID)

    // 帳票を作成
    var res = retDownloadExcel.Response.Data[0]
    let retCreateExcel = await createExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
    console.log(retCreateExcel)

    // 仕入先注文書台帳に帳票を添付
    await editParentRecord(targetID, retCreateExcel.workbook, retCreateExcel.filename)

    // ファイルをダウンロード
    await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);

    // ダイアログをクローズ
    $p.closeDialog($('#' + supplierDialogId));

    // メッセージを表示
    $p.setMessage('#Message', JSON.stringify({
        Css: 'alert-success',
        Text: 'エクセルファイルを出力しました。'
    }));
}


function createParentRecord(Total, Company) {  //Total、Companyとして、引数で持ってくる
    const today = new Date();
    return $p.apiCreate({
        id: ORDER_FORM_FOR_SUPPLIERS_ID,
        data: {
            "DateA": formatYYYYMMDD(today),
            "ClassA": $('#Results_ClassW').val(), //07.仕入先注文台帳番号
            "ClassB": Company, //07.仕入先会社名
            "ClassC": Total, //07.合計金額
            "ClassE": $('#Results_Class017').val(), //07.希望納期（ASAP,日付）
            "DescriptionA": $('#Results_DescriptionD').val(), //07.納品先
            "DateB": $('#Results_DateM').val(), //07.日付
            //"DescriptionA": $('#Remarks').val()

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

    const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
    const data = new Uint8Array(res.data);
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

    console.log('"[' + $p.selectedIds() + ']"')

    worksheet.name = filename
    let retSelectedDiplayValue = await getSelectedDiplayValue()
    const resSelectedDiplayValue = retSelectedDiplayValue.Response.Data

    worksheet.getRow(4).getCell(25).value = resSelectedDiplayValue[0]["注文日"] //注文日
    worksheet.getRow(5).getCell(25).value = resSelectedDiplayValue[0]["注文番号"] //仕入先注文台帳番号
    worksheet.getRow(5).getCell(2).value = resSelectedDiplayValue[0]["仕入先"] //仕入先
    //worksheet.getRow(13).getCell(7).value = resSelectedDiplayValue[0]["金額"] //金額
    worksheet.getRow(15).getCell(7).value = resSelectedDiplayValue[0]["支払条件"] //支払条件

    if(retSelectedDiplayValue.Response.Data[0]["仕入先希望納期"] == "ASAP"){

        worksheet.getRow(17).getCell(7).value = $('#Results_Class017').val() //希望納期 (ASAPのみ入れたい)

    }else(retSelectedDiplayValue.Response.Data[0]["仕入先希望納期"] == "日付");{

        worksheet.getRow(17).getCell(7).value = $('#Results_DateM').val() //日付
    }
    worksheet.getRow(32).getCell(3).value = $('#Results_DescriptionD').val() //納品先
    worksheet.getRow(35).getCell(28).value = resSelectedDiplayValue[0]["MiS注番"] //MiS注番

    let rowNumber = 20
    for (let index in resSelectedDiplayValue) {
        let record = resSelectedDiplayValue[index]
        worksheet.getRow(rowNumber).getCell(3).value = record["型番"]
        worksheet.getRow(rowNumber).getCell(11).value = record["数量"]
        worksheet.getRow(rowNumber).getCell(14).value = record["単価"]
        worksheet.getRow(rowNumber).getCell(17).value = record["金額"]
        worksheet.getRow(rowNumber).getCell(20).value = record["仕入先注文備考"]
        rowNumber = rowNumber + 1
    }

    // Force workbook calculation on load
    workbook.calcProperties.fullCalcOnLoad = true;

    return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

