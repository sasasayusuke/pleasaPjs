
function openDeliveryDialog() {
    console.log("openDownloadDialog")
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#deliveryDialog").dialog({
        modal: !0,
        width: "500",
        height: "180",
        resizable: !1
    })
}

async function delivery() {
    let volume = +commonGetVal("数量")
    let deliverVolume = +$('#' + numArea).val()
    if (isNaN(volume) || isNaN(deliverVolume) || deliverVolume > volume || deliverVolume < 1) {
        $p.closeDialog($('#deliveryDialog'))
        commonSetMessage("入力数量が異常です。", ERROR)
        return
    }

    if (deliverVolume == volume) {
        // 全納品
        await commonUpdateAjax(
            $p.id()
            , {}
            , {}
            , {}
            , {}
            , {}
            , WIKI_STATUS_ORDER_CONTROL.shipped.index // 出荷済
        )
        $p.closeDialog($('#deliveryDialog'))
        let finalAns = window.confirm('納品されました。画面をリロードしますがよろしいでしょうか?')
		if (finalAns) {
			// キャッシュからリロード
			location.reload(false)
		}
    } else {
        // 分割納品
        let createItemList = [
            "注文区分"
            , "営業担当者"
            , "受注年月日"
            , "会社区分"
            , "顧客名（契約先）"
            , "事業所名"
            , "代理店名"
            , "コミッション率"
            , "エンドユーザ"
            , "MiS見積番号"
            , "客先注文番号"
            , "検査成績書要否"
            , "納入仕様書発行"
            , "型番"
            , "品名"
            , "PKG種類"
            , "PKG詳細"
            , "通貨区分"
            , "レート"
            , "税率"
            , "数量単位(日)"
            , "単価"
            , "金額"
            , "小計"
            , "税額"
            , "単価＄"
            , "金額＄"

            , "MiS注番"
            , "MiS営業"
            , "コミッション率"
            , "注文番号"
            , "希望納期"
            , "回答納期"
            , "連絡事項"
            , "回答希望日"
            , "先行依頼書備考"

            , "仕入先"
            , "注文日"
            , "備考"
            , "希望納期"
            , "日付"
            , "納入区分"
            , "納入先：直送"

            , "確定納期日"
            , "出荷予定日"
            , "出荷完了日"
            , "納品日"
            , "納品先"
            , "会社名"
            , "事業所名"
            , "郵便番号"
            , "住所"
            , "担当者"
            , "電話番号"
            , "FAX番号"
            , "請求先会社名"
            , "請求先住所"
            , "請求先電話番号"
            , "支払条件"
            , "送り先会社名"
            , "送り先住所"
            , "送り先電話番号"
            , "送り先国名"
            , "送り元国名"
            , "宅配業者"
            , "アカウント番号"
            , "備考"

            , "請求書番号"
            , "入金予定日"
            , "請求月日"
        ]
        let classHash = {}
        let numHash = {}
        let dateHash = {}
        let descriptionHash = {}
        let checkHash = {}
        numHash[commonGetId("数量", false)] = deliverVolume

        for (let v of createItemList) {
            key = commonGetId(v, false)
            if (commonIsNull(key)) {
                $p.closeDialog($('#deliveryDialog'))
                commonSetMessage(v + "という項目が存在しません。スクリプトを確認してください。", ERROR)
            }
            if (key.includes("Class")) {
                classHash[key] = commonGetVal(v)
            } else if (key.includes("Num")) {
                numHash[key] = commonGetVal(v)
            } else if (key.includes("Date")) {
                dateHash[key] = commonIsNull(commonGetVal(v)) ? commonGetDateEmpty() : commonGetVal(v)
            } else if (key.includes("Description")) {
                descriptionHash[key] = commonGetVal(v)
            } else if (key.includes("Check")) {
                checkHash[key] = commonGetVal(v)
            }
        }

        await commonUpdateAjax(
            $p.id()
            , {}
            , {
                [commonGetId("数量", false)]: volume - deliverVolume
            }
            , {}
            , {}
            , {}
        )
        await commonCreateAjax(
            TABLE.ORDER_CONTROL.index
            , classHash
            , numHash
            , dateHash
            , descriptionHash
            , checkHash
            , WIKI_STATUS_ORDER_CONTROL.shipped.index // 出荷済
        )
        $p.closeDialog($('#deliveryDialog'))
        let finalAns = window.confirm(deliverVolume + '個分納されました画面をリロードしますがよろしいでしょうか?')
		if (finalAns) {
			// キャッシュからリロード
			location.reload(false)
		}
    }
}