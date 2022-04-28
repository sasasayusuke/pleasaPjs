async function download(id) {
    let response = await utilUpdateAjax(
        id = id
        , ClassHash = {}
        , NumHash= {}
        , DateHash= {}
        , DescriptionHash= {}
        , CheckHash = {
            CheckA : false
        }
        , addFunc = ""
    )
    alert(id)
    console.log(response)

}