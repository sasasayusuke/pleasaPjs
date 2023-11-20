Imports System.IO

Public Class FormConf
    ' フォームのロード時に一度だけマスクを設定します。
    Private Sub FormConf_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        SetMaskedTextBoxMasks()
    End Sub

    Private Sub SetMaskedTextBoxMasks()

        ' 全てのMaskedTextBoxの共通の設定
        Dim mtbs As MaskedTextBox() = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}

        For Each mtb As MaskedTextBox In mtbs
            mtb.Mask = "000\.000\.000\.000"
            mtb.PromptChar = "_"
            mtb.Text = "___.___.___.___"
        Next
    End Sub

    ' ここで、入力が適切な形式であるかを検証します。
    Private Sub MaskedTextBox_Validating(sender As Object, e As System.ComponentModel.CancelEventArgs) Handles MaskedTextBoxIPAddress.Validating, MaskedTextBoxSubnet.Validating, MaskedTextBoxGateway.Validating, MaskedTextBoxPrimaryDNS.Validating, MaskedTextBoxSecondaryDNS.Validating
        Dim mtb As MaskedTextBox = CType(sender, MaskedTextBox)
        If Not Util.IsValidIpAddress(mtb.Text) Then
            ' 入力が無効ならば、イベントをキャンセルし、ユーザーにエラーメッセージを表示します。
            MessageBox.Show("無効なIPアドレスです。", "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
            mtb.Text = "___.___.___.___"
            e.Cancel = True
        End If
    End Sub

    Private Sub ConfSave_Click(sender As Object, e As EventArgs) Handles ConfSave.Click
        ' INIファイルのパスを設定
        Dim init As String = Util.ReadFromXmlFile("SampleSection1", "SampleKey")
        ' INIファイルに書き込み
        Util.WriteToXmlFile("SampleKey", "SampleValueeeeee")

        MessageBox.Show("設定内容を保存しました", "保存", MessageBoxButtons.OK, MessageBoxIcon.Information)
    End Sub
End Class
