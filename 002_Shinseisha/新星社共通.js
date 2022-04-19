var NORMAL = 'normal'
var WARNING = 'warning'
var ERROR = 'error'

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
    return !obj && isNaN(obj)
  }
}

/**
 * Plesanterメッセージを利用する関数です。
 * @param {string} message メッセージ内容
 * @param {string} type 深刻度
 * @param {boolean} clear メッセージを消す
 *
 * @return {string} 加工された文字列
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
 * 時刻を出力する関数です。
 * @param {date} date 日付型
 * @param {string} format フォーマット
 *
 * @return {string} フォーマット加工された日付文字列
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
  format = format.replace(/YYYY/, utilPaddingLeft(date.getFullYear(), 4))
  format = format.replace(/MM/, utilPaddingLeft(date.getMonth() + 1, 2))
  format = format.replace(/DD/, utilPaddingLeft(date.getDate(), 2))
  format = format.replace(/hh/, utilPaddingLeft(date.getHours(), 2))
  format = format.replace(/mm/, utilPaddingLeft(date.getMinutes(), 2))
  format = format.replace(/ss/, utilPaddingLeft(date.getSeconds(), 2))

  return format
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

/**
 * 引数のcsv文字列をUTF-8のCSVでダウンロードする関数です。
 * @param {string} csvStr csv文字列
 * @param {string} title ファイル名
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
 * 引数の2次元配列をCSVに変換する関数です。
 * @param {array} array 2次元配列
 *
 * @return {string} csvData
 * 例. [
 *      ['数量', '単価', '合計'],
 *      ['1', '2', '2'],
 *      ['4', '5', '20'],
 *      ['7', '8', '56'],
 * ]
 *            ⇓
 * 'data:text/csvcharset=utf-8,"数量","単価","合計"\r\n"1","2","2"\r\n"4","5","20"\r\n"7","8","56"\r\n'
 *
 */
function utilConvert2DToCsv (array) {
  // csvDataに出力方法を追加
  let csvData = 'data:text/csvcharset=utf-8,'

  array.forEach(v => {
    const row = '"' + v.join('","') + '"'
    csvData += row + '\r\n'
  })
  return csvData
}

/**
 * m行n列の2次元配列を生成する関数です。
 * @param {number} m 行数
 * @param {number} n 列数
 * @param {number} val 初期値
 *
 * @return {array} 2次元配列
 *
 * 例. m = 3, n = 4, val = 1
 *            ⇓
 * [
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 * ]
 */
function generate2DArray (m, n, val = 0) {
  return [...Array(m)].map(_ => Array(n).fill(val))
}