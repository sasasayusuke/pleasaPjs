// フローチャートを作成
$p.events.on_editor_load_arr.push(function () {
    let id = 'flowChart'
    let box = 'box'
    let status = "status"

	let html = `
		<div id="${id}" class="flow">
		</div>
		<style>
			.flow {
				margin: 0 auto 50px;
			}
			.flow .${box}.${status} {
				background-color: red;
				color: white;
			}
			.flow .${box} {
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
			.flow .${box}:after {
				border-top: 20px solid #FFC300;
				border-left: 50px solid transparent;
				border-right: 50px solid transparent;
				content: "";
				position: absolute;
				bottom: -28px; /* 三角形の高さ＋ボックスのボーダーをマイナスに */
				margin-left: -100px; /* 中央寄せに使用 */
				left: 180px;
			}

			.flow .${box}:last-child:after {
				border: none; /* 最後のボックスだけ三角形を表示しない */
			}
		</style>`
	$("#CommentField").prepend(html)

	let useStatus = [
        WIKI_STATUS_ORDER_CONTROL.announce
        , WIKI_STATUS_ORDER_CONTROL.receipt
        , WIKI_STATUS_ORDER_CONTROL.checkingDelivery
        , WIKI_STATUS_ORDER_CONTROL.adjustment
        , WIKI_STATUS_ORDER_CONTROL.confirmedDelivery
        , WIKI_STATUS_ORDER_CONTROL.shipped
        , WIKI_STATUS_ORDER_CONTROL.accepted
        , WIKI_STATUS_ORDER_CONTROL.closed
        , WIKI_STATUS_ORDER_CONTROL.cancel
    ]

	for (let s of useStatus) {
		let boxDiv = document.createElement("div")
		boxDiv.classList.add(box)
		boxDiv.innerHTML = s.value
		if (commonGetVal('注文ステータス') == s.value) boxDiv.classList.add(status)
		document.getElementById(id).appendChild(boxDiv)
	}
})
