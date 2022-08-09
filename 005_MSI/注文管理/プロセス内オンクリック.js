
// 注文書受領ボタン押下
function clickReceipt (n) {
    $p.execProcess(n)
}

function clickBackAnnounce (n) {
    $p.execProcess(n)
}

// 入荷確定押下処理
function clickConfirmedArrival (n) {
    $p.execProcess(n)
}
// 出荷確定押下処理
function clickConfirmedDelivery (n) {
    $p.execProcess(n)
}

// 検収押下処理
function clickAccepted (n) {
    $p.execProcess(n)
}

// 入金確認押下処理
function clickClosed (n) {
    $p.execProcess(n)
}
function clickBackAdjustment (n) {
    let ans = window.confirm('前倒し調整を依頼しますか？')
    if (ans) {
        commonChangeReadOnly('入荷日', false)
        commonSetVal('入荷日', "")
        commonChangeReadOnly('出荷予定日', false)
        commonSetVal('出荷予定日', "")
        $p.execProcess(n)
    }
}

