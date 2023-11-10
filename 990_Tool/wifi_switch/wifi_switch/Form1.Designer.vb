<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        components = New ComponentModel.Container()
        Dim resources As ComponentModel.ComponentResourceManager = New ComponentModel.ComponentResourceManager(GetType(Form1))
        Button1 = New Button()
        Panel1 = New Panel()
        SplitContainer1 = New SplitContainer()
        NotifyIcon1 = New NotifyIcon(components)
        Label2 = New Label()
        Label1 = New Label()
        Panel1.SuspendLayout()
        CType(SplitContainer1, ComponentModel.ISupportInitialize).BeginInit()
        SplitContainer1.SuspendLayout()
        SuspendLayout()
        ' 
        ' Button1
        ' 
        Button1.Location = New Point(776, 23)
        Button1.Margin = New Padding(0)
        Button1.Name = "Button1"
        Button1.Size = New Size(33, 40)
        Button1.TabIndex = 0
        Button1.Text = "+"
        Button1.UseVisualStyleBackColor = True
        ' 
        ' Panel1
        ' 
        Panel1.AutoScroll = True
        Panel1.BackColor = SystemColors.InactiveBorder
        Panel1.BackgroundImageLayout = ImageLayout.Stretch
        Panel1.BorderStyle = BorderStyle.Fixed3D
        Panel1.Controls.Add(SplitContainer1)
        Panel1.Location = New Point(12, 74)
        Panel1.Name = "Panel1"
        Panel1.Size = New Size(811, 420)
        Panel1.TabIndex = 3
        ' 
        ' SplitContainer1
        ' 
        SplitContainer1.BackColor = SystemColors.MenuBar
        SplitContainer1.Dock = DockStyle.Fill
        SplitContainer1.Location = New Point(0, 0)
        SplitContainer1.Name = "SplitContainer1"
        ' 
        ' SplitContainer1.Panel1
        ' 
        SplitContainer1.Panel1.AutoScroll = True
        ' 
        ' SplitContainer1.Panel2
        ' 
        SplitContainer1.Panel2.AutoScroll = True
        SplitContainer1.Panel2.BackColor = SystemColors.ControlDark
        SplitContainer1.Size = New Size(807, 416)
        SplitContainer1.SplitterDistance = 424
        SplitContainer1.TabIndex = 0
        ' 
        ' NotifyIcon1
        ' 
        NotifyIcon1.BalloonTipIcon = ToolTipIcon.Info
        NotifyIcon1.BalloonTipText = "ballonTipText"
        NotifyIcon1.BalloonTipTitle = "baloonTitle"
        NotifyIcon1.Icon = CType(resources.GetObject("NotifyIcon1.Icon"), Icon)
        NotifyIcon1.Text = "Wifi_Switch"
        NotifyIcon1.Visible = True
        ' 
        ' Label2
        ' 
        Label2.BackColor = SystemColors.ActiveCaption
        Label2.Location = New Point(444, 18)
        Label2.Name = "Label2"
        Label2.Padding = New Padding(25, 15, 25, 15)
        Label2.Size = New Size(379, 51)
        Label2.TabIndex = 4
        Label2.Text = "接続可"
        Label2.TextAlign = ContentAlignment.MiddleCenter
        ' 
        ' Label1
        ' 
        Label1.BackColor = SystemColors.ActiveCaption
        Label1.Location = New Point(14, 18)
        Label1.Name = "Label1"
        Label1.Padding = New Padding(25, 15, 25, 15)
        Label1.Size = New Size(424, 51)
        Label1.TabIndex = 5
        Label1.Text = "優先順位"
        Label1.TextAlign = ContentAlignment.MiddleCenter
        ' 
        ' Form1
        ' 
        AutoScaleDimensions = New SizeF(9F, 21F)
        AutoScaleMode = AutoScaleMode.Font
        BackColor = SystemColors.GradientInactiveCaption
        BackgroundImageLayout = ImageLayout.Zoom
        ClientSize = New Size(835, 498)
        Controls.Add(Label1)
        Controls.Add(Button1)
        Controls.Add(Panel1)
        Controls.Add(Label2)
        Font = New Font("Yu Gothic UI Semibold", 12F, FontStyle.Bold Or FontStyle.Italic, GraphicsUnit.Point)
        ForeColor = SystemColors.Highlight
        Icon = CType(resources.GetObject("$this.Icon"), Icon)
        Margin = New Padding(4)
        Name = "Form1"
        Text = "Wifi_Switch"
        TopMost = True
        Panel1.ResumeLayout(False)
        CType(SplitContainer1, ComponentModel.ISupportInitialize).EndInit()
        SplitContainer1.ResumeLayout(False)
        ResumeLayout(False)
    End Sub

    Friend WithEvents Button1 As Button
    Friend WithEvents Panel1 As Panel
    Friend WithEvents NotifyIcon1 As NotifyIcon
    Friend WithEvents SplitContainer1 As SplitContainer
    Friend WithEvents Label2 As Label
    Friend WithEvents Label1 As Label
End Class
