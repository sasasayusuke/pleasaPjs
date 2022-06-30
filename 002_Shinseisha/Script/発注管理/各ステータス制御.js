// 各ステータス制御
function controlStatuses () {
    let status = utilGetControl('連携ステータス')
    switch (status) {
        case WIKI_STATUS_HACCHU_KANRI.waiting.value:
            // 新規作成のとき
            if ($p.action() == NEW) {
                changeItem()
                document.getElementById(utilGetId("商品ｺｰﾄﾞ")).onchange = changeItem
            } else {
                utilChangeReadOnly('商品ｺｰﾄﾞ')
            }

            changeWarehouse()
            document.getElementById(utilGetId("入庫倉庫")).onchange = changeWarehouse

            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.confirmed.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.preparing.value:
            changeWarehouse()
            document.getElementById(utilGetId("入庫倉庫")).onchange = changeWarehouse

            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')

            break
        case WIKI_STATUS_HACCHU_KANRI.shipped.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.moving.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.filled.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.closed.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('倉庫移動補充担当者')
            utilChangeReadOnly('倉庫移動補充日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        case WIKI_STATUS_HACCHU_KANRI.error.value:
            utilChangeReadOnly('商品ｺｰﾄﾞ')
            utilChangeReadOnly('標準仕入単価')
            utilChangeReadOnly('確認期日')
            utilChangeReadOnly('入庫倉庫')
            utilChangeReadOnly('発注数量')
            utilChangeReadOnly('出庫倉庫')
            utilChangeReadOnly('適用区分')
            utilChangeReadOnly('倉庫移動指示者')
            utilChangeReadOnly('倉庫移動指示日')
            utilChangeReadOnly('発注確認者')
            utilChangeReadOnly('発注確認日')
            utilChangeReadOnly('倉庫移動出荷承認者')
            utilChangeReadOnly('倉庫移動出荷承認日')
            utilChangeReadOnly('チケット作成者')
            utilChangeReadOnly('チケット作成日')
            break
        default:
            // その他のステータスの場合エラー
            utilSetMessage("不正status", ERROR)
            break
    }
}