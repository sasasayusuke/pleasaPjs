var version = 7
var api_version = 1.1

var NORMAL  = 100
var WARNING = 500
var ERROR   = 900
var NEW     = -100

var SERVER_URL = "https://mis-tech.sdt-autolabo.com"

/**
 * テーブル情報
 * サイト複製時には、新しく割り振れたテーブルIDを入力し直してください。
 *
 */
var TABLE = [
  //【01】見積台帳
  , TABLE_ID_ESTIMATION_BOOK                = 81092
  //【02】注文入力フォーム
  , TABLE_ID_ORDER_INPUT_FORM               = 81095
  //【03】注文管理台帳
  , TABLE_ID_ORDER_CONTROL_BOOK             = 81093
  //【04】先行依頼書台帳
  , TABLE_ID_REQUEST_BOOK                   = 81091
  //【05】請求書台帳
  , TABLE_ID_CLAIM_BOOK                     = 81094
  //【06】インボイス番号台帳
  , TABLE_ID_INVOICE_NO                     = 81096
  //【07】仕入先注文書台帳
  , TABLE_ID_SUPPLIER_ORDER_BOOK            = 81081
  //【11】国番号
  , TABLE_ID_COUNTRY_NO                     = 81088
  //【12】会社区分
  , TABLE_ID_COMPANY_CLASS                  = 81083
  //【13】会社
  , TABLE_ID_COMPANY_INFO                   = 81086
  //【14】事業所
  , TABLE_ID_OFFICE_INFO                    = 81087
  //【15】製品
  , TABLE_ID_PRODUCT_INFO                   = 81084
  //【16】エンドユーザ
  , TABLE_ID_END_USER                       = 81089
  //【17】コミッション率
  , TABLE_ID_COMMISSION_RATE                = 81085
  // メッセージログ（commonSetMessageで使用）
  , TABLE_ID_MESSAGE_LOG                    = 57349
  // エクセルフォーマット（downloadExcelで使用）
  , TABLE_ID_EXCEL_FORMAT                   = 7
]



// 各画面ロード時に実行するメソッドを格納する
$p.events.on_grid_load_arr = []
$p.events.on_editor_load_arr = []

// 格納したメソッドを実行するメソッド
$p.events.on_grid_load = function () {
  console.log("$p.events.on_grid_load!!!")
  $p.events.on_grid_load_arr.forEach(func => func())
}
$p.events.on_editor_load = function () {
  console.log("$p.events.on_editor_load!!!")
  $p.events.on_editor_load_arr.forEach(func => func())
}

$p.events.on_grid_load_arr.push(function () {
  if (!TABLE.includes($p.siteId())) {
		commonSetMessage(message = "テーブルIDを修正してください。スクリプトタブから共通変数を確認してください。", type = ERROR)
	}
})

/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function commonIsNull (obj) {
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
 * @param {boolean} leave ログを残す
 * @param {boolean} set ブラウザメッセージを出す
 * @param {String} description 追記内容
 *
 */
async function commonSetMessage (message = '', type = NORMAL, leave = false, set = true, description = "") {
  $p.clearMessage()
  if (leave) {
    let log = await commonCreateAjax(
      TABLE_ID_MESSAGE_LOG
      , {
        ClassA: $p.id()
      }
      , {}
      , {}
      , {
        DescriptionA: message
        , DescriptionB: JSON.stringify(description)

      }
      , {}
      , type
    )
    console.log(`エラーログ：${SERVER_URL}/items/${log.Id}`)

  }
  if (set) {
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
      default:
        commonSetMessage(`メッセージタイプが不正な値です。`, ERROR, true, type)
    }
  }
}

/**
 * 分類項目の値を選択したときの表示制御。
 * @param {String} label ステータスラベル
 * @param {Array} useStatus 利用ステータス
 * @param {String} color 現状のステータスの色
 * @param {String} id ID
 * @param {String} boxClass クラス名
 *
 */
