<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class FormMain
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
        Me.components = New System.ComponentModel.Container()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(FormMain))
        Me.ContextMenuStrip1 = New System.Windows.Forms.ContextMenuStrip(Me.components)
        Me.ViewMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.ConfMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.CloseMenuItem = New System.Windows.Forms.ToolStripMenuItem()
        Me.NotifyIcon1 = New System.Windows.Forms.NotifyIcon(Me.components)
        Me.SsidLabel = New System.Windows.Forms.Label()
        Me.OptionLabel = New System.Windows.Forms.Label()
        Me.SsidListView = New System.Windows.Forms.ListView()
        Me.SSID = CType(New System.Windows.Forms.ColumnHeader(), System.Windows.Forms.ColumnHeader)
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.Timer1 = New System.Windows.Forms.Timer(Me.components)
        Me.ContextMenuStrip1.SuspendLayout()
        Me.SuspendLayout()
        '
        'ContextMenuStrip1
        '
        Me.ContextMenuStrip1.Items.AddRange(New System.Windows.Forms.ToolStripItem() {Me.ViewMenuItem, Me.ConfMenuItem, Me.CloseMenuItem})
        Me.ContextMenuStrip1.Name = "ContextMenuStrip1"
        Me.ContextMenuStrip1.Size = New System.Drawing.Size(146, 70)
        '
        'ViewMenuItem
        '
        Me.ViewMenuItem.Name = "ViewMenuItem"
        Me.ViewMenuItem.Size = New System.Drawing.Size(145, 22)
        Me.ViewMenuItem.Text = "メイン画面表示"
        '
        'ConfMenuItem
        '
        Me.ConfMenuItem.Name = "ConfMenuItem"
        Me.ConfMenuItem.Size = New System.Drawing.Size(145, 22)
        Me.ConfMenuItem.Text = "環境設定"
        '
        'CloseMenuItem
        '
        Me.CloseMenuItem.Name = "CloseMenuItem"
        Me.CloseMenuItem.Size = New System.Drawing.Size(145, 22)
        Me.CloseMenuItem.Text = "終了"
        '
        'NotifyIcon1
        '
        Me.NotifyIcon1.ContextMenuStrip = Me.ContextMenuStrip1
        Me.NotifyIcon1.Icon = CType(resources.GetObject("NotifyIcon1.Icon"), System.Drawing.Icon)
        Me.NotifyIcon1.Text = "WiFiAutoIPChanger"
        Me.NotifyIcon1.Visible = True
        '
        'SsidLabel
        '
        Me.SsidLabel.AutoSize = True
        Me.SsidLabel.Location = New System.Drawing.Point(12, 12)
        Me.SsidLabel.Name = "SsidLabel"
        Me.SsidLabel.Size = New System.Drawing.Size(122, 12)
        Me.SsidLabel.TabIndex = 1
        Me.SsidLabel.Text = "端末登録済み無線LAN"
        '
        'OptionLabel
        '
        Me.OptionLabel.AutoSize = True
        Me.OptionLabel.Location = New System.Drawing.Point(270, 12)
        Me.OptionLabel.Name = "OptionLabel"
        Me.OptionLabel.Size = New System.Drawing.Size(75, 12)
        Me.OptionLabel.TabIndex = 2
        Me.OptionLabel.Text = "詳細情報"
        '
        'SsidListView
        '
        Me.SsidListView.BorderStyle = System.Windows.Forms.BorderStyle.None
        Me.SsidListView.Columns.AddRange(New System.Windows.Forms.ColumnHeader() {Me.SSID})
        Me.SsidListView.Cursor = System.Windows.Forms.Cursors.Default
        Me.SsidListView.FullRowSelect = True
        Me.SsidListView.GridLines = True
        Me.SsidListView.HideSelection = False
        Me.SsidListView.Location = New System.Drawing.Point(12, 35)
        Me.SsidListView.Name = "SsidListView"
        Me.SsidListView.Size = New System.Drawing.Size(250, 250)
        Me.SsidListView.TabIndex = 3
        Me.SsidListView.UseCompatibleStateImageBehavior = False
        Me.SsidListView.View = System.Windows.Forms.View.Details
        '
        'SSID
        '
        Me.SSID.Text = "SSID"
        Me.SSID.Width = 230
        '
        'Panel1
        '
        Me.Panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.Panel1.Location = New System.Drawing.Point(272, 35)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(250, 250)
        Me.Panel1.TabIndex = 4
        '
        'Timer1
        '
        Me.Timer1.Enabled = True
        Me.Timer1.Interval = 10000
        '
        'FormMain
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 12.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(534, 291)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.SsidListView)
        Me.Controls.Add(Me.OptionLabel)
        Me.Controls.Add(Me.SsidLabel)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.MaximizeBox = False
        Me.Name = "FormMain"
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "WiFiAutoIPChanger"
        Me.ContextMenuStrip1.ResumeLayout(False)
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents ContextMenuStrip1 As ContextMenuStrip
    Friend WithEvents NotifyIcon1 As NotifyIcon
    Friend WithEvents ViewMenuItem As ToolStripMenuItem
    Friend WithEvents ConfMenuItem As ToolStripMenuItem
    Friend WithEvents CloseMenuItem As ToolStripMenuItem
    Friend WithEvents SsidLabel As Label
    Friend WithEvents OptionLabel As Label
    Friend WithEvents SsidListView As ListView
    Friend WithEvents Panel1 As Panel
    Friend WithEvents SSID As ColumnHeader
    Friend WithEvents Timer1 As Timer
End Class
