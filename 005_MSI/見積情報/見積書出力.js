const GRID_COLUMNS1 = ["ClassA","NumA","ClassB","NumB","DateA","DateB","DateC","DateD","ClassC","ClassD","ClassE","DateE","ClassF","DescriptionA","ClassG","ClassH","NumC","NumD","ClassI","NumE","ClassJ","NumF","ClassK","ClassL","NumG","NumH","ClassM","NumI","ClassN","NumJ","ClassO","ClassP","NumK","NumL","ClassQ","NumM","ClassR","NumN","ClassS","ClassT","NumO","NumP","ClassU","NumQ","ClassV","NumR","ClassW","ClassX","NumS","NumT","ClassY","NumU","ClassZ","NumV","Class001","Class002","NumW","NumX","Class003","NumY","Class004","NumZ","Class005","Class006","Num001","Num002","Class007","Num003","Class008","Num004","Class009","Class010","Num005","Num006","Class011","Num007","Class012","Num008","Class013","Class014","Num009","Num010","Class015","Num011","Class016","Num012","Class017","Class018","Num013","Num014","Class019","Num015","Class020","Num016","Class021","Class022","Num017","Num018","Class023","Num019","Class024","Num020","Class025","Class026","Num021","Num022","Class027","Num023","Class028","Num024","Class029","Class030","Num025","Num026","Class031","Num027","Class032","Num028","Class033","Class034","Num029","Num030","Class035","Num031","Class036","Num032","Class037","Class038","Num033","Num034","Class039","Num035","Class040","Num036","Class041","Class042","Num037","Num038","Class043","Num039","Class044","Num040","Class045","Class046","Num041","Num042","Class047","Num043","Class048","Num044","Class049","Class050","Num045","Num046","Class051","Num047","Class052","Num048","Class053","Class054","Num049","Num050","Class055","Num051","Class056","Num052","Class057","Class058","Num053","Num054","Class059","Num055","Class060","Num056","Class061","Class062","Num057","Num058","Class063","Num059","Class064","Num060","Class065","Class066","Num061","Num062","Class067","Num063","Class068","Num064","Class069","Class070","Num065","Num066","Class071","Num067","Class072","Num068","Class073","Class074","Num069","Num070","Class075","Num071","Class076","Num072","Class077","Class078","Num073","Num074","Class079","Num075","Class080","Num076"]
const GRID_COLUMNS2 = ["Class081","Class082","Num077","Num078","Class083","Num079","Class084","Num080","Class085","Class086","Num081","Num082","Class087","Num083","Class088","Num084","Class089","Class090","Num085","Num086","Class091","Num087","Class092","Num088","Class093","Class094","Num089","Num090","Class095","Num091","Class096","Num092","Class097","Class098","Num093","Num094","Class099","Num095","Class100","Num096","Class101","Class102","Num097","Num098","Class103","Num099","Class104","Num100","Class105","Class106","Num101","Num102","Class107","Num103","Class108","Num104","Class109","Class110","Num105","Num106","Class111","Num107","Class112","Num108","Class113","Class114","Num109","Num110","Class115","Num111","Class116","Num112","Class117","Class118","Num113","Num114","Class119","Num115","Class120","Num116","Class121","Class122","Num117","Num118","Class123","Num119","Class124","Num120","Class125","Class126","Num121","Num122","Class127","Num123","Class128","Num124","Class129","Class130","Num125","Num126","Class131","Num127","Class132","Num128","Class133","Class134","Num129","Num130","Class135","Num131","Class136","Num132","Class137","Class138","Num133","Num134","Class139","Num135","Class140","Num136","Class141","Class142","Num137","Num138","Class143","Num139","Class144","Num140","Class145","Class146","Num141","Num142","Class147","Num143","Class148","Num144","Class149","Class150","Num145","Num146","Class151","Num147","Class152","Num148","Class153","Class154","Num149","Num150","Class155","Num151","Class156","Num152","Class157","Class158","Num153","Num154","Class159","Num155","Class160","Num156","Class161","Class162","Num157","Num158","Class163","Num159","Class164","Num160","Class165","Class166","Num161","Num162","Class167","Num163","Class168","Num164","Class169","Class170","Num165","Num166","Class171","Num167","Class172","Num168","Class173","Class174","Num169","Num170","Class175","Num171","Class176","Num172","Class177","Class178","Num173","Num174","Class179","Num175","Class180","Num176"]
const GRID_COLUMNS3 = ["Class181","Class182","Num177","Num178","Class183","Num179","Class184","Num180","Class185","Class186","Num181","Num182","Class187","Num183","Class188","Num184","Class189","Class190","Num185","Num186","Class191","Num187","Class192","Num188","Class193","Class194","Num189","Num190","Class195","Num191","Class196","Num192","Class197","Class198","Num193","Num194","Class199","Num195","Class200","Num196","Class201","Class202","Num197","Num198","Class203","Num199","Class204","Num200","Class205","Class206","Num201","Num202","Class207","Num203","Class208","Num204","Class209","Class210","Num205","Num206","Class211","Num207","Class212","Num208","Class213","Class214","Num209","Num210","Class215","Num211","Class216","Num212","Class217","Class218","Num213","Num214","Class219","Num215","Class220","Num216","Class221","Class222","Num217","Num218","Class223","Num219","Class224","Num220","Class225","Class226","Num221","Num222","Class227","Num223","Class228","Num224","Class229","Class230","Num225","Num226","Class231","Num227","Class232","Num228","Class233","Class234","Num229","Num230","Class235","Num231","Class236","Num232","Class237","Class238","Num233","Num234","Class239","Num235","Class240","Num236","Class241","Class242","Num237","Num238","Class243","Num239","Class244","Num240","Class245","Class246","Num241","Num242","Class247","Num243","Class248","Num244","Class249","Class250","Num245","Num246","Class251","Num247","Class252","Num248","Class253","Class254","Num249","Num250","Class255","Num251","Class256","Num252","Class257","Class258","Num253","Num254","Class259","Num255","Class260","Num256"]

