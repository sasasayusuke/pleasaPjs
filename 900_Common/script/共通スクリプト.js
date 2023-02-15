
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

        // システムタイトル取得
        let sysTitle = document.getElementsByTagName("Title")[0].innerText
        // サイトタイトル取得
        let siteTitle = JSON.parse(document.getElementById("JoinedSites").value)[0].Title
        // システムタイトル置換
        document.getElementsByTagName("Title")[0].innerText = sysTitle.replace("PCLS", "PCLS 一覧 " + siteTitle)

    } catch (err) {
        console.log(err)
    }
})

// 共通editorロード処理
$p.events.on_editor_load_arr.push(function () {
    try {
        // システムタイトル取得
        let sysTitle = document.getElementsByTagName("Title")[0].innerText
        // サイトタイトル取得
        let siteTitle = JSON.parse(document.getElementById("JoinedSites").value)[0].Title
        // システムタイトル置換
        document.getElementsByTagName("Title")[0].innerText = sysTitle.replace("PCLS", "PCLS 編集 " + siteTitle)

        // 読み取り制御
        Object.values(TABLE_INFO[commonGetTableName($p.siteId())].column)
            .filter(v => v.readOnly.includes(+commonGetVal("Status", true)))
            .forEach(v => commonChangeReadOnly(v.label))

        // オリジナルスタイルの追加
        let style = `
            <style>
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
            </style>`
        $('#Application').append(style)
    } catch (err) {
        console.log(err)
    }
})

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
            commonCheckPoint(`メッセージタイプが不正な値です。${message}`, "error")
            throw new Error(message)

            break
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

                // カラム名変数保存
                //await Promise.all(Object.keys(TABLE_INFO).map(key => TABLE_INFO[key].index).map(async v => commonGetColumnNames(v)))

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
 * @return {Array} columnNames
 *
 */
