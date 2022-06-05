if ($p.getControl($p.getColumnName("請求書管理№　検索")) !== undefined) {
        $p.on('change', $p.getColumnName('請求書管理№　検索'), function () {
            let targetValue = $p.getControl($p.getColumnName('請求書管理№　検索')).val()
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
                                $p.set($p.getControl($p.getColumnName('請求書管理№')), response["請求書管理№"] )
                                $p.set($p.getControl($p.getColumnName('課')), response["零電社担当課"] )
                                $p.set($p.getControl($p.getColumnName('件名担当者')), response["零電社担当者"] )
                                $p.set($p.getControl($p.getColumnName('工事件名')), response["現場名"] )
                                $p.set($p.getControl($p.getColumnName('請求先　会社名')), response["請求先会社名"] )
                                $p.set($p.getControl($p.getColumnName('請求先　営業所名')), response["請求先営業所"] )
                                $p.set($p.getControl($p.getColumnName('請求先　担当者')), response["請求先担当者"] )
                                $p.set($p.getControl($p.getColumnName('請求先　役職')), response["役職"] )
                                $p.set($p.getControl($p.getColumnName('請求先　〒')), response["〒"] )
                                $p.set($p.getControl($p.getColumnName('請求先　住所')), response["住所１"] )
                                $p.set($p.getControl($p.getColumnName('〆日')), response["〆日"] )
                                $p.set($p.getControl($p.getColumnName('振込先')), response["振込先"] )

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