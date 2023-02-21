try {
    context.Log('承認・否決ボタンの設置');
    if (model.Manager === context.UserId) {
        switch (model.Status) {
            case 100:
                if (context.Action !== 'new') {
                    columns.AttachmentsA.ExtendedHtmlAfterField = buttons('', '申請');
                }
                break;
            case 200:
                columns.DescriptionB.ExtendedHtmlAfterField = buttons('M1', '幹部承認');
                break;
            case 300:
                columns.DescriptionC.ExtendedHtmlAfterField = buttons('M2', '上級幹部承認');
                break;
            case 400:
                columns.DescriptionD.ExtendedHtmlAfterField = buttons('M3', '役員承認');
                break;
        }
    }

    function buttons(suffix, text) {
        let html = '<div class="approval-control"><button id="Approval' + suffix + '" class="button button-icon validate" type="button" onclick="if (!confirm(\'' + text + 'してよろしいですか?\')) return false;$p.send($(this));" data-icon="ui-icon-circle-triangle-e" data-action="Update" data-method="put">' + text + '</button></div>';
        if (suffix !== '') {
            html += '<div class="approval-control"><button id="Veto' + suffix + '" class="button button-icon validate" type="button" onclick="if (!confirm(\'否決してしてよろしいですか?\')) return false;$p.send($(this));" data-icon="ui-icon-circle-close" data-action="Update" data-method="put">否決</button></div>';
        }
        return html;
    }
} catch (e){
    context.Log(e.stack);
}