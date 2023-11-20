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
            Dim ip = Util.ReadValueFromXml(mtb.Name)
            If String.IsNullOrEmpty(ip) Then
                mtb.Text = Constants.EMPTY_IP_ADDRESS
            Else
                mtb.Text = Util.ConvertIpAddressFormat(ip)
            End If
        Next


    End Sub

    ' 入力チェック
    Private Sub MaskedTextBox_Validating(sender As Object, e As System.ComponentModel.CancelEventArgs) Handles MaskedTextBoxIPAddress.Validating, MaskedTextBoxSubnet.Validating, MaskedTextBoxGateway.Validating, MaskedTextBoxPrimaryDNS.Validating, MaskedTextBoxSecondaryDNS.Validating
        Dim mtb As MaskedTextBox = CType(sender, MaskedTextBox)
        If Util.IsValidIpAddress(mtb.Text) Then
            mtb.Text = Util.ConvertIpAddressFormat(mtb.Text)
        Else
            ' 入力が無効ならば、イベントをキャンセルし、ユーザーにエラーメッセージを表示します。
            MessageBox.Show("無効なIPアドレスです。", "エラー", MessageBoxButtons.OK, MessageBoxIcon.Error)
            mtb.Text = Constants.EMPTY_IP_ADDRESS
            e.Cancel = True
        End If

    End Sub

    Private Sub ConfSave_Click(sender As Object, e As EventArgs) Handles ConfSave.Click
        ' XMLファイルに書き込み

        ' 全てのMaskedTextBoxの共通の設定
        Dim mtbs As MaskedTextBox() = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}

        For Each mtb As MaskedTextBox In mtbs
            Util.WriteValueToXml(mtb.Name, mtb.Text)
        Next
        MessageBox.Show("設定内容を保存しました", "保存", MessageBoxButtons.OK, MessageBoxIcon.Information)
    End Sub
End Class
