var PUBLIC_FLG = true

readMessageMaster(PUBLIC_FLG)
readIconMaster(PUBLIC_FLG)
readScreenInfo(PUBLIC_FLG)
readRoomServiceAlacartInfo(PUBLIC_FLG)
readRoomServiceMenuInfo(PUBLIC_FLG)
readOrderInfo(PUBLIC_FLG)

$p.events.on_grid_load = function () {
	let html =  `
		<div id='utilHeader'></div>

		<div id='radioMenuClass' class='utilInlineRadio'></div>

		<div id='main'></div>

		<div id='notice'>
			<div id='selectedMenu' hidden></div>
			<p id='noticeMessage'></p>
		</div>

		<div id='utilFooter'></div>

		<div id='utilFix-left-down' class='circle'></div>

		<div id='purchase' class='utilModal'>
			<div class='utilModal-content'>
				<div class='utilModal-header blue'>
					<h1>購入選択画面（かいはつちゅう）</h1>
					<span class='utilModal-close'>×</span>
				</div>
				<div class='utilModal-body'>
				</div>
				<div class='utilModal-action'>
					<h1>合計金額</h1>
					<h1 id='sumPrice'></h1>
					<a class="button8 red" onclick='fffs'>かごに入れる</a>
				</div>
			</div>
		</div>

		<div id='settlement' class='utilModal'>
			<div class='utilModal-content'>
				<div class='utilModal-header red'>
					<h1>決済選択画面（かいはつちゅう）</h1>
					<span class='utilModal-close'>×</span>
				</div>
				<div class='utilModal-body'>
				<table id="statusTable" class="normal">
					<tr class="tableHeader">
						<th class="settlementName">メニュー名</th>
						<th class="settlementPrice">金額</th>
						<th class="settlementCount">数量</th>
						<th class="settlementStatus">状況</th>
					</tr>
					<tr class="tableBody">
						<td class="settlementName"></td>
						<td class="settlementPrice"></td>
						<td class="settlementCount"></td>
						<td class="settlementStatus"></td>
					</tr>
					<tr class="tableBody">
						<td class="settlementName"></td>
						<td class="settlementPrice"></td>
						<td class="settlementCount"></td>
						<td class="settlementStatus"></td>
					</tr>
					<tr class="tableBody">
						<td class="settlementName"></td>
						<td class="settlementPrice"></td>
						<td class="settlementCount"></td>
						<td class="settlementStatus"></td>
					</tr>

				</table>

				</div>
				<div class='utilModal-action'>
					<h1>合計金額</h1>
					<h1 id='settlementSumPrice'></h1>
					<a class="button8 green">決済</a>
				</div>
			</div>
		</div>
	`

	$('#MainContainer').prepend(html)

	$('#Header').remove()
	$('#Application').remove()

}


// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilSetFixIcon('basket', 'white', function () {
		utilOpenModal('settlement')
	}, PUBLIC_FLG)

	setRadio()
	setAccordions()
	setMenus()
}, 3000)
// セット秒毎に実行
window.setInterval(checkOpenAll ,1000)

function setRadio() {
	let menuClasses = [BREAKFAST, DINNER, SUPPER, DRINK]
	let target = document.getElementById('radioMenuClass')
	menuClasses.forEach(v => {
		let radioDiv = document.createElement('div')
		let radioInput = document.createElement('input')
		radioInput.type = 'radio'
		radioInput.name = 'menuClass'
		radioInput.value = v
		radioInput.addEventListener('click' ,function() {
			utilQuerySelector('div.accordion1', true).forEach(w => w.hidden = true)
			let noticeMessage = document.getElementById('noticeMessage')
			let target = utilQuerySelector('div.accordion1.' + v, true)
			document.getElementById('selectedMenu').innerHTML = utilGetMaster(v)
			if (utilIsNull(target)) {
				noticeMessage.className = WARNING
				noticeMessage.innerHTML = utilGetMessage('RS001', utilGetMaster(v))
			} else {
				noticeMessage.className = NORMAL
				noticeMessage.innerHTML = ''
				target.forEach(w => w.hidden = false)
			}
		})
		let radioLabel = document.createElement('label')
		radioLabel.innerHTML = utilGetMaster(v)
		radioDiv.appendChild(radioInput)
		radioDiv.appendChild(radioLabel)
		target.appendChild(radioDiv)
	})
	window.setTimeout(function() {
		utilQuerySelector('input[name="menuClass"]', true).forEach(v => {
			if(v.value == BREAKFAST) {
				v.click()
			}
		})
	}, 100)
}

