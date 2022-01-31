$p.events.on_grid_load = function () {
	window.setInterval(function() {
		Array.from(document.querySelectorAll('td.invalidation span'))
		.filter(v => v.classList.contains('ui-icon-circle-check'))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains("invalid")) {
				v.parentNode.parentNode.classList.add('invalid')
			}
		})

		Array.from(document.querySelectorAll('td.expiration p.time'))
		.filter(v => utilIsOverDate(v.innerHTML.split(' ')[0]))
		.forEach(v => {
			if (!v.parentNode.parentNode.classList.contains('expire')) {
				v.parentNode.parentNode.classList.add('expire')
			}
		})
	}, 500)

}

// フォーマット変換の日付を取得
function utilGetDate (date, format = 'YYYY-MM-DDThh:mm:ss') {
	if (typeof date === 'undefined' || utilIsNull(date)) {
		date = new Date()
	}
	date = new Date(date)
	format = format.replace(/YYYY/, utilPad(date.getFullYear(), 4))
	format = format.replace(/MM/, utilPad(date.getMonth() + 1, 2))
	format = format.replace(/DD/, utilPad(date.getDate(), 2))
	format = format.replace(/hh/, utilPad(date.getHours(), 2))
	format = format.replace(/mm/, utilPad(date.getMinutes(), 2))
	format = format.replace(/ss/, utilPad(date.getSeconds(), 2))

	return format
}

// 日付が現在時刻を超えているかどうか判定
function utilIsOverDate (date) {
	date = utilGetDate(date, 'YYYY-MM-DD').split('-').join('')
	let now = new Date()
	let year = now.getFullYear()
	let month = now.getMonth() + 1
	let day = now.getDate()
	let expiration = year * 10000 + month * 100 + day

	return !utilIsNull(date) && expiration > +date
}

// 左に０を付与
function utilPad (num, size, min = 0, max = '9'.repeat(size)) {
	const padding = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + padding).substr(-1 * +size)
}

// Null判定
function utilIsNull (value) {
	if (Array.isArray(value)) {
		return value.filter(v => v !== '').length == 0
	} else {
		return !value
	}
}
