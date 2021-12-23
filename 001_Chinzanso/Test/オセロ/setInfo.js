

// セット秒後に実行
window.setTimeout(setField ,1000)

function setField() {
	let row_length = 8
	let col_length = 8
	for (let r = 1; r <= row_length; r++) {
		for (let c = 0; c < col_length; c++) {
			let target = document.getElementById('othello')
			let cell = document.createElement('div')
			cell.id = r + '-' + c
			target.appendChild(cell)

		}
	}
}
