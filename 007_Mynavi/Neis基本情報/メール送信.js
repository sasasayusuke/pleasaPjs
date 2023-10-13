
async function sendCusutomMail(){
    let arrCheckedId = $('input[type="checkbox"].sdt-YN:checked').get().map(function(obj){
            let id = obj.id.toString().replace('mail_','')
            return $('#errId_' + id).text() + '：' + $('#err_' + id).text()
        })
    if(arrCheckedId.length == 0){
        $p.clearMessage();
        $p.setMessage('#Message', JSON.stringify({
            Css: 'alert-error',
            Text: '送信する項目を選択してください。'
        }));
        return true
    }

    let to;
    if ($p.getControl('Class077').val() == "就職") {
        to = $p.getControl('Class075').val() + "," + MAIL_JOB_SEARCH;
    } else {
        to = $p.getControl('Class075').val() + "," + $p.getControl('Class074').val();
    }

    let cc;
    if ($p.getControl('Class042').val() == "1") {
        cc = MAIL_IM + "," + MAIL_DATA_CONTACT;
    } else {
        cc = MAIL_IM;
    }

    let mailBody =`${$p.getControl('Class038').val()} 様

[レコード番号]:${$('#Results_ClassB').html()}
[企業名]:${$p.getControl('Class027').val()}
[作業明細タイトル]:${$p.getControl('Class007').val()}

問題が見つかりました。
チェック結果を確認し、修正してください。。

[チェック結果と対処方法]:
${arrCheckedId.join('\n')}

以上
`
    await $p.apiCreate({
        id: TABLE_NOTIFICATION_LOG,
        data: {
            ClassHash: {
                ClassB: 'MDUS個別通知エラーメール',
                ClassC: to,
                ClassD: cc,
                ClassG: 100,
            },
            Body: mailBody,
        },
        always:function(data){
            $p.clearMessage();
            if(data.Message){
                $p.setMessage('#Message', JSON.stringify({
                    Css: 'alert-success',
                    Text: data.Message
                }));
            }else{
                $p.setMessage('#Message', JSON.stringify({
                    Css: 'alert-error',
                    Text: JSON.parse(data.responseJSON[1].Value).Text
                }));
            }
        }
    })
    //データを更新
    let count = 0;
    let arrId = $('input[type="checkbox"].sdt-YN').get().map((obj)=> ({'check' : obj.checked, 'id' : obj.id.toString().replace('mail_','')}))
    for(item of arrId){
        $p.apiUpdate({
            id: item.id,
            data: {
                ApiVersion: 1.0,
                Status:item.check ? 900 : 950,
            },
            done: function (data) {
                console.log(data);
            },
            fail: function (data) {
                alert('データの更新に失敗しました。やり直してください。')
            },
            always: function (data) {
                console.log(data);
                count++;
                if(count == arrId.length){
                    displayBatReslt();
                }
            }
        });
    }
}

function continueProcess(reprocessingStatus, instructId) {

    let errorIds = []
    let table = document.querySelector('#SectionFields8 .grid.sdt-table')
    let rows = table.querySelectorAll(".sdt-center.row-id")
    // 最新の処理結果の各行について
    for (let i = 0; i < rows.length; i++) {
        // エラーIDがEから始まるもの
        if (rows[i].textContent.startsWith('E')) {
            // 配列にエラーIDを追加
            errorIds.push(rows[i].textContent)
        }
    }

    let clearFlg = false
    let alertMessage = `データの修正が必要なエラー ${errorIds.join(" ")}
が出ているため、再取り込みを行うか、サポートへ連絡をしてください。`
    let confirmMessage1 = `再処理を「再取込（最初から）」に更新します。
よろしいでしょうか？` 
    let confirmMessage2 = `不備重複は取り込まず、再加工を行います。
再処理を「再加工（指示画面から）」に更新します。
よろしいでしょうか？`
    let confirmMessage3 = `命名規則に従って変更された不備重複ファイルのyyyymmddが最新のものを取り込みます。
再処理を「不備重複取込」に更新します。
よろしいでしょうか？`
    let userResponse

    if (reprocessingStatus == 200) {
        clearFlg = true
        userResponse = confirm(confirmMessage1)

    } else if (reprocessingStatus == 300) {
        if (errorIds.length > 0) {
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-error',
                Text: alertMessage
            }));
    
            return
        }

        userResponse = confirm(confirmMessage2)

    } else if (reprocessingStatus == 400) {
        if (errorIds.length > 0) {
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-error',
                Text: alertMessage
            }));
            return
        }

        userResponse = confirm(confirmMessage3)

    } else {
        $p.setMessage('#Message', JSON.stringify({
            Css: 'alert-error',
            Text: "システムエラーです。サポートにお問い合わせください。"
        }));
        return
    }


    if (userResponse) {
        selfUpdate(100, reprocessingStatus, instructId, clearFlg)
    }
}

function selfUpdate(status, reprocessingStatus, instructId, clearFlg = false){
    let updateData = {
        ApiVersion: 1.0,
        Status: status,
        Class084: reprocessingStatus,
    }

    if (clearFlg) {
        updateData["Class091"] = ""
    }
    $p.apiUpdate({
        id: $p.id(),
        data: updateData,
        done: function (data) {
            console.log(data);
        },
        fail: function (data) {
            $p.setMessage('#Message', JSON.stringify({
                Css: 'alert-error',
                Text: 'データの更新に失敗しました。やり直してください。'
            }));

        },
        always: function (data) {
            console.log(data);
        }
    });

    if (reprocessingStatus == 200) { 
        $p.setMessage('#Message', JSON.stringify({
            Css: 'alert-success',
            Text: "データ更新が完了しました。画面をリフレッシュしてください。"
        }));

    } else if (instructId > 0) {
        updateData = {
            ApiVersion: 1.0,
            Status: 900,
        }
    
        $p.apiUpdate({
            id: instructId,
            data: updateData,
            done: function (data) {
                console.log(data);
            },
            fail: function (data) {
                $p.setMessage('#Message', JSON.stringify({
                    Css: 'alert-error',
                    Text: 'データの更新に失敗しました。やり直してください。'
                }));
    
            },
            always: function (data) {
                console.log(data);
            }
        });    

        $p.setMessage('#Message', JSON.stringify({
            Css: 'alert-success',
            Text: "データ更新が完了しました。画面をリフレッシュしてください。"
        }));

    } else {
        $p.setMessage('#Message', JSON.stringify({
            Css: 'alert-warning',
            Text: "データ更新が完了しました。指示が作成されていないので、指示の作成をお願いします。"
        }));

    }

}