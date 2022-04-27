function processCheck(n) {
    console.log(n)
    // RPA実行ステータス確認
    $p.apiGet({
        'id': TABLE_ID_RPA_STATUS,
        'done': function (data) {
            console.log(data.Response.Data[0])
            if (data.Response.Data.filter(v => v["ClassA"] === "SMILE連携")[0]["CheckA"]) {
                // RPA実行中の場合はエラーメッセージ表示
                utilSetMessage("RPA実行中のため更新できません。", WARNING)
            } else {
                // RPA実行中でない場合はプロセス機能実行
                $p.execProcess(n);
            }
        },
        'fail': function (data) {
            console.log('通信が失敗しました。');
        },
        'always': function (data) {
            console.log('通信が完了しました。');
        }
    });
}