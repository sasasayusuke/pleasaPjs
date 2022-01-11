
var PUBLIC_FLG = false

readMessageMaster(true)
readIconMaster(true)
readScreenInfo(true)
readSheetInfo(PUBLIC_FLG)
readShopInfo(PUBLIC_FLG)

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

var tmpId = ''
var tmpValue = ''
let statuses = [USE, VACANCY, RESERVE, PROCESS]

//3秒毎に実行
window.setInterval(function() {
	readSheetInfo(PUBLIC_FLG)
	setTable()
}, 3000)


// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilViewClock(setElapsed)

	setLogo()
}, 2000)

function setLogo() {
	let shopId = 'ResultId'
	let shopName = 'Title'
	let allowUserId = 'NumM'
	let sort = 'NumL'
	let logo = 'DescriptionC'
	let temporaryCosed = 'CheckA'

	let checkFlag = false
	let logoCount = 10

	let allowData = []
	let target = document.getElementById('logoList')

	// if (USER_ID == 1 || USER_ID == 2 || USER_ID == 7) {
	// 	// 全店舗にアクセスを許可 (1:管理者, 2:SMSデータテック, 7:ホテルフロント)
	// 	allowData = shopData
	// } else {
	// 	// その他のアカウントは各自店舗のみアクセスを許可
	// 	allowData = utilFilterObject(shopData, allowUserId, USER_ID)
	// }
	allowData = shopData

	// 臨時休業中を除く
	allowData = utilFilterObject(allowData, temporaryCosed, false)
	allowData = utilSortObject(
		allowData,
		{
			category: sort,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let label = document.createElement('label')
		label.id = 'label_' + v[shopName]

		let input = document.createElement('input')
		input.id = 'restaurantLogo_' + v[shopName]
		input.type = 'radio'
		input.name = 'restaurantLogo'
		input.value = v[shopId]
		input.className = 'restaurantLogo'
		input.addEventListener('change', function() {
			changeProcess(false)
			setTable()
		}, false)
		if (!checkFlag) {
			input.checked = true
			checkFlag = true
		}

		let img = new Image()
		img.src = utilGetImageSrc(v[logo], PUBLIC_FLG, true)
		img.className = 'restaurantImage'
		img.title = v[shopName]

		label.appendChild(input)
		label.appendChild(img)
		target.appendChild(label)
		logoCount--
	})

	for (let i = 0; i < logoCount; i++) {
		let label = document.createElement('label')
		let input = document.createElement('input')
		input.className = 'restaurantLogo'

		let img = new Image()
		img.src = utilGetIconSrc('dummy', '', PUBLIC_FLG)
		img.className = 'restaurantImage'

		label.appendChild(input)
		label.appendChild(img)
		target.appendChild(label)
	}


}

