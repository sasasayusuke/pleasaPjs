// 年間営業日数
const YEAR_SALE_DAYS = 240
try{
    // 発注点 = 年間出荷実績 * リードタイム / 年間営業日数
    model.Num004 = model.NumZ * model.NumA / YEAR_SALE_DAYS
    model.Num005 = model.Num001 * model.NumA / YEAR_SALE_DAYS
    model.Num006 = model.Num002 * model.NumA / YEAR_SALE_DAYS
    model.Num007 = model.Num003 * model.NumA / YEAR_SALE_DAYS
    // 発注まで = 現在庫数量 + 注残数量 + 移動残数量 - 発注点
    model.Num008 = model.NumB + model.NumF + model.NumJ - model.Num004
    model.Num009 = model.NumC + model.NumG + model.NumK - model.Num005
    model.Num010 = model.NumD + model.NumH + model.NumL - model.Num006
    model.Num011 = model.NumE + model.NumI + model.NumM - model.Num007
    // 1か月分在庫 = 年間出荷実績 / 12
    model.NumR = model.NumZ / 12
    model.NumS = model.Num001 / 12
    model.NumT = model.Num002 / 12
    model.NumU = model.Num003 / 12
    // 3か月分在庫 = 1か月分在庫 * 3
    model.NumV = model.NumR * 3
    model.NumW = model.NumS * 3
    model.NumX = model.NumT * 3
    model.NumY = model.NumU * 3
    // 残月 =  現在庫数量 / 1か月分在庫
    model.NumN = model.NumB / model.NumR
    model.NumO = model.NumC / model.NumS
    model.NumP = model.NumD / model.NumT
    model.NumQ = model.NumE / model.NumU
    context.Log("閾値計算実行")

} catch (e) {
    context.Log(e.stack)
}


