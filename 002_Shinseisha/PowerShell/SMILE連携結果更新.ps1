Param(
    [Int] $formatLogId,
    [boolean] $errorFlg = $False
)
try{
    $now = Get-Date -Format "yyyy/MM/dd HH:mm:ss"
    $key = "503b75c454115189579d41958da552068703cc4692cc0dbca3ecbe1a94a57bcaae26c7a6cd9af2a1fe946649b17da6d57a2c2aba09068294c39e627187b46adf"
    $ver = "1.1"

    # 作成書類ログを取得
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $formatLogId + "/get"
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

    $orderId = $post.Response.Data.ClassHash.ClassY

    # 発注管理を取得
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $orderId + "/get"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params

    if ($post.StatusCode -ne 200) {
        return 2
    }

    $orderSolveDate = $post.Response.Data.DateHash.DateG
    $moveOutSolveDate = $post.Response.Data.DateHash.DateH
    $moveInSolveDate = $post.Response.Data.DateHash.DateI
    $orderStatus = $post.Response.Data.Status

    if ($errorFlg) {
        $orderNextStatus = "999"
        $formatStatus = "999"
    } else {
        if ($orderStatus -eq 200) {
            $orderNextStatus = "900"
            $orderSolveDate = $now
        } elseif ($orderStatus -eq 400) {
            $orderNextStatus = "500"
            $moveOutSolveDate = $now
        } elseif ($orderStatus -eq 800) {
            $orderNextStatus = "900"
            $moveInSolveDate = $now
        }
        $formatStatus = "900"
    }

    # 作成書類のステータス更新
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $formatLogId + "/update"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            ClassHash = @{
                ClassC = $formatStatus
            }
            DateHash = @{
                DateA = $now
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params
    if ($post.StatusCode -ne 200) {
        return 3
    }

    # 発注管理のステータス更新
    $params = @{
        Uri = "https://shinseisha.sdt-autolabo.com/api/items/" + $orderId + "/update"
        Method = "POST"
        Body = @{
            ApiVersion = $ver
            ApiKey = $key
            Status = $orderNextStatus
            DateHash = @{
                DateG = $orderSolveDate
                DateH = $moveOutSolveDate
                DateI = $moveInSolveDate
            }
        } | ConvertTo-Json
        ContentType = 'application/json'
    }

    $post = Invoke-RestMethod @params
    if ($post.StatusCode -ne 200) {
        return 4
    }

    return 0
} catch {
    return 10
}