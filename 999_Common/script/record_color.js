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
	return format
    .replace(/YYYY/, utilPad(date.getFullYear(), 4))
    .replace(/MM/, utilPad(date.getMonth() + 1, 2))
    .replace(/DD/, utilPad(date.getDate(), 2))
    .replace(/hh/, utilPad(date.getHours(), 2))
    .replace(/mm/, utilPad(date.getMinutes(), 2))
    .replace(/ss/, utilPad(date.getSeconds(), 2))

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


/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function utilIsNull (obj) {
  if (Array.isArray(obj)) {
    return obj.filter(v => v !== '').length == 0
  } else {
    return !obj && obj !== 0
  }
}
