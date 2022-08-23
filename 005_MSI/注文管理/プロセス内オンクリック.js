

// 検収済み ⇒ 出荷済み 差し戻し
function clickBackShipped (n) {
    let ans = window.confirm('出荷済みへ差し戻しますか？\n入力して頂いた入金予定日は消去されます。')
    if (ans) {
        commonChangeReadOnly('入金予定日', false)
        commonSetVal('入金予定日', "")
        $p.execProcess(n)
    }
}

// 完了 ⇒ 検収済み 差し戻し
function clickBackAccepted (n) {
    let ans = window.confirm('検収済みへ差し戻しますか？\n入力して頂いた入金完了日は消去されます。')
    if (ans) {
        commonChangeReadOnly('入金完了日', false)
        commonSetVal('入金完了日', "")
        $p.execProcess(n)
    }
}

// 納期再調整
function clickBackAdjustment (n) {
    let ans = window.confirm('納期再調整をしますか？\n入力して頂いた入荷日と出荷予定日は消去されます。')
    if (ans) {
        commonChangeReadOnly('入荷日', false)
        commonSetVal('入荷日', "")
        commonChangeReadOnly('出荷予定日', false)
        commonSetVal('出荷予定日', "")
        $p.execProcess(n)
    }
}

