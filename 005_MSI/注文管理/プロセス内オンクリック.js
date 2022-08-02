
// メーカー発注押下処理
function clickReceipt (n) {
    $p.execProcess(n)
}

// 倉庫間移動押下処理
function clickBackAnnounce (n) {
    $p.execProcess(n)
}

// 出荷承認押下処理
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
        commonChangeReadOnly('確定納期日', false)
        commonSetVal('確定納期日', "")
        $p.execProcess(n)
    }
}
