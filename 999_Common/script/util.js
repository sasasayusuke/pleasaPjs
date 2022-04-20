
var screenDBId = 87697 //5859
var shopDBId = 87691 //5860
var sheetDBId = 0 //5852
var visitHistoryDBId = 0 //5857
var roomServiceAlacartDBId = 87696 //5853
var roomServiceMenuDBId = 87693 //5851
var orderDBId = 87698 //5854
var orderHistoryDBId = 87699 //5858
var panfletDBId = 87695 //8383
var companyDBId = 88214

var BASE_URL = 'https://ssj-pleasanter-01.sdt-test.work/'
var API_KEY = '3b80682c7c46eb8defd61b956100e49792b9c0f273d4345515d0ac9bfcd251a69cd3eeff5610ce0d669b1072a79ecbbce4f37209f2927e3e54c5d1859feb305f'

var USER_ID = +$p.userId()
var SITE_ID = +$p.siteId()
var PUBLIC_URL = BASE_URL + 'publish'
var SITE_API_URL = BASE_URL + 'api/items/'
var SITE_URL = BASE_URL + 'items/'

var OWNER = 'owner'
var TENANT = 'tenant'
var DUMMY = 'dummy'
var VACANCY = 'vacancy'
var USE = 'use'
var RESERVE = 'reserve'
var NORMAL = 'normal'
var WARNING = 'warning'
var ERROR = 'error'
var PROCESS = 'process'
var BREAKFAST = 'breakfast'
var DINNER = 'dinner'
var SUPPER = 'supper'
var DRINK = 'drink'

function utilImport(type, src, addFunc) {
  if (utilIsNull(utilQuerySelector('[href="' + src + '"]')) && utilIsNull(utilQuerySelector('[src="' + src + '"]'))) {
    let elem
    if (type == 'css') {
      elem = document.createElement('link')
      elem.setAttribute('rel', 'stylesheet')
      elem.setAttribute('type', 'text/css')
      elem.setAttribute('href', src)
    } else if (type == 'js') {
      elem = document.createElement('script')
      elem.setAttribute('type', 'text/javascript')
      elem.setAttribute('src', src)
    } else {
      console.log('typeパラメータが不正です')
      return ''
    }
    document.head.appendChild(elem)
    elem.addEventListener('load', function() {
      if (addFunc && typeof addFunc === 'function') {
        // 渡されたオブジェクトが関数なら実行する
        addFunc()
      }
    })
  } else {
    if (addFunc && typeof addFunc === 'function') {
      // 渡されたオブジェクトが関数なら実行する
      addFunc()
    }
  }
}

function utilSetMessage (message = '', type = NORMAL, clear = true) {
  if (clear) {
    $p.clearMessage()
  }
  switch (type) {
    case NORMAL:
      $p.setMessage(
        '#Message',
        JSON.stringify({
          Css: 'alert-success',
          Text: message
        })
      )
    break
    case WARNING:
      $p.setMessage(
        '#Message',
        JSON.stringify({
          Css: 'alert-warning',
          Text: message
        })
      )
    break
    case ERROR:
      $p.setMessage(
        '#Message',
        JSON.stringify({
          Css: 'alert-error',
          Text: message
        })
      )
    break
    default:
      $p.setMessage(
        '#Message',
        JSON.stringify({
          Css: 'alert-error',
          Text: 'message type が不正です。'
        })
      )
  }
}

function utilGetMaster (key, pre = '', post = '') {
  let retStr = ''
  switch (key) {
    case VACANCY:
      retStr += '空席'
      break
    case USE:
      retStr += '使用中'
      break
    case RESERVE:
      retStr += '予約'
      break
    case NORMAL:
      retStr += '正常'
      break
    case ERROR:
      retStr += '異常'
      break
    case WARNING:
      retStr += '警告'
      break
      case PROCESS:
      retStr += '処理中'
      break
    case BREAKFAST:
      retStr += '朝食'
      break
    case DINNER:
      retStr += '昼・夕食'
      break
    case SUPPER:
      retStr += '夜食'
      break
    case DRINK:
      retStr += 'お飲み物'
      break

  }
  return pre + retStr + post
}

