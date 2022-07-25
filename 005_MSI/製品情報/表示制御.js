// PKG種類によっての表示制御
commonDisplayClass("PKG種類", "PKG詳細", WIKI_PKG_TYPE.OTHER.name)
// changeイベントに登録
if ($p.getControl($p.getColumnName("PKG種類"))) {
        $p.on('change', $p.getColumnName('PKG種類'), function () {
            commonDisplayClass("PKG種類", "PKG詳細", WIKI_PKG_TYPE.OTHER.name)
    })
}

