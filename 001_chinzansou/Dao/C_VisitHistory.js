
console.log('来店履歴 : ' + SITE_URL + visitHistoryDBId + '/index')

async function createVisitHistory(ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, public = false, addFunc) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + visitHistoryDBId + '/create',
            'method': 'POST',
            'timeout': 0,
            'headers': {
                'Content-Type': 'application/json'
            },
            'data': JSON.stringify({
                'ApiKey': API_KEY,
                ClassHash,
                NumHash,
                DateHash,
                DescriptionHash,
                CheckHash
            })
        }
        $.ajax(settings).done(function (response) {
            console.log(response)
            if (addFunc && typeof addFunc === 'function') {
                // 渡されたオブジェクトが関数なら実行する
                addFunc()
            }
        })
    } else {
        $p.apiCreate({
            'id': visitHistoryDBId,
            'data': Object.assign(
                ClassHash,
                NumHash,
                DateHash,
                DescriptionHash,
                CheckHash
            ),
            'done': function (data) {
                console.log(data)
                if (addFunc && typeof addFunc === 'function') {
                    // 渡されたオブジェクトが関数なら実行する
                    addFunc()
                }
            },
            'fail': function (data) {
                alert(visitHistoryDBId + '登録に失敗しました。')
                console.log(data)
            },
            'always': function (data) {
            },
        });
    }
}
