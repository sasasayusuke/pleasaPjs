// ロード時実行
$p.events.on_editor_load_arr.push(function () {
    f1()
})

// 会社区分によっての表示制御
let class1 = "会社区分"
let disp1 = ['代理店', '会社区分_代理店']
let f1 = function () {
    commonDisplayClass(class1, disp1, WIKI_COMPANY_CLASS.CUSTOMER_VIA_AGENCY.name, function() {
        // 会社区分に代理店を代入
        commonSetVal(disp1[1], WIKI_COMPANY_CLASS.AGENCY.index)
        // 会社区分を読み取り専用に変更
        commonChangeReadOnly(disp1[1])
    })
}

// changeイベントに登録
if ($p.getControl($p.getColumnName(class1))) {
    $p.on('change', $p.getColumnName(class1), f1)
}
