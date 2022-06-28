Param(
    [Int] $processId,
    [Int] $logId,
    [string] $logMessage = "",
    [boolean] $errorFlg = $False
)

Add-Type -AssemblyName "System.Web"
$error.Clear()

trap [Net.WebException] { continue; }
try{
    $now = Get-Date -Format "yyyy/MM/dd HH:mm:ss"
    $key = "503b75c454115189579d41958da552068703cc4692cc0dbca3ecbe1a94a57bcaae26c7a6cd9af2a1fe946649b17da6d57a2c2aba09068294c39e627187b46adf"
    $ver = "1.1"

    if ($errorFlg) {
        $status = "999"
    } else {
        $status = "900"
    }
    # プロセスID
    #在庫数同期＆発注管理チケット作成
    $PROCESS_ID_ZAIKO_DOUKI_AND_TICKET  = 1869924
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

    # 実行ログのレコード更新
    $Uri = "https://shinseisha.sdt-autolabo.com/api/items/"+ $logId +"/update"
    $Method = "POST"
    $json = @{
        ApiVersion = $ver
        ApiKey = $key
        ClassHash = @{
            ClassB = $status
        }
        DateHash = @{
            DateB = $now
        }
        DescriptionHash = @{
            DescriptionA = $logMessage
        }
    }


    $requestBody = $json | ConvertTo-Json -Depth 2

    $convertBody = [System.Text.Encoding]::UTF8.GetBytes($requestBody)

    $post = Invoke-RestMethod -Uri $Uri -ContentType "application/json" -Method $Method -Body ${convertBody}

    if ($post.StatusCode -ne 200) {
        return 1
    }

    # 実行状況のレコード更新
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $processId + "/update"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            ClassHash = @{
                ClassB = ""
            }
            CheckHash = @{
                CheckA = $False
            }
            DateHash = @{
                DateA = "1899-12-30T00:00:00"
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params
    if ($post.StatusCode -ne 200) {
        return 2
    }
    return 0
} catch {
    return 10
}