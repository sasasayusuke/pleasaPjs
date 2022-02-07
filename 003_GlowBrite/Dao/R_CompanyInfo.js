

console.log('事業者情報 : ' + SITE_URL + companyDBId + '/index')
var companyData = []
var companyColumn = {
	companyId: {
		value: 'ResultId',
		name: 'ID',
	},
	companyName: {
		value: 'Title',
		name: '事業者名',
	},
	status: {
		value: 'ClassA',
		name: '運転状況',
	},
	logo: {
		value: 'DescriptionA',
		name: 'ロゴ',
	},
	eventInfo: {
		value: 'DescriptionB',
		name: 'イベント情報',
	},
	detailInfo: {
		value: 'DescriptionC',
		name: '詳細情報',
	},
	closed: {
		value: 'CheckA',
		name: '無効化',
	},
	sort: {
		value: 'NumA',
		name: '順番',
	},
}



async function readCompanyInfo (public = false) {
    if (public) {
        let settings = {
            'url': SITE_API_URL + companyDBId + '/get',
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
            companyData = response.Response.Data
            console.log(companyData)
        })
    } else {
        $p.apiGet({
            'id': companyDBId,
            'done': function (data) {
                companyData = data.Response.Data
                console.log(companyData)
            },
            'fail': function (data) {
				alert(companyDBId + 'との通信が失敗しました。')
            },
            'always': function (data) {
            }
        })
    }

}