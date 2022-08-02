

//async function DestitationPreCheck() {
//    async function DestitationGetSelectedData() {
//        return $p.apiGet({
//            'id': $p.siteId(),
//            'data': {
//                'View': {
//                    'ApiDataType': "KeyValues",
//                    'ApiColumnValueDisplayType': "DisplayValue",
//                    'GridColumns': [
//                        "Status",   // ステータス
//                        "Class027", // 納品先
//                    ],
//                    'ColumnFilterHash': {
//                        'ResultId': '[' + $p.selectedIds() + ']',
//                    },
//                }
//            },
//            'done': function (data) {
//                console.log('通信が成功しました。');
//                console.log(data.Response.Data);
//                var res = data.Response.Data
//                return res
//            }
//        })
//    }

//    const DestitationSelectedData = await DestitationGetSelectedData();

//    if ($p.selectedIds().length === 0) {
//        alert("データが選択されていません。")
//        return false
//    }

//    let index = 0
//    let DestitationStatusCheck = false
//    let DestitationInsertCheck = false

//    for (const elem of DestitationSelectedData.Response.Data) {
//        // ステータスチェック
//        if (DestitationSelectedData.Response.Data[index]["注文ステータス"] !== "納期確定" ) {
//            DestitationStatusCheck = true
//            break;
//        // 納品先チェック
//        } else if ( DestitationSelectedData.Response.Data[index]["納品先"] == null){
//            DestitationInsertCheck = true
//            break;
//        }
//    }
//    index++;
//    if (DestitationStatusCheck) {
//        // 納期確定出ないとき
//        alert("「納期確定」のもののみ選択してください。")
//    } else if (DestitationInsertCheck) {
//        // 納品先入力されていないとき
//        alert("納品先を選択してください。")
//    } else {
//        downloadDestitationExcel();
//    }
//};


async function downloadDestitationExcel() {


    // 帳票フォーマットを検索
    let retDownloadExcel
    try {
        retDownloadExcel = await downloadExcel(FORMAT_ID_DISTINATION)
    } catch (err) {
        console.log(err)
        commonSetMessage("DestinationList:帳票ダウンロードエラー１", ERROR)
        return false
    }
    if (retDownloadExcel.Response.TotalCount !== 1) {
        return false
    }

    // 帳票を格納
    let exc = {}
    exc = retDownloadExcel.Response.Data[0]

    // 帳票を作成
    let retCreateExcel
    try {
        retCreateExcel = await createExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC)
        console.log(retCreateExcel)
    } catch (err) {
        console.log(err)
        commonSetMessage("DestinationList:帳票ダウンロードエラー２", ERROR)
        return false
    }

    try {
        // ファイルをダウンロード
        await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
    } catch (err) {
        console.log(err)
        commonSetMessage("DestinationList:帳票ダウンロードエラー３", ERROR)
        return false
    }

    //let retCreateExcel = await DestitationCreateExcel(JSON.parse(exc.AttachmentsA)[0].Guid, exc.ClassC)
    //console.log(retCreateExcel)

    //// ファイルをダウンロード
    //await DestitationOutputXlsx(retCreateExcel.workbook, retCreateExcel.filename);

    // メッセージを表示
    commonSetMessage("DestinationListを出力しました。", SUCCESS)

//async function DestitationGetSelectedDiplayValue() {
//    let retValue = await $p.apiGet({
//        'id': $p.siteId(),
//        'data': {
//            'View': {
//                'ColumnFilterHash': {
//                    'ResultId': '[' + $p.selectedIds() + ']',
//                },
//            }
//        },
//    })
//    var res = retValue.Response.Data[0]
//    let colArr = []
//    for (let key in res) {
//        colArr.push(key)
//    }
//    return $p.apiGet({
//        'id': $p.siteId(),
//        'data': {
//            'View': {
//                'ApiDataType': "KeyValues",
//                'ApiColumnValueDisplayType': "DisplayValue",
//                'GridColumns': colArr,
//                'ColumnFilterHash': {
//                    'ResultId': '[' + $p.selectedIds() + ']',
//                },
//                'ColumnSorterHash': {
//                    'ClassB': 'asc'
//                }
//            }
//        },
//    })
//}

