
$p.events.on_grid_load = function () {
	let html =  `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<meta charset="UTF-8">

  <div id="startDiv">
    <label>人数</label>
    <input id="player" type="number">
    <button id="start" type="button" class="btn btn-outline-danger" onclick="startFunc()">start</button>
  </div>
  <div id="mainDiv" hidden>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="ownRadio" value="option1" checked>
      <label class="form-check-label" for="ownRadio">own</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="trashRadio" value="option2">
      <label class="form-check-label" for="trashRadio">trash</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="cancelRadio" value="option3">
      <label class="form-check-label" for="cancelRadio">cancel</label>
    </div>
    <div id="trashDiv"></div>
    <input id="playCard" name="playCard" maxlength="3" onKeyDown="changeKey(event)">
    <div id="dataDiv">
      </br>
      <div class="border border-primary" style="padding:10px">
        <label>own : </label>
        <label id="ownArray"></label>
        </br>
        <label>max : </label>
        <label id="ownMax"></label>
        </br>
        <label>min : </label>
        <label id="ownMin"></label>
        </br>
        <label>average : </label>
        <label id="ownAverage"></label>
      </div>
      </br>
      <div class="border border-secondary" style="padding:10px">
        <label>own trash: </label>
        <label id="ownTrashArray"></label>
        </br>
        <label>max : </label>
        <label id="ownTrashMax"></label>
        </br>
        <label>min : </label>
        <label id="ownTrashMin"></label>
        </br>
        <label>average : </label>
        <label id="ownTrashAverage"></label>
      </div>
      </br>
      <div class="border border-secondary" style="padding:10px">
        <label>trash : </label>
        <label id="trashArray"></label>
        </br>
        <label>max : </label>
        <label id="trashMax"></label>
        </br>
        <label>min : </label>
        <label id="trashMin"></label>
        </br>
        <label>average : </label>
        <label id="trashAverage"></label>
      </div>
      </br>
    </div>
    <div>
      <input id="startPoint" name="playCard" maxlength="2" >
      <input id="endPoint" name="playCard" maxlength="2" >
    </div>
    <button id="start" type="button" class="btn btn-outline-danger" onclick="endFunc()">end</button>
  </div>
	`

	$('#MainContainer').prepend(html)

	$('#Header').remove()
	$('#Application').remove()

}



// ウィンドウをフォーカスしたら指定した関数を実行
window.addEventListener('focus', play, false)
// ウィンドウからフォーカスが外れたら指定した関数を実行
window.addEventListener('blur', pause, false)


let playerCount = 0
let serialNo = 0
let lastCard = 104
let col = 4
let ownCards = []
let ownTrashCards = []
let trashCards = []

function startFunc() {
  playerCount = document.getElementById("player").value
  if (playerCount < 1 || playerCount > 16) {
    alert("異常値")
    return
  }
  serialNo = utilGetDate("", "YYYYMMDDhhmmss")
  document.getElementById("startDiv").hidden = true
  document.getElementById("mainDiv").hidden = false

  let badge = ""
  for (let i = 1; i <= lastCard; i++) {
    badge += `
      <span id="badge${i}" class="badge bg-light text-dark" onclick="changeBadge(${i})" style="width: 50px">${i}</span>
    `
    if (i % 11 == 0) {
      badge += `<br>`
    }
  }
  document.getElementById("trashDiv").innerHTML = badge
}

function endFunc() {

}

function changeKey() {
  if (event.key !== 'Enter') return
    cardValue = document.getElementById("playCard").value
  if (cardValue < 1 || cardValue > lastCard) {
    document.getElementById("playCard").value = ""
    return
  }
  document.getElementById("playCard").value = ""

  changeBadge(cardValue)
}

function changeBadge(i) {
  if (document.getElementById("ownRadio").checked) {
    if (ownCards.includes(+i) || trashCards.includes(+i)) return
    ownCards.push(+i)
    document.getElementById("badge" + +i).className = "badge bg-warning"
  } else if (document.getElementById("trashRadio").checked) {
    if (trashCards.includes(+i)) return
    if (ownCards.includes(+i)) {
      ownCards = ownCards.filter(v => v !== +i)
      ownTrashCards.push(+i)
    }
    trashCards.push(+i)
    document.getElementById("badge" + i).className = "badge bg-danger"
  } else if (document.getElementById("cancelRadio").checked) {
    ownCards = ownCards.filter(v => v !== +i)
    ownTrashCards = ownTrashCards.filter(v => v !== +i)
    trashCards = trashCards.filter(v => v !== +i)
    document.getElementById("badge" + +i).className = "badge bg-light text-dark"
  }
  updateData()
}

