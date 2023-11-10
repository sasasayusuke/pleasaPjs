
Sub test()
    MsgBox utilConvertNumber("aa6")
End Sub
Sub test2()
    MsgBox 10 \ 3
    MsgBox 10 Mod 3

End Sub

Function utilConvertAlphabet(index As Integer)
    Dim ret As String
    ret = ""
    While index > 0
        ret = Mid(ALPHABET_LIST, ((index - 1) Mod Len(ALPHABET_LIST)) + 1, 1) & ret
        index = (index - 1) \ Len(ALPHABET_LIST)
    Wend
    utilConvertAlphabet = ret

End Function
Function utilConvertNumber(str As String)
    Dim ret As Integer
    Dim i As Integer
    For i = 1 To Len(str)
        Dim char As String
        char = UCase(Mid(str, i, 1))
        ret = ret + InStr(ALPHABET_LIST, char) * (Len(ALPHABET_LIST) ^ (Len(str) - i))
    Next

    utilConvertNumber = ret

End Function

Function utilCount(arr As Variant)
    utilCount = UBound(arr) - LBound(arr) + 1
End Function


