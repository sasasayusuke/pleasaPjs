
$p.events.on_editor_load_arr.push(function () {

    let values = commonGetVal("おや",true)


    // Singleの場合
    let singleId = commonGetId("こ（Single）")
    // 最初にすべて隠す
    document.querySelectorAll(`select[id=${singleId}] option`).forEach(elem  => elem.hidden = true)
    // 親のvalueだけ表示する
    values.forEach(v => document.querySelector(`select[id=${singleId}] option[value='${v}']`).hidden = false)

    // Multiの場合 (html読み込みを待つ)
    setTimeout(function() {
        let multiId = commonGetId("こ（Multi）")
        // 最初にすべて隠す
        document.querySelectorAll(`li label input[id*='${multiId}']`).forEach(elem  => elem.parentNode.parentNode.hidden = true)
        // 親のvalueだけ表示する
        values.forEach(v => document.querySelector(`li label input[id*='${multiId}'][value='${v}']`).parentNode.parentNode.hidden = false)
    }, 1000)
})