function setAccordions() {
	let menuId = 'IssueId'
	let title = 'Title'
	let remark = 'DescriptionA'
	let logo = 'Body'
	let menuClass = 'ClassA'
	let startHour = 'NumB'
	let startMinute = 'NumC'
	let endHour = 'NumD'
	let endMinute = 'NumE'
	let sort = 'NumF'
	let expire = 'CompletionTime'
	let invalid = 'CheckA'

	let allowData = []
	let target = document.getElementById('main')

	// 無効化と期限切れを除く
	allowData = utilFilterObject(roomServiceMenuData, invalid, false).filter(v => !utilIsOverDate(v[expire]))
	allowData = utilSortObject(
		allowData,
		{
			category: sort,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let accordion = document.createElement('div')
		accordion.className = 'accordion1'
		accordion.classList.add(v[menuClass])
		accordion.id = v[menuId]

		let header = document.createElement('div')
		header.className = 'accordionHeader'
		let inner = document.createElement('div')
		inner.className = 'accordionInner'

		let headerBody = document.createElement('div')
		let container = document.createElement('div')
		container.className = 'container'

		let imgSource = utilGetImageSrc(v[logo], PUBLIC_FLG, true)
		if (!utilIsNull(imgSource)) {
			let img = new Image()
			img.src = imgSource
			img.className = 'menuTypeImage'
			container.appendChild(img)
		}

		let menuType = document.createElement('p')
		menuType.className = 'menuType'
		menuType.innerHTML = v[title]
		container.appendChild(menuType)

		let menuTime = document.createElement('div')
		menuTime.className = 'menuTime'

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
		timeStartArea.hidden = (start == end)
		let timeEndArea = document.createElement('div')
		timeEndArea.className = 'restaurantOpenTime'
		timeEndArea.innerHTML = '営業終了: ' + Math.floor(end / 100) + ':' + utilPad(end % 100, 2)
		timeEndArea.hidden = (start == end)

		menuTime.appendChild(timeStartHidden)
		menuTime.appendChild(timeEndHidden)
		menuTime.appendChild(timeStartArea)
		menuTime.appendChild(timeEndArea)

		let openType = document.createElement('p')
		openType.className = 'openType'
		menuTime.appendChild(openType)

		container.appendChild(menuTime)

		let menuTypeRemark = document.createElement('p')
		menuTypeRemark.className = 'menuTypeRemark'
		menuTypeRemark.innerHTML = v[remark]
		container.appendChild(menuTypeRemark)

		let iconDiv = document.createElement('div')
		iconDiv.innerHTML = getOpenIconDom()
		headerBody.appendChild(container)
		headerBody.appendChild(iconDiv)
		header.appendChild(headerBody)

		let box = document.createElement('div')
		box.className = 'box1'
		box.id = v[menuId]
		inner.appendChild(box)

		accordion.appendChild(header)
		accordion.appendChild(inner)
		target.appendChild(accordion)
	})
}

