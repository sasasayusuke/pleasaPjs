if ($p.getControl($p.getColumnName("報告書№　検索")) !== undefined) {
    $p.on('change', $p.getColumnName('報告書№　検索'), function () {
        let targetValue = $p.getControl($p.getColumnName('報告書№　検索')).val()
        if ( targetValue !== '') {
            $p.apiGet({
                'id': targetValue,
                'done': function (data) {
                    console.log('通信が成功しました。');
                    console.log(data.Response.Data);
                    var res = data.Response.Data[0]
                    console.log("res");
                    console.log(res);

                    let colArr = []
                    for (let key in res) {
                        colArr.push(key)
                    }

                    $p.apiGet({
                        'id': targetValue,
                        'data': {
                            'View': {
                                'ApiDataType': "KeyValues",
                                'ApiColumnValueDisplayType': "DisplayValue",
                                'GridColumns': colArr
                            }
                        },
                        'done': function (data) {
                            console.log('通信が成功しました。');
                            console.log(data.Response.Data[0]);
                            const response = data.Response.Data[0]

                            $p.set($p.getControl($p.getColumnName('報告書№')), response["管理番号"] )
                            $p.set($p.getControl($p.getColumnName('工事件名')), response["件名"] )
                            $p.set($p.getControl($p.getColumnName('現場住所')), response["現場住所"] )
                            $p.set($p.getControl($p.getColumnName('ＴＥＬ')), response["TEL"] )
                            $p.set($p.getControl($p.getColumnName('ＥＮＧ照会番号')), response["ＥＮＧ照会番号"] )
                            $p.set($p.getControl($p.getColumnName('図番')), response["図番"] )
                            $p.set($p.getControl($p.getColumnName('ロット番号')), response["ロット番号"] )
                            $p.set($p.getControl($p.getColumnName('工事会社')), response["工事店"] )
                            $p.set($p.getControl($p.getColumnName('工事会社　担当者')), response["当日担当者"] )
                            $p.set($p.getControl($p.getColumnName('往路出発時間')), response["往路　出発時間"] )
                            $p.set($p.getControl($p.getColumnName('往路到着時間')), response["往路　到着時間"] )
                            $p.set($p.getControl($p.getColumnName('作業開始時間')), response["作業　開始時間"] )
                            $p.set($p.getControl($p.getColumnName('作業終了時間')), response["作業　終了時間"] )
                            $p.set($p.getControl($p.getColumnName('復路出発時間')), response["復路　出発時間"] )
                            $p.set($p.getControl($p.getColumnName('復路到着時間')), response["復路　到着時間"] )
                            $p.set($p.getControl($p.getColumnName('段取り時間')), response["段取り時間"] )
                            $p.set($p.getControl($p.getColumnName('移動距離')), response["移動距離"] )
                            $p.set($p.getControl($p.getColumnName('高速料金')), response["高速料金"] )
                            $p.set($p.getControl($p.getColumnName('駐車料金')), response["駐車料金"] )
                            $p.set($p.getControl($p.getColumnName('電車代')), response["電車代"] )
                            $p.set($p.getControl($p.getColumnName('作業者１')), response["作業者１"] )
                            $p.set($p.getControl($p.getColumnName('作業者２')), response["作業者２"] )
                            $p.set($p.getControl($p.getColumnName('作業者３')), response["作業者３"] )
                            $p.set($p.getControl($p.getColumnName('作業者４')), response["作業者４"] )
                            $p.set($p.getControl($p.getColumnName('作業者５')), response["作業者５"] )
                            $p.set($p.getControl($p.getColumnName('作業者６')), response["作業者６"] )
                            $p.set($p.getControl($p.getColumnName('作業者７')), response["作業者７"] )
                            $p.set($p.getControl($p.getColumnName('作業者８')), response["作業者８"] )
                            $p.set($p.getControl($p.getColumnName('作業者９')), response["作業者９"] )
                            $p.set($p.getControl($p.getColumnName('作業者１０')), response["作業者１０"] )
                            $p.set($p.getControl($p.getColumnName('作業者１１')), response["作業者１１"] )
                            $p.set($p.getControl($p.getColumnName('作業者１２')), response["作業者１２"] )
                            $p.set($p.getControl($p.getColumnName('作業者１３')), response["作業者１３"] )
                            $p.set($p.getControl($p.getColumnName('作業者１４')), response["作業者１４"] )
                            $p.set($p.getControl($p.getColumnName('作業内容①')), response["作業内容①"] )
                            $p.set($p.getControl($p.getColumnName('作業内容②')), response["作業内容②"] )

                        }
                    });
                },
                'fail': function (error) {
                    console.log('通信が失敗しました。');
                    if (error.responseJSON.StatusCode !== 404) {
                        console.log("データ取得に失敗しました");
                    }
                },
                'always': function (data) {
                    console.log('通信が完了しました。');
                }
            })
        }
    })
}
