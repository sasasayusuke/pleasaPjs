var NORMAL = 'normal'
var WARNING = 'warning'
var ERROR = 'error'

/**
 * Plesanterメッセージを利用する関数です。
 * @param {string} message メッセージ内容
 * @param {string} type 深刻度
 * @param {boolean} clear メッセージを消す
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
  format = format.replace(/YYYY/, utilPad(date.getFullYear(), 4))
  format = format.replace(/MM/, utilPad(date.getMonth() + 1, 2))
  format = format.replace(/DD/, utilPad(date.getDate(), 2))
  format = format.replace(/hh/, utilPad(date.getHours(), 2))
  format = format.replace(/mm/, utilPad(date.getMinutes(), 2))
  format = format.replace(/ss/, utilPad(date.getSeconds(), 2))

  return format
}

/**
 * 数値を０パディングする関数です。
 * @param {int} num 数値
 * @param {int} size 桁数
 * @param {int} min 最小値
 * @param {int} max 最大値
 * @return {string} ０パディングされた数値
 */
function utilPad (num, size, min = 0, max = '9'.repeat(size)) {
	const padding = +num < +min ? +min : +num > +max ? +max : +num
	return ('0'.repeat(+size) + padding).substr(-1 * +size)
}

/**
 * 引数の2次元配列をUTF-8のCSVでダウンロードする関数です。
 * @param {array} array 2次元配列
 * 例 [
 *      ['1', '2', '3'],
 *      ['4', '5', '6'],
 *      ['7', '8', '9'],
 * ]
 * @param {string} title ファイル名
 */
function utilDownloadCsv(array, title = 'test') {
  // csvDataに出力方法を追加
  let csvData = 'data:text/csvcharset=utf-8,'
  array.forEach(arr => {
    const row = '"' + arr.join('","') + '"'
    csvData += row + '\r\n'
  })

  // a要素を作成する
  const ele = document.createElement('a')
  // a要素にエンコード化した出力データを追加
  ele.setAttribute('href', encodeURI(csvData))
  // a要素に出力情報を追加
  ele.setAttribute('download', title + '.csv')
  ele.style.visibility = 'hidden'
  document.body.appendChild(ele)
  // HTMLドキュメントに追加したa要素を実行(clickイベント発火)
  ele.click()
  document.body.removeChild(ele)

}

/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 * @return {boolean} 判定結果
 */
function utilIsNull (obj) {
  if (Array.isArray(obj)) {
    return obj.filter(v => v !== '').length == 0
  } else {
    return !obj
  }
}