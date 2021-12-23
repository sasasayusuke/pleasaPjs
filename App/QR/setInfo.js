// セット秒後に実行
window.setTimeout(function() {
	utilSetHeader(SITE_ID)
	utilViewQRcode(utilQuerySelector('meta[name="description"]').content)
}, 1000)
