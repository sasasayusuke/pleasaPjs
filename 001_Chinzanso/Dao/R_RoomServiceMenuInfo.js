
var roomServiceMenuData = []
console.log('ルームサービスメニュー情報 : ' + SITE_URL + roomServiceMenuDBId + '/index')

async function readRoomServiceMenuInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + roomServiceMenuDBId + '/get',
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
            roomServiceMenuData = response.Response.Data
            console.log(roomServiceMenuData)
        })
    } else {
        $p.apiGet({
            'id': roomServiceMenuDBId,
            'done': function (data) {
                roomServiceMenuData = data.Response.Data
                console.log(roomServiceMenuData)
            },
            'fail': function (data) {
				alert(roomServiceMenuDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}