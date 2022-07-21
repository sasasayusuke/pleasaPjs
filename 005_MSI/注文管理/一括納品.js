
const COLUMN_INDEX_ORDER = [
	ID_ORDER = "ResultId"
	, STATUS_ORDER = $p.getColumnName("注文ステータス")
]

$p.events.on_grid_load = function () {
	commonAddButton('bulkDelivery', bulkDelivery, '一括納品')

    html = `
        <div id="confirmDialog" class="dialog" title="一括納品">
            <p id="messageDialog" class="message-dialog"></p>
            <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="executeBulk();" data-icon="ui-icon-disk"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-button-icon-space"> </span>納品</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
    `

    $('#Application').append(html)

}

async function bulkDelivery() {
	$p.clearMessage()
    let selects = $p.selectedIds()
	if ($p.siteId() !== TABLE.ORDER_CONTROL.index) {
		commonSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', ERROR)
	}
	if (commonIsNull(selects)) {
		commonSetMessage(message = '納期確定のレコードを選択してください。', ERROR)
	}
	let records = await commonExportAjax(
		TABLE.ORDER_CONTROL.index
		, COLUMN_INDEX_ORDER
		, {"ResultId": `[${selects.join()}]`}
		, false
		, false
	)
	records = commonConvertCsvTo2D(records.Response.Content)

	waitRecords = records
		.filter(v => v[COLUMN_INDEX_ORDER.indexOf(STATUS_ORDER)] == WIKI_STATUS_ORDER_CONTROL.confirmedDelivery.value)
	let cnt = waitRecords.length
	if (cnt !== records.length) {
		commonSetMessage(message = '納期確定ではないレコードが混在しています。', ERROR)
	}
	document.getElementById("messageDialog").innerHTML = `${cnt}件のレコードを一括納品してよろしいでしょうか？`
	openConfirmDialog()
}


async function executeBulk() {
	$p.closeDialog($('#confirmDialog'));
	await Promise.all(waitRecords.map(async record => {
		return commonUpdateAjax(
			record[COLUMN_INDEX_ORDER.indexOf(ID_ORDER)]
			, {}
			, {}
			, {}
			, {}
			, {}
			, WIKI_STATUS_ORDER_CONTROL.shipped.value
		)
	}))
	let finalAns = window.confirm('更新が完了しました。画面をリロードしますがよろしいでしょうか?')
	if (finalAns) {
		// キャッシュからリロード
		location.reload(false)
	}
}

function openConfirmDialog() {
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#confirmDialog").dialog({
        modal: !0,
        width: "450px",
        resizable: !1
    })
}

