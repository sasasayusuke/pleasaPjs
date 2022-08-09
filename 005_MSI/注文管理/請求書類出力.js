
// 国内ならfalse 海外ならtrue
async function downloadClaimExcel(foreignFlg) {

    // 帳票フォーマットを検索
    let retClaimDownloadExcel
    let retReceiptDowmloadExcel
    let retDeliveryDowmloadExcel
    let retStorageClaimDowmloadExcel
    let retInvoiceDownloadExcel
    let retPackingDownloadExcel

    // 帳票を格納
    let excClaim = {}
    let excReceipt = {}
    let excDelivery = {}
    let excStorageClaim = {}
    let excInvoice = {}
    let excPacking = {}

    let printClaimFlg = false
    let printReceiptFlg = false
    let printDeliveryFlg = false
    let printStorageClaimFlg = false
    let printInvoiceFlg = false
    let printPackingFlg = false

    let today = formatYYYYMMDD(new Date())
    let total = 0
    let subTotal = 0
    let taxPriceTotal = 0
    let createData = {}

    let claimId = ""
    let invoiceId = ""

    let seNo = ""
    let ivNo = ""

    // 全「納品先」が一致してるので1行目から取得
    // 国内の場合
    if (!foreignFlg) {
        // 全「顧客名（契約先）」が一致してるので1行目から取得
        // 伝票形式がMiSだった場合
        if (selectedData.display[0]["伝票形式"] == WIKI_VOUCHER_CLASS.MIS.name) {
            // 請求書・納品書・受領書・請求書（保管用）
            printClaimFlg = true
            printReceiptFlg = true
            printDeliveryFlg = true
            printStorageClaimFlg = true
            commonSetMessage('納品出力：国内MIS形式', NORMAL, true, false, selectedData)

        } else if (selectedData.display[0]["伝票形式"] == WIKI_VOUCHER_CLASS.PRIVATE.name) {
            // 請求書（保管用）のみ
            printStorageClaimFlg = true
            commonSetMessage('納品出力：国内専用伝票形式', NORMAL, true, false, selectedData)

        } else {
            commonSetMessage(`伝票形式が不正です。`, ERROR, true)
            return false
        }
    // 海外の場合
    } else {
        if (selectedData.display[0]["伝票形式"] == WIKI_VOUCHER_CLASS.MIS.name) {
            // INVOICE・PACKINGLIST・請求書（保管用）
            printStorageClaimFlg = true
            printInvoiceFlg = true
            printPackingFlg = true
            commonSetMessage('納品出力：海外MIS形式', NORMAL, true, false, selectedData)

        } else if (selectedData.display[0]["伝票形式"] == WIKI_VOUCHER_CLASS.PRIVATE.name) {
            // 請求書（保管用）のみ
            printStorageClaimFlg = true
            commonSetMessage('納品出力：海外専用伝票形式', NORMAL, true, false, selectedData)

        } else {
            commonSetMessage(`伝票形式が不正です。`, ERROR, true)
            return false
        }
    }

    // 合計金額
    total = selectedData.display.reduce((sum, elem) => {
        return sum + (elem[foreignFlg ? PRICE_USD : PRICE])
    }, 0)
    // 小計金額
    subTotal = selectedData.display.reduce((sum, elem) => {
        return sum + (elem[SUB_TOTAL])
    }, 0)
    // 合計金額
    taxPriceTotal = selectedData.display.reduce((sum, elem) => {
        return sum + (elem[TAX_PRICE])
    }, 0)


    try {
        if (printClaimFlg) retClaimDownloadExcel = await downloadExcel(FORMAT_ID_CLAIM)
        if (printReceiptFlg) retReceiptDowmloadExcel = await downloadExcel(FORMAT_ID_RECEIPT)
        if (printDeliveryFlg) retDeliveryDowmloadExcel = await downloadExcel(FORMAT_ID_DELIVERY)
        if (printStorageClaimFlg) retStorageClaimDowmloadExcel = await downloadExcel(FORMAT_ID_STORAGE_CLAIM)
        if (printInvoiceFlg) retInvoiceDownloadExcel = await downloadExcel(FORMAT_ID_INVOICE)
        if (printPackingFlg) retPackingDownloadExcel = await downloadExcel(FORMAT_ID_PACKING)
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー１", ERROR, true)
        return false
    }

    if (foreignFlg) {
        try {
            // Invoice台帳にデータを新規作成（invoice番号発行）
            let retCreateInvoiceParentRecord = await createParentRecord(TABLE_ID_INVOICE_NO, createData)
            // 作成されたレコードのIDを取得
            invoiceId = retCreateInvoiceParentRecord.Id
        } catch (err) {
            console.log(err)
            commonSetMessage("納品書類発行:帳票ダウンロードエラー２", ERROR, true)
            return false
        }
    }
    try {
        createData = {
            "DateA": today,
            "ClassB": invoiceId, // InvoiceNo
            "ClassD": selectedData.value[0][CUSTOMER], // 請求先会社
            "ClassG": selectedData.value[0][MANAGER], // 担当者
            "NumC": subTotal, // 小計
            "NumA": taxPriceTotal, // 税額
            "NumB": total, // 合計金額
        }

        // 請求書台帳にデータを新規作成（請求書番号発行）
        let retCreateClaimParentRecord = await createParentRecord(TABLE_ID_CLAIM_BOOK, createData)
        // 作成されたレコードのIDを取得
        claimId = retCreateClaimParentRecord.Id
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー３", ERROR, true)
        return false
    }

    // 帳票を格納
    if (printClaimFlg) excClaim = retClaimDownloadExcel.Response.Data[0]
    if (printReceiptFlg) excReceipt = retReceiptDowmloadExcel.Response.Data[0]
    if (printDeliveryFlg) excDelivery = retDeliveryDowmloadExcel.Response.Data[0]
    if (printStorageClaimFlg) excStorageClaim = retStorageClaimDowmloadExcel.Response.Data[0]
    if (printInvoiceFlg) excInvoice = retInvoiceDownloadExcel.Response.Data[0]
    if (printPackingFlg) excPacking = retPackingDownloadExcel.Response.Data[0]

    try {
        let recC = await commonGetData(
            ["ClassA"]
            , {"ResultId": `[${claimId}]`}
            , false
            , TABLE_ID_CLAIM_BOOK
        )
        seNo = recC.Response.Data[0]["請求書番号"]
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー４", ERROR, true)
        return false
    }
    if (foreignFlg) {
        try {
            let recI = await commonGetData(
                ["ClassA"]
                , {"ResultId": `[${invoiceId}]`}
                , false
                , TABLE_ID_INVOICE_NO
            )
            ivNo = recI.Response.Data[0]["InvoiceNo"]
        } catch (err) {
            console.log(err)
            commonSetMessage("納品書類発行:帳票ダウンロードエラー５", ERROR, true)
            return false
        }
    }

    // 帳票を作成
    // 請求書・納品書・受領書・請求書（保管用）
    let retCreateClaimExcel
    let retCreateReceiptExcel
    let retCreateDeliveryExcel
    let retCreateStorageClaimExcel
    let retCreateInvoiceExcel
    let retCreatePackingExcel
    try {
        if (printClaimFlg) retCreateClaimExcel = await createClaimExcel(JSON.parse(excClaim.AttachmentsA)[0].Guid, excClaim.ClassC)
        if (printReceiptFlg) retCreateReceiptExcel = await createReceiptExcel(JSON.parse(excReceipt.AttachmentsA)[0].Guid, excReceipt.ClassC)
        if (printDeliveryFlg) retCreateDeliveryExcel = await createDeliveryExcel(JSON.parse(excDelivery.AttachmentsA)[0].Guid, excDelivery.ClassC)
        if (printStorageClaimFlg) retCreateStorageClaimExcel = await createStorageClaimExcel(JSON.parse(excStorageClaim.AttachmentsA)[0].Guid, excStorageClaim.ClassC)
        if (printInvoiceFlg) retCreateInvoiceExcel = await createInvoiceExcel(JSON.parse(excInvoice.AttachmentsA)[0].Guid, excInvoice.ClassC)
        if (printPackingFlg) retCreatePackingExcel = await createPackingExcel(JSON.parse(excPacking.AttachmentsA)[0].Guid, excPacking.ClassC)
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー６", ERROR, true)
        return false
    }

    try {
        // 請求書台帳に帳票を添付
        if (printClaimFlg) await commonUpdateAttachment(claimId, "AttachmentsA", retCreateClaimExcel.workbook, retCreateClaimExcel.filename)
        if (printReceiptFlg) await commonUpdateAttachment(claimId, "AttachmentsB", retCreateReceiptExcel.workbook, retCreateReceiptExcel.filename)
        if (printDeliveryFlg) await commonUpdateAttachment(claimId, "AttachmentsC", retCreateDeliveryExcel.workbook, retCreateDeliveryExcel.filename)
        if (printStorageClaimFlg) await commonUpdateAttachment(claimId, "AttachmentsD", retCreateStorageClaimExcel.workbook, retCreateStorageClaimExcel.filename)
        if (printInvoiceFlg) await commonUpdateAttachment(claimId, "AttachmentsE", retCreateInvoiceExcel.workbook, retCreateInvoiceExcel.filename)
        if (printPackingFlg) await commonUpdateAttachment(claimId, "AttachmentsF", retCreatePackingExcel.workbook, retCreatePackingExcel.filename)
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー７", ERROR, true)
        return false
    }

    try {
        if (printClaimFlg) await outputXlsx(retCreateClaimExcel.workbook, retCreateClaimExcel.filename)
        if (printReceiptFlg) await outputXlsx(retCreateReceiptExcel.workbook, retCreateReceiptExcel.filename)
        if (printDeliveryFlg) await outputXlsx(retCreateDeliveryExcel.workbook, retCreateDeliveryExcel.filename)
        if (printStorageClaimFlg) await outputXlsx(retCreateStorageClaimExcel.workbook, retCreateStorageClaimExcel.filename)
        if (printInvoiceFlg) await outputXlsx(retCreateInvoiceExcel.workbook, retCreateInvoiceExcel.filename)
        if (printPackingFlg) await outputXlsx(retCreatePackingExcel.workbook, retCreatePackingExcel.filename)
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー８", ERROR, true)
        return false
    }

    try {
        // 選択した注文管理レコードを更新
        updateData = {
            Status: WIKI_STATUS_ORDER_CONTROL.shipped.index
            , [commonGetId("請求書番号", false)]: claimId
            , [commonGetId("出荷完了日", false)]: today
        }
        // 選択した注文管理レコードを更新
        await editSelectedRecord(updateData)
    } catch (err) {
        console.log(err)
        commonSetMessage("納品書類発行:帳票ダウンロードエラー９", ERROR, true)
        return false
    }
    // 画面リロード処理
    let finalAns = window.confirm('画面をリロードします。よろしいでしょうか?')
    if (finalAns) {
        // キャッシュからリロード
        location.reload(false)
    };

    // 請求書
    async function createClaimExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("A5", worksheet).value = selectedData.display[0][CUSTOMER] //会社名
        getCell("W2", worksheet).value = today //請求日
        getCell("W3", worksheet).value = seNo //請求書番号
        getCell("V32", worksheet).value = taxPriceTotal //税額


        let rowNumber = 16
        for (let record of selectedData.display) {
            getCell("B" + rowNumber, worksheet).value = record[CUSTOMER_CH_NO]
            getCell("F" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("N" + rowNumber, worksheet).value = record[VOLUME]
            getCell("R" + rowNumber, worksheet).value = record[UNIT_PRICE]
            getCell("V" + rowNumber, worksheet).value = record[PRICE]
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }

    // 請求書(保管用)
    async function createStorageClaimExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("A4", worksheet).value = selectedData.display[0][CUSTOMER] //会社名
        getCell("W2", worksheet).value = today //請求日
        getCell("W3", worksheet).value = seNo //請求書番号
        getCell("V31", worksheet).value = taxPriceTotal //税額


        let rowNumber = 15
        for (let record of selectedData.display) {
            getCell("B" + rowNumber, worksheet).value = record[CUSTOMER_CH_NO]
            getCell("E" + rowNumber, worksheet).value = record[MIS_NO]
            getCell("H" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("P" + rowNumber, worksheet).value = record[VOLUME]
            getCell("R" + rowNumber, worksheet).value = record[UNIT_PRICE]
            getCell("V" + rowNumber, worksheet).value = record[PRICE]
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }

    // 受領書
    async function createReceiptExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("A5", worksheet).value = selectedData.display[0][CUSTOMER] // 会社名
        getCell("R7", worksheet).value = selectedData.display[0][CUSTOMER] // 会社名
        getCell("S8", worksheet).value = selectedData.display[0][POST_CODE] // 郵便番号
        getCell("R9", worksheet).value = selectedData.display[0][ADDRESS] // 住所
        getCell("R12", worksheet).value = selectedData.display[0][PHONE_NO] // 電話番号
        getCell("G39", worksheet).value = seNo // 請求書番号
        getCell("G40", worksheet).value = today // 納品日
        getCell("V36", worksheet).value = taxPriceTotal // 税額

        let rowNumber = 20
        for (let record of selectedData.display) {
            getCell("B" + rowNumber, worksheet).value = record[CUSTOMER_CH_NO]
            getCell("F" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("N" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("R" + rowNumber, worksheet).value = record[UNIT_PRICE]
            getCell("V" + rowNumber, worksheet).value = record[PRICE]
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }

    // 納品書
    async function createDeliveryExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("A5", worksheet).value = selectedData.display[0][CUSTOMER] // 会社名
        getCell("W2", worksheet).value = today // 納品日
        getCell("W3", worksheet).value = seNo // 請求書番号
        getCell("V32", worksheet).value = taxPriceTotal // 税額

        let rowNumber = 16
        for (let record of selectedData.display) {
            getCell("B" + rowNumber, worksheet).value = record[CUSTOMER_CH_NO]
            getCell("F" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("N" + rowNumber, worksheet).value = record[VOLUME]
            getCell("R" + rowNumber, worksheet).value = record[UNIT_PRICE]
            getCell("V" + rowNumber, worksheet).value = record[PRICE]
            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }

    // Invoice
    async function createInvoiceExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("K6", worksheet).value = ivNo // InvoiceNo
        getCell("K8", worksheet).value = today // 日付
        getCell("C9", worksheet).value = selectedData.display[0][SOLD_TO]
        getCell("C10", worksheet).value = selectedData.display[0][SOLD_TO_ADDRESS]
        getCell("D16", worksheet).value = selectedData.display[0][SOLD_TO_TEL]
        getCell("I9", worksheet).value = selectedData.display[0][SHIP_TO]
        getCell("I10", worksheet).value = selectedData.display[0][SHIP_TO_ADDRESS]
        getCell("I16", worksheet).value = selectedData.display[0][SHIP_TO_TEL]
        getCell("B18", worksheet).value = selectedData.display[0][SHIP_FROM_COUNTRY]
        getCell("B21", worksheet).value = selectedData.display[0][SHIP_TO_COUNTRY]
        getCell("G18", worksheet).value = selectedData.display[0][FORWARDER]
        getCell("B43", worksheet).value = selectedData.display[0][FOREIGN_REMARK]


        let rowNumber = 26
        for (let record of selectedData.display) {
            getCell("C" + rowNumber, worksheet).value = record[ITEM_NAME]
            getCell("E" + rowNumber, worksheet).value = record[MODEL_NO]
            getCell("G" + rowNumber, worksheet).value = record[VOLUME]
            getCell("N" + rowNumber, worksheet).value = record[MEASURE]
            getCell("I" + rowNumber, worksheet).value = record[UNIT_PRICE]
            getCell("K" + rowNumber, worksheet).value = record[PRICE]

            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }

    // Packing
    async function createPackingExcel(guid, filename) {

        const res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" })
        const data = new Uint8Array(res.data)
        const workbook = new ExcelJS.Workbook()

        await workbook.xlsx.load(data)
        const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME)

        worksheet.name = filename

        getCell("K6", worksheet).value = ivNo // InvoiceNo
        getCell("K8", worksheet).value = today // 日付
        getCell("C9", worksheet).value = selectedData.display[0][SOLD_TO]
        getCell("C10", worksheet).value = selectedData.display[0][SOLD_TO_ADDRESS]
        getCell("D16", worksheet).value = selectedData.display[0][SOLD_TO_TEL]
        getCell("I9", worksheet).value = selectedData.display[0][SHIP_TO]
        getCell("I10", worksheet).value = selectedData.display[0][SHIP_TO_ADDRESS]
        getCell("I16", worksheet).value = selectedData.display[0][SHIP_TO_TEL]
        getCell("B18", worksheet).value = selectedData.display[0][SHIP_FROM_COUNTRY]
        getCell("B21", worksheet).value = selectedData.display[0][SHIP_TO_COUNTRY]
        getCell("G18", worksheet).value = selectedData.display[0][FORWARDER]

        let rowNumber = 26
        for (let record of selectedData.display) {
            getCell("C" + rowNumber, worksheet).value = record[ITEM_NAME]
            getCell("E" + rowNumber, worksheet).value = record[MODEL_NO]

            rowNumber = rowNumber + 1
        }

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
    }
}
