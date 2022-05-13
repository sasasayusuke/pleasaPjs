
$p.events.on_editor_load = function () {
    utilRemoveElements(['OpenCopyDialogCommand', 'DeleteCommand', 'GoBack', 'EditOutgoingMail'])
}

$p.events.on_grid_load = function () {
    window.setInterval(function() {
        Array.from(document.querySelectorAll('td.invalidation span'))
        .filter(v => v.classList.contains('ui-icon-circle-check'))
        .forEach(v => {
			if (!v.parentNode.parentNode.classList.contains('invalid')) {
				v.parentNode.parentNode.classList.add('invalid')
			}
        })
    }, 500)
}