Imports System.Management

Module NICSwitchScript

    Sub Main()
        ' 必要な名前空間のインポートと変数の初期化
        Dim NICid As String = ""
        Dim CNICid As String = ""
        Dim networkAdapters As ManagementObjectSearcher
        Dim networkAdapterConfigurations As ManagementObjectCollection
        Dim objOS As ManagementObjectSearcher

        Try
            ' イーサネットのDHCP状態の取得
            networkAdapters = New ManagementObjectSearcher("root\CIMV2", "SELECT * FROM Win32_NetworkAdapter")
            networkAdapterConfigurations = New ManagementObjectSearcher("root\CIMV2", "SELECT * FROM Win32_NetworkAdapterConfiguration").Get()

            For Each adapter As ManagementObject In networkAdapterConfigurations
                ' 各アダプターの処理
            Next

            ' レジストリ情報の取得とネットワークの設定変更
            ' Windows RegistryへのアクセスとNetSHコマンドの実行には、
            ' Microsoft.Win32.RegistryクラスとSystem.Diagnostics.Processクラスを使用します。

            ' 管理者権限の確認
            ' VB.NETアプリケーションでは、アプリケーションのマニフェストに
            ' <requestedExecutionLevel level="requireAdministrator"/> を含めることで実行します。

        Catch ex As Exception
            MessageBox.Show("エラーが発生しました：" & ex.Message)
        End Try
    End Sub

End Module
