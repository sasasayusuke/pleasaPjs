const SETTING_SHEET_NAME = "setting"
const TEMPLATE_SHEET_NAME = "template"
const URL = "https://reiden.sdt-autolabo.com"
const FORMAT_TABLE_ID = 514

// js読み込み
const scripts = [
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",
]
for ( const script of scripts ) {
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

$p.events.on_editor_load_arr.push(function() {
    addDownloadButton();
});

function addDownloadButton() {
    $p.apiGet({
        'id': FORMAT_TABLE_ID,
        'data': {
            'View': {
                'ColumnFilterHash': {
                    "NumA" : $p.siteId()
                }
            }
        },
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data
            for (let i in res) {
                console.log(data)
                $("#MainCommands button:last-child").after(
                    $('<button id="ExcelDownload' + res[i].ClassA + '" onclick="if (!confirm(\'現在の状態が保存されます。よろしいですか?\')) return false;$p.send($(this));" data-action="Update" data-method="put" class="validate ">' + res[i].ClassB + '</button>').button(
                        { icon: 'ui-icon-disk' }
                    )
                );
            }
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

function downloadExcel(formatID) {
    $p.apiGet({
        'id': FORMAT_TABLE_ID,
        'data': {
            'View': {
                'ColumnFilterHash': {
                    "ClassA" : formatID
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

    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);
    const settingsheet = workbook.getWorksheet(SETTING_SHEET_NAME);

    worksheet.name = filename
    workbook.removeWorksheet(settingsheet.id)

    $p.apiGet({
        'id': $p.id(),
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data[0]
            console.log("res");
            console.log(res);

            let colArr = []
            for (let key in res) {
                colArr.push(key)
            }
            console.log(colArr);

            $p.apiGet({
                'id': $p.id(),
                'data': {
                    'View': {
                        'ApiDataType': "KeyValues",
                        'ApiColumnValueDisplayType': "DisplayValue",
                        'GridColumns': colArr
                    }
                },
                'done': function (data) {
                    console.log('通信が成功しました。');
                    console.log(data.Response.Data);
                    var res = data.Response.Data[0]

                    worksheet.eachRow(function (row, rowNumber) {
                        row.eachCell(function (cell, colNumber) {
                            console.log(rowNumber + " : " + colNumber+ " " + cell.value);
                            //if(x.match(/^\d+$/)){
                            if (cell.value){
                                if (cell.value.toString().match(/^\$\{.+\}$/) ){
                                    let deleteFlg = true
                                    for (let key in res) {
                                        console.log('key:' + key + ' value:' + res[key]);

                                        if (cell.value === "${" + key + "}") {
                                            deleteFlg = false
                                            console.log(rowNumber + " : " + colNumber)
                                            console.log(cell.value)
                                            console.log("TRUE")
                                            if ($p.getColumnName(key).substr(0, 4) === "Date" && res[key] !== "") {
                                                const date = new Date(res[key]);
                                                console.log(date.getTime())
                                                console.log(dateToSn(date.getTime()))
                                                cell.value = dateToSn(date.getTime())
                                            } else if ($p.getColumnName(key).substr(0, 5) === "Check") {
                                                cell.value = (res[key] === true ? "✔" : "")
                                            } else {
                                                cell.value = res[key]
                                            }
                                            break;
                                        }
                                    }
                                    if (deleteFlg) {
                                        cell.value = ""
                                    }
                                }
                            };
                        });
                    });
                    outputXlsx(workbook, filename);
                }
            });
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