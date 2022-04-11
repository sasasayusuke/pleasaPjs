
var iconData = []
let iconDBId = 5855
console.log('アイコンマスタ : ' + SITE_URL + iconDBId + '/index')

async function readIconMaster (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + iconDBId + '/get',
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
            iconData = response.Response.Data
            console.log(iconData)
        })
    } else {
        $p.apiGet({
            'id': iconDBId,
            'done': function (data) {
                iconData = data.Response.Data
                console.log(iconData)
            },
            'fail': function (data) {
				alert(iconDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}