var ITEM_LABELS = [
  "パソコン形状",
  "台数",
  "経理科目",
  "細節",
  "部局メモ",
  "送付先住所",
  "備考",
]

var ITEM_COUNT = 10

/**
* 連番した項目配列を返却
*
* @param {Array}     labels 取得項目名
* @param {Array}     flatFlg trueなら1次元配列にして返却
*/
function getItemLabels(labels, flatFlg = true) {

  if (!Array.isArray(labels)) {
      labels = [labels]
  }
  let parents = []
  for (let i = 1; i <= ITEM_COUNT; i++) {
      let childs = []
      for (let label of labels) {
          childs.push(label + String(i))
      }
      parents.push(childs)
  }
  if (flatFlg) parents = parents.flat()
  return parents
}