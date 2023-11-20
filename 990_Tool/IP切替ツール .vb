' ����������������������������������������������������
' NIC�؂�ւ��X�N���v�g�i�C�[�T�l�b�g �� WiFi�j
' 
' �o�[�W�����F1.0.0
' 
' �T�v�F
' �@NIC��IP�ݒ�������擾���A�؂�ւ���X�N���v�g
' 
' �쐬���F2018/05/25�@�^�@SDT�@���V
' �X�V���F----/--/--�@�^�@
' 
' �X�V�����F
' V1.0.0�@2018/05/25
' �E�V�K�쐬
' 
' ����������������������������������������������������

Option Explicit

' �G���[�͖����i�ʏ����ցj
On Error Resume Next

' �Ǘ��Ҏ��s
'call runasCheck()

' �ϐ���`
Dim objWMI, objWS, REGid, CREGid, REGPath
Dim IPAddress, SubnetMask, Gateway, DNS, ServiceName, NICid, CNICid
Dim MyVar, Ret, i, strDNS
Dim networkAdapter, networkAdapters
Dim networkAdapterConfiguration, networkAdapterConfigurations, flgDHCP

' �C�[�T�l�b�g��DHCP��Ԃ̎擾
' WMI�I�u�W�F�N�g
Set objWMI = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\cimv2")
' �A�g�p�l�b�g���[�N�A�_�v�^���̎擾
Set networkAdapterConfigurations = objWMI.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration")
' �C�[�T�l�b�g���擾���邽�߁ANetworkAdapterSetting�ƘA�g���ď��擾
For Each networkAdapterConfiguration in networkAdapterConfigurations
	Set networkAdapters = objWMI.ExecQuery("ASSOCIATORS OF {Win32_NetworkAdapterConfiguration.Index='" & networkAdapterConfiguration.Index & "'} WHERE AssocClass=Win32_NetworkAdapterSetting")
	' NIC�S����
	For Each networkAdapter in networkAdapters
		' �C�[�T�l�b�g������
		IF networkAdapter.NetConnectionID = "�C�[�T�l�b�g" Then
			' DHCP��Ԃ�ON�̏ꍇ�A�ؑ֌���Wi-Fi��
			IF networkAdapterConfiguration.DHCPEnabled Then
				NICid = "Wi-Fi"
				CNICid = "�C�[�T�l�b�g"
			' DHCP��Ԃ�OFF�̏ꍇ�A�ؑ֌����C�[�T�l�b�g��
			Else
				NICid = "�C�[�T�l�b�g"
				CNICid = "Wi-Fi"
			End IF
		End If
	Next
	
Next

' �ڑ��������擾���邽�߁ANetworkAdapterSetting�ƘA�g���ď��擾
For Each networkAdapterConfiguration in networkAdapterConfigurations
	Set networkAdapters = objWMI.ExecQuery("ASSOCIATORS OF {Win32_NetworkAdapterConfiguration.Index='" & networkAdapterConfiguration.Index & "'} WHERE AssocClass=Win32_NetworkAdapterSetting")
	' NIC�Č���
	For Each networkAdapter in networkAdapters
		' �ڑ����̃��W�X�g���ڑ���������
		IF networkAdapter.NetConnectionID = NICid Then REGid = networkAdapterConfiguration.SettingID
		IF networkAdapter.NetConnectionID = CNICid Then CREGid = networkAdapterConfiguration.SettingID
	Next
Next

IF Err.Number <> 0 Then
	MSGBOX "NIC���̎擾�Ɏ��s���܂����B"
	Wscript.Quit
End IF

'MSGBOX NICid & vbCrLf & REGid

' ���W�X�g�����ڑ����̃l�b�g���[�N�����擾 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces
' WshShell �I�u�W�F�N�g
Set objWS = WScript.CreateObject("WScript.Shell")
REGPath = "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\"
IPAddress = objWS.RegRead(REGPath & REGid & "\IPAddress")
SubnetMask = objWS.RegRead(REGPath & REGid & "\SubnetMask")
Gateway = objWS.RegRead(REGPath & REGid & "\DefaultGateway")
DNS = Split(objWS.RegRead( REGPath & REGid & "\NameServer" ), ",")

'MSGBOX IPAddress(0) & vbCrLf & SubnetMask(0) & vbCrLf & Gateway(0) & vbCrLf & DNS(0)

IF Err.Number <> 0 Then
	MSGBOX "���W�X�g�����̎擾�Ɏ��s���܂����B"
	Wscript.Quit
End IF

MyVar = MsgBox ("�u" & NICid & "�v����u" & CNICid & "�v�փl�b�g���[�N��ؑւ܂��B" & vbCrLf & "��낵���ł����H", 1, "�ύX�m�F")

' �L�����Z���̏ꍇ�A�ύX���~
IF MyVar = 2 Then Wscript.Quit

' �l�b�g���[�N�ݒ�i����NIC��DHCP���j
objWS.Run "cmd.exe /c netsh interface ipv4 set add name=""" & NICid & """ source=dhcp", 0, True
objWS.Run "cmd.exe /c netsh interface ipv4 set dnsservers name=""" & NICid & """ source=dhcp", 0, True
IF NICid = "�C�[�T�l�b�g" Then objWS.Run "cmd.exe /c netsh interface set interface """ & NICid & """ disable", 0 ,True

' �l�b�g���[�N�ݒ�i�ύX��NIC�̐ݒ�j
IF CNICid = "�C�[�T�l�b�g" Then objWS.Run "cmd.exe /c netsh interface set interface """ & CNICid & """ enable", 0 ,True
objWS.Run "cmd.exe /c netsh interface ipv4 set address """ & CNICid & """ static " & IPAddress(0) & " " & Subnetmask(0) & " " & Gateway(0), 0, True
' DHCP�����������i�ؒf�△�����Ή��j
objWS.RegWrite REGPath & CREGid & "\EnableDHCP", 0, "REG_DWORD"

' DNS�z��̑S����
i = 0
For each strDNS in DNS
	i = i + 1
	objWS.Run "cmd.exe /c netsh interface ipv4 add dns name=""" & CNICid & """ addr=" & strDNS  & " index=" & i & """", 0, True
Next

IF Err.Number <> 0 Then
	MSGBOX "NIC���̏��������Ɏ��s���܂����B"
	Wscript.Quit
End IF

MsgBox "�u" & NICid & "�v����u" & CNICid & "�v�ւ̃l�b�g���[�N�ؑւ��������܂���" , 0, "����I��"

Wscript.Quit

' �����Ǘ��Ҏ��sFunc
Function runasCheck()
	Dim strScriptPathName

	Dim flgRunasMode
	Dim objWMI, osInfo, flag, objShell, os
	Dim strArgs
	Dim args

	Set args = WScript.Arguments

	flgRunasMode = False
	strArgs = ""

	' �t���O�̎擾
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

