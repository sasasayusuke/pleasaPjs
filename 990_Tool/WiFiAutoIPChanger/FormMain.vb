
Public Class FormMain
    ' 起動時動作
    Private Sub FormMain_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' 初期ではメイン情報画面を表示しない
        Me.Visible = False
        Me.ShowInTaskbar = False

        Dim SsidList = Util.GetKnownWiFi()

        For i = 0 To SsidList.Count - 1
            SsidListView.Items.Add(SsidList(i))
        Next i

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

    Private Sub Timer1_Tick(sender As Object, e As EventArgs) Handles Timer1.Tick
        ' 現在接続中のWiFi確認
        Dim tmpSsid As String = Util.GetCurrentSSID()
        If Constants.currentSSID <> tmpSsid Then
            Constants.currentSSID = tmpSsid
            ' ListView の端にアイコンを追加
            Util.SetIconToListView(SsidListView, "red_wifi_icon.ico", Constants.currentSSID)
            Dim index As Integer = Util.FindItemIndexByListView(SsidListView, Constants.currentSSID)
            If index <> -1 Then


                ' 設定情報を取得
                Dim setting As NetworkSettings = Util.GetNetworkSettings(Constants.currentSSID)

                Dim interfaceWired As String = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, "ComboBoxWiredNetwork")
                Dim interfaceWireless As String = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, "ComboBoxWirelessNetwork")

                ' 有線のIPを解除
                Dim response = Constants.currentSSID & "へ接続します。以下の設定をしました" & vbCrLf
                response += Util.UpdateIPToDHCP(interfaceWired)
                response += Util.UpdateDNSToDHCP(interfaceWired)

                ' 設定情報を更新
                If setting.autoObtainIP Then
                    response += Util.UpdateIPToDHCP(interfaceWireless)
                Else
                    response += Util.UpdateStaticIPAddress(interfaceWireless, setting.ipAddress, setting.subnetMask, setting.gateway)
                End If

                If setting.autoObtainDNS Then
                    response += Util.UpdateDNSToDHCP(interfaceWireless)
                Else
                    response += Util.UpdateStaticPrimaryDNS(interfaceWireless, setting.primaryDNS)
                    If Not String.IsNullOrEmpty(setting.secondaryDNS) Then
                        response += Util.UpdateStaticSecondaryDNS(interfaceWireless, setting.secondaryDNS)
                    End If

                End If

                MessageBox.Show(response, "実行結果", MessageBoxButtons.OK, MessageBoxIcon.Information)
            End If

        End If
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
End Class
