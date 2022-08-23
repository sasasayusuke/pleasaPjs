$p.events.on_editor_load_arr.push(function () {
    f1()
    f2()
})

// 通貨区分によっての表示制御
let class1 = '通貨区分'
let disp1 = ['レート', '単価＄', '金額＄']
let target1 = '単価'
let f1 = function () {
    commonDisplayClass(class1, disp1, WIKI_CURRENCY_CLASS.USD.name, function() {
        // 読み取り専用に変更
        commonChangeReadOnly(target1)
        // 単価＄変更時、単価へ反映するchangeイベントを登録
        if ($p.getControl($p.getColumnName(disp1[1]))) {
            $p.on('change', $p.getColumnName(disp1[1]), function () {
                // 単価の設定（単価＄ * レート）
                commonSetVal(target1, Math.ceil(commonConvertCTo1(commonGetVal(disp1[0])) * commonConvertCTo1(commonGetVal(disp1[1]))))
            })
        }
    })
}


// 会社区分によっての表示制御
let class2 = '会社区分'
let disp2 = ['代理店名', 'コミッション率', 'エンドユーザ']
let f2 = function () {
    // 代理店選択時
    if (commonGetVal(class2) == WIKI_COMPANY_CLASS.AGENCY.name) {
        // '代理店名', 'コミッション率'を非表示化
        disp2.filter(v => v != 'エンドユーザ').forEach(v => commonHideElements(commonGetId(v, true, true)))
    // 顧客（代理店経由）選択時
    } else if (commonGetVal(class2) == WIKI_COMPANY_CLASS.CUSTOMER_VIA_AGENCY.name) {
        // 'エンドユーザ'を非表示化
        disp2.filter(v => v == 'エンドユーザ').forEach(v => commonHideElements(commonGetId(v, true, true)))
    } else {
        // '代理店名', 'コミッション率', 'エンドユーザ'を非表示化
        disp2.forEach(v => commonHideElements(commonGetId(v, true, true)))
    }
}


