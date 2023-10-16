
function copySheet(sheetname, copysheet, workbook) {
    workbook.addWorksheet(sheetname)
    //深いコピー (deep copy)
    //workbook._worksheets[workbook._worksheets.length - 1] = Object.assign({}, copysheet)
    //workbook._worksheets[workbook._worksheets.length - 1].id = Math.max(...workbook._worksheets.slice(1).map(v => v.id)) + 1
    //workbook._worksheets[workbook._worksheets.length - 1].orderNo = Math.max(...workbook._worksheets.slice(1).map(v => v.orderNo)) + 1
    //workbook._worksheets[workbook._worksheets.length - 1].name = sheetname
    let newSheet = workbook._worksheets.filter(v => v.name == sheetname)[0]
    newSheet._columns = copysheet._columns
    newSheet._rows = copysheet._rows
    newSheet._workbook = copysheet._workbook
}

function getCell(address, worksheet) {
    try {
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
            // その他のステータスの場合エラー
            let message = `addressに${address}が入力されました。`
            throw new Error(message)
        }
        let rowNo = +row
        let colNo = commonConvertAto1(col)

        return worksheet.getRow(rowNo).getCell(colNo)
    } catch (e) {
        // 再スロー
        throw e
    }

}

// 廃止予定commonUpdateAjaxを利用
async function editSelectedRecord(data, ids = $p.selectedIds()) {
    ids.forEach((elem, index) => {
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


// 廃止予定commonCrerateAjaxを利用
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


/**
 * Excel帳票を出力する関数です。
 * @param {Object} workbook     帳票
 * @param {Object} filename     帳票名
 * @param {Boolean} logging     ログをとるかどうか
 * @param {Array} tableIds      帳票出力テーブルID
 * @param {Array} hashes        登録項目(tableIdsと配列数を合わせてください。)
 *
 * @return createdIds
 */
async function outputXlsx(workbook, filename, logging = false, tableIds, hashes) {

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
    if (logging) {
        let createdIds = await commonPrintLog("", workbook, filename, tableIds, hashes)
        return createdIds
    }
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

// 廃止予定commonGetDateを利用
function getNow() {
    var date = new Date()
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2)
}

// 廃止予定commonGetDateを利用
function getEndOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1")
    // 1ヶ月加えて翌月にします.
    date.setMonth(date.getMonth() + 1)
    // 日付に0を設定し、該当月のの0日（つまり、前月末）にします.
    date.setDate(0)
    return date
}

// 廃止予定commonGetDateを利用
function getStartOfMonth(year, month) {
    var date = new Date(year + "/" + month + "/1")
    // 日付に1を設定します.
    date.setDate(1)
    return date
}

// 廃止予定commonGetDateを利用
function formatYYYYMMDD(date) {
    return date.getFullYear() + "/" + ('00' + (date.getMonth() + 1)).slice(-2) + "/" + ('00' + date.getDate()).slice(-2)
}
