// 追加ヘッダーの作成
function createHeader() {
	html = `
		<tr class="ui-widget-header AddRecord">
			<th class="AddHeader" colspan="4"><div><span></span></div></th>
			<th class="AddHeader" colspan="3"><div><span>在庫数量</span></div></th>
			<th class="AddHeader" colspan="3"><div><span>残月</span></div></th>
			<th class="AddHeader" colspan="3"><div><span>1か月分在庫</span></div></th>
			<th class="AddHeader" colspan="3"><div><span>年間出荷実績</span></div></th>
			<th class="AddHeader" colspan="3"><div><span>注残</span></div></th>
		</tr>
	`
	$('#Grid thead').prepend(html)
}