function setTable() {
	let sheetId = 'ResultId'
	let shopId = 'ClassL'
	let sheetNo = 'Title'
	let sheetType = 'ClassA'
	let capacity = 'NumX'
	let status = 'ClassB'
	let startDate = 'DateZ'
	let sort = 'NumA'
	let standard = 'NumN'

	let restaurants = document.getElementsByName('restaurantLogo')

	// 選択状態の値を取得
	let checkId = 0
	for (let elem of restaurants) {
		if (elem.checked) {
			checkId = elem.value
			break
		}
	}

	let sheets = utilFilterObject(sheetData, shopId, checkId)
	sheets = utilSortObject(
		sheets,
		{
			category: sort,
			type: 'Number',
			ascending: true
		}
	)
	if (utilIsNull(tmpId) || utilIsNull(tmpValue) || checkId != tmpId) {
		tmpId = checkId
		tmpValue = sheets
		let deleteRecords = utilQuerySelector('#statusTable tr.tableBody', true)
		deleteRecords.forEach(v => v.remove())
		let target = utilQuerySelector('#statusTable tbody')
		sheets.forEach((v, i) => {
			let date = v[startDate] == utilGetDateEmpty() ? '' : v[startDate]
			let trData = document.createElement('tr')
			trData.className = 'tableBody'
			trData.classList.add(v[status])
			trData.id = v[sheetId]

			let sheetNoData = document.createElement('td')
			sheetNoData.className = 'sheetNo'
			sheetNoData.innerHTML = v[sheetNo]
			trData.appendChild(sheetNoData)

			let sheetTypeData = document.createElement('td')
			sheetTypeData.className = 'sheetType'
			sheetTypeData.innerHTML = v[sheetType]
			trData.appendChild(sheetTypeData)

			let capacityData = document.createElement('td')
			capacityData.className = 'capacity'
			capacityData.innerHTML = v[capacity]
			trData.appendChild(capacityData)

			let statusData = document.createElement('td')
			statusData.className = 'status'
			statusData.innerHTML = utilGetMaster(v[status])
			trData.appendChild(statusData)

			let startDateData = document.createElement('td')
			startDateData.className = 'startDate'
			startDateData.innerHTML = getStarted(date)
			trData.appendChild(startDateData)

			let startDateHidden = document.createElement('td')
			startDateHidden.className = 'startDateHidden'
			startDateHidden.innerHTML = date
			startDateHidden.hidden = true
			trData.appendChild(startDateHidden)

			let elapsedTime = document.createElement('td')
			elapsedTime.className = 'elapsedTime'
			trData.appendChild(elapsedTime)

			let elapsedTimeHidden = document.createElement('td')
			elapsedTimeHidden.className = 'elapsedTimeHidden'
			elapsedTimeHidden.hidden = true
			trData.appendChild(elapsedTimeHidden)

			let standardTimeHidden = document.createElement('td')
			standardTimeHidden.className = 'standardTimeHidden'
			standardTimeHidden.innerHTML = v[standard]
			standardTimeHidden.hidden = true
			trData.appendChild(standardTimeHidden)

			let controlData = document.createElement('td')
			controlData.className = 'control'

			let vacancyButton = document.createElement('a')
			vacancyButton.className = 'button8'
			vacancyButton.classList.add(VACANCY)
			vacancyButton.addEventListener('click', function () {
				changeStatus(trData, PROCESS)
				createVisitHistory(
					{
						ClassD: v[sheetType],
						ClassE: VACANCY,
						ClassL: v[shopId],
						ClassM: v[sheetId],
					},
					{
						NumE: v[capacity],
						NumD: elapsedTimeHidden.innerHTML,
					},
					{
						DateA: utilGetDate()
					},
					{},
					{},

					PUBLIC_FLG
				)
				updateSheetInfo(
					v[sheetId],
					{
						ClassB: VACANCY
					},
					{},
					{
						DateZ: utilGetDateEmpty(),
					},
					{},
					{},
					PUBLIC_FLG
				)
			}, false)
			vacancyButton.innerHTML = utilGetMaster(VACANCY)

			let useButton = document.createElement('a')
			useButton.className = 'button8'
			useButton.classList.add(USE)
			useButton.addEventListener('click', function () {
				changeStatus(trData, PROCESS)
				createVisitHistory(
					{
						ClassD: v[sheetType],
						ClassE: USE,
						ClassL: v[shopId],
						ClassM: v[sheetId],
					},
					{
						NumD: elapsedTimeHidden.innerHTML,
						NumE: v[capacity],
					},
					{
						DateA: utilGetDate()
					},
					{},
					{},
					PUBLIC_FLG
				)
				updateSheetInfo(
					v[sheetId],
					{
						ClassB: USE
					},
					{},
					{
						DateZ: utilGetDate(),
					},
					{},
					{},
					PUBLIC_FLG
				)
			}, false)
			useButton.innerHTML = utilGetMaster(USE)

			let reserveButton = document.createElement('a')
			reserveButton.className = 'button8'
			reserveButton.classList.add(RESERVE)
			reserveButton.addEventListener('click', function () {
				changeStatus(trData, PROCESS)
				createVisitHistory(
					{
						ClassD: v[sheetType],
						ClassE: RESERVE,
						ClassL: v[shopId],
						ClassM: v[sheetId],
					},
					{
						NumD: elapsedTimeHidden.innerHTML,
						NumE: v[capacity],
					},
					{
						DateA: utilGetDate()
					},
					{},
					{},
					PUBLIC_FLG
				)
				updateSheetInfo(
					v[sheetId],
					{
						ClassB: RESERVE
					},
					{},
					{
						DateZ: utilGetDate(),
					},
					{},
					{},
					PUBLIC_FLG
				)
			}, false)
			reserveButton.innerHTML = utilGetMaster(RESERVE)

			controlData.appendChild(vacancyButton)
			controlData.appendChild(useButton)
			controlData.appendChild(reserveButton)
			trData.appendChild(controlData)
			target.appendChild(trData)
		})
	} else if (!utilEqualObject(sheets, tmpValue)) {
		tmpValue = sheets

		sheets.forEach(v => {
			let date = v[startDate] == utilGetDateEmpty() ? '' : v[startDate]
			let records = utilQuerySelector('#statusTable tr.tableBody', true)
			let record = records.find(w => v[sheetId] == w.id)
			record.querySelector('.sheetType').innerHTML = v[sheetType]
			record.querySelector('.capacity').innerHTML = v[capacity]
			record.querySelector('.startDate').innerHTML = getStarted(date)
			record.querySelector('.startDateHidden').innerHTML = date
			changeStatus(record, v[status])
		})
	}
}

