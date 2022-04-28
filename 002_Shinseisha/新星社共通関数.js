
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
 * Plesanterメッセージを利用する関数です。
 * @param {String} message メッセージ内容
 * @param {String} type 深刻度
 * @param {boolean} clear メッセージを消す
 *
 * @return {String} 加工された文字列
 */
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
      throw new Error(message)
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

/**
 * 指定されたIDを持つHTMLエレメントを削除する関数です。
 * @param {Array} ids 削除ID
 */
function utilRemoveElements (ids) {
  ids.forEach(v => document.getElementById(v).remove())
}

/**
 * コマンドエリアにボタンを追加する関数です。
 * @param {String} buttonId ボタンID
 * @param {String} label ラベル
 * @param {function} clickFunc click時間数
 */
function utilAddButton (buttonId, label, clickFunc) {
	let target = document.getElementById('MainCommands')
	let elem = document.createElement('button')
	elem.id = buttonId
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = clickFunc
	elem.innerText = label

  target.appendChild(elem)
}


/**
 * 時刻を出力する関数です。
 * @param {date} date 日付型
 * @param {String} format フォーマット
 *
 * @return {String} フォーマット加工された日付文字列
 *
 * 例. date = 'Mon Apr 18 2022 19:05:52 GMT+0900 (日本標準時)' format='YYYY-MM-DD'
 *            ⇓
 *    '2022-04-18'
 */
function utilGetDate (date, format) {
  if (typeof date === 'undefined' || utilIsNull(date)) {
    date = new Date()
  }
  if (typeof format === 'undefined' || utilIsNull(format)) {
    format = 'YYYY-MM-DDThh:mm:ss'
  }
  date = new Date(date)
  return format
    .replace(/YYYY/, utilPaddingLeft(date.getFullYear(), 4))
    .replace(/MM/, utilPaddingLeft(date.getMonth() + 1, 2))
    .replace(/DD/, utilPaddingLeft(date.getDate(), 2))
    .replace(/hh/, utilPaddingLeft(date.getHours(), 2))
    .replace(/mm/, utilPaddingLeft(date.getMinutes(), 2))
    .replace(/ss/, utilPaddingLeft(date.getSeconds(), 2))

}

/**
 * 左パディングする関数です。
 * @param {String} str 数値
 * @param {Number} size 桁数
 * @param {String} char パディング文字
 * @return {String} パディングされた文字列
 */
function utilPaddingLeft (str, size = 1, char = '0') {
  if (char.length !== 1) {
    console.log("1文字ではないです。")
  }
	return (char.repeat(size) + str).substr(-1 * size)
}

/**
 * 右パディングする関数です。
 * @param {String} str 数値
 * @param {Number} size 桁数
 * @param {String} char パディング文字
 * @return {String} パディングされた文字列
 */
function utilPaddingRight (str, size = 1, char = ' ') {
  if (char.length !== 1) {
    console.log("1文字ではないです。")
  }
	return (str + char.repeat(size)).substr(0, size)
}

/**
 * 引数のcsv文字列をCSVでダウンロードする関数です。
 * @param {String} csvStr csv文字列
 * @param {String} title ファイル名
 */
function utilDownloadCsv (csvStr, title = 'test') {

  // a要素を作成する
  const ele = document.createElement('a')
  // a要素にエンコード化した出力データを追加
  ele.setAttribute('href', encodeURI(csvStr))
  // a要素に出力情報を追加
  ele.setAttribute('download', title + '.csv')
  ele.style.visibility = 'hidden'
  document.body.appendChild(ele)
  // HTMLドキュメントに追加したa要素を実行(clickイベント発火)
  ele.click()
  document.body.removeChild(ele)

}

/**
 * 引数の2次元配列をUTF-8のCSVに変換する関数です。
 * @param {Array} array 2次元配列
 *
 * @return {String} csvData
 * 例. [
 *      ['数量', '単価', '合計'],
 *      ['1', '2', '2'],
 *      ['4', '5', '20'],
 *      ['7', '8', '56'],
 *     ]
 *            ⇓
 * 'data:text/csvcharset=utf-8,"数量","単価","合計"\r\n"1","2","2"\r\n"4","5","20"\r\n"7","8","56"\r\n'
 */
function utilConvert2DToCsv (d2array) {
  // csvDataに出力方法を追加
  let csvOutput = 'data:text/csvcharset=utf-8,'
  let csvData = csvOutput
  d2array.forEach(v => {
    const row = '"' + v.join('","') + '"'
    csvData += row + '\r\n'
  })
  return csvData
}

/**
 * 引数の2次元配列をUTF-8のCSVに変換する関数です。
 * @param {String} csvData
 *
 * @return {Array} array 2次元配列
 * 例. 'data:text/csvcharset=utf-8,"数量","単価","合計"\r\n"1","2","2"\r\n"4","5","20"\r\n"7","8","56"\r\n'
 *            ⇓
 *     [
 *      ['数量', '単価', '合計'],
 *      ['1', '2', '2'],
 *      ['4', '5', '20'],
 *      ['7', '8', '56'],
 *     ]
 */