function commonSetFlowchart(label, useStatus, color = "red", id = 'flowchartId', boxClass = 'boxClass') {
  if (commonIsNull(document.getElementById("CommentField"))) return
  let html = `
      <div id="${id}" class="flow">
      </div>
      <style>
          .flow {
              margin: 0 auto 50px;
          }
          .flow .${boxClass}.${color} {
              background-color: ${color};
              color: white;
          }
          .flow .${boxClass} {
              margin: 0 auto 33px;
              width: 66%;
              text-align: center;
              padding: 10px;
              border: 3px solid #326E93;
              -webkit-border-radius: 5px;
              border-radius: 5px;
              position: relative;
              font-weight: bold; /* テキストの指定 */
              background-color: cornsilk
          }
          .flow .${boxClass}:after {
              border-top: 20px solid #FFC300;
              border-left: 50px solid transparent;
              border-right: 50px solid transparent;
              content: "";
              position: absolute;
              bottom: -28px; /* 三角形の高さ＋ボックスのボーダーをマイナスに */
              margin-left: -100px; /* 中央寄せに使用 */
              left: 180px;
          }

          .flow .${boxClass}:last-child:after {
              border: none; /* 最後のボックスだけ三角形を表示しない */
          }
      </style>`
  $("#CommentField").prepend(html)

  for (let s of useStatus) {
      let boxDiv = document.createElement("div")
      boxDiv.classList.add(boxClass)
      boxDiv.innerHTML = s.label
      if (commonGetVal(label) == s.label) boxDiv.classList.add(color)
      document.getElementById(id).appendChild(boxDiv)
  }
}

/**
 * 分類項目の値を選択したときの表示制御。
 * @param {String} className 分類項目
 * @param {Array} labels 表示制御項目
 * @param {String} value 指定値
 * @param {String} value 指定値
 * @param {String} value 指定値
 *
 */
function commonDisplayClass(className, labels, value, successFunc, failureFunc) {
  let elems = []
  if (Array.isArray(labels)) {
    elems = labels
  } else {
    elems = [labels]
  }

  // 指定値を選択したとき
  if (commonGetVal(className) == value) {
      // 表示化
      elems.forEach(v => commonHideElements(commonGetId(v, true, true), false))
      if (successFunc && typeof successFunc === 'function') {
        // 渡されたオブジェクトが関数なら実行する
        successFunc()
      }
  } else {
      // 非表示化 & 内容消去
      elems.forEach(v => {
        commonHideElements(commonGetId(v, true, true))
        commonSetVal(v, "")
      })
      if (failureFunc && typeof failureFunc === 'function') {
        // 渡されたオブジェクトが関数なら実行する
        failureFunc()
      }
  }
}

/**
 * 指定されたIDを持つHTMLエレメントを削除する関数です。
 * @param {Array} ids 削除ID
 */
function commonRemoveElements (ids) {
  let elems = []
  if (Array.isArray(ids)) {
    elems = ids
  } else {
    elems = [ids]
  }

  elems.filter(v => !commonIsNull(document.getElementById(v))).forEach(v => document.getElementById(v).remove())
}

/**
 * 指定されたIDを持つHTMLエレメントの子要素をすべて削除する関数です。
 * @param {String} id 削除ID
 */
function commonRemoveElementChilds (id) {
  //要素取得
  let target = document.getElementById(id)
  //子要素削除
  while(target.lastChild) {
      target.removeChild(target.lastChild)
  }
}

/**
 * 指定されたIDを持つHTMLエレメントを表示・非表示を切り替える関数です。
 * @param {Array} ids 削除ID
 * @param {Array} flg 表示・非表示
 */
function commonHideElements (ids, flg = true) {
  let elems = []
  if (Array.isArray(ids)) {
    elems = ids
  } else {
    elems = [ids]
  }

  elems.filter(v => !commonIsNull(document.getElementById(v))).forEach(v => document.getElementById(v).hidden = flg)
}

/**
 * コマンドエリアにボタンを追加する関数です。
 * @param {String} buttonId ボタンID
 * @param {String} label ラベル
 * @param {function} clickFunc click時間数
 */