function utilGetMessage (key, arg1, arg2, arg3) {
  let keyTitle = 'Title'
  let messageBody = 'Body'
  if (typeof key === 'undefined' || utilIsNull(key)) {
    key = 'TT999'
  }
  if (typeof messageData === 'undefined' || utilIsNull(messageData)) {
    console.log('メッセージデータを取得していません')
    return ''
  }
  let message = utilFilterObject(messageData, keyTitle, key)[0][messageBody]

  if (typeof message === 'undefined' || utilIsNull(message)) {
    console.log('メッセージパラメータが不正です')
    return ''
  }

  if (!utilIsNull(arg1)) {
    message = message.replace('$1', arg1)
  }
  if (!utilIsNull(arg2)) {
    message = message.replace('$2', arg2)
  }
  if (!utilIsNull(arg3)) {
    message = message.replace('$3', arg3)
  }

  return message
}

function utilGetIconSrc (key, color, public = false) {
  let keyTitle = 'Title'
  let colorClass = 'ClassA'
  let imgSource = 'Body'

  if (typeof key === 'undefined' || utilIsNull(key)) {
    key = 'picture'
  }
  if (typeof color === 'undefined' || utilIsNull(color)) {
    color = 'black'
  }
  if (typeof iconData === 'undefined' || utilIsNull(iconData)) {
    console.log('アイコンデータを取得していません')
    return ''
  }
  let src = utilFilterObject(iconData, keyTitle, key)
  if (typeof src === 'undefined' || utilIsNull(src)) {
    console.log('keyパラメータが不正です')
    return ''
  }
  src = utilFilterObject(src, colorClass, color)
  if (typeof src === 'undefined' || utilIsNull(src)) {
    console.log('colorパラメータが不正です')
    return ''
  }
  return utilGetImageSrc(src[0][imgSource], public, false)
}

function utilGetImageSrc (path, public = false, noImage = false) {
  if (typeof path === 'undefined' || utilIsNull(path)) {
    return noImage ? utilGetIconSrc('', '', public) : ''
  }
  let url = public ? PUBLIC_URL : BASE_URL
  return url + path.split('[image](/')[1].split(')')[0]
}

function utilQuerySelector (selector, all = false, dom) {
  if (typeof dom === 'undefined' || utilIsNull(dom)) {
    dom = document
  }
  if (all) {
    // NodeListをArrayに変換してから返却
    return Array.from(dom.querySelectorAll(selector))
  }
  return dom.querySelector(selector)
}

// 左に０を付与
function utilPad (num, size, min = 0, max = '9'.repeat(size)) {
	const padding = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + padding).substr(-1 * +size)
}

// object       Object[]  フィルタリング対象
// category     String    フィルタリング対象のカテゴリー
// words        String[]  含まれる語
function utilFilterObject (object, category, words) {
  if (!Array.isArray(words)) {
    words = [words]
  }
  return object.filter(v => words.includes(v[category]))
}

function utilSort (array, ascending = true) {
  return array.sort((a, b) => (a - b) * (ascending ? 1 : -1))
}

// object       Object[]  ソート対象
                                      // 例
                                      // [
                                      //   {
                                      //     aaa: 1,
                                      //     bbb: 'a'
                                      //   },
                                      //   {
                                      //     aaa: 0,
                                      //     bbb: 'b'
                                      //   }
                                      // ]
// conditions    Object[]  ソート対象のカテゴリーと型
                                      // 例
                                      // [{
                                      //   category: 'aaa',
                                      //   type: 'Number',
                                      //   ascending: true
                                      // }]
function utilSortObject (object, conditions) {
  if (!Array.isArray(conditions)) {
    conditions = [conditions]
  }
  for (let c of conditions) {
    if (c.type == 'Number') {
      object = utilSortObjectByNumber (object, c.category, c.ascending)
    } else if (c.type == 'String') {
      object = utilSortObjectByString (object, c.category, c.ascending)
    }
  }
  return object
}

