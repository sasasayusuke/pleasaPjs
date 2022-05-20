
function controlReadOnly () {
    let status = utilGetControl('連携ステータス')
    switch (status) {
        case WIKI_STATUS_HACCHU_KANRI.waiting.value:
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            // 新規作成でない場合は、商品ｺｰﾄﾞを読み取り専用にする。
            if ($p.action() !== NEW) {
                changeReadOnly('商品ｺｰﾄﾞ')
            }
            break
        case WIKI_STATUS_HACCHU_KANRI.confirmed.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.preparing.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')

            break
        case WIKI_STATUS_HACCHU_KANRI.shipped.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.moving.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.filled.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.closed.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('倉庫移動補充担当者')
            changeReadOnly('倉庫移動補充日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.error.value:
            changeReadOnly('商品ｺｰﾄﾞ')
            changeReadOnly('確認期日')
            changeReadOnly('入庫倉庫')
            changeReadOnly('発注数量')
            changeReadOnly('出庫倉庫')
            changeReadOnly('適用区分')
            changeReadOnly('倉庫移動指示者')
            changeReadOnly('倉庫移動指示日')
            changeReadOnly('発注確認者')
            changeReadOnly('発注確認日')
            changeReadOnly('倉庫移動出荷承認者')
            changeReadOnly('倉庫移動出荷承認日')
            changeReadOnly('チケット作成者')
            changeReadOnly('チケット作成日')
            break
        default:
            // その他のステータスの場合エラー
            utilSetMessage("不正status", ERROR)
            break
    }

    function changeReadOnly(label) {
        document.getElementById($p.tableName() + "_" + $p.getColumnName(label)).disabled = true
    }


}