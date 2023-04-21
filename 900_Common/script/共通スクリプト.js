
var STATUS_NEW = -100
var STATUS_NORMAL = 100
var STATUS_WARNING = 500
var STATUS_CLOSE = 900
var STATUS_PROCESSING = 990
var STATUS_ERROR = 999

var STATUS_ERROR_MESSAGE_ID = "テーブルIDを修正してください。スクリプトタブから共通変数を確認してください。"
var STATUS_ERROR_MESSAGE_UP = "サーバー側で更新がありました。"
var STATUS_ERROR_MESSAGE_GRID = "一覧画面で使用を想定"
var STATUS_ERROR_MESSAGE_EDIT = "編集画面で使用を想定"

var error_messages = []
var updated_ids = []
var created_ids = []
var process_id = ""
var unique_id = ""
var increment = 0



// 各画面ロード時に実行するメソッドを格納する
$p.events.on_grid_load_arr = []
$p.events.on_editor_load_arr = []
// 保存押下時に実行するメソッドを格納する
$p.events.before_send_Create_arr = []
$p.events.before_send_Update_arr = []

// 格納したメソッドを実行するメソッド
$p.events.on_grid_load = function () {
    for (let key in TABLE_INFO) {
        console.log(`${key} : ${SERVER_URL}/items/${TABLE_INFO[key].index}/index`)
    }
    console.log("start!! on_grid_load_arr!!!")
    $p.events.on_grid_load_arr.forEach(func => {
        console.log(func)
        func()
    })
}
$p.events.on_editor_load = function () {
    for (let key in TABLE_INFO) {
        console.log(`${key} : ${SERVER_URL}/items/${TABLE_INFO[key].index}/index`)
    }
    console.log("start!! on_editor_load_arr!!!")
    $p.events.on_editor_load_arr.forEach(func => {
        console.log(func)
        func()
    })
}
$p.events.before_send_Create = function () {
    console.log("start!! before_send_Create_arr!!!")
    // falseをreturnするまで繰り返す
    return $p.events.before_send_Create_arr.every(func => {
        console.log(func)
        return func()
    })
}
$p.events.before_send_Update = function () {
    console.log("start!! before_send_Update_arr!!!")
    // falseをreturnするまで繰り返す
    return $p.events.before_send_Update_arr.every(func => {
        console.log(func)
        return func()
    })
}

// 共通ロード処理
// 即時関数
$(function () {

    if (typeof api_version === 'undefined') {
        api_version = 1.0
    }
    if (typeof SERVER_URL === 'undefined') {
        SERVER_URL = window.location.origin
    }
    if (typeof TABLE_INFO === 'undefined') {
        TABLE_INFO = {}
    }
    if (typeof CODE_INFO === 'undefined') {
        CODE_INFO = {}
    }
    if (typeof COLUMN_INFO === 'undefined') {
        COLUMN_INFO = {}
    }

    if (window.location.search) {
        // クエリパラメーターが存在する場合の処理
        let queryParams = {}
        let urlParams = new URLSearchParams(window.location.search)
        for (let [key, value] of urlParams) {
            queryParams[key] = value
        }
        // messageのパラメータがあったらメッセージをだす
        if ("message" in queryParams) {
            commonMessage(STATUS_NORMAL, queryParams["message"])
        }
    }


    let insertHtml = `
        <!-- loading -->
        <div id="loading" class="is-hide">
            <div class="cv-spinner">
                <span class="spinner"></span>
            </div>
        </div>
        <!-- loading -->
    `
    let insertCSS = `
        <style>
            #loading{
                position: fixed;
                top: 0;
                left: 0;
                z-index: 999;
                width: 100%;
                height:100%;
                background: rgba(0,0,0,0.6);
            }
            #loading .cv-spinner {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            #loading .spinner {
                width: 80px;
                height: 80px;
                border: 4px #ddd solid;
                border-top: 4px #999 solid;
                border-radius: 50%;
                animation: sp-anime 0.8s infinite linear;
            }
            @keyframes sp-anime {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(359deg); }
            }
            #loading.is-hide{
                display:none;
            }
            .original-style-disabled {
                width: 100%;
                min-height: 30px;
                display: block;
                padding: 6px 4px 2px 4px;
                color: #000;
                background: #f5f5f5;
                border: solid 1px #c0c0c0;
                overflow: hidden;
                border-radius: 5px;
            }
        </style>
    `
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', insertCSS);
    document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', insertHtml);
});

// 共通gridロード処理
$p.events.on_grid_load_arr.push(function () {
    try {
        // 変数一覧へテーブルIDの登録チェック
        if (!Object.keys(TABLE_INFO).map(key => TABLE_INFO[key].index).includes($p.siteId())) {
            commonMessage(STATUS_ERROR, STATUS_ERROR_MESSAGE_ID)
        }

        // サイトタイトル取得
        let siteTitle = JSON.parse(document.getElementById("JoinedSites").value)[0].Title
        // システムタイトル置換
        document.getElementsByTagName("Title")[0].innerText = siteTitle + " - 一覧"

    } catch (err) {
        console.log(err)
    }
})

// 共通editorロード処理
$p.events.on_editor_load_arr.push(function () {
    try {
        // サイトタイトル取得
        let siteTitle = JSON.parse(document.getElementById("JoinedSites").value)[0].Title
        // システムタイトル置換
        document.getElementsByTagName("Title")[0].innerText = siteTitle + " - 編集"

        // 読み取り制御
        let columns = COLUMN_INFO[commonGetTableName($p.siteId())]
        Object.keys(columns)
            .filter(v => commonCheckStatus(columns[v].readOnly))
            .forEach(v => commonChangeReadOnly(v))

        // 非表示制御
        Object.keys(columns)
            .filter(v => commonCheckStatus(columns[v].hidden))
            .forEach(v => commonHideElements(commonGetId(v, true, true)))


        // オリジナルスタイルの追加
        let style = `
            <style>
                textarea {
                    resize: none;
                }
            </style>`
        $('#Application').append(style)
    } catch (err) {
        console.log(err)
    }
})

/**
 * columnNameの集合を取得
 * @return {Object}   obj
 */
async function commonGetAllColumnNames(structureType = "long") {
    if (TABLE_INFO[key].hasOwnProperty('index'))
    tableIds = Object.keys(TABLE_INFO).map(key => structureType == "long" ? TABLE_INFO[key].index : TABLE_INFO[key])
    let obj = {}

    for (let tableId of tableIds) {
        let columnNames = {}
        // 取得済み(保存用変数から取得)

        let data = await fetch(`${SERVER_URL}/items/${tableId}/index`)
        let html = await data.text()
        let dom = new DOMParser().parseFromString(html, 'text/html')
        columnNames = JSON.parse(dom.getElementById("Columns").value)
        let key = structureType == "long" ? commonGetTableName(tableId)
        obj[key] = {}
        // 保存用変数
        for (let c of columnNames) {
            if (c.ColumnName.indexOf("~") >= 0) continue
            if (structureType == "long" ) {
                obj[key][c.ColumnName] = {
                    label: c.LabelText,
                    readOnly: [STATUS_CLOSE, STATUS_PROCESSING, STATUS_ERROR],
                    hidden: [],
                }

                if (key in COLUMN_INFO && c.ColumnName in COLUMN_INFO[key]) {
                    obj[key][c.ColumnName].readOnly = COLUMN_INFO[key][c.ColumnName].readOnly
                    obj[key][c.ColumnName].hidden = COLUMN_INFO[key][c.ColumnName].hidden
                }
            } else {
                obj[key][c.ColumnName] = c.LabelText
            }

            console.log(tableId, c)

        }
    }

    return obj
}

/**
 * columnNameを取得
 * @param {String}    table テーブル名
 * @param {String}    label ラベル名
 * @return {String}   columnName
 */
