Imports System.IO

Public Class FormConf
    ' フォームのロード時に一度だけマスクを設定します。
    Private Sub FormConf_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' 全般情報へ書き込み
        Dim cbs = {ComboBoxWiredNetwork, ComboBoxWirelessNetwork}
        For Each cb In cbs
            Dim label = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, cb.Name)
            If String.IsNullOrEmpty(label) Then
            Else
                cb.Text = label
            End If
        Next

        ' 会社情報へ書き込み
        Dim mtbs = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}
        For Each mtb In mtbs
            mtb.Mask = "000\.000\.000\.000"
            mtb.PromptChar = "_"
            Dim ip = Util.ReadValueFromXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, mtb.Name)
            If String.IsNullOrEmpty(ip) Then
                mtb.Text = Constants.EMPTY_IP_ADDRESS
            Else
                mtb.Text = Util.ConvertIpAddressFormat(ip)
            End If
        Next
    End Sub


    ' IPアドレスのバリデーションチェック
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

    ' 保存ボタンクリック
    Private Sub ConfSave_Click(sender As Object, e As EventArgs) Handles ConfSave.Click
        ' XMLファイルに書き込み

        ' 全てのComboBox
        Dim cbs = {ComboBoxWiredNetwork, ComboBoxWirelessNetwork}
        For Each cb In cbs
            Util.WriteValueToXml(Constants.PAGE_CONF, Constants.PAGE_CONF_GENERAL, cb.Name, cb.Text)
        Next

        ' 全てのMaskedTextBox
        Dim mtbs = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}
        For Each mtb In mtbs
            Dim ip As String = mtb.Text.Replace(" ", "")
            Util.WriteValueToXml(Constants.PAGE_CONF, Constants.PAGE_CONF_COMPANY, mtb.Name, ip)
        Next
        MessageBox.Show("設定内容を保存しました", "保存", MessageBoxButtons.OK, MessageBoxIcon.Information)
        Me.Close()
    End Sub


End Class