function commonAddButton (buttonId, clickFunc, label, styleStr) {
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
function commonGetDateEmpty () {
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
function commonGetDate (date, format) {
  if (typeof date === 'undefined' || commonIsNull(date)) {
    date = new Date()
  }
  if (typeof format === 'undefined' || commonIsNull(format)) {
    format = 'YYYY-MM-DDThh:mm:ss'
  }
  date = new Date(date)
  return format
    .replace(/YYYY/, commonPaddingLeft(date.getFullYear(), 4))
    .replace(/MM/, commonPaddingLeft(date.getMonth() + 1, 2))
    .replace(/DD/, commonPaddingLeft(date.getDate(), 2))
    .replace(/hh/, commonPaddingLeft(date.getHours(), 2))
    .replace(/mm/, commonPaddingLeft(date.getMinutes(), 2))
    .replace(/ss/, commonPaddingLeft(date.getSeconds(), 2))

}

/**
 * 左パディングする関数です。
 * @param {String} str 数値
 * @param {Number} size 桁数
 * @param {String} char パディング文字
 * @return {String} パディングされた文字列
 */
function commonPaddingLeft (str, size = 1, char = '0') {
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
function commonPaddingRight (str, size = 1, char = ' ') {
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
function commonDownloadCsv (csvStr, title = 'test') {

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
function commonConvert2DToCsv (d2array) {
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
function commonConvertCsvTo2D (csvData) {
  // csvDataに出力方法を追加
  let csvOutput = 'data:text/csvcharset=utf-8,'
  return csvData.replace(csvOutput, '').split(/\n/).map(r => JSON.parse(`[${r}]`)).filter(r => !commonIsNull(r))
}

/**
 * アルファベットのみの文字列を数値に変換する
 * @param {String} str アルファベット列
 *
 * @return {Number} 数値変換値
 * 例. A  ⇒ 1
 *     Z  ⇒ 26
 *     AA ⇒ 27
 */
function commonConvertAto1(str) {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let count = 0
  for (let i = 0; i < str.length; i++) {
      j = str.length - i - 1
      count = count + (alphabet.indexOf(str.toUpperCase()[j]) + 1) * (alphabet.length ** i)
  }
  return count
}

/**
 * カンマ区切り数列を数値に変換する
 * @param {String} str カンマ区切り数列
 *
 * @return {Number} 数値変換値
 * 例. "1,500"  ⇒ 1500
 */
function commonConvertCTo1(str) {
  str = commonIsNull(str) ? "0" : String(str)
  return +str.replace(',', '')
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
function commonJoinLeft (arr1, arr2, val = 0, arr1KeyIndex = 0, arr2KeyIndex = 0) {
  let size = arr2[0].length
  return arr1.map(v => {
    let tmpArr = arr2.find(w => v[arr1KeyIndex] == w[arr2KeyIndex])
    if (commonIsNull(tmpArr)) {
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
function commonGenerate2DArray (m, n, val = 0) {
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
function commonAddColumn (d2array, n, val = 0) {
  let m = d2array.length
  let arr = commonGenerate2DArray(m, n, val)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!commonIsNull(d2array[i][j])) arr[i][j] = d2array[i][j]
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
function commonDivideArray (array) {
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

function commonDivide2DArray(d2array, index) {
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
  return list.filter(v => !commonIsNull(v))
}

/**
 * 文字列配列内の重複項目を削除する
 * @param {array} arr 文字列配列
 */
function commonUniqueArray(arr) {
  return arr.filter((elem, index) => arr.indexOf(elem) === index)
}

/**
 * 入力されたラベルのIDを返却する。
 * @param {String} label ラベル
 */
function commonGetId (label, prefix = true, suffix = false) {
  let id = $p.getColumnName(label)
  if (commonIsNull(id)) {
    commonSetMessage('共通関数commonGetId：ラベル不正。', ERROR, true, label)
  } else {
    id = prefix ? $p.tableName() + '_' + id : id
    id = suffix ? id + 'Field' : id
  }
  return id
}

/**
 * 入力されたラベルに一致する項目を読取専用に変更または解除する。
 * @param {String} label ラベル
 * @param {Boolean} flg trueなら読取専用 falseなら読取解除
 */
function commonChangeReadOnly (label, flg = true) {
  let area = commonGetId(label)
  let field = commonGetId(label, true, true)

  if (commonIsNull(area)) {
    commonSetMessage('共通関数commonChangeReadOnly：ラベル不正。', ERROR, true, label)
  } else {
    // 入力項目disable制御
    document.getElementById(area).disabled = flg

    // icon 表示制御
    let icons = ['ui-icon-clock', 'ui-icon-person', 'ui-icon-pencil', 'ui-icon-image', 'ui-icon-video']
    for (let icon of icons) {
      let target = document.getElementById(field).querySelector('.' + icon)
      if (!commonIsNull(target)) {
        target.style['visibility'] = flg ? 'hidden' : 'visible'
      }
    }
  }
}

/**
 * 入力されたラベルに一致する項目の選択した値を返却する。
 * @param {String} label ラベル
 * @param {String} flg true: value false: text
 */
function commonGetVal (label, valueFlg = false) {
  // 選択系
  let value = ""
  try {
    value = valueFlg ? $p.getControl($p.getColumnName(label)).children(':selected').val() : $p.getControl($p.getColumnName(label)).children(':selected').text()
    if (commonIsNull(value)) {
      // 選択系 読み取り専用
      value = valueFlg ? $p.getControl($p.getColumnName(label)).attr('data-value') : $p.getControl($p.getColumnName(label))[0].innerHTML
      if (commonIsNull(value)) {
        // 選択系以外
        value = $p.getControl($p.getColumnName(label)).val()
      }
    }
  } catch (e) {
    console.log(e)
    value = ""
  } finally {
    return value
  }
}

/**
 * 入力されたラベルに一致する項目の選択した値を入力する。
 * @param {String} label ラベル
 * @param {object} value 値
 */
function commonSetVal (label, value) {
  // 選択系
  $p.set($p.getControl(label), value)
}

/**
 * 取得APIを呼び出す関数です。
 *
 * @param {Array}     culumns 取得列
 * @param {Object}    filters フィルター条件
 * @param {Object}    valueFlg value値
 * @param {Object}    id テーブルID
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonGetData(culumns, filters, valueFlg = true, id = $p.siteId(), addFunc) {
  let sorts = {
    "ResultId":"asc"
  }
  if (commonIsNull(filters)) {
    filters = {}
  }
return $p.apiGet({
      'id': id,
      'data': {
          'View': {
              'ApiDataType': "KeyValues",
              'ApiColumnValueDisplayType': valueFlg ?  "Value" : "DisplayValue",
              'GridColumns': culumns,
              'ColumnSorterHash': sorts,
              'ColumnFilterHash': filters,
          }
      },
      'done': function (data) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }

          return data.Response.Data
      }
  })
}

c
/**
 * 登録APIを呼び出す関数です。
 *
 * @param {String}    tableId 登録テーブルID
 * @param {Object}    ClassHash 登録分類項目
 * @param {Object}    NumHash 登録数値項目
 * @param {Object}    DateHash 登録日付項目
 * @param {Object}    DescriptionHash 登録説明項目
 * @param {Object}    CheckHash 登録チェック項目
 * @param {String}    Status 登録ステータス
 * @param {String}    Comments 登録コメント
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonCreateAjax(tableId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, Status, Comments, addFunc) {

  let data = JSON.stringify({
    "ApiVersion": api_version,
    Status,
    Comments,
    ClassHash,
    NumHash,
    DateHash,
    DescriptionHash,
    CheckHash
  })
  if (!commonIsNull(Status)) {
    delete data["Status"]
  }
  if (!commonIsNull(Comments)) {
    delete data["Comments"]
  }

  return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: `/api/items/${tableId}/create`,
			contentType: 'application/json',
			data: data
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result)
			},
			function () {
				// エラー
				reject()
			}
		)
	})
}

/**
 * 更新APIを呼び出す関数です。
 *
 * @param {String}    recordId 更新レコードID
 * @param {Object}    ClassHash 更新分類項目
 * @param {Object}    NumHash 更新数値項目
 * @param {Object}    DateHash 更新日付項目
 * @param {Object}    DescriptionHash 更新説明項目
 * @param {Object}    CheckHash 更新チェック項目
 * @param {String}    Status 更新ステータス
 * @param {String}    Comments 更新コメント
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonUpdateAjax(recordId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, Status, Comments, addFunc) {
  let data = JSON.stringify({
    "ApiVersion": api_version,
    Status,
    Comments,
    ClassHash,
    NumHash,
    DateHash,
    DescriptionHash,
    CheckHash
  })
  if (!commonIsNull(Status)) {
    delete data["Status"]
  }
  if (!commonIsNull(Comments)) {
    delete data["Comments"]
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
				resolve(result)
			},
			function () {
				// エラー
				reject()
			}
		)
	})
}

/**
 * エクスポートAPIを呼び出す関数です。csv形式で取得
 *
 * @param {String}    tableId 取得テーブルID
 * @param {Array}     columns 取得列
 * @param {Object}    filters フィルター条件
 * @param {Boolean}   over trueなら超過分のみ取得
 * @param {Boolean}   header trueならheaderも取得
 * @param {String}    type csv か jsonを選択
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonExportAjax (tableId, columns, filters, over = false, header = true, type = "csv", addFunc) {
  let col = []
  columns.forEach(v => col.push({"ColumnName" : v}))
  if (commonIsNull(filters)) {
    filters = {}
  }
  let data = JSON.stringify({
    "ApiVersion": api_version,
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

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: `/api/items/${tableId}/export`,
			contentType: 'application/json',
			data: data
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result)
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
async function commonExportUserAjax (userIds, addFunc) {
  let users = []
  if (Array.isArray(userIds)) {
    users = userIds
  } else {
    users = [userIds]
  }
  let data = JSON.stringify({
    "ApiVersion": api_version,
    "View": {
      "ColumnFilterHash": {
        "UserId" : JSON.stringify(users)
      }
    }
  })
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/users/get",
			contentType: 'application/json',
			data: data
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result)
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
async function commonExportGroupAjax (groupIds, addFunc) {
  let groups = []
  if (Array.isArray(groupIds)) {
    groups = groupIds
  } else {
    groups = [groupIds]
  }
  let data = JSON.stringify({
    "ApiVersion": api_version,
    "View": {
      "ColumnFilterHash": {
        "GroupId" : JSON.stringify(groups)
      }
    }
  })
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/groups/get",
			contentType: 'application/json',
			data: data
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result)
			},
			function () {
				// エラー
				reject()
			}
		)
	})
}

/**
 * レコード複製を行う関数です。（編集画面で使用を想定）
 *
 * @param {Object}    editItems 変更項目
 * @param {Array}     deleteLabels 削除項目名
 * @param {String}    Status 登録ステータス
 * @param {String}    Comments 登録コメント
 * @param {Number}    expand 最大拡張項目数
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonCopyRecordAjax(editItems = {}, deleteLabels = [], Status, Comments, expand = 99, addFunc) {

  let clsHash = {}
  let numHash = {}
  let datHash = {}
  let dscHash = {}
  let chkHash = {}

  //項目Aから項目Z
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  for (let char of alphabet) {
    let clsKey = "Class" + char
    let numKey = "Num" + char
    let datKey = "Date" + char
    let dscKey = "Description" + char
    let chkKey = "Check" + char
    if (!commonIsNull(commonGetVal(clsKey))) clsHash[clsKey] = commonIsNull(commonGetVal(clsKey, true)) ? commonGetVal(clsKey) : commonGetVal(clsKey, true)
    if (!commonIsNull(commonGetVal(numKey))) numHash[numKey] = commonConvertCTo1(commonGetVal(numKey))
    if (!commonIsNull(commonGetVal(datKey))) datHash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
    if (!commonIsNull(commonGetVal(dscKey))) dscHash[dscKey] = commonGetVal(dscKey)
    if (!commonIsNull(commonGetVal(chkKey))) chkHash[chkKey] = commonGetVal(chkKey)
  }
  //項目001から項目099
  for (let i = 1; i <= expand; i++) {
    let clsKey = "Class" + commonPaddingLeft(i, 3)
    let numKey = "Num" + commonPaddingLeft(i, 3)
    let datKey = "Date" + commonPaddingLeft(i, 3)
    let dscKey = "Description" + commonPaddingLeft(i, 3)
    let chkKey = "Check" + commonPaddingLeft(i, 3)
    if (!commonIsNull(commonGetVal(clsKey))) clsHash[clsKey] = commonIsNull(commonGetVal(clsKey, true)) ? commonGetVal(clsKey) : commonGetVal(clsKey, true)
    if (!commonIsNull(commonGetVal(numKey))) numHash[numKey] = commonConvertCTo1(commonGetVal(numKey))
    if (!commonIsNull(commonGetVal(datKey))) datHash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
    if (!commonIsNull(commonGetVal(dscKey))) dscHash[dscKey] = commonGetVal(dscKey)
    if (!commonIsNull(commonGetVal(chkKey))) chkHash[chkKey] = commonGetVal(chkKey)
  }
  // 変更項目を上書き
  for (let key in editItems) {
    if (key.includes("Class")) clsHash[key] = editItems[key]
    else if (key.includes("Num")) numHash[key] = editItems[key]
    else if (key.includes("Date")) datHash[key] = editItems[key]
    else if (key.includes("Description")) dscHash[key] = editItems[key]
    else if (key.includes("Check")) chkHash[key] = editItems[key]
  }
  // 不要項目を削除
  for (let label of deleteLabels) {
    let key = $p.getColumnName(label)
    if (key.includes("Class"))  delete clsHash[key]
    else if (key.includes("Num")) delete numHash[key]
    else if (key.includes("Date")) delete datHash[key]
    else if (key.includes("Description")) delete dscHash[key]
    else if (key.includes("Check")) delete chkHash[key]
  }
  // ステータスを取得
  if (commonIsNull(Status)) {
    Status = commonGetVal("Status", true)
  }

  return commonCreateAjax(
    $p.siteId()
    , clsHash
    , numHash
    , datHash
    , dscHash
    , chkHash
    , Status
    , Comments
    , addFunc
  )
}