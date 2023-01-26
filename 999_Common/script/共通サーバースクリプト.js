
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
async function commonCreateAjax(tableId, Hash = {}, Status, Comments, pushFlg = true, addFunc) {

    // 登録項目
    let ClassHash = {}
    let NumHash = {}
    let DateHash = {}
    let DescriptionHash = {}
    let CheckHash = {}
    for (let key in Hash) {
        if (key.includes("Class")) ClassHash[key] = Hash[key]
        else if (key.includes("Num")) NumHash[key] = commonConvertCTo1(Hash[key])
        else if (key.includes("Date")) DateHash[key] = commonIsNull(Hash[key]) ? commonGetDateEmpty() : Hash[key]
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