function downloadExcel() {
    $p.apiGet({
        'id': TABLE_ID_ORDER_CONTROL_BOOK,
        'data': {
            'View': {
                'ColumnFilterHash': {
                    "ClassA" : FORMAT_ID_ESTIMATION
                }
            }
        },
        'done': function (data) {
            console.log('通信が成功しました。');
            console.log(data.Response.Data);
            var res = data.Response.Data[0]
            console.log(JSON.parse(res.AttachmentsA)[0].Guid);
            getExcel(JSON.parse(res.AttachmentsA)[0].Guid, "見積書フォーマット")
        },
        'fail': function (error) {
            console.log('通信が失敗しました。');
            if (error.responseJSON.StatusCode !== 404) {
                console.log("データ取得に失敗しました");
            }
        },
        'always': function (data) {
            console.log('通信が完了しました。');
        }
    })
}

async function getApiData(gridColumns) {
    return $p.apiGet({
    'id': $p.id(),
    'data': {
    'View': {
    'ApiDataType': "KeyValues",
    'ApiColumnValueDisplayType': "DisplayValue",
    'GridColumns': gridColumns
    }
    },
    'done': function (data) {
    console.log('通信が成功しました。');
    console.log(data.Response.Data);
    var res = data.Response.Data
    return res
    }
    })
}

async function getExcel(guid, filename) {

    let res = await axios.get(SERVER_URL + "/binaries/" + guid + "/download", { responseType: "arraybuffer" });
    const data = new Uint8Array(res.data);
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(data);
    const worksheet = workbook.getWorksheet(TEMPLATE_SHEET_NAME);
    const settingsheet = workbook.getWorksheet(SETTING_SHEET_NAME);

    worksheet.name = filename
    workbook.removeWorksheet(settingsheet.id)

    res = {}
    const apiData1 = await getApiData(GRID_COLUMNS1);
    console.log(apiData1)
    Object.assign(res, apiData1.Response.Data[0]);

    const apiData2 = await getApiData(GRID_COLUMNS2);
    console.log(apiData2)
    Object.assign(res, apiData2.Response.Data[0]);

    const apiData3 = await getApiData(GRID_COLUMNS3);
    console.log(apiData3)
    Object.assign(res, apiData3.Response.Data[0]);

    worksheet.eachRow(function (row, rowNumber) {
    row.eachCell(function (cell, colNumber) {
    console.log(rowNumber + " : " + colNumber+ " " + cell.value);
    //if(x.match(/^\d+$/)){
    if (cell.value){
    if (cell.value.toString().match(/^\$\{.+\}$/) ){
    let deleteFlg = true
    for (let key in res) {
    console.log('key:' + key + ' value:' + res[key]);
    if (cell.value === "${" + key + "}") {
    deleteFlg = false
    console.log(rowNumber + " : " + colNumber)
    console.log(cell.value)
    console.log("TRUE")
    if ($p.getColumnName(key).substr(0, 4) === "Date" && res[key] !== "") {
    const date = new Date(res[key]);
    console.log(date.getTime())
    console.log(dateToSn(date.getTime()))
    cell.value = dateToSn(date.getTime())
    } else if ($p.getColumnName(key).substr(0, 5) === "Check") {
    cell.value = (res[key] === true ? "✔" : "")
    } else {
    cell.value = res[key]
    }
    break;
    }
    }
    if (deleteFlg) {
    cell.value = ""
    }
    }
    };
    });
    });
    outputXlsx(workbook, filename);
}

async function outputXlsx(workbook, filename) {

    const uint8Array = await workbook.xlsx.writeBuffer();
    console.log("uint8Array");
    console.log(uint8Array);
    const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + getNow() + `.xlsx`;
    a.click();
    a.remove()
}

function base642ab(base64) {
    const str = window.atob(base64);
    const len = str.length;
    const bytes = new Uint16Array(len);
    for (let i = 0; i < len; i++) {
    bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}

function dateToSn(unixTimeMillis) { // Date→シリアル値
    return (unixTimeMillis + 9 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000) + (70 * 365 + 17 + 1 + 1);
}

function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try {
    var blob = new Blob([buffer.buffer], {
    type: 'image/png'
    });
    } catch (e) {
    return false;
    }
    return blob;
}

function getNow() {
    var date = new Date();
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);

}
