
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
  ids.filter(v => !utilIsNull(document.getElementById(v))).forEach(v => document.getElementById(v).remove())
}
/**
 * 指定されたIDを持つHTMLエレメントを表示・非表示を切り替える関数です。
 * @param {Array} ids 削除ID
 * @param {Array} flg 表示・非表示
 */
function utilHideElements (ids, flg = true) {
  ids.filter(v => !utilIsNull(document.getElementById(v))).forEach(v => document.getElementById(v).hidden = flg)
}

/**
 * コマンドエリアにボタンを追加する関数です。
 * @param {String} buttonId ボタンID
 * @param {String} label ラベル
 * @param {function} clickFunc click時間数
 */
function utilAddButton (buttonId, clickFunc, label, styleStr) {
	let target = document.getElementById('MainCommands')
	let elem = document.createElement('button')
	elem.id = buttonId
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = clickFunc
	elem.innerText = label
	elem.style = styleStr
  target.appendChild(elem)
}

/**
 * 空時刻を出力する関数です。
 * @return {String} 空時刻
 */
function utilGetDateEmpty () {
  return '1899-12-30T00:00:00'
}

/**
 * 時刻を出力する関数です。
 *
 *
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
 * 2次元配列 * 2次元配列 で left join する関数です。(比較する行はuniqueにしてください。)
 * @param {Array} arr1 2次元配列
 * @param {Array} arr2 2次元配列
 * @param {Number} val 初期値
 * @param {Number} arr1KeyIndex arr1の比較列
 * @param {Number} arr2KeyIndex arr2の比較列
 *
 * @return {Array} 2次元配列
 *
 * 例. arr1 = [["T3B-12",5413,1879],    arr2 = [["SC133S","SC133L","2",true],      val = ""
 *             ["TD-150",2858,8520],            ["SC144S","SC144L","2",true],
 *             ["SC144S",2900,9696],            ["SC147S","SC147L","20",false]]
 *             ["SC147S",1476,9144]]
 *     　　　　                           ⇓
 *            [["T3B-12",5413,1879,"","","",""],
 *             ["TD-150",2858,8520,"","","",""],
 *     　　　　 ["SC144S",2900,9696,"SC144S","SC144L","2",true],
 *     　　　　 ["SC147S",1476,9144,"SC147S","SC147L","20",false]]
 */
function utilJoinLeft (arr1, arr2, val = 0, arr1KeyIndex = 0, arr2KeyIndex = 0) {
  let size = arr2[0].length
  return arr1.map(v => {
    let tmpArr = arr2.find(w => v[arr1KeyIndex] == w[arr2KeyIndex])
    if (utilIsNull(tmpArr)) {
      return v.concat(Array(size).fill(val))
    } else {
      return v.concat(tmpArr)
    }
  })
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
 * 2次元配列の列を追加する関数です。
 * @param {Array} d2array 2次元配列
 * @param {Number} n 生成２次元配列列数
 * @param {Number} val 初期値
 *
 * @return {Array} 生成２次元配列
 *
 *
 * 例. d2array = [["74060", "60"]  n = 5, val = 10
 *               ,["74063", "25"]
 *               ,["74061", "15"]
 *               ,["74058", "24"]
 *               ,["74057", "47"]]
 *  　　　　                   ⇓
 *                [["74060", "60", 10, 10, 10]
 *                ,["74063", "25", 10, 10, 10]
 *                ,["74061", "15", 10, 10, 10]
 *                ,["74058", "24", 10, 10, 10]
 *                ,["74057", "47", 10, 10, 10]]
 *
 */
function utilAddColumn (d2array, n, val = 0) {
  let m = d2array.length
  let arr = utilGenerate2DArray(m, n, val)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!utilIsNull(d2array[i][j])) arr[i][j] = d2array[i][j]
    }
  }
  return arr
}

/**
 * 配列を分割する関数です。
 * @param {Array} array 配列
 *
 * @return {Array} 2次元配列
 *
 * 例. array = [1, 1, 2, 3, 3, 4, 1, 2, 3, 5, 5, 1, 2, 3, 5]
 *                             ⇓
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
 * 入力されたラベルのIDを返却する。
 * @param {String} label ラベル
 */
function utilGetId (label) {
  return $p.tableName() + "_" + $p.getColumnName(label)
}

/**
 * 入力されたラベルに一致する項目を読取専用に変更または解除する。
 * @param {String} label ラベル
 * @param {Boolean} flg trueなら読取専用 falseなら読取解除
 */
function utilChangeReadOnly (label, flg = true) {
  document.getElementById($p.tableName() + "_" + $p.getColumnName(label)).disabled = flg
}

/**
 * 入力されたラベルに一致する項目の値を返却する。（エディタから読取専用にしないと正常動作しない場合があります。）
 * @param {String} label ラベル
 */
function utilGetControl (label) {
    return utilIsNull($p.getControl(label).val()) ? $p.getControl(label)[0].innerHTML : $p.getControl(label).val()
}

/**
 * 登録APIを呼び出す関数です。
 */
function utilCreateAjax(tableId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, addFunc) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: `/api/items/${tableId}/create`,
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
function utilUpdateAjax(recordId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, Status, addFunc) {
  let data = JSON.stringify({
    "ApiVersion": 1.1,
    Status,
    ClassHash,
    NumHash,
    DateHash,
    DescriptionHash,
    CheckHash
  })
  if (!utilIsNull(Status)) {
    delete data["Status"]
  }

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: `/api/items/${recordId}/update`,
			contentType: 'application/json',
			data: data
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
 *
 * @param {String}    tableId 取得テーブルID
 * @param {Array}     columns 取得列
 * @param {Object}    filters フィルター条件
 * @param {Boolean}   over trueなら超過分のみ取得
 * @param {Boolean}   header trueならheaderも取得
 * @param {String}    type csv か jsonを選択
 * @param {Function}  addFunc 最後に実行したい関数
 */
function utilExportAjax (tableId, columns, filters, over = false, header = true, type = "csv", addFunc) {
  let col = []
  columns.forEach(v => col.push({"ColumnName" : v}))
  if (utilIsNull(filters)) {
    filters = {}
  }

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: `/api/items/${tableId}/export`,
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
				"Export": {
					"Columns": col,
					"Header": header,
					"Type": type
				},
				"View": {
          "Overdue": over,
					"ColumnSorterHash": {
						"ResultId": "asc"
					},
          "ColumnFilterHash": filters
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

/**
 * ユーザー取得APIを呼び出す関数です。
 *
 * @param {Array}     userIds 取得UserId
 * @param {Function}  addFunc 最後に実行したい関数
 */
function utilExportUserAjax (userIds, addFunc) {
  let users
  if (Array.isArray(userIds)) {
    users = userIds
  } else {
    users = [userIds]
  }
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/users/get",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
				"View": {
          "ColumnFilterHash": {
            "UserId" : JSON.stringify(users)
          }
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

/**
 * グループ取得APIを呼び出す関数です。
 *
 * @param {Array}     groupIds 取得GroupId
 * @param {Function}  addFunc 最後に実行したい関数
 */
function utilExportGroupAjax (groupIds, addFunc) {
  let groups
  if (Array.isArray(groupIds)) {
    groups = groupIds
  } else {
    groups = [groupIds]
  }
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/groups/get",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
				"View": {
          "ColumnFilterHash": {
            "GroupId" : JSON.stringify(groups)
          }
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