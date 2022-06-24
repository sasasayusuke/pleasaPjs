
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
    utilAddButton('estimate', downloadExcel, '見積書作成')

}