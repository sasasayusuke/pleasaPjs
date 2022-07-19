var numArea = "numArea"
$p.events.on_editor_load = function () {
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

    // 不要項目削除
    commonRemoveElements(['NewMenuContainer', 'OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])

    createDeliveryDialog()
	controlStatuses()
//	createFlow()

}


function createDeliveryDialog() {
    html = `
    <div id="deliveryDialog" class="dialog" title="納品">
        <p class="message-dialog">納品する分だけ入力してください。</p>
        <div id="Results_NumField" class="field-normal both">
            <p class="field-label">
                <label for="${numArea}">納品個数</label>
            </p><div class="field-control">
            <div class="container-normal">
                <input id="${numArea}" name="${numArea}" class="control-textbox valid" type="text" value=${commonGetVal("数量")} placeholder="納品個数" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
            </div>
        </div>
        <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="delivery();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
        </div>
    </div>
    `
    $('#Application').append(html)

}
