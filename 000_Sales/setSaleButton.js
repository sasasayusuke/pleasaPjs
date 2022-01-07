$p.events.on_editor_load = function () {
	target = document.getElementById('SectionFields12')
	elem = document.createElement('button')
	elem.id='orderCheck'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.addEventListener('click',function () {
		$p.clearMessage()
		setSaleInfo()
	})
	elem.innerText = '売上/原価 反映'

	target.appendChild(elem)
}

function setSaleInfo () {
	let months = ['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月']
	let startMonth = document.getElementById('Results_ClassM')
	let endMonth = document.getElementById('Results_ClassN')
	let profit = document.getElementById('Results_Num004')
	let cost = document.getElementById('Results_Num005')

	let successFlg = true
	if (startMonth.classList.contains(ERROR)) {
		utilSetMessage('開始月が不正です', ERROR, false)
		successFlg = false
	}
	if (utilIsNull(startMonth.value)) {
		utilSetMessage('開始月を入力してください', ERROR, false)
		successFlg = false
	}

	if (endMonth.classList.contains(ERROR)) {
		utilSetMessage('終了月が不正です', ERROR, false)
		successFlg = false
	}
	if (utilIsNull(endMonth.value)) {
		utilSetMessage('終了月を入力してください', ERROR, false)
		successFlg = false
	}

	if (profit.classList.contains(ERROR)) {
		utilSetMessage('売上金額が不正です', ERROR, false)
		successFlg = false
	}
	if (utilIsNull(profit.value)) {
		utilSetMessage('売上金額を入力してください', ERROR, false)
		successFlg = false
	}

	if (cost.classList.contains(ERROR)) {
		utilSetMessage('原価金額が不正です', ERROR, false)
		successFlg = false
	}
	if (utilIsNull(cost.value)) {
		utilSetMessage('原価金額を入力してください', ERROR, false)
		successFlg = false
	}

	if (months.indexOf(startMonth.value) > months.indexOf(endMonth.value)) {
		utilSetMessage('開始月を終了月より前に設定してください', ERROR, false)
		successFlg = false
	}
	if (successFlg) {
		let startFlg = false
		let endFlg = false

		// 売上反映
		utilQuerySelector('#SectionFields9 input', true).some(v => {
			if (v.placeholder == startMonth.value) {
				startFlg = true
			}
			if (v.placeholder == endMonth.value) {
				endFlg = true
			}
			if (startFlg) {
				v.value = profit.value
			}
			return endFlg
		})

		startFlg = false
		endFlg = false

		// 原価反映
		utilQuerySelector('#SectionFields10 input', true).some(v => {
			if (v.placeholder == startMonth.value) {
				startFlg = true
			}
			if (v.placeholder == endMonth.value) {
				endFlg = true
			}
			if (startFlg) {
				v.value = cost.value
			}
			return endFlg
		})

		// 合計反映
		let profitSum_display = document.getElementById('Results_NumA')
		let costSum_display = document.getElementById('Results_NumD')
		let glossProfit_display = document.getElementById('Results_NumE')
		let glossProfitMargin_display = document.getElementById('Results_NumF')

		let profitSum = document.getElementById('Results_Num074')
		let costSum = document.getElementById('Results_Num075')
		let glossProfit = document.getElementById('Results_Num076')
		let glossProfitMargin = document.getElementById('Results_Num077')

		profitSum_display.value = profitSum.value = utilQuerySelector('#SectionFields9 input', true).reduce((sum, v) => {return sum + +v.value}, 0)
		costSum_display.value = costSum.value = utilQuerySelector('#SectionFields10 input', true).reduce((sum, v) => {return sum + +v.value}, 0)
		glossProfit_display.value = glossProfit.value = profitSum.value - costSum.value
		glossProfitMargin_display.value = glossProfitMargin.value = Math.round(glossProfit.value / costSum.value * 100)
	}
}
