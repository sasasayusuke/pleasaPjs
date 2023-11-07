Public Class Form1
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        AddControlsToPanel()
    End Sub
    Private Sub AddControlsToPanel()
        ' ラベルを作成します。
        Dim newLabel As New Label()
        newLabel.Text = "Label"
        newLabel.AutoSize = True

        ' 数値のみを入力可能なテキストボックスを4つ作成します。
        Dim textBoxes(3) As TextBox
        For i As Integer = 0 To textBoxes.Length - 1
            textBoxes(i) = New TextBox()
            textBoxes(i).Size = New Size(50, textBoxes(i).Height)
            ' 数値のみの入力を強制するイベントハンドラを追加する場合はここに追加します。
            ' 例: AddHandler textBoxes(i).KeyPress, AddressOf TextBox_KeyPress
        Next

        ' ボタンを2つ作成します。
        Dim buttons(1) As Button
        For i As Integer = 0 To buttons.Length - 1
            buttons(i) = New Button()
            buttons(i).Text = "Button " & (i + 1).ToString()
            buttons(i).Size = New Size(75, buttons(i).Height)
        Next

        ' これらのコントロールをPanelに追加します。
        Dim nextControlLeft As Integer = 10
        Panel1.Controls.Add(newLabel)
        newLabel.Location = New Point(nextControlLeft, Settings.lastButtonBottom + 10)
        nextControlLeft += newLabel.Width + 10

        For Each tb As TextBox In textBoxes
            Panel1.Controls.Add(tb)
            tb.Location = New Point(nextControlLeft, Settings.lastButtonBottom + 10)
            nextControlLeft += tb.Width + 10
        Next

        For Each btn As Button In buttons
            Panel1.Controls.Add(btn)
            btn.Location = New Point(nextControlLeft, Settings.lastButtonBottom + 10)
            nextControlLeft += btn.Width + 10
        Next

        ' 最後のコントロールのBottomプロパティを更新します。
        Settings.lastButtonBottom = buttons(buttons.Length - 1).Bottom
    End Sub

    ' 数値のみ入力可能なテキストボックスのイベントハンドラ（必要な場合）
    Private Sub TextBox_KeyPress(ByVal sender As Object, ByVal e As KeyPressEventArgs)
        If Not Char.IsDigit(e.KeyChar) AndAlso Not Char.IsControl(e.KeyChar) Then
            e.Handled = True
        End If
    End Sub

End Class
