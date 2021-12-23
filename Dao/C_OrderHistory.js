
console.log('注文履歴 : ' + SITE_URL + orderHistoryDBId + '/index')

async function createOrderHistory(ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, public = false, addFunc) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + orderHistoryDBId + '/create',
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
            'id': orderHistoryDBId,
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
                alert(orderHistoryDBId + '登録に失敗しました。')
                console.log(data)
            },
            'always': function (data) {
            },
        })
    }
}
