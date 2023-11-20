Imports System.Text.RegularExpressions
Imports System.IO
Imports System.Xml
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
            MessageBox.Show("Error: " & ex.Message, "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
        End Try
    End Function

    ' 既知のSSIDを取得する関数
    Public Shared Function GetKnownWiFi() As List(Of String)
        Dim ssidList As New List(Of String)
        Dim output As String = ExecuteCommand("netsh wlan show profiles")

        Dim lines As String() = output.Split(New String() {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
        ' SSIDを抽出します
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
    Public Shared Function GetCurrentSSID() As String
        Dim output As String = ExecuteCommand("netsh wlan show interfaces")
        Dim lines As String() = output.Split(New String() {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
        Dim currentSSID As String = String.Empty

        For Each line In lines
            If line.Contains("SSID") AndAlso Not line.Contains("BSSID") Then
                ' SSID行からSSID名を取得します。
                Dim parts As String() = line.Split(New String() {":"}, StringSplitOptions.RemoveEmptyEntries)
                If parts.Length > 1 Then
                    currentSSID = parts(1).Trim()
                    Exit For
                End If
            End If
        Next

        Return currentSSID
    End Function

    ' パネルに接続中SSIDを表示する関数
    Public Shared Sub AddControlsToPanel(ByVal panel As Panel)
        ' 利用可能なWi-FiネットワークのSSIDを取得します。
        Dim ssid As String = GetCurrentSSID()
        Dim nextControlTop As Integer = 10

    End Sub

    ' IPアドレスのバリデーション
    Public Shared Function IsValidIpAddress(ipAddress As String) As Boolean

        ' 未入力状態の場合
        If Regex.IsMatch(ipAddress, "^[ .]*$") Then
            Return True
        End If

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

    ' XML書込
    Public Shared Sub WriteToXmlFile(key As String, value As String)
        Dim doc As New XmlDocument()

        ' XMLドキュメントのルート要素を作成
        Dim root As XmlElement = doc.CreateElement("Settings")
        doc.AppendChild(root)

        ' キーと値の要素を追加
        Dim settingElement As XmlElement = doc.CreateElement("Setting")
        settingElement.SetAttribute("Key", key)
        settingElement.InnerText = value
        root.AppendChild(settingElement)

        ' XMLファイルに書き込む
        doc.Save(Constants.APP_PATH)
    End Sub

    ' XML読込
    Public Shared Function ReadFromXmlFile(section As String, key As String) As String
        ' XmlDocumentインスタンスを作成し、ファイルを読み込む
        Dim doc As New XmlDocument()
        doc.Load(Constants.APP_PATH)

        ' XPathを使用して特定のセクションとキーに対応ノードを検索
        Dim node As XmlNode = doc.SelectSingleNode($"//{section}/{key}")

        ' 該当が見つかった場合はそのテキストを返す
        If node IsNot Nothing Then
            Return node.InnerText.Trim()
        End If

        ' 該当が見つからなかった場合は空の文字列を返す
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
