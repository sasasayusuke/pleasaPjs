
const URL = "https://mis-tech.sdt-autolabo.com"
const FORMAT_TABLE_ID = 7
const FORMAT_ID = "02"
const ADVANCE_REQUEST_ID = 13

// js読み込み
const scripts = [
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",
]
for (const script of scripts) {
    console.log(script)
    var request = new XMLHttpRequest();
    request.open('GET', script, false);
    request.send(null);

    if (request.status === 200) {
        var elm = document.createElement('script');
        elm.text = request.responseText;
        document.head.appendChild(elm);
    }
}

var div = document.getElementById('MainCommandsContainer');
var mo = new MutationObserver(function () {
    addDownloadButton();
});
var config = {
    childList: true,
    subtree: true
};
mo.observe(div, config);

let selectSentTo;

async function preCheck() {
    async function getSelectedData() {
        return $p.apiGet({
            'id': $p.siteId(),
            'data': {
                'View': {
                    'ApiDataType': "KeyValues",
                    'ApiColumnValueDisplayType': "DisplayValue",
                    'GridColumns': [
                        "Status",   // ステータス
                        "ClassO",   // MiS注番
                        "ClassF",   // 顧客名（契約先）
                        "ClassE",   // 事業所名
                        "ClassH",   // エンドユーザ
                        "ClassG",   // 代理店名
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

    const selectedData = await getSelectedData();

    if ($p.selectedIds().length === 0) {
        alert("データが選択されていません。")
        return false
    }

    if ($p.selectedIds().length > 15) {
        alert("選択するデータは15件以下にしてください。")
        return false
    }

    let parentIdList = []
    let oldList = []
    let newList = []
    let index = 0
    let dataCheck = false
    let statusCheck = false

    for (const elem of selectedData.Response.Data) {
        // indexが0の場合
        if(index == 0){
            // 比較対象の項目をold変数に格納
            oldList.push(elem["顧客名（契約先）"])
            oldList.push(elem["事業所名"])
            oldList.push(elem["エンドユーザ"])
            oldList.push(elem["代理店名"])
            oldList.push(elem["MiS注番"])
                if(selectedData.Response.Data[index]["注文ステータス"] !== "注文内示" && selectedData.Response.Data[index]["注文ステータス"] !== "注文書受領"){
                    statusCheck = true
                    break;
                }
        // indexが0でない場合
        } else if(index !== 0){
            // 比較対象の項目をnew変数に格納
            newList.push(elem["顧客名（契約先）"])
            newList.push(elem["事業所名"])
            newList.push(elem["エンドユーザ"])
            newList.push(elem["代理店名"])
            newList.push(elem["MiS注番"])
            // old変数とnew変数の内容が一致していない場合
            if(oldList.toString() !== newList.toString()){
                // エラー
                dataCheck = true
                break;
                // old変数とnew変数の内容が一致している場合
            } else if(oldList.toString() == newList.toString()){
                // new変数の値をold変数に代入
                oldList = newList
            };
            // ステータスチェック
            if(selectedData.Response.Data[index]["注文ステータス"] !== "注文内示" && selectedData.Response.Data[index]["注文ステータス"] !== "注文書受領"){
                statusCheck = true
                break;
            }

        }

        // if (elem["MiS注番"] !== "" && !parentIdList.includes(elem["MiS注番"])){
        //     parentIdList.push(elem["MiS注番"])
        // }

        index++;
   };



if (dataCheck) {
	alert("「顧客名（契約先）」「事業所名」「エンドユーザ」「代理店名」「MiS注番」\nが一致したレコードを選択してください。")
} else if (statusCheck) {
	// console.log("ステータスが「注文内示」または「注文書受領」\nのレコードを選択してください。")
    let msg = `
    選択したデータは既にMiS注番が発行済みです。
    出力済みの先行依頼書を再出力する場合は
    先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。
    `
    // <MiS注番>
    // ${parentIdList}

alert(msg)
} else {
    openDownloadDialog();
}


    };

    // // ステータスが内示か受領以外ならエラー
    // if (selectedData.Response.Data[index]["ステータス"] == "注文内示" && selectedData.Response.Data[index]["ステータス"] == "注文書受領") {
    // // if (parentIdList.length !== 0) {
    //     let msg = `
    //         選択したデータは既にMiS注番が発行済みです。
    //         出力済みの先行依頼書を再出力する場合は
    //         先行依頼書台帳テーブルから添付ファイルをダウンロードしてください。
    //         <MiS注番>
    //         ${parentIdList}
    //     `
    //     alert(msg)
    //     // return false
    // }
    // openDownloadDialog();


async function main() {

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

    // 先行依頼書台帳にデータを新規作成
    let retCreateParentRecord
    try {
        retCreateParentRecord = await createParentRecord()
    } catch (err) {
        console.log(err)
        return false
    }
    // 作成されたレコードのIDを取得
    let targetID = retCreateParentRecord.Id

    // 選択した注文管理レコードを更新
    await editSelectedRecord(targetID)

    // 帳票を作成
    var res = retDownloadExcel.Response.Data[0]
    let retCreateExcel = await createExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
    console.log(retCreateExcel)

    // 選考依頼書台帳に帳票を添付
    await editParentRecord(targetID, retCreateExcel.workbook, retCreateExcel.filename)

    // ファイルをダウンロード
    await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);

    // ダイアログをクローズ
    $p.closeDialog($('#DownloadExcelDialog'));

    // メッセージを表示
    $p.setMessage('#Message', JSON.stringify({
        Css: 'alert-success',
        Text: 'エクセルファイルを出力しました。'
    }));
}

async function getSelectedDiplayValue() {
    let retValue = await $p.apiGet({
        'id': $p.siteId(),
        'data': {
            'View': {
                'ColumnFilterHash': {
                    'ResultId': '[' + $p.selectedIds() + ']',
                },
            }
        },
    })
    var res = retValue.Response.Data[0]
    let colArr = []
    for (let key in res) {
        colArr.push(key)
    }
    return $p.apiGet({
        'id': $p.siteId(),
        'data': {
            'View': {
                'ApiDataType': "KeyValues",
                'ApiColumnValueDisplayType': "DisplayValue",
                'GridColumns': colArr,
                'ColumnFilterHash': {
                    'ResultId': '[' + $p.selectedIds() + ']',
                },
                'ColumnSorterHash': {
                    'ClassB': 'asc'
                }
            }
        },
    })
}

function createParentRecord() {
    const today = new Date();
    return $p.apiCreate({
        id: ADVANCE_REQUEST_ID,
        data: {
            "DateA": formatYYYYMMDD(today),
            "DateB": $('#TargetDate').val(),
            "DescriptionA": $('#Remarks').val()
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

async function editParentRecord(targetID, workbook, filename) {
    const fileBuffer = await workbook.xlsx.writeBuffer();
    const base64 = arrayBufferToBase64(fileBuffer)
    const today = new Date();

    let url = "https://mis-tech.sdt-autolabo.com/api/items/" + String(targetID) + "/update"
    let method_name = "POST"
    let JSONdata = {
        "ApiVersion": 1.1,
        "AttachmentsHash": {
            "AttachmentsA": [
                {
                    "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Name": filename,
                    "Base64": base64
                }
            ]
        }
    }
    $.ajax({
        type: method_name,
        url: url,
        data: JSON.stringify(JSONdata),
        //contentType: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        scriptCharset: 'utf-8',
        success: function (data) {
            // Success
            console.log("success");
            console.log(JSON.stringify(data));
        },
        error: function (data) {
            // Error
            console.log("error");
            console.log(JSON.stringify(data));
        }
    });
}

async function editSelectedRecord(parentID) {
    $p.selectedIds().forEach((elem, index) => {
        console.log(`${index}: ${elem}`);
        $p.apiUpdate({
            'id': elem,
            data: {
                ClassO: parentID,
                Status: 300,
            },
            'done': function (data) {
                console.log('通信が成功しました。');
            },
            'fail': function (error) {
                console.log('通信が失敗しました。');
            },
            'always': function (data) {
                console.log('通信が完了しました。');
            }
        });
    });
}

addDownloadButton();
function addDownloadButton() {
    div = document.getElementById('MainCommandsContainer');
    mo.observe(div, config);

    console.log('addDownloadButton');
    if (document.getElementById("ExcelDownload") == null) {
        $("#MainCommands button:last-child").after(
            $('<button id="ExcelDownload" onclick="preCheck();" data-action="Update" data-method="put" class="validate ">Mi番号発行</button>').button(
                { icon: 'ui-icon-disk' }
            )
        );
    }
}

function openDownloadDialog() {
    console.log("openDownloadDialog")
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#DownloadExcelDialog").dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

html = `
    <div id="DownloadExcelDialog" class="dialog" title="Mi番号発行">

      <div class="field-normal">
        <p class="field-label"><label for="TargetDate">回答希望日</label></p>
            <div class="field-control">
                <div class="container-normal">
                    <input id="TargetDate" name="TargetDate" class="control-textbox datepicker valid" type="text" value="" placeholder="回答希望日" autocomplete="off" data-format="Y/m/d" data-step="10" tabindex="-1">
                    <div class="ui-icon ui-icon-clock current-time">
                    </div>
              </div>
          </div>
      </div>

      <div class="field-markdown">
        <p class="field-label"><label for="Remarks">備考</label></p>
        <div class="field-control">
          <div class="container-normal">
            <div id="Remarks.viewer" class="control-markup not-send" ondblclick="$p.editMarkdown($('#Remarks'));" style=""><pre><br></pre>
            </div>
            <div id="Remarks.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="$p.editMarkdown($('#Remarks'));">
            </div>
            <textarea id="Remarks" name="Remarks" class="control-markdown applied" placeholder="備考" style="height: 100px; display: none;">
            </textarea>
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

function downloadExcel() {
    return $p.apiGet({
        'id': FORMAT_TABLE_ID,
        'data': {
            'View': {
                'ColumnFilterHash': {
                    "ClassA": FORMAT_ID
                }
            }
        },
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data[0]
            console.log(JSON.parse(res.AttachmentsA)[0].Guid);
            // getExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
        },
        'fail': function (error) {
            console.log('通信が失敗しました。');
            if (error.responseJSON.StatusCode !== 404) {
                console.log("データ取得に失敗しました");
            }
        },
        'always': function (data) {
            console.log('通信が完了しました。');
        }
    })
}

async function createExcel(guid, filename) {

    const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
    const data = new Uint8Array(res.data);
    const workbook = new ExcelJS.Workbook();
    const today = new Date();

    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

    console.log('"[' + $p.selectedIds() + ']"')

    worksheet.name = filename
    let retSelectedDiplayValue = await getSelectedDiplayValue()
    const resSelectedDiplayValue = retSelectedDiplayValue.Response.Data

    worksheet.getRow(24).getCell(8).value = $('#TargetDate').val() //回答希望日
    worksheet.getRow(25).getCell(8).value = $('#Remarks').val() //備考
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

async function outputXlsx(workbook, filename) {

    const uint8Array = await workbook.xlsx.writeBuffer();
    console.log("uint8Array");
    console.log(uint8Array);
    const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove()
}

function base642ab(base64) {
    const str = window.atob(base64);
    const len = str.length;
    const bytes = new Uint16Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}

function dateToSn(unixTimeMillis) { // Date→シリアル値
    return (unixTimeMillis + 9 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000) + (70 * 365 + 17 + 1 + 1);
}

function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try {
        var blob = new Blob([buffer.buffer], {
            type: 'image/png'
        });
    } catch (e) {
        return false;
    }
    return blob;
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function getNow() {
    var date = new Date();
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
}

function getEndOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1");
    // 1ヶ月加えて翌月にします.
    date.setMonth(date.getMonth() + 1);
    // 日付に0を設定し、該当月のの0日（つまり、前月末）にします.
    date.setDate(0);
    return date
}

function getStartOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1");
    // 日付に1を設定します.
    date.setDate(1);
    return date
}

function formatYYYYMMDD(date) {
    return date.getFullYear() + "/" + ('00' + (date.getMonth() + 1)).slice(-2) + "/" + ('00' + date.getDate()).slice(-2)
}
