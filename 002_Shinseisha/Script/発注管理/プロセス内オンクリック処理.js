
// メーカー発注押下処理
function clickOrderMaker (n) {
    multipleLotCheck(
        $(this)
        , function() {
            utilChangeReadOnly('適用区分', false)
            utilChangeReadOnly('発注確認者', false)
            utilChangeReadOnly('発注確認日', false)
            $p.set($p.getControl('適用区分'), WIKI_TEKIYOU_KB.order.index)
            $p.set($p.getControl('発注確認者'), $p.userId())
            $p.set($p.getControl('発注確認日'), utilGetDate())
            $p.execProcess(n)
        }
    )
}

// 倉庫間移動押下処理
function clickMoveWarehouses (n) {
    utilChangeReadOnly('適用区分', false)
    utilChangeReadOnly('倉庫移動指示者', false)
    utilChangeReadOnly('倉庫移動指示日', false)
    $p.set($p.getControl('適用区分'), WIKI_TEKIYOU_KB.move.index)
    $p.set($p.getControl('倉庫移動指示者'), $p.userId())
    $p.set($p.getControl('倉庫移動指示日'), utilGetDate())
    $p.execProcess(n)
}

// 出荷承認押下処理
function clickShipped (n) {
    utilChangeReadOnly('倉庫移動出荷承認者', false)
    utilChangeReadOnly('倉庫移動出荷承認日', false)
    $p.set($p.getControl('倉庫移動出荷承認者'), $p.userId())
    $p.set($p.getControl('倉庫移動出荷承認日'), utilGetDate())
    $p.execProcess(n)
}

// 補充押下処理
function clickFilled (n) {
    utilChangeReadOnly('倉庫移動補充担当者', false)
    utilChangeReadOnly('倉庫移動補充日', false)
    $p.set($p.getControl('倉庫移動補充担当者'), $p.userId())
    $p.set($p.getControl('倉庫移動補充日'), utilGetDate())
    $p.execProcess(n)
}

// 倉庫間移動 差し戻し処理
function clickBackMoveWarehouses (n) {
    utilChangeReadOnly('適用区分', false)
    utilChangeReadOnly('出庫倉庫', false)
    utilChangeReadOnly('倉庫移動指示者', false)
    utilChangeReadOnly('倉庫移動指示日', false)
    $p.set($p.getControl('適用区分'),'')
    $p.set($p.getControl('出庫倉庫'),'')
    $p.set($p.getControl('倉庫移動指示者'),'')
    $p.set($p.getControl('倉庫移動指示日'),'')
    $p.execProcess(n)
}

// メーカー発注 差し戻し処理
function clickBackOrderMaker (n) {
    processExclusiveCheck(
        $(this)
        , function() {
            utilChangeReadOnly('適用区分', false)
            utilChangeReadOnly('発注確認者', false)
            utilChangeReadOnly('発注確認日', false)
            $p.set($p.getControl('適用区分'),'')
            $p.set($p.getControl('発注確認者'),'')
            $p.set($p.getControl('発注確認日'),'')
            $p.execProcess(n)
        }
    )
}

// 出荷済 差し戻し処理
function clickBackShipped (n) {
    processExclusiveCheck(
        $(this)
        , function() {
            utilChangeReadOnly('倉庫移動出荷承認者', false)
            utilChangeReadOnly('倉庫移動出荷承認日', false)
            $p.set($p.getControl('倉庫移動出荷承認者'),'')
            $p.set($p.getControl('倉庫移動出荷承認日'),'')
            $p.execProcess(n)
        }
    )
}

// 補充済差し戻し処理
function clickBackFilled (n) {
    processExclusiveCheck(
        $(this)
        , function() {
            utilChangeReadOnly('倉庫移動補充担当者', false)
            utilChangeReadOnly('倉庫移動補充日', false)
            $p.set($p.getControl('倉庫移動補充担当者'),'')
            $p.set($p.getControl('倉庫移動補充日'),'')
            $p.execProcess(n)
        }
    )
}


// SMILE連携競合チェック
function processExclusiveCheck (n, afterFunc) {
    console.log(n)
    // RPA実行ステータス確認
    $p.apiGet({
        'id': PROCESS_ID_SMILE_RENKEI,
        'done': function (data) {
            if (data.Response.Data[0].CheckA) {
                // RPA実行中の場合はエラーメッセージ表示
                utilSetMessage("RPA実行中のため更新できません。", WARNING)
            } else {
                // RPA実行中でない場合はプロセス機能実行
                afterFunc(n)
            }
        },
        'fail': function (data) {
            console.log('通信が失敗しました。')
        },
        'always': function (data) {
            console.log('通信が完了しました。')
        }
    })
}

// ロットの倍数チェック
function multipleLotCheck (n, afterFunc) {
    console.log(n)
    // RPA実行ステータス確認
    $p.apiGet({
        'id': $(`[name=${utilGetId("商品ｺｰﾄﾞ")}]`).val(),
        'done': function (data) {
            let minimumLot = data.Response.Data[0].Num039
            let orderNumber = +utilGetControl("発注数量").split(",").join("")
            if ((orderNumber %  minimumLot) == 0) {
                // ロットの倍数の場合はプロセス機能実行
                afterFunc(n)
            } else {
                //  それ以外の場合はエラーメッセージ表示
                utilSetMessage(`発注数量を 最小ロット数：${minimumLot} の倍数にしてください。`, WARNING)
            }
        },
        'fail': function (data) {
            console.log('通信が失敗しました。')
        },
        'always': function (data) {
            console.log('通信が完了しました。')
        }
    })
}