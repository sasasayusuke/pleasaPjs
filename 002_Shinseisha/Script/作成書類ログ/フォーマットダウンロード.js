async function download(id) {
    if (isNaN(id)) id = $p.siteId()
    const COLUMN_INDEX_DOWNLOAD = [
        DENPYOU_NO
        , SHORUI_FORMAT_KB
        , SOUKO_KB
        , HACCHU_SHIIRESAKI_CODE
        , TORIKOMI_JOUHOU
    ] = [
        $p.getControl("伝票番号")[0].innerHTML
        , p.getControl("書類フォーマット区分")[0].innerHTML
        , $p.getControl("倉庫区分")[0].innerHTML
        , $p.getControl("発注仕入先ｺｰﾄﾞ")[0].innerHTML
        , $p.getControl("取込情報")[0].innerHTML
    ]

    // 仕入先情報テーブル
	const COLUMN_INDEX_MAKER = [
		MAKER_CODE_M
		, MAKER_1_M
	] = [
        "ClassA"
		, "DescriptionA"
	]

    let ans = window.confirm('フォーマットダウンロードを開始しますか?')
	if (!ans) {
		console.log('フォーマットダウンロードを開始しますか? : Noを押下しました。')
		return
	}
	console.log('フォーマットダウンロードを開始しますか? : Yesを押下しました。')
	if ($p.siteId() !== TABLE_ID_SHORUI_LOG) {
		utilSetMessage(message = 'テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}

	// 仕入先コードと仕入先名１変換用に取得
	let makerCodes = await utilExportAjax(
		TABLE_ID_SHIIRESAKI
		, COLUMN_INDEX_MAKER
	)

	makerCodes = utilConvertCsvTo2D(makerCodes.Response.Content)
	let makerHeader = makerCodes.shift()
	if (makerHeader.length !== COLUMN_INDEX_MAKER.length) {
		console.log(makerHeader)
		utilSetMessage(message = 'スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。', type = ERROR)
	}


    // 未ダウンロードのチェック解除
    await utilUpdateAjax(
        id = id
        , ClassHash = {}
        , NumHash= {}
        , DateHash= {}
        , DescriptionHash= {}
        , CheckHash = {
            CheckA : false
        }
        , addFunc = ""
    )

    let lines = utilConvertCsvTo2D(TORIKOMI_JOUHOU)

    // 書類区分で区別する
    let data = SHORUI_FORMAT_KB = WIKI_SHORUI_FORMAT_KB.order.value ? getOrderFormat() : getInOutFormat()

    function getOrderFormat() {
        let header = [
            "発注日付"
            , "発注№"
            , "行"
            , "仕入先ｺｰﾄﾞ"
            , "仕入先名１"
            , "仕入先名２"
            , "担当者ｺｰﾄﾞ"
            , "買掛区分"
            , "取引区分"
            , "取引区分属性"
            , "納期"
            , "オーダー№"
            , "倉庫ｺｰﾄﾞ"
            , "商品ｺｰﾄﾞ"
            , "商品名"
            , "数量"
            , "数量単位"
            , "単価"
            , "金額"
            , "単価掛率"
            , "課税区分"
            , "消費税率％"
            , "内消費税等"
            , "完納区分"
            , "仕入済数量"
            , "仕入済金額"
            , "仕入済内消費税額"
            , "仕入回数"
            , "最終仕入日"
            , "関連仕伝行数"
            , "行摘要ｺｰﾄﾞ"
            , "行摘要１"
            , "行摘要２"
            , "備考ｺｰﾄﾞ"
            , "備考"
            , "ﾃﾞｰﾀ発生区分"
            , "相手受注№"
            , "入力ﾊﾟﾀｰﾝ№"
            , "先方担当者"
            , "ﾁｪｯｸﾏｰｸ区分"
            , "消費税分類"
            , "伝票消費税計算区分"
            , "明細区分"
        ]
        let i = 1
        for (let line of lines) {
            let data = []
            // 発注日付
            data.push(utilGetDate("", "YYYYMMDD"))
            // 発注№
            data.push(DENPYOU_NO)
            // 行
            data.push(i++)
            // 仕入先ｺｰﾄﾞ
            data.push(HACCHU_SHIIRESAKI_CODE)
            // 仕入先名１
            data.push(convertMakerCodeToMaker1(HACCHU_SHIIRESAKI_CODE))
            // 仕入先名２
            data.push('')
            // 担当者ｺｰﾄﾞ
            // 買掛区分
            // 取引区分
            // 取引区分属性
            // 納期
            // オーダー№
            // 倉庫ｺｰﾄﾞ
            // 商品ｺｰﾄﾞ
            // 商品名
            // 数量
            // 数量単位
            // 単価
            // 金額
            // 単価掛率
            // 課税区分
            // 消費税率％
            // 内消費税等
            // 完納区分
            // 仕入済数量
            // 仕入済金額
            // 仕入済内消費税額
            // 仕入回数
            // 最終仕入日
            // 関連仕伝行数
            // 行摘要ｺｰﾄﾞ
            // 行摘要１
            // 行摘要２
            // 備考ｺｰﾄﾞ
            // 備考
            // ﾃﾞｰﾀ発生区分
            // 相手受注№
            // 入力ﾊﾟﾀｰﾝ№
            // 先方担当者
            // ﾁｪｯｸﾏｰｸ区分
            // 消費税分類
            // 伝票消費税計算区分
            // 明細区分


        }
    }
    function getInOutFormat() {

    }
	function convertMakerCodeToMaker1(makerCode) {
		return makerCodes[makerCodes.map(v => v[COLUMN_INDEX_MAKER.indexOf(MAKER_CODE_M)]).indexOf(makerCode)][COLUMN_INDEX_MAKER.indexOf(MAKER_1_M)]
	}

}