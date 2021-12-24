
var sheetData = []
console.log('店舗席情報 : ' + SITE_URL + sheetDBId + '/index')

async function readSheetInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + sheetDBId + '/get',
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
            sheetData = response.Response.Data
            console.log(sheetData)
            return true
        })
    } else {
        $p.apiGet({
            'id': sheetDBId,
            'done': function (data) {
                sheetData = data.Response.Data
                console.log(sheetData)
                return true
            },
            'fail': function (data) {
				alert(sheetDBId + 'との通信が失敗しました。')
                console.log(data)
                throw new Error("e");
            },
            'always': function (data) {
            }
        })
    }

}

async function updateSheetInfo(updateId, ClassHash = {}, NumHash= {}, DateHash= {}, DescriptionHash= {}, CheckHash = {}, public = false, addFunc) {
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
                alert(sheetDBId + '更新に失敗しました。')
                console.log(data)
            },
            'always': function (data) {
            },
        })
    }
}

