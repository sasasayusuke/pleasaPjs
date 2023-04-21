
const STATUS_NEW = -100
const STATUS_NORMAL = 100
const STATUS_WARNING = 500
const STATUS_CLOSE = 900
const STATUS_PROCESSING = 990
const STATUS_ERROR = 999

/**
 * 空日付を出力する関数です。
 *
 * @return {String} 空日付
 */
function serverGetDateEmpty() {
    return '1899-12-30T00:00:00'
}

/**
 * 日付を出力する関数です。
 *
 * yyyy引数なしで現在日付
 * 月末はddに0を入力
 *
 * @param {Number} yyyy   年(またはDateオブジェクト)
 * @param {Number} mm     月
 * @param {Number} dd     日
 * @param {String} format フォーマット
 *
 * @return {String} フォーマット加工された日付文字列
 *
 * 例1. yyyy = 2022, mm = 4, dd = 18, format = 'YYYY-MM-DD'
 *            ⇓
 *     '2022-04-18'
 * 例2. yyyy = 2021, mm = 13, dd = 10, format = 'YYYY-MM-DD'
 *            ⇓
 *     '2022-01-10'
 * 例3. yyyy = 2021, mm = 11, dd = 0, format = 'YYYY-MM-DD'
 *            ⇓
 *     '2022-10-31'
 * 例4. yyyy = 2020
 *            ⇓
 *     '2020-01-01T00:00:00'
 * 例5. 引数なし
 *            ⇓
 *     現在日付の'YYYY-MM-DD'
 * 例6. yyyy = "", mm = "", dd = "", format = 'YYYYMM'
 *            ⇓
 *     現在日付の'YYYYMM'
 */
function serverGetDate(yyyy, mm = 1, dd = 1, format = 'YYYY-MM-DD') {
    let date
    try {
        if (typeof yyyy === 'undefined' || serverIsNull(yyyy)) {
            date = new Date()
        } else if (typeof yyyy === 'object') {
            date = yyyy
        } else {
            date = new Date(yyyy, mm - 1, dd)
        }
        return format
            .replace(/YYYY/, String(date.getFullYear()).padStart(4, "0"))
            .replace(/MM/, String(date.getMonth() + 1).padStart(2, "0"))
            .replace(/DD/, String(date.getDate()).padStart(2, "0"))
            .replace(/hh/, String(date.getHours()).padStart(2, "0"))
            .replace(/mm/, String(date.getMinutes()).padStart(2, "0"))
            .replace(/ss/, String(date.getSeconds()).padStart(2, "0"))
    } catch (err) {
        // 再スロー
        throw err
    }
}

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
            return
        }
        if (!table in COLUMN_INFO) {
            let message = `共通関数serverGetColumnName：テーブル未登録。${table}`
            context.Error(message)
            return
        }
        let column = COLUMN_INFO[table]
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v].label == label)
        if (data.length == 0) {
            let message = `共通関数serverGetColumnName：ラベル名不正。${label}`
            context.Error(message)
            return
        } else if (data.length > 1) {
            let message = `共通関数serverGetColumnName：ラベル名重複。${label}`
            context.Error(message)
            return
        }
        return data[0]
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * codeを取得
 * @param {String}     codeName    コード名
 * @param {String}     label       ラベル名
 * @param {String}     attr        属性名
 *
 * @return {String}     code
 */
function serverGetCode(codeName, label, attr = "index") {
    try {
        if (!Object.keys(CODE_INFO).includes(codeName)) {
            let message = `共通関数serverGetCode：コード名不正。${codeName}`
            context.Error(message)
            return
        }
        let code = CODE_INFO[codeName]
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
        if (code.length == 0) {
            let message = `共通関数serverGetCode：ラベル名不正。${label}`
            context.Error(message)
            return
        } else if (code.length > 1) {
            let message = `共通関数serverGetCode：ラベル名変数重複。${label}`
            context.Error(message)
            return
        }
        if (!serverIsNull(attr)) code = code[0][attr]
        return code
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 全statusを取得
 * @param {String}      table   テーブル名
 *
 * @return {Array}     statuses
 */
function serverGetAllStatuses(table) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数serverGetStatus：テーブル名不正。${table}`
            context.Error(message)
            return
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数serverGetStatus：status未登録。${table}`
            context.Error(message)
            return
        }
        let statuses = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].status
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
        return statuses
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * statusを取得
 * @param {String}      table   テーブル名
 * @param {String}      label   ラベル名
 * @param {String}      attr    属性名
 *
 * @return {String}     status
 */
