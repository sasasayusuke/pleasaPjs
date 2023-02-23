
var STATUS_NEW = -100
var STATUS_NORMAL = 100
var STATUS_WARNING = 500
var STATUS_CLOSE = 900
var STATUS_PROCESSING = 990
var STATUS_ERROR = 999

/**
 * columnNameを取得
 * @param {String}    table テーブル名
 * @param {String}    label ラベル名
 * @return {String}   columnName
 */
function serverGetColumnName(table, label) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数serverGetColumnName：テーブル名不正。${table}`
            context.Error(message)
        }
        if (!"column" in TABLE_INFO) {
            let message = `共通関数serverGetColumnName：column未登録。${table}`
            context.Error(message)
        }
        let column = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].column
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v].label == label)
        if (data.length == 0) {
            let message = `共通関数serverGetColumnName：ラベル名不正。${label}`
            context.Error(message)
        } else if (data.length > 1) {
            let message = `共通関数serverGetColumnName：ラベル名重複。${label}`
            context.Error(message)
        }
        return data[0]
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * statusを取得
 * @param {String}      table   テーブル名
 * @param {Boolean}     label   ラベル名
 * @return {String}     status
 */
function serverGetStatuses(table, label) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数serverGetStatus：テーブル名不正。${table}`
            context.Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数serverGetStatus：status未登録。${table}`
            context.Error(message)
        }
        let status = TABLE_INFO[Object.keys(TABLE_INFO)
            .filter(v => v == table)[0]].status
            .trim().split("\n")
            .map(v => v.trim())
            .map(v => {
                let val = v.split(",")
                let obj = {}
                obj.index = val[0]
                obj.name = val[1]
                obj.label = val[2]
                obj.style = val[3]
                return obj
            })
            .filter(v => serverIsNull(label) || v.name == label)
        return status
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * statusを取得
 * @param {String}      tableId     テーブルID
 * @return {String}     tableName
 */
function serverGetTableName(tableId) {
    try {
        let table = Object.keys(TABLE_INFO).filter(v => TABLE_INFO[v].index == tableId)
        if (table.length == 0) {
            let message = `共通関数serverGetTableName：テーブルID不正。${tableId}`
            context.Error(message)
        } else if (table.length > 1) {
            let message = `共通関数serverGetTableName：テーブルが2重で登録されています。${tableId}`
            context.Error(message)
        }
        return table[0]

    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function serverIsNull(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(v => String(v).trim() !== '').length == 0
    } else if (typeof obj === 'object') {
        return !obj || Object.keys(obj).length === 0 && obj.letructor === Object
    } else {
        return !obj && obj !== 0 || String(obj).trim() == ''
    }
}
/**
 * 配列をマルチセレクト登録用文字列に変換する
 * @param {Array} arr 配列
 *
 * @return {String} マルチセレクト登録用文字列
 * 例. ["ABC", 230, "X"]  ⇒ '["ABC", 230, "X"]'
 */
function serverConvertArrToMul(arr) {
    let elems = []
    if (Array.isArray(arr)) {
        elems = arr
    } else {
        elems = [arr]
    }

    elems = elems.map(v => isNaN(v) ? `"${v}"` : +v).join(", ")
    elems = `[${elems}]`
    return elems
}

/**
 * 2次元配列をソートする関数です。
 * @param {Array} d2array 元2次元配列
 * @param {Array} findIndexes 検索する配列番号（1番目が同値なら2番目でソート 2番目が同値なら...）
 *
 * @return {Array} ソート済2次元配列
 *
 * 例. d2array = [
 *      ['A', 10, '1x', 'r'],
 *      ['B', 50, '1x', 'c'],
 *      ['B', 10, '1x', 'r'],
 *      ['B', 15, '1x', 'v'],
 *      ['B', 10, 'x1', 'b'],
 *      ['C', 15, 'x1', 'r'],
 *      ['B', 15, 'x1', 'r'],
 * ]
 *    findIndexes = [0, 1, 3]
 *             ⇓
 * [
 *      ['A', 10, '1x', 'r']
 *      ['B', 10, 'x1', 'b']
 *      ['B', 10, '1x', 'r']
 *      ['B', 15, 'x1', 'r']
 *      ['B', 15, '1x', 'v']
 *      ['B', 50, '1x', 'c']
 *      ['C', 15, 'x1', 'r']
 * ]
 */
function serverSort2DArray(d2array, findIndexes) {
    d2array.sort((a, b) => {
        for (let i = 0; i < findIndexes.length; i++) {
            let idx = findIndexes[i]
            if (a[idx] !== b[idx]) {
                return a[idx] > b[idx] ? 1 : -1
            }
        }
        return a[0] > b[0] ? 1 : -1
    })
    return d2array
}


/**
 * 2次元配列をサマリーする関数です。
 * @param {Array} d2array 元2次元配列
 * @param {Array} findIndexes 検索する配列番号（1番目が同値なら2番目でソート 2番目が同値なら...）
 * @param {Number} sumIndex 合計する配列番号
 *
 * @return {Array} サマリー済2次元配列
 *
 * 例. d2array = [
 *      ['A', 10, '1x', 'r'],
 *      ['B', 50, '1x', 'c'],
 *      ['B', 10, '1x', 'r'],
 *      ['B', 15, '1x', 'v'],
 *      ['B', 10, 'x1', 'b'],
 *      ['C', 15, 'x1', 'r'],
 *      ['B', 15, 'x1', 'r'],
 * ]
 *    findIndexes = [0, 2]
 *    sumIndex = 1
 *             ⇓
 * [
 *     ['A', 10, '1x', 'r']
 *     ['B', 75, '1x', 'c']
 *     ['B', 25, 'x1', 'b']
 *     ['C', 15, 'x1', 'r']
 * ]
 */
function serverSum2DArray(d2array, findIndexes, sumIndex) {
    let result = []
    d2array.forEach(item => {
        let index = result.findIndex(row => findIndexes.every(idx => row[idx] == item[idx]))
        if (index != -1) {
            result[index][sumIndex] += item[sumIndex]
        } else {
            result.push([...item])
        }
    })
    return result
}

/**
 * 引数の2次元配列をmarkdownの形式に変換する関数です。
 * @param {Array} array 2次元配列
 *
 * @return {String} md
 * 例. [
 *      ['種別', '単価'],   // ヘッダー
 *      [10, -4],          // 長さと寄せ(マイナスなら右寄せ)
 *      ['small', '35'],
 *      ['large', '56'],
 *     ]
 *            ⇓
 * 'data:text/csvcharset=utf-8,"数量","単価","合計"\r\n"1","2","2"\r\n"4","5","20"\r\n"7","8","56"\r\n'
 */
function serverConvert2DToMd(array) {
    if (array[0].length != array[1].length) {
        let message = `共通関数serverConvert2DToMd：要素数不正。`
        context.Error(message)
    }
    let md = ["[md]"]
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        if (i == 1) {
            // 2行目の時
            md.push(
                "|" + line.reduce((pre, cur) => {
                    if (cur > 0) {
                        return pre + ":" + "-".repeat(cur) + "|"
                    } else {
                        return pre + "-".repeat(cur * -1) + ":|"
                    }
                }, "")
            )
        } else {
            md.push("|" + line.reduce((pre, cur) => pre + cur + "|", ""))
        }
    }
    return md.join("\n")
}

