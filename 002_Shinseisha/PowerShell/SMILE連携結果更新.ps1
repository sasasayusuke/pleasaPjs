Param(
    [Int] $formatLogId,
    [boolean] $errorFlg = $False
)
try{
    $now = Get-Date -Format "yyyy/MM/dd HH:mm:ss"
    $key = "503b75c454115189579d41958da552068703cc4692cc0dbca3ecbe1a94a57bcaae26c7a6cd9af2a1fe946649b17da6d57a2c2aba09068294c39e627187b46adf"
    $ver = "1.1"
    if ($errorFlg) {
        $status = "999"
    } else {
        $status = "900"
    }

    # 実行状況のレコード更新
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $formatLogId + "/update"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            ClassHash = @{
                ClassC = $status
            }
            DateHash = @{
                DateB = $now
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params
    $post
    if ($post.StatusCode -ne 200) {
        return 1
    }
    return 0
} catch {
    return 10
}