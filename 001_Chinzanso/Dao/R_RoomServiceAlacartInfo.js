

console.log('ルームサービスアラカルト情報 : ' + SITE_URL + roomServiceAlacartDBId + '/index')
var roomServiceAlacartData = []
var roomServiceAlacartColumn = {
    Title:  'アラカルト名',
    ClassA: 'アラカルト分類',
    ClassB: 'ルームサービスメニュー情報',
    Body:   '写真',
    DescriptionA:   '説明',
    ClassC: '量、サイズ',
    NumA:   '通常値段',
    NumB:   '通常値段２',
    NumC:   '通常値段３',
    NumD:   '特別値段',
    NumE:   '特別値段２',
    NumF:   '特別値段３',
    ClassD: 'メインオプション',
    NumG:   '追加料金',
    NumH:   '追加料金２',
    NumI:   '追加料金３',
    ClassE: 'ドリンクオプション',
    NumJ:   '追加料金',
    NumK:   '追加料金２',
    NumL:   '追加料金３',
    ClassF: 'ブレッドオプション',
    NumM:   '追加料金',
    NumN:   '追加料金２',
    NumO:   '追加料金３',
    ClassG: 'トッピングオプション',
    NumP:   '追加料金',
    NumQ:   '追加料金２',
    NumR:   '追加料金３',
    ClassH: 'チーズオプション',
    NumS:   '追加料金',
    NumT:   '追加料金２',
    NumU:   '追加料金３',
    ClassI: 'ドレッシングオプション',
    NumV:   '追加料金',
    NumW:   '追加料金２',
    NumX:   '追加料金３',
    ClassJ: 'アフタードリンクオプション',
    NumY:   '追加料金',
    NumZ:   '追加料金２',
    Num001: '追加料金３',
    CompletionTime: '有効期限',
    CheckA: '無効化',
    CheckB: '特別値段有効化',
}

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