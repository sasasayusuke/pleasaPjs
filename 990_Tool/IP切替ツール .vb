Imports System.Management

Module NICSwitchScript

    Sub Main()
        ' �K�v�Ȗ��O��Ԃ̃C���|�[�g�ƕϐ��̏�����
        Dim NICid As String = ""
        Dim CNICid As String = ""
        Dim networkAdapters As ManagementObjectSearcher
        Dim networkAdapterConfigurations As ManagementObjectCollection
        Dim objOS As ManagementObjectSearcher

        Try
            ' �C�[�T�l�b�g��DHCP��Ԃ̎擾
            networkAdapters = New ManagementObjectSearcher("root\CIMV2", "SELECT * FROM Win32_NetworkAdapter")
            networkAdapterConfigurations = New ManagementObjectSearcher("root\CIMV2", "SELECT * FROM Win32_NetworkAdapterConfiguration").Get()

            For Each adapter As ManagementObject In networkAdapterConfigurations
                ' �e�A�_�v�^�[�̏���
            Next

            ' ���W�X�g�����̎擾�ƃl�b�g���[�N�̐ݒ�ύX
            ' Windows Registry�ւ̃A�N�Z�X��NetSH�R�}���h�̎��s�ɂ́A
            ' Microsoft.Win32.Registry�N���X��System.Diagnostics.Process�N���X���g�p���܂��B

            ' �Ǘ��Ҍ����̊m�F
            ' VB.NET�A�v���P�[�V�����ł́A�A�v���P�[�V�����̃}�j�t�F�X�g��
            ' <requestedExecutionLevel level="requireAdministrator"/> ���܂߂邱�ƂŎ��s���܂��B

        Catch ex As Exception
            MessageBox.Show("�G���[���������܂����F" & ex.Message)
        End Try
    End Sub

End Module
