$p.events.on_editor_load_arr.push(async function () {
    displayBatReslt();
})


//処理結果テーブルの取得
async function getResult(){
    let result = [];
    await $p.apiGet({
        id:TABLE_RESULT,
        data:{
            ApiVersion:1.0,
            View:{
                ColumnFilterHash:{
                    ClassA:$('#Results_ClassB').html()
                },
                ColumnSorterHash:{
                    DateA:'desc'
                }
            }
        },
        done: function(data){
            result = data.Response.Data
        },
        fail: function(data){
            console.log(data);
            result = false
        },
        always: function(data){
        }
    })
    return result
}


async function getInstruct(){
    let result = [];
    await $p.apiGet({
        id: TABLE_INSTRUCT,
        data:{
            ApiVersion:1.0,
            View:{
                ColumnFilterHash:{
                    Status: "[900,901]",
                    ClassB:$('#Results_ClassB').html()
                },
            }
        },
        done: function(data){
            result = data.Response.Data
        },
        fail: function(data){
            console.log(data);
            result = false
        },
        always: function(data){
        }
    })
    return result
}

//エラーレコードの取得
async function getError(){
    let result = [];
    await $p.apiGet({
        id:TABLE_ERROR,
        data:{
            ApiVersion:1.0,
            View:{
                ColumnFilterHash:{
                    ClassA:$p.getControl('ClassB').val(),
                },
                ColumnSorterHash:{
                    DateA:'desc',
                    ClassD:'asc'
                }
            }
        },
        done: function(data){
            result = data.Response.Data
        },
        fail: function(data){
            console.log(data);
            result = false
        },
        always: function(data){
        }
    })
    return result
}

//デフォルトでチェックがはいるかのマスタの取得
async function getCheckM(){
    let result = [];
    await $p.apiGet({
        id:TABLE_MAIL_TYPE ,
        data:{
            ApiVersion:1.0,
            View:{
                ColumnFilterHash:{
                    CheckA:true,
                },
            }
        },
        done: function(data){
            result = data.Response.Data
        },
        fail: function(data){
            console.log(data);
            result = false
        },
        always: function(data){
        }
    })
    return result
}

//投げ分け明細から絞込用種別の取得
async function getThrowOpe (){
    let result = [];
    await $p.apiGet({
        id:TABLE_THROW_OPE ,
        data:{
            ApiVersion:1.0,
            View:{
                ColumnFilterHash:{
                    ClassG:$p.getControl('ClassB').val(),
                },
            }
        },
        done: function(data){
            result = data.Response.Data.map((obj)=>obj.ClassZ)
        },
        fail: function(data){
            console.log(data);
            result = false
        },
        always: function(data){
        }
    })
    return result
}

//日付成型関数
function modalDate(d){
    if(d == '1899-12-30T00:00:00'){
        return ''
    }
    let day = new Date(d)
    return day.getFullYear() + '/' + ( day.getMonth() + 1 ).toString().padStart(2, "0") + '/' + day.getDate().toString().padStart(2, "0") + ' ' + day.getHours().toString().padStart(2, "0") + ':' + day.getMinutes().toString().padStart(2, "0") + ':' + day.getSeconds().toString().padStart(2, "0")
}

//チェックをするべきか判定する関数
function IsCheck(self,arr,set){
    let last = arr.filter((obj)=> obj.ClassB == self.ClassB && obj.DateA !== self.DateA)
    if(last.length> 0){
        return last[0].Status == 900 ? 'checked' : ''
    }else{
        return set.has(self.ClassB) ? 'checked' : ''
    }

}

