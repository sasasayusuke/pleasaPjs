Attribute VB_Name = "Main"
Dim sectionCount As Integer

Sub getDatga()
On Err GoTo Error:
    '�ϐ����`
    Dim errMsg As String
    Dim json As New Dictionary

    Dim headersInfo As New Dictionary

    Dim convertorInfoColl As New Collection
    Dim convertorInfo As New Dictionary

    Dim sitesColl As New Collection
    Dim sitesDic As New Dictionary
    Dim siteSettingsDic As New Dictionary

    Dim dataColl As New Collection

    Dim permissionsColl As New Collection
    Dim permissionColl As New Collection
    Dim permissionsDic As New Dictionary

    Dim permissionIdListDic As New Dictionary
    Dim deptIdListColl As New Collection
    Dim groupIdListColl As New Collection
    Dim userIdListColl As New Collection
    Dim userIdListDic As New Dictionary

    Dim jsonStr As String

    sectionCount = 0

    '�w�b�_�[����ϐ��Ɋi�[
    Dim tenantId As Integer
    Dim version As Double
    Dim server As String
    Dim creatorName As String
    Dim packageTime As String
    Dim siteId As Integer
    Dim body As String
    Dim gridguide As String
    Dim editorGuide As String
    Dim includeSitePermission As Boolean
    Dim includeRecordPermission As Boolean
    Dim includeColumnPermission As Boolean
    Dim publish As Boolean
    Dim disableCrossSearch As Boolean
    Dim referenceType As String

    Dim userColl As New Collection
    Dim userArray(2) As String
    Dim userId As String
    Dim loginId As String
    Dim permissionType As String


    Dim styleColl As New Collection
    Dim styleArray(1) As String
    Dim styleTitle As String
    Dim styleContent As String

    Dim scriptColl As New Collection
    Dim scriptArray(1) As String
    Dim scriptTitle As String
    Dim scriptContent As String

    If Not Cells(2, 5).value = "" Then
        tenantId = Val(Cells(2, 5).value)
    Else
        tenantId = 0
    End If

    If Not Cells(3, 5).value = "" Then
        version = Val(Cells(3, 5).value)
    Else
        version = 0
    End If

    If Not Cells(4, 5).value = "" Then
        server = Cells(4, 5).value
    Else
        server = ""
    End If

    If Not Cells(5, 5).value = "" Then
        creatorName = Cells(5, 5).value
    Else
        creatorName = ""
    End If

    If Not Cells(6, 5).value = "" Then
        packageTime = Cells(6, 5).value
    Else
        packageTime = ""
    End If

    If Not Cells(7, 5).value = "" Then
        siteId = Val(Cells(7, 5).value)
    Else
        siteId = 0
    End If

    If Not Cells(8, 5).value = "" Then
        body = Cells(8, 5).value
    Else
        body = ""
    End If

    If Not Cells(9, 5).value = "" Then
        gridguide = Cells(9, 5).value
    Else
        gridguide = ""
    End If

    If Not Cells(10, 5).value = "" Then
        editorGuide = Cells(10, 5).value
    Else
        editorGuide = ""
    End If

    If Not Cells(11, 5).value = "" Then
        includeSitePermission = Cells(11, 5).value
    Else
        includeSitePermission = True
    End If

    If Not Cells(12, 5).value = "" Then
        includeRecordPermission = Cells(12, 5).value
    Else
        includeRecordPermission = True
    End If

    If Not Cells(13, 5).value = "" Then
        includeColumnPermission = Cells(13, 5).value
    Else
        includeColumnPermission = True
    End If

    If Not Cells(14, 5).value = "" Then
        publish = Cells(14, 5).value
    Else
        publish = False
    End If

    If Not Cells(15, 5).value = "" Then
        disableCrossSearch = Cells(15, 5).value
    Else
        disableCrossSearch = False
    End If

    If Not Cells(16, 5).value = "" Then
        referenceType = Cells(16, 5).value
    Else
        referenceType = ""
    End If


    '���[�U���O�C�����
    For i = 5 To 99
        If Not Cells(17, i).value = "" Then
            userArray(0) = Cells(17, i).value
        Else
            Exit For
        End If

        If Not Cells(18, i).value = "" Then
            userArray(1) = Cells(18, i).value
        Else
            userArray(1) = "0"
        End If

        If Not Cells(19, i).value = "" Then
            userArray(2) = Cells(19, i).value
        Else
            userArray(2) = ""
        End If

        userColl.Add userArray

    Next

    For i = 5 To 99
        If Not Cells(20, i).value = "" Then
            styleArray(0) = Cells(20, i).value
        Else
            Exit For
        End If

        If Not Cells(21, i).value = "" Then
            styleArray(1) = Cells(21, i).value
        Else
            styleArray(1) = ""
        End If

        styleColl.Add styleArray
    Next

    For i = 5 To 99
        If Not Cells(22, i).value = "" Then
            scriptArray(0) = Cells(22, i).value
        Else
            Exit For
        End If

        If Not Cells(23, i).value = "" Then
            scriptArray(1) = Cells(23, i).value
        Else
            scriptArray(1) = ""
        End If

        scriptColl.Add scriptArray
    Next

    'Index���̔�
    Dim res As Integer
    res = indexNumber()
    If res = 1 Then
        Exit Sub
    End If

    'convertor�����擾(�w�b�_�[��񍀖�)
    convertorInfo.Add "SiteId", siteId
    convertorInfo.Add "SiteTitle", ActiveSheet.name
    convertorInfo.Add "ReferenceType", referenceType
    convertorInfo.Add "IncludeData", False
    convertorInfoColl.Add convertorInfo

    '�w�b�_�[�����擾
    headersInfo.Add "BaseSiteId", siteId
    headersInfo.Add "Server", server
    headersInfo.Add "CreatorName", creatorName
    headersInfo.Add "PackageTime", packageTime
    headersInfo.Add "Convertors", convertorInfoColl
    headersInfo.Add "IncludeSitePermission", includeSitePermission
    headersInfo.Add "IncludeRecordPermission", includeRecordPermission
    headersInfo.Add "IncludeColumnPermission", includeColumnPermission

    '�T�C�g�����擾
    Dim key As Variant
    Dim tmpChoise As String
    Dim sectionDic As New Dictionary
    Dim sectionColl As New Collection
    Dim generalColl As New Collection
    Dim editDic As New Dictionary
    Dim editColl As New Collection
    Dim linksDic As New Dictionary
    Dim linksColl As New Collection
    Dim linksColumnsColl As New Collection
    Dim filterColumnsColl As New Collection
    Dim gridColumnsColl As New Collection
    Dim editorColumnHashDic As New Dictionary
    Dim stylesDic As New Dictionary
    Dim stylesColl As New Collection
    Dim scriptsDic As New Dictionary
    Dim scriptsColl As New Collection

    tableLastRow = Cells(Rows.count, 2).End(xlUp).Row

    For i = TABLE_START_ROW To tableLastRow

        '���o����O�`�F�b�N
        If Cells(i, 3) = "���o��" Then
            If Cells(i, 6) = MARK_OK Or Cells(i, 7) = MARK_OK Or Cells(i, 8) = MARK_OK Then
                MsgBox "�^���u���o���v���ڂ̏ꍇ�A" & vbCrLf & "�����N�^�t�B���^�^�ꗗ�ɁZ�͐ݒ肵�Ȃ��ł��������B"
                Exit Sub
            End If
        End If

        '�Z�N�V�����擾
        If InStr(Cells(i, 1), "Section") Then
            sectionDic.Add "Id", Val(Split(Cells(i, 1), "-")(1))
            sectionDic.Add "LabelText", Cells(i, 2)
            sectionDic.Add "AllowExpand", True
            sectionDic.Add "Expand", True

            sectionColl.Add sectionDic

            Set sectionDic = Nothing
            Set sectionDic = New Dictionary
        End If

        '�G�f�B�^���ڏ��ǉ�
        If Cells(i, 5).value = MARK_OK Then

            generalColl.Add Cells(i, 1)

            editDic.Add "ColumnName", Cells(i, 1)
            editDic.Add "LabelText", Cells(i, 2)
            editDic.Add "Description", Cells(i, 18)
            If Cells(i, 4) = MARK_OK Then
                editDic.Add "FORMAT", True
            Else
                editDic.Add "FORMAT", Cells(i, 4)
            End If
            editDic.Add "MaxLength", Cells(i, 9)
            editDic.Add "Min", Cells(i, 11)
            editDic.Add "Max", Cells(i, 12)
            editDic.Add "DefaultInput", Cells(i, 13)
            editDic.Add "Unit", Cells(i, 14)
            editDic.Add "DecimalPlaces", Cells(i, 10)
            If Cells(i, 15) = MARK_OK Then
                editDic.Add "ValidateRequired", True
            Else
                editDic.Add "ValidateRequired", Cells(i, 15)
            End If
            If Cells(i, 16) = MARK_OK Then
                editDic.Add "NoDuplication", True
            Else
                editDic.Add "NoDuplication", Cells(i, 16)
            End If
            If Cells(i, 20) = MARK_OK Then
                editDic.Add "MultipleSelections", True
            Else
                editDic.Add "MultipleSelections", Cells(i, 20)
            End If
            If Cells(i, 21) = MARK_OK Then
                editDic.Add "NoWrap", True
            Else
                editDic.Add "NoWrap", Cells(i, 21)
            End If
            editDic.Add "ExtendedCellCss", Cells(i, 19)

            tmpChoise = Cells(i, 17).value

            If IsNumeric(tmpChoise) Then
                editDic.Add "ChoicesText", "[[" & tmpChoise & "]]"
                editDic.Add "Link", True
                linksDic.Add "ColumnName", Cells(i, 1)
                linksDic.Add "SiteId", Int(tmpChoise)
                linksColl.Add linksDic

                Set linksDic = Nothing
                Set linksDic = New Dictionary

            ElseIf Not tmpChoise = "" Then
                editDic.Add "ChoicesText", tmpChoise
                editDic.Add "Link", True
                linksDic.Add "ColumnName", Cells(i, 1)
                linksDic.Add "SiteId", Int(Replace(Replace(tmpChoise, "[", ""), "]", ""))
                linksColl.Add linksDic

                Set linksDic = Nothing
                Set linksDic = New Dictionary
            End If

            '��̍��ڂ��폜
            For Each key In editDic
                If editDic.Item(key) = "" Then
                    editDic.Remove key
                End If
            Next key

            editColl.Add editDic

            Set editDic = Nothing
            Set editDic = New Dictionary

        End If

        '�����N���ڏ��ǉ�
        If Cells(i, 6).value = MARK_OK Then
            linksColumnsColl.Add Cells(i, 1)
        End If

        '�t�B���^���ڏ��ǉ�
        If Cells(i, 7).value = MARK_OK Then
            filterColumnsColl.Add Cells(i, 1)
        End If

        '�ꗗ���ڏ��ǉ�
        If Cells(i, 8).value = MARK_OK Then
            gridColumnsColl.Add Cells(i, 1)
        End If
    Next

    editorColumnHashDic.Add "General", generalColl

    For i = 1 To styleColl.count()
        stylesDic.Add "Id", i
        stylesDic.Add "Title", styleColl.Item(i)(0)
        stylesDic.Add "All", True
        stylesDic.Add "Body", styleColl.Item(i)(1)

        stylesColl.Add stylesDic

        Set stylesDic = Nothing
        Set stylesDic = New Dictionary
    Next i

    For i = 1 To scriptColl.count()
        scriptsDic.Add "Id", i
        scriptsDic.Add "Title", scriptColl.Item(i)(0)
        scriptsDic.Add "All", True
        scriptsDic.Add "Body", scriptColl.Item(i)(1)

        scriptsColl.Add scriptsDic

        Set scriptsDic = Nothing
        Set scriptsDic = New Dictionary
    Next i

    siteSettingsDic.Add "Version", version
    If Not (referenceType = "Results" Or referenceType = "Issues") Then
        errMsg = "�e�[�u���^��񂪊Ԉ���Ă��܂��B"
        Exit Sub
    End If
    siteSettingsDic.Add "ReferenceType", referenceType
    siteSettingsDic.Add "GridColumns", gridColumnsColl
    siteSettingsDic.Add "FilterColumns", filterColumnsColl
    siteSettingsDic.Add "EditorColumnHash", editorColumnHashDic
    siteSettingsDic.Add "TabLatestId", 0
    siteSettingsDic.Add "Tabs", New Collection
    siteSettingsDic.Add "SectionLatestId", Int(sectionCount)
    siteSettingsDic.Add "Sections", sectionColl
    siteSettingsDic.Add "LinkColumns", linksColumnsColl
    siteSettingsDic.Add "Columns", editColl
    siteSettingsDic.Add "Links", linksColl
    siteSettingsDic.Add "Exports", New Collection
    siteSettingsDic.Add "Styles", stylesColl
    siteSettingsDic.Add "Scripts", scriptsColl
    siteSettingsDic.Add "NoDisplayIfReadOnly", False

    Dim tmp As String
    tmp = Cells(8, 5)
    sitesDic.Add "TenantId", tenantId
    sitesDic.Add "SiteId", siteId
    sitesDic.Add "Title", ActiveSheet.name
    sitesDic.Add "Body", tmp
    sitesDic.Add "GridGuide", gridguide
    sitesDic.Add "EditorGuide", editorGuide
    sitesDic.Add "ReferenceType", referenceType
    sitesDic.Add "ParentId", 0
    sitesDic.Add "InheritPermission", 0
    sitesDic.Add "SiteSettings", siteSettingsDic
    sitesDic.Add "Publish", publish
    sitesDic.Add "DisableCrossSearch", disableCrossSearch
    sitesDic.Add "Comments", New Collection

    sitesColl.Add sitesDic

    '�p�[�~�b�V���������擾
    Dim tmpDic As New Dictionary
    For i = 1 To userColl.count()
        tmpDic.Add "ReferenceId", siteId
        tmpDic.Add "DeptId", 0
        tmpDic.Add "GroupId", 0
        tmpDic.Add "UserId", Val(userColl.Item(i)(0))
        tmpDic.Add "PermissionType", Val(userColl.Item(i)(2))
        permissionsColl.Add tmpDic

        Set tmpDic = Nothing
        Set tmpDic = New Dictionary
    Next
    permissionsDic.Add "SiteId", siteId
    permissionsDic.Add "Permissions", permissionsColl
    permissionColl.Add permissionsDic

    '�p�[�~�b�V����ID�����擾
    For i = 1 To userColl.count()
        tmpDic.Add "UserId", Val(userColl.Item(i)(0))
        tmpDic.Add "LoginId", userColl.Item(i)(1)
        userIdListColl.Add tmpDic

        Set tmpDic = Nothing
        Set tmpDic = New Dictionary
    Next i
    permissionIdListDic.Add "DeptIdList", deptIdListColl
    permissionIdListDic.Add "GroupIdList", groupIdListColl
    permissionIdListDic.Add "UserIdList", userIdListColl

    '�e����JSON������Ɋi�[
    json.Add "HeaderInfo", headersInfo
    json.Add "Sites", sitesColl
    json.Add "Data", dataColl
    json.Add "Permissions", permissionColl
    json.Add "PermissionIdList", permissionIdListDic

    'JSON�������JSON�`���ɕϊ�
    jsonStr = JsonConverter.ConvertToJson(json, " ", 4)

    'JSON�t�@�C���ɏo��
    Dim Target As String
    Target = ThisWorkbook.Path & "\" & ActiveSheet.name & ".json"
    With CreateObject("ADODB.Stream")
        .Charset = "UTF-8"
        .Open
        .WriteText jsonStr
        .SaveToFile Target, 2
        .Close
    End With

    MsgBox "JSON�t�@�C�����o�͂��܂����B"

    Exit Sub

