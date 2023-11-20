Imports System.IO

Public Class Constants
    ' 設定ファイルのパスを保持するShared ReadOnlyプロパティ
    Public Const EMPTY_IP_ADDRESS As String = "___.___.___.___"

    Public Const SETTING_FILE As String = "Settings.xml"
    Public Const SETTING_SECTION As String = "Settings"
    Public Const SETTING_TAG As String = "Setting"


    Public Shared ReadOnly Property APP_PATH As String
        Get
            Return Path.Combine(Application.StartupPath, SETTING_FILE)
        End Get
    End Property
End Class