function serverGetStatus(table, label, attr = "index") {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数serverGetStatus：テーブル名不正。${table}`
            context.Error(message)
            return
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数serverGetStatus：status未登録。${table}`
            context.Error(message)
            return
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
        if (status.length == 0) {
            let message = `共通関数serverGetStatus：ラベル名不正。${label}`
            context.Error(message)
            return
        } else if (status.length > 1) {
            let message = `共通関数serverGetStatus：ラベル名変数重複。${label}`
            context.Error(message)
            return
        }
        if (!serverIsNull(attr)) status = status[0][attr]
        return status
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * テーブル名を取得
 * @param {String}      tableId     テーブルID
 * @return {String}     tableName
 */
function serverGetTableName(tableId) {
    try {
        let table = Object.keys(TABLE_INFO).filter(v => TABLE_INFO[v].index == tableId)
        if (table.length == 0) {
            let message = `共通関数serverGetTableName：テーブルID不正。${tableId}`
            context.Error(message)
            return
        } else if (table.length > 1) {
            let message = `共通関数serverGetTableName：テーブルが2重で登録されています。${tableId}`
            context.Error(message)
            return
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
 * 2次元配列をサマリーする関数です。
 * @param {Array} d2array 元2次元配列
 * @param {Array} findIndexes 検索する配列番号（1番目が同値なら2番目でソート 2番目が同値なら...）
 * @param {Number} sumIndex 合計する配列番号
 *
 * @return {Array} サマリー済2次元配列
 *
 * 例.
 * d2array = [
 *     ['A', 10, '1x', 'bird'],
 *     ['B', 50, '1x', 'cat'],
 *     ['D', 14, '1x', 'bird'],
 *     ['B', 10, '1x', 'bird'],
 *     ['A', 55, '1x', 'cat'],
 *     ['B', 15, '1x', 'dog'],
 *     ['A', 10, '1x', 'bird'],
 *     ['C', 15, 'x1', 'bird'],
 *     ['D', 12, 'x1', 'dog'],
 *     ['D', 10, 'x1', 'dog'],
 *     ['B', 25, 'x1', 'cat']
 * ]
 * findIndexes = [0, 2]
 * sortIndexes = [0]
 * summaryHash = {
 *     1: 0,
 *     3: "; ",
 * }
 * countFlg = true
 *
 *        ⇓
 *
 * [
 *     ["A",75,"1x","bird; cat; bird",3],
 *     ["B",25,"x1","cat",1],
 *     ["B",75,"1x","cat; bird; dog",3],
 *     ["C",15,"x1","bird",1],
 *     ["D",22,"x1","dog; dog",2],
 *     ["D",14,"1x","bird",1]
 * ]
 */
function serverSummary2DArray(d2array, findIndexes = [], sortIndexes = [], summaryHash, countFlg = false) {
    if (serverIsNull(d2array)) {
        let message = `共通関数serverSummary2DArray：配列が空です。`
        context.Error(message)
        return
    }
    let countIndex = d2array[0].length + 1
    if (countFlg) d2array = serverAddColumn(d2array, countIndex, 1)

    let result = []
    if (serverIsNull(findIndexes)) {
        result = d2array
    } else {
        d2array.forEach(item => {
            let index = result.findIndex(row => findIndexes.every(idx => row[idx] == item[idx]))
            if (index != -1) {
                for (let key in summaryHash) {
                    if (!serverIsNull(item[key])) {
                        result[index][key] += summaryHash[key] + item[key]
                    }
                }
                if (countFlg) result[index][countIndex - 1]++
            } else {
                result.push([...item])
            }
        })
    }

    result = result.sort((a, b) => {
        for (let i = 0; i < sortIndexes.length; i++) {
            let idx = sortIndexes[i]
            if (a[idx] !== b[idx]) {
                return a[idx] > b[idx] ? 1 : -1
            }
        }
        return a[0] > b[0] ? 1 : -1
    })
    return result
}

/**
 * 2次元配列の列を追加する関数です。
 * @param {Array} d2array 元2次元配列
 * @param {Number} n      生成２次元配列列数
 * @param {Number} init   初期値
 *
 * @return {Array} 生成２次元配列
 *
 *
 * 例. d2array = [["74060", "60"]  n = 5, init = 10
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
function serverAddColumn(d2array, n, init = 0) {
    let m = d2array.length
    let arr = serverGenerate2DArray(m, n, init)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!serverIsNull(d2array[i][j])) arr[i][j] = d2array[i][j]
        }
    }
    return arr
}

/**
 * m行n列の2次元配列を生成する関数です。
 * @param {Number} m    行数
 * @param {Number} n    列数
 * @param {Number} init 初期値
 *
 * @return {Array} 2次元配列
 *
 * 例. m = 3, n = 4, init = 1
 *            ⇓
 * [
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 *      ['1', '1', '1', '1'],
 * ]
 */
function serverGenerate2DArray(m, n, init = 0) {
    return [...Array(m)].map(_ => Array(n).fill(init))
}

/**
 * 引数の2次元配列をmarkdownの形式に変換する関数です。
 * @param {Array} array 2次元配列
 *
 * @return {String} md
 * 例. [
 *      ['サイズ', '種別', '単価'],    // ヘッダー
 *      ['left', 'center', 'right'],    // 寄せ
 *      ['small', 'c', '35'],
 *      ['small', 'p', '38'],
 *      ['large', 'c', '56'],
 *     ]
 *            ⇓
 * '[md]\n|サイズ|種別|単価|\n|:-|:-:|-:|\n|small|c|35|\n|small|p|38|\n|large|c|56|'
 */
function serverConvert2DToMd(array) {
    if (array[0].length != array[1].length) {
        let message = `共通関数serverConvert2DToMd：要素数不正。`
        context.Error(message)
        return
    }
    let md = ["[md]"]
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        if (i == 1) {
            // 2行目の時
            md.push(
                "|" + line.reduce((pre, cur) => {
                    if (cur == "left") {
                        return pre + ":" + "-" + "|"
                    } else if (cur == "right") {
                        return pre + "-" + ":|"
                    } else {
                        return pre + ":" + "-" + ":|"
                    }
                }, "")
            )
        } else {
            md.push("|" + line.reduce((pre, cur) => pre + cur + "|", ""))
        }
    }
    return md.join("\n")
}

/**
 * 指定した部局とその子部局の部局コード(過去部局コード含む)の配列を返却する
 * @param {String} departmentCode 部局コード
 *
 * @return {array} 判定結果
 */
//
function getChildrenDepartmentCodeList(departmentCode) {
    let ret = []

    if (departmentCode) {
        const target = typeof(departmentCode) === "string" ? [departmentCode] : departmentCode
        ret = ret.concat(target)

        // 部局情報から親部局コードが一致するレコードを検索
        let parentData = {
            View: {
                ColumnFilterHash: {
                    ClassC: JSON.stringify(target)  // 親部局コード
                },
                ColumnFilterSearchTypes:{
                    ClassC:  "ExactMatchMultiple"
                }
            }
        };
        let parentResults = items.Get(TABLE_INFO["部局情報"].index, JSON.stringify(parentData));
        if (parentResults.Length !== 0) {
            let next = []
            for (result of parentResults){
                next.push(result.ClassA)
                ret.push(result.ClassA)
            }
            // 部局コードを引数にして関数を再起呼び出し
            ret = ret.concat(getChildrenDepartmentCodeList(next))
        }

        // 組織変更対応から紐づけコードが一致するのレコードを検索
        let mappingData = {
            View: {
                ColumnFilterHash: {
                    ClassB: JSON.stringify(target) ,  // 紐づけコード
                },
                ColumnFilterSearchTypes:{
                    ClassB:  "ExactMatchMultiple"
                }
            }
        };
        let mappingResults = items.Get(TABLE_INFO["組織変更対応"].index, JSON.stringify(mappingData));
        if (mappingResults.Length !== 0) {
            let next = []
            for (result of mappingResults){
                next.push(result.ClassA)
                ret.push(result.ClassA)
            }
            // 部局コードを引数にして関数を再起呼び出し
            ret = ret.concat(getChildrenDepartmentCodeList(next))
        }
    }

    // 重複削除した配列を返却
    return Array.from(new Set(ret)).sort()
}


/**
 * 指定した部局の現親部の部局コードを返却する
 * @param {String} departmentCode 部局コード
 *
 * @return {String} 判定結果
 */
//
function getParentDepartmentCode(departmentCode) {
    let ret = departmentCode

    if (departmentCode) {
        // 部局情報から部局コードが一致するレコードを検索
        let data = {
            View: {
                ColumnFilterHash: {
                    ClassA: departmentCode  // 部局コード
                },
                ColumnFilterSearchTypes:{
                    ClassA:  "ExactMatch"
                }
            }
        };
        let results = items.Get(TABLE_INFO["部局情報"].index, JSON.stringify(data));
        if (results.Length !== 0){
            result = results[0]
            if (result.ClassC) {
                ret = getParentDepartmentCode(result.ClassC)
            }
        }
    }

    return ret
}


/**
 * 現在有効な親部局のリストを取得する
 *
 * @return {array} 判定結果
 */
//
function getParentDepartmentList() {
    ret = []
    let data = {
        View: {
            ColumnFilterHash: {
                CheckA: true,   // 有効フラグ
                CheckB: true    // 親部局フラグ
            },
        },
    };
    let results = items.Get(TABLE_INFO["部局情報"].index, JSON.stringify(data));
    context.Log(results)
    context.Log(results.Length)
    context.Log(results.TotalCount )
    context.Log(results.PageSize )
    context.Log(JSON.stringify(results))
    for (result of results){
        ret.push({"DepartmentCode": result.ClassA, "DepartmentName": result.ClassB})
        // ret.push(result.ClassA)
    }
    // 重複削除した配列を返却
    return Array.from(new Set(ret)).sort()
}


/**
 * 指定した部局コードの部局情報を取得する
 * @param {String} departmentCode 部局コード
 *
 * @return {array} 判定結果
 */
//
function getDepartmentInfo(departmentCode) {
    let ret = {}
    let data = {
        View: {
            ColumnFilterHash: {
                ClassA: departmentCode
            },
            ColumnFilterSearchTypes:{
                ClassA:  "ExactMatch"
            }
        }
    };
    let results = items.Get(TABLE_INFO["部局情報"].index, JSON.stringify(data));
    if (results.Length ===1 ){
        result = results[0]
        ret["DepartmentName"]       = result.ClassB   // 部局名
        ret["ParentDepartmentCd"]   = result.ClassC   // 親部局コード
        ret["MappingCode"]   = result.ClassD              // 紐づけコード
        ret["PostCode"]   = result.ClassE             // 郵便番号
        ret["Address"]   = result.ClassF              // 住所
    }
    return ret
}


/**
 * 指定したログインIDの職員情報を取得する。
 * @param {String} loginID ログインID
 *
 * @return {Array} 判定結果
 */
//
function getUserInfo(loginID) {
    ret = {}

    // 担当情報テーブルからパソコン担当者の権限を検索
    let parsonData = {
        View: {
            ColumnFilterHash: {
                ClassA: JSON.stringify(["2","3"]),
                Class002: loginID
            },
            ColumnFilterSearchTypes:{
                ClassA:  "ForwardMatchMultiple",
                Class002:  "ExactMatch"
            }
        }
    };
    let parsonResults = items.Get(TABLE_INFO["担当情報"].index, JSON.stringify(parsonData));
    let pcManagement = []
    for (result of parsonResults){
        pcManagement.push(result.ClassD)
    }

    // 職員情報テーブルを検索
    let data = {
        View: {
            ColumnFilterHash: {
                Class001: loginID
            },
            ColumnFilterSearchTypes:{
                Class001:  "ExactMatch"
            }
        }
    };
    let results = items.Get(TABLE_INFO["職員情報"].index, JSON.stringify(data));
    if (results.Length ===1 ){
        result = results[0]
        context.Log("UserRecordId : " + result.ResultId)

        let permissions = []
        if (result.CheckB) permissions.push("NHK職員")
        if (result.CheckC) permissions.push("スタッフ")
        if (result.CheckD) permissions.push("記入担当者")
        if (result.CheckE) permissions.push("業務管理者")
        if (result.CheckF) permissions.push("経理担当者")
        if (result.CheckG) permissions.push("照査者")
        if (result.CheckH) permissions.push("決定者")
        if (result.CheckI) permissions.push("システム管理者")
        if (result.CheckJ) permissions.push("システム管理補佐")
        if (result.CheckK) permissions.push("特権ユーザ")
        if (result.CheckL) permissions.push("パソコン在庫管理者")
        if (parsonResults.Length !==0) permissions.push("パソコン担当者")
        ret["Permissions"]      = permissions       // 権限
        ret["CompanyCode"]      = result.ClassA     // 企業コード
        ret["UserNumber"]       = result.ClassB     // 職員番号
        ret["Name"]             = result.ClassC     // 漢字氏名
        ret["AffiliationCd"]    = result.ClassE     // 所属コード
        ret["DepartmentCd"]     = result.ClassF     // 部局コード
        ret["Phone"]            = result.ClassM     // 電話番号
        ret["Email"]            = result.ClassN     // メールアドレス
        ret["PcManagement"] = Array.from(new Set(pcManagement)).sort()      // パソコン担当者権限部局コード
    }

    return ret
}


/**
 * サイトにアクセス可能な権限の配列を返却する
 * @param {String} siteTitle サイト名
 *
 * @return {Array} 判定結果
 */
//
function getAccessiblePermissions(siteTitle) {
    ret = []
    // テーブルアクセス制御設定テーブルを検索
    let data = {
        View: {
            ColumnFilterHash: {
                ClassA: siteTitle
            },
            ColumnFilterSearchTypes:{
                ClassA:  "ExactMatch"
            }
        }
    };
    let results = items.Get(TABLE_INFO["テーブルアクセス制御設定"].index, JSON.stringify(data));
    if (results.Length ===1 ){
        result = results[0]
        ret = JSON.parse(result.ClassB)
    }
    return ret
}


/**
 * ボタンの表示可否の配列を返却する
 * @param {String} siteTitle サイト名
 * @param {Array} userPermissions ユーザ権限
 * @return {Array} 判定結果
 */
//
function getEnableButtons(siteTitle, userPermissions) {
    let ret = []
    // ボタン表示制御設定テーブルを検索
    let data = {
        View: {
            ColumnFilterHash: {
                ClassA: siteTitle
            },
            ColumnFilterSearchTypes:{
                ClassA:  "ExactMatch"
            }
        }
    };
    let results = items.Get(TABLE_INFO["ボタン表示制御設定"].index, JSON.stringify(data));
    for (let result of results) {
        if (result.ClassC && userPermissions.includes(result.ClassB)) {
            const enableButtons = JSON.parse(result.ClassC)
            for (enableButton of enableButtons) {
                ret.push(enableButton)
            }
        }
    }
    return Array.from(new Set(ret)).sort()
}


/**
 * 2つの配列を比較して同じ要素が含まれるか判定する
 * @param {Array} arr1 配列1
 * @param {Array} arr2 配列2
 *
 * @return {Boolean} 判定結果
 */
//
function getIsDuplicate(arr1, arr2) {
    return arr2.filter(item => arr1.includes(item)).length > 0
}