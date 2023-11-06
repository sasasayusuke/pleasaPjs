Public Class Form1
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Dim hostName As String = System.Net.Dns.GetHostName()
        Dim hostEntry As System.Net.IPHostEntry = System.Net.Dns.GetHostEntry(hostName)

        For Each ip As System.Net.IPAddress In hostEntry.AddressList
            If ip.AddressFamily = Net.Sockets.AddressFamily.InterNetwork Then
                MessageBox.Show("現在のIPアドレス: " & ip.ToString())
                Exit For
            End If
        Next
    End Sub

End Class
