function createFlow() {
    	// メーカー発注または倉庫間移動ではなければ終了
	if (![WIKI_TEKIYOU_KB.order.value, WIKI_TEKIYOU_KB.move.value].includes($p.getControl('適用区分')[0].innerHTML)) return

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
	if ($p.getControl('適用区分')[0].innerHTML == WIKI_TEKIYOU_KB.order.value) {
		useStatus = [
			WIKI_STATUS_HACCHU_KANRI.waiting
			, WIKI_STATUS_HACCHU_KANRI.confirmed
			, WIKI_STATUS_HACCHU_KANRI.closed
		]
	} else if ($p.getControl('適用区分')[0].innerHTML == WIKI_TEKIYOU_KB.move.value) {
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
		if ($p.getControl('Status')[0].innerHTML == stat.value) box.classList.add("state")
		document.getElementById("statusFlow").appendChild(box)
	}
}