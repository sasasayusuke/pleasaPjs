const i = 15;
var mul = new Array(15);
const READONLY_COLUMNS = [
    "小計",
    "税額",
    "合計",
    "金額1",
    "金額2",
    "金額3",
    "金額4",
    "金額5",
    "金額6",
    "金額7",
    "金額8",
    "金額9",
    "金額10",
    "金額11",
    "金額12",
    "金額13",
    "金額14",
    "金額15",
];

// readonly属性を設定
$p.events.on_editor_load_arr.push(function () {
    setReadonly();
});

for (let index = 1; index <= i; index++) {
    // 数量と単価が更新された場合のイベントを設定
    if ($p.getControl($p.getColumnName('数量' + index)) !== undefined) {
        $p.on('change', $p.getColumnName('数量' + index), function () {
            // 数量を更新
            itemUpdate();

        })
    }

    // 単価が更新された場合のイベントを設定
    if ($p.getControl($p.getColumnName('単価' + index)) !== undefined) {
        $p.on('change', $p.getColumnName('単価' + index), function () {
            // 単価を更新
            itemUpdate();
        })
    }
}

//itemUpdate呼び出し
function itemUpdate() {
    for (let index = 1; index <= i; index++) {

        if ($p.getControl($p.getColumnName('数量' + index)).val() === "" & $p.getControl($p.getColumnName('単価' + index)).val() === "") {
            // 空白だった時、金額空白代入
            $p.set($p.getControl($p.getColumnName('金額' + index)), "");

        } else {
            // 金額を計算（金額=数量*単価）
            mul = $p.getControl($p.getColumnName('数量' + index)).val() * $p.getControl($p.getColumnName('単価' + index)).val()
            // 金額に代入
            $p.set($p.getControl($p.getColumnName('金額' + index)), mul);
        }
        if ($p.getControl($p.getColumnName('金額' + index)).val() === "NaN") {
            // 金額にNaNが入力の場合、ブランク
            $p.set($p.getControl($p.getColumnName('金額' + index)), "");
            // 金額読専解除
            document.getElementById($p.tableName() + "_" + $p.getColumnName('金額' + index)).disabled = false
        }
    }
}

//readonly呼び出し
function setReadonly() {
    for (const colName of READONLY_COLUMNS) {
        if ($p.getControl($p.getColumnName(colName)) !== undefined) {
            // READONLY_COLUMNSを読専
            document.getElementById($p.tableName() + "_" + $p.getColumnName(colName)).disabled = true

        }
    }
}