async function createFormat() {

	// 発注管理テーブル
	const COLUMN_INDEX_ORDER = [
		ISSUE_ID_ORDER
		, MAKER_CODE
		, SHOUHIN_CODE
		, SHOUHIN_NAME
		, HYOUJUN_SHIIRE_TANKA
		, IN_SOUKO
		, OUT_SOUKO
		, HACCHUU_SUURYOU
		, STATUS
	] = [
		"IssueId"
		, "ClassA~" + TABLE_ID_SHOUHIN + ",Class099"// 発注仕入先ｺｰﾄﾞ
		, "ClassA"
		, "ClassA~" + TABLE_ID_SHOUHIN + ",DescriptionA"// 商品名
		, "ClassA~" + TABLE_ID_SHOUHIN + ",Num018"// 標準仕入単価
		, "ClassF"
		, "ClassG"
		, "NumA"
		, "Status"
	]

	// RPA実行ログテーブル
	const COLUMN_INDEX_RPALOG = [
		RESULT_ID
		, PROCESS_STATUS
	] = [
		"ResultId"
		, "ClassB"
	]

	// 仕入先情報テーブル
	const COLUMN_INDEX_MAKER = [
		RESULT_ID_M
		, MAKER_CODE_M
	] = [
		"ResultId"
		, "ClassA"
	]

	let ans = window.confirm('フォーマット登録を開始しますか?')
	if (!ans) {
		console.log('フォーマット登録を開始しますか? : Noを押下しました。')
		return
	}
	console.log('フォーマット登録を開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== TABLE_ID_SHORUI_LOG) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let records = await utilExportAjax(
		TABLE_ID_HACCHU_KANRI
		, COLUMN_INDEX_ORDER
	)
	records = utilConvertCsvTo2D(records.Response.Content)
	let header = records.shift()
	if (header.length !== COLUMN_INDEX_ORDER.length) {
		console.log(header)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	// 発注管理連携ステータス : " 確認済", " 出荷済", " 補充済"　のデータを抽出
	records = records.filter(record => {
		return [
			WIKI_STATUS_HACCHU_KANRI.confirmed.value
			, WIKI_STATUS_HACCHU_KANRI.shipped.value
			, WIKI_STATUS_HACCHU_KANRI.filled.value
		].includes(record[COLUMN_INDEX_ORDER.indexOf(STATUS)])
	})

	// エラー処理（異常データなのでRPA中断）
	records.forEach(record => {
		if ([WIKI_STATUS_HACCHU_KANRI.shipped.value, WIKI_STATUS_HACCHU_KANRI.filled.value].includes(record[COLUMN_INDEX_ORDER.indexOf(STATUS)]) && record[COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO)] == "") {
			utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID_ORDER)] + ' 出荷済 または 補充済 のデータは出庫倉庫を入力してください。', type = ERROR)
		}
		if (record[COLUMN_INDEX_ORDER.indexOf(HACCHUU_SUURYOU)] <= 0) {
			utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID_ORDER)] + ' 発注数量は1以上を入力してください。', type = ERROR)
		}
		if (record[COLUMN_INDEX_ORDER.indexOf(IN_SOUKO)] == record[COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO)]) {
			utilSetMessage(message = 'ID:' + record[COLUMN_INDEX_ORDER.indexOf(ISSUE_ID_ORDER)] + ' 入庫倉庫と出庫倉庫が同じです。', type = ERROR)
		}
	})

	// 処理中のRPAログを取得
	let logIds = await utilExportAjax(
		TABLE_ID_RPA_LOG
		, COLUMN_INDEX_RPALOG
	)

	logIds = utilConvertCsvTo2D(logIds.Response.Content)
	let logHeader = logIds.shift()
	if (logHeader.length !== COLUMN_INDEX_RPALOG.length) {
		console.log(logHeader)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	// RPAログ　プロセスステータス : "処理中"　のデータを抽出
	logIds = logIds.filter(v => v[COLUMN_INDEX_RPALOG.indexOf(PROCESS_STATUS)] == WIKI_STATUS_RPA_LOG.inprogress.value)
	if (utilIsNull(logIds)) {
		utilSetMessage(message = 'RPA実行ログ処理中のデータが取得できませんでした。現状この機能はRPAからのみの実行を想定しています。', type = ERROR)
	}
	let logId = logIds[0][COLUMN_INDEX_RPALOG.indexOf(RESULT_ID)]

	// 仕入先ｺｰﾄﾞとResultID変換用に取得
	let makerIds = await utilExportAjax(
		TABLE_ID_SHIIRESAKI
		, COLUMN_INDEX_MAKER
	)

	makerIds = utilConvertCsvTo2D(makerIds.Response.Content)
	let makerHeader = makerIds.shift()
	if (makerHeader.length !== COLUMN_INDEX_MAKER.length) {
		console.log(makerHeader)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}
	let [orderRes, inRes, outRes] = await Promise.all([
		createMakerOrderFormat(records, logId)
		, createInOperateFormat(records, logId)
		, createOutOperateFormat(records, logId)
	])
	if (orderRes.length + inRes.length + outRes.length > 0) {
		let finalAns = window.confirm('登録が完了しました。画面をリロードしますがよろしいでしょうか?')
		if (finalAns) {
			// キャッシュからリロード
			location.reload(false)
		}
	} else {
		utilSetMessage(message = '登録データがありませんでした。', type = WARNING)
	}



	/**
	 * 発注仕入先ｺｰﾄﾞ×入庫倉庫をkeyに分割した発注書を作成
	 *
	 * @param {Array} records
	 * @param {String} logId
	 *
	 */
	async function createMakerOrderFormat(records, logId) {
		// 確認済のデータに絞る
		let confirmedData = records
			// 発注管理連携ステータス : "確認済" のデータを抽出
			.filter(record => record[COLUMN_INDEX_ORDER.indexOf(STATUS)] == WIKI_STATUS_HACCHU_KANRI.confirmed.value)
			// key行（発注仕入先ｺｰﾄﾞ×入庫倉庫）を追加
			.map(record => [...record, record[COLUMN_INDEX_ORDER.indexOf(MAKER_CODE)] + "*" + record[COLUMN_INDEX_ORDER.indexOf(IN_SOUKO)]])

		// 発注仕入先ｺｰﾄﾞ×入庫倉庫ごとに分割
		let makerList = utilDivide2DArray(confirmedData, COLUMN_INDEX_ORDER.length)
		let response = await Promise.all(makerList.map(async record => {
			// 仕入先ｺｰﾄﾞを仕入先ResultIDに変換
			let makerId = convertMakerCodeToResultId(record[0][COLUMN_INDEX_ORDER.indexOf(MAKER_CODE)])
			// 入庫倉庫を倉庫ｺｰﾄﾞに変換
			let soukoKb = convertSoukoValueToIndex(record[0][COLUMN_INDEX_ORDER.indexOf(IN_SOUKO)])
			return utilCreateAjax(
				siteId = TABLE_ID_SHORUI_LOG
				, ClassHash = {
					ClassD : WIKI_SHORUI_FORMAT_KB.order.index
					, ClassE : logId
					, ClassF : makerId
					, ClassG : soukoKb
				}
				, NumHash= {}
				, DateHash= {}
				, DescriptionHash= {
					DescriptionA : utilConvert2DToCsv([[...header, "発注仕入先ｺｰﾄﾞ×入庫倉庫"], ...record])
				}
				, CheckHash = {
					CheckA : true
				}
				, addFunc = ""
			)
		}))
		return response

	}

	/**
	 * 入庫倉庫をkeyに分割した入庫指示書を作成
	 *
	 * @param {Array} records
	 * @param {String} logId
	 *
	 */
	async function createInOperateFormat(records, logId) {
		// 確認済のデータに絞る
		let filledData = records
			// 発注管理連携ステータス : "補充済" のデータを抽出
			.filter(record => record[COLUMN_INDEX_ORDER.indexOf(STATUS)] == WIKI_STATUS_HACCHU_KANRI.filled.value)

		// 入庫倉庫ごとに分割
		let soukoList = utilDivide2DArray(filledData, COLUMN_INDEX_ORDER.indexOf(IN_SOUKO))
		let response = await Promise.all(soukoList.map(async record => {
			// 入庫倉庫を倉庫ｺｰﾄﾞに変換
			let soukoKb = convertSoukoValueToIndex(record[0][COLUMN_INDEX_ORDER.indexOf(IN_SOUKO)])
			return utilCreateAjax(
				siteId = TABLE_ID_SHORUI_LOG
				, ClassHash = {
					ClassD : WIKI_SHORUI_FORMAT_KB.in.index
					, ClassE : logId
					, ClassG : soukoKb
				}
				, NumHash= {}
				, DateHash= {}
				, DescriptionHash= {
					DescriptionA : utilConvert2DToCsv([header, ...record])
				}
				, CheckHash = {
					CheckA : true
				}
				, addFunc = ""
			)
		}))
		return response
	}
	/**
	 * 出庫倉庫をkeyに分割した出庫指示書を作成
	 *
	 * @param {Array} records
	 * @param {String} logId
	 *
	 */
	async function createOutOperateFormat(records, logId) {
		// 確認済のデータに絞る
		let shippedData = records
			// 発注管理連携ステータス : "出庫済" のデータを抽出
			.filter(record => record[COLUMN_INDEX_ORDER.indexOf(STATUS)] == WIKI_STATUS_HACCHU_KANRI.shipped.value)

		// 出庫倉庫ごとに分割
		let soukoList = utilDivide2DArray(shippedData, COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO))
		let response = await Promise.all(soukoList.map(async record => {
			// 出庫倉庫を倉庫ｺｰﾄﾞに変換
			let soukoKb = convertSoukoValueToIndex(record[0][COLUMN_INDEX_ORDER.indexOf(OUT_SOUKO)])
			return utilCreateAjax(
				siteId = TABLE_ID_SHORUI_LOG
				, ClassHash = {
					ClassD : WIKI_SHORUI_FORMAT_KB.out.index
					, ClassE : logId
					, ClassG : soukoKb
				}
				, NumHash= {}
				, DateHash= {}
				, DescriptionHash= {
					DescriptionA : utilConvert2DToCsv([header, ...record])
				}
				, CheckHash = {
					CheckA : true
				}
				, addFunc = ""
			)
		}))
		return response
	}

	function convertMakerCodeToResultId(makerCode) {
		return makerIds[makerIds.map(v => v[COLUMN_INDEX_MAKER.indexOf(MAKER_CODE_M)]).indexOf(makerCode)][COLUMN_INDEX_MAKER.indexOf(RESULT_ID_M)]
	}
}

