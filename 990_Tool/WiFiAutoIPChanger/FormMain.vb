
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
    Private Sub SsidListView_Select(sender As System.Object, e As System.EventArgs) Handles SsidListView.SelectedIndexChanged
        Try

            Dim showedSSID As String = SsidListView.SelectedItems(0).Text
            Dim showedIpAddress As String = ""
            Dim showedSubnetMask As String = ""
            Dim showedGateway As String = ""
            Dim showedPrimaryDNS As String = ""
            Dim showedSecondaryDNS As String = ""

            Dim remark As String = ""

            ' 会社のIP情報を使う をチェックしていた場合
            If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "CheckSpecificCompanyIP")) Then
                remark += "会社のIP情報を使う。" & vbCrLf
                showedIpAddress = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxIPAddress")
                showedSubnetMask = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSubnet")
                showedGateway = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxGateway")
                showedPrimaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxPrimaryDNS")
                showedSecondaryDNS = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, "MaskedTextBoxSecondaryDNS")
            Else
                ' 次のIPアドレスを使う をチェックしていた場合
                If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "RadioAutoObtainIP")) Then
                    remark += "次のIPアドレスを使う。" & vbCrLf
                    showedIpAddress = Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "MaskedTextBoxIPAddress")
                    showedSubnetMask = Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "MaskedTextBoxSubnet")
                    showedGateway = Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "MaskedTextBoxGateway")
                Else
                    remark += "自動IP接続" & vbCrLf
                End If

                ' 次のDNSサーバのアドレスを使う をチェックしていた場合
                If Boolean.Parse(Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "RadioAutoObtainDNS")) Then
                    remark += "次のIPアドレスを使う。" & vbCrLf
                    showedPrimaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "MaskedTextBoxPrimaryDNS")
                    showedSecondaryDNS = Util.ReadValueFromXml(Constants.PAGE_IP, showedSSID, "MaskedTextBoxSecondaryDNS")
                Else
                    remark += "自動DNS接続" & vbCrLf
                End If
            End If

            ' Panel1に表示
            Util.UpdateLabelsToPanel(
                        Panel1,
                        remark,
                        showedIpAddress,
                        showedSubnetMask,
                        showedGateway,
                        showedPrimaryDNS,
                        showedSecondaryDNS
                    )
        Catch ex As Exception
            ' Panel1に表示
            Util.UpdateLabelsToPanel(
                Panel1,
                "接続情報が未設定です。",
                "",
                "",
                "",
                "",
                ""
            )

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
            ' ListView の端にアイコンを追加
            Dim icon As New Icon("green_wi-fi_icon.ico")
            Util.AddIconToListView(SsidListView, icon, Constants.currentSSID)


        End If
    End Sub

    Private Sub UpdateListViewIcon()
        Dim imageList As New ImageList()
        imageList.Images.Add(icon)
        SsidListView.SmallImageList = imageList

        ' ListView の最後の項目のインデックスを取得
        Dim lastIndex As Integer = SsidListView.Items.Count - 1

        ' 最後の項目にアイコンを設定
        SsidListView.Items(lastIndex).ImageIndex = 0
    End Sub


    '##### コンテキストメニュー設定 ここまで #####
End Class