function commonFilterColumnNames(html) {
    return Array.from(html.querySelectorAll('div[id^="Results_"][id$="Field"]'))
        .map(v => v.id.split("Results_")[1].split("Field")[0])
        .filter(v => ["Class", "Num", "Date", "Check", "Description"].some(w => v.includes(w)))
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
 * @param {String} label 分類項目名
 * @param {Object} display 表示制御オブジェクト
 * @param {Bool} show
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
function commonDisplay(label, display, show = true) {
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
                commonFilterColumnNames(document.getElementById(v)).forEach(w => {
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
                commonFilterColumnNames(document.getElementById(v)).forEach(w => {
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

/**
 * 指定されたIDを持つHTMLエレメントを削除する関数です。
 * @param {Array} ids 削除ID
 */
function commonRemoveElements(ids) {
    let elems = []
    if (Array.isArray(ids)) {
        elems = ids
    } else {
        elems = [ids]
    }

    elems.filter(v => !commonIsNull(document.getElementById(v))).forEach(v => document.getElementById(v).remove())
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
        commonRemoveElements(removes)
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

            case "インポート":
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
        commonRemoveElements(removes)
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
 * @param {String} buttonId     ボタンID
 * @param {Function} clickFunc  click時関数
 * @param {String} label        ラベル
 * @param {String} title        タイトル
 * @param {String} style        スタイル
 * @param {String} icon         アイコン（empty指定でアイコンなし）
 */
function commonAddButton(buttonId, clickFunc, label, title, style, icon = "ui-icon-disk") {
    let target = document.getElementById('MainCommands')
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
            .replace(/YYYY/, commonPaddingLeft(date.getFullYear(), 4))
            .replace(/MM/, commonPaddingLeft(date.getMonth() + 1, 2))
            .replace(/DD/, commonPaddingLeft(date.getDate(), 2))
            .replace(/hh/, commonPaddingLeft(date.getHours(), 2))
            .replace(/mm/, commonPaddingLeft(date.getMinutes(), 2))
            .replace(/ss/, commonPaddingLeft(date.getSeconds(), 2))
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
 * 左パディングする関数です。
 * @param {String} str 数値
 * @param {Number} size 桁数
 * @param {String} char パディング文字
 * @return {String} パディングされた文字列
 */
function commonPaddingLeft(str, size = 1, char = '0') {
    try {
        if (char.length !== 1) {
            let message = `共通関数commonPaddingLeft：1文字ではないです。${char}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        return (char.repeat(size) + str).substr(-1 * size)
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 右パディングする関数です。
 * @param {String} str 数値
 * @param {Number} size 桁数
 * @param {String} char パディング文字
 * @return {String} パディングされた文字列
 */
function commonPaddingRight(str, size = 1, char = ' ') {
    try {
        if (char.length !== 1) {
            let message = `共通関数commonPaddingRight：1文字ではないです。${char}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        return (str + char.repeat(size)).substr(0, size)
    } catch (err) {
        // 再スロー
        throw err
    }
}

/**
 * 引数のcsv文字列をCSVでダウンロードする関数です。
 * @param {String} csvStr csv文字列
 * @param {String} title ファイル名
 */
function commonDownloadCsv(csvStr, title = 'test') {

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
function commonConvert2DToCsv(d2array) {
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
    // 改行の代わり
    let replaceStr = "xxxxxxxxx====xxxxxxxxx====xxxxxxxxxxx"
    // 説明項目の語尾の改行の置換
    while (csvData.includes('\n",')) {
        csvData = csvData.replace('\n",', '",' + replaceStr)
    }

    let lines = csvData.replace(csvOutput, '').split(/\n/)
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
    return newLines.map(v => v.split(",").map(v => v.replaceAll(replaceStr, "\n")))
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
 * 配列をマルチセレクト登録用文字列に変換する
 * @param {Array} arr 配列
 *
 * @return {String} マルチセレクト登録用文字列
 * 例. ["ABC", 230, "X"]  ⇒ '["ABC", 230, "X"]'
 */
function commonConvertArrToMul(arr) {
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
 * @param {Array} arr1          2次元配列
 * @param {Array} arr2          2次元配列
 * @param {Number} init         初期値
 * @param {Number} arr1KeyIndex arr1の比較列
 * @param {Number} arr2KeyIndex arr2の比較列
 *
 * @return {Array} 2次元配列
 *
 * 例. arr1 = [["T3B-12",5413,1879],    arr2 = [["SC133S","SC133L","2",true],      init = ""
 *             ["TD-150",2858,8520],            ["SC144S","SC144L","2",true],
 *             ["SC144S",2900,9696],            ["SC147S","SC147L","20",false]]
 *             ["SC147S",1476,9144]]
 *     　　　　                           ⇓
 *            [["T3B-12",5413,1879,"","","",""],
 *             ["TD-150",2858,8520,"","","",""],
 *     　　　　 ["SC144S",2900,9696,"SC144S","SC144L","2",true],
 *     　　　　 ["SC147S",1476,9144,"SC147S","SC147L","20",false]]
 */

function commonJoinLeft(arr1, arr2, init = 0, arr1KeyIndex = 0, arr2KeyIndex = 0) {
    let size = arr2[0].length
    return arr1.map(v => {
        let tmpArr = arr2.find(w => v[arr1KeyIndex] == w[arr2KeyIndex])
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
function commonAddColumn(d2array, n, init = 0) {
    let m = d2array.length
    let arr = commonGenerate2DArray(m, n, init)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!commonIsNull(d2array[i][j])) arr[i][j] = d2array[i][j]
        }
    }
    return arr
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
        let area = commonGetId(label)
        let field = commonGetId(label, true, true)
        if (commonIsNull(area)) {
            let message = `共通関数commonChangeReadOnly：ラベル不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)

        } else {
            // 入力項目disable制御
            document.getElementById(area).disabled = disabled
            // document.getElementById(area).className = disabled ? "control-text" : "control-textbox"
            // document.getElementById(area).classList.toggle("original-style-disabled")
            if (disabled) {
                document.getElementById(area).classList.add("original-style-disabled")
            } else {
                document.getElementById(area).classList.remove("original-style-disabled")
            }

            // icon 表示制御
            let icons = ['ui-icon-clock', 'ui-icon-person', 'ui-icon-pencil', 'ui-icon-image', 'ui-icon-video']
            for (let icon of icons) {
                let target = document.getElementById(field).querySelector('.' + icon)
                if (!commonIsNull(target)) {
                    target.style['visibility'] = disabled ? 'hidden' : 'visible'
                }
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
            $p.set($p.getControl(label), value)
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
 * @param {Object}    filters フィルター条件
 * @param {Object}    sorts ソート条件
 * @param {Boolean}    valueFlg value値
 * @param {Function}  addFunc 最後に実行したい関数
 */
async function commonGetData(id = $p.siteId(), columns = [], filters = {}, sorts = { "ResultId": "asc" }, valueFlg = true, addFunc) {
    let offset = 0
    let data = []
    let temp = {}
    do {
        temp = await commonGetInnner(columns, filters, sorts, valueFlg, id, offset, addFunc)
        data = [...data, ...temp.Response.Data]
        offset += temp.Response.PageSize
    } while (offset < temp.Response.TotalCount)
    return data

    /**
     * 取得APIを呼び出す関数内関数です。(TotalCount 200)
     *
     * @param {Array}     columns 取得列
     * @param {Object}    filters フィルター条件
     * @param {Object}    sorts ソート条件
     * @param {Boolean}   valueFlg value値
     * @param {Number}    id テーブルID
     * @param {Number}    offset オフセット条件
     * @param {Function}  addFunc 最後に実行したい関数
     */
    async function commonGetInnner(columns = [], filters = {}, sorts = { "ResultId": "asc" }, valueFlg = true, id = $p.siteId(), offset = 0, addFunc) {
        return await $p.apiGet({
            'id': id,
            'data': {
                'Offset': offset,
                'View': {
                    'ApiDataType': "KeyValues",
                    'ApiColumnValueDisplayType': valueFlg ? "Value" : "DisplayValue",
                    'GridColumns': columns,
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
async function commonExport(tableId, columns = [], filters = {}, over = false, header = true, type = "csv", addFunc) {
    let col = []
    columns.forEach(v => col.push({ "ColumnName": v }))
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
async function commonExportUser(userIds, addFunc) {
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
        "ApiVersion": api_version,
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
            let clsKey = "Class" + commonPaddingLeft(i, 3)
            let numKey = "Num" + commonPaddingLeft(i, 3)
            let datKey = "Date" + commonPaddingLeft(i, 3)
            let dscKey = "Description" + commonPaddingLeft(i, 3)
            let chkKey = "Check" + commonPaddingLeft(i, 3)
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
            let clsKey = "Class" + commonPaddingLeft(i, 3)
            let numKey = "Num" + commonPaddingLeft(i, 3)
            let datKey = "Date" + commonPaddingLeft(i, 3)
            let dscKey = "Description" + commonPaddingLeft(i, 3)
            let chkKey = "Check" + commonPaddingLeft(i, 3)
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
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
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
        "ApiVersion": api_version,
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
            let index = commonPaddingLeft(startPlace + i * column + j, 3)
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