Public Class FormIp

    ' IPアドレスのバリデーションチェック
    Private Sub MaskedTextBox_Validating(sender As Object, e As System.ComponentModel.CancelEventArgs) Handles MaskedTextBox1.Validating, MaskedTextBox2.Validating, MaskedTextBox3.Validating, MaskedTextBox4.Validating, MaskedTextBox5.Validating
        If Not Util.IsValidIPAddress(MaskedTextBox1.Text) Or Not Util.IsValidIPAddress(MaskedTextBox2.Text) Or Not Util.IsValidIPAddress(MaskedTextBox3.Text) Or Not Util.IsValidIPAddress(MaskedTextBox4.Text) Or Not Util.IsValidIPAddress(MaskedTextBox5.Text) Then
            MessageBox.Show("無効なIPアドレスです。正しい形式で入力してください。", "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
            e.Cancel = True
        End If
    End Sub

End Class