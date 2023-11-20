Imports System.Windows.Forms.VisualStyles.VisualStyleElement
Imports System.Windows.Forms.VisualStyles.VisualStyleElement.Button

Public Class FormIp

    ' フォームのロード時に一度だけマスクを設定します。
    Private Sub FormConf_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' 全てのMaskedTextBoxの共通の設定
        Dim mtbs As MaskedTextBox() = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}
        For Each mtb As MaskedTextBox In mtbs
            mtb.Mask = "000\.000\.000\.000"
            mtb.PromptChar = "_"
            Dim ip = Util.ReadValueFromXml(Constants.APP_IP, mtb.Name)
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
    Private Sub IpSave_Click(sender As Object, e As EventArgs) Handles IpSave.Click
        ' XMLファイルに書き込み

        ' 全てのMaskedTextBoxの共通の設定
        Dim mtbs As MaskedTextBox() = {MaskedTextBoxIPAddress, MaskedTextBoxSubnet, MaskedTextBoxGateway, MaskedTextBoxPrimaryDNS, MaskedTextBoxSecondaryDNS}
        For Each mtb As MaskedTextBox In mtbs
            Util.WriteValueToXml(Constants.APP_CONF, mtb.Name, mtb.Text)
        Next
        MessageBox.Show("設定内容を保存しました", "保存", MessageBoxButtons.OK, MessageBoxIcon.Information)
    End Sub
    Private Sub RadioAutoObtainIP_Changed(sender As Object, e As EventArgs) Handles RadioAutoObtainIP.CheckedChanged
        ' IPアドレスを自動的に取得する をチェックした場合はテキストボックスを無効化
        If RadioAutoObtainIP.Checked Then
            MaskedTextBoxIPAddress.Enabled = False
            MaskedTextBoxSubnet.Enabled = False
            MaskedTextBoxGateway.Enabled = False
        End If
    End Sub
    Private Sub RadioSpecificIP_Changed(sender As Object, e As EventArgs) Handles RadioSpecificIP.CheckedChanged
        ' 次のIPアドレスを使う をチェックした場合はテキストボックスを有効化
        If RadioSpecificIP.Checked Then
            MaskedTextBoxIPAddress.Enabled = True
            MaskedTextBoxSubnet.Enabled = True
            MaskedTextBoxGateway.Enabled = True
        End If
    End Sub
    Private Sub RadioAutoObtainDNS_Changed(sender As Object, e As EventArgs) Handles RadioAutoObtainDNS.CheckedChanged
        ' DNSサーバーのアドレスを自動的に取得する をチェックした場合はテキストボックスを無効化
        If RadioAutoObtainDNS.Checked Then
            MaskedTextBoxSecondaryDNS.Enabled = False
            MaskedTextBoxSecondaryDNS.Enabled = False
        End If
    End Sub
    Private Sub RadioSpecificDNS_Changed(sender As Object, e As EventArgs) Handles RadioSpecificDNS.CheckedChanged
        ' 次のDNSサーバーのアドレスを自動的に取得する をチェックした場合はテキストボックスを有効化
        If RadioSpecificDNS.Checked Then
            MaskedTextBoxSecondaryDNS.Enabled = True
            MaskedTextBoxSecondaryDNS.Enabled = True
        End If
    End Sub

End Class