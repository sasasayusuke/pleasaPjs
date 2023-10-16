const STATUS_WAIT       = 400
const STATUS_CLOSED     = 900
const REPROCESS_IMPORT  = 200


$p.events.on_editor_load_arr.push(function() {
    let status = +$p.getControl("Status").val()
    let reprocess = +$p.getControl("Class084").val()

    let selectStatuses = document.getElementById("Results_Status").options
    let selectReprocesses = document.getElementById("Results_Class084").options
    let nextTargetItems = document.getElementById("Results_Class091").options

    for(let i = selectStatuses.length - 1; i >= 0; i--) {
        if(status != selectStatuses[i].value && (status != STATUS_WAIT || selectStatuses[i].value != STATUS_CLOSED || +reprocess > 0)) {
            selectStatuses.remove(i)
        }
    }

    for(let i = selectReprocesses.length - 1; i >= 0; i--) {
        if(status == STATUS_CLOSED || (reprocess != selectReprocesses[i].value && selectReprocesses[i].value != REPROCESS_IMPORT)) {
            selectReprocesses.remove(i)
        }
    }

    for(let i = nextTargetItems.length - 1; i >= 0; i--) {
        if(status == STATUS_CLOSED) {
            nextTargetItems.remove(i)
        }
    }
})

document.getElementById("Results_Status").onchange = function() {
    if (+$p.getControl("Status").val() == STATUS_CLOSED) {
        $p.set($p.getControl('Class084'), 0)
        $p.set($p.getControl('Class091'), 0)
    }
}