Public Class Form1


    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' リストを表示するPanelを引数として渡します。
        Util.AddControlsToPanel(SplitContainer1.Panel2)
    End Sub

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' アプリケーションの起動時にフォームを非表示にします。
        Me.Visible = False
        Me.ShowInTaskbar = False
    End Sub

    Private Sub NotifyIcon1_MouseDoubleClick(ByVal sender As System.Object, ByVal e As System.Windows.Forms.MouseEventArgs) Handles NotifyIcon1.MouseDoubleClick
        ' ユーザーが通知アイコンをダブルクリックしたときにフォームを表示します。
        Me.Visible = True
        Me.ShowInTaskbar = True
    End Sub



    Private Sub Form1_FormClosing(ByVal sender As Object, ByVal e As FormClosingEventArgs) Handles MyBase.FormClosing
        ' アプリケーションが閉じるのではなく、単に非表示になるようにする
        e.Cancel = True
        Me.Visible = False
        NotifyIcon1.Visible = True
    End Sub
End Class
