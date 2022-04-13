// 年間営業日数
const YEAR_SALE_DAYS = 240
const getsu = 12
try{
    // 発注点 = 年間出荷実績 * リードタイム / 年間営業日数
    model.Num004 = model.NumZ * model.NumA / YEAR_SALE_DAYS
    model.Num005 = model.Num001 * model.NumA / YEAR_SALE_DAYS
    model.Num006 = model.Num002 * model.NumA / YEAR_SALE_DAYS
    model.Num007 = model.Num003 * model.NumA / YEAR_SALE_DAYS
    // 発注まで = 在庫数量 - 発注点
    model.Num008 = model.NumB - model.Num004
    model.Num009 = model.NumC - model.Num005
    model.Num010 = model.NumD - model.Num006
    model.Num011 = model.NumE - model.Num007
    // 1か月分在庫 = 年間出荷実績 / 出荷実績月数
    model.NumR = model.NumZ / getsu
    model.NumS = model.Num001 / getsu
    model.NumT = model.Num002 / getsu
    model.NumU = model.Num003 / getsu
    // 3か月分在庫 = 1か月分在庫 * 3
    model.NumV = model.NumR * 3
    model.NumW = model.NumS * 3
    model.NumX = model.NumT * 3
    model.NumY = model.NumU * 3
    // 残月 = 在庫数量 / 1か月分在庫
    model.NumN = model.NumB / model.NumR
    model.NumO = model.NumC / model.NumS
    model.NumP = model.NumD / model.NumT
    model.NumQ = model.NumE / model.NumU
    context.Log("閾値計算実行")

} catch (e) {
    context.Log(e.stack)
}


