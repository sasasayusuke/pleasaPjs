Attribute VB_Name = "Main"
Dim sectionCount As Integer

Sub getDatga()
On Err GoTo Error:
    '変数を定義
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

    'ヘッダー情報を変数に格納
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


    'ユーザログイン情報
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

    'Indexを採番
    Dim res As Integer
    res = indexNumber()
    If res = 1 Then
        Exit Sub
    End If

    'convertor情報を取得(ヘッダー情報項目)
    convertorInfo.Add "SiteId", siteId
    convertorInfo.Add "SiteTitle", ActiveSheet.name
    convertorInfo.Add "ReferenceType", referenceType
    convertorInfo.Add "IncludeData", False
    convertorInfoColl.Add convertorInfo

    'ヘッダー情報を取得
    headersInfo.Add "BaseSiteId", siteId
    headersInfo.Add "Server", server
    headersInfo.Add "CreatorName", creatorName
    headersInfo.Add "PackageTime", packageTime
    headersInfo.Add "Convertors", convertorInfoColl
    headersInfo.Add "IncludeSitePermission", includeSitePermission
    headersInfo.Add "IncludeRecordPermission", includeRecordPermission
    headersInfo.Add "IncludeColumnPermission", includeColumnPermission

    'サイト情報を取得
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

        '見出し例外チェック
        If Cells(i, 3) = "見出し" Then
            If Cells(i, 6) = MARK_OK Or Cells(i, 7) = MARK_OK Or Cells(i, 8) = MARK_OK Then
                MsgBox "型が「見出し」項目の場合、" & vbCrLf & "リンク／フィルタ／一覧に〇は設定しないでください。"
                Exit Sub
            End If
        End If

        'セクション取得
        If InStr(Cells(i, 1), "Section") Then
            sectionDic.Add "Id", Val(Split(Cells(i, 1), "-")(1))
            sectionDic.Add "LabelText", Cells(i, 2)
            sectionDic.Add "AllowExpand", True
            sectionDic.Add "Expand", True

            sectionColl.Add sectionDic

            Set sectionDic = Nothing
            Set sectionDic = New Dictionary
        End If

        'エディタ項目情報追加
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

            '空の項目を削除
            For Each key In editDic
                If editDic.Item(key) = "" Then
                    editDic.Remove key
                End If
            Next key

            editColl.Add editDic

            Set editDic = Nothing
            Set editDic = New Dictionary

        End If

        'リンク項目情報追加
        If Cells(i, 6).value = MARK_OK Then
            linksColumnsColl.Add Cells(i, 1)
        End If

        'フィルタ項目情報追加
        If Cells(i, 7).value = MARK_OK Then
            filterColumnsColl.Add Cells(i, 1)
        End If

        '一覧項目情報追加
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
        errMsg = "テーブル型情報が間違っています。"
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

    'パーミッション情報を取得
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

    'パーミッションID情報を取得
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

    '各情報をJSON文字列に格納
    json.Add "HeaderInfo", headersInfo
    json.Add "Sites", sitesColl
    json.Add "Data", dataColl
    json.Add "Permissions", permissionColl
    json.Add "PermissionIdList", permissionIdListDic

    'JSON文字列をJSON形式に変換
    jsonStr = JsonConverter.ConvertToJson(json, " ", 4)

    'JSONファイルに出力
    Dim Target As String
    Target = ThisWorkbook.Path & "\" & ActiveSheet.name & ".json"
    With CreateObject("ADODB.Stream")
        .Charset = "UTF-8"
        .Open
        .WriteText jsonStr
        .SaveToFile Target, 2
        .Close
    End With

    MsgBox "JSONファイルを出力しました。"

    Exit Sub

Error:

    MsgBox "エラーです。"

End Sub

'###############################################################
'Index番号を採番
'###############################################################
Function indexNumber() As Integer
On Err GoTo ErrStep:
    '型を定義
    Dim typeDic As New Dictionary

    typeDic.Add "タイトル", "Title"
    typeDic.Add "内容", "Body"
    typeDic.Add "完了", "CompletionTime"
    typeDic.Add "分類項目", "Class"
    typeDic.Add "数値項目", "Num"
    typeDic.Add "日付項目", "Date"
    typeDic.Add "説明項目", "Description"
    typeDic.Add "チェック項目", "Check"
    typeDic.Add "添付ファイル項目", "Attachments"
    typeDic.Add "見出し", "Section"

    Dim typeCountDic As New Dictionary
    typeCountDic.Add "タイトル", 0
    typeCountDic.Add "内容", 0
    typeCountDic.Add "完了", 0
    typeCountDic.Add "分類項目", 0
    typeCountDic.Add "数値項目", 0
    typeCountDic.Add "日付項目", 0
    typeCountDic.Add "説明項目", 0
    typeCountDic.Add "チェック項目", 0
    typeCountDic.Add "添付ファイル項目", 0
    typeCountDic.Add "見出し", 0

    'Indexを採番
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
            '見出し
            If typeVal = "見出し" Then
                sectionLatestId = sectionLatestId + 1
                Cells(i, INDEX_COLUMN).value = "_Section-" & sectionLatestId
                sectionCount = sectionCount + 1

            'タイトル
            ElseIf typeVal = "タイトル" Then
                If typeCountDic("タイトル") = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "タイトルが２つ以上設定されています。"
                    GoTo ErrStep
                End If

            '内容
            ElseIf typeVal = "内容" Then
                If typeCountDic(typeVal) = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic.Item(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "内容が２つ以上設定されています。"
                    GoTo ErrStep
                End If

            '完了
            ElseIf typeVal = "完了" Then
                If Not Cells(16, 5).value = "Issues" Then
                    MsgBox "記録テーブル以外で完了項目は使えません。"
                    GoTo ErrStep
                End If
                If typeCountDic.Item(typeVal) = 0 Then
                    Cells(i, INDEX_COLUMN).value = typeDic(typeVal)
                    typeCountDic(typeVal) = typeCountDic.Item(typeVal) + 1
                Else
                    MsgBox "内容が２つ以上設定されています。"
                    GoTo ErrStep
                End If

            'その他
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
            MsgBox str(i) & "行目に不正な型が入力されています。"
            GoTo ErrStep
        End If
    Next

    indexNumber = 0

    Exit Function

ErrStep:

    indexNumber = 1

End Function
