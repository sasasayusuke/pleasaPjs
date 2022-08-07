
async function preCheckClaim() {
async function commonGetData() {
    return $p.apiGet({
        'id': $p.siteId(),
        'data': {
            'View': {
                'ApiDataType': "KeyValues",
                'ApiColumnValueDisplayType': "DisplayValue",
                'GridColumns': [
                    "ClassZ",   // 担当者
                    "Status",     // 注文ステータス
                    "Class027",     // 納品先
                // 請求書・納品書
                    // "ClassA",   // 注文管理番号
                    "Class003",   // 会社名
                    "Class016",   // お支払条件
                    "Class015",   // 請求書番号
                    "NumH",   // 税額
                // 受領書
                    "DescriptionA",   // 住所
                    "Class005",   // 電話番号
                // Invoice・PackingList
                    "Class007",   // 請求先会社名
                    "DescriptionE",   // 請求先住所
                    "ClassL",   // 送り先会社名
                    "DescriptionC",   // 送り先住所
                    "Class006",   // 送り先電話番号
                    "Class010",   // 送り先国名
                    "Class013",   // 送り元国名
                    "Class011",   // 宅配業者
                    "Class014",   // 支払条件
                    "DescriptionN",   // 備考
                    "ClassF",   // 顧客名（契約先）

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
const selectedData = await commonGetData();

async function getCompanyID() {
    return $p.apiGet({
        'id': $p.siteId(),
        'data': {
        'View': {
            'ApiDataType': "KeyValues",
            'ApiColumnValueDisplayType': "Value",
            'ColumnFilterHash': {
            'ResultId': "[" + $p.selectedIds() + "]",
            },
            'GridColumns': ["ClassF"],  // 会社名のID
        }
        },
        'done': function (data) {
        console.log('通信が成功しました。');
        console.log(data);

        },
        'always': function (data) {
        console.log('通信が完了しました。');
        }
    })
}
const getCompanyTableID = await getCompanyID();


if ($p.selectedIds().length === 0) {
    alert("データが選択されていません。")
    return false
}

if ($p.selectedIds().length > 15) {
    alert("選択するデータは15件以下にしてください。")
    return false
}



let oldList = []
let newList = []
let index = 0
let DomesticDataCheck = false
let overseasDataCheck = false
let claimStatusCheck = false
let deliveryCheck = false

for (const elem of selectedData.Response.Data) {

    // 注文ステータスが「納期確定」かつ、納品先項目がnullではない場合
    if(selectedData.Response.Data[index]["納品先"] !== null && selectedData.Response.Data[index]["注文ステータス"] == "納期確定"){

            //! 国内の場合
            if (selectedData.Response.Data[index]["納品先"].indexOf("国内") == 0){
                // indexが0の場合
                if(index == 0){
                    // 比較対象の項目をold変数に格納
                    // oldList.push(elem["注文管理番号"])

                    oldList.push(elem["会社名"])
                    oldList.push(elem["お支払い条件"])
                    oldList.push(elem["請求書番号"])
                    oldList.push(elem["税額"])
                    oldList.push(elem["住所"])
                    oldList.push(elem["電話番号"])
                    oldList.push(getCompanyTableID.Response.Data[index]["顧客名（契約先）"])

                // indexが0でない場合
            } else if(index !== 0){
                // 比較対象の項目をnew変数に格納
                // newList.push(elem["注文管理番号"])
                newList.push(elem["会社名"])
                newList.push(elem["お支払い条件"])
                newList.push(elem["請求書番号"])
                newList.push(elem["税額"])
                newList.push(elem["住所"])
                newList.push(elem["電話番号"])
                newList.push(getCompanyTableID.Response.Data[index]["顧客名（契約先）"])
                // old変数とnew変数の内容が一致していない場合
                if(oldList.toString() !== newList.toString()){
                    // エラー
                    DomesticDataCheck = true
                    break;
                    // old変数とnew変数の内容が一致している場合
                } else if(oldList.toString() == newList.toString()){
                    // new変数の値をold変数に代入
                    oldList = newList
                };

            }
        //! 海外の場合
        } else if(selectedData.Response.Data[index]["納品先"].indexOf("海外") == 0){
            // indexが0の場合
            if(index == 0){
                // 比較対象の項目をold変数に格納
                oldList.push(getCompanyTableID.Response.Data[index]["顧客名（契約先）"])
                // 海外情報
                oldList.push(elem["請求先会社名"])
                oldList.push(elem["請求先住所"])
                oldList.push(elem["送り先会社名"])
                oldList.push(elem["送り先住所"])
                oldList.push(elem["送り先電話番号"])
                oldList.push(elem["送り先国名"])
                oldList.push(elem["送り元国名"])
                oldList.push(elem["宅配業者"])
                oldList.push(elem["支払条件"])
                oldList.push(elem["備考"])


                // indexが0でない場合
            } else if(index !== 0){
                // 比較対象の項目をnew変数に格納
                newList.push(getCompanyTableID.Response.Data[index]["顧客名（契約先）"])
                // 海外情報
                newList.push(elem["請求先会社名"])
                newList.push(elem["請求先住所"])
                newList.push(elem["送り先会社名"])
                newList.push(elem["送り先住所"])
                newList.push(elem["送り先電話番号"])
                newList.push(elem["送り先国名"])
                newList.push(elem["送り元国名"])
                newList.push(elem["宅配業者"])
                newList.push(elem["支払条件"])
                newList.push(elem["備考"])
                // old変数とnew変数の内容が一致していない場合
                if(oldList.toString() !== newList.toString()){
                    // エラー
                    overseasDataCheck = true
                    break;
                    // old変数とnew変数の内容が一致している場合
                } else if(oldList.toString() == newList.toString()){
                    // new変数の値をold変数に代入
                    oldList = newList
                };

                // ステータスチェック
                if(selectedData.Response.Data[index]["注文ステータス"] !== "納期確定"){
                    claimStatusCheck = true
                    break;
                }

                }
            }

    } else if (selectedData.Response.Data[index]["注文ステータス"] !== "納期確定") {

        claimStatusCheck = true
        break;

    } else {
        deliveryCheck = true
        break;
    }

index++;
};

if(claimStatusCheck){
alert("注文ステータスが納期確定のデータのみを選んでください。")
} else if (deliveryCheck){
alert("納品先が入力されていません。\n納品先を入力したデータのみを選択してください。")
} else if (DomesticDataCheck){
alert("納品管理タブの国内納品先情報\nが一致したレコードを選択してください。")
} else if (overseasDataCheck) {
alert("納品管理タブの海外納品先情報\nが一致したレコードを選択してください。")
} else {
claimMain();
}


}


async function claimMain() {

// 帳票フォーマットを検索
let retClaimDownloadExcel
let retReceiptDowmloadExcel
let retDeliveryDowmloadExcel
let retStorageClaimDowmloadExcel
let retInvoiceDownloadExcel
let retPackingDownloadExcel
try {
    retClaimDownloadExcel = await claimDownloadExcel()  // 請求書
    retReceiptDowmloadExcel = await receiptDownloadExcel() // 受領書
    retDeliveryDowmloadExcel = await deliveryDownloadExcel() // 納品書
    retStorageClaimDowmloadExcel = await storageClaimDowmloadExcel() // 請求書(保管用)
    retInvoiceDownloadExcel = await invoiceDowmloadExcel() // Invoice
    retPackingDownloadExcel = await packingDowmloadExcel() // PackingList

} catch (err) {
    console.log(err)
    return false
}


//async function getDeliveryData(){
//        return $p.apiGet({
//            'id': $p.siteId(),
//            'data': {
//                'View': {
//                'ApiDataType': "KeyValues",
//                'ApiColumnValueDisplayType': "DisplayValue",
//                'GridColumns': [
//                        "Class027",     // 納品先
//                        "NumG", // 小計
//                        "NumH", // 税額
//                        "NumF", // 金額
//                        "ClassB", // 営業担当者
//                        "ClassF", // 顧客名（契約先）
//            ],
//            'ColumnFilterHash': {
//                'ResultId': '[' + $p.selectedIds() + ']',
//            },
//    }
    //},

    //    'done': function (data) {
    //        console.log('通信が成功しました。');
    //        console.log(data.Response.Data);
    //        var res = data.Response.Data
    //        return res
    //    }
    //    })
    //};


    //const deliverySelectedData = await getDeliveryData();

    let companyName = deliverySelectedData.Response.Data[0]["顧客名（契約先）"]

// ClassI : 伝票形式　 DescriptionB:
//! 会社情報TBLから取る処理
//! 会社で比較でなく、IDで比較したい
let records = await commonExportAjax(
TABLE_ID_COMPANY_INFO
, ["ResultId","Title", "ClassI", "DescriptionB"]
)

records = commonConvertCsvTo2D(records.Response.Content)

let paymentTerms = records.filter(key => key[1] == companyName)[0][3]
let companyID = records.filter(key => key[1] == companyName)[0][0]

let index = 0
let tax = 0
let total = 0
let subTotal = 0

for (const elem of deliverySelectedData.Response.Data) {
subTotal += deliverySelectedData.Response.Data[index]["小計"]
tax += deliverySelectedData.Response.Data[index]["税額"]
total += deliverySelectedData.Response.Data[index]["金額"]

index++
}


//!  国内の場合
if (deliverySelectedData.Response.Data[0]["納品先"].indexOf("国内") == 0) {
    // 伝票形式がMiSだった場合
    if(records.filter(key => key[1] == companyName)[0][2] == "MiS"){


        try {
            // 請求書台帳にデータを新規作成（請求書番号発行）
            let retClaimCreateParentRecord = await claimCreateParentRecord(companyID
                                                                        , deliverySelectedData.Response.Data[0]["営業担当者"]
                                                                        , subTotal
                                                                        , tax
                                                                        , total
                                                                        , paymentTerms)
            // 作成されたレコードのIDを取得
            let claimTargetID = retClaimCreateParentRecord.Id

            // 選択した注文管理レコードを更新
            await claimEditSelectedRecord(claimTargetID)

            // 帳票を作成
            // 請求書・納品書・受領書・請求書（保管用）
            var res = retClaimDownloadExcel.Response.Data[0]
            let retClaimCreateExcel = await ClaimCreateExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC, paymentTerms)
            console.log(retClaimCreateExcel)

            var res2 = retReceiptDowmloadExcel.Response.Data[0]
            let retReceiptCreateExcel = await ReceiptCreateExcel(JSON.parse(res2.AttachmentsA)[0].Guid, res2.ClassC)
            console.log(retReceiptCreateExcel)

            var res3 = retDeliveryDowmloadExcel.Response.Data[0]
            let retDeliveryCreateExcel = await DeliveryCreateExcel(JSON.parse(res3.AttachmentsA)[0].Guid, res3.ClassC, paymentTerms)
            console.log(retDeliveryCreateExcel)

            var res4 = retStorageClaimDowmloadExcel.Response.Data[0]
            let retStorageClaimCreateExcel = await StorageClaimCreateExcel(JSON.parse(res4.AttachmentsA)[0].Guid, res4.ClassC, paymentTerms)
            console.log(retStorageClaimCreateExcel)

            // 請求書台帳に帳票を添付
            await claimEditParentRecord(claimTargetID, retClaimCreateExcel.workbook, retClaimCreateExcel.filename);
            await claimEditParentRecord(claimTargetID, retReceiptCreateExcel.workbook, retReceiptCreateExcel.filename);
            await claimEditParentRecord(claimTargetID, retDeliveryCreateExcel.workbook, retDeliveryCreateExcel.filename);
            await claimEditParentRecord(claimTargetID, retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);


            // ファイルをダウンロード //TODO 引数追加 or 関数使いまわし
            await claimOutputXlsx(retClaimCreateExcel.workbook, retClaimCreateExcel.filename);
            await claimOutputXlsx(retReceiptCreateExcel.workbook, retReceiptCreateExcel.filename);
            await claimOutputXlsx(retDeliveryCreateExcel.workbook, retDeliveryCreateExcel.filename);
            await claimOutputXlsx(retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);

            // ダイアログをクローズ
            $p.closeDialog($('#DownloadClaimExcelDialog'));

            // 画面リロード処理
            let finalAns = window.confirm('画面をリロードします。よろしいでしょうか?')
            if (finalAns) {
                // キャッシュからリロード
                location.reload(false)
            };

            // メッセージを表示
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-success',
                Text: 'エクセルファイルを出力しました。'
            }));


        } catch (err) {
            console.log(err)
            return false
        }

    // 国内で専用伝票が選ばれた場合
    } else if(records.filter(key => key[1] == companyName)[0][2] == "専用伝票"){

        // 請求書台帳にデータを新規作成（請求書番号発行）
        let retClaimCreateParentRecord
        try {
            retClaimCreateParentRecord = await claimCreateParentRecord(companyID
                                                                        , deliverySelectedData.Response.Data[0]["営業担当者"]
                                                                        , subTotal
                                                                        , tax
                                                                        , total
                                                                        , paymentTerms)
            // 作成されたレコードのIDを取得
            let claimTargetID = retClaimCreateParentRecord.Id

            // 選択した注文管理レコードを更新
            await claimEditSelectedRecord(claimTargetID)

            // 帳票を作成
            // 請求書（保管用）
            var res = retStorageClaimDowmloadExcel.Response.Data[0]
            let retStorageClaimCreateExcel = await StorageClaimCreateExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC, paymentTerms)
            console.log(retStorageClaimCreateExcel)

            // 請求書台帳に帳票を添付
            await claimEditParentRecord(claimTargetID, retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);


            // ファイルをダウンロード
            await claimOutputXlsx(retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);

            // ダイアログをクローズ
            $p.closeDialog($('#DownloadClaimExcelDialog'));

            // 画面リロード処理
            let finalAns = window.confirm('画面をリロードします。よろしいでしょうか?')
            if (finalAns) {
                // キャッシュからリロード
                location.reload(false)
            };

            // メッセージを表示
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-success',
                Text: 'エクセルファイルを出力しました。'
            }));


        } catch (err) {
            console.log(err)
            return false
        }
    }

