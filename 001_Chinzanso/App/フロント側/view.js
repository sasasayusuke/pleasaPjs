
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

var tmpValue = ''
let statusList = [VACANCY, USE, RESERVE]

// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilViewClock()

	setDashboard()
}, 2000)
// セット秒毎に実行
window.setInterval(setTable, 2500)

function setDashboard() {
	let shopId = 'ResultId'
	let shopName = 'Title'
	let allowUserId = 'NumM'
	let sort = 'NumL'
	let logo = 'DescriptionC'
	let temporaryCosed = 'CheckA'

	let allowData = []
	let target = document.getElementById('container')

	// 臨時休業中を除く
	allowData = utilFilterObject(shopData, temporaryCosed, false)
	allowData = utilSortObject(
		allowData,
		{
			category: sort,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let item = document.createElement('div')
		item.className = 'flexItem'

		let table = document.createElement('table')
		table.id = v[shopId]
		table.className = 'receptionTable'

		let recordHead = document.createElement('tr')
		let header = document.createElement('th')
		header.colSpan = 2
		let nameArea = document.createElement('div')
		nameArea.className = 'restaurantName'
		nameArea.innerHTML = v[shopName]
		let img = new Image()
		img.src = utilGetImageSrc(v[logo], PUBLIC_FLG)
		img.className = 'restaurantImage'
		img.title = v[shopName]
		header.appendChild(img)
		header.appendChild(nameArea)
		recordHead.appendChild(header)
		table.appendChild(recordHead)

		for (let key of statusList) {
			let record = document.createElement('tr')
			record.className = key
			let dataLabel = document.createElement('td')
			dataLabel.className = 'dataLabel'
			dataLabel.innerHTML = utilGetMaster(key)
			let dataValue = document.createElement('td')
			dataValue.className = 'dataValue'
			record.appendChild(dataLabel)
			record.appendChild(dataValue)
			table.appendChild(record)
			item.appendChild(table)
		}

		target.appendChild(item)
	})
}


function setTable() {
	let status = 'ClassB'
	let shopId = 'ClassL'

	if (utilIsNull(tmpValue) || !utilEqualObject(sheetData, tmpValue)) {
		tmpValue = sheetData
		let targets = utilQuerySelector('table.receptionTable', true)
		targets.forEach(v => {
			let sheets = utilFilterObject(sheetData, shopId, v.id)
			statusList.forEach(s => v.querySelector('.' + s + ' .dataValue').innerText = utilFilterObject(sheets, status, s).length)
		})
	}
}


