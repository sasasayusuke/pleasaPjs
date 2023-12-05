
Public Class FormMain
    ' 起動時動作
    Private Sub FormMain_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        Me.Visible = True
        Me.ShowInTaskbar = True
        CheckNetworkStatusChange(Me, e)
    End Sub


    '＝＝＝＝＝＝＝　SSIDListをクリックした際の動作　＝＝＝＝＝＝＝
    Private fi As FormIp
    Private Sub SsidListView_Select(sender As Object, e As ListViewItemSelectionChangedEventArgs) Handles SsidListView.ItemSelectionChanged
        Dim showedSSID As String = e.Item.Text

        Dim setting As NetworkSettings = Util.GetNetworkSettings(showedSSID)

        ' Panel1に表示
        Util.SetLabelsToPanel(Panel1, setting.remark, setting.ipAddress, setting.subnetMask, setting.gateway, setting.primaryDNS, setting.secondaryDNS)

    End Sub
    Private Sub SsidListView_DoubleClick(sender As System.Object, e As System.EventArgs) Handles SsidListView.DoubleClick
        Constants.selectedSSID = SsidListView.SelectedItems(0).Text
        'IP設定画面の表示
        fi = New FormIp
        fi.Owner = Me
        fi.tbSsid.Text = Constants.selectedSSID
        fi.Show()
    End Sub


    ' ##### コンテキストメニュー設定 ここから #####
    ' メイン画面表示設定
    Private Sub ViewMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ViewMenuItem.Click
        '画面表示のチェックを無効にする場合
        If ViewMenuItem.Checked Then
            ViewMenuItem.Checked = False
            Me.Visible = False

        Else
            ViewMenuItem.Checked = True
            Me.Visible = True
        End If
    End Sub

    ' 環境設定
    Private fc As FormConf
    Private Sub ConfMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ConfMenuItem.Click
        '環境設定画面の表示
        fc = New FormConf
        fc.Owner = Me
        fc.Show()
    End Sub

    ' アプリケーションの終了
    Private Sub CloseMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles CloseMenuItem.Click
        ' アプリケーションの終了
        Me.Close()
    End Sub



    ' 現在接続中のWiFi確認
    ' WiFi情報の取得

    ' 変更がある場合
    ' IPの付け替え（無線ありの場合）
    ' 無線にSSIDに応じたIPを付与
    ' 会社のIPを使用するSSIDの場合には、有線のIPを削除
    ' 会社のIPを使用しないSSIDの場合には、有線に会社IPを付与

    ' IPの付け替え（無線なしの場合）
    ' 有線に会社IPを付与


    ' 変更がない場合
    ' 終了
    Private Sub CheckNetworkStatusChange(sender As Object, e As EventArgs) Handles Timer1.Tick
        Dim commandList As New List(Of String)

        Dim interfaceWired As String = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, "ComboBoxWiredNetwork")
        Dim interfaceWireless As String = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, "ComboBoxWirelessNetwork")

        ' 有線接続中
        If Util.IsEthernetConnected() AndAlso Not Constants.currentWired Then
            Constants.currentWired = True
            LabelWired.Text = "ON"
            LabelWired.ForeColor = Color.Crimson
            ' 設定情報を取得
            Dim setting As NetworkSettings = Util.GetNetworkSettings("", True)


            ' 設定情報を更新
            If Constants.currentUseCompany Then
                Constants.currentUseCompany = False
                commandList.Add(Util.GetCmdUpdateIPToDHCP(interfaceWireless))
                commandList.Add(Util.GetCmdUpdateDNSToDHCP(interfaceWireless))
            End If

            If setting.autoObtainIP Then
                commandList.Add(Util.GetCmdUpdateIPToDHCP(interfaceWired))
            Else
                commandList.Add(Util.GetCmdUpdateStaticIPAddress(interfaceWired, setting.ipAddress, setting.subnetMask, setting.gateway))
            End If

            If setting.autoObtainDNS Then
                commandList.Add(Util.GetCmdUpdateDNSToDHCP(interfaceWired))
            Else
                commandList.Add(Util.GetCmdUpdateStaticPrimaryDNS(interfaceWired, setting.primaryDNS))
                If Not String.IsNullOrEmpty(setting.secondaryDNS) Then
                    commandList.Add(Util.GetCmdUpdateStaticSecondaryDNS(interfaceWired, setting.secondaryDNS))
                End If

            End If
        ElseIf Not Util.IsEthernetConnected() AndAlso Constants.currentWired Then
            Constants.currentWired = False
            LabelWired.Text = "OFF"
            LabelWired.ForeColor = Color.Blue
        End If


        ' 現在接続中のWiFi確認
        Dim tmpSsid As String = Util.GetCurrentSSID()

        If Constants.currentSSID <> tmpSsid Then
            Constants.currentSSID = tmpSsid

            Try
                ' ListViewの描画を一時停止
                SsidListView.BeginUpdate()

                ' 既存のアイテムをクリア
                SsidListView.Items.Clear()

                ' 既知WiFiリストを取得してListViewに追加
                Dim SsidList = Util.GetKnownWiFi()
                For i = 0 To SsidList.Count - 1
                    SsidListView.Items.Add(SsidList(i))
                Next i

                ' ListView の端にアイコンを追加
                Util.SetIconToListView(SsidListView, "red_wifi_icon.ico", Constants.currentSSID)

            Finally
                ' ListViewの描画を再開
                SsidListView.EndUpdate()
            End Try


            Dim index As Integer = Util.FindItemIndexByListView(SsidListView, Constants.currentSSID)
            If index <> -1 Then


                ' 設定情報を取得
                Dim setting As NetworkSettings = Util.GetNetworkSettings(Constants.currentSSID)


                ' 会社のIPを使用するSSIDの場合
                ' 有線のIPを解除
                If setting.useCompany Then
                    Constants.currentUseCompany = True
                    commandList.Add(Util.GetCmdUpdateIPToDHCP(interfaceWired))
                    commandList.Add(Util.GetCmdUpdateDNSToDHCP(interfaceWired))
                End If

                ' 設定情報を更新
                If setting.autoObtainIP Then
                    commandList.Add(Util.GetCmdUpdateIPToDHCP(interfaceWireless))
                Else
                    commandList.Add(Util.GetCmdUpdateStaticIPAddress(interfaceWireless, setting.ipAddress, setting.subnetMask, setting.gateway))
                End If

                If setting.autoObtainDNS Then
                    commandList.Add(Util.GetCmdUpdateDNSToDHCP(interfaceWireless))
                Else
                    commandList.Add(Util.GetCmdUpdateStaticPrimaryDNS(interfaceWireless, setting.primaryDNS))
                    If Not String.IsNullOrEmpty(setting.secondaryDNS) Then
                        commandList.Add(Util.GetCmdUpdateStaticSecondaryDNS(interfaceWireless, setting.secondaryDNS))
                    End If

                End If
            End If
        End If


        Dim cmd As String = String.Join(" & ", commandList)


        If Not String.IsNullOrEmpty(cmd) Then
            Util.ExecuteCommand(cmd, True)
        End If
    End Sub


    Private Sub NotifyIcon1_MouseClick(ByVal sender As Object, ByVal e As MouseEventArgs) Handles NotifyIcon1.MouseClick
        If e.Button = MouseButtons.Left Then
            ' フォームの表示状態を切り替える
            Me.Visible = Not Me.Visible
            If Me.Visible Then
                ' フォームをアクティブにする
                Me.Activate()
                Me.Show()
            End If
        End If
    End Sub


End Class