function utilConvertCsvTo2D (csvData) {
  // csvDataに出力方法を追加
  let csvOutput = 'data:text/csvcharset=utf-8,'
  return csvData.replace(csvOutput, '').split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !utilIsNull(r))
}


/**
 * m行n列の2次元配列を生成する関数です。
 * @param {Number} m 行数
 * @param {Number} n 列数
 * @param {Number} val 初期値
 *
 * @return {Array} 2次元配列
 *
 * 例. m = 3, n = 4, val = 1
 *            ⇓
 * [
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 * ]
 */
function utilGenerate2DArray (m, n, val = 0) {
  return [...Array(m)].map(_ => Array(n).fill(val))
}

/**
 * 配列を分割する関数です。
 * @param {Array} array 配列
 *
 * @return {Array} 2次元配列
 *
 * 例. array = [1, 1, 2, 3, 3, 4, 1, 2, 3, 5, 5, 1, 2, 3, 5]
 *            ⇓
 * [ [1, 1, 1, 1], [2, 2, 2], [3, 3, 3, 3], [4], [5, 5, 5] ]
 */
function utilDivideArray (array) {
  return [...new Set(array)].map(x => Array(array.filter(y => y == x).length).fill(x))
}

/**
 * 2次元配列の指定列にて分割する関数です。
 * @param {Array} d2array 2次元配列
 * @param {Number} index 指定列番号
 *
 * @return {Array} 3次元配列
 *
 * 例. d2array = [["74060", "60", "YY-727", "関東倉庫", "九州倉庫", "12", "出荷済"]
 *               ,["74063", "25", "TESTYP-30B-2*", "九州倉庫", "関東倉庫", "24", "補充済"]
 *               ,["74061", "25", "TESTYP-30B-4*", "関東倉庫", "九州倉庫", "300", "出荷済"]
 *               ,["74058", "25",  "*IEH36*", "九州倉庫",  "", "100", "確認済"]
 *               ,["74057", "47",  "*1571-914*", "北海道倉庫",  "", "1", "確認済"]]
 *     index = 3
 *                              ⇓
 *
 *   [[["74061","25","TESTYP-30B-4*","関東倉庫","九州倉庫","300","出荷済"],["74060","60","YY-727","関東倉庫","九州倉庫","12","出荷済"]]
 *   ,[["74057","47","*1571-914*","北海道倉庫","","1","確認済"]]
 *   ,[["74058","25","*IEH36*","九州倉庫","","100","確認済"],["74063","25","TESTYP-30B-2*","九州倉庫","関東倉庫","24","補充済"]]]
 */

function utilDivide2DArray(d2array, index) {
  let list = []
  let codes = []
  let tmp = ""
  d2array = d2array.sort((a, b) => a[index] < b[index] ? 1 : -1)
  for (let arr of d2array) {
    if (tmp !== arr[index]) {
      list.push(codes)
      codes = []
    }
    codes.push(arr)
    tmp = arr[index]
  }
  list.push(codes)
  return list.filter(v => !utilIsNull(v))
}


/**
 * querySelectorを利用してHTMLエレメントを返却、複数取得した場合はNodeListをArrayに変換してから返却
 * @param {Array} selector セレクタ
 * @param {Array} all 複数返却
 * @param {Array} dom 親DOM
 *
 * @return {Array} HTMLエレメント
 */
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

/**
 * 登録APIを呼び出す関数です。
 */
function utilCreateAjax(siteId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, addFunc) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/items/" + siteId + "/create",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
        ClassHash,
        NumHash,
        DateHash,
        DescriptionHash,
        CheckHash
			})
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result);
			},
			function () {
				// エラー
				reject();
			}
		)
	})
}

/**
 * 更新APIを呼び出す関数です。
 */
function utilUpdateAjax(recordId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, addFunc) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/items/" + recordId + "/update",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
        ClassHash,
        NumHash,
        DateHash,
        DescriptionHash,
        CheckHash
			})
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result);
			},
			function () {
				// エラー
				reject();
			}
		)
	})
}

/**
 * 取得APIを呼び出す関数です。
 */
function utilExportAjax (siteId, requests, header = true, type = "csv", addFunc) {
  let req = []
  requests.forEach(v => req.push({"ColumnName" : v}))

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/items/" + siteId + "/export",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
				"Export": {
					"Columns": req,
					"Header": header,
					"Type": type
				},
				"View": {
					"ColumnSorterHash": {
						"ResultId": "asc"
					},
				}
			})
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result);
			},
			function () {
				// エラー
				reject()
			}
		)
	})
}