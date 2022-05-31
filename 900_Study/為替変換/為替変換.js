document.getElementById(utilGetId("売上")).onchange = changePrice
document.getElementById(utilGetId("為替選択")).onchange = changePrice
utilChangeReadOnly('円換算値')


function changePrice() {

    let price = $p.getControl("売上").val()
    let currency = $p.getControl("為替選択").val()

    if (currency === "") {
        $p.set($("#Results_NumB"), "")
    }

    if (price !== "" && currency !== "") {
        fetch("https://api.exchangerate-api.com/v4/latest/JPY", {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(data => {
                let rate = data.rates[currency]
                let priceJpy = Math.round(price / rate)
                utilChangeReadOnly('円換算値', false)
                $p.set($p.getControl('円換算値'), priceJpy)
                utilChangeReadOnly('円換算値')

            })
    }
}
function utilGetId (label) {
    return $p.tableName() + "_" + $p.getColumnName(label)
}

function utilChangeReadOnly (label, flg = true) {
    document.getElementById(utilGetId(label)).disabled = flg
}