function utilSortObjectByNumber (object, category, ascending = true) {
  return object.sort((a, b) => (a[category] - b[category]) * (ascending ? 1 : -1))
}

function utilSortObjectByString (object, category, ascending = true) {
  return object.sort((a, b) => ((a[category].toUpperCase() > b[category].toUpperCase() ^ !ascending) ? 1 : -1))
}

function utilEqualObject (obj1, obj2) {
  return JSON.stringify(obj1) == JSON.stringify(obj2)
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

function utilGetBoxRadioDom(text, options, id = '') {
	let radioText = document.createElement('p')
	radioText.className = 'utilBoxRadio-header'
	radioText.innerHTML = text
	let radioDiv = document.createElement('div')
	radioDiv.className = 'utilBoxRadio-body'
	options.forEach((v, index) => {
		let optionId = id + '_' + index
		let radioInput = document.createElement('input')
		radioInput.id = optionId
		radioInput.className = 'utilBoxRadio-input'
		radioInput.type = 'radio'
		radioInput.name = id
		radioInput.value = optionId
		if (index == 0) {
			radioInput.checked = true
		}

		let radioLabel = document.createElement('label')
		radioLabel.className = 'utilBoxRadio-label'
		radioLabel.htmlFor  = optionId
		radioLabel.innerHTML = v
		radioDiv.appendChild(radioInput)
		radioDiv.appendChild(radioLabel)
	})
	let resultDom = document.createElement('div')
	if (!utilIsNull(id)) {
		resultDom.id = id
	}
	resultDom.appendChild(radioText)
	resultDom.appendChild(radioDiv)
	return resultDom
}

// フォーマット変換の日付を取得
function utilGetDate (date, format = 'YYYY-MM-DDThh:mm:ss') {
  if (typeof date === 'undefined' || utilIsNull(date)) {
    date = new Date()
  }
  date = new Date(date)
  format = format
    .replace(/YYYY/, utilPad(date.getFullYear(), 4))
    .replace(/MM/, utilPad(date.getMonth() + 1, 2))
    .replace(/DD/, utilPad(date.getDate(), 2))
    .replace(/hh/, utilPad(date.getHours(), 2))
    .replace(/mm/, utilPad(date.getMinutes(), 2))
    .replace(/ss/, utilPad(date.getSeconds(), 2))

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

// 空日付を取得
function utilGetDateEmpty () {
  return '1899-12-30T00:00:00'
}

function utilGetCurrency (price = 0) {
  return price.toLocaleString('ja-JP', {style:'currency', currency: 'JPY'})
}

function utilSetFixIcon(key, color, clickFunc, public) {
  let iconDiv = document.getElementById('utilFix-left-down')
  let img = new Image()
  img.src = utilGetIconSrc(key, color, public)
  img.draggable = false
  iconDiv.appendChild(img)
  if (clickFunc && typeof clickFunc === 'function') {
    // 渡されたオブジェクトが関数なら実行する
    iconDiv.addEventListener('click', function() {
      clickFunc()
    }, false)
  }
}

function changeTitle(title, append = false) {
  if (append) {

  } else {
    utilQuerySelector('head title').innerText = title
  }
}

function utilSetHeader() {
  if (isNaN(SITE_ID)) {
    alert(SITE_ID + ' : 不正なIDです')
    return
  }
  if (SITE_ID < 1000 || SITE_ID > 99999) {
    alert(SITE_ID + ' : 異常なIDです')
    return
  }
  if (typeof screenData === 'undefined' || utilIsNull(screenData)) {
    console.log('サイトデータを取得していません')
    return
  }
  let title = 'Title'
	let screenId = 'NumA'
	let headLogo = 'DescriptionC'
	let headTitle = 'DescriptionB'
	let headRemark = 'DescriptionD'
	let footLogo = 'DescriptionG'
	let footTitle = 'DescriptionE'
	let footRemark = 'DescriptionF'

	let result = utilFilterObject(screenData, screenId, +SITE_ID)[0]

  if (typeof result === 'undefined' || utilIsNull(result)) {
    alert(SITE_ID + ' : 検索結果がありません。')
    return
  }

  changeTitle(result[title])

  let header = document.getElementById('utilHeader')
  if (typeof header !== 'undefined' && !utilIsNull(header)) {
    if (utilIsNull(result[headLogo]) && utilIsNull(result[headTitle]) && utilIsNull(result[headRemark])) {

    } else {
      let headerImg = new Image()
      let headerImgSource = utilGetImageSrc(result[headLogo], true)
      if (!utilIsNull(headerImgSource)) {
        headerImg.src = headerImgSource
        headerImg.id = 'utilHeaderImage'
        header.appendChild(headerImg)
      }

      if (!utilIsNull(result[headTitle])) {
        let headerTitle = document.createElement('div')
        headerTitle.id = 'utilHeaderTitle'
        headerTitle.innerHTML = result[headTitle]
        header.appendChild(headerTitle)
      }

      if (!utilIsNull(result[headRemark])) {
        let headerRemark = document.createElement('p')
        headerRemark.id = 'utilHeaderRemark'
        headerRemark.innerHTML = result[headRemark]
        header.appendChild(headerRemark)
      }
    }
  }

  let footer = document.getElementById('utilFooter')
  if (typeof footer !== 'undefined' && !utilIsNull(footer)) {
    if (utilIsNull(result[footLogo]) && utilIsNull(result[footTitle]) && utilIsNull(result[footRemark])) {

    } else {
      let footerImg = new Image()
      let footerImgSource = utilGetImageSrc(result[footLogo], true)
      if (!utilIsNull(footerImgSource)) {
        footerImg.src = footerImgSource
        footerImg.id = 'utilFooterImage'
        footer.appendChild(footerImg)
      }

      if (!utilIsNull(result[footTitle])) {
        let footerTitle = document.createElement('div')
        footerTitle.id = 'utilFooterTitle'
        footerTitle.innerHTML = result[footTitle]
        footer.appendChild(footerTitle)
      }

      if (!utilIsNull(result[footRemark])) {
        let footerRemark = document.createElement('p')
        footerRemark.id = 'utilFooterRemark'
        footerRemark.innerHTML = result[footRemark]
        footer.appendChild(footerRemark)
      }
    }
  }
}


function utilViewClock(addFunc) {
  // 1秒に1回時計を更新する
  window.setInterval(function() {
    const now = new Date()
    const year = now.getFullYear()
    const mon = now.getMonth() + 1
    const day = now.getDate()
    const hour = now.getHours()
    const min = now.getMinutes()
    const sec = now.getSeconds()
    const weekDay = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()]
    document.getElementById('utilClock').innerHTML = utilPad(year, 4) + '年' + utilPad(mon, 2) + '月' + utilPad(day, 2) + '日 ' + ' (' + weekDay + ') ' + utilPad(hour, 2) + ':' + utilPad(min, 2) + ':' + utilPad(sec, 2)

    if (addFunc && typeof addFunc === 'function') {
      // 渡されたオブジェクトが関数なら実行する
      addFunc()
    }

  } ,1000)

}

function utilViewQRcode(qrtext = '') {
  utilImport('js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js', function() {
    let utf8qrtext = unescape(encodeURIComponent(qrtext))
    $("#utilImage-QR").html("")
    $("#utilImage-QR").qrcode({text:utf8qrtext})
  })
}

function utilOpenModal(id = '') {
	let modal = utilQuerySelector('#' + id + '.utilModal')
	let closeButton = utilQuerySelector('.utilModal-close', false, modal)
  modal.style.display = 'block'
	//バツ印がクリックされた時
	closeButton.addEventListener('click',function () {
    modal.style.display = 'none'
	})

	//モーダルコンテンツ以外がクリックされた時
	addEventListener('click', function (e) {
    if (e.target == modal) {
      modal.style.display = 'none'
    }
	})
  return modal
}
