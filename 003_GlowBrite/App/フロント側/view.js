
var PUBLIC_FLG = false

readMessageMaster(true)
readIconMaster(true)
readCompanyInfo(PUBLIC_FLG)

//3秒毎に実行
window.setInterval(function() {
	readCompanyInfo(PUBLIC_FLG)
}, 3000)

$p.events.on_grid_load = function () {

	html =  `
	<div id="utilHeader"></div>
	<div id="container"></div>
	<div id="infoArea">
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

var tmpValue = ''

// セット秒後に実行
window.setTimeout(function() {
	utilViewClock()

	setDashboard()
}, 2000)
// セット秒毎に実行
window.setInterval(setTable, 2500)

function setDashboard() {

	let allowData = []
	let target = document.getElementById('container')

	// 臨時休業中を除く
	allowData = utilFilterObject(companyData, companyColumn.closed.value, false)
	allowData = utilSortObject(
		allowData,
		{
			category: companyColumn.sort.value,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let item = document.createElement('div')
		item.className = 'flexItem'

		let title = document.createElement('p')
		title.innerHTML = v[companyColumn.companyName.value]
		item.appendChild(title)
		let colors = ['red', 'green', 'yellow']
		colors.forEach(c => {
			let signalImg = new Image()
			signalImg.src = utilGetIconSrc('signal', c, PUBLIC_FLG)
			signalImg.className = 'restaurantImage'
			signalImg.draggable = false
			item.appendChild(signalImg)
		})
		let status = document.createElement('p')
		status.innerHTML = utilGetMaster(v[companyColumn.status.value])
		item.appendChild(status)

		target.appendChild(item)
	})
}


function setTable() {

	if (utilIsNull(tmpValue) || !utilEqualObject(companyData, tmpValue)) {
		tmpValue = companyData
	}
}


