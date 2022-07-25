// 会社区分によっての表示制御
commonDisplayClass("会社区分", '代理店', "顧客（代理店経由）")
// changeイベントに登録
if ($p.getControl($p.getColumnName("会社区分"))) {
    $p.on('change', $p.getColumnName('会社区分'), function () {
        commonDisplayClass("会社区分", '代理店', "顧客（代理店経由）")
    })
}