const MAX_INDEX = 14;
const HOLIDAY_LIST_TABLE = 143
const READONLY_COLUMNS = [
"作業曜日",
"消費税率",
"法定福利率",
"法定福利費",
"小計合計",
"消費税",
"合計金額",
"金額１",
"金額２",
"金額３",
"金額４",
"金額５",
"金額６",
"金額７",
"金額８",
"金額９",
"金額１０",
"金額１１",
"金額１２",
"金額１３",
"金額１４",
];

// readonly属性を設定
$p.events.on_editor_load_arr.push(function() {
    setReadonly();
});

// 往路出発時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("往路出発時間")) !== undefined) {
    $p.on('change', $p.getColumnName('往路出発時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('往路出発時間')).val().replace(".",":")
        // 往路出発時間を変更
        $p.set($p.getControl($p.getColumnName('往路出発時間')), tempStr )
    })
}

// 往路到着時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("往路到着時間")) !== undefined) {
    $p.on('change', $p.getColumnName('往路到着時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('往路到着時間')).val().replace(".",":")
        // 往路到着時間を変更
        $p.set($p.getControl($p.getColumnName('往路到着時間')), tempStr )
    })
}

// 作業開始時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("作業開始時間")) !== undefined) {
    $p.on('change', $p.getColumnName('作業開始時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('作業開始時間')).val().replace(".",":")
        // 作業開始時間を変更
        $p.set($p.getControl($p.getColumnName('作業開始時間')), tempStr )
    })
}

// 作業終了時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("作業終了時間")) !== undefined) {
    $p.on('change', $p.getColumnName('作業終了時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('作業終了時間')).val().replace(".",":")
        // 作業終了時間を変更
        $p.set($p.getControl($p.getColumnName('作業終了時間')), tempStr )
    })
}

// 復路出発時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("復路出発時間")) !== undefined) {
    $p.on('change', $p.getColumnName('復路出発時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('復路出発時間')).val().replace(".",":")
        // 復路出発時間を変更
        $p.set($p.getControl($p.getColumnName('復路出発時間')), tempStr )
    })
}

// 復路到着時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("復路到着時間")) !== undefined) {
    $p.on('change', $p.getColumnName('復路到着時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('復路到着時間')).val().replace(".",":")
        // 復路到着時間を変更
        $p.set($p.getControl($p.getColumnName('復路到着時間')), tempStr )
    })
}

// 段取り時間が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("段取り時間")) !== undefined) {
    $p.on('change', $p.getColumnName('段取り時間'), function () {
        // 「.」を「:」に置換
        let tempStr = $p.getControl($p.getColumnName('段取り時間')).val().replace(".",":")
        // 段取り時間を変更
        $p.set($p.getControl($p.getColumnName('段取り時間')), tempStr )
    })
}

// 請求先　〒が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("請求先　〒")) !== undefined) {
    $p.on('change', $p.getColumnName('請求先　〒'), function () {
        // 請求先　〒を半角に変換
        let tempStr = toHalfWidth( $p.getControl($p.getColumnName('請求先　〒')).val() )
        // 請求先　〒を変更
        $p.set($p.getControl($p.getColumnName('請求先　〒')), tempStr )
    })
}

// 請求先　住所が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("請求先　住所")) !== undefined) {
    $p.on('change', $p.getColumnName('請求先　住所'), function () {
        // 請求先　住所を半角に変換
        let tempStr = toHalfWidth( $p.getControl($p.getColumnName('請求先　住所')).val() )
        // 請求先　住所を変更
        $p.set($p.getControl($p.getColumnName('請求先　住所')), tempStr )
    })
}

// 現場ＴＥＬが更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("現場ＴＥＬ")) !== undefined) {
    $p.on('change', $p.getColumnName('現場ＴＥＬ'), function () {
        // 現場ＴＥＬを半角に変換
        let tempStr = toHalfWidth( $p.getControl($p.getColumnName('現場ＴＥＬ')).val() )
        // 現場ＴＥＬを変更
        $p.set($p.getControl($p.getColumnName('現場ＴＥＬ')), tempStr )
    })
}

