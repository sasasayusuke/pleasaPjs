//実行するメソッドを格納する
$p.events.on_editor_load_arr = [];

//格納したメソッドを実行するメソッド
function on_editor_load_exec() {
    for (let i = 0; i < $p.events.on_editor_load_arr.length; i++) {
        $p.events.on_editor_load_arr[i] ();
    }
}

$p.events.on_editor_load = function () {
    console.log("$p.events.on_editor_load!!!")
    on_editor_load_exec();
}
