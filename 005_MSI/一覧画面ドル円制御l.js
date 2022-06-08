
let records = document.querySelectorAll(".grid-row")

for (let i = 0; i < records.length; i++) {
	utilQuerySelector(".currency_code", false, records[i]).innerHTML
}
