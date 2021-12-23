
var roomServiceAlacartData = []
console.log('ルームサービスアラカルト情報 : ' + SITE_URL + roomServiceAlacartDBId + '/index')

async function readRoomServiceAlacartInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + roomServiceAlacartDBId + '/get',
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
            roomServiceAlacartData = response.Response.Data
            console.log(roomServiceAlacartData)
        })
    } else {
        $p.apiGet({
            'id': roomServiceAlacartDBId,
            'done': function (data) {
                roomServiceAlacartData = data.Response.Data
                console.log(roomServiceAlacartData)
            },
            'fail': function (data) {
				alert(roomServiceAlacartDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}