
$p.events.on_editor_load_arr.push(function() {
    const STATUS_WAIT       = 400
    const STATUS_CLOSED     = 900
    const REPROCESS_IMPORT  = 200

    let status = $p.getControl("Status").val()
    let reprocess = $p.getControl("Class084").val()
    
    let selectStatuses = document.getElementById("Results_Status").options
    let selectItems = document.getElementById("Results_Class084").options
    let nextTargetItems = document.getElementById("Results_Class091").options

    for(let i = selectStatuses.length - 1; i >= 0; i--) {
        if(status != selectStatuses[i].value && ((status != STATUS_WAIT || selectStatuses[i].value != STATUS_CLOSED) && (status != STATUS_CLOSED || selectStatuses[i].value != STATUS_WAIT))) {
            selectStatuses.remove(i)
        }
    }

    for(let i = selectItems.length - 1; i >= 0; i--) {
        if(status == STATUS_CLOSED || (reprocess != selectItems[i].value && selectItems[i].value != REPROCESS_IMPORT)) {
            selectItems.remove(i)
        }
    }

    for(let i = nextTargetItems.length - 1; i >= 0; i--) {
        if(status == STATUS_CLOSED) {
            nextTargetItems.remove(i)
        }
    }
})