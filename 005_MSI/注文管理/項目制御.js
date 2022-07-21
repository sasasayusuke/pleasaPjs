
$p.events.on_editor_load_arr.push(function () {
    // js読み込み
    //const scripts = [
    //    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    //    "https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js",
    //]
    //for ( const script of scripts ) {
    //    console.log(script)
    //    var request = new XMLHttpRequest();
    //    request.open('GET', script, false);
    //    request.send(null);

    //    if (request.status === 200) {
    //        var elm = document.createElement('script');
    //        elm.text = request.responseText;
    //        document.head.appendChild(elm);
    //    }
    //}
    displayCurrencyClass
    displayDeliveryDate()
    document.getElementById(commonGetId("仕入先注文希望納期")).onchange = displayDeliveryDate
    displayDeliveryClass()
    document.getElementById(commonGetId("納入区分")).onchange = displayDeliveryClass

})

// 通貨区分によっての表示制御
function displayCurrencyClass () {
    if (commonGetVal("通貨区分") == WIKI_CURRENCY_CLASS.JPY.name) {
        // 円の場合

        // 非表示化
        let hiddenIds = ["レート", "単価＄", "金額＄"].map(v => commonGetId(v, true, true))
        commonHideElements(hiddenIds)
    } else if ((commonGetVal("通貨区分") == WIKI_CURRENCY_CLASS.USD.name)) {
        // ドルの場合

        // 読み取り専用に変更
        commonChangeReadOnly('単価')
        // 単価＄変更時、単価へ反映
        document.getElementById(commonGetId("単価＄")).onchange = function () {
            commonSetVal("単価", Math.ceil(commonGetVal("レート") * commonGetVal("単価＄")))
        }
    } else {
        commonSetMessage ("通貨区分が不正です。", ERROR)
    }
}


// 仕入先注文希望納期によっての表示制御
function displayDeliveryDate () {
    if (commonGetVal("仕入先注文希望納期") == "日付") {
        // 日付の場合
        // 表示化
        commonHideElements(commonGetId("日付", true, true), false)
    } else {
        // 非表示化
        commonHideElements(commonGetId("日付", true, true))
        commonSetVal("日付", "")
    }
}

// 納入区分によっての表示制御
function displayDeliveryClass () {
    if (commonGetVal("納入区分") == "仕入先直送") {
        // 日付の場合
        // 表示化
        commonHideElements(commonGetId("納入先：直送", true, true))
        commonSetVal("納入先：直送", "")
    } else {
        // 非表示化
        commonHideElements(commonGetId("納入先：直送", true, true), false)
    }
}
