let acceptName = "受付開始"
let acceptMessages = [
	`${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理を開始します。ブラウザを閉じないようにお願い致します。`,
    `${acceptName}処理が正常に終了しました。`,
]

async function accept() {
    try {
        await commonCheckPoint(acceptMessages, "start")
        // 進行中だと分かるようにステータスを更新、途中でブラウザを離れると進行中のまま残る（完了時にステータスを再更新）
        await commonUpdateProcessing()

        await commonCheckPoint(acceptMessages)

        let departments = await commonGetData(
            TABLE_INFO["部局情報"].index,
            ["親部局コード", "部局名", "ID"].map(v => commonGetColumnName("部局情報", v)),
        )
        departments = departments.filter(v => commonIsNull(v["親部局コード"]))
        let i = 0
        for (let data of departments) {
            i ++
            await commonCreate(
                TABLE_INFO["購買報告書"].index,
                {
                    [commonGetColumnName("購買報告書", "イベント")] : $p.id(),
                    [commonGetColumnName("購買報告書", "申請部局")] : data["部局名"],
                }
            )
            if (i % 10 == 0) await commonCheckPoint(acceptMessages, "add")

        }
        await commonCheckPoint(acceptMessages, "add")
        await commonSaveRecord(
            {},
            commonGetStatuses("イベント").filter(v => v.name == ["受付中"])[0].index, // 受付
            `[md]# ${acceptName}を行いました。`,
            true,
        )

        await commonCheckPoint(acceptMessages, "close")

        alert(`${acceptName}を行いました。リロードします。`)

	} catch (err) {
        let msg
        if (err.message == ERROR_MESSAGE_UP) {
            msg = ERROR_MESSAGE_UP
            console.log(err)

        } else {
            msg = `${acceptName}エラー`
            console.log(err)

            await commonSaveRecord(
                ""
                , ERROR // エラー
                , msg
            )

        }

        console.log(err)
        await commonCheckPoint(msg, "error", commonGetErrorObj(err))
		alert(msg)

		return false
	}
}

