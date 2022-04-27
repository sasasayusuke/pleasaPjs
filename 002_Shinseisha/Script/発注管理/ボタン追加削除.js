
$p.events.on_editor_load = function () {
    let removeIds = ['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail']
    removeIds.forEach(v => document.getElementById(v).remove())

	let html = `
		<div class="flow">
			<div class="box state">
				確認待ち
			</div>
			<div class="box">
				フロー02
			</div>
			<div class="box">
				フロー03
			</div>
			<div class="box">
				フロー04
			</div>
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
			}

			.flow .box:last-child:after {
				border: none; /* 最後のボックスだけ三角形を表示しない */
			}
		</style>`
	$("#CommentField").prepend(html)
}

$p.events.on_grid_load = function () {
	let target = document.getElementById('MainCommands')
	let elemMove = document.createElement('button')
	elemMove.id='sumMove'
	elemMove.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elemMove.onclick = sumMove
	elemMove.innerText = '移動残集計'
	target.appendChild(elemMove)

	let elemLinkage = document.createElement('button')
	elemLinkage.id='linkageSMILE'
	elemLinkage.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elemLinkage.onclick = linkageSMILE
	elemLinkage.innerText = 'SMILE連携'

	target.appendChild(elemLinkage)
}