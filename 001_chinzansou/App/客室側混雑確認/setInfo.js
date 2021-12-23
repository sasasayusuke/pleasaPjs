var tmpValue = ''

// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilViewClock()

	setDashboard()
}, 2000)
// セット秒毎に実行
window.setInterval(setTable, 2500)

function setDashboard() {
	let tableId = 'ResultId'
	let shopName = 'Title'
	let startHour = 'NumI'
	let startMinute = 'NumH'
	let endHour = 'NumJ'
	let endMinute = 'NumK'
	let onlyFew = 'NumO'
	let sort = 'NumL'
	let logo = 'DescriptionE'
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
		table.id = v[tableId]
		table.className = 'receptionTable'

		let record = document.createElement('tr')
		let header = document.createElement('th')
		let data = document.createElement('td')
		header.rowSpan = 2
		let nameArea = document.createElement('div')
		nameArea.className = 'restaurantName'
		nameArea.innerHTML = v[shopName]

		let start = v[startHour] * 100 + v[startMinute]
		let end = v[endHour] * 100 + v[endMinute]

		let timeStartHidden = document.createElement('div')
		timeStartHidden.className = 'startHidden'
		timeStartHidden.innerHTML = start
		timeStartHidden.hidden = true

		let timeEndHidden = document.createElement('div')
		timeEndHidden.className = 'endHidden'
		timeEndHidden.innerHTML = end
		timeEndHidden.hidden = true

		let timeStartArea = document.createElement('div')
		timeStartArea.className = 'restaurantOpenTime'
		timeStartArea.innerHTML = '営業開始: ' + Math.floor(start / 100) + ':' + utilPad(start % 100, 2)
		let timeEndArea = document.createElement('div')
		timeEndArea.className = 'restaurantOpenTime'
		timeEndArea.innerHTML = '営業終了: ' + Math.floor(end / 100) + ':' + utilPad(end % 100, 2)
		let img = new Image()
		img.src = utilGetImageSrc(v[logo], PUBLIC_FLG)
		img.className = 'restaurantImage'
		img.title = v[shopName]
		header.appendChild(img)
		header.appendChild(nameArea)
		header.appendChild(timeStartHidden)
		header.appendChild(timeEndHidden)
		header.appendChild(timeStartArea)
		header.appendChild(timeEndArea)
		record.appendChild(header)
		let box = document.createElement('div')
		box.className = 'box1'

		let onlyFewHidden = document.createElement('div')
		onlyFewHidden.className = 'onlyFewHidden'
		onlyFewHidden.innerHTML = v[onlyFew]
		onlyFewHidden.hidden = true
		box.appendChild(onlyFewHidden)

		let boxTitle = document.createElement('span')
		boxTitle.className = 'box1Title'
		boxTitle.innerText = '混雑度'
		let mark = document.createElement('p')
		mark.className = 'mark'
		box.appendChild(boxTitle)
		box.appendChild(mark)
		data.appendChild(box)
		record.appendChild(data)
		table.appendChild(record)
		item.appendChild(table)

		target.appendChild(item)
	})
}

function setTable() {
	tmpValue = sheetData
	let targets = utilQuerySelector('table.receptionTable', true)
	targets.forEach(v => changeMark(v))
}

function changeMark(target) {
	let status = 'ClassB'
	let shopId = 'ClassL'

	let box = target.querySelector('.box1')
	if (checkOpen(target)) {
		let sheets = utilFilterObject(sheetData, shopId, target.id)
		let count = utilFilterObject(sheets, status, VACANCY).length
		box.classList.remove('bad')
		box.classList.remove('neutral')
		box.classList.remove('good')
		box.classList.remove('close')
		if (count == 0) {
			box.classList.add('bad')
		} else if (count <= +box.querySelector(".onlyFewHidden").innerText) {
			box.classList.add('neutral')
		} else {
			box.classList.add('good')
		}
	} else {
		box.classList.add('close')
	}
}

function checkOpen(target) {
	let openFlag = false
	let start = +target.querySelector('.startHidden').innerText
	let end = +target.querySelector('.endHidden').innerText
	let now = (new Date().getHours() * 100) + (new Date().getMinutes())

	target.classList.remove('open')
	target.classList.remove('close')

	if (start < end) {
		if (start < now && now < end) {
			target.classList.add('open')
			openFlag = true
		} else {
			target.classList.add('close')
		}
	} else {
		if (end < now && now < start) {
			target.classList.add('close')
		} else {
			target.classList.add('open')
			openFlag = true
		}
	}
	return openFlag
}

