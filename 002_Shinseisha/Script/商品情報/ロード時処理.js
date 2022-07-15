
$p.events.on_editor_load = function () {
	utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
	utilAddButton('createOrderTicket', createOrderTicket, '発注チケット作成')
    window.setInterval(function() {
        Array.from(document.querySelectorAll('td.invalidation span'))
        .filter(v => v.classList.contains('ui-icon-circle-check'))
        .forEach(v => {
			if (!v.parentNode.parentNode.classList.contains('invalid')) {
				v.parentNode.parentNode.classList.add('invalid')
			}
        })
    }, 500)
}
window.onload = function () {

    let elemView = document.getElementById("ViewSelector")

    if (utilIsNull(elemView)) return

    // セット秒毎に実行
    window.setInterval(function() {
        if (+elemView.value == VIEW_SHOUHIN.confirm.index) {
        // 社長確認用
            // 発注根拠色付け
            Array.from(document.querySelectorAll('td.zangetsu'))
                .filter(v => +v.innerHTML <= 1)
                .forEach(v => v.classList.add('red'))
            let elemRecords = document.getElementsByClassName("AddRecord")
            let leng = elemRecords.length
            // 追加ヘッダーの掃除
            if (leng > 2) {
                Array.from(elemRecords).forEach(v => v.remove())
                Array.from(document.querySelectorAll("#Grid thead"))
                    .filter(v => v.innerHTML.replaceAll("\t", "").replaceAll("\n", "") == "")
                    .forEach(v => v.remove())
            }
            if (leng != 2) createHeader()
        }
    }, 100)
}