Error:

    MsgBox "�G���[�ł��B"

End Sub

'###############################################################
'Index�ԍ����̔�
'###############################################################
Function indexNumber() As Integer
On Err GoTo ErrStep:
    '�^���`
    Dim typeDic As New Dictionary

    typeDic.Add "�^�C�g��", "Title"
    typeDic.Add "���e", "Body"
    typeDic.Add "����", "CompletionTime"
    typeDic.Add "���ލ���", "Class"
    typeDic.Add "���l����", "Num"
    typeDic.Add "���t����", "Date"
    typeDic.Add "��������", "Description"
    typeDic.Add "�`�F�b�N����", "Check"
    typeDic.Add "�Y�t�t�@�C������", "Attachments"
    typeDic.Add "���o��", "Section"

    Dim typeCountDic As New Dictionary
    typeCountDic.Add "�^�C�g��", 0
    typeCountDic.Add "���e", 0
    typeCountDic.Add "����", 0
    typeCountDic.Add "���ލ���", 0
    typeCountDic.Add "���l����", 0
    typeCountDic.Add "���t����", 0
    typeCountDic.Add "��������", 0
    typeCountDic.Add "�`�F�b�N����", 0
    typeCountDic.Add "�Y�t�t�@�C������", 0
    typeCountDic.Add "���o��", 0

    'Index���̔�
    Dim alphabetArray() As Variant
    Dim tableLastRow As Integer
    Dim typeVal As String
    Dim sectionLatestId As Integer

    alphabetArray = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")

    tableLastRow = Cells(Rows.count, 2).End(xlUp).Row

    sectionLatestId = 0

    sectionCount = 0

    For i = TABLE_START_ROW To tableLastRow
        typeVal = Cells(i, TYPE_COLUMN).value
        If typeDic.Exists(typeVal) Then
            '���o��
            If typeVal = "���o��" Then
                sectionLatestId = sectionLatestId + 1
                Cells(i, INDEX_COLUMN).value = "_Section-" & sectionLatestId
                sectionCount = sectionCount + 1

            '�^�C�g��
            ElseIf typeVal = "�^�C�g��" Then
                If typeCountDic("�^�C�g��") = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "�^�C�g�����Q�ȏ�ݒ肳��Ă��܂��B"
                    GoTo ErrStep
                End If

            '���e
            ElseIf typeVal = "���e" Then
                If typeCountDic(typeVal) = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "���e���Q�ȏ�ݒ肳��Ă��܂��B"
                    GoTo ErrStep
                End If

            '����
            ElseIf typeVal = "����" Then
                If Not Cells(16, 5).value = "Issues" Then
                    MsgBox "�L�^�e�[�u���ȊO�Ŋ������ڂ͎g���܂���B"
                    GoTo ErrStep
                End If
                If typeCountDic.Item(typeVal) = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "���e���Q�ȏ�ݒ肳��Ă��܂��B"
                    GoTo ErrStep
                End If

            '���̑�
            Else
                If typeCountDic.Item(typeVal) < utilCount(alphabetArray) Then
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal) & alphabetArray(typeCountDic.Item(typeVal))
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    strNum = format(typeCountDic.Item(typeVal) - 25, "000")
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal) & strNum
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                End If

            End If
        Else
            MsgBox str(i) & "�s�ڂɕs���Ȍ^�����͂���Ă��܂��B"
            GoTo ErrStep
        End If
    Next

    indexNumber = 0

    Exit Function

ErrStep:

    indexNumber = 1

End Function