async function displayBatReslt(){

    let instructData = await getInstruct();
    let instructId = instructData.length>0 ? instructData[0]["ResultId"] : 0
    let resultData = await getResult();
    let bodyH = resultData.length>0 ? resultData.map(function(obj) {
        let statusp = '<p class=""></p>';
        //処理結果のStatusHTMLの作成
        switch(obj.Status){
            case 100:
                statusp = '<p class="status-new">開始</p>';
                break;
            case 200:
                statusp = '<p class="status-inprogress">処理中</p>';
                break;
            case 900:
                statusp = '<p class="status-closed">正常</p>';
                break;
            case 999:
                statusp = '<p class="status-rejected">エラー</p>';
                break;
        }
        return `
        <tr class="sdt-row">
            <td class="sdt-center">${modalDate(obj.DateA)}</td>
            <td class="sdt-center">${modalDate(obj.DateB)}</td>
            <td class="sdt-center row-id">${obj.ClassD}</td>
            <td class="sdt-center">${obj.ClassE}</td>
            <td class="sdt-center">${statusp}</td>
        </tr>
        `
    }).join('') :'<tr class="sdt-row"><td class="sdt-center" colspan="5">処理は実施されていません。</td></tr>'
    //処理の履歴一覧
    let textH = `
    <table class="grid sdt-table">
        <thead>
            <tr class="ui-widget-header">
                <th class="sdt-center">処理開始時間</th>
                <th class="sdt-center">処理終了時間</th>
                <th class="sdt-center">処理ID</th>
                <th class="sdt-center">処理名</th>
                <th class="sdt-center">処理結果</th>
            </tr>
        </thead>
            ${bodyH}
        <tbody>
        </tbody>
    </table>
    `
    let textB = `
    <div class="sdt-buttonContainer">
        <button class="button button-icon ui-button ui-corner-all ui-widget applied sdt-recapturebutton" onclick="continueProcess(200, ${instructId})">
            <span class="ui-button-icon ui-icon ui-icon-arrowrefresh-1-s"></span>
            <span class="ui-button-icon-space"> </span>
            再取込（最初から）
        </button>
    <div>
    `
    $('#SectionFields7').html('')
    $('#SectionFields7').append(textH)
    if(["50", "100", "200", "300", "400"].includes($p.getControl('Status').val())){
        $('#SectionFields7').append(textB)
    }


    //最新の処理結果
    let maxDate = modalDate(Math.max(...resultData.map((obj) => new Date(obj.DateA).getTime())))
    let master = await getCheckM();
    let throwOpe = await getThrowOpe();
    let checkSet = new Set(master.filter((item) =>throwOpe.includes(item.ClassA)).map((obj) => obj.ClassB)) //デフォルトで✓するエラーIDのリスト
    let body = ''
    let errorData = await getError();
    if(resultData && master && throwOpe){
        resultData = resultData.filter((item)=> modalDate(item.DateA) == maxDate) //最新日の処理を取得
        if(resultData.length > 0){
            //処理が1件以上
            for(i=0;i<resultData.length;i++){
                let item = resultData[i]
                switch(item.Status){
                    case 100 : //開始
                        body = body + `
                            <tr class="sdt-row">
                                <td class="sdt-center">${modalDate(item.DateA)}</td>
                                <td class="sdt-center">${item.ClassE}</td>
                                <td colspan="4" class="sdt-center">処理を開始しました。時間をおいて再度確認してください。</td>
                            </tr>`
                        break;

                    case 200 : //処理中
                        body = body + `
                            <tr class="sdt-row">
                                <td class="sdt-center">${modalDate(item.DateA)}</td>
                                <td class="sdt-center">${item.ClassE}</td>
                                <td colspan="4" class="sdt-center">エラー確認中です。時間をおいて再度確認してください。</td>
                            </tr>`
                        break;

                    case 900 : //正常
                        body = body + `
                            <tr class="sdt-row">
                                <td class="sdt-center">${modalDate(item.DateA)}</td>
                                <td class="sdt-center">${item.ClassE}</td>
                                <td colspan="4" class="sdt-center">正常</td>
                            </tr>`
                        break;

                    case 999 : //エラー
                        errorData = errorData.filter((obj)=> modalDate(obj.DateA) == maxDate)
                        body = body + errorData.map((obj,i) => {
                            let head = i == 0 ? `
                                <td class="sdt-center" rowspan="${errorData.length}">${modalDate(item.DateA)}</td>
                                <td class="sdt-center" rowspan="${errorData.length}">${item.ClassE}</td>
                                ` : ''
                            let errContent = ''
                            switch(obj.Status){
                                case 200 : //確認前
                                    errContent = `
                                        <td id="errId_${obj.ResultId}" class="sdt-center row-id ${obj.ClassB[0]}">${obj.ClassB}</td>
                                        <td id="err_${obj.ResultId}">${obj.ClassC}</td>
                                        <td class="sdt-center"><p class="status-inprogress">確認中</p></td>
                                        <td class="sdt-center">
                                            <input type="checkbox" class="sdt-YN" id="mail_${obj.ResultId}" ${IsCheck(obj,errorData,checkSet)}>
                                            <label for="mail_${obj.ResultId}"></label>
                                        </td>
                                    `;
                                    break;

                                case 900 : //確認済み
                                    errContent = `
                                        <td id="errId_${obj.ResultId}" class="sdt-center row-id ${obj.ClassB[0]}">${obj.ClassB}</td>
                                        <td id="err_${obj.ResultId}">${obj.ClassC}</td>
                                        <td class="sdt-center"><p class="status-closed">確認済</p></td>
                                        <td class="sdt-center">
                                            <label class="sdt-closed""></label>
                                        </td>
                                    `;
                                    break;

                                case 950 : //加工へ
                                    errContent = `
                                        <td id="errId_${obj.ResultId}" class="sdt-center row-id ${obj.ClassB[0]}">${obj.ClassB}</td>
                                        <td id="err_${obj.ResultId}">${obj.ClassC}</td>
                                        <td class="sdt-center"><p class="status-rejected">加工へ</p></td>
                                        <td class="sdt-center">
                                            <label class="sdt-rejected"></label>
                                        </td>
                                    `;
                                    break;

                                default:
                                    //何もしない
                            }
                            return `<tr class="sdt-row">${head}${errContent}
                                </tr>`
                            }).join('')
                        break;
                    default:
                        //何もしない
                }
            }
        }else{
            //未処理
            body = body + '<tr class="sdt-row"><td colspan="6" class="sdt-center">処理は実施されていません。</td></tr>'
        }
    }else{
        alert('レコードの読み込みが出きませんでした。リロードしなおしてください。')
        return false
    }
    let text = `
    <table class="grid sdt-table">
        <thead>
            <tr class="ui-widget-header">
                <th class="sdt-center">処理開始時間</th>
                <th class="sdt-center">処理内容</th>
                <th class="sdt-center">エラーID</th>
                <th class="sdt-center">エラー内容</th>
                <th class="sdt-center">状況</th>
                <th class="sdt-center">送信</th>
            </tr>
        </thead>
            ${body}
        <tbody>
        </tbody>
    </table>
    `
    $('#SectionFields8').html('')
    $('#SectionFields8').append(text)


    let btntxt = `
    <div class="sdt-buttonContainer">
        <button class="button button-icon ui-button ui-corner-all ui-widget applied sdt-continuebutton" onclick="continueProcess(300, ${instructId})">
            <span class="ui-button-icon ui-icon ui-icon-check"></span>
            <span class="ui-button-icon-space"> </span>
            再加工（指示画面から）
        </button>
        <button class="button button-icon ui-button ui-corner-all ui-widget applied sdt-importbutton" onclick="continueProcess(400, ${instructId})">
            <span class="ui-button-icon ui-icon ui-icon-note"></span>
            <span class="ui-button-icon-space"> </span>
            不備重複取込
        </button>
        <button class="button button-icon ui-button ui-corner-all ui-widget applied sdt-mailbutton" onclick="sendCusutomMail()">
            <span class="ui-button-icon ui-icon ui-icon-mail-closed"></span>
            <span class="ui-button-icon-space"> </span>
            メール送信
        </button>
    </div>
`
    //ステータスが300のとき表示
    if($p.getControl('Status').val() == 300){
        $('#SectionFields8').append(btntxt)
    }
}