function changeStatus(object, status) {
	if (statuses.includes(status)) {
		statuses.forEach(v => {
			if (object.classList.contains(v)) {
				object.classList.remove(v)
			}
		})
		if (status == PROCESS) {
			object.classList.add(status)
			object.querySelector('.status').innerHTML = getLoadingDom()
			let target = document.getElementById('statusTable')
			target.classList.remove(NORMAL)
			target.classList.add(PROCESS)
			changeProcess(true)
		} else {
			object.classList.add(status)
			object.querySelector('.status').innerHTML = utilGetMaster(status)
			changeProcess(false)
		}
	}
}

function changeProcess(processing = true) {
	let target = document.getElementById('statusTable')
	if (processing) {
		target.classList.remove(PROCESS)
		target.classList.remove(NORMAL)
		target.classList.add(PROCESS)
	} else {
		target.classList.remove(PROCESS)
		target.classList.remove(NORMAL)
		target.classList.add(NORMAL)
	}
}

function getLoadingDom(rect = true) {
	return  rect ?
	`
	<div class="utilLoading2">
		<div class="rect1"></div>
		<div class="rect2"></div>
		<div class="rect3"></div>
		<div class="rect4"></div>
		<div class="rect5"></div>
	</div>
	` :
	`
	<div class="utilLoading3">
		<div class="circle1"></div>
		<div class="circle2"></div>
		<div class="circle3"></div>
	</div>
	`

}

function getStarted(start) {
	if (utilIsNull(start)) {
		return ''
	}
	let startTime = new Date(start)
	let hour = startTime.getHours()
	let minute = startTime.getMinutes()
	return utilPad(hour, 2) + ' : ' + utilPad(minute, 2)
}

function setElapsed() {
	let records = utilQuerySelector('#statusTable tr.tableBody', true)
	records.map(v => {
		let start = v.querySelector('.startDateHidden')
		let elapsedDisplay= v.querySelector('.elapsedTime')
		let elapsed = v.querySelector('.elapsedTimeHidden')
		let standard = v.querySelector('.standardTimeHidden')
		v.classList.remove(WARNING)
		if (utilIsNull(start)) {
			return
		}
		if (!utilIsNull(start.innerText)) {
			let startTime = new Date(start.innerText)
			let now = new Date()
			let elapsedTime = now.getTime() - startTime.getTime()
			let hour = Math.floor(elapsedTime / 1000 / 60 / 60) % 24
			let minute = Math.floor(elapsedTime / 1000 / 60) % 60
			elapsedDisplay.innerHTML = utilPad(hour, 2) + ' : ' + utilPad(minute, 2)
			let elapsedMinute = hour * 60 + minute
			elapsed.innerHTML = elapsedMinute
			if (elapsedMinute > standard.innerHTML) {
				v.classList.add(WARNING)
			}
		} else {
			elapsedDisplay.innerHTML = ''
			elapsed.innerHTML = ''
		}
	})
}
