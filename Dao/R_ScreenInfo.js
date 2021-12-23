
var screenData = []
console.log('画面情報 : ' + SITE_URL + screenDBId + '/index')

function readScreenInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + screenDBId + '/get',
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
            screenData = response.Response.Data
            console.log(screenData)
        })
    } else {
        $p.apiGet({
            'id': screenDBId,
            'done': function (data) {
                screenData = data.Response.Data
                console.log(screenData)
            },
            'fail': function (data) {
				alert(screenDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}