//! 海外の場合
} else if(deliverySelectedData.Response.Data[0]["納品先"].indexOf("海外") == 0) {
    // 伝票形式がMiSだった場合
    if(records.filter(key => key[1] == companyName)[0][2] == "MiS"){

        // 請求書台帳にデータを新規作成（請求書番号＋Invoice番号発行）
        let retInvoiceCreateParentRecord
        let retClaimCreateParentRecord
        try {
            retClaimCreateParentRecord = await claimCreateParentRecord(companyID
                                                                        , deliverySelectedData.Response.Data[0]["営業担当者"]
                                                                        , subTotal
                                                                        , tax
                                                                        , total
                                                                        , paymentTerms)
            retInvoiceCreateParentRecord = await invoiceCreateParentRecord()
            // 作成されたレコードのIDを取得
            let invoiceTargetID = retInvoiceCreateParentRecord.Id
            let claimTargetID = retClaimCreateParentRecord.Id

            // 選択した注文管理レコードを更新
            await claimEditSelectedRecord(claimTargetID)
            await invoiceEditSelectedRecord(invoiceTargetID)

            // 帳票を作成
            // INVOICE・PACKINGLIST・請求書（保管用）
            var res = retInvoiceDownloadExcel.Response.Data[0]
            let retInvoiceCreateExcel = await InvoiceCreateExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC)
            console.log(retInvoiceCreateExcel)

            var res2 = retPackingDownloadExcel.Response.Data[0]
            let retPackingCreateExcel = await PackingCreateExcel(JSON.parse(res2.AttachmentsA)[0].Guid, res2.ClassC)
            console.log(retPackingCreateExcel)

            var res3 = retStorageClaimDowmloadExcel.Response.Data[0]
            let retStorageClaimCreateExcel = await StorageClaimCreateExcel(JSON.parse(res3.AttachmentsA)[0].Guid, res3.ClassC, paymentTerms)
            console.log(retStorageClaimCreateExcel)

            // 請求書台帳に帳票を添付
            await claimEditParentRecord(claimTargetID, retInvoiceCreateExcel.workbook, retInvoiceCreateExcel.filename);
            await claimEditParentRecord(claimTargetID, retPackingCreateExcel.workbook, retPackingCreateExcel.filename);
            await claimEditParentRecord(claimTargetID, retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);

            // ファイルをダウンロード //TODO 引数追加 or 関数使いまわし
            await claimOutputXlsx(retInvoiceCreateExcel.workbook, retInvoiceCreateExcel.filename);
            await claimOutputXlsx(retPackingCreateExcel.workbook, retPackingCreateExcel.filename);
            await claimOutputXlsx(retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);


            // 画面リロード処理
            let finalAns = window.confirm('画面をリロードします。よろしいでしょうか?')
            if (finalAns) {
                // キャッシュからリロード
                location.reload(false)
            };

            // メッセージを表示
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-success',
                Text: 'エクセルファイルを出力しました。'
            }));
        } catch (err) {
            console.log(err)
            return false
        }

    } else if(records.filter(key => key[1] == companyName)[0][2] == "専用伝票"){

        // 請求書台帳にデータを新規作成（請求書番号＋Invoice番号発行）
        let retInvoiceCreateParentRecord
        let retClaimCreateParentRecord
        try {
            retClaimCreateParentRecord = await claimCreateParentRecord(companyID
                                                                        , deliverySelectedData.Response.Data[0]["営業担当者"]
                                                                        , subTotal
                                                                        , tax
                                                                        , total
                                                                        , paymentTerms)
            retInvoiceCreateParentRecord = await invoiceCreateParentRecord()
            // 作成されたレコードのIDを取得
            let invoiceTargetID = retInvoiceCreateParentRecord.Id
            let claimTargetID = retClaimCreateParentRecord.Id

            // 選択した注文管理レコードを更新
            await claimEditSelectedRecord(claimTargetID)
            await invoiceEditSelectedRecord(invoiceTargetID)

            // 帳票を作成
            // 請求書（保管用）

            var res = retStorageClaimDowmloadExcel.Response.Data[0]
            let retStorageClaimCreateExcel = await StorageClaimCreateExcel(JSON.parse(res.AttachmentsA)[0].Guid, res.ClassC, paymentTerms)
            console.log(retStorageClaimCreateExcel)

            // 請求書台帳に帳票を添付

            await claimEditParentRecord(claimTargetID, retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);

            // ファイルをダウンロード
            await claimOutputXlsx(retStorageClaimCreateExcel.workbook, retStorageClaimCreateExcel.filename);


            // 画面リロード処理
            let finalAns = window.confirm('画面をリロードします。よろしいでしょうか?')
            if (finalAns) {
                // キャッシュからリロード
                location.reload(false)
            };

            // メッセージを表示
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-success',
                Text: 'エクセルファイルを出力しました。'
            }));
        } catch (err) {
            console.log(err)
            return false
        }

    }

    // 納品先が選ばれてなかった場合
} else if(deliverySelectedData.Response.Data[0]["納品先"] == "") {
    alert("納品先が選択されていません。")
    // 伝票形式がNullだった場合
} else if(records.filter(key => key[1] == companyName)[0][2] == ""){
    alert("選択した会社の伝票形式が入力されていません。")
}



}

