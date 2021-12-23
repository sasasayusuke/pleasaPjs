
var panfletData = []
console.log('パンフレット情報 : ' + SITE_URL + panfletDBId + '/index')

function readPanfletInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + panfletDBId + '/get',
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
            panfletData = response.Response.Data
            console.log(panfletData)
        })
    } else {
        $p.apiGet({
            'id': panfletDBId,
            'done': function (data) {
                panfletData = data.Response.Data
                console.log(panfletData)
            },
            'fail': function (data) {
				alert(panfletDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}