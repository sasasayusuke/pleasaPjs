Imports System.IO

Public Class Constants
    ' 設定ファイルのパスを保持するShared ReadOnlyプロパティ
    Public Shared ReadOnly Property APP_PATH As String
        Get
            Return Path.Combine(Application.StartupPath, "settings.xml")
        End Get
    End Property
End Class