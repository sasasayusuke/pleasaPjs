// 年間営業日数
const YEAR_SALE_DAYS = 240
const getsu = 12
try{
    // 発注点 = 年間出荷実績 * リードタイム(いったん30) / 年間営業日数
    model.NumQ = model.NumM * 30 / YEAR_SALE_DAYS
    model.NumR = model.NumN * 30 / YEAR_SALE_DAYS
    model.NumS = model.NumO * 30 / YEAR_SALE_DAYS
    model.NumT = model.NumP * 30 / YEAR_SALE_DAYS
    // 発注まで = 在庫数量 - 発注点
    model.NumU = model.ClassB - model.NumQ
    model.NumV = model.ClassC - model.NumR
    model.NumW = model.ClassD - model.NumS
    model.NumX = model.ClassE - model.NumT
    // 1か月分在庫 = 年間出荷実績 / 出荷実績月数
    model.NumE = model.NumM / getsu
    model.NumF = model.NumN / getsu
    model.NumG = model.NumO / getsu
    model.NumH = model.NumP / getsu
    // 3か月分在庫 = 年間出荷実績 * 3 / 出荷実績月数
    model.NumI = model.NumM * 3 / getsu
    model.NumJ = model.NumN * 3 / getsu
    model.NumK = model.NumO * 3 / getsu
    model.NumL = model.NumP * 3 / getsu
    // 残月 = 在庫数量 / 1か月分在庫
    model.NumA = model.ClassB / model.NumE
    model.NumB = model.ClassC / model.NumF
    model.NumC = model.ClassD / model.NumG
    model.NumD = model.ClassE / model.NumH
} catch (e) {
    context.Log(e.stack);
}