for (let index = 1; index <= MAX_INDEX; index++) {
    // 数量が更新された場合のイベントを設定
    if ($p.getControl($p.getColumnName('数量' + toFullWidth(index))) !== undefined) {
        $p.on('change', $p.getColumnName('数量' + toFullWidth(index) ), function () {
            // 金額等を更新
            modAmounts();

            let targetColName = '単位' + toFullWidth(index)
            if ( $p.getControl($p.getColumnName('数量' + toFullWidth(index))).val() !== "" && $p.getControl($p.getColumnName(targetColName)).val() === "" ) {
                // 単位を更新
                $p.set($p.getControl($p.getColumnName(targetColName)), "式" )
            }

        })
    }

    // 単価が更新された場合のイベントを設定
    if ($p.getControl($p.getColumnName('単価' + toFullWidth(index))) !== undefined) {
        $p.on('change', $p.getColumnName('単価' + toFullWidth(index) ), function () {
            // 金額等を更新
            modAmounts();
        })
    }
}

// 消費税率が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("消費税率")) !== undefined) {
    $p.on('change', $p.getColumnName('消費税率'), function () {
        // 金額等を更新
        modAmounts();
    })
}

function modAmounts() {
    let totalAmount = 0;

    for (let index = 1; index <= MAX_INDEX; index++) {

        if ( $p.getControl($p.getColumnName('数量' + toFullWidth(index) )).val() === "" && $p.getControl($p.getColumnName('単価' + toFullWidth(index) )).val() === "" ) {
            // 金額を変更
            $p.set($p.getControl($p.getColumnName('金額' + toFullWidth(index))), "" )
        } else {
            // 金額を計算（金額=数量*単価）
            let amount =  Math.ceil(Number($p.getControl($p.getColumnName('数量' + toFullWidth(index) )).val()) * Number($p.getControl($p.getColumnName('単価' + toFullWidth(index) )).val()))
            // 金額を変更
            $p.set($p.getControl($p.getColumnName('金額' + toFullWidth(index))), amount )

            // 合計金額を計算
            totalAmount = totalAmount + amount
        }
    }

    // 小計合計を変更
    $p.set($p.getControl($p.getColumnName('小計合計')), totalAmount )

    // 消費税を変更
    $p.set($p.getControl($p.getColumnName('消費税')), Math.ceil(totalAmount * Number($p.getControl($p.getColumnName('消費税率')).val()) / 100 ))

    // 合計金額を変更
    $p.set($p.getControl($p.getColumnName('合計金額')), Number($p.getControl($p.getColumnName('消費税')).val()) + totalAmount )

    // 法定福利費を変更
    $p.set($p.getControl($p.getColumnName('法定福利費')), Math.ceil( Number($p.getControl($p.getColumnName('単価１')).val()) * Number($p.getControl($p.getColumnName('法定福利率')).val()) / 100 ) )

}

function setReadonly(){  
    for (const colName of READONLY_COLUMNS) {
        if ($p.getControl($p.getColumnName(colName)) !== undefined) {
            $p.getControl($p.getColumnName(colName)).attr('readonly',true);
        }
    }
}


function toHalfWidth(input) {
    return input.replace(/[！-～]/g,
        function(input){
            return String.fromCharCode(input.charCodeAt(0)-0xFEE0);
        }
    );
};

function toFullWidth(input) {
    var result = String( input );
    return result.replace(/[!-~]/g,
        function(result){
            return String.fromCharCode(result.charCodeAt(0)+0xFEE0);
        }
    );
};

// 作業年月日が更新された場合のイベントを設定
if ($p.getControl($p.getColumnName("作業日")) !== undefined) {
    $p.on('change', $p.getColumnName('作業日'), function () {
        const dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ] ;
        // 作業年月日を取得
        let targetDate = new Date( $p.getControl($p.getColumnName('作業日')).val() )
        let strTargetDate = targetDate.toLocaleString()
        let strTargetYMD = strTargetDate.substr(0, strTargetDate.indexOf(' '))
        // 祝日か判定
        $p.apiGet({
            'id': HOLIDAY_LIST_TABLE,
            'data': {
                'View': {
                    'ColumnFilterHash': {
                        "DateA" : '["' + strTargetYMD + ' 00:00:00,' + strTargetYMD + ' 23:59:59"]',
                    }
                }
            },
            'done': function (data) {
                console.log('通信が成功しました。');
                console.log(data.Response.Data);
                // 作業曜日を変更
                $p.set($p.getControl($p.getColumnName('作業曜日')), ( data.Response.Data.length !== 0 ? "祝" + dayOfWeekStrJP[targetDate.getDay()] : dayOfWeekStrJP[targetDate.getDay()] ) )

            },
            'fail': function (error) {
                console.log('通信が失敗しました。');
                return false;
            },
            'always': function (data) {
                console.log('通信が完了しました。');
            }
        });
    })
}