//$p.events.on_grid_load_arr.push(function () {
//    DestitationAddDownloadButton();
//});

//DestitationAddDownloadButton();
//function DestitationAddDownloadButton() {
//    div = document.getElementById('MainCommandsContainer');
//    mo.observe(div, config);

//    console.log('DestitationAddDownloadButton');
//    if (document.getElementById("DestitationExcelDownload") == null) {
//        $("#MainCommands button:last-child").after(
//            $('<button id="DestitationExcelDownload" onclick="DestitationPreCheck();" data-action="Update" data-method="put" class="validate ">DestitationList出力</button>').button(
//                { icon: 'ui-icon-disk' }
//            )
//        );
//    }
//}



//function DestitationDownloadExcel() {
//    return $p.apiGet({
//        'id': TABLE_ID_EXCEL_FORMAT,
//        'data': {
//            'View': {
//                'ColumnFilterHash': {
//                    "ClassA": FORMAT_ID_DISTINATION
//                }
//            }
//        },
//        'done': function (data) {
//            console.log('通信が成功しました。');
//            console.log(data.Response.Data);
//            var res = data.Response.Data[0]
//            console.log(JSON.parse(res.AttachmentsA)[0].Guid);
//            // getExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
//        },
//        'fail': function (error) {
//            console.log('通信が失敗しました。');
//            if (error.responseJSON.StatusCode !== 404) {
//                console.log("データ取得に失敗しました");
//            }
//        },
//        'always': function (data) {
//            console.log('通信が完了しました。');
//        }
//    })
//}

    async function createExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
        const data = new Uint8Array(res.data);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);
        worksheet.name = filename

        let rowNumber = 2
        for (let record of selectedData.display) {
            cell("A" + rowNumber, worksheet).value = record[MIS_NO]                         // Mis注番
            cell("B" + rowNumber, worksheet).value = record[SCHEDULED_SHIP]                 // 出荷予定日
            cell("C" + rowNumber, worksheet).value = record[CUSTOMER]                       // 顧客名（契約先）
            cell("D" + rowNumber, worksheet).value = record[OFFICE]                         // 事業所名

            let destination = ""
            if (record[DESTINATION].indexOf("国内") >= 0) {
                // 納品先が国内1.2.3.フリーの場合「納品先会社名」
                destination = record[DELIVERY_DESTINATION]
            } else if (record[DESTINATION].indexOf("海外") >= 0) {
                // 納品先が海外1.2.3.フリーの場合「送り先会社名」
                destination = record[SEND_DESTINATION]
            } else {
                // メッセージを表示
                commonSetMessage(`ID：${record["ID"]} 納品先に不正値が入力されています。`, ERROR)
            }
            cell("E" + rowNumber, worksheet).value = destination
            cell("F" + rowNumber, worksheet).value = record[COURIER]                       //  宅配業者
            cell("G" + rowNumber, worksheet).value = record[MODEL_NO]                      //  型番
            cell("H" + rowNumber, worksheet).value = record[VOLUME]                        //  数量
            cell("I" + rowNumber, worksheet).value = record[UNIT_PRICE]                    //  単価
            cell("J" + rowNumber, worksheet).value = record[PRICE]                         //  金額
            cell("K" + rowNumber, worksheet).value = record["検査成績書要否"]
            cell("L" + rowNumber, worksheet).value = record[ENDUSER]                       //  エンドユーザ
            cell("M" + rowNumber, worksheet).value = record[SUPPLIER]                      //  仕入先
            cell("N" + rowNumber, worksheet).value = record[DELIVERY_CLASS]                //  納入区分
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}


