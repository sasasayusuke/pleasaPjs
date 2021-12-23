
var messageData = []
let messageDBId = 5856
console.log('メッセージマスタ : ' + SITE_URL + messageDBId + '/index')

async function readMessageMaster (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + messageDBId + '/get',
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
            messageData = response.Response.Data
            console.log(messageData)
        })
    } else {
        $p.apiGet({
            'id': messageDBId,
            'done': function (data) {
                messageData = data.Response.Data
                console.log(messageData)
            },
            'fail': function (data) {
				alert(messageDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}