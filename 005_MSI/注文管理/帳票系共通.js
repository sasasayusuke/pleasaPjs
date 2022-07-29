$p.events.on_grid_load_arr.push(function() {
    // js読み込み
    const scripts = [
        "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
        "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",
    ]
    for (const script of scripts) {
        console.log(script)
        var request = new XMLHttpRequest()
        request.open('GET', script, false)
        request.send(null)

        if (request.status === 200) {
            var elm = document.createElement('script')
            elm.text = request.responseText
            document.head.appendChild(elm)
        } else {
            // その他のステータスの場合エラー
            commonSetMessage("帳票スクリプト読み込みエラー", ERROR)
        }
    }
})

async function getSelectedData(culumns, selects, id = $p.siteId(), displayValue = true) {
    return $p.apiGet({
        'id': id,
        'data': {
            'View': {
                'ApiDataType': "KeyValues",
                'ApiColumnValueDisplayType': displayValue ? "DisplayValue" : "Value",
                'GridColumns': culumns,
                'ColumnFilterHash': {
                    'ResultId': '[' + selects + ']',
                },
            }
        },
        'done': function (data) {
            var res = data.Response.Data
            //console.log('通信が成功しました。')
            //console.log(res)
            return res
        }
    })
}

async function editParentRecord(targetID, workbook, filename) {
    const fileBuffer = await workbook.xlsx.writeBuffer()
    const base64 = arrayBufferToBase64(fileBuffer)

    let url = SERVER_URL + "/api/items/" + String(targetID) + "/update"
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
            console.log("success")
            console.log(JSON.stringify(data))
        },
        error: function (data) {
            // Error
            console.log("error")
            console.log(JSON.stringify(data))
        }
    })
}

async function editSelectedRecord(data) {
    $p.selectedIds().forEach((elem, index) => {
        console.log(`${index}: ${elem}`)
        $p.apiUpdate({
            'id': elem,
            data: data,
            'done': function (data) {
                console.log('通信が成功しました。')
            },
            'fail': function (error) {
                console.log('通信が失敗しました。')
            },
            'always': function (data) {
                console.log('通信が完了しました。')
            }
        })
    })
}

async function downloadExcel(formatId) {
    return $p.apiGet({
        'id': TABLE_ID_EXCEL_FORMAT,
        'data': {
            'View': {
                'ColumnFilterHash': {
                    "ClassA": formatId
                }
            }
        },
        'done': function (data) {
            console.log('通信が成功しました。')
            console.log(data.Response.Data)
            var res = data.Response.Data[0]
            console.log(JSON.parse(res.AttachmentsA)[0].Guid)
            // getExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
        },
        'fail': function (error) {
            console.log('通信が失敗しました。')
            if (error.responseJSON.StatusCode !== 404) {
                console.log("データ取得に失敗しました")
            }
        },
        'always': function (data) {
            console.log('通信が完了しました。')
        }
    })
}


async function createParentRecord(tableId, data) {
    return $p.apiCreate({
        id: tableId,
        data: data,
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

function cell(address, worksheet) {
    let row = ""
    let col = ""
    for (let i = 0; i < address.length; i++) {
        if (isNaN(address[i])) {
            col += address[i]
        } else {
            row = address.slice(i)
            break
        }
    }
    if (isNaN(row)) {
        console.log(`addressに${address}が入力されました。`)
        commonSetMessage("adress不正", ERROR)
    }
    let rowNo = +row
    let colNo = commonConvertAto1(col)

    return worksheet.getRow(rowNo).getCell(colNo)
}

async function outputXlsx(workbook, filename) {

    const uint8Array = await workbook.xlsx.writeBuffer()
    console.log("uint8Array")
    console.log(uint8Array)
    const blob = new Blob([uint8Array], { type: 'application/octet-binary' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    a.remove()
}

function base642ab(base64) {
    const str = window.atob(base64)
    const len = str.length
    const bytes = new Uint16Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i)
    }
    return bytes.buffer
}

function dateToSn(unixTimeMillis) { // Date→シリアル値
    return (unixTimeMillis + 9 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000) + (70 * 365 + 17 + 1 + 1)
}

function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ''))
    var buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
    }
    // Blobを作成
    try {
        var blob = new Blob([buffer.buffer], {
            type: 'image/png'
        })
    } catch (e) {
        return false
    }
    return blob
}

function arrayBufferToBase64(buffer) {
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}

function getNow() {
    var date = new Date()
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2)
}

function getEndOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1")
    // 1ヶ月加えて翌月にします.
    date.setMonth(date.getMonth() + 1)
    // 日付に0を設定し、該当月のの0日（つまり、前月末）にします.
    date.setDate(0)
    return date
}

function getStartOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1")
    // 日付に1を設定します.
    date.setDate(1)
    return date
}

function formatYYYYMMDD(date) {
    return date.getFullYear() + "/" + ('00' + (date.getMonth() + 1)).slice(-2) + "/" + ('00' + date.getDate()).slice(-2)
}
