$p.events.on_editor_load_arr.push(function() {
        displayChangeDestination();
    });

    if ($p.getControl($p.getColumnName("納品先")) !== undefined) {
        $p.on('change', $p.getColumnName('納品先'), function () {
            let targetValue = $p.getControl($p.getColumnName('納品先')).val()
            displayChangeDestination(targetValue)
            if ( !targetValue ) {
                clearDestination()
            } else if ( targetValue.indexOf('フリー') != -1) {
                clearDestination()
            } else {

                // $p.apiGet({
                //     'id': targetValue,
                //     'done': function (data) {
                //         console.log('通信が成功しました。');
                //         console.log(data.Response.Data);
                //         var res = data.Response.Data[0]
                //         console.log("res");
                //         console.log(res);
                //         let colArr = []
                //         for (let key in res) {
                //             colArr.push(key)
                //         }
                //         $p.apiGet({
                //             'id': targetValue,
                //             'data': {
                //                 'View': {
                //                     'ApiDataType': "KeyValues",
                //                     'ApiColumnValueDisplayType': "DisplayValue",
                //                     'GridColumns': colArr
                //                 }
                //             },
                //             'done': function (data) {
                //                 console.log('通信が成功しました。');
                //                 console.log(data.Response.Data[0]);
                //                 const response = data.Response.Data[0]
                //                 $p.set($p.getControl($p.getColumnName('請求先　会社名')), response["会社名"] )
                //                 $p.set($p.getControl($p.getColumnName('請求先　営業所')), response["営業所"] )
                //                 $p.set($p.getControl($p.getColumnName('請求先　担当')), response["姓"] )
                //                 $p.set($p.getControl($p.getColumnName('請求先　役職')), response["役職"] )
                //                 $p.set($p.getControl($p.getColumnName('請求先　TEL')), response["会社　電話番号"] )
                //                 $p.set($p.getControl($p.getColumnName('請求先　FAX')), response["会社　ＦＡＸ番号"] )
                //             }
                //         });
                //     },
                //     'fail': function (error) {
                //         console.log('通信が失敗しました。');
                //         if (error.responseJSON.StatusCode !== 404) {
                //             console.log("データ取得に失敗しました");
                //         }
                //     },
                //     'always': function (data) {
                //         console.log('通信が完了しました。');
                //     }
                // })
            }
        })
    }

    function displayChangeDestination() {
        let targetValue = $p.getControl($p.getColumnName('納品先')).val()
        if ( !targetValue ) {
            $('#SectionFields5Container').hide()
            $('#SectionFields6Container').hide()
        } else {
            if ( targetValue.indexOf('国内') != -1) {
                $('#SectionFields5Container').show()
                $('#SectionFields6Container').hide()
            } else {
                $('#SectionFields5Container').hide()
                $('#SectionFields6Container').show()
            }
        }
    }

    function clearDestination() {
        $p.set($p.getControl($p.getColumnName("会社名")), "" )
        $p.set($p.getControl($p.getColumnName("事業所名")), "" )
        $p.set($p.getControl($p.getColumnName("郵便番号")), "" )
        $p.set($p.getControl($p.getColumnName("住所")), "" )
        $p.set($p.getControl($p.getColumnName("担当者")), "" )
        $p.set($p.getControl($p.getColumnName("電話番号")), "" )
        $p.set($p.getControl($p.getColumnName("FAX番号")), "" )
        $p.set($p.getControl($p.getColumnName("特記事項")), "" )
        $p.set($p.getControl($p.getColumnName("送り先会社名")), "" )
        $p.set($p.getControl($p.getColumnName("送り先住所")), "" )
        $p.set($p.getControl($p.getColumnName("送り先電話番号")), "" )
        $p.set($p.getControl($p.getColumnName("請求先会社名")), "" )
        $p.set($p.getControl($p.getColumnName("請求先住所")), "" )
        $p.set($p.getControl($p.getColumnName("請求先電話番号")), "" )
        $p.set($p.getControl($p.getColumnName("送り先国名")), "" )
        $p.set($p.getControl($p.getColumnName("宅配業者")), "" )
        $p.set($p.getControl($p.getColumnName("送り元国名")), "" )
        $p.set($p.getControl($p.getColumnName("支払条件")), "" )
        $p.set($p.getControl($p.getColumnName("備考")), "" )
    }