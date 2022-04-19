$p.events.on_grid_load = function () {
	target = document.getElementById('MainCommands')
	elem = document.createElement('button')
	elem.id='sumMove'
	elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
	elem.onclick = sumMove
	elem.innerText = '移動残集計'

	target.appendChild(elem)
}

function checkDouble() {

	const COL_INDEX = [
		SHOUHIN_CODE
		, IN_SOUKO
		, OUT_SOUKO
		, HACCHUU_SUURYOU
		, STATUS
	] = [
		"ClassA"
		, "ClassF"
		, "ClassG"
		, "NumA"
		, "Status"
	]


	$.ajax({
		type: "POST",
		url: "/api/items/" + SITE_ID_SHUKKA_JISSEKI + "/export",
		contentType: 'application/json',
		data:JSON.stringify({
			"ApiVersion": 1.1,
			"Export": {
				"Columns":[
					// 商品コード
					{
						"ColumnName": "ClassA"
					},
					// 年
					{
						"ColumnName": "ClassF"
					},
					// 月
					{
						"ColumnName": "ClassG"
					}
				],
				"Header": false,
				"Type": "csv"
			},
			"View": {
				"ColumnSorterHash": {
					"ResultId": "asc"
				},
			}
		}),
		success: function(data){
			records = []
			for (let r of data.Response.Content.split(/\n/)) {
				records.push(JSON.parse(`[${r}]`))
			}
			extractData()
		}
	})

}


