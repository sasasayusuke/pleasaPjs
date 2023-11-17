Imports System.Diagnostics
Public Class Util
    Public Shared Function ExecuteCommand(command As String) As String
        Try
            Using process As New Process()
                process.StartInfo.FileName = "cmd.exe"
                process.StartInfo.Arguments = "/c " & command
                process.StartInfo.RedirectStandardOutput = True
                process.StartInfo.UseShellExecute = False
                process.StartInfo.CreateNoWindow = True
                process.Start()

                Dim output As String = process.StandardOutput.ReadToEnd()
                process.WaitForExit()

                Return output
            End Using
        Catch ex As Exception
            Return "Error: " & ex.Message
        End Try
    End Function
    Public Shared Function GetAvailableNetworkSSIDs() As List(Of String)
        Dim ssidList As New List(Of String)
        Dim output As String = ExecuteCommand("netsh wlan show networks")

        Dim lines As String() = output.Split(New String() {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
        For Each line In lines
            If line.Contains("SSID") AndAlso Not line.Contains("BSSID") Then
                ' SSID行からSSID名を取得します。
                Dim ssid As String = line.Split(New String() {":"}, StringSplitOptions.RemoveEmptyEntries)(1).Trim()
                ssidList.Add(ssid)
            End If
        Next

        Return ssidList
    End Function

    Public Shared Sub AddControlsToPanel(ByVal panel As Panel)
        ' 利用可能なWi-FiネットワークのSSIDを取得します。
        Dim ssids As List(Of String) = GetAvailableNetworkSSIDs()
        Dim nextControlTop As Integer = 10

        ' SSIDごとにラベルを生成し、パネルに追加します。
        For Each ssid As String In ssids
            Dim newLabel As New Label()
            newLabel.Text = ssid
            newLabel.AutoSize = True
            newLabel.Location = New Point(10, nextControlTop)
            panel.Controls.Add(newLabel)
            nextControlTop += newLabel.Height + 5  ' 次のコントロールのためにスペースを追加します。
        Next
    End Sub
End Class
