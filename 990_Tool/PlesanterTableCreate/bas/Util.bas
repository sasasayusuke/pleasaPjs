Attribute VB_Name = "Util"

Sub test()
    Dim alphabetArray() As Variant

    alphabetArray = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")
    MsgBox utilCount(alphabetArray)

End Sub

Function utilCount(arr As Variant)
    utilCount = UBound(arr) - LBound(arr) + 1
End Function


