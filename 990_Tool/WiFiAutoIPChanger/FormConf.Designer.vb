<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class FormConf
    Inherits System.Windows.Forms.Form

    'フォームがコンポーネントの一覧をクリーンアップするために dispose をオーバーライドします。
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Windows フォーム デザイナーで必要です。
    Private components As System.ComponentModel.IContainer

    'メモ: 以下のプロシージャは Windows フォーム デザイナーで必要です。
    'Windows フォーム デザイナーを使用して変更できます。
    'コード エディターを使って変更しないでください。
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(FormConf))
        Me.TabControl1 = New System.Windows.Forms.TabControl()
        Me.TabPage1 = New System.Windows.Forms.TabPage()
        Me.ComboBoxWirelessNetwork = New System.Windows.Forms.ComboBox()
        Me.Label7 = New System.Windows.Forms.Label()
        Me.ComboBoxWiredNetwork = New System.Windows.Forms.ComboBox()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.TabPage2 = New System.Windows.Forms.TabPage()
        Me.MaskedTextBoxSecondaryDNS = New System.Windows.Forms.MaskedTextBox()
        Me.MaskedTextBoxGateway = New System.Windows.Forms.MaskedTextBox()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.MaskedTextBoxSubnet = New System.Windows.Forms.MaskedTextBox()
        Me.MaskedTextBoxPrimaryDNS = New System.Windows.Forms.MaskedTextBox()
        Me.MaskedTextBoxIPAddress = New System.Windows.Forms.MaskedTextBox()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.ConfSave = New System.Windows.Forms.Button()
        Me.TabPage3 = New System.Windows.Forms.TabPage()
        Me.TabControl1.SuspendLayout()
        Me.TabPage1.SuspendLayout()
        Me.TabPage2.SuspendLayout()
        Me.SuspendLayout()
        '
        'TabControl1
        '
        Me.TabControl1.Controls.Add(Me.TabPage1)
        Me.TabControl1.Controls.Add(Me.TabPage2)
        Me.TabControl1.Controls.Add(Me.TabPage3)
        Me.TabControl1.ImeMode = System.Windows.Forms.ImeMode.[On]
        Me.TabControl1.Location = New System.Drawing.Point(0, 0)
        Me.TabControl1.Multiline = True
        Me.TabControl1.Name = "TabControl1"
        Me.TabControl1.SelectedIndex = 0
        Me.TabControl1.Size = New System.Drawing.Size(435, 369)
        Me.TabControl1.TabIndex = 0
        Me.TabControl1.Visible = False
        '
        'TabPage1
        '
        Me.TabPage1.Controls.Add(Me.ComboBoxWirelessNetwork)
        Me.TabPage1.Controls.Add(Me.Label7)
        Me.TabPage1.Controls.Add(Me.ComboBoxWiredNetwork)
        Me.TabPage1.Controls.Add(Me.Label6)
        Me.TabPage1.Location = New System.Drawing.Point(4, 22)
        Me.TabPage1.Name = "TabPage1"
        Me.TabPage1.Padding = New System.Windows.Forms.Padding(3)
        Me.TabPage1.Size = New System.Drawing.Size(427, 343)
        Me.TabPage1.TabIndex = 0
        Me.TabPage1.Text = "全般"
        Me.TabPage1.UseVisualStyleBackColor = True
        '
        'ComboBoxWirelessNetwork
        '
        Me.ComboBoxWirelessNetwork.FormattingEnabled = True
        Me.ComboBoxWirelessNetwork.Items.AddRange(New Object() {"Wi-Fi"})
        Me.ComboBoxWirelessNetwork.Location = New System.Drawing.Point(131, 83)
        Me.ComboBoxWirelessNetwork.Name = "ComboBoxWirelessNetwork"
        Me.ComboBoxWirelessNetwork.Size = New System.Drawing.Size(121, 20)
        Me.ComboBoxWirelessNetwork.TabIndex = 94
        Me.ComboBoxWirelessNetwork.Text = "Wi-Fi"
        '
        'Label7
        '
        Me.Label7.AutoSize = True
        Me.Label7.Location = New System.Drawing.Point(22, 87)
        Me.Label7.Name = "Label7"
        Me.Label7.Size = New System.Drawing.Size(63, 12)
        Me.Label7.TabIndex = 93
        Me.Label7.Text = "無線接続 ："
        '
        'ComboBoxWiredNetwork
        '
        Me.ComboBoxWiredNetwork.FormattingEnabled = True
        Me.ComboBoxWiredNetwork.Items.AddRange(New Object() {"イーサネット"})
        Me.ComboBoxWiredNetwork.Location = New System.Drawing.Point(131, 32)
        Me.ComboBoxWiredNetwork.Name = "ComboBoxWiredNetwork"
        Me.ComboBoxWiredNetwork.Size = New System.Drawing.Size(121, 20)
        Me.ComboBoxWiredNetwork.TabIndex = 92
        Me.ComboBoxWiredNetwork.Text = "イーサネット"
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Location = New System.Drawing.Point(22, 36)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(63, 12)
        Me.Label6.TabIndex = 3
        Me.Label6.Text = "有線接続 ："
        '
        'TabPage2
        '
        Me.TabPage2.Controls.Add(Me.MaskedTextBoxSecondaryDNS)
        Me.TabPage2.Controls.Add(Me.MaskedTextBoxGateway)
        Me.TabPage2.Controls.Add(Me.Label5)
        Me.TabPage2.Controls.Add(Me.MaskedTextBoxSubnet)
        Me.TabPage2.Controls.Add(Me.MaskedTextBoxPrimaryDNS)
        Me.TabPage2.Controls.Add(Me.MaskedTextBoxIPAddress)
        Me.TabPage2.Controls.Add(Me.Label4)
        Me.TabPage2.Controls.Add(Me.Label3)
        Me.TabPage2.Controls.Add(Me.Label2)
        Me.TabPage2.Controls.Add(Me.Label1)
        Me.TabPage2.Location = New System.Drawing.Point(4, 22)
        Me.TabPage2.Name = "TabPage2"
        Me.TabPage2.Padding = New System.Windows.Forms.Padding(3)
        Me.TabPage2.Size = New System.Drawing.Size(427, 343)
        Me.TabPage2.TabIndex = 1
        Me.TabPage2.Text = "会社IP"
        Me.TabPage2.UseVisualStyleBackColor = True
        '
        'MaskedTextBoxSecondaryDNS
        '
        Me.MaskedTextBoxSecondaryDNS.Location = New System.Drawing.Point(165, 140)
        Me.MaskedTextBoxSecondaryDNS.Mask = "000.000.000.000"
        Me.MaskedTextBoxSecondaryDNS.Name = "MaskedTextBoxSecondaryDNS"
        Me.MaskedTextBoxSecondaryDNS.PromptChar = Global.Microsoft.VisualBasic.ChrW(32)
        Me.MaskedTextBoxSecondaryDNS.Size = New System.Drawing.Size(225, 19)
        Me.MaskedTextBoxSecondaryDNS.TabIndex = 15
        Me.MaskedTextBoxSecondaryDNS.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'MaskedTextBoxGateway
        '
        Me.MaskedTextBoxGateway.Location = New System.Drawing.Point(165, 80)
        Me.MaskedTextBoxGateway.Mask = "000.000.000.000"
        Me.MaskedTextBoxGateway.Name = "MaskedTextBoxGateway"
        Me.MaskedTextBoxGateway.PromptChar = Global.Microsoft.VisualBasic.ChrW(32)
        Me.MaskedTextBoxGateway.Size = New System.Drawing.Size(225, 19)
        Me.MaskedTextBoxGateway.TabIndex = 13
        Me.MaskedTextBoxGateway.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Location = New System.Drawing.Point(17, 143)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(100, 12)
        Me.Label5.TabIndex = 2
        Me.Label5.Text = "代替 DNS サーバ ："
        '
        'MaskedTextBoxSubnet
        '
        Me.MaskedTextBoxSubnet.Location = New System.Drawing.Point(165, 50)
        Me.MaskedTextBoxSubnet.Mask = "000.000.000.000"
        Me.MaskedTextBoxSubnet.Name = "MaskedTextBoxSubnet"
        Me.MaskedTextBoxSubnet.PromptChar = Global.Microsoft.VisualBasic.ChrW(32)
        Me.MaskedTextBoxSubnet.Size = New System.Drawing.Size(225, 19)
        Me.MaskedTextBoxSubnet.TabIndex = 12
        Me.MaskedTextBoxSubnet.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'MaskedTextBoxPrimaryDNS
        '
        Me.MaskedTextBoxPrimaryDNS.Location = New System.Drawing.Point(165, 110)
        Me.MaskedTextBoxPrimaryDNS.Mask = "000.000.000.000"
        Me.MaskedTextBoxPrimaryDNS.Name = "MaskedTextBoxPrimaryDNS"
        Me.MaskedTextBoxPrimaryDNS.PromptChar = Global.Microsoft.VisualBasic.ChrW(32)
        Me.MaskedTextBoxPrimaryDNS.Size = New System.Drawing.Size(225, 19)
        Me.MaskedTextBoxPrimaryDNS.TabIndex = 14
        Me.MaskedTextBoxPrimaryDNS.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'MaskedTextBoxIPAddress
        '
        Me.MaskedTextBoxIPAddress.Location = New System.Drawing.Point(165, 20)
        Me.MaskedTextBoxIPAddress.Mask = "000.000.000.000"
        Me.MaskedTextBoxIPAddress.Name = "MaskedTextBoxIPAddress"
        Me.MaskedTextBoxIPAddress.PromptChar = Global.Microsoft.VisualBasic.ChrW(32)
        Me.MaskedTextBoxIPAddress.Size = New System.Drawing.Size(225, 19)
        Me.MaskedTextBoxIPAddress.TabIndex = 11
        Me.MaskedTextBoxIPAddress.TextAlign = System.Windows.Forms.HorizontalAlignment.Center
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Location = New System.Drawing.Point(17, 113)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(100, 12)
        Me.Label4.TabIndex = 2
        Me.Label4.Text = "優先 DNS サーバ ："
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Location = New System.Drawing.Point(17, 83)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(116, 12)
        Me.Label3.TabIndex = 2
        Me.Label3.Text = "デフォルト ゲートウェイ ："
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(17, 53)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(89, 12)
        Me.Label2.TabIndex = 2
        Me.Label2.Text = "サブネット マスク ："
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(19, 23)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(61, 12)
        Me.Label1.TabIndex = 2
        Me.Label1.Text = "IPアドレス ："
        '
        'ConfSave
        '
        Me.ConfSave.Location = New System.Drawing.Point(347, 376)
        Me.ConfSave.Name = "ConfSave"
        Me.ConfSave.Size = New System.Drawing.Size(75, 23)
        Me.ConfSave.TabIndex = 91
        Me.ConfSave.Text = "保存"
        Me.ConfSave.UseVisualStyleBackColor = True
        '
        'TabPage3
        '
        Me.TabPage3.Location = New System.Drawing.Point(4, 22)
        Me.TabPage3.Name = "TabPage3"
        Me.TabPage3.Padding = New System.Windows.Forms.Padding(3)
        Me.TabPage3.Size = New System.Drawing.Size(427, 343)
        Me.TabPage3.TabIndex = 2
        Me.TabPage3.Text = "バージョン"
        Me.TabPage3.UseVisualStyleBackColor = True
        '
        'FormConf
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 12.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(434, 411)
        Me.Controls.Add(Me.ConfSave)
        Me.Controls.Add(Me.TabControl1)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.MaximizeBox = False
        Me.MinimizeBox = False
        Me.Name = "FormConf"
        Me.Text = "環境設定"
        Me.TabControl1.ResumeLayout(False)
        Me.TabPage1.ResumeLayout(False)
        Me.TabPage1.PerformLayout()
        Me.TabPage2.ResumeLayout(False)
        Me.TabPage2.PerformLayout()
        Me.ResumeLayout(False)

    End Sub

    Friend WithEvents TabControl1 As TabControl
    Friend WithEvents TabPage1 As TabPage
    Friend WithEvents TabPage2 As TabPage
    Friend WithEvents MaskedTextBoxSecondaryDNS As MaskedTextBox
    Friend WithEvents MaskedTextBoxGateway As MaskedTextBox
    Friend WithEvents Label5 As Label
    Friend WithEvents MaskedTextBoxSubnet As MaskedTextBox
    Friend WithEvents MaskedTextBoxPrimaryDNS As MaskedTextBox
    Friend WithEvents MaskedTextBoxIPAddress As MaskedTextBox
    Friend WithEvents Label4 As Label
    Friend WithEvents Label3 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents Label1 As Label
    Friend WithEvents ConfSave As Button
    Friend WithEvents Label6 As Label
    Friend WithEvents ComboBoxWiredNetwork As ComboBox
    Friend WithEvents ComboBoxWirelessNetwork As ComboBox
    Friend WithEvents Label7 As Label
    Friend WithEvents TabPage3 As TabPage
End Class
