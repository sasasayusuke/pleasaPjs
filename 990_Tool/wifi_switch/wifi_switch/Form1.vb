Public Class Form1


    ' Form1内の適切な場所で、例えばボタンクリックイベント内で以下のように呼び出します。
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ' ここではcインスタンスは不要です。代わりにクラス名で静的メソッドを呼び出します。
        ' Panel1とs（Settingsのインスタンス）を引数として渡します。
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

    Private Sub Label1_Click(sender As Object, e As EventArgs)

    End Sub

    Private Sub Label2_Click(sender As Object, e As EventArgs) Handles Label2.Click

    End Sub
End Class
