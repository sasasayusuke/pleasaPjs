
const COLUMN_INDEX_CONFIRM = [
	ISSUE_ID_CONFIRM
	, SHOUHIN_CODE_CONFIRM
	, IN_SOUKO_CONFIRM
	, KINGAKU_CONFIRM
	, STATUS_CONFIRM
] = [
	"IssueId"
	, $p.getColumnName("商品ｺｰﾄﾞ")
	, $p.getColumnName("入庫倉庫")
	, $p.getColumnName("金額")
	, $p.getColumnName("連携ステータス")
]

async function bulkConfirm() {
	$p.clearMessage()
	if ($p.siteId() !== TABLE_ID_HACCHU_KANRI) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	if (utilIsNull($p.selectedIds())) {
		utilSetMessage(message = '確認待ちのレコードを選択してください。', type = WARNING)
		return
	}
	let records = await utilExportAjax(
		TABLE_ID_HACCHU_KANRI
		, COLUMN_INDEX_CONFIRM
		, {"IssueId": `[${$p.selectedIds().join()}]`}
		, false
		, false
	)
	records = utilConvertCsvTo2D(records.Response.Content)

	waitRecords = records
		.filter(v => v[COLUMN_INDEX_CONFIRM.indexOf(STATUS_CONFIRM)] == WIKI_STATUS_HACCHU_KANRI.waiting.value)
	let cnt = waitRecords.length
	let val = waitRecords.reduce((sum, elem) => {
		return sum + +elem[COLUMN_INDEX_CONFIRM.indexOf(KINGAKU_CONFIRM)]
	}, 0)
	if (cnt !== records.length) {
		utilSetMessage(message = '確認待ちではないレコードが混在しています。', type = WARNING)
		return
	}
	let ans = window.confirm(`${cnt}件のレコードを確認済にしてよろしいでしょうか？　合計金額：${val.toLocaleString()}円`)
	if (!ans) {
		console.log('確認済にしてよろしいでしょうか？ : Noを押下しました。')
		return
	}
	console.log('確認済にしてよろしいでしょうか？ : Yesを押下しました。')

	await Promise.all(waitRecords.map(async record => {
		return utilUpdateAjax(
			record[COLUMN_INDEX_CONFIRM.indexOf(ISSUE_ID_CONFIRM)]
			, ClassHash = {
				ClassD : WIKI_TEKIYOU_KB.order.index
				, ClassE : WIKI_TEKIYOU_KB.order.index
			}
			, NumHash= {}
			, DateHash= {
				DateB : utilGetDate()
			}
			, DescriptionHash= {}
			, CheckHash = {}
			, Status = WIKI_STATUS_HACCHU_KANRI.confirmed.index
		)
	}))
	let finalAns = window.confirm('更新が完了しました。画面をリロードしますがよろしいでしょうか?')
	if (finalAns) {
		// キャッシュからリロード
		location.reload(false)
	}
}
