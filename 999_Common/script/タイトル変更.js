$p.events.on_grid_load_arr.push(function () {
	// タイトル変更
    document.getElementsByTagName("Title")[0].innerText = JSON.parse(document.getElementById("JoinedSites").value)[0].Title + " ー 一覧"
})
$p.events.on_editor_load_arr.push(function () {
	// タイトル変更
    document.getElementsByTagName("Title")[0].innerText = JSON.parse(document.getElementById("JoinedSites").value)[0].Title + " ー 編集"
})

