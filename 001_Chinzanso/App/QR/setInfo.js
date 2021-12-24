
var PUBLIC_FLG = true

readScreenInfo(PUBLIC_FLG)
.then(response => {
	utilSetHeader(SITE_ID)
	utilViewQRcode(utilQuerySelector('meta[name="description"]').content)
})

