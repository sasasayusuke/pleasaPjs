// ロード時実行
$p.events.on_editor_load_arr.push(function () {
    f1()
    f2()
})

// メーカーによっての表示制御
let class1 = "メーカー"
let disp1 = ['会社区分', '仕入先']
let value1 = '他社'
let f1 = function () {
    commonDisplayClass(class1, disp1, value1, function() {
        // 会社区分に仕入先を代入
        commonSetVal(disp1[0], WIKI_COMPANY_CLASS.SUPPLIER.index)
        // 会社区分を読み取り専用に変更
        commonChangeReadOnly(disp1[0])
    })
}
// changeイベントに登録
if ($p.getControl($p.getColumnName(class1))) {
    $p.on('change', $p.getColumnName(class1), f1)
}

// PKG種類によっての表示制御
let class2 = 'PKG種類'
let disp2 = 'PKG詳細'
let f2 = function () {
    commonDisplayClass(class2, disp2, WIKI_PKG_TYPE.OTHER.name)
}

// changeイベントに登録
if ($p.getControl($p.getColumnName(class2))) {
    $p.on('change', $p.getColumnName(class2), f2)
}