async function claimGetSelectedDiplayValue() {
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

// TODO 別テーブルから値を取ってくる
function claimCreateParentRecord(company, manager, subTotal, tax, total, paymentTerms) {
const today = new Date();
return $p.apiCreate({
    id: TABLE_ID_CLAIM_BOOK,
    data: {
        "DateA": formatYYYYMMDD(today),
        "ClassD": company, // 請求先会社
        "ClassG": manager, // 担当者
        "NumC": subTotal, // 小計
        "NumA": tax, // 税額
        "NumB": total, // 合計金額
        "ClassK": paymentTerms,
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

function invoiceCreateParentRecord() {
const today = new Date();
return $p.apiCreate({
    id: TABLE_ID_INVOICE_NO,
    data: {

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

async function claimEditParentRecord(claimTargetID, workbook, filename) {
const fileBuffer = await workbook.xlsx.writeBuffer();
const base64 = arrayBufferToBase64(fileBuffer)


let url = "https://mis-tech.sdt-autolabo.com/api/items/" + String(claimTargetID) + "/update"
let method_name = "POST"
let JSONdata = {
    "ApiVersion": 1.1,
    "AttachmentsHash": {
        "AttachmentsA": [
            {
                "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Name": filename,
                "Base64": base64
            },
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

async function claimEditSelectedRecord(parentID) {
$p.selectedIds().forEach((elem, index) => {
    console.log(`${index}: ${elem}`);
    $p.apiUpdate({
        'id': elem,
        data: {
            Class015: parentID, // 請求書番号
            //! 笹木さんの納品処理とマージしたら下記のステータス変更は消す
            Status: 500,
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

async function invoiceEditSelectedRecord(invoiceParentID) {
$p.selectedIds().forEach((elem, index) => {
    console.log(`${index}: ${elem}`);
    $p.apiUpdate({
        'id': elem,
        data: {
            Class004: invoiceParentID, // InvoiceNo
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

function claimDownloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_CLAIM
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

function receiptDownloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_RECEIPT
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

function deliveryDownloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_DELIVERY
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

function storageClaimDowmloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_CLAIM_STORAGE
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

function invoiceDowmloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_INVOICE
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

function packingDowmloadExcel() {
return $p.apiGet({
    'id': TABLE_ID_EXCEL_FORMAT,
    'data': {
        'View': {
            'ColumnFilterHash': {
                "ClassA": FORMAT_ID_PACKING
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

// 請求書
async function ClaimCreateExcel(guid, filename, paymentTerms) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();
const today = new Date();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(12).getCell(7).value = paymentTerms //支払条件
worksheet.getRow(5).getCell(1).value = resClaimSelectedDiplayValue[0]["会社名"] //会社名
worksheet.getRow(2).getCell(23).value = formatYYYYMMDD(today) //請求日
worksheet.getRow(3).getCell(23).value = resClaimSelectedDiplayValue[0]["請求書番号"] //請求書番号
worksheet.getRow(32).getCell(22).value = resClaimSelectedDiplayValue[0]["税額"] //税額


let rowNumber = 16
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(2).value = record["客先注文番号"]
    worksheet.getRow(rowNumber).getCell(6).value = record["型番"]
    worksheet.getRow(rowNumber).getCell(14).value = record["数量"]
    worksheet.getRow(rowNumber).getCell(18).value = record["単価"]
    worksheet.getRow(rowNumber).getCell(22).value = record["金額"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

// 請求書(保管用)
async function StorageClaimCreateExcel(guid, filename, paymentTerms) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();
const today = new Date();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(11).getCell(7).value = paymentTerms //支払条件
worksheet.getRow(4).getCell(1).value = resClaimSelectedDiplayValue[0]["会社名"] //会社名
worksheet.getRow(2).getCell(23).value = formatYYYYMMDD(today) //請求日
worksheet.getRow(3).getCell(23).value = resClaimSelectedDiplayValue[0]["請求書番号"] //請求書番号
worksheet.getRow(31).getCell(22).value = resClaimSelectedDiplayValue[0]["税額"] //税額


let rowNumber = 15
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(2).value = record["客先注文番号"]
    worksheet.getRow(rowNumber).getCell(5).value = record["MiS番号"]
    worksheet.getRow(rowNumber).getCell(8).value = record["型番"]
    worksheet.getRow(rowNumber).getCell(16).value = record["数量"]
    worksheet.getRow(rowNumber).getCell(18).value = record["単価"]
    worksheet.getRow(rowNumber).getCell(22).value = record["金額"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

// 受領書
async function ReceiptCreateExcel(guid, filename) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(5).getCell(1).value = resClaimSelectedDiplayValue[0]["会社名"] // 会社名
worksheet.getRow(7).getCell(18).value = resClaimSelectedDiplayValue[0]["会社名"] // 会社名
worksheet.getRow(8).getCell(19).value = resClaimSelectedDiplayValue[0]["郵便番号"] // 郵便番号
worksheet.getRow(9).getCell(18).value = resClaimSelectedDiplayValue[0]["住所"] // 住所
worksheet.getRow(12).getCell(18).value = resClaimSelectedDiplayValue[0]["電話番号"] // 電話番号
worksheet.getRow(39).getCell(7).value = resClaimSelectedDiplayValue[0]["請求書番号"] // 請求書番号
worksheet.getRow(40).getCell(7).value = resClaimSelectedDiplayValue[0]["納品日"] // 納品日
worksheet.getRow(36).getCell(22).value = resClaimSelectedDiplayValue[0]["税額"] // 税額

let rowNumber = 20
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(2).value = record["客先注文番号"]
    worksheet.getRow(rowNumber).getCell(6).value = record["型番"]
    worksheet.getRow(rowNumber).getCell(14).value = record["数量"]
    worksheet.getRow(rowNumber).getCell(18).value = record["単価"]
    worksheet.getRow(rowNumber).getCell(22).value = record["金額"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

// 納品書
async function DeliveryCreateExcel(guid, filename, paymentTerms) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(5).getCell(1).value = resClaimSelectedDiplayValue[0]["会社名"] // 会社名
worksheet.getRow(2).getCell(23).value = resClaimSelectedDiplayValue[0]["納品日"] // 納品日
worksheet.getRow(3).getCell(23).value = resClaimSelectedDiplayValue[0]["請求書番号"] // 請求書番号
worksheet.getRow(32).getCell(22).value = resClaimSelectedDiplayValue[0]["税額"] // 税額
worksheet.getRow(12).getCell(7).value = paymentTerms //支払条件


let rowNumber = 16
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(2).value = record["客先注文番号"]
    worksheet.getRow(rowNumber).getCell(6).value = record["型番"]
    worksheet.getRow(rowNumber).getCell(14).value = record["数量"]
    worksheet.getRow(rowNumber).getCell(18).value = record["単価"]
    worksheet.getRow(rowNumber).getCell(22).value = record["金額"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

// Invoice
async function InvoiceCreateExcel(guid, filename) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();
const today = new Date();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(6).getCell(11).value = resClaimSelectedDiplayValue[0]["InvoiceNo"] // InvoiceNo
worksheet.getRow(8).getCell(11).value = formatYYYYMMDD(today)// 日付
worksheet.getRow(9).getCell(3).value = resClaimSelectedDiplayValue[0]["請求先会社名"] // 請求先会社名
worksheet.getRow(10).getCell(3).value = resClaimSelectedDiplayValue[0]["請求先住所"] // 請求書住所
worksheet.getRow(16).getCell(4).value = resClaimSelectedDiplayValue[0]["請求先電話番号"] // 請求先電話番号
worksheet.getRow(9).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先会社名"] // 送り先会社名
worksheet.getRow(10).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先住所"] // 送り先住所
worksheet.getRow(16).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先電話番号"] // 送り先電話番号
worksheet.getRow(18).getCell(2).value = resClaimSelectedDiplayValue[0]["送り元国名"]  // 送り元国名
worksheet.getRow(21).getCell(2).value = resClaimSelectedDiplayValue[0]["送り先国名"]  // 送り先国名
worksheet.getRow(18).getCell(7).value = resClaimSelectedDiplayValue[0]["宅配業者"]  // 宅配業者
worksheet.getRow(21).getCell(7).value = resClaimSelectedDiplayValue[0]["支払条件"]  // 支払条件
worksheet.getRow(43).getCell(2).value = resClaimSelectedDiplayValue[0]["備考"]  // 支払条件


let rowNumber = 26
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(3).value = record["品名"]
    worksheet.getRow(rowNumber).getCell(5).value = record["型番"]
    worksheet.getRow(rowNumber).getCell(7).value = record["数量"]
    // ここは書き込み先N列にする　↓
    worksheet.getRow(rowNumber).getCell(14).value = record["数量単位(日)"]
    worksheet.getRow(rowNumber).getCell(9).value = record["単価"]
    worksheet.getRow(rowNumber).getCell(11).value = record["金額"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

// Packing
async function PackingCreateExcel(guid, filename) {

const res = await axios.get(URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
const data = new Uint8Array(res.data);
const workbook = new ExcelJS.Workbook();
const today = new Date();

await workbook.xlsx.load(data);
const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);

console.log('"[' + $p.selectedIds() + ']"')

worksheet.name = filename
let retClaimSelectedDiplayValue = await claimGetSelectedDiplayValue()
const resClaimSelectedDiplayValue = retClaimSelectedDiplayValue.Response.Data


worksheet.getRow(6).getCell(11).value = resClaimSelectedDiplayValue[0]["InvoiceNo"] // InvoiceNo
worksheet.getRow(8).getCell(11).value = formatYYYYMMDD(today)// 日付
worksheet.getRow(9).getCell(3).value = resClaimSelectedDiplayValue[0]["請求先会社名"] // 請求先会社名
worksheet.getRow(10).getCell(3).value = resClaimSelectedDiplayValue[0]["請求先住所"] // 請求書住所
worksheet.getRow(16).getCell(4).value = resClaimSelectedDiplayValue[0]["請求先電話番号"] // 請求先電話番号
worksheet.getRow(9).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先会社名"] // 送り先会社名
worksheet.getRow(10).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先住所"] // 送り先住所
worksheet.getRow(16).getCell(9).value = resClaimSelectedDiplayValue[0]["送り先電話番号"] // 送り先電話番号
worksheet.getRow(18).getCell(2).value = resClaimSelectedDiplayValue[0]["送り元国名"]  // 送り元国名
worksheet.getRow(21).getCell(2).value = resClaimSelectedDiplayValue[0]["送り先国名"]  // 送り先国名
worksheet.getRow(18).getCell(7).value = resClaimSelectedDiplayValue[0]["宅配業者"]  // 宅配業者
worksheet.getRow(21).getCell(7).value = resClaimSelectedDiplayValue[0]["支払条件"]  // 支払条件


let rowNumber = 26
for (let index in resClaimSelectedDiplayValue) {
    let record = resClaimSelectedDiplayValue[index]
    worksheet.getRow(rowNumber).getCell(3).value = record["品名"]
    worksheet.getRow(rowNumber).getCell(5).value = record["型番"]

    rowNumber = rowNumber + 1
}

// Force workbook calculation on load
workbook.calcProperties.fullCalcOnLoad = true;

return { workbook: workbook, filename: filename + getNow() + `.xlsx` }
}

async function claimOutputXlsx(workbook, filename) {

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
