$p.events.on_editor_load_arr.push(function() {
    disableItemLabels()
    hideItemLabels()
    displayItemLabels()
    changeItemLabels(true)
})
const ITEM_LABELS = [
    ITEM_NAME = "品名"
    , SALE_CLASS = "売上集計区分"
    , ORDER_QUANTITY = "注文数量"
    , UNIT = "単価"
    , PRICE = "金額"
    , RESERVED_QUANTITY = "確保数量"
    , UNRESERVED_QUANTITY = "未確保数量"
]
const ITEM_COUNT = 9


function disableItemLabels() {
    for (let i = 1; i <= ITEM_COUNT; i++) {
        commonChangeReadOnly(UNIT + "_" + i)
        commonChangeReadOnly(RESERVED_QUANTITY + "_" + i)
    }
}

function hideItemLabels() {
    let items = []
    for (let i = 1; i <= ITEM_COUNT; i++) {
        for (let label of ITEM_LABELS) {
            items.push(commonGetId(label + "_" + i, true, true))
        }
    }
    commonHideElements(items)
}

function displayItemLabels() {
    let items = []
    for (let i = 1; i <= ITEM_COUNT; i++) {
        if (commonIsNull(commonGetVal(ITEM_NAME + "_" + i, true))) {
            items.push(commonGetId(ITEM_NAME + "_" + i, true, true))
            break
        }
        for (let label of ITEM_LABELS) {
            items.push(commonGetId(label + "_" + i, true, true))
        }
    }
    commonHideElements(items, false)
}

function deleteItemLabels(rowNo) {
    // changeイベント一旦無効
    changeItemLabels(false)
    for (let i = rowNo; i <= ITEM_COUNT; i++) {
        for (let label of ITEM_LABELS) {
            if (i == ITEM_COUNT) {
                // 消去
                commonSetVal(label + "_" + i, '')
            } else {
                // 移動
                commonSetVal(label + "_" + i, commonGetVal(label + "_" + (i + 1), true))
            }
        }
    }
    hideItemLabels()
    displayItemLabels()

    // changeイベント有効
    changeItemLabels(true)

}

function changeItemLabels(valid) {
    console.log(valid)
    for (let i = 1; i <= ITEM_COUNT; i++) {
        let label = ITEM_NAME + "_" + i
        if (valid) {
            document.getElementById(commonGetId(label)).onchange = function() {
                if(commonIsNull(commonGetVal(label, true, true))){
                    deleteItemLabels(i)
                }
                displayItemLabels()
            }
        } else {
            document.getElementById(commonGetId(label)).onchange = function() {
            }
        }
    }
}