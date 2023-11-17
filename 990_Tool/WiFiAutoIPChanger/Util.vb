Imports System.Diagnostics
Imports System.IO

Public Class Util

    ' コマンドプロンプトでコマンドを実行する関数
    Public Shared Function ExecuteCommand(command As String) As String
        Try
            Using process As New Process()
                process.StartInfo.FileName = "cmd.exe"
                process.StartInfo.Arguments = "/c " & command
                process.StartInfo.RedirectStandardOutput = True
                process.StartInfo.UseShellExecute = False
                process.StartInfo.CreateNoWindow = True
                process.Start()

                Dim output As String = process.StandardOutput.ReadToEnd()
                process.WaitForExit()

                Return output
            End Using
        Catch ex As Exception
            Return "Error: " & ex.Message
        End Try
    End Function

    ' 既知のSSIDを取得する関数
    Public Shared Function GetKnownWiFi() As List(Of String)
        Dim ssidList As New List(Of String)
        Dim output As String = ExecuteCommand("netsh wlan show profiles")

        Dim lines As String() = output.Split(New String() {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
        For Each line In lines
            If line.Contains("すべてのユーザー プロファイル") Then
                ' SSID行からSSID名を取得します。
                Dim ssid As String = line.Split(New String() {":"}, StringSplitOptions.RemoveEmptyEntries)(1).Trim()

                If Not ssid = "" Then ssidList.Add(ssid)
            End If
        Next

        Return ssidList
    End Function


    ' 利用可能なSSIDを取得する関数 → 現在使用中のSSIDを取得
    Public Shared Function GetAvailableNetworkSSIDs() As List(Of String)
        Dim ssidList As New List(Of String)
        Dim output As String = ExecuteCommand("netsh wlan show networks")

        Dim lines As String() = output.Split(New String() {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
        For Each line In lines
            If line.Contains("SSID") AndAlso Not line.Contains("BSSID") Then
                ' SSID行からSSID名を取得します。
                Dim ssid As String = line.Split(New String() {":"}, StringSplitOptions.RemoveEmptyEntries)(1).Trim()
                ssidList.Add(ssid)
            End If
        Next

        Return ssidList
    End Function

    ' パネルに接続中SSIDを表示する関数
    Public Shared Sub AddControlsToPanel(ByVal panel As Panel)
        ' 利用可能なWi-FiネットワークのSSIDを取得します。
        Dim ssids As List(Of String) = GetAvailableNetworkSSIDs()
        Dim nextControlTop As Integer = 10

        ' SSIDごとにラベルを生成し、パネルに追加します。
        For Each ssid As String In ssids
            Dim newLabel As New Label()
            newLabel.Text = ssid
            newLabel.AutoSize = True
            newLabel.Location = New Point(10, nextControlTop)
            panel.Controls.Add(newLabel)
            nextControlTop += newLabel.Height + 5  ' 次のコントロールのためにスペースを追加します。
        Next
    End Sub

    ' IPアドレスのバリデーションメソッド
    Public Shared Function IsValidIpAddress(ipAddress As String) As Boolean
        Dim parts As String() = ipAddress.Split("."c)

        ' IPアドレスが4つの部分から構成されているか確認
        If parts.Length <> 4 Then
            Return False
        End If

        ' 各部分が0から255の範囲にあるか確認
        For Each part In parts
            Dim num As Integer
            If Not Integer.TryParse(part, num) OrElse num < 0 OrElse num > 255 Then
                Return False
            End If
        Next

        Return True
    End Function

    ' INI書込
    Sub WriteToIniFile(filePath As String, section As String, key As String, value As String)
        Using writer As New StreamWriter(filePath, True)
            writer.WriteLine($"[{section}]")
            writer.WriteLine($"{key}={value}")
        End Using
    End Sub

    ' INI読込
    Function ReadFromIniFile(filePath As String, section As String, key As String) As String
        Dim lines As String() = File.ReadAllLines(filePath)

        Dim sectionFound As Boolean = False
        For Each line As String In lines
            If line.Trim() = $"[{section}]" Then
                sectionFound = True
            ElseIf sectionFound AndAlso line.StartsWith($"{key}=") Then
                Return line.Substring(line.IndexOf("=") + 1).Trim()
            End If
        Next

        Return String.Empty
    End Function

    ' 現在接続中のWiFi確認
    ' WiFi情報の取得
    ' 前回のSSID
    ' 現在のSSID

    ' 変更がある場合
    ' IPの付け替え（無線ありの場合）
    ' 無線にSSIDに応じたIPを付与
    ' 会社のIPを使用するSSIDの場合には、有線のIPを削除
    ' 会社のIPを使用しないSSIDの場合には、有線に会社IPを付与

    ' IPの付け替え（無線なしの場合）
    ' 有線に会社IPを付与


    ' 変更がない場合
    ' 終了


End Class