function commonGetColumnName(table, label) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetColumnName：テーブル名不正。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!table in COLUMN_INFO) {
            let message = `共通関数commonGetColumnName：テーブル未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let column = COLUMN_INFO[table]
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v].label == label)
        if (data.length == 0) {
            let message = `共通関数commonGetColumnName：ラベル名不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (data.length > 1) {
            let message = `共通関数commonGetColumnName：ラベル名変数重複。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
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
function commonGetCode(codeName, label, attr = "index") {
    try {
        if (!Object.keys(CODE_INFO).includes(codeName)) {
            let message = `共通関数commonGetCode：コード名不正。${codeName}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
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
            .filter(v => commonIsNull(label) || v.name == label)
        if (code.length == 0) {
            let message = `共通関数commonGetCode：ラベル名不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (code.length > 1) {
            let message = `共通関数commonGetCode：ラベル名変数重複。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!commonIsNull(attr)) code = code[0][attr]
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
function commonGetAllStatuses(table) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetStatus：テーブル名不正。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数commonGetStatus：status未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
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
 * @param {String}      label   name or label
 * @param {String}      attr    属性名
 *
 * @return {String}     status
 */
function commonGetStatus(table, label, attr = "index") {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetStatus：テーブル名不正。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数commonGetStatus：status未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let status = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].status
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
            .filter(v => v.name == label || v.label == label)
        if (status.length == 0) {
            let message = `共通関数commonGetStatus：ラベル名不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (status.length > 1) {
            let message = `共通関数commonGetStatus：ラベル名変数重複。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!commonIsNull(attr)) status = status[0][attr]
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
function commonGetTableName(tableId) {
    try {
        let table = Object.keys(TABLE_INFO).filter(v => TABLE_INFO[v].index == tableId)
        if (table.length == 0) {
            let message = `共通関数commonGetTableName：テーブルID不正。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (table.length > 1) {
            let message = `共通関数commonGetTableName：テーブルが2重で登録されています。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
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
function commonIsNull(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(v => String(v).trim() !== '').length == 0
    } else if (typeof obj === 'object') {
        return !obj || Object.keys(obj).length === 0 && obj.constructor === Object
    } else {
        return !obj && obj !== 0 || String(obj).trim() == ''
    }
}

/**
 * Plesanterメッセージを利用する関数です。
 * @param {String} type 深刻度
 * @param {String} message メッセージ内容
 */
function commonMessage(type = STATUS_NORMAL, message = '') {
    $p.clearMessage()

    switch (type) {
        case STATUS_NORMAL:
            $p.setMessage(
                '#Message',
                JSON.stringify({
                    Css: 'alert-success',
                    Text: message
                })
            )
            break
        case STATUS_WARNING:
            $p.setMessage(
                '#Message',
                JSON.stringify({
                    Css: 'alert-warning',
                    Text: message
                })
            )
            break
        case STATUS_ERROR:
            $p.setMessage(
                '#Message',
                JSON.stringify({
                    Css: 'alert-error',
                    Text: message
                })
            )
            error_messages.push(message)
            break
        default:
            throw new Error(message)

    }
}

/**
 * エラーオブジェクト ⇒ オブジェクト変換
 * @param {Object} err
 */
function commonGetErrorObj(err) {
    let obj = {}
    if (!commonIsNull(err)) {
        obj = {
            name: !commonIsNull(err.name) ? err.name : "",
            message: !commonIsNull(err.message) ? err.message : "",
            stack: !commonIsNull(err.stack) ? err.stack : "",
        }
    }
    return obj
}

/**
 * ユニークID生成（16進数）
 * @param {String} pattern
 */
function commonGenerateUniqueId(pattern = "xxxx-xxxx-xxxx-xxxx") {
    let chars = pattern.split("")
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16)
                break
        }
    }
    return chars.join("")

}

/**
 *
 * 処理ログ出力（チェックポイント出力）
 * ループや分岐ができるだけ無い箇所で呼ぶ。
 * Messageの配列数をあらかじめ固定して、その回数呼ばれることを前提に置く。
 * 配列数が間違っていても最後に引数progressにcloseで呼べば100％に調整はしてくれます
 *
 * @param {Array}   messages  出力メッセージリスト（配列数は呼び出し元のcommonCheckPointを実行回数と一致させてください）
 * @param {String}  progress  start, progress, close, warning, error のいずれか
 * @param {Object}  analysis  解析用
 */
async function commonCheckPoint(messages, progress = "progress", analysis) {
    try {
        commonMessage(STATUS_NORMAL, "処理開始")

        let p_status = 0
        let m_status = 0
        switch (progress) {
            case "start":
                commonSetLoading(true)
                p_status = m_status = STATUS_NORMAL
                error_messages = []
                updated_ids = []
                created_ids = []
                increment = 0
                unique_id = commonGenerateUniqueId()

                let processLog = await commonCreate(
                    TABLE_INFO["処理ログ"].index,
                    {
                        ClassA: unique_id,
                        ClassB: $p.siteId(),
                        ClassC: $p.id(),
                    },
                    STATUS_NORMAL,
                    "",
                    false
                )
                process_id = processLog.Id
                break
            case "progress":
                p_status = m_status = STATUS_NORMAL
                break
            case "add":
                messages.splice(increment, 0, messages[increment])
                p_status = m_status = STATUS_NORMAL
                break
            case "close":
                commonSetLoading(false)
                increment = messages.length - 1
                p_status = STATUS_CLOSE
                m_status = STATUS_NORMAL
                unique_id = ""
                break
            case "warning":
                commonSetLoading(false)
                p_status = m_status = STATUS_WARNING
                unique_id = ""
                break
            case "error":
                commonSetLoading(false)
                p_status = m_status = STATUS_ERROR
                unique_id = ""
                break
        }
        let rate = Math.floor(100 * (increment + 1) / messages.length)
        let message = ""
        if (Array.isArray(messages)) {
            message = `${messages[increment]} 進捗率 ${rate}%`
        } else {
            message = messages
        }

        commonMessage(m_status, message)
        await commonUpdate(
            process_id,
            {
                NumA: rate,
                DescriptionD: updated_ids.join("\n"),
                DescriptionE: created_ids.join("\n"),
            },
            p_status,
            "",
            false
        )
        await commonLog(m_status, message, analysis)
        increment++
    } catch (err) {
        // 再スロー
        await commonLog(STATUS_ERROR, commonGetErrorObj(err))
        throw err
    }
}

/**
 * Plesanter帳票ログを出力する関数です。
 * @param {String} message    メッセージ内容
 * @param {String} workbook   帳票
 * @param {String} filename   帳票名
 * @param {Array} tableIds    帳票出力テーブルID
 * @param {Array} hashes      登録項目(tableIdsと配列数を合わせてください。)
 *
 * @return {Array} createdIds
 *
 */
async function commonPrintLog(message, workbook, filename, tableIds, hashes) {
    let createdIds = []
    if (!Array.isArray(tableIds)) {
        if (commonIsNull(tableIds)) {
            tableIds = []
        } else {
            tableIds = [tableIds]
        }
    }

    if (!Array.isArray(hashes)) {
        if (commonIsNull(hashes)) {
            hashes = []
        } else {
            hashes = [hashes]
        }
    }

    // hashes の配列数を tableIds と揃える
    hashes = tableIds.map((_, i) => hashes[i])

    // 末尾に帳票出力ログをデフォルトでつける
    tableIds.push(TABLE_INFO["帳票出力ログ"].index)
    hashes.push(
        {
            ClassA: unique_id,
            ClassB: $p.siteId(),
            ClassC: $p.id(),
            ClassD: process_id,
            DescriptionA: message,
            DescriptionB: error_messages.join("  \n"),
        }
    )

    for (let i = 0; i < tableIds.length; i++) {
        let id = tableIds[i]
        let hash = hashes[i]
        let log = await commonCreate(
            id,
            hash,
            "",
            ""
        )
        // 帳票出力対象テーブルの添付ファイルAに帳票を添付
        await commonUpdateAttachment(log.Id, "AttachmentsA", workbook, filename)
        createdIds.push(log.Id)
        console.log(`ログ：${message}：${SERVER_URL}/items/${log.Id}`)
    }
    return createdIds
}

/**
 * Plesanterメッセージログを出力する関数です。
 * @param {String} type         深刻度
 * @param {String} message      メッセージ内容
 * @param {Object} analysis     解析用
 */
async function commonLog(type = STATUS_NORMAL, message, analysis) {
    let log = await commonCreate(
        TABLE_INFO["メッセージログ"].index,
        {
            ClassA: unique_id,
            ClassB: $p.siteId(),
            ClassC: $p.id(),
            ClassD: process_id,
            DescriptionA: message,
            DescriptionB: error_messages.join("  \n"),
            DescriptionC: JSON.stringify(analysis),
            DescriptionD: updated_ids.join("\n"),
            DescriptionE: created_ids.join("\n"),
        },
        type,
        "",
        false
    )
    console.log(`ログ：${message}：${SERVER_URL}/items/${log.Id}`)
}

/**
 * Tab取得
 * @param {String} label タブラベル
 * @param {Boolean} flg trueならidで返す
 * @return {Object} タブID or タブobject
 */
function commonGetTab(label, flg = true) {
    try {
        let tab = Array.from(document.getElementsByClassName("ui-tabs-tab")).filter(v => v.children[0].innerText == label)[0]
        if (commonIsNull(tab)) {
            let message = `共通関数commonGetTab：ラベル不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let obj = document.querySelector(`fieldSet[aria-labelledby=${tab.getAttribute("aria-labelledby")}]`)
        return flg ? obj.id : obj
    } catch (err) {
        // 再スロー
        throw err
    }

}

/**
 * 見出し取得
 * @param {String} label セクションラベル
 * @param {Boolean} flg trueならidで返す
 * @return {Object} セクションID or セクションobject
 */
function commonGetSection(label, flg = true) {
    try {
        let section = Array.from(document.getElementsByClassName("field-section")).filter(v => v.innerText == label)[0]
        if (commonIsNull(section)) {
            let message = `共通関数commonGetSection：ラベル不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let obj = document.getElementById(`${section.getAttribute("for")}`)
        return flg ? obj.id : obj
    } catch (err) {
        // 再スロー
        throw err
    }

}

/**
 * 渡されたオブジェクトからcolumnNameの抽出
 * @param {Object} html
 * @param {Object} flg  true:項目を取得 false：日本語ラベルを取得
 * @return {Array} columnNames
 *
 */
function commonFilterColumnNames(html, flg = false) {
    columns = Array.from(html.querySelectorAll('label[for^="Results_"]'))
        .filter(v => ["Class", "Num", "Date", "Check", "Description"].some(w => v.htmlFor.split("Results_")[1].startsWith(w)))
        .map(v => v.innerText)
    if (flg) columns = columns.map(v => $p.getColumnName(v))
    return columns
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
        boxDiv.innerHTML = s.name
        if (commonGetVal(label) == s.name) boxDiv.classList.add(color)
        document.getElementById(id).appendChild(boxDiv)
    }
}

/**
 * 分類項目の値を選択したときの表示制御。
 * @param {String} label 分類項目名（またはチェック項目）
 * @param {Object} display 表示制御オブジェクト
 * @param {Bool} show
 * @param {Bool} onchange ラベルにonchangeを付与
 *
 * displayの書き方
 * {
 *    value1 : ["ClassA", "ClassB", "NumA", "DescriptionA"]
 *    , value2 : "DescriptionA"
 *    , value3 : ["DescriptionA", "FieldSetTab12", "SectionFields2"]
 *    , empty  : "DescriptionA"
 * }
 * value1, value2, value3は分類項目の値
 * value1 の時、ClassA, ClassB, NumA, DescriptionAが消える
 * value2 の時、DescriptionAが消える
 * value3 の時、DescriptionBが消える FieldSetTab12(タブ)内全て消える SectionFields2（見出し）内全て消える
 * 空の時、DescriptionAが消える
 * それ以外の時、全て表示
 *
 */
function commonDisplay(label, display, show = true, onchange = true) {
    commonDisplayInner(label, display, show = true)
    if (onchange) {
        document.getElementById(commonGetId(label)).onchange = function() {
            commonDisplayInner(label, display, show = true)
        }
    }
    function commonDisplayInner(label, display, show = true) {
        let empty = "empty"
        let showItemArr = []
        let hideItemArr = []
        let showSectionArr = []
        let hideSectionArr = []
        let showTabArr = []
        let hideTabArr = []
        for (let val in display) {
            let target = []
            if (Array.isArray(display[val])) {
                target = display[val]
            } else {
                target = [display[val]]
            }
            // 非表示化フラグ
            let hideFlag = (empty == val && commonIsNull(commonGetVal(label, true))) || (commonGetVal(label, true) == val)
            // 非表示化 & 内容消去
            target.forEach(v => {
                // タブ
                if (v.includes("FieldSetTab")) {
                    commonFilterColumnNames(document.getElementById(v), true).forEach(w => {
                        if (hideFlag) {
                            hideItemArr.push(w)
                        } else {
                            showItemArr.push(w)
                        }
                    })
                    if (hideFlag) {
                        hideTabArr.push(v)
                    } else {
                        showTabArr.push(v)
                    }
                    // 見出し
                } else if (v.includes("SectionFields")) {
                    commonFilterColumnNames(document.getElementById(v), true).forEach(w => {
                        if (hideFlag) {
                            hideItemArr.push(w)
                        } else {
                            showItemArr.push(w)
                        }
                    })
                    if (hideFlag) {
                        hideSectionArr.push(v)
                    } else {
                        showSectionArr.push(v)
                    }
                    // 分類項目、数値項目、日付項目等
                } else {
                    if (hideFlag) {
                        hideItemArr.push(v)
                    } else {
                        showItemArr.push(v)
                    }
                }
            })
        }
        // 表示してから非表示
        showItemArr.forEach(v => commonHideElements(commonGetId(v, true, true), !show))
        hideItemArr.forEach(v => {
            commonHideElements(commonGetId(v, true, true), show)
            if (show) commonSetVal(v, "")
        })
        showSectionArr.forEach(v => document.getElementById(`${v}Container`).hidden = !show)
        hideSectionArr.forEach(v => document.getElementById(`${v}Container`).hidden = show)
        showTabArr.forEach(v => document.querySelector(`li[aria-controls=${v}]`).hidden = !show)
        hideTabArr.forEach(v => document.querySelector(`li[aria-controls=${v}]`).hidden = show)
    }
}

/**
 * 指定されたIDを持つHTMLエレメントを削除する関数です。
 * @param {Array} ids 削除ID
 */
function commonRemoveElements(...ids) {

    ids.filter(id => !commonIsNull(document.getElementById(id))).forEach(id => document.getElementById(id).remove())
}

/**
 * 指定されたボタンを削除する関数です。（一覧画面で使用を想定）
 * @param {Array} buttonNames ボタン名
 */
function commonRemoveGridButtons(...buttonNames) {
    try {
        if ($p.action() !== "index") {
            let message = STATUS_ERROR_MESSAGE_GRID
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let removes = []
        for (let bn of buttonNames)
        switch (bn) {
            case "戻る":
                removes.push("GoBack")
                break

            case "一括削除":
                removes.push("BulkDeleteCommand")
                break

            case "インポート":
                removes.push("EditImportSettings")
                break

            case "エクスポート":
                removes.push("OpenExportSelectorDialogCommand")
                break

            case "検索":
                removes.push("SearchField")
                break
            default:
                Array.from(document.getElementsByTagName("button"))
                    .filter(v => v.innerText.trim() == bn)
                    .forEach(v => v.remove())
                break

        }
        commonRemoveElements(...removes)
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 指定されたボタンを削除する関数です。（編集画面で使用を想定）
 * @param {Array} buttonNames ボタン名
 */
function commonRemoveEditorButtons(...buttonNames) {
    try {
        if ($p.action() !== "edit" && $p.action() !== "new") {
            let message = STATUS_ERROR_MESSAGE_EDIT
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let removes = []
        for (let bn of buttonNames)
        switch (bn) {
            case "戻る":
                removes.push("GoBack")
                break

            case "更新":
                removes.push("UpdateCommand")
                break

            case "コピー":
                removes.push("OpenCopyDialogCommand")
                break

            case "メール":
                removes.push("EditOutgoingMail")
                break

            case "削除":
                removes.push("DeleteCommand")
                break

            case "検索":
                removes.push("SearchField")
                break

            case "コメント削除":
                let i = 1
                while (document.getElementById("DeleteComment," + i)) {
                    removes.push("DeleteComment," + i++)
                }
                break
            default:
                Array.from(document.getElementsByTagName("button"))
                    .filter(v => v.innerText.trim() == bn)
                    .forEach(v => v.remove())
                break
        }
        commonRemoveElements(...removes)
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 指定されたIDを持つHTMLエレメントの子要素をすべて削除する関数です。
 * @param {String} id 削除ID
 */
function commonRemoveElementChilds(id) {
    //要素取得
    let target = document.getElementById(id)
    //子要素削除
    while (target.lastChild) {
        target.removeChild(target.lastChild)
    }
}

/**
 * 指定されたIDを持つHTMLエレメントを表示・非表示を切り替える関数です。
 * @param {Array} ids 削除ID
 * @param {Array} flg 表示・非表示
 */
function commonHideElements(ids, flg = true) {
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
 * @param {Array} applys        適用するステータス
 */
function commonCheckStatus(applys = "all") {
    let allFlg = false
    if (!Array.isArray(applys)) {
        if (applys = "all") {
            allFlg = true
        } else {
            applys = [applys]
        }
    }
    return allFlg || applys.map(v => +v).includes(+commonGetVal("Status", true))
}

/**
 * コマンドエリアにボタンを追加する関数です。
 * @param {String} buttonId     ボタンID
 * @param {Function} clickFunc  click時関数
 * @param {String} label        ラベル
 * @param {String} title        タイトル
 * @param {String} style        スタイル
 * @param {String} icon         アイコン（empty指定でアイコンなし）
 * @param {String} appendId     appendする要素ID
 * @param {Array} applys        適用するステータス
 */
function commonAddButton(buttonId, clickFunc, label, title, style, icon = "ui-icon-disk", appendId = "MainCommands", applys = "all") {
    if (!commonCheckStatus(applys)) return

    let target = document.getElementById(appendId)
    let elem = document.createElement('button')
    elem.id = buttonId
    elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
    elem.onclick = clickFunc
    if (!commonIsNull(title)) elem.title = title
    if (!commonIsNull(style)) elem.style = style
    elem.innerText = label
    if (icon !== "empty") {
        let span = document.createElement('span')
        span.className = `ui-button-icon ui-icon ${icon}`
        elem.appendChild(span)
    }
    let space = document.createElement('span')
    space.className = "ui-button-icon-space"
    elem.appendChild(space)

    target.appendChild(elem)
}

/**
 * 空日付を出力する関数です。
 *
 * @return {String} 空日付
 */
function commonGetDateEmpty() {
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
function commonGetDate(yyyy, mm = 1, dd = 1, format = 'YYYY-MM-DD') {
    let date
    try {
        if (typeof yyyy === 'undefined' || commonIsNull(yyyy)) {
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
 * 締日付を算出する関数です。
 *
 * @param {Number} cls    締日区分
 * @param {Number} yyyy   請求年
 * @param {Number} mm     請求月
 * @param {Number} dd     請求日
 * @param {String} format フォーマット
 *
 * @return {String} 締日付
 */
function commonGetClosingDate(cls = 0, yyyy, mm, dd, format = 'YYYY-MM-DD') {
    //  1,1日締め
    //  2,2日締め
    //  3,3日締め
    //  4,4日締め
    //  5,5日締め
    //  6,6日締め
    //  7,7日締め
    //  8,8日締め
    //  9,9日締め
    //  10,10日締め
    //  11,11日締め
    //  12,12日締め
    //  13,13日締め
    //  14,14日締め
    //  15,15日締め
    //  16,16日締め
    //  17,17日締め
    //  18,18日締め
    //  19,19日締め
    //  20,20日締め
    //  21,21日締め
    //  22,22日締め
    //  23,23日締め
    //  24,24日締め
    //  25,25日締め
    //  26,26日締め
    //  27,27日締め
    //  28,28日締め
    //  99,月末締め

    let date

    // 締日が翌月
    if (+cls < +dd) {
        date = commonGetDate(yyyy, +mm + 1, cls, format)
    // 締日が当月
    } else if (+dd <= +cls && +cls <= 28) {
        date = commonGetDate(yyyy, mm, cls, format)
    } else {
      // 99: 月末締め
        date = commonGetDate(yyyy, +mm + 1, 0, format)
    }
    return date
}
/**
 * 支払日付を算出する関数です。
 *
 * @param {Number} cls    支払日区分
 * @param {Number} yyyy   締年
 * @param {Number} mm     締月
 * @param {Number} dd     締日
 * @param {String} format フォーマット
 *
 * @return {String} 支払日付
 */
function commonGetPaymentDate(cls = 0, yyyy, mm, dd, format = 'YYYY-MM-DD') {
      //　100,都度払い
      //　105,翌月5日支払い
      //　110,翌月10日支払い
      //　115,翌月15日支払い
      //　120,翌月20日支払い
      //　125,翌月25日支払い
      //　199,翌月末支払い
      //　205,翌々月5日支払い
      //　210,翌々月10日支払い
      //　215,翌々月15日支払い
      //　220,翌々月20日支払い
      //　225,翌々月25日支払い
      //　299,翌々月末支払い
    cls = +cls < 100 ? 100 : cls
    let nextMm = +mm + Math.floor(cls / 100)
    let nextDd = cls % 100 <= 28 ? cls % 100 : 0
    return date = commonGetDate(yyyy, nextMm, nextDd, format)
}

/**
 * 引数の2次元配列をCSVでダウンロードする関数です。
 *
 * @param {Array} d2array       2次元配列
 * @param {String} title        ファイル名
 * @param {String} charcode     文字コード
 */
function commonDownloadCsv(d2array, title = 'test', charcode = "utf-8") {
    // CSVデータを文字列に変換
    let csvString = d2array.map(row => '"' +  row.join('","') + '"').join("\n")

    // UTF-8でエンコードされたCSVファイルを生成
    let encoder = new TextEncoder(charcode)
    let csvEncoded = encoder.encode(csvString)

    // CSVファイルをダウンロード
    let blob = new Blob([csvEncoded], { type: `text/csv;charset=${charcode};` })

    // a要素を作成する
    let link = document.createElement('a')
    // a要素にエンコード化した出力データを追加
    link.setAttribute('href', URL.createObjectURL(blob))
    // a要素に出力情報を追加
    link.setAttribute('download', title + '.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    // HTMLドキュメントに追加したa要素を実行(clickイベント発火)
    link.click()
    document.body.removeChild(link)

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
function commonConvert2DToMd(array) {
    if (array[0].length != array[1].length) {
        let message = `共通関数commonConvert2DToMd：要素数不正。`
        commonMessage(STATUS_ERROR, message)
        throw new Error(message)
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
 *      ['7', '2', '14'],
 *      ['8', '8', '64'],
 *     ]
 */
function commonConvertCsvTo2D (csvData) {
    // csvDataに出力方法を追加
    let csvOutput = 'data:text/csvcharset=utf-8,'
    // 改行の代わり
    let replaceStr = "xxxxxxxxx====xxxxxxxxx====xxxxxxxxxxx"
    // 説明項目の語尾の改行の置換
    while (csvData.includes('\n",')) {
        csvData = csvData.replace('\n",', '",')
    }

    let lines = csvData.trim().replace(csvOutput, '').replaceAll("\r\n", "\n").split("\n")
    let newLines = []
    for (let i = 0; i < lines.length; i++) {
        if(lines[i] == "\"") {
            newLines[newLines.length - 1] +=  replaceStr + '"'
        } else if (lines[i].startsWith('""') && !lines[i].startsWith('"",')) {
            newLines[newLines.length - 1] +=  replaceStr + lines[i]
        } else if (lines[i].startsWith('"')) {
            newLines.push(lines[i])
        } else {
            newLines[newLines.length - 1] += replaceStr + lines[i]
        }
    }
    return newLines.map(v => v.split(",").map(v => v.replaceAll(replaceStr, "\n").replace(/^"/, '').replace(/"$/, '')))
}


/**
 * アルファベットのみの文字列を数値に変換する
 * @param {String} str アルファベット列
 *
 * @return {Number} 数値変換値
 * 例. A  ⇒ 1
 * 例. Z  ⇒ 26
 * 例. AA ⇒ 27
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
 * 2次元配列 * 2次元配列 で left join（左外部結合） する関数です。(比較する行はuniqueにしてください。)
 * @param {Array} d2arr1            2次元配列1
 * @param {Number} d2arr1KeyIndex   2次元配列1の比較列
 * @param {Array} d2arr2            2次元配列2
 * @param {Number} d2arr2KeyIndex   2次元配列2の比較列
 * @param {Number} init             初期値
 *
 * @return {Array} 2次元配列
 *
 * 例. d2arr1 = [["T3B-12",5413,1879],    d2arr2 = [["SC133S","SC133L","2",true],      init = ""
 *               ["TD-150",2858,8520],              ["SC144S","SC144L","2",true],
 *               ["SC144S",2900,9696],              ["SC147S","SC147L","20",false]]
 *               ["SC147S",1476,9144]]
 *     　　　　                           ⇓
 *            [["T3B-12",5413,1879,"","","",""],
 *             ["TD-150",2858,8520,"","","",""],
 *     　　　　 ["SC144S",2900,9696,"SC144S","SC144L","2",true],
 *     　　　　 ["SC147S",1476,9144,"SC147S","SC147L","20",false]]
 */

function commonJoinLeft(d2arr1, d2arr1KeyIndex = 0, d2arr2, d2arr2KeyIndex = 0,  init = "") {
    let size = d2arr2[0].length
    return d2arr1.map(v => {
        let tmpArr = d2arr2.find(w => v[d2arr1KeyIndex] == w[d2arr2KeyIndex])
        if (commonIsNull(tmpArr)) {
            return v.concat(Array(size).fill(init))
        } else {
            return v.concat(tmpArr)
        }
    })
}

/**
 * 連番配列を生成する関数です。
 * @param {Number} n 項数
 * @param {Number} a 初項
 *
 * @return {Array} 連番配列
 *
 * 例. n = 5, a = 1
 *           ⇓
 *    [1, 2, 3, 4, 5]
 */
function commonGenerateSequentialArray(n, a = 0) {
    return [...Array(n)].map((_, i) => i + a)
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
function commonGenerate2DArray(m, n, init = 0) {
    return [...Array(m)].map(_ => Array(n).fill(init))
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
function commonSummary2DArray(d2array, findIndexes = [], sortIndexes = [], summaryHash, countFlg = false) {
    if (commonIsNull(d2array)) {
        let message = `共通関数commonSummary2DArray：配列が空です。`
        commonMessage(STATUS_ERROR, message)
        throw new Error(message)    }

    let countIndex = d2array[0].length + 1
    if (countFlg) d2array = commonAddColumn(d2array, countIndex, 1)

    let result = []
    if (commonIsNull(findIndexes)) {
        result = d2array
    } else {
        d2array.forEach(item => {
            let index = result.findIndex(row => findIndexes.every(idx => row[idx] == item[idx]))
            if (index != -1) {
                for (let key in summaryHash) {
                    if (!commonIsNull(item[key])) {
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
 *
 *  　　　　                   ⇓
 *
 *                [["74060", "60", 10, 10, 10]
 *                ,["74063", "25", 10, 10, 10]
 *                ,["74061", "15", 10, 10, 10]
 *                ,["74058", "24", 10, 10, 10]
 *                ,["74057", "47", 10, 10, 10]]
 *
 */
function commonAddColumn(d2array, n, init = 0) {
    let arr = commonGenerate2DArray(d2array.length, n, init)
    for (let i = 0; i < d2array.length; i++) {
        for (let j = 0; j < d2array[i].length; j++) {
            arr[i][j] = d2array[i][j]
        }
    }
    return arr
}


/**
 * 2次元配列の列を削除する関数です。
 * @param {Array} d2array 元2次元配列
 * @param {Number} index  削除列

 *
 * @return {Array} 生成２次元配列
 *
 * 例. d2array = [["74060", "60", 10] index = 1
 *               ,["74063", "25", 10]
 *               ,["74061", "15", 10]
 *               ,["74058", "24", 10]
 *               ,["74057", "47", 10]]
 *
 *  　　　　             ⇓
 *
 *                [["74060", 10]
 *                ,["74063", 10]
 *                ,["74061", 10]
 *                ,["74058", 10]
 *                ,["74057", 10]]
 */
function commonDeleteColumn(d2array, index = 0) {
    let newArray = []
    for (let row of d2array) {
        newArray.push(row.slice(0, index).concat(row.slice(index + 1)))
    }
    return newArray
}

/**
 * 配列をn個ずつ分割する関数です。
 * @param {Array} array 配列
 * @param {Array} n     分割単位
 *
 * @return {Array} 2次元配列
 *
 * 例. array = [1, 1, 2, 3, 3, 4, 1, 2, 3, 5, 5, 1, 2, 3, 5], n = 4
 *                             ⇓
 * [ [1, 1, 2, 3], [3, 4, 1, 2], [3, 5, 5, 1], [2, 3, 5] ]
 */
function commonSliceArray(array, n) {
    let start = 0
    let end = n
    let d2Array = []
    d2Array.push(array.slice(start, end))
    while (end < array.length) {
        start += n
        end += n
        d2Array.push(array.slice(start, end))
    }
    return d2Array
}


/**
 * 配列を同値分割する関数です。
 * @param {Array} array 配列
 *
 * @return {Array} 2次元配列
 *
 * 例. array = [1, 1, 2, 3, 3, 4, 1, 2, 3, 5, 5, 1, 2, 3, 5]
 *                             ⇓
 * [ [1, 1, 1, 1], [2, 2, 2], [3, 3, 3, 3], [4], [5, 5, 5] ]
 */
function commonDivideEqualArray(array) {
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
    d2array = d2array.sort((a, b) => a[index] < b[index] ? -1 : 1)
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
 * 配列をインデックス付きのオブジェクトに変換する
 * @param {Array} data オブジェクト配列
 *
 * @return {Object} インデックス付きのオブジェクト
 */
function commonConvertArrayToObjectWithIndex(data) {
    return data.reduce((prev, current, index) => {
        prev[index + 1] = current
        return prev
    }, {})
}

/**
 * オブジェクト配列を2次元配列に変換する
 * @param {Array}   data    オブジェクト配列
 * @param {Array}   keys    キー指定順
 * @param {Boolean} header  ヘッダーを付ける
 *
 * @return {Object} インデックス付きのオブジェクト
 */
function commonConvertDataTo2D(data, keys = [], header = false) {
    let values = []
    if (Array.isArray(keys) && !commonIsNull(keys)) {
        if (header) values.push(keys) // ヘッダーを付ける
        data.forEach(record => values.push(keys.map(v => record[v]))) // 値
    } else {
        if (header) values.push(Object.keys(data[0])) // ヘッダーを付ける
        data.forEach(record => values.push(Object.values(record))) // 値
    }
    return values
}

/**
 * 文字列配列内の重複項目を削除する
 * @param {Array} arr 文字列配列
 */
function commonUniqueArray(arr) {
    return arr.filter((elem, index) => arr.indexOf(elem) === index)
}

/**
 * 入力されたラベルのIDを返却する。
 * @param {String} label ラベル
 */
function commonGetId(label, prefix = true, suffix = false) {
    try {
        let id = $p.getColumnName(label)
        if (commonIsNull(id)) {
            let message = `共通関数commonGetId：ラベル不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else {
            id = prefix ? $p.tableName() + '_' + id : id
            id = suffix ? id + 'Field' : id
        }
        return id
    } catch (err) {
        // 再スロー
        throw err
    }

}

/**
 * 入力されたラベルに一致する項目を読取専用に変更または解除する。
 * @param {String} label ラベル
 * @param {Boolean} disabled trueなら読取専用 falseなら読取解除
 */
function commonChangeReadOnly(label, disabled = true) {
    try {
        let areaId = commonGetId(label)
        if (commonIsNull(areaId)) {
            let message = `共通関数commonChangeReadOnly：ラベル不正。${label}`
            console.log(message)
            return
        }
        let area = document.getElementById(areaId)
        if (commonIsNull(area)) {
            let message = `共通関数commonChangeReadOnly：area制御不要。${label}`
            console.log(message)
            return
        }
        let field = document.getElementById(commonGetId(label, true, true))
        if (commonIsNull(field)) {
            let message = `共通関数commonChangeReadOnly：field制御不要。${label}`
            console.log(message)
            return
        }

        // 入力項目disable制御
        area.disabled = disabled
        // area.className = disabled ? "control-text" : "control-textbox"
        // area.classList.toggle("original-style-disabled")
        if (disabled) {
            // 説明項目とチェック項目はクラス付与しない
            if (!["checkbox", "textarea"].includes(area.type)) {
                area.classList.add("original-style-disabled")
            }
        } else {
            area.classList.remove("original-style-disabled")
        }

        // icon 表示制御
        let icons = ['ui-icon-clock', 'ui-icon-person', 'ui-icon-pencil', 'ui-icon-image', 'ui-icon-video']
        for (let icon of icons) {

            let target = field.querySelector('.' + icon)
            if (!commonIsNull(target)) {
                target.style['visibility'] = disabled ? 'hidden' : 'visible'
            }
        }

    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 入力されたラベルに一致する項目を読取専用に変更または解除する。
 * @param {String} label ラベル
 * @param {Boolean} disabled trueなら読取専用 falseなら読取解除
 */
function commonChangeHidden(label, disabled = true) {
    try {
        let areaId = commonGetId(label)
        if (commonIsNull(areaId)) {
            let message = `共通関数commonChangeReadOnly：ラベル不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let area = document.getElementById(areaId)
        if (commonIsNull(area)) {
            let message = `共通関数commonChangeReadOnly：area制御不要。${label}`
            console.log(message)
            return
        }
        let field = document.getElementById(commonGetId(label, true, true))
        if (commonIsNull(field)) {
            let message = `共通関数commonChangeReadOnly：field制御不要。${label}`
            console.log(message)
            return
        }

        // 入力項目disable制御
        area.disabled = disabled
        // area.className = disabled ? "control-text" : "control-textbox"
        // area.classList.toggle("original-style-disabled")
        if (disabled) {
            if (area.type !== "checkbox") {
                area.classList.add("original-style-disabled")
            }
        } else {
            area.classList.remove("original-style-disabled")
        }

        // icon 表示制御
        let icons = ['ui-icon-clock', 'ui-icon-person', 'ui-icon-pencil', 'ui-icon-image', 'ui-icon-video']
        for (let icon of icons) {

            let target = field.querySelector('.' + icon)
            if (!commonIsNull(target)) {
                target.style['visibility'] = disabled ? 'hidden' : 'visible'
            }
        }

    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * メインボタンメニューの読取を反転させる
 */
function commonChangeReadOnlyMainButton() {
    Array.from(document.querySelectorAll("#MainCommands button")).map(v => v.disabled = !v.classList.toggle('ui-button'))
}

/**
 * 入力されたラベルに一致する項目の選択した値を返却する。
 * @param {String} label ラベル
 * @param {String} flg true: value false: text
 */
function commonGetVal(label, valueFlg = false) {
    let value = ""
    try {
        if ($p.getControl($p.getColumnName(label)).prop("tagName") === "SELECT") {
            if ($p.getControl($p.getColumnName(label)).attr("multiple")) {
                value = valueFlg ? $p.getControl($p.getColumnName(label)).val() : $p.getControl($p.getColumnName(label)).next().children().last().text()
            } else {
                value = valueFlg ? $p.getControl($p.getColumnName(label)).children(':selected').val() : $p.getControl($p.getColumnName(label)).children(':selected').text()
            }
        } else if ($p.getControl($p.getColumnName(label)).prop("tagName") === "INPUT") {
            if (commonGetId(label).indexOf("Check") > 0) {
                value = document.getElementById(commonGetId(label)).checked
                value = valueFlg ? +value : value
            } else {
                // 選択系 読み取り専用
                value = valueFlg ? $p.getControl($p.getColumnName(label)).attr('data-value') : $p.getControl($p.getColumnName(label))[0].innerHTML
                if (commonIsNull(value)) {
                    // 選択系以外
                    value = $p.getControl($p.getColumnName(label)).val()
                }
            }
        } else if ($p.getControl($p.getColumnName(label)).prop("tagName") === "TEXTAREA") {
            value = document.getElementById(commonGetId(label) + ".viewer").innerText
        } else {
            // 選択系 読み取り専用
            value = valueFlg ? ($p.getControl($p.getColumnName(label)).attr('data-value') ?? $p.getControl($p.getColumnName(label))[0].innerHTML) : $p.getControl($p.getColumnName(label))[0].innerHTML
            if (commonIsNull(value)) {
                // 選択系以外
                value = $p.getControl($p.getColumnName(label)).val()
            }
        }
    } catch (e) {
        console.log(label)
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
function commonSetVal(label, value) {
    try {
        // 値が変更されている場合
        if (commonGetVal(label, true) != value) {
            if ($p.getColumnName(label).startsWith("Check")) {
                // changeイベントを動かす
                $p.getControl(label).click()
            } else {
                value = (value == commonGetDateEmpty()) ? "" : value
                $p.set($p.getControl(label), value)
            }
        }
    } catch (err) {
        console.log(`共通関数commonSetVal：ラベル不正。${label}`)
        console.log(err)
    }
}


/**
 * 取得APIを呼び出す関数です。
 *
 * @param {Number}    id テーブルID
 * @param {Array}     columns 取得列
 * @param {Object}    filterHash フィルター条件
 * @param {Object}    sorterHash ソート条件
 * @param {Object}    filterSearchTypes 検索条件
 * @param {Boolean}   valueFlg true : value値 false : display値
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonGetData(id = $p.siteId(), columns = ["ClassA", "NumA"], filterHash = {}, sorterHash = { "ResultId": "asc" }, filterSearchTypes = {}, valueFlg = true, addFunc) {
    if (!Array.isArray(columns)) {
        columns = [columns]
    }
    let offset = 0
    let data = []
    let temp = {}
    do {
        temp = await commonGetInnner(id, columns, filterHash, sorterHash, filterSearchTypes, valueFlg, offset, addFunc)
        data = [...data, ...temp.Response.Data]
        offset += temp.Response.PageSize
    } while (offset < temp.Response.TotalCount)
    return data

    /**
     * 取得APIを呼び出す関数内関数です。(TotalCount 200)
     *
     * @param {Number}    id テーブルID
     * @param {Array}     columns 取得列
     * @param {Object}    filterHash フィルター条件
     * @param {Object}    sorterHash ソート条件
     * @param {Object}    filterSearchTypes 検索条件
     * @param {Boolean}   valueFlg true : value値 false : display値
     * @param {Number}    offset オフセット条件
     * @param {Function}  addFunc 最後に実行したい関数
     */
    async function commonGetInnner(id, columns, filterHash, sorterHash, filterSearchTypes, valueFlg, offset, addFunc) {
        return await $p.apiGet({
            'id': id,
            'data': {
                'Offset': offset,
                'View': {
                    'ApiDataType': "KeyValues",
                    'ApiColumnValueDisplayType': valueFlg ? "Value" : "DisplayValue",
                    'GridColumns': columns,
                    "ColumnFilterHash": filterHash,
                    "ColumnSorterHash": sorterHash,
                    "ColumnFilterSearchTypes": filterSearchTypes,
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
}

/**
 * エクスポートAPIを呼び出す関数です。
 *
 * @param {String}    tableId 取得テーブルID
 * @param {Array}     columns 取得列
 * @param {Object}    filterHash フィルター条件
 * @param {Object}    sorterHash ソート条件
 * @param {Object}    filterSearchTypes 検索条件
 * @param {Boolean}   jsonFlg trueならjson　falseならcsvで取得
 * @param {Boolean}   headerFlg trueならheaderも取得
 * @param {Boolean}   overFlg trueなら超過分のみ取得
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonExportData(tableId = $p.siteId(), columns = ["ClassA", "NumA"], filterHash = {}, sorterHash = {"ResultId": "asc"}, filterSearchTypes = {}, jsonFlg = true, headerFlg = true, overFlg = false, addFunc) {
    if (!Array.isArray(columns)) {
        columns = [columns]
    }
        columns.unshift("ResultId")
    let data = await commonExportInner(tableId, columns, filterHash, sorterHash, filterSearchTypes, jsonFlg, headerFlg, overFlg, addFunc)
    if (jsonFlg) {
        // json整形
        data = JSON.parse(data.Response.Content)
    } else {
        // csv整形
        data = commonConvertCsvTo2D(data.Response.Content)
    }

    return data
    /**
     * エクスポートAPIを呼び出す関数内関数です。
     *
     * @param {String}    tableId 取得テーブルID
     * @param {Array}     columns 取得列
     * @param {Object}    filterHash フィルター条件
     * @param {Object}    sorterHash ソート条件
     * @param {Object}    filterSearchTypes 検索条件
     * @param {Boolean}   jsonFlg trueならjson　falseならcsvで取得
     * @param {Boolean}   headerFlg trueならheaderも取得
     * @param {Boolean}   overFlg trueなら超過分のみ取得
     * @param {Function}  addFunc 最後に実行したい関数
     */
    async function commonExportInner(tableId, columns, filterHash, sorterHash, filterSearchTypes, jsonFlg, headerFlg, overFlg, addFunc) {

        let col = []
        columns.forEach(v => col.push({ "ColumnName": v }))
        let data = JSON.stringify({
            "ApiVersion": api_version ,
            "Export": {
                "Columns": col,
                "Header": headerFlg,
                "Type": jsonFlg ? "json" : "csv"
            },
            "View": {
                "Overdue": overFlg,
                "ColumnFilterHash": filterHash,
                "ColumnSorterHash": sorterHash,
                "ColumnFilterSearchTypes": filterSearchTypes,
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
async function commonCreate(tableId, Hash = {}, Status, Comments, pushFlg = true, addFunc) {

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
        "ApiVersion": api_version ,
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

/**
 * 更新APIを呼び出す関数です。
 *
 * @param {String}    recordId 更新レコードID
 * @param {Object}    Hash 更新項目
 * @param {String}    Status 更新ステータス
 * @param {String}    Comments 更新コメント
 * @param {Boolean}   pushFlg created_idsに（default）pushする
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonUpdate(recordId, Hash = {}, Status, Comments, pushFlg = true, addFunc) {

    // 更新項目
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
        "ApiVersion": api_version ,
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
                if (pushFlg) {
                    updated_ids.push(result.Id)
                    updated_ids = [...new Set(updated_ids.map(v => String(v)))]
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
async function commonExportUser(userIds, addFunc) {
    let users = []
    if (Array.isArray(userIds)) {
        users = userIds
    } else {
        users = [userIds]
    }
    let data = JSON.stringify({
        "ApiVersion": api_version ,
        "View": {
            "ColumnFilterHash": {
                "UserId": JSON.stringify(users)
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
async function commonExportGroup(groupIds, addFunc) {
    let groups = []
    if (Array.isArray(groupIds)) {
        groups = groupIds
    } else {
        groups = [groupIds]
    }
    let data = JSON.stringify({
        "ApiVersion": api_version ,
        "View": {
            "ColumnFilterHash": {
                "GroupId": JSON.stringify(groups)
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
 * @param {String}    Status 登録ステータス
 * @param {String}    Comments 登録コメント
 * @param {Number}    expand 最大拡張項目数
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonCopyRecord(editItems = {}, Status, Comments, expand = 0, addFunc) {

    try {
        if ($p.action() !== "edit") {
            let message = STATUS_ERROR_MESSAGE_EDIT
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }

        let Hash = {}

        //項目Aから項目Z
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (let char of alphabet) {
            let clsKey = "Class" + char
            let numKey = "Num" + char
            let datKey = "Date" + char
            let dscKey = "Description" + char
            let chkKey = "Check" + char
            Hash[clsKey] = commonIsNull(commonGetVal(clsKey)) ? "" : (Array.isArray(commonGetVal(clsKey, true)) ? convertArrayToMalti(commonGetVal(clsKey, true)) : commonGetVal(clsKey, true))
            Hash[numKey] = commonIsNull(commonGetVal(numKey)) ? 0 : commonConvertCTo1(commonGetVal(numKey))
            Hash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
            Hash[dscKey] = commonIsNull(commonGetVal(dscKey)) ? "" : commonGetVal(dscKey)
            Hash[chkKey] = commonIsNull(commonGetVal(chkKey)) ? false : commonGetVal(chkKey)
        }

        //項目001から項目999
        for (let i = 1; i <= expand; i++) {
            let clsKey = "Class" + String(i).padStart(3, "0")
            let numKey = "Num" + String(i).padStart(3, "0")
            let datKey = "Date" + String(i).padStart(3, "0")
            let dscKey = "Description" + String(i).padStart(3, "0")
            let chkKey = "Check" + String(i).padStart(3, "0")
            Hash[clsKey] = commonIsNull(commonGetVal(clsKey)) ? "" : (Array.isArray(commonGetVal(clsKey, true)) ? convertArrayToMalti(commonGetVal(clsKey, true)) : commonGetVal(clsKey, true))
            Hash[numKey] = commonIsNull(commonGetVal(numKey)) ? 0 : commonConvertCTo1(commonGetVal(numKey))
            Hash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
            Hash[dscKey] = commonIsNull(commonGetVal(dscKey)) ? "" : commonGetVal(dscKey)
            Hash[chkKey] = commonIsNull(commonGetVal(chkKey)) ? false : commonGetVal(chkKey)
        }

        // 変更項目を上書き
        for (let key in editItems) {
            Hash[key] = editItems[key]
        }

        // ステータスを取得
        if (commonIsNull(Status)) {
            Status = commonGetVal("Status", true)
        }

        return commonCreate(
            $p.siteId()
            , Hash
            , Status
            , Comments
            , addFunc
        )
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * レコード保存を行う関数です。（編集画面で使用を想定）
 *
 * @param {Object}    editItems 変更項目
 * @param {String}    Status 更新ステータス
 * @param {String}    Comments 更新コメント
 * @param {Boolean}   reload リロードするかどうか
 * @param {Number}    expand 最大拡張項目数
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonSaveRecord(editItems = {}, Status, Comments, reload = false, expand = 0, addFunc) {

    try {
        if ($p.action() !== "edit") {
            let message = STATUS_ERROR_MESSAGE_EDIT
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }

        let Hash = {}

        //項目Aから項目Z
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (let char of alphabet) {
            let clsKey = "Class" + char
            let numKey = "Num" + char
            let datKey = "Date" + char
            let dscKey = "Description" + char
            let chkKey = "Check" + char
            Hash[clsKey] = commonIsNull(commonGetVal(clsKey)) ? "" : (Array.isArray(commonGetVal(clsKey, true)) ? convertArrayToMalti(commonGetVal(clsKey, true)) : commonGetVal(clsKey, true))
            Hash[numKey] = commonIsNull(commonGetVal(numKey)) ? 0 : commonConvertCTo1(commonGetVal(numKey))
            Hash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
            Hash[dscKey] = commonIsNull(commonGetVal(dscKey)) ? "" : commonGetVal(dscKey)
            Hash[chkKey] = commonIsNull(commonGetVal(chkKey)) ? false : commonGetVal(chkKey)
        }

        //項目001から項目999
        for (let i = 1; i <= expand; i++) {
            let clsKey = "Class" + String(i).padStart(3, "0")
            let numKey = "Num" + String(i).padStart(3, "0")
            let datKey = "Date" + String(i).padStart(3, "0")
            let dscKey = "Description" + String(i).padStart(3, "0")
            let chkKey = "Check" + String(i).padStart(3, "0")
            Hash[clsKey] = commonIsNull(commonGetVal(clsKey)) ? "" : (Array.isArray(commonGetVal(clsKey, true)) ? convertArrayToMalti(commonGetVal(clsKey, true)) : commonGetVal(clsKey, true))
            Hash[numKey] = commonIsNull(commonGetVal(numKey)) ? 0 : commonConvertCTo1(commonGetVal(numKey))
            Hash[datKey] = commonIsNull(commonGetVal(datKey)) ? commonGetDateEmpty() : commonGetVal(datKey)
            Hash[dscKey] = commonIsNull(commonGetVal(dscKey)) ? "" : commonGetVal(dscKey)
            Hash[chkKey] = commonIsNull(commonGetVal(chkKey)) ? false : commonGetVal(chkKey)
        }

        // 変更項目を上書き
        for (let key in editItems) {
            Hash[key] = editItems[key]
        }

        // ステータスを取得
        if (commonIsNull(Status)) {
            Status = commonGetVal("Status", true)
        }

        let u = await commonUpdate(
            $p.id()
            , Hash
            , Status
            , Comments
            , addFunc
        )
        if (reload) {
            $(window).off('beforeunload');
            location.reload()
        }
        return u
    } catch (err) {
        // 再スロー
        throw err
    }

}


function commonGetBufferToBase64(buffer) {
    let binary
    let bytes = new Uint8Array(buffer)
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
}

async function commonUpdateAttachment(targetID, className, workbook, filename) {
    const fileBuffer = await workbook.xlsx.writeBuffer()
    const base64 = commonGetBufferToBase64(fileBuffer)

    let url = `/api/items/${targetID}/update`
    let method_name = "POST"
    let data = {
        "ApiVersion": api_version ,
        "AttachmentsHash": {
            [className]: [
                {
                    "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "Name": filename,
                    "Base64": base64
                }
            ]
        }
    }
    await $.ajax({
        type: method_name,
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        scriptCharset: 'utf-8',
        success: function (data) {
            // Success
            console.log("success")
            console.log(JSON.stringify(data))
        },
        error: function (data) {
            // Error
            console.log("error")
            console.log(JSON.stringify(data))
        }
    })
}

function commonSetLoading(bool) {
    if (bool) {
        document.getElementById('loading').classList.remove('is-hide')
    } else {
        document.getElementById('loading').classList.add('is-hide')
    }
}


var nf = "Num-Field"
var ni = "Num-Input"
var nl = "Num-Label"
var cf = "Class-Field"
var ci = "Class-Input"
var cl = "Class-Label"
var df = "Date-Field"
var di = "Date-Input"
var dl = "Date-Label"

/**
 * テーブルインプットを埋め込む
 * @param {String} id   埋め込むelementのID
 *
 *
 */
function commonInsertTableInput(id, startPlace = 0, title = "", column = 9, row = 9, columnDetail = [cl, ni, ni, di], headerRow = 1, headerDetail = [di, di, di, di], color = "#fff8dc") {

    let th = ''
    let td = ''

    if (!columnDetail.every(v => [nf, ni, nl, cf, ci, cl, df, di, dl].includes(v))) {
        alert("columnDetailの指定が間違っています")
        return
    }
    // 要素数がcolumn数になるまでpushする
    while (headerDetail.length < column) headerDetail.push(ci)
    if (!headerDetail.every(v => [nf, ni, nl, cf, ci, cl, df, di, dl].includes(v))) {
        alert("headerDetailの指定が間違っています")
        return
    }
    // 要素数がcolumn数になるまでpushする
    while (columnDetail.length < column) columnDetail.push(ci)

    // 要素数がcolumn数になるまでpushする
    while (headerDetail.length < column) headerDetail.push(ci)

    for (let i = 0; i < row; i++) {
        for (let j = 1; j <= column; j++) {
            let index = String(startPlace + i * column + j).padStart(3, "0")
            console.log(index)
            let type = (i < headerRow) ? headerDetail[j - 1].split("-") : columnDetail[j - 1].split("-")
            let eleId = "Results_" + type[0] + index + "Field"
            let field = document.getElementById(eleId)
            if (commonIsNull(field)) {
                alert(eleId + "がありません。")
                return
            }
            let elem = {}
            if (type[1] == "Field") {
                elem = field
            } else if (type[1] == "Input") {
                // input がなければ select を取得
                elem = field.querySelector("input") || field.querySelector("select")
            } else if (type[1] == "Label") {
                elem = field.querySelector("label")
            }
            let estr = commonConvertElementToString(elem)
            field.remove()

            if (i < headerRow) {
                if (j == 1) th += `<tr id="row${i}" class="ui-widget-header">`
                th += `
                    <th id="cell${index}">
                        <div>
                            <span>${estr}</span>
                        </div>
                    </th>
                `
                if (j == column) th += '</tr>'
            } else {
                if (j == 1) td += `<tr id="row${i}">`
                td += `
                    <td id="cell${index}">
                        <p>${estr}</p>
                    </td>
                `
                if (j == column) td += '</tr>'
            }
        }

    }

    let html = `
        <div>
            <table class="grid" style="border-radius:10px;background-color:${color}">
                <caption>
                    <span>${title} </span>
                </caption>
                <thead>
                    ${th}
                </thead>
                <tbody>
                    ${td}
                </tbody>
            </table>
        </div>
    `
    $("#" + id).prepend(html)
}


/**
* HTMLエレメントをString変換
* @param {Object} elem
*/
function commonConvertElementToString(elem) {
    let elemClone = elem.cloneNode(true)
    //変換したいエレメントを格納する新しい要素
    let newElement = document.createElement('dialog')
    //新しい要素のインナーHTMLを取得することで文字列に変換する
    newElement.appendChild(elemClone)
    return newElement.innerHTML
}

/**
 * 処理中へ更新を行う関数です。（編集画面で使用した場合はサーバー側との更新時間が合っているかを確認）
 *
 */
async function commonUpdateProcessing(id = $p.id()) {
    try {
        if ($p.action() !== "edit") {
            let message = STATUS_ERROR_MESSAGE_EDIT
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }

        let u = {}
        if ($p.action() == "edit") {
            id = $p.id()
            let serverDate = await commonGetData(id, [$p.getColumnName("更新日時")])
            serverDate = serverDate[0]["更新日時"]
            let clientDate = $p.getControl("更新日時").attr("datetime")
            if (serverDate !== clientDate) {
                let message = STATUS_ERROR_MESSAGE_UP
                commonMessage(STATUS_ERROR, message)
                throw new Error(message)
            }
            u = await commonSaveRecord({}, STATUS_PROCESSING)
        } else {
            u = await commonUpdate(id, {}, STATUS_PROCESSING)
        }

        return u
    } catch (err) {
      // 再スロー
        throw err
    }
}