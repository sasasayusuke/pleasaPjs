
Param(
    [Int] $processId
)

    $now = Get-Date -Format "yyyy/MM/dd HH:mm:ss"
    $key = "503b75c454115189579d41958da552068703cc4692cc0dbca3ecbe1a94a57bcaae26c7a6cd9af2a1fe946649b17da6d57a2c2aba09068294c39e627187b46adf"
    $ver = "1.1"

    # テーブルID
    $TABLE_ID_STATUS_TABLE  = 1866564
    $TABLE_ID_STATUS_LOG    = 1866561

    # プロセスID
    #在庫数同期＆発注管理チケット作成
    $PROCESS_ID_ZAIKO_DOUKI_AND_TICKET  = 2225300
    #SMILE連携
    $PROCESS_ID_SMILE_RENKEI            = 1869923
    #月次出荷実績登録
    $PROCESS_ID_SHUKKA_JISSEKI_TOUROKU  = 1869927
    #仕入先マスタ同期
    $PROCESS_ID_SHIIRESAKI_DOUKI        = 1869926
    #商品マスタ同期
    $PROCESS_ID_SHOUHIN_DOUKI           = 1869925
    switch ($processId) {
        $PROCESS_ID_ZAIKO_DOUKI_AND_TICKET {
            ##$processTitle = "在庫数同期＆発注管理チケット作成"
        }
        $PROCESS_ID_SMILE_RENKEI {
            ##$processTitle = "SMILE連携"
        }
        $PROCESS_ID_SHUKKA_JISSEKI_TOUROKU {
            ##$processTitle = "月次出荷実績登録"
        }
        $PROCESS_ID_SHIIRESAKI_DOUKI {
            ##$processTitle = "仕入先マスタ同期"
        }
        $PROCESS_ID_SHOUHIN_DOUKI {
            ##$processTitle = "商品マスタ同期"
        } default {
            return 99
        }
    }

# 実行状況の実行中のレコードがないことを確認
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $TABLE_ID_STATUS_TABLE + "/get"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params

    if ($post.StatusCode -ne 200) {
        return 1
    }
    if ($post.Response.Data.CheckHash.CheckA.Contains($True)) {
        return 2
    }
# 実行ログの処理中のレコードがないことを確認
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $TABLE_ID_STATUS_LOG + "/get"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params

    if ($post.StatusCode -ne 200) {
        return 3
    }
    if ($post.Response.Data.ClassHash.ClassB.Contains("100")) {
        return 4
    }

# 実行状況のレコード更新
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $processId + "/update"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            ClassHash = @{
                ClassB = "1"
            }
            CheckHash = @{
                CheckA = $True
            }
            DateHash = @{
                DateA = $now
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params
    if ($post.StatusCode -ne 200) {
        return 5
    }

# 実行ログのレコード登録
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $TABLE_ID_STATUS_LOG + "/create"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            ClassHash = @{
                ClassA = $processId
                ClassB = "100"
                ClassC = "1"
            }
            DateHash = @{
                DateA = $now
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params

    if ($post.StatusCode -ne 200) {
        return 6
    }
    return $post.Id
