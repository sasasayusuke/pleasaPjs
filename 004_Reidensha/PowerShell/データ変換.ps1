
Param(
    [Int] $processId,
    [Int] $logId,
    [string] $logMessage = "",
    [boolean] $errorFlg = $False

)

try{
    $text = cat "C:\Users\Y-Sasaki\Desktop\sasaki\project\��d��\��̃f�[�^\CARD�f�[�^�@2022.0520\01�@�Ј����LFAX.csv"
    $col = $text[0].split('","')
    $col[0]
    $col[1]
    $col[2]
} catch {
    return 10
}