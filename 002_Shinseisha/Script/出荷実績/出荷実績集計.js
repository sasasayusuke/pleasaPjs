$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumAchievement'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumAchievement
	elem.innerText = '出荷実績集計'

	target.appendChild(elem)
}

function sumAchievement() {
	let ans = window.confirm('出荷実績集計を開始しますか?')
	if (!ans) {
		console.log('出荷実績集計を開始しますか? : Noを押下しました。')
		return
	}
	console.log('出荷実績集計を開始しますか? : Yesを押下しました。')
	check()


}
