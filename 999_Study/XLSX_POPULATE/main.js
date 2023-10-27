(function() {
    "use strict";

    const FORMAT_APP_ID = "67";            // フォーマット添付用アプリID
    const SETTING_SHEET_NAME = "Setting"   // Settingシート名
    const TEMP_SHEET_NAME = "Temp"         // Tempシート名
    // ダウンロードボタン表示イベント
    const setDownloadButtonEvent = [
        'app.record.detail.show',          // 詳細画面(PC)
        'mobile.app.record.detail.show',   // 詳細画面(モバイル)
    ];
    // インポートボタン表示イベント
    const setImportButtonEvent = [
        'app.record.edit.show',            // 編集画面(PC)
        'mobile.app.record.edit.show',     // 編集画面(モバイル)
        'app.record.create.show',          // 新規画面(PC)
        'mobile.app.record.create.show'    // 新規画面(モバイル)
    ];
    // ダウンロードボタン表示
    kintone.events.on(setDownloadButtonEvent, function(event) {
        setDownloadButton()
    });
    // インポートボタン表示
    kintone.events.on(setImportButtonEvent, function(event) {
        setImportButton()
    });

    let fields = null;
    // フィールドコード取得
    async function getFieldCodeByFieldName(targetFieldName) {
        // 初回のAPI呼び出しが行われていない場合、APIを呼び出してデータを取得
        if (!fields) {
            await getFields();
        }
        // フィールド情報をループしてフィールド名とコードを照合
        for (let code in fields) {
            // console.log(code)
            if (fields.hasOwnProperty(code) && fields[code].label === targetFieldName) {
                return code
            }
        }
        return null;
    }

    // フィールド情報取得
    async function getFields(){
        const body = {
            app: getId()
        };
        const resp =  await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', body);
        fields = resp.properties
    }
    
    // ダウンロードボタン表示処理
    async function setDownloadButton() {
        // スペースを取得
        const space = getSpaceElement('clr_button');
        // divを作成
        const div = document.createElement("div");
        div.classList.add("control-gaia");
        // セレクトボックスを作成
        const selectBox = document.createElement("select");
        selectBox.id = "downloadFormat";
        selectBox.name = "downloadFormat";
        selectBox.style.margin = "4px 8px 4px 0px";
        selectBox.style.width = "300px";
        // フォーマット添付用アプリを検索
        const params = {
            "app": FORMAT_APP_ID,
            "query": '表示対象アプリID = ' + getId() + " order by 並び順 asc"
        }
        const resp = await kintone.api('/k/v1/records', 'GET', params)
        const formatData = resp.records
        // セレクトリストを設定
        for (let i = 0; i < formatData.length; i++) {
            const option = document.createElement("option");
            option.value = formatData[i].$id.value;
            option.text = formatData[i].dispname.value;
            selectBox.appendChild(option);
        }
        // ボタンを作成
        const button = document.createElement('button');
        button.innerText = 'ダウンロード';
        button.className = 'btn_css';
        button.onclick = function(){
            downloadExcelFile();
        }
        // ラベルを作成
        const label = document.createElement("label");
        label.setAttribute("for", "downloadFormat");
        label.textContent = "ヒアリングシートフォーマット： ";
        label.style.padding = "0";
        // divを設定
        div.appendChild(label);
        div.appendChild(selectBox);
        div.appendChild(button);
        // スペースに追加
        space.appendChild(div);
    }

    // インポートボタン表示処理
    async function setImportButton() {
        // スペースを取得
        const space = getSpaceElement('clr_button');
        // divを作成
        const div = document.createElement("div");
        div.classList.add("control-gaia");
        // ボタンを作成
        const button = document.createElement('button');
        button.innerText = 'インポート';
        button.className = 'btn_css';
        button.onclick = function(){
            importExcelFile();
        }
        // divを設定
        div.appendChild(button);
        // スペースに追加
        space.appendChild(div);
    }

    // インポートボタン押下時処理
    async function importExcelFile() {
        // ファイル添付フィールドを作成
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
            
        // ファイルが選択されたときの処理
        fileInput.addEventListener('change', function(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                const confirmResult = window.confirm('ファイルを取り込みますか？');
                if (confirmResult) {
                    const fileReader = new FileReader();
                    fileReader.onload = async function(e) {
                        let workbook = null;
                        try {
                            const data = new Uint8Array(e.target.result);
                            workbook = await XlsxPopulate.fromDataAsync(data);
                        } catch(e) {
                            console.log(e);
                            alert("ファイルのオープンに失敗しました。ファイルの形式が正しくありません。");
                            return false;
                        }
                        // Settingシートが存在しない場合はエラー
                        if (!workbook.sheet(SETTING_SHEET_NAME)) {
                            alert("フォーマットファイルにSettingシートが存在しないため、ファイルが編集できませんでした。");
                            return false;
                        }
                        
                        // レコード編集
                        const result = await editRecored(workbook);
                    
                        // const fileContent = event.target.result;
                        // console.log('ファイルの内容:');
                        // console.log(fileContent);
                        if (result) alert("ファイルの取り込みが完了しました。\n内容を確認して保存ボタンをクリックしてください。");
                    };
                    fileReader.readAsArrayBuffer(selectedFile);
                }
            }
        });
        // ファイル選択ダイアログを表示
        fileInput.click();
    }

    async function getBlobData(fileKey){
        // 添付ファイルを取得
        const headers = {
            'X-Requested-With': 'XMLHttpRequest',
        };
        const resp = await fetch(`/k/v1/file.json?fileKey=${fileKey}`, {
            method: 'GET',
            headers,
        });
        const blob = await resp.blob();
        return resp.status === 200 ? blob : null;
    }


    async function getFormatData(recordId){
        try {
            const body = {
                app: FORMAT_APP_ID,
                id: recordId
            }; 
            const record = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body);
            const fileKey = record.record.file.value[0].fileKey
            const filename = record.record.filename.value
            // 添付ファイルを取得
            const headers = {
                'X-Requested-With': 'XMLHttpRequest',
            };
            const resp = await fetch(`/k/v1/file.json?fileKey=${fileKey}`, {
                method: 'GET',
                headers,
            });
            const blob = await resp.blob();
            return resp.status === 200 ? {blob: blob, filename: filename} : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // ファイルダウロード処理
    async function downloadExcelFile() {
        // ダウンロードフォーマットを取得
        const downloadFormat = document.getElementById("downloadFormat")
        const formatRecordId = downloadFormat.value
        if (!formatRecordId) {
            alert('フォーマットが見つかりませんでした。');
            return false;
        }
        const formatData = await getFormatData(formatRecordId)
        if (!formatData) {
            alert('フォーマットのダウンロードに失敗しました。');
            return false;
        }
        // BlobファイルをXlsxPopulateで開く
        let workbook = null;
        try {
            workbook = await XlsxPopulate.fromDataAsync(formatData.blob);
        } catch(e) {
            console.log(e);
            alert("フォーマットファイルのオープンに失敗しました。ファイルの形式が正しくありません。");
            return false;
        }
        // Settingシートが存在しない場合はエラー
        if (!workbook.sheet(SETTING_SHEET_NAME)) {
            alert("フォーマットファイルにSettingシートが存在しないため、ファイルが編集できませんでした。");
            return false;
        }
    
        // workbookを編集
        workbook = await editWorkbook(workbook)    

        // ファイルをダウンロード
        workbook.outputAsync()
        .then(async function(blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const downloadFileName = await getDownloadFileName(formatData.filename);
            a.href = url;
            a.download = downloadFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    async function getDownloadFileName(filename) {
        let downloadFilename = filename
        const replaceFields = extractBracketsContent(filename)
        const current = getRecord();
        for (const item of replaceFields){
            const filedCode = await getFieldCodeByFieldName(item)
            const filed = current.record[filedCode]
            if (filed) {
                downloadFilename = downloadFilename.replace(`[[${item}]]`, filed.value);
            }
        }
        return downloadFilename;
    }

    function extractBracketsContent(inputString) {
        const regex = /\[\[([^\]]+)\]\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(inputString)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    }

    function getSettings(settingSheet) {
        // ハッシュを初期化
        const hash = {};
        // Settingシートの行を順番に処理
        let rowIndex = 2; // 1行目はヘッダなので2行目から開始
        while (true) {
            const filedCodeValue = settingSheet.cell(`A${rowIndex}`).value();
            const sheetNameValue = settingSheet.cell(`B${rowIndex}`).value();
            const cellNameValue = settingSheet.cell(`C${rowIndex}`).value();
            const optionsValue = settingSheet.cell(`D${rowIndex}`).value();
            const prefix = settingSheet.cell(`E${rowIndex}`).value();
            const suffix = settingSheet.cell(`F${rowIndex}`).value();
            rowIndex++;
            if (!filedCodeValue) {
                // A列が空ならループ終了
                break;
            }
            if (!sheetNameValue || !cellNameValue) {
                // B列またはC列が空ならスキップ
                continue;
            }
            const options = {};
            if (optionsValue) {
                if (hasNewline(optionsValue)) {
                    // 改行文字で分割して行ごとに配列を作成
                    const lines = optionsValue.split('\r\n');
                    // 各行を処理
                    for (const line of lines) {
                        const [key, value] = line.split(',');
                        options[key] = value;
                    }    
                } else {
                    options[true] = optionsValue;
                }
            }
            const value = {
                "sheetName" : sheetNameValue,
                "cellName" : cellNameValue,
                "options" : options,
                "prefix" : prefix,
                "suffix" : suffix,
            }
            if (hash.hasOwnProperty(filedCodeValue)) {
                // すでにキーが存在する場合は、valueに追加する
                if (!Array.isArray(hash[filedCodeValue])) {
                    hash[filedCodeValue] = [hash[filedCodeValue]];
                }
                hash[filedCodeValue].push(value);
            } else {
                hash[filedCodeValue] = value;
            }
        }
        return hash;
    }

    async function editRecored(workbook) {
        // レコード情報を取得
        const current = getRecord();
        // Settingシートの情報を取得
        const settings = getSettings(workbook.sheet(SETTING_SHEET_NAME));
        // Settingシート情報でループ
        let rowIndex = 1;
        for (const [key, value] of Object.entries(settings)) {
            try {
                const filedCode = await getFieldCodeByFieldName(key)
                if (filedCode) {
                    if (Array.isArray(value)) {
                        let fieldValues = [];
                        for (const element of value) {
                            const cellValue = workbook.sheet(element.sheetName).cell(element.cellName).value()
                            const fieldValue = editFieldValue(element.options, cellValue, element.prefix, element.suffix)
                            if (fieldValue) fieldValues.push(fieldValue);
                        }
                        current.record[filedCode].value = fieldValues
                    } else {
                        const cellValue = workbook.sheet(value.sheetName).cell(value.cellName).value()
                        const fieldValue = editFieldValue(value.options, cellValue, value.prefix, value.suffix)
                        current.record[filedCode].value = fieldValue
                    }
                }
            } catch(e) {
                console.log(e);
                alert(`レコードの編集に失敗しました。（フィールド名：${key}）`)
                return false;
            }
        }
        setRecord(current);
        return true
    }

    async function editWorkbook(workbook) {
        // レコード情報を取得
        const current = getRecord();
        // Tempシートを追加
        workbook = addTempSheet(workbook);
        // Settingシートの情報を取得
        const settings = getSettings(workbook.sheet(SETTING_SHEET_NAME));
        // Settingシート情報でループ
        let rowIndex = 1;
        for (const [key, value] of Object.entries(settings)) {
            const filedCode = await getFieldCodeByFieldName(key)
            if (filedCode) {
                const filed = current.record[filedCode]
                const filedValue = filed.value;
                if (Array.isArray(value)) {
                    for (const element of value) {
                        workbook.sheet(TEMP_SHEET_NAME).cell(`A${rowIndex}`).value(element.sheetName)
                        workbook.sheet(TEMP_SHEET_NAME).cell(`B${rowIndex}`).value(element.cellName)
                        if (Array.isArray(filedValue)) {
                            workbook.sheet(TEMP_SHEET_NAME).cell(`C${rowIndex}`).value(filedValue.includes(element.options[true]))
                        } else {
                            workbook.sheet(TEMP_SHEET_NAME).cell(`C${rowIndex}`).value(filedValue === (element.options[true]))
                        }
                        rowIndex++;
                    }
                } else {
                    workbook.sheet(TEMP_SHEET_NAME).cell(`A${rowIndex}`).value(value.sheetName)
                    workbook.sheet(TEMP_SHEET_NAME).cell(`B${rowIndex}`).value(value.cellName)
                    workbook.sheet(TEMP_SHEET_NAME).cell(`C${rowIndex}`).value(editCellValue(value.options, filedValue, value.prefix, value.suffix))
                    rowIndex++;
                }
            }
        }
        return workbook;
    }

    // 新しい一時シートを追加する関数
    function addTempSheet(workbook) {
        // 既存の一時シートを削除
        const existingSheet = workbook.sheet(TEMP_SHEET_NAME);
        if (existingSheet) {
            existingSheet.delete();
        }
        // 新しい一時シートを追加
        workbook.addSheet(TEMP_SHEET_NAME);
        return workbook;
    }

    // セルの値を編集する関数
    function editCellValue(options, value, prefix, suffix) {
        if (Object.keys(options).length === 0) {
            let retValue = value;
            if (prefix) retValue = prefix + retValue;
            if (suffix) retValue = retValue + suffix;
            return retValue;
        } else {
            for (const key in options) {
                if (options.hasOwnProperty(key) && options[key] === value) {
                    return key;
                }
            }
            return 0;
        }
    }
    
    // フィールドの値を編集する関数
    function editFieldValue(options, value, prefix, suffix) {
        if (Object.keys(options).length === 0) {
            let retValue = value;
            if (prefix) retValue = removePrefix(retValue, prefix);
            if (suffix) retValue = removeSuffix(retValue, suffix);
            return retValue;
        } else {
            if (value in options) {
                return options[value];
            } else {
                return null;
            }
        }
    }

    // 文字列の先頭から指定のプレフィックスを削除する関数
    function removePrefix(inputString, prefixToRemove) {
        if (typeof(inputString) !== "string") return inputString;
        if (inputString.startsWith(prefixToRemove)) {
            return inputString.substring(prefixToRemove.length);
        } else {
            return inputString;
        }
    }

    // 文字列の末尾から指定のサフィックスを削除する関数
    function removeSuffix(inputString, suffixToRemove) {
        if (typeof(inputString) !== "string") return inputString;
        if (inputString.endsWith(suffixToRemove)) {
            return inputString.substring(0, inputString.length - suffixToRemove.length);
        } else {
            return inputString;
        }
    } 

    // 文字列内に改行が存在するかチェックする関数
    function hasNewline(str) {
        // 改行を検索する正規表現
        const regex = /[\r\n]/;
        return regex.test(str);
    }

    // アプリのIDを取得する関数
    function getId() {
        if (isMobile()) {
            return kintone.mobile.app.getId();
        } else {
            return kintone.app.getId();
        }
    }

    // スペース要素を取得する関数
    function getSpaceElement(element) {
        if (isMobile()) {
            return kintone.mobile.app.record.getSpaceElement(element);
        } else {
            return kintone.app.record.getSpaceElement(element);
        }
    }

    // レコード情報を取得する関数
    function getRecord() {
        if (isMobile()) {
            return kintone.mobile.app.record.get();
        } else {
            return kintone.app.record.get();
        }
    }

    // レコード情報を設定する関数
    function setRecord(record) {
        if (isMobile()) {
            kintone.mobile.app.record.set(record);
        } else {
            kintone.app.record.set(record);
        }
    }

    // モバイル環境かどうかを判定する関数
    function isMobile(eventType) {
        if (eventType) {
            return /^mobile\./.test(eventType);
        }
        return kintone.app.getId() === null;
    };

})();


