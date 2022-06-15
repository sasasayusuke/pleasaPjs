async function download(id) {
    if (isNaN(id)) id = $p.id()

    // 仕入先情報テーブル
	const COLUMN_INDEX_MAKER = [
		MAKER_CODE_M
		, MAKER_1_M
	] = [
        "ClassA"
		, "DescriptionA"
	]
    const order_headers = ["ID", "発注仕入先ｺｰﾄﾞ", "単位", "商品ｺｰﾄﾞ", "商品名", "標準仕入単価", "入庫倉庫", "出庫倉庫", "発注数量", "連携ステータス", "発注仕入先ｺｰﾄﾞ×入庫倉庫"]
    const inout_headers = ["ID", "発注仕入先ｺｰﾄﾞ", "単位", "商品ｺｰﾄﾞ", "商品名", "標準仕入単価", "入庫倉庫", "出庫倉庫", "発注数量", "連携ステータス"]

    let ans = window.confirm("フォーマットダウンロードを開始しますか?")
	if (!ans) {
		console.log("フォーマットダウンロードを開始しますか? : Noを押下しました。")
		return
	}
	console.log("フォーマットダウンロードを開始しますか? : Yesを押下しました。")
	if ($p.siteId() !== TABLE_ID_SHORUI_LOG) {
		utilSetMessage(message = "テーブルIDを修正してください。スクリプトタブから変数リストを確認してください。", type = ERROR)
	}

	// 仕入先ｺｰﾄﾞと仕入先名１変換用に取得
	let makerCodes = await utilExportAjax(
		TABLE_ID_SHIIRESAKI
		, COLUMN_INDEX_MAKER
	)

	makerCodes = utilConvertCsvTo2D(makerCodes.Response.Content)
	let makerHeader = makerCodes.shift()
	if (makerHeader.length !== COLUMN_INDEX_MAKER.length) {
		console.log(makerHeader)
		utilSetMessage(message = "スクリプトのリンク先が壊れている可能性があります。スクリプトタブから変数リストを確認してください。", type = ERROR)
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

    let userCodeJson = await utilExportUserAjax($p.userId())
    let userCode = userCodeJson.Response.Data[0].UserCode
    let inputData = utilConvertCsvTo2D(utilGetControl("取込情報"))
    let inputHeader = inputData.shift()
    let today = utilGetDate("", "YYYYMMDD")
    let denpyouNo = utilGetControl("伝票番号")
    let orderCode = utilGetControl("発注仕入先ｺｰﾄﾞ")
    let soukoKb = convertSoukoValueToIndex(utilGetControl("倉庫区分"))
    let shoruiFormatKb = convertShoruiValueToIndex(utilGetControl("書類フォーマット区分"))

    // 書類区分で区別する
    let data = []
    let name = ''
    if (shoruiFormatKb == WIKI_SHORUI_FORMAT_KB.order.index) {
        data = getOrderFormat()
        name = WIKI_SHORUI_FORMAT_KB.order.value
    } else if (shoruiFormatKb == WIKI_SHORUI_FORMAT_KB.in.index) {
        data = getInOutFormat()
        name = WIKI_SHORUI_FORMAT_KB.in.value
    } else if (shoruiFormatKb == WIKI_SHORUI_FORMAT_KB.out.index) {
        data = getInOutFormat()
        name = WIKI_SHORUI_FORMAT_KB.out.value
    }
    utilDownloadCsv(utilConvert2DToCsv(data), name + '_' + utilGetDate(date = "", format = "YYYY_MM_DD hh_mm_ss"))

    function getOrderFormat() {
        if (JSON.stringify(inputHeader) !== JSON.stringify(order_headers)) {
            console.log(inputHeader)
            utilSetMessage(message = "取込情報項目の入力内容が不正です。", type = ERROR)
        }
        let outputData = []
        let outputHeader = [
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
        outputData.push(outputHeader)

        let i = 1
        for (let line of inputData) {
            let data = []
            // 発注日付
            data.push(today)
            // 発注№
            data.push("")
            // 行
            data.push(i++)
            // 仕入先ｺｰﾄﾞ
            data.push(orderCode)
            // 仕入先名１
            data.push(convertMakerCodeToMaker1(orderCode))
            // 仕入先名２
            data.push("")
            // 担当者ｺｰﾄﾞ
            data.push(userCode)
            // 買掛区分
            data.push(utilGetControl("買掛区分_発注"))
            // 取引区分
            data.push(utilGetControl("取引区分_発注"))
            // 取引区分属性
            data.push(utilGetControl("取引区分属性_発注"))
            // 納期
            data.push(utilGetControl("納期_発注"))
            // オーダー№
            data.push(denpyouNo)
            // 倉庫ｺｰﾄﾞ
            data.push(soukoKb)
            // 商品ｺｰﾄﾞ
            data.push(line[inputHeader.indexOf("商品ｺｰﾄﾞ")])
            // 商品名
            data.push(line[inputHeader.indexOf("商品名")])
            // 数量
            data.push(line[inputHeader.indexOf("発注数量")])
            // 数量単位
            data.push(line[inputHeader.indexOf("単位")])
            // 単価
            data.push(line[inputHeader.indexOf("標準仕入単価")])
            // 金額
            data.push(line[inputHeader.indexOf("発注数量")] * line[inputHeader.indexOf("標準仕入単価")])
            // 単価掛率
            data.push(utilGetControl("単価掛率_発注"))
            // 課税区分
            data.push(utilGetControl("課税区分_発注"))
            // 消費税率％
            data.push(utilGetControl("消費税率%_発注"))
            // 内消費税等
            data.push(utilGetControl("内消費税等_発注"))
            // 完納区分
            data.push(utilGetControl("完納区分_発注"))
            // 仕入済数量
            data.push(utilGetControl("仕入済数量_発注"))
            // 仕入済金額
            data.push(utilGetControl("仕入済金額_発注"))
            // 仕入済内消費税額
            data.push(utilGetControl("仕入済内消費税額_発注"))
            // 仕入回数
            data.push(utilGetControl("仕入回数_発注"))
            // 最終仕入日
            data.push(utilGetControl("最終仕入日_発注"))
            // 関連仕伝行数
            data.push(utilGetControl("関連仕伝行数_発注"))
            // 行摘要ｺｰﾄﾞ
            data.push(utilGetControl("行摘要ｺｰﾄﾞ_発注"))
            // 行摘要１
            data.push(utilGetControl("行摘要１_発注"))
            // 行摘要２
            data.push(utilGetControl("行摘要２_発注"))
            // 備考ｺｰﾄﾞ
            data.push(utilGetControl("備考ｺｰﾄﾞ"))
            // 備考
            data.push(utilGetControl("備考"))
            // ﾃﾞｰﾀ発生区分
            data.push(utilGetControl("ﾃﾞｰﾀ発生区分"))
            // 相手受注№
            data.push(utilGetControl("相手受注№_発注"))
            // 入力ﾊﾟﾀｰﾝ№
            data.push(utilGetControl("入力ﾊﾟﾀｰﾝ№_発注"))
            // 先方担当者
            data.push(utilGetControl("先方担当者_発注"))
            // ﾁｪｯｸﾏｰｸ区分
            data.push(utilGetControl("ﾁｪｯｸﾏｰｸ区分"))
            // 消費税分類
            data.push(utilGetControl("消費税分類_発注"))
            // 伝票消費税計算区分
            data.push(utilGetControl("伝票消費税計算区分_発注"))
            // 明細区分
            data.push(utilGetControl("明細区分_発注"))

            outputData.push(data)
        }
        return outputData
    }
    function getInOutFormat() {
        if (JSON.stringify(inputHeader) !== JSON.stringify(inout_headers)) {
            console.log(inputHeader)
            utilSetMessage(message = "取込情報項目の入力内容が不正です。", type = ERROR)
        }
        let outputData = []
        let outputHeader = [
            "伝票日付"
            , "伝票№"
            , "処理連番"
            , "行"
            , "入出庫区分"
            , "取引区分"
            , "取引区分属性"
            , "倉庫ｺｰﾄﾞ"
            , "商品ｺｰﾄﾞ"
            , "数量"
            , "数量単位"
            , "単価"
            , "金額"
            , "行摘要ｺｰﾄﾞ"
            , "行摘要１"
            , "行摘要２"
            , "備考ｺｰﾄﾞ"
            , "備考"
            , "ﾃﾞｰﾀ発生区分"
            , "相手処理連番"
            , "ﾁｪｯｸﾏｰｸ区分"
            , "商品名"
        ]

        outputData.push(outputHeader)

        let i = 1
        for (let line of inputData) {
            let data = []
            //伝票日付
            data.push(today)
            //伝票№
            data.push(denpyouNo)
            //処理連番
            data.push("")
            //行
            data.push(i++)
            //入出庫区分
            data.push(shoruiFormatKb)
            //取引区分
            data.push(utilGetControl("取引区分_発注"))
            //取引区分属性
            data.push(utilGetControl("取引区分属性_発注"))
            //倉庫ｺｰﾄﾞ
            data.push(soukoKb)
            //商品ｺｰﾄﾞ
            data.push(line[inputHeader.indexOf("商品ｺｰﾄﾞ")])
            //数量
            data.push(line[inputHeader.indexOf("発注数量")])
            //数量単位
            data.push(line[inputHeader.indexOf("単位")])
            //単価
            data.push(utilGetControl("単価_入出庫"))
            //金額
            data.push(utilGetControl("金額_入出庫"))
            //行摘要ｺｰﾄﾞ
            data.push(utilGetControl("行摘要ｺｰﾄﾞ_入出庫"))
            //行摘要１
            data.push(utilGetControl("行摘要１_入出庫"))
            //行摘要２
            data.push(utilGetControl("行摘要２_入出庫"))
            //備考ｺｰﾄﾞ
            data.push(utilGetControl("備考ｺｰﾄﾞ"))
            //備考
            data.push(utilGetControl("備考"))
            //ﾃﾞｰﾀ発生区分
            data.push(utilGetControl("ﾃﾞｰﾀ発生区分"))
            //相手処理連番
            data.push(utilGetControl("相手処理連番_入出庫"))
            //ﾁｪｯｸﾏｰｸ区分
            data.push(utilGetControl("ﾁｪｯｸﾏｰｸ区分"))
            //商品名
            data.push(line[inputHeader.indexOf("商品名")])

            outputData.push(data)

        }
        return outputData
    }

	function convertMakerCodeToMaker1(makerCode) {
		return makerCodes[makerCodes.map(v => v[COLUMN_INDEX_MAKER.indexOf(MAKER_CODE_M)]).indexOf(makerCode)][COLUMN_INDEX_MAKER.indexOf(MAKER_1_M)]
	}

}