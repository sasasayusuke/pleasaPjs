let MAKER_CODE_LIST

$p.events.on_editor_load = function () {
    utilRemoveElements(['NewMenuContainer', 'OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
	utilQuerySelector(".ui-icon.ui-icon-clock.current-time", true).forEach(v => v.remove())
	utilQuerySelector(".ui-icon.ui-icon-person.current-user", true).forEach(v => v.remove())
	controlStatuses()
	createFlow()
}
$p.events.on_grid_load = function () {
    utilRemoveElements(['NewMenuContainer'])
	utilAddButton('bulkConfirm', bulkConfirm, '一括確認')
	utilAddButton('sumMove', sumMove, '移動残集計')

    html = `
        <div id="confirmDialog" class="dialog" title="一括確認">
            <p id="messageDialog" class="message-dialog"></p>
            <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="executeBulk(${WIKI_TEKIYOU_KB.order.index});" data-icon="ui-icon-disk"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-button-icon-space"> </span>メーカー発注</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="executeBulk(${WIKI_TEKIYOU_KB.move.index});" data-icon="ui-icon-disk"><span class="ui-button-icon ui-icon ui-icon-disk"></span><span class="ui-button-icon-space"> </span>倉庫間移動</button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="$p.closeDialog($(this));" data-icon="ui-icon-cancel"><span class="ui-button-icon ui-icon ui-icon-cancel"></span><span class="ui-button-icon-space"> </span>キャンセル</button>
            </div>
        </div>
    `

    $('#Application').append(html)

}
$p.events.on_crosstab_load = async function () {
    utilHideElements(['ReduceViewFilters', 'Aggregations', 'ViewFilters'])
    // 仕入先ｺｰﾄﾞと仕入先名１変換用に取得
	let makerCodes = await utilExportAjax(
		TABLE_ID_SHIIRESAKI
		, ["ClassA", "DescriptionA"]
	)
	MAKER_CODE_LIST = utilConvertCsvTo2D(makerCodes.Response.Content)

    convertMakers()
}

window.onload = function () {

    let elemView = document.getElementById("ViewSelector")

    if (utilIsNull(elemView)) return
    // クリック後1秒後に仕入先名変換処理
    elemView.addEventListener('change', function() {
        window.setTimeout(convertMakers, 1000)
    }, false)

    // セット秒毎に実行
    window.setInterval(function() {
		let viewIndex = +elemView.value
		// 色付けとヘッダーの追加を有効にするビュー
        if ([VIEW_HACCHU_KANRI.president.index, VIEW_HACCHU_KANRI.confirm.index].includes(viewIndex)) {
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
            if (leng != 2) createHeader(viewIndex)
            // ヘッダー文言の置換
            Array.from(document.querySelectorAll("tr.ui-widget-header span")).filter(v=>v.innerHTML.indexOf('注残数量') > 0).forEach(v => v.innerHTML = v.innerHTML.replace('注残数量', ''))
        }
    }, 100)
}

// 商品コードの変更
function changeItem () {
    $p.apiGet({
        'id': $(`[name=${utilGetId("商品ｺｰﾄﾞ")}]`).val(),
        'done': function (data) {
            if (data.Response.Data[0].Num018 <= 0) {
                utilSetMessage("この商品の標準仕入単価が０です。商品情報を確認してください。", WARNING)
            }
            $p.set($p.getControl('標準仕入単価'), data.Response.Data[0].Num018)

			utilChangeReadOnly('現在在庫数量_九州', false)
            utilChangeReadOnly('現在在庫数量_関東', false)
            utilChangeReadOnly('現在在庫数量_北海道', false)
			utilChangeReadOnly('現在在庫数量_合計', false)
            utilChangeReadOnly('残月_九州', false)
            utilChangeReadOnly('残月_関東', false)
			utilChangeReadOnly('残月_北海道', false)
            utilChangeReadOnly('残月_全体', false)
            utilChangeReadOnly('1か月分在庫_九州', false)
			utilChangeReadOnly('1か月分在庫_関東', false)
            utilChangeReadOnly('1か月分在庫_北海道', false)
            utilChangeReadOnly('1か月分在庫_全国', false)
			utilChangeReadOnly('年間出荷実績_九州', false)
            utilChangeReadOnly('年間出荷実績_関東', false)
            utilChangeReadOnly('年間出荷実績_北海道', false)
			utilChangeReadOnly('年間出荷実績_全国', false)

			$p.set($p.getControl('現在在庫数量_九州'), data.Response.Data[0].NumB)
			$p.set($p.getControl('現在在庫数量_関東'), data.Response.Data[0].NumC)
			$p.set($p.getControl('現在在庫数量_北海道'), data.Response.Data[0].NumD)
			$p.set($p.getControl('現在在庫数量_合計'), data.Response.Data[0].NumE)
			$p.set($p.getControl('残月_九州'), data.Response.Data[0].NumN)
			$p.set($p.getControl('残月_関東'), data.Response.Data[0].NumO)
			$p.set($p.getControl('残月_北海道'), data.Response.Data[0].NumP)
			$p.set($p.getControl('残月_全体'), data.Response.Data[0].NumQ)
			$p.set($p.getControl('1か月分在庫_九州'), data.Response.Data[0].NumR)
			$p.set($p.getControl('1か月分在庫_関東'), data.Response.Data[0].NumS)
			$p.set($p.getControl('1か月分在庫_北海道'), data.Response.Data[0].NumT)
			$p.set($p.getControl('1か月分在庫_全国'), data.Response.Data[0].NumU)
			$p.set($p.getControl('年間出荷実績_九州'), data.Response.Data[0].NumZ)
			$p.set($p.getControl('年間出荷実績_関東'), data.Response.Data[0].Num001)
			$p.set($p.getControl('年間出荷実績_北海道'), data.Response.Data[0].Num002)
			$p.set($p.getControl('年間出荷実績_全国'), data.Response.Data[0].Num003)

			utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
			utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
			utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
			utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
			utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
			utilChangeReadOnly('年間出荷実績_全国')


        },
        'fail': function (data) {
            console.log('通信が失敗しました。')
        },
        'always': function (data) {
            console.log('通信が完了しました。')
        }
    })
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

function convertMakers() {
    document.querySelectorAll(".crosstab-row th").forEach(v => {
        let makerCode = v.innerHTML.split(" : ")[0]
        v.innerHTML = v.innerHTML.replace(makerCode, MAKER_CODE_LIST[MAKER_CODE_LIST.map(v => v[0]).indexOf(makerCode)][1])
    })
}

