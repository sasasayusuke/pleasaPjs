const LABEL_CURRENCY = "通貨区分"
const LABEL_UNIT_PRICE_JPY = "単価"
const LABEL_UNIT_PRICE_USD = "単価＄"
const LABEL_PRICE_JPY = "金額"
const LABEL_PRICE_USD = "金額＄"
const LABEL_RATE = "レート"
const LABEL_VOLUME = "数量"

document.getElementById(utilGetId(LABEL_CURRENCY)).onchange = changeCurrency
document.getElementById(utilGetId(LABEL_UNIT_PRICE_USD)).onchange = changePrice
document.getElementById(utilGetId(LABEL_UNIT_PRICE_JPY)).onchange = changePrice
document.getElementById(utilGetId(LABEL_RATE)).onchange = changePrice
document.getElementById(utilGetId(LABEL_VOLUME)).onchange = changePrice

utilChangeReadOnly(LABEL_PRICE_USD)
utilChangeReadOnly(LABEL_PRICE_JPY)
changeCurrency()

function changePrice() {
    let unit_jpy = $p.getControl(LABEL_UNIT_PRICE_JPY).val()
    let unit_usd = $p.getControl(LABEL_UNIT_PRICE_USD).val()
    let volume = $p.getControl(LABEL_VOLUME).val()
    let rate = $p.getControl(LABEL_RATE).val()

    utilChangeReadOnly(LABEL_PRICE_USD, true)
    $p.set($p.getControl(LABEL_PRICE_USD), unit_usd * volume)
    utilChangeReadOnly(LABEL_PRICE_USD)
    utilChangeReadOnly(LABEL_PRICE_JPY, true)
    $p.set($p.getControl(LABEL_PRICE_JPY), unit_jpy * volume)
    utilChangeReadOnly(LABEL_PRICE_JPY)

}

function changeCurrency() {
    let unit_usd = $p.getControl(LABEL_UNIT_PRICE_USD).val()
    let volume = $p.getControl(LABEL_VOLUME).val()
    let rate = $p.getControl(LABEL_RATE).val()

    utilChangeReadOnly(LABEL_UNIT_PRICE_USD, false)
    utilChangeReadOnly(LABEL_PRICE_USD, false)
    utilChangeReadOnly(LABEL_UNIT_PRICE_JPY, false)
    utilChangeReadOnly(LABEL_PRICE_JPY, false)
    utilChangeReadOnly(LABEL_RATE, false)


    if (utilGetControl(LABEL_CURRENCY) === 'JPY') {
        $p.set($p.getControl(LABEL_UNIT_PRICE_USD), 0)
        utilChangeReadOnly(LABEL_UNIT_PRICE_USD)
        $p.set($p.getControl(LABEL_PRICE_USD), 0)
        utilChangeReadOnly(LABEL_PRICE_USD)
        $p.set($p.getControl(LABEL_RATE), 0)
        utilChangeReadOnly(LABEL_RATE)
    } else if (utilGetControl(LABEL_CURRENCY) === 'USD') {
        $p.set($p.getControl(LABEL_UNIT_PRICE_JPY), rate * unit_usd)
        utilChangeReadOnly(LABEL_UNIT_PRICE_JPY)
    }
}
