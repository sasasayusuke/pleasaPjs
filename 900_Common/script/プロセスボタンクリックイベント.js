
$p.events.before_send_Update_arr.push(function (e) {
    let today = commonGetDate(new Date())
    let controlId = e.data.ControlId
    tickets = commonGetVal("使用チケット", true)
    // 対応開始ボタン押下
    if (controlId == "Process_1") {

        // チケットが未使用であることを確認
        //let unusedTickets = await commonGetData(TABLE_INFO["購入チケット"], "IssueId",{"Status": 100})
        //if (!commonContainArray(unusedTickets, tickets)) {
        //    $p.events.validate_message = "未使用ではないチケットが含まれているので、画面を更新してください。"
        //    return false
        //}

        // チケット使用
        for (let tid of tickets) {
            commonUpdate(
                tid,
                {
                    [commonGetColumnName("購入チケット", "チケット対応開始日")]: today
                },
                200,
                `${commonGetVal("ID")} ${commonGetVal("タイトル")} に対してチケット使用`
            )
        }
    } else if (controlId == "Process_3") {
        // チケット完了
        for (let tid of tickets) {
            commonUpdate(
                tid,
                {
                    [commonGetColumnName("購入チケット", "チケット対応完了日")]: today
                },
                900,
                `${commonGetVal("ID")} ${commonGetVal("タイトル")} に対してチケット完了`

            )
        }
    } else if (controlId == "Process_4") {
        // チケットの戻し
        for (let tid of tickets) {
            commonUpdate(
                tid,
                {
                    [commonGetColumnName("購入チケット", "チケット対応開始日")]: commonGetDateEmpty(),
                    [commonGetColumnName("購入チケット", "チケット対応完了日")]: commonGetDateEmpty(),
                },
                100,
                `${commonGetVal("ID")} ${commonGetVal("タイトル")} に対してチケット差し戻し`

            )
        }
    }
    return true
})