function setMenus() {
	let alacartId = 'IssueId'
	let alacartClass = 'ClassA'
	let sizeType = 'ClassB'
	let mainOption = 'ClassC'
	let drinkOption = 'ClassD'
	let breadOption = 'ClassE'
	let toppingOption = 'ClassF'
	let cheezeOption = 'ClassG'
	let dressingOption = 'ClassH'
	let afterDrinkOption = 'ClassI'
	let menuId = 'ClassL'
	let title = 'Title'
	let description = 'DescriptionA'
	let regularPrice = 'NumZ'
	let regularPrice2 = 'NumY'
	let regularPrice3 = 'NumX'
	let specialPrice = 'NumW'
	let specialPrice2 = 'NumV'
	let specialPrice3 = 'NumU'
	let logo = 'Body'
	let expire = 'CompletionTime'
	let invalid = 'CheckA'
	let specialize = 'CheckB'

	let allowData = []
	let priceList = [regularPrice, specialPrice, regularPrice2, specialPrice2, regularPrice3, specialPrice3]
	let targets = utilQuerySelector('div.box1', true)

	// 無効化と期限切れを除く
	allowData = utilFilterObject(roomServiceAlacartData, invalid, false).filter(v => !utilIsOverDate(v[expire]))

	targets.forEach(v => {
		let menus = utilFilterObject(allowData, menuId, v.id)

		for (let menu of menus) {

			let sizeList = utilIsNull(menu[sizeType]) ? [] : JSON.parse(menu[sizeType])
			let mainOptionList = utilIsNull(menu[mainOption]) ? [] : JSON.parse(menu[mainOption])
			let drinkOptionList = utilIsNull(menu[drinkOption]) ? [] : JSON.parse(menu[drinkOption])
			let breadOptionList = utilIsNull(menu[breadOption]) ? [] : JSON.parse(menu[breadOption])
			let toppingOptionList = utilIsNull(menu[toppingOption]) ? [] : JSON.parse(menu[toppingOption])
			let cheezeOptionList = utilIsNull(menu[cheezeOption]) ? [] : JSON.parse(menu[cheezeOption])
			let dressingOptionList = utilIsNull(menu[dressingOption]) ? [] : JSON.parse(menu[dressingOption])
			let afterDrinkOptionList = utilIsNull(menu[afterDrinkOption]) ? [] : JSON.parse(menu[afterDrinkOption])

			let menuList = document.createElement('dl')
			menuList.id = menu[alacartId]
			menuList.className = 'menuList'

			let menuTitle = document.createElement('p')
			menuTitle.className = 'menuTitle'
			menuTitle.innerHTML = menu[title]
			menuList.appendChild(menuTitle)

			let menuPhoto = document.createElement('dt')
			menuPhoto.className = 'menuPhoto'
			let imgSource = utilGetImageSrc(menu[logo], PUBLIC_FLG, true)
			if (!utilIsNull(imgSource)) {
				let img = new Image()
				img.src = imgSource
				menuPhoto.appendChild(img)
			}
			menuList.appendChild(menuPhoto)

			let menuDescription = document.createElement('dd')
			menuDescription.className = 'menuDescription'

			sizeList = utilIsNull(sizeList) ? [''] : sizeList

			let menuPriceList = document.createElement('div')
			menuPriceList.className = 'menuPriceList'
			sizeList.forEach((size, index) => {
				let menuSize = document.createElement('p')
				menuSize.className = 'menuSize'
				menuSize.innerHTML = size
				let menuPrice = document.createElement('span')
				let price = menu[priceList[index * 2]]
				menuPrice.className = 'menuPrice'
				menuPrice.innerHTML = utilGetCurrency(price)
				menuSize.appendChild(menuPrice)
				if (menu[specialize]) {
					price = menu[priceList[index * 2 + 1]]
					menuPrice.className = 'menuCancellPrice'
					let menuSpecialPrice = document.createElement('span')
					menuSpecialPrice.className = 'menuPrice'
					menuSpecialPrice.innerHTML = utilGetCurrency(price)
					menuSize.appendChild(menuSpecialPrice)
				}
				menuPriceList.appendChild(menuSize)
			})
			menuDescription.appendChild(menuPriceList)

			let menuDetail = document.createElement('p')
			menuDetail.className = 'menuDetail'
			menuDetail.innerHTML = menu[description]
			menuDescription.appendChild(menuDetail)

			menuList.appendChild(menuDescription)

			let menuPurchase = document.createElement('a')
			menuPurchase.className = 'button7 blue'
			let shoppingImg = new Image()
			shoppingImg.src = utilGetIconSrc('shopping', 'black', PUBLIC_FLG)
			shoppingImg.className = 'iconImage'
			shoppingImg.draggable = false
			menuPurchase.appendChild(shoppingImg)
			menuPurchase.insertAdjacentHTML('beforeend', 'かごに入れる')
			menuPurchase.addEventListener('click', function() {
				let prices = []
				if (menu[specialize]) {
					prices = priceList.filter((v, index) => index % 2 === 0).map(v => menu[v])
				} else {
					prices = priceList.filter((v, index) => index % 2 === 0).map(v => menu[v])
				}
				let bodyDiv = utilOpenModal('purchase')
				utilQuerySelector('.utilModal-body', false, bodyDiv).appendChild(getPurchaseModalDom({
					title: menu[title],
					prices: prices,
					sizes: {
						text: '',
						values: sizeList,
					},
					options: {
						main: {
							text: '',
							values: mainOptionList,
						},
						drink: {
							text: 'お飲み物',
							values: drinkOptionList,
						},
						bread: {
							text: 'パン',
							values: breadOptionList,
						},
						topping: {
							text: 'トッピング',
							values: toppingOptionList,
						},
						cheeze: {
							text: 'チーズ',
							values: cheezeOptionList,
						},
						dressing: {
							text: 'ドレッシング',
							values: dressingOptionList,
						},
						afterDrink: {
							text: '食後のお飲み物',
							values: afterDrinkOptionList,
						}
					}
				}))
			})
			menuList.appendChild(menuPurchase)

			v.appendChild(menuList)

		}

	})

	setClickAccordion()
}

