
var PUBLIC_FLG = true

readMessageMaster(PUBLIC_FLG)
readIconMaster(PUBLIC_FLG)
readScreenInfo(PUBLIC_FLG)
readRoomServiceAlacartInfo(PUBLIC_FLG)
readRoomServiceMenuInfo(PUBLIC_FLG)
readOrderInfo(PUBLIC_FLG)

$p.events.on_grid_load = function () {
	let html =  `
		<div id='utilHeader'></div>

		<group id='radioMenuClass' class='utilInlineRadio'></group>

		<div id='main'></div>

		<div id='notice'>
			<div id='selectedMenu' hidden></div>
			<p id='noticeMessage'></p>
		</div>

		<div id='utilFooter'></div>

		<div id='utilFix-left-down' class='circle'></div>
		<div id='utilModal'>
			<div class='utilModal-content'>
				<div class='utilModal-header'>
					<h1>決済画面（かいはつちゅう）</h1>
					<span class='utilModal-close'>×</span>
				</div>
				<div class='utilModal-body'>
					<p>モーダルウィンドウ test</p>

				</div>
			</div>
		</div>


	`

	$('#MainContainer').prepend(html)

	$('#Header').remove()
	$('#Application').remove()

}
