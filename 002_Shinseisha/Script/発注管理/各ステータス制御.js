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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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
            utilChangeReadOnly('現在在庫数量_九州')
            utilChangeReadOnly('現在在庫数量_関東')
            utilChangeReadOnly('現在在庫数量_北海道')
            utilChangeReadOnly('現在在庫数量_合計')
            utilChangeReadOnly('残月_九州')
            utilChangeReadOnly('残月_関東')
            utilChangeReadOnly('残月_北海道')
            utilChangeReadOnly('残月_全体')
            utilChangeReadOnly('1か月分在庫_九州')
            utilChangeReadOnly('1か月分在庫_関東')
            utilChangeReadOnly('1か月分在庫_北海道')
            utilChangeReadOnly('1か月分在庫_全国')
            utilChangeReadOnly('年間出荷実績_九州')
            utilChangeReadOnly('年間出荷実績_関東')
            utilChangeReadOnly('年間出荷実績_北海道')
            utilChangeReadOnly('年間出荷実績_全国')
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