function getOpenIconDom() {
	return  `
		<div class='i_box'>
			<i class='one_i'></i>
		</div>
	`
}


function getPurchaseModalDom(obj) {
	let uniqId = 'purchaseModalBody'

	let resultDom = document.getElementById(uniqId)
	if (typeof resultDom === 'undefined' || utilIsNull(resultDom)) {
	} else {
		resultDom.remove()
	}
	resultDom = document.createElement('div')
	resultDom.id = uniqId

	let titleArea = document.createElement('p')
	titleArea.className = 'utilBoxRadio-title'
	titleArea.innerHTML = obj.title

	resultDom.appendChild(titleArea)

	// サイズ変更可ならラジオボタンを作成する
	if (!utilIsNull(obj.sizes.values)) {
		let sizeId = uniqId + '_' + 'size'
		resultDom.appendChild(utilGetBoxRadioDom(obj.sizes.text, obj.sizes.values, sizeId))
	}
	let ops = obj.options
	Object.keys(ops).forEach(v => {
		// 追加オプションがあったらラジオボタンを作成する
		if (!utilIsNull(ops[v].values)) {
			resultDom.appendChild(utilGetBoxRadioDom(ops[v].text, ops[v].values, uniqId + '_' + v))
		}
	})
	let requestDiv = document.createElement('div')
	requestDiv.id = uniqId + '_' + 'request'

	let requestArea = document.createElement('p')
	requestArea.className = 'utilBoxRadio-header'
	requestArea.innerHTML = 'ご要望'
	requestDiv.appendChild(requestArea)
	let requestText = document.createElement('textarea')
	requestText.rows = 10
	requestText.cols = 100
	requestDiv.appendChild(requestText)
	resultDom.appendChild(requestDiv)

	return resultDom
}

function setClickAccordion() {
	//.accordion1の中の.accordionHeaderがクリックされたら
	$('#main .accordion1 .accordionHeader').click(function(){
		//クリックされた.accordion1の中の.accordionHeaderに隣接する.accordionInnerが開いたり閉じたりする。
		$(this).next('.accordionInner').slideToggle()
		$(this).toggleClass('openAccordion')
		//クリックされた.accordion1の中の.accordionHeader以外の.accordion1の中の.accordionHeaderに隣接する.accordion1の中の.accordionInnerを閉じる
		$('#main .accordion1 .accordionHeader').not($(this)).next('.accordion1 .accordionInner').slideUp()
		$('#main .accordion1 .accordionHeader').not($(this)).removeClass('openAccordion')
		$('#main .accordion1 .accordionHeader.stay').not($(this)).toggleClass('openAccordion')
	})
}

function checkOpen(target) {
	let openFlag = false
	let start = +target.querySelector('.startHidden').innerText
	let end = +target.querySelector('.endHidden').innerText
	let now = (new Date().getHours() * 100) + (new Date().getMinutes())

	let classNameOpen = 'openTime'
	let classNameClose = 'closeTime'

	target.classList.remove(classNameOpen)
	target.classList.remove(classNameClose)

	if (start < end) {
		if (start < now && now < end) {
			target.classList.add(classNameOpen)
			openFlag = true
		} else {
			target.classList.add(classNameClose)
		}
	} else {
		if (end < now && now < start) {
			target.classList.add(classNameClose)
		} else {
			target.classList.add(classNameOpen)
			openFlag = true
		}
	}
	return openFlag
}

function checkOpenAll() {
	utilQuerySelector('.accordion1', true).forEach(v => checkOpen(v))
}

function fffs() {
	utilSetMessage('注文完了')
}