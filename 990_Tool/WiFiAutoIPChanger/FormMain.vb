Imports System.Management
Imports System.Net.NetworkInformation


Public Class FormMain
    ' 起動時動作
    Private Sub FormMain_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' 初期ではメイン情報画面を表示しない
        Me.Visible = False
        Me.ShowInTaskbar = False

        Dim SsidList
        SsidList = Util.GetKnownWiFi()

        Dim SendItem(0)
        For i = 0 To SsidList.Count - 1
            SsidListView.Items.Add(SsidList(i))
        Next i

        ' パネル上への接続中SSIDの表示
        Util.AddControlsToPanel(Panel1)

    End Sub


    '＝＝＝＝＝＝＝　SSIDListをクリックした際の動作　＝＝＝＝＝＝＝
    Private fi As FormIp
    Private Sub SsidListView_DoubleClick(sender As System.Object, e As System.EventArgs) Handles SsidListView.DoubleClick
        Dim strSsid As String = SsidListView.SelectedItems(0).Text
        'IP設定画面の表示
        fi = New FormIp
        fi.Owner = Me
        fi.tbSsid.Text = strSsid
        fi.Show()
    End Sub


    ' ##### コンテキストメニュー設定 ここから #####
    ' メイン画面表示設定
    Private Sub ViewMenuItem_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles ViewMenuItem.Click
        '画面表示のチェックを無効にする場合
        If ViewMenuItem.Checked = True Then
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
    End Sub

    '##### コンテキストメニュー設定 ここまで #####
End Class
