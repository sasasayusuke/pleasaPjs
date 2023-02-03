const ITEM_LABELS = [
  SHAPE       = "パソコン形状",
  NUMBER      = "台数",
  SUBJECTS    = "経理科目",
  SUBDIVISION = "細節",
  MEMO        = "部局メモ",
  REMARK      = "備考",
]
const ITEM_COUNT = 9

/**
* 連番した配列を返却
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
          childs.push(label + "_" + i)
      }
      parents.push(childs)
  }
  if (flatFlg) parents = parents.flat()
  return parents
}