
function openDialog() {
    console.log("openDownloadDialog")
    $('#SendTo').val("")
    $('#SendToPerson').val("")
    $('#SendToAddress').val("")
    $("#deliveryDialog").dialog({
        modal: !0,
        width: "520px",
        resizable: !1
    })
}

async function delivery() {
    let volume = $p.getControl("数量").val()
    let deliverVolume = $('#Results_Num').val()
    if (isNaN(volume) && isNaN(deliverVolume) && +deliverVolume > +volume && +deliverVolume < 1) {
        $p.closeDialog($('#deliveryDialog'))
        utilSetMessage("入力数量が異常です。", ERROR)
        return
    }

    if (deliverVolume == volume) {
        // 全納品
        await utilUpdateAjax(
            $p.id()
            , {}
            , {}
            , {}
            , {}
            , {}
            , "250" // 納品済
        )
        $p.closeDialog($('#deliveryDialog'))
        let finalAns = window.confirm('納品されました。画面をリロードしますがよろしいでしょうか?')
		if (finalAns) {
			// キャッシュからリロード
			location.reload(false)
		}
    } else {
        // 分納品
        await utilUpdateAjax(
            $p.id()
            , {}
            , {
                NumD: volume - deliverVolume
            }
            , {}
            , {}
            , {}
            , "200" // 納品待
        )
        await utilCreateAjax(
            TABLE.ORDER.index
            , {
                ClassB: $p.getControl("ClassB").val()
                , ClassC: $p.getControl("ClassC").val()
                , ClassD: $p.getControl("ClassD").val()
                , ClassE: $p.getControl("ClassE").val()
                , ClassF: $p.getControl("ClassF").val()
                , ClassG: $p.getControl("ClassG").val()
                , ClassH: $p.getControl("ClassH").val()
                , ClassI: $p.getControl("ClassI").val()
                , ClassJ: $p.getControl("ClassJ").val()
                , ClassK: $p.getControl("ClassK").val()
                , ClassL: $p.getControl("ClassL").val()
                , ClassM: $p.getControl("ClassM").val()
                , ClassN: $p.getControl("ClassN").val()
            }
            , {
                NumA: $p.getControl("NumA").val()
                , NumB: $p.getControl("NumB").val()
                , NumC: $p.getControl("NumC").val()
                , NumD: deliverVolume
                , NumE: $p.getControl("NumE").val()
                , NumF: $p.getControl("NumF").val()
            }
            , {
                DateA: $p.getControl("DateA").val() ? $p.getControl("DateA").val() : utilGetDateEmpty()
                , DateB: $p.getControl("DateB").val() ? $p.getControl("DateB").val() : utilGetDateEmpty()
                , DateC: $p.getControl("DateC").val() ? $p.getControl("DateC").val() : utilGetDateEmpty()
                , DateD: $p.getControl("DateD").val() ? $p.getControl("DateD").val() : utilGetDateEmpty()
                , DateE: $p.getControl("DateE").val() ? $p.getControl("DateE").val() : utilGetDateEmpty()
                , DateF: $p.getControl("DateF").val() ? $p.getControl("DateF").val() : utilGetDateEmpty()
                , DateG: $p.getControl("DateG").val() ? $p.getControl("DateG").val() : utilGetDateEmpty()
                , DateH: $p.getControl("DateH").val() ? $p.getControl("DateH").val() : utilGetDateEmpty()
                , DateI: $p.getControl("DateI").val() ? $p.getControl("DateI").val() : utilGetDateEmpty()
                , DateJ: $p.getControl("DateJ").val() ? $p.getControl("DateJ").val() : utilGetDateEmpty()
            }
            , {
                DescriptionA: $p.getControl("DescriptionA").val()
                , DescriptionB: $p.getControl("DescriptionB").val()
            }
            , {
                CheckA: $p.getControl("CheckA")[0].checked
            }
            , "250" // 納品済
        )
        $p.closeDialog($('#deliveryDialog'))
        let finalAns = window.confirm(deliverVolume + '個分納されました画面をリロードしますがよろしいでしょうか?')
		if (finalAns) {
			// キャッシュからリロード
			location.reload(false)
		}
    }
}