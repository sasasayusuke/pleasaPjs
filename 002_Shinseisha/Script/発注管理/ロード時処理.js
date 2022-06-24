let MAKER_CODE_LIST

$p.events.on_editor_load = function () {
    utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	utilQuerySelector(".ui-icon.ui-icon-clock.current-time", true).forEach(v => v.remove())
	utilQuerySelector(".ui-icon.ui-icon-person.current-user", true).forEach(v => v.remove())
	changeWarehouse()
	document.getElementById(utilGetId("入庫倉庫")).onchange = changeWarehouse
	controlReadOnly()
	createFlow()
	// 発注根拠色付け
	Array.from(document.querySelectorAll('div.zangetsu'))
		.filter(v => +v.querySelector('span').innerHTML <= 1)
		.forEach(v => v.classList.add('red'))
}

$p.events.on_grid_load = function () {
	utilAddButton('bulkConfirm', bulkConfirm, '一括確認')
	utilAddButton('sumMove', sumMove, '移動残集計')
}

window.onload = async function () {
    let elemView = document.getElementById("ViewSelector")

    // クリック後1秒後に仕入先名変換処理
    elemView.addEventListener('change', function() {
        window.setTimeout(convertMakers, 1000)
    }, false)

    // セット秒毎に実行
    window.setInterval(function() {
        if (+elemView.value == WIKI_STATUS_HACCHU_VIEW.president.index) {
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
            // ヘッダー文言の置換
            Array.from(document.querySelectorAll("tr.ui-widget-header span")).filter(v=>v.innerHTML.indexOf('注残数量') > 0).forEach(v => v.innerHTML = v.innerHTML.replace('注残数量', ''))
        }
    }, 100)

    // 仕入先ｺｰﾄﾞと仕入先名１変換用に取得
	let makerCodes = await utilExportAjax(
		TABLE_ID_SHIIRESAKI
		, ["ClassA", "DescriptionA"]
	)
	MAKER_CODE_LIST = utilConvertCsvTo2D(makerCodes.Response.Content)
    if (+elemView.value == WIKI_STATUS_HACCHU_VIEW.crosstab.index) {
        convertMakers()
    }

}

// 倉庫の変更
function changeWarehouse () {
	let tekiyou = +$p.getControl("適用区分").val()
	let place = +$p.getControl("入庫倉庫").val()
	if (tekiyou == WIKI_TEKIYOU_KB.move.index) {
		if (place == WIKI_SOUKO_KB.kanto.index) {
			$p.set($p.getControl('出庫倉庫'), WIKI_SOUKO_KB.kyushu.index)
		} else if (place == WIKI_SOUKO_KB.kyushu.index) {
			$p.set($p.getControl('出庫倉庫'), WIKI_SOUKO_KB.kanto.index)
		} else {
			$p.set($p.getControl('出庫倉庫'), "")
		}
	}
}

// フローチャートを作成
function createFlow() {
	let tekiyouKb = +utilGetControl('適用区分')
	let status = utilGetControl('連携ステータス')
    	// メーカー発注または倉庫間移動ではなければ終了
	if (![WIKI_TEKIYOU_KB.order.index, WIKI_TEKIYOU_KB.move.index].includes(tekiyouKb)) return

	let html = `
		<div id="statusFlow" class="flow">
		</div>
		<style>
			.flow {
				margin: 0 auto 50px;
			}
			.flow .box.state {
				background-color: red;
				color: white;
			}
			.flow .box {
				margin: 0 auto 33px;
				width: 66%;
				text-align: center;
				padding: 10px;
				border: 3px solid #326E93;
				-webkit-border-radius: 5px;
				border-radius: 5px;
				position: relative;
				font-weight: bold; /* テキストの指定 */
				background-color: cornsilk
			}
			.flow .box:after {
				border-top: 20px solid #FFC300;
				border-left: 50px solid transparent;
				border-right: 50px solid transparent;
				content: "";
				position: absolute;
				bottom: -28px; /* 三角形の高さ＋ボックスのボーダーをマイナスに */
				margin-left: -70px; /* 中央寄せに使用 */
				left: 180px;
			}

			.flow .box:last-child:after {
				border: none; /* 最後のボックスだけ三角形を表示しない */
			}
		</style>`
	$("#CommentField").prepend(html)

	let useStatus = []
	if (tekiyouKb == WIKI_TEKIYOU_KB.order.index) {
		useStatus = [
			WIKI_STATUS_HACCHU_KANRI.waiting
			, WIKI_STATUS_HACCHU_KANRI.confirmed
			, WIKI_STATUS_HACCHU_KANRI.closed
		]
	} else if (tekiyouKb == WIKI_TEKIYOU_KB.move.index) {
		useStatus = [
			WIKI_STATUS_HACCHU_KANRI.waiting
			, WIKI_STATUS_HACCHU_KANRI.preparing
			, WIKI_STATUS_HACCHU_KANRI.shipped
			, WIKI_STATUS_HACCHU_KANRI.moving
			, WIKI_STATUS_HACCHU_KANRI.filled
			, WIKI_STATUS_HACCHU_KANRI.closed
		]
	}
	for (let stat of useStatus) {
		let box = document.createElement("div")
		box.classList.add("box")
		box.innerHTML = stat.value
		if (status == stat.value) box.classList.add("state")
		document.getElementById("statusFlow").appendChild(box)
	}
}

// 読み取り制御
function controlReadOnly () {
    let status = utilGetControl('連携ステータス')
    switch (status) {
        case WIKI_STATUS_HACCHU_KANRI.waiting.value:
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            // 新規作成でない場合は、商品ｺｰﾄﾞを読み取り専用にする。
            if ($p.action() !== NEW) {
                utilChangeReadOnly('商品ｺｰﾄﾞ')
            }
            break
        case WIKI_STATUS_HACCHU_KANRI.confirmed.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.preparing.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')

            break
        case WIKI_STATUS_HACCHU_KANRI.shipped.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.moving.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.filled.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.closed.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.error.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        default:
            // その他のステータスの場合エラー
            utilSetMessage("不正status", ERROR)
            break
    }

}

// 追加ヘッダーの作成
function createHeader() {
	html = `
		<tr class="ui-widget-header AddRecord">
			<th class="AddHeader" colspan="5"><div><span></span></div></th>
			<th class="AddHeader" colspan="4"><div><span>在庫数量</span></div></th>
			<th class="AddHeader" colspan="4"><div><span>残月</span></div></th>
			<th class="AddHeader" colspan="4"><div><span>1か月分在庫</span></div></th>
			<th class="AddHeader" colspan="4"><div><span>年間出荷実績</span></div></th>
			<th class="AddHeader" colspan="4"><div><span>注残</span></div></th>
			<th class="AddHeader" colspan="2"><div><span>発注</span></div></th>
		</tr>
	`
	$('#Grid thead').prepend(html)
}

function convertMakers() {
    document.querySelectorAll(".crosstab-row th").forEach(v => {
        let makerCode = v.innerHTML.split(" : ")[0]
        v.innerHTML = v.innerHTML.replace(makerCode, convertMakerCodeToMaker1(makerCode))
    })
}

function convertMakerCodeToMaker1(makerCode) {
    return MAKER_CODE_LIST[MAKER_CODE_LIST.map(v => v[0]).indexOf(makerCode)][1]
}
