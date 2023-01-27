/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function ssCommonIsNull(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(v => String(v).trim() !== '').length == 0
    } else if (typeof obj === 'object') {
        return !obj || Object.keys(obj).length === 0 && obj.constructor === Object
    } else {
        return !obj && obj !== 0 || String(obj).trim() == ''
    }
}
/**
 * カンマ区切り数列を数値に変換する
 * @param {String} str カンマ区切り数列
 *
 * @return {Number} 数値変換値
 * 例. "1,500"  ⇒ 1500
 */
function ssCommonConvertCTo1(str) {
    str = ssCommonIsNull(str) ? "0" : String(str)
    return +str.replace(',', '')
}

/**
 * 空日付を出力する関数です。
 *
 * @return {String} 空日付
 */
function ssCommonGetDateEmpty() {
    return '1899-12-30T00:00:00'
}

/**
 * 登録APIを呼び出す関数です。
 *
 * @param {String}    tableId 登録テーブルID
 * @param {Object}    Hash 更新項目
 * @param {String}    Status 登録ステータス
 * @param {String}    Comments 登録コメント
 * @param {Boolean}   pushFlg updated_idsに（default）pushする
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function ssCommonCreateAjax(tableId, Hash = {}, Status, Comments, pushFlg = true, addFunc) {
    // 登録項目
    let ClassHash = {}
    let NumHash = {}
    let DateHash = {}
    let DescriptionHash = {}
    let CheckHash = {}
    for (let key in Hash) {
        if (key.includes("Class")) ClassHash[key] = Hash[key]
        else if (key.includes("Num")) NumHash[key] = ssCommonConvertCTo1(Hash[key])
        else if (key.includes("Date")) DateHash[key] = ssCommonIsNull(Hash[key]) ? ssCommonGetDateEmpty() : Hash[key]
        else if (key.includes("Description")) DescriptionHash[key] = Hash[key]
        else if (key.includes("Check")) CheckHash[key] = Hash[key]
    }

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
    if (!ssCommonIsNull(Status)) {
        delete data["Status"]
    }
    if (!ssCommonIsNull(Comments)) {
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
                if (pushFlg) {
                    created_ids.push(result.Id)
                    created_ids = [...new Set(created_ids.map(v => String(v)))]
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