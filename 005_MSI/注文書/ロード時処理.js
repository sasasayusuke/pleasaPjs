
$p.events.on_editor_load = function () {
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
    html = `
        <div id="deliveryDialog" class="dialog" title="納品">

            <div id="Results_NumField" class="field-normal both">
                <p class="field-label">
                    <label for="Results_Num">納品個数</label>
                </p><div class="field-control">
                <div class="container-normal">
                    <input id="Results_Num" name="Results_Num" class="control-textbox valid" type="text" value=${$p.getControl("数量").val()} placeholder="納品個数" data-validate-number="1" data-validate-min-number="0" data-validate-max-number="999999999">
                </div>
            </div>
            <p class="message-dialog"></p>
            <div class="command-center">
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="delivery();" data-icon="ui-icon-disk" data-action="Import" data-method="post"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-icon-disk"> </span>作成</button>
                <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
    `

    $('#Application').append(html)
    let status = utilGetControl('状況')
    // 納品待
    if (status =="200") {
        utilAddButton('openDialog', '納品', openDialog)
    }

}