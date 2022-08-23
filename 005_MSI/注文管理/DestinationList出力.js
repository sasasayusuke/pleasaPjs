
async function downloadDestitationExcel() {


    // 帳票フォーマットを検索
    let retDownloadExcel
    try {
        retDownloadExcel = await downloadExcel(FORMAT_ID_DISTINATION)
    } catch (err) {
        console.log(err)
        commonSetMessage("DestinationList:帳票ダウンロードエラー１", ERROR, true)
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
        commonSetMessage("DestinationList:帳票ダウンロードエラー２", ERROR, true)
        return false
    }

    try {
        // ファイルをダウンロード
        await outputXlsx(retCreateExcel.workbook, retCreateExcel.filename);
    } catch (err) {
        console.log(err)
        commonSetMessage("DestinationList:帳票ダウンロードエラー３", ERROR, true)
        return false
    }


    // メッセージを表示
    commonSetMessage("DestinationListを出力しました。", SUCCESS, true)

    async function createExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
        const data = new Uint8Array(res.data);
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);
        worksheet.name = filename

        let rowNumber = 2
        for (let record of selectedData.display) {
            getCell("A" + rowNumber, worksheet).value = record[SCHEDULED_SHIP]                 // 出荷予定日
            getCell("B" + rowNumber, worksheet).value = record[MIS_NO]                         // MiS番号
            getCell("C" + rowNumber, worksheet).value = record[CUSTOMER]                       // 顧客名（契約先）
            getCell("D" + rowNumber, worksheet).value = record[OFFICE]                         // 事業所名

            let destination = ""
            if (commonIsNull(record[DESTINATION])) {
                // メッセージを表示
                commonSetMessage(`ID：${record["ID"]} 納品先に入力がありません。`, ERROR, true)
            }
            if (record[DESTINATION].indexOf("国内") == 0) {
                // 納品先が国内1.2.3.フリーの場合「納品先会社名」
                destination = record[DELIVERY_COMPANY]
            } else if (record[DESTINATION].indexOf("海外") == 0) {
                // 納品先が海外1.2.3.フリーの場合「送り先会社名」
                destination = record[SHIP_TO]
            } else {
                // メッセージを表示
                commonSetMessage(`ID：${record["ID"]} 納品先に不正値が入力されています。`, ERROR, true)
            }

            getCell("E" + rowNumber, worksheet).value = destination
            getCell("F" + rowNumber, worksheet).value = record[FORWARDER]                     //  宅配業者
            getCell("G" + rowNumber, worksheet).value = record[MODEL_NO]                      //  型番
            getCell("H" + rowNumber, worksheet).value = record[VOLUME]                        //  数量
            getCell("I" + rowNumber, worksheet).value = record[UNIT_PRICE]                    //  単価
            getCell("J" + rowNumber, worksheet).value = record[PRICE]                         //  金額
            getCell("K" + rowNumber, worksheet).value = record["検査成績書要否"]
            getCell("L" + rowNumber, worksheet).value = record[ENDUSER]                       //  エンドユーザ
            getCell("M" + rowNumber, worksheet).value = record[SUPPLIER]                      //  仕入先
            getCell("N" + rowNumber, worksheet).value = record[ARRIVAL_DAY]                   //  入荷日
            getCell("O" + rowNumber, worksheet).value = record[CUSTOMER_CH_NO]                //  客先注文番号

            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}