function updateData () {
  document.getElementById("ownAverage").innerHTML = averageArray(ownCards)
  document.getElementById("ownTrashAverage").innerHTML = averageArray(ownTrashCards)
  document.getElementById("trashAverage").innerHTML = averageArray(trashCards)

  document.getElementById("ownMin").innerHTML = Math.min.apply(null, ownCards)
  document.getElementById("ownTrashMin").innerHTML = Math.min.apply(null, ownTrashCards)
  document.getElementById("trashMin").innerHTML = Math.min.apply(null, trashCards)

  document.getElementById("ownMax").innerHTML = Math.max.apply(null, ownCards)
  document.getElementById("ownTrashMax").innerHTML = Math.max.apply(null, ownTrashCards)
  document.getElementById("trashMax").innerHTML = Math.max.apply(null, trashCards)

  document.getElementById("ownArray").innerHTML = ownCards
  document.getElementById("ownTrashArray").innerHTML = ownTrashCards
  document.getElementById("trashArray").innerHTML = trashCards
}

function averageArray(arr) {
  if (arr.length == 0) return
  let sum = arr.reduce((acc, cur) => acc + cur)
  return sum / arr.length
}

// ウィンドウがアクティブになった際に実行する関数
function play() {
  // 実行させる処理を記述
  document.getElementById("playCard").focus()
}

// ウィンドウがアクティブでなくなった際に実行する関数
function pause() {
  // 実行させる処理を記述

}

/**
 * 時刻を出力する関数です。
 * @param {date} date 日付型
 * @param {string} format フォーマット
 * @return {string} フォーマット加工された日付文字列
 */
function utilGetDate (date, format) {
  if (typeof date === 'undefined' || utilIsNull(date)) {
    date = new Date()
  }
  if (typeof format === 'undefined' || utilIsNull(format)) {
    format = 'YYYY-MM-DDThh:mm:ss'
  }
  date = new Date(date)
  format = format
    .replace(/YYYY/, utilPaddingLeft(date.getFullYear(), 4))
    .replace(/MM/, utilPaddingLeft(date.getMonth() + 1, 2))
    .replace(/DD/, utilPaddingLeft(date.getDate(), 2))
    .replace(/hh/, utilPaddingLeft(date.getHours(), 2))
    .replace(/mm/, utilPaddingLeft(date.getMinutes(), 2))
    .replace(/ss/, utilPaddingLeft(date.getSeconds(), 2))

  return format
}

function test() {
  create(
    {
      ClassA: serialNo,
    },
    {
      NumA: playerCount,
      Num001: trashCards.shift(),
      Num002: trashCards.shift(),
      Num003: trashCards.shift(),
      Num004: trashCards.shift(),
    },
    {},
    {},
    {},
    function(data) {
      let id = data.Id
      let turnCards =
      window.setTimeout(function() {
        create(
          {
            ClassA: id,
          },
          {
            NumA: playerCount,
            Num001: trashCards.shift(),
            Num002: trashCards.shift(),
            Num003: trashCards.shift(),
            Num004: trashCards.shift(),
          },
          {},
          {},
          {}
        )
      }, 1000)
    },
    110455
  )
}

function create(ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, addFunc, id = $p.siteId()) {
  $p.apiCreate({
    'id': id,
    'data': Object.assign(
      ClassHash,
      NumHash,
      DateHash,
      DescriptionHash,
      CheckHash
    ),
    'done': function (data) {
      console.log(data)
      if (addFunc && typeof addFunc === 'function') {
        // 渡されたオブジェクトが関数なら実行する
        addFunc(data)
      }
    },
    'fail': function (data) {
      alert(id + '登録に失敗しました。')
      console.log(data)
    },
    'always': function (data) {
    },
  })
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


/**
 * 左パディングする関数です。
 * @param {string} str 数値
 * @param {number} size 桁数
 * @param {string} char パディング文字
 * @return {string} パディングされた文字列
 */
function utilPaddingLeft (str, size = 1, char = '0') {
  if (char.length !== 1) {
    console.log("1文字ではないです。")
  }
	return (char.repeat(size) + str).substr(-1 * size)
}

/**
 * 右パディングする関数です。
 * @param {string} str 数値
 * @param {number} size 桁数
 * @param {string} char パディング文字
 * @return {string} パディングされた文字列
 */
function utilPaddingRight (str, size = 1, char = ' ') {
  if (char.length !== 1) {
    console.log("1文字ではないです。")
  }
	return (str + char.repeat(size)).substr(0, size)
}
