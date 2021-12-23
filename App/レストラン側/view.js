
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

	let html =  `
	<div id="utilHeader"></div>

	<div class="container">
		<div id="logoList" class="nav"></div>
		<div class="main">
			<table id="statusTable" class="normal">
				<tr class="tableHeader">
					<th class="sheetNo">席番号</th>
					<th class="sheetType">席タイプ</th>
					<th class="capacity">人数</th>
					<th class="status">利用状況</th>
					<th class="startDate">開始時刻</th>
					<th class="elapsedTime">経過時間</th>
					<th class="control">コントロール</th>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
				<tr class="tableBody">
					<td class="sheetNo"></td>
					<td class="sheetType"></td>
					<td class="capacity"></td>
					<td class="status"></td>
					<td class="startDate"></td>
					<td class="elapsedTime"></td>
					<td class="control"></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="utilFooter"></div>
	<div id="utilClock"></div>

	`
	$("#SiteMenu").prepend(html)
	// 上へアイコン削除
	$("nav.cf")[1].remove()

}