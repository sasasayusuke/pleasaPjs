Public Class Settings
    ' ここに共有したい設定を定数またはプロパティとして定義します。
    Public Const DefaultHostName As String = "localhost"

    ' 静的なプロパティの例
    Public Shared ReadOnly Property ApplicationName As String
        Get
            Return "My Application"
        End Get
    End Property

    ' 設定可能なプロパティの例
    Public Shared Property buttonCnt As Integer = 1
    Public Shared Property lastButtonBottom As Integer = 0
End Class
