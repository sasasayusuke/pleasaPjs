$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumAchievement'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumAchievement
	elem.innerText = '出荷実績集計'

	target.appendChild(elem)
}

const COLUMN_INDEX_ACHIEVEMENT = [
	RESULT_ID
	, YEAR
	, MONTH
	, DOUBLE_FLAG
	, CREATE_TIME
] = [
	"ResultId"
	// 年
	, "ClassB"
	// 月
	, "ClassC"
	// 重複無効フラグ
	, "CheckA"
	// 作成日時
	, "CreatedTime"
]

async function sumAchievement() {
	let ans = window.confirm('出荷実績集計を開始しますか?')
	if (!ans) {
		console.log('出荷実績集計を開始しますか? : Noを押下しました。')
		return
	}
	console.log('出荷実績集計を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== SITE_ID_SHUKKA_JISSEKI) {
		console.log(header)
		utilSetMessage(message = 'サイトIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	await check()
	let records = await utilExportAjax(
		SITE_ID_SHUKKA_JISSEKI
		, COLUMN_INDEX_ACHIEVEMENT
	)

		records = records.Response.Content.split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
		let header = records.shift()
		if (header.length !== COLUMN_INDEX_ACHIEVEMENT.length) {
			console.log(header)
			utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。変数リストを確認してください。', type = ERROR)
		}
		extractData(records)

	function extractData(records) {
		// 重複無効フラグ : チェックなし　のデータを抽出
		records = records.filter(record => record[COLUMN_INDEX_ACHIEVEMENT.indexOf(DOUBLE_FLAG)] == '')

	}
}
