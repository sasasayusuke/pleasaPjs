' ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
' NIC切り替えスクリプト（イーサネット ⇔ WiFi）
' 
' バージョン：1.0.0
' 
' 概要：
' 　NICのIP設定を自動取得し、切り替えるスクリプト
' 
' 作成日：2018/05/25　／　SDT　寺澤
' 更新日：----/--/--　／　
' 
' 更新履歴：
' V1.0.0　2018/05/25
' ・新規作成
' 
' ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

Option Explicit

' エラーは無視（別処理へ）
On Error Resume Next

' 管理者実行
'call runasCheck()

' 変数定義
Dim objWMI, objWS, REGid, CREGid, REGPath
Dim IPAddress, SubnetMask, Gateway, DNS, ServiceName, NICid, CNICid
Dim MyVar, Ret, i, strDNS
Dim networkAdapter, networkAdapters
Dim networkAdapterConfiguration, networkAdapterConfigurations, flgDHCP

' イーサネットのDHCP状態の取得
' WMIオブジェクト
Set objWMI = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\cimv2")
' 連携用ネットワークアダプタ情報の取得
Set networkAdapterConfigurations = objWMI.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration")
' イーサネットを取得するため、NetworkAdapterSettingと連携して情報取得
For Each networkAdapterConfiguration in networkAdapterConfigurations
	Set networkAdapters = objWMI.ExecQuery("ASSOCIATORS OF {Win32_NetworkAdapterConfiguration.Index='" & networkAdapterConfiguration.Index & "'} WHERE AssocClass=Win32_NetworkAdapterSetting")
	' NIC全検索
	For Each networkAdapter in networkAdapters
		' イーサネットを検索
		IF networkAdapter.NetConnectionID = "イーサネット" Then
			' DHCP状態がONの場合、切替元をWi-Fiへ
			IF networkAdapterConfiguration.DHCPEnabled Then
				NICid = "Wi-Fi"
				CNICid = "イーサネット"
			' DHCP状態がOFFの場合、切替元をイーサネットへ
			Else
				NICid = "イーサネット"
				CNICid = "Wi-Fi"
			End IF
		End If
	Next
	
Next

' 接続元情報を取得するため、NetworkAdapterSettingと連携して情報取得
For Each networkAdapterConfiguration in networkAdapterConfigurations
	Set networkAdapters = objWMI.ExecQuery("ASSOCIATORS OF {Win32_NetworkAdapterConfiguration.Index='" & networkAdapterConfiguration.Index & "'} WHERE AssocClass=Win32_NetworkAdapterSetting")
	' NIC再検索
	For Each networkAdapter in networkAdapters
		' 接続元のレジストリ接続情報を検索
		IF networkAdapter.NetConnectionID = NICid Then REGid = networkAdapterConfiguration.SettingID
		IF networkAdapter.NetConnectionID = CNICid Then CREGid = networkAdapterConfiguration.SettingID
	Next
Next

IF Err.Number <> 0 Then
	MSGBOX "NIC情報の取得に失敗しました。"
	Wscript.Quit
End IF

'MSGBOX NICid & vbCrLf & REGid

' レジストリより接続元のネットワーク情報を取得 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces
' WshShell オブジェクト
Set objWS = WScript.CreateObject("WScript.Shell")
REGPath = "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\"
IPAddress = objWS.RegRead(REGPath & REGid & "\IPAddress")
SubnetMask = objWS.RegRead(REGPath & REGid & "\SubnetMask")
Gateway = objWS.RegRead(REGPath & REGid & "\DefaultGateway")
DNS = Split(objWS.RegRead( REGPath & REGid & "\NameServer" ), ",")

'MSGBOX IPAddress(0) & vbCrLf & SubnetMask(0) & vbCrLf & Gateway(0) & vbCrLf & DNS(0)

IF Err.Number <> 0 Then
	MSGBOX "レジストリ情報の取得に失敗しました。"
	Wscript.Quit
End IF

MyVar = MsgBox ("「" & NICid & "」から「" & CNICid & "」へネットワークを切替ます。" & vbCrLf & "よろしいですか？", 1, "変更確認")

' キャンセルの場合、変更中止
IF MyVar = 2 Then Wscript.Quit

' ネットワーク設定（元のNICのDHCP化）
objWS.Run "cmd.exe /c netsh interface ipv4 set add name=""" & NICid & """ source=dhcp", 0, True
objWS.Run "cmd.exe /c netsh interface ipv4 set dnsservers name=""" & NICid & """ source=dhcp", 0, True
IF NICid = "イーサネット" Then objWS.Run "cmd.exe /c netsh interface set interface """ & NICid & """ disable", 0 ,True

' ネットワーク設定（変更先NICの設定）
IF CNICid = "イーサネット" Then objWS.Run "cmd.exe /c netsh interface set interface """ & CNICid & """ enable", 0 ,True
objWS.Run "cmd.exe /c netsh interface ipv4 set address """ & CNICid & """ static " & IPAddress(0) & " " & Subnetmask(0) & " " & Gateway(0), 0, True
' DHCP強制無効化（切断や無効時対応）
objWS.RegWrite REGPath & CREGid & "\EnableDHCP", 0, "REG_DWORD"

' DNS配列の全処理
i = 0
For each strDNS in DNS
	i = i + 1
	objWS.Run "cmd.exe /c netsh interface ipv4 add dns name=""" & CNICid & """ addr=" & strDNS  & " index=" & i & """", 0, True
Next

IF Err.Number <> 0 Then
	MSGBOX "NIC情報の書き換えに失敗しました。"
	Wscript.Quit
End IF

MsgBox "「" & NICid & "」から「" & CNICid & "」へのネットワーク切替が完了しました" , 0, "正常終了"

Wscript.Quit

' 強制管理者実行Func
Function runasCheck()
	Dim strScriptPathName

	Dim flgRunasMode
	Dim objWMI, osInfo, flag, objShell, os
	Dim strArgs
	Dim args

	Set args = WScript.Arguments

	flgRunasMode = False
	strArgs = ""

	' フラグの取得
	If args.Count > 0 Then
		If UCase(args.item(0)) = "/RUNAS" Then
			flgRunasMode = True
		End If
		strArgs = strArgs & " " & args.item(0)
	End If

	Set objWMI = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\.\root\cimv2")
	Set osInfo = objWMI.ExecQuery("SELECT * FROM Win32_OperatingSystem")
	flag = false
	For Each os in osInfo
		If Left(os.Version, 3) >= 6.0 Then
			flag = True
		End If
	Next

	Set objShell = CreateObject("Shell.Application")
	If flgRunasMode = False Then
		If flag = True Then
			objShell.ShellExecute "wscript.exe", """" & WScript.ScriptFullName & """" & " /RUNAS " & strArgs, _
				"", "runas", 1
			Wscript.Quit
		End If
	End If
End Function

