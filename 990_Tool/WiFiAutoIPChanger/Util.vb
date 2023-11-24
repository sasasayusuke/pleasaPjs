﻿Imports System.Text.RegularExpressions
Imports System.Xml
Imports System.IO

Public Class NetworkSettings
    Public Property autoObtainIP As Boolean
    Public Property autoObtainDNS As Boolean
    Public Property ipAddress As String
    Public Property subnetMask As String
    Public Property gateway As String
    Public Property primaryDNS As String
    Public Property secondaryDNS As String
    Public Property remark As String
End Class

Public Class Util

    Public Shared Function GetNetworkSettings(ByVal ssid As String) As NetworkSettings
        Try
            Dim networkSettings As New NetworkSettings()
            networkSettings.remark = ssid & vbCrLf & vbCrLf

            networkSettings.ipAddress = ""
            networkSettings.subnetMask = ""
            networkSettings.gateway = ""
            networkSettings.primaryDNS = ""
            networkSettings.secondaryDNS = ""

            networkSettings.autoObtainIP = False
            networkSettings.autoObtainDNS = False

            ' 会社のIP情報を使う をチェックしていた場合
            If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "CheckSpecificCompanyIP")) Then
                networkSettings.remark += "会社のIP情報を使う。" & vbCrLf
                networkSettings.ipAddress = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxIPAddress")
                networkSettings.subnetMask = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSubnet")
                networkSettings.gateway = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxGateway")
                networkSettings.primaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxPrimaryDNS")
                networkSettings.secondaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSecondaryDNS")
            Else
                networkSettings.autoObtainIP = Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "RadioAutoObtainIP"))
                networkSettings.autoObtainDNS = Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "RadioAutoObtainDNS"))

                If networkSettings.autoObtainIP Then
                    ' IPアドレスを自動的に取得する をチェックしていた場合
                    networkSettings.remark += "IPアドレスを自動的に取得する。" & vbCrLf
                Else
                    ' 次のIPアドレスを使う をチェックしていた場合
                    networkSettings.remark += "次のIPアドレスを使う。" & vbCrLf
                    networkSettings.ipAddress = Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "MaskedTextBoxIPAddress")
                    networkSettings.subnetMask = Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "MaskedTextBoxSubnet")
                    networkSettings.gateway = Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "MaskedTextBoxGateway")
                End If

                If networkSettings.autoObtainDNS Then
                    ' DNSサーバのアドレスを自動的に取得する をチェックしていた場合
                    networkSettings.remark += "DNSサーバのアドレスを自動的に取得する。" & vbCrLf
                Else
                    ' 次のDNSサーバのアドレスを使う をチェックしていた場合
                    networkSettings.remark += "次のDNSアドレスを使う。" & vbCrLf
                    networkSettings.primaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "MaskedTextBoxPrimaryDNS")
                    networkSettings.secondaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, ssid, "MaskedTextBoxSecondaryDNS")
                End If
            End If
            Return networkSettings

        Catch ex As Exception
            Dim networkSettings As New NetworkSettings()
            networkSettings.remark = "接続情報が未設定です。"
            Return networkSettings
        End Try

    End Function

    ' コマンドプロンプトでコマンドを実行する関数
    Public Shared Function ExecuteCommand(command As String, Optional runAsAdmin As Boolean = False) As String
        Try
            Using process As New Process()
                process.StartInfo.FileName = "cmd.exe"
                process.StartInfo.Arguments = "/c " & command
                process.StartInfo.UseShellExecute = runAsAdmin ' 管理者権限の場合はTrueに、そうでなければFalseに設定
                process.StartInfo.CreateNoWindow = True
                process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden
                If runAsAdmin Then
                    process.StartInfo.Verb = "runas"
                Else
                    process.StartInfo.RedirectStandardOutput = True ' 非管理者では標準出力をリダイレクト
                    process.StartInfo.RedirectStandardError = True ' 非管理者では標準エラーをリダイレクト
                End If

                process.Start()

                Dim output As String = String.Empty
                Dim errorOutput As String = String.Empty

                If Not runAsAdmin Then
                    output = process.StandardOutput.ReadToEnd()
                    errorOutput = process.StandardError.ReadToEnd()
                End If

                process.WaitForExit()

                If String.IsNullOrEmpty(errorOutput) Then
                    Return output
                Else
                    MessageBox.Show("Error: " & errorOutput, "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
                    Return "Error: " & errorOutput
                End If
            End Using
        Catch ex As Exception
            MessageBox.Show("Error: " & ex.Message, "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
            Return "Error: " & ex.Message
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

    Public Shared Function FindItemIndexByListView(ByVal listView As ListView, searchText As String) As Integer
        For Each item As ListViewItem In listView.Items
            If item.Text.Equals(searchText) Then
                Return listView.Items.IndexOf(item)
            End If
        Next
        ' テキストが見つからない場合は -1 を返す
        Return -1
    End Function

    ' ListView の左端にアイコンを追加
    Public Shared Sub SetIconToListView(ByVal listView As ListView, ByVal icon As Icon, searchText As String)
        listView.SmallImageList = New ImageList()
        ' 先に ImageIndex をリセット
        For Each item As ListViewItem In listView.Items
            item.ImageIndex = -1
        Next

        Dim index As Integer = Util.FindItemIndexByListView(listView, searchText)
        If index <> -1 Then
            ' 新しいアイコンを追加
            listView.SmallImageList.Images.Add(icon)
            ' ImageIndex をセット
            listView.Items(index).ImageIndex = 0
        End If

    End Sub


    ' パネルにラベルを表示する関数
    Public Shared Sub SetLabelsToPanel(ByVal panel As Panel, Optional remark As String = "", Optional ipAddress As String = "", Optional subnetMask As String = "", Optional gateway As String = "", Optional primaryDNS As String = "", Optional secondaryDNS As String = "")
        ' パネルの既存のコントロールをクリア
        panel.Controls.Clear()

        Dim lblLeft = 20
        Dim valLeft = 140
        Dim height = 70

        ' 備考のラベルを追加
        If Not String.IsNullOrEmpty(remark) Then
            Dim lbl As New Label()
            lbl.AutoSize = True
            lbl.Text = remark
            lbl.Location = New Point(10, 10)
            panel.Controls.Add(lbl)
        End If

        Dim dict As New Dictionary(Of String, String) From {
            {"IPアドレス", ipAddress},
            {"サブネット マスク", subnetMask},
            {"デフォルト ゲートウェイ", gateway},
            {"優先 DNS サーバ", primaryDNS},
            {"代替 DNS サーバ", secondaryDNS}
        }

        For Each d As KeyValuePair(Of String, String) In dict
            If Not String.IsNullOrEmpty(d.Value) Then
                Dim lbl As New Label()
                lbl.AutoSize = True
                lbl.Text = d.Key
                lbl.Location = New Point(lblLeft, height)
                panel.Controls.Add(lbl)
                Dim val As New Label()
                val.AutoSize = True
                val.Text = d.Value
                val.Location = New Point(valLeft, height)
                panel.Controls.Add(val)
                height += val.Height + 10
            End If
        Next

    End Sub

    ' IPアドレスを自動的に取得するように設定する関数
    Public Shared Function UpdateIPToDHCP(interfaceName As String)
        Dim setDHCPCommand As String = $"netsh interface ip set address name=""{interfaceName}"" dhcp"
        Return setDHCPCommand & vbCrLf & ExecuteCommand(setDHCPCommand, True)
    End Function


    ' DNSサーバーアドレスを自動的に取得するように設定する関数
    Public Shared Function UpdateDNSToDHCP(interfaceName As String)
        Dim setDNSDHCPCommand As String = $"netsh interface ip set dns name=""{interfaceName}"" dhcp"
        Return setDNSDHCPCommand & vbCrLf & ExecuteCommand(setDNSDHCPCommand, True)
    End Function

    ' 固定IPアドレスを設定する関数
    Public Shared Function UpdateStaticIPAddress(interfaceName As String, ipAddress As String, subnetMask As String, gateway As String)
        Dim setIPCommand As String = $"netsh interface ip set address name=""{interfaceName}"" static {ipAddress} {subnetMask} {gateway}"
        Return setIPCommand & vbCrLf & ExecuteCommand(setIPCommand, True)
    End Function

    ' 固定優先DNSサーバアドレスを設定する関数
    Public Shared Function UpdateStaticPrimaryDNS(interfaceName As String, primaryDNS As String)
        Dim setPrimaryDNSCommand As String = $"netsh interface ip set dns name=""{interfaceName}"" static {primaryDNS}"
        Return setPrimaryDNSCommand & vbCrLf & ExecuteCommand(setPrimaryDNSCommand, True)
    End Function

    ' 固定代替DNSサーバアドレスを設定する関数
    Public Shared Function UpdateStaticSecondaryDNS(interfaceName As String, secondaryDNS As String)
        Dim setSecondaryDNSCommand As String = $"netsh interface ip add dns name=""{interfaceName}"" {secondaryDNS} index=2"
        Return setSecondaryDNSCommand & vbCrLf & ExecuteCommand(setSecondaryDNSCommand, True)
    End Function


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



End Class
