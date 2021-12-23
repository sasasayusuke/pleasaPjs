
var PUBLIC_FLG = false

readMessageMaster(true)
readIconMaster(true)
readScreenInfo(true)
readSheetInfo(PUBLIC_FLG)
readShopInfo(PUBLIC_FLG)

//3秒毎に実行
window.setInterval(function() {
	readSheetInfo(PUBLIC_FLG)
}, 3000)

$p.events.on_grid_load = function () {

	html =  `
	<div id="utilHeader"></div>
	<div id="container"></div>
	<div id="infoArea" hidden>
		<table class="infoTable">
			<tr class="restaurantName">
				<th colspan="3">お知らせ</th>
			</tr>
			<tr>
				<td class="infoDate">2021/10/27</td>
				<td class="infoSource">S</td>
				<td class="infoContent">あいうえお</td>
			</tr>
			<tr>
				<td class="infoDate">2021/10/27</td>
				<td class="infoSource">K</td>
				<td class="infoContent">さしすせそ</td>
			</tr>
			<tr>
				<td class="infoDate">2021/10/27</td>
				<td class="infoSource">K</td>
				<td class="infoContent">あいうえお</td>
			</tr>
			<tr>
				<td class="infoDate">2021/10/27</td>
				<td class="infoSource">K</td>
				<td class="infoContent">あいうえお</td>
			</tr>
			<tr>
				<td class="infoDate">2021/10/27</td>
				<td class="infoSource">K</td>
				<td class="infoContent">あいうえお</td>
			</tr>
		</table>
	</div>
	<div id="utilFooter"></div>
	<div id="utilClock"></div>

	`

	$("#SiteMenu").prepend(html)
	// 上へアイコン削除
	$("nav.cf")[1].remove()

}
