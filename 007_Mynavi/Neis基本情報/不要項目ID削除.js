
window.onload = function() {
    removeItems = ['MBS', 'FileName', 'SheetName', '6cat', 'p1', 'p2', 'p3', 'p4', 'p5','DeleteFlag']
    selectItems = document.getElementById("Results_ClassC")
    for(let i = selectItems.options.length - 1; i >= 0; i--){
        if(removeItems.includes(selectItems.options[i].text)){
            selectItems.remove(i)
        }
    }
}