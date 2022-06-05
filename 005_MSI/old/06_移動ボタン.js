$p.events.on_editor_load_arr.push(function() {
    addMoveButton();
});

function addMoveButton() {
    for (let index = 1; index <= MAX_INDEX; index++) {
        $p.getField('金額' + toFullWidth(index)).after(
`
<div class="field-wide">
<p class="field-label"><label></label></p>
<div class="field-control">
<div class="container-normal">
<button class="button button-icon validate" type="button" onclick="moveUp($(this));" data-icon="ui-icon-circle-triangle-n" data-action="Update" data-method="put">上へ</button>
<button class="button button-icon validate" type="button" onclick="moveDown($(this));" data-icon="ui-icon-circle-triangle-s" data-action="Update" data-method="put">下へ</button>
<button class="button button-icon validate" type="button" onclick="addRow($(this));" data-icon="ui-icon-circle-triangle-w" data-action="Update" data-method="put">行追加</button>
<button class="button button-icon validate" type="button" onclick="deleteRow($(this));" data-icon="ui-icon-circle-triangle-e" data-action="Update" data-method="put">行削除</button>
</div>
</div>
</div>
`
        )
    }
}

function moveUp(n) {
    // 項目番号を取得
    const index = toHalfWidth( n.closest(".field-wide").prev().find('label')[0].innerHTML.replace("金額","") )

    // 項目番号が1でない場合
    if (index > 1) {
        // 1つ上の項目を取得
        const tmpName = $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index) - 1))).val()
        const tmpVol = $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index) - 1))).val()
        const tmpUnit = $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index) - 1))).val()
        const tmpPrice = $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index) - 1))).val()
        const tmpAmount = $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index) - 1))).val()

        // 1つ上の項目を対象の項目の内容に変更
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index) - 1 ))), $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index) - 1 ))), $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index) - 1 ))), $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index) - 1 ))), $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index) - 1 ))), $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index)))).val() )

        // 対象の項目を1つ上の項目の内容に変更
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index)))), tmpName )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index)))), tmpVol )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index)))), tmpUnit )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index)))), tmpPrice )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index)))), tmpAmount )

        // 金額等を更新
        modAmounts();
    }
}

function moveDown(n) {
    // 項目番号を取得
    const index = toHalfWidth( n.closest(".field-wide").prev().find('label')[0].innerHTML.replace("金額","") )

    // 項目番号が最大でない場合
    if (index < MAX_INDEX) {
        // 1つ下の項目を取得
        const tmpName = $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index) + 1))).val()
        const tmpVol = $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index) + 1))).val()
        const tmpUnit = $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index) + 1))).val()
        const tmpPrice = $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index) + 1))).val()
        const tmpAmount = $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index) + 1))).val()

        // 1つ下の項目を対象の項目の内容に変更
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index) + 1 ))), $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index) + 1 ))), $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index) + 1 ))), $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index) + 1 ))), $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index)))).val() )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index) + 1 ))), $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index)))).val() )

        // 対象の項目を1つ下の項目の内容に変更
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index)))), tmpName )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index)))), tmpVol )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index)))), tmpUnit )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index)))), tmpPrice )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index)))), tmpAmount )

        // 金額等を更新
        modAmounts();
    }
}

function deleteRow(n) {
    // 実行確認
    if (!confirm('行を削除します。よろしいですか?')) return false;

    // 項目番号を取得
    const index = toHalfWidth( n.closest(".field-wide").prev().find('label')[0].innerHTML.replace("金額","") )

    // 取得した項目番号から最終項目-1までループ
    for (let step = parseInt(index); step < MAX_INDEX; step++) {

        // 1つ下の項目の内容を対象の項目に上書き
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(step) ))), $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(step) + 1 ))).val() )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(step) ))), $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(step) + 1 ))).val() )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(step) ))), $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(step) + 1 ))).val() )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(step) ))), $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(step) + 1 ))).val() )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(step) ))), $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(step) + 1 ))).val() )
    }

    // 最後の項目の内容を削除
    $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(MAX_INDEX) ))), "" )
    $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(MAX_INDEX) ))), "" )
    $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(MAX_INDEX) ))), "" )
    $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(MAX_INDEX) ))), "" )
    $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(MAX_INDEX) ))), "" )

    // 金額等を更新
    modAmounts();
}

function addRow(n) {
    // 実行確認
    if (!confirm('行を追加します。よろしいですか?（最終行は削除されます）')) return false;

    // 項目番号を取得
    const index = toHalfWidth( n.closest(".field-wide").prev().find('label')[0].innerHTML.replace("金額","") )

    // 取得した項目番号から最終項目-1までループ
    for (let step = MAX_INDEX - 1; step >= parseInt(index); step--) {

        // 対象の項目を1つ下の項目の内容に上書き
        $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(step) + 1 ))), $p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(step) ))).val() )
        $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(step) + 1 ))), $p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(step) ))).val() )
        $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(step) + 1 ))), $p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(step) ))).val() )
        $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(step) + 1 ))), $p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(step) ))).val() )
        $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(step) + 1 ))), $p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(step) ))).val() )
    }

    // 対象の項目の内容を削除
    $p.set($p.getControl($p.getColumnName('内容・仕様' + toFullWidth( parseInt(index) ))), "" )
    $p.set($p.getControl($p.getColumnName('数量' + toFullWidth( parseInt(index) ))), "" )
    $p.set($p.getControl($p.getColumnName('単位' + toFullWidth( parseInt(index) ))), "" )
    $p.set($p.getControl($p.getColumnName('単価' + toFullWidth( parseInt(index) ))), "" )
    $p.set($p.getControl($p.getColumnName('金額' + toFullWidth( parseInt(index) ))), "" )

    // 金額等を更新
    modAmounts();
}