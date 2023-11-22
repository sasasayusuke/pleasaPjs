Imports System.Text.RegularExpressions
Imports System.Xml
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


    ' 現在接続中のSSIDを取得
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

    ' パネルに割り当て対象アドレスを表示する関数
    Public Shared Sub AddControlsToPanel(ByVal panel As Panel, Optional ipAddress As String = "", Optional subnetMask As String = "", Optional gateway As String = "", Optional primaryDNS As String = "", Optional secondaryDNS As String = "", Optional remark As String = "")
        ' パネルの既存のコントロールをクリア
        panel.Controls.Clear()

        Dim left = 10
        Dim height = 10

        ' IPアドレスのラベルを追加
        If Not String.IsNullOrEmpty(ipAddress) Then
            Dim lbl As New Label()
            lbl.Text = "IPアドレス :" & ipAddress
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If

        ' サブネットマスクのラベルを追加
        If Not String.IsNullOrEmpty(subnetMask) Then
            Dim lbl As New Label()
            lbl.Text = "サブネット マスク :" & subnetMask
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If

        ' ゲートウェイのラベルを追加
        If Not String.IsNullOrEmpty(gateway) Then
            Dim lbl As New Label()
            lbl.Text = "デフォルト ゲートウェイ :" & gateway
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If

        ' 優先 DNS サーバ のラベルを追加
        If Not String.IsNullOrEmpty(primaryDNS) Then
            Dim lbl As New Label()
            lbl.Text = "優先 DNS サーバ :" & primaryDNS
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If

        ' 代替 DNS サーバのラベルを追加
        If Not String.IsNullOrEmpty(secondaryDNS) Then
            Dim lbl As New Label()
            lbl.Text = "代替 DNS サーバ :" & secondaryDNS
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If

        ' 備考のラベルを追加
        If Not String.IsNullOrEmpty(secondaryDNS) Then
            Dim lbl As New Label()
            lbl.Text = "備考 :" & secondaryDNS
            lbl.Location = New Point(left, height)
            height += 30
            panel.Controls.Add(lbl)
        End If
    End Sub

    ' IPアドレスを設定する関数
    Public Shared Sub SetStaticIPAddress(interfaceName As String, ipAddress As String, subnetMask As String, gateway As String)
        Dim setIPCommand As String = $"netsh interface ip set address name=""{interfaceName}"" static {ipAddress} {subnetMask} {gateway}"
        ExecuteCommand(setIPCommand)
    End Sub

    ' DNSを設定する関数
    Public Shared Sub SetStaticDNS(interfaceName As String, primaryDNS As String, Optional secondaryDNS As String = "")
        Dim setPrimaryDNSCommand As String = $"netsh interface ip set dns name=""{interfaceName}"" static {primaryDNS}"
        ExecuteCommand(setPrimaryDNSCommand)

        If Not String.IsNullOrEmpty(secondaryDNS) Then
            Dim setSecondaryDNSCommand As String = $"netsh interface ip add dns name=""{interfaceName}"" {secondaryDNS} index=2"
            ExecuteCommand(setSecondaryDNSCommand)
        End If
    End Sub

    Public Shared Function ConvertIpAddressFormat(ipAddress As String) As String
        ' IPアドレスをドットで分割
        Dim parts As String() = ipAddress.Replace(" ", "").Split("."c)
        ' 未入力状態の場合
        If Regex.IsMatch(ipAddress, "^[.0]*$") Then
            Return Constants.EMPTY_IP_ADDRESS
        End If

        ' 各部分を3桁の左ゼロ詰めに変換
        For i As Integer = 0 To parts.Length - 1
            parts(i) = parts(i).PadLeft(3, " "c)
        Next

        ' 変換された部分をドットで結合して返す
        Return String.Join(".", parts)
    End Function

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
    Public Shared Sub WriteValueToXml(section As String, sectionKey As String, key As String, value As String)
        Dim doc As New XmlDocument()

        ' ファイルが存在する場合は読み込む
        If File.Exists(Constants.APP_PATH) Then
            doc.Load(Constants.APP_PATH)
        Else
            ' ファイルが存在しない場合は新しいルート要素を作成
            Dim root As XmlElement = doc.CreateElement(Constants.SETTING_SECTION)
            doc.AppendChild(root)
        End If

        ' セクションを検索し、存在しない場合は作成
        Dim sectionElement As XmlElement = CType(doc.SelectSingleNode($"//{section}[@Key='{sectionKey}']"), XmlElement)
        If sectionElement Is Nothing Then
            sectionElement = doc.CreateElement(section)
            sectionElement.SetAttribute("Key", sectionKey)
            doc.DocumentElement.AppendChild(sectionElement)
        End If

        ' キーと値の要素を追加または更新
        Dim settingElement As XmlElement = CType(sectionElement.SelectSingleNode($"{Constants.SETTING_TAG}[@Key='{key}']"), XmlElement)
        If settingElement IsNot Nothing Then
            ' 既存の要素の値を更新
            settingElement.InnerText = value
        Else
            ' 新しい要素を作成して追加
            settingElement = doc.CreateElement(Constants.SETTING_TAG)
            settingElement.SetAttribute("Key", key)
            settingElement.InnerText = value
            sectionElement.AppendChild(settingElement)
        End If

        ' XMLファイルに書き込む
        doc.Save(Constants.APP_PATH)
    End Sub


    ' XML読込
    Public Shared Function ReadValueFromXml(section As String, sectionKey As String, key As String) As String
        ' XmlDocumentインスタンスを作成し、ファイルを読み込む
        Dim doc As New XmlDocument()
        doc.Load(Constants.APP_PATH)

        ' キーに対応するノードを検索
        Dim xpath As String = $"//{Constants.SETTING_SECTION}/{section}[@Key='{sectionKey}']/{Constants.SETTING_TAG}[@Key='{key}']"
        Dim node As XmlNode = doc.SelectSingleNode(xpath)

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
