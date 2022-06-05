const SETTING_SHEET_NAME = "setting"
const TEMPLATE_SHEET_NAME = "template"
const URL = "https://ssj-pleasanterdev-sv.sdt-test.work"
const FORMAT_TABLE_ID = 32430
const FORMAT_ID = "1"

var div = document.getElementById('MainCommandsContainer');
var mo = new MutationObserver(function() {
    addDownloadButton();
});
var config = {
    childList: true,
    subtree: true
};
mo.observe(div, config);

addDownloadButton();
function addDownloadButton() {
    div = document.getElementById('MainCommandsContainer');
    mo.observe(div, config);

    console.log('addDownloadButton');
    if (document.getElementById("ExcelDownload") == null) {
        $("#MainCommands button:last-child").after(
            $('<button id="ExcelDownload" onclick="downloadExcel();" data-action="Update" data-method="put" class="validate ">合計請求明細書出力</button>').button(
                { icon: 'ui-icon-disk' }
            )
        );
    }
}

// js読み込み
const scripts = [
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

function downloadExcel() {

    if ($p.selectedIds().length === 0) {
        alert("データが選択されていません。")
        return false
    }

    if ($p.selectedIds().length > 85) {
        alert("選択するデータは85件以下にしてください。")
        return false
    }

    $p.apiGet({
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
            getExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
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

async function getExcel(guid, filename) {

    const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
    const data = new Uint8Array(res.data);
    const workbook = new ExcelJS.Workbook();
    //const filename = "車輛管理表"

    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

    console.log('"[' + $p.selectedIds() + ']"')

    worksheet.name = filename
    //    workbook.removeWorksheet(settingsheet.id)

    $p.apiGet({
        'id': $p.siteId(),
        'data': {
            'View': {
                'ApiDataType': "KeyValues",
                'ApiColumnValueDisplayType': "DisplayValue",
                'GridColumns': [
                        "ClassC",    // 請求書管理№
                        "ClassM",    // 工事件名
                        "ClassI",    // 請求先　担当者
                        "ClassJ",    // 請求先　役職
                        "Num027",    // 合計金額
                        "NumB",   // 消費税率
                        "Num026",    // 消費税
                        "ClassG",    // 請求先　会社名
                        "Class011",   // 振込先
                ],
                'ColumnFilterHash': {
                        'ResultId': '[' + $p.selectedIds() + ']',
                },
                'ColumnSorterHash': {
                        'ClassC': 'asc'
                }
            }
        },
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data
            console.log("res.length")
            console.log(res.length)
            if (res.length === 0) {
                $p.setMessage('#Message', JSON.stringify({
                        Css: 'alert-error',
                        Text: '対象のデータが存在しません。'
                }));
                return false
            }

            let indexArr = {}
            worksheet.getColumn(1).eachCell(function(cell, rowNumber) {
                if (typeof(cell.value) === "number") {
                        indexArr[cell.value - 1] = rowNumber
                }
            });

            const MAX_SITE_INDEX = 5
            for (let index in res) {
                if (index in indexArr) {
                        let rowNumber = indexArr[index]
                        console.log("rowNumber :" + indexArr[index])

                        let record = res[index]
                        console.log(index + "件目＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝")
                        console.log(res[index])
                        let colName = ""

                        colName = "請求書管理№"
                        let number = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "工事件名"
                        let title = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "請求先　担当者"
                        let person = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "請求先　役職"
                        let position = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "合計金額"
                        let amount = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "消費税率"
                        let taxRate = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "消費税"
                        let tax = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "請求先　会社名"
                        let company = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        colName = "振込先"
                        let payee = ( ( record[colName] !== undefined && record[colName] !== null ) ? record[colName] : "")

                        console.log("請求書管理№:" + number)
                        console.log("工事件名:" + title)
                        console.log("請求先　担当者:" + person)
                        console.log("請求先　役職:" + position)
                        console.log("合計金額:" + amount)
                        console.log("消費税率:" + taxRate)
                        console.log("消費税:" + tax)
                        console.log("請求先　会社名:" + company)
                        console.log("振込先:" + payee)

                        worksheet.getRow(rowNumber).getCell(2).value = number //請求書管理№
                        worksheet.getRow(rowNumber).getCell(3).value = title //工事件名
                        worksheet.getRow(rowNumber).getCell(9).value = person //請求先　担当者
                        worksheet.getRow(rowNumber).getCell(10).value = position //請求先　役職
                        worksheet.getRow(rowNumber).getCell(13).value = amount //合計金額
                        worksheet.getRow(rowNumber).getCell(16).value = taxRate //消費税率
                        worksheet.getRow(rowNumber).getCell(17).value = tax //消費税
                        worksheet.getRow(rowNumber).getCell(18).value = company //請求先　会社名
                        worksheet.getRow(rowNumber).getCell(19).value = payee //振込先
                }

            }

            // Force workbook calculation on load
            workbook.calcProperties.fullCalcOnLoad = true;
            outputXlsx(workbook, filename);
            $p.closeDialog($('#TargetYear'));

        },
        'fail': function (error) {
            console.log('通信が失敗しました。');
        },
        'always': function (data) {
            console.log('通信が完了しました。');
        }
    });
}

async function outputXlsx(workbook, filename) {

    const uint8Array = await workbook.xlsx.writeBuffer();
    console.log("uint8Array");
    console.log(uint8Array);
    const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + getNow() + `.xlsx`;
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