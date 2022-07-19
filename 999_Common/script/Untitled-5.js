
    let groupCodeJson = await commonExportGroupAjax([1, 2])
    let groups = groupCodeJson.Response.Data

/**
 * グループ取得APIを呼び出す関数です。
 *
 * @param {Array}     groupIds 取得GroupId
 * @param {Function}  addFunc 最後に実行したい関数
 */
 function commonExportGroupAjax (groupIds, addFunc) {
  let groups
  if (Array.isArray(groupIds)) {
    groups = groupIds
  } else {
    groups = [groupIds]
  }
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: "/api/groups/get",
			contentType: 'application/json',
			data:JSON.stringify({
				"ApiVersion": 1.1,
				"View": {
          "ColumnFilterHash": {
            "GroupId" : JSON.stringify(groups)
          }
				}
			})
		}).then(
			function (result) {
        if (addFunc && typeof addFunc === 'function') {
          // 渡されたオブジェクトが関数なら実行する
          addFunc(data)
        }
				// 正常終了
				resolve(result);
			},
			function () {
				// エラー
				reject()
			}
		)
	})