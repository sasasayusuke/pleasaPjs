
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
    Private Sub SsidListView_Click(sender As System.Object, e As System.EventArgs) Handles SsidListView.Click
        Try
            Constants.showedSSID = SsidListView.SelectedItems(0).Text
            Constants.showedIpAddress = ""
            Constants.showedSubnetMask = ""
            Constants.showedGateway = ""
            Constants.showedPrimaryDNS = ""
            Constants.showedSecondaryDNS = ""

            ' 会社のIP情報を使う をチェックしていた場合
            If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "CheckSpecificCompanyIP")) Then

                Constants.showedIpAddress = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxIPAddress")
                Constants.showedSubnetMask = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSubnet")
                Constants.showedGateway = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxGateway")
                Constants.showedPrimaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxPrimaryDNS")
                Constants.showedSecondaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSecondaryDNS")
            Else
                ' 次のIPアドレスを使う をチェックしていた場合
                If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "RadioAutoObtainIP")) Then
                    Constants.showedIpAddress = Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "MaskedTextBoxIPAddress")
                    Constants.showedSubnetMask = Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "MaskedTextBoxSubnet")
                    Constants.showedGateway = Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "MaskedTextBoxGateway")
                End If

                ' 次のDNSサーバのアドレスを使う をチェックしていた場合
                If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "RadioAutoObtainDNS")) Then
                    Constants.showedPrimaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "MaskedTextBoxPrimaryDNS")
                    Constants.showedSecondaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, Constants.showedSSID, "MaskedTextBoxSecondaryDNS")
                End If
            End If

            ' Panel1に表示
            Util.AddControlsToPanel(
                    Panel1,
                    Constants.showedIpAddress,
                    Constants.showedSubnetMask,
                    Constants.showedGateway,
                    Constants.showedPrimaryDNS,
                    Constants.showedSecondaryDNS,
                    "あおあお"
                )
        Catch ex As Exception

        End Try

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
        End If
    End Sub

    '##### コンテキストメニュー設定 ここまで #####
End Class
