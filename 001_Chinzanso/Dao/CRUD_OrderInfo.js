
var orderData = []
console.log('注文情報 : ' + SITE_URL + orderDBId + '/index')

async function readOrderInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + orderDBId + '/get',
            'method': 'POST',
            'timeout': 0,
            'headers': {
                'Content-Type': 'application/json'
            },
            'data': JSON.stringify({
                'ApiKey': API_KEY
            }),
        }
        $.ajax(settings).done(function (response) {
            orderData = response.Response.Data
            console.log(orderData)
        })
    } else {
        $p.apiGet({
            'id': orderDBId,
            'done': function (data) {
                orderData = data.Response.Data
                console.log(orderData)
                return true
            },
            'fail': function (data) {
				alert(orderDBId + 'との通信が失敗しました。')
                throw new Error("e");
            },
            'always': function (data) {
            }
        })
    }

}


async function createOrderInfo (ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash, public = false, addFunc) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + orderDBId + '/create',
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
            'id': orderDBId,
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
                alert(orderDBId + '登録に失敗しました。')
                console.log(data)
            },
            'always': function (data) {
            },
        })
    }
}

async function updateOrderInfo (updateId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, public = false, addFunc) {
    if (public) {

    } else {
        $p.apiUpdate({
            'id': updateId,
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
                alert(orderDBId + '更新に失敗しました。')
                console.log(data)
            },
            'always': function (data) {
            },
        })
    }
}

