var api_version = 1.0

var SETTING_SHEET_NAME = "setting"
var TEMPLATE_SHEET_NAME = "template"

var SERVER_URL = "https://pcls-dev.cit.nhk.or.jp"

/**
 * 下記コマンドで取得
 * Promise.all(Object.keys(TABLE_INFO).map(async key => commonGetColumnNames(TABLE_INFO[key].index)))
 *
 *
[
    {
        "5460": {
            "DateA": {
                "label": "購買依頼報告書締切日",
                "readOnly": [
                    200,
                    800,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [
                    200,
                    800,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "年度",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5464": {
            "ClassA": {
                "label": "申請部局コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "設定情報ID",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "コンピュータ種類",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "メンバーシップ",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "ワークグループ名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "ログインアカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckA": {
                "label": "未定 - ログインアカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理者権限",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "コンピュータ名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "企業コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "マンナンバー",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckB": {
                "label": "未定 - マンナンバー",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "氏名 - 使用者情報",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "部局コード - 使用者情報",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "相互リンク",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "購買報告書",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "パソコン形状",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "在庫管理",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class002": {
                "label": "設定担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "送付先住所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "名称",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "管理グループID",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "主な設置場所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "備品番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "管理担当",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckC": {
                "label": "スタッフ用・共有機用",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "ピクルス管理番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "申請者名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "申請者内線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "申請者外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "送付先〒",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "担当者氏名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class005": {
                "label": "担当者内線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class006": {
                "label": "担当者外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class007": {
                "label": "担当者メールアドレス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "納品希望日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class008": {
                "label": "管理者権限付与アカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class009": {
                "label": "ワークグループ名選択理由",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5461": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "パソコン形状",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "金額",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5456": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class010": {
                "label": "パソコン形状6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumG": {
                "label": "台数6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class011": {
                "label": "経理科目6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class012": {
                "label": "細節6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class013": {
                "label": "部局メモ6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class014": {
                "label": "送付先住所6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionH": {
                "label": "備考6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class015": {
                "label": "パソコン形状7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumH": {
                "label": "台数7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class016": {
                "label": "経理科目7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class017": {
                "label": "細節7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class018": {
                "label": "部局メモ7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class019": {
                "label": "送付先住所7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumI": {
                "label": "台数8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class020": {
                "label": "パソコン形状8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumJ": {
                "label": "台数9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class021": {
                "label": "経理科目8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class022": {
                "label": "細節8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class023": {
                "label": "部局メモ8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class024": {
                "label": "送付先住所8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionI": {
                "label": "備考7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionJ": {
                "label": "備考8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionK": {
                "label": "備考9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class025": {
                "label": "パソコン形状9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class026": {
                "label": "経理科目9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class027": {
                "label": "細節9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class028": {
                "label": "部局メモ9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class029": {
                "label": "送付先住所9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class030": {
                "label": "パソコン形状10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumK": {
                "label": "台数10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class031": {
                "label": "経理科目10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class032": {
                "label": "細節10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class033": {
                "label": "部局メモ10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class034": {
                "label": "送付先住所10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionL": {
                "label": "備考10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5455": {
            "ClassA": {
                "label": "イベント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5474": {
            "Status": {
                "label": "状況",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionC": {
                "label": "解析用",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5475": {
            "Status": {
                "label": "状況",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "内容",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionD": {
                "label": "更新済ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionE": {
                "label": "作成済ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "進捗率",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5473": {
            "Status": {
                "label": "状況",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassA": {
                "label": "処理ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "メッセージ",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "テーブルID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "レコードID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "処理ログ",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "AttachmentsA": {
                "label": "出力帳票",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "解析用",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Manager": {
                "label": "管理者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ResultId": {
                "label": "ID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionC": {
                "label": "説明C",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionD": {
                "label": "説明D",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionE": {
                "label": "説明E",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "5679": {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    {
        "8929": {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "有線MAC",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "キッティング開始日",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "主な設置場所",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理担当",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "在庫種別",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "ダミー1",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "DateC": {
                "label": "ダミー（日付）",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "ダミー2",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "ワークグループ名選択理由",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "ピクルス管理番号",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    990,
                    999
                ],
                "hidden": []
            }
        }
    }
]
 */


var TABLE_INFO = {
    "イベント": {
        index: 5460,
        status: `
            100,下書き,下書,status-new
            200,受付中,受付,status-preparation
            900,終了,終了,status-closed
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `,
        column: {
            "DateA": {
                "label": "購買依頼報告書締切日",
                "readOnly": [
                    200,
                    800,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "パソコン設定登録書締切日",
                "readOnly": [
                    200,
                    800,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "イベントタイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "年度",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "PC設定": {
        index: 5464,
        status: `
            100,下書,下書,status-new
            200,指示入力済,指示入力済,status-preparation
            900,完了,完了,status-closed
        `,
        column: {
            "ClassA": {
                "label": "申請部局コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "設定情報ID",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "コンピュータ種類",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "メンバーシップ",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "ワークグループ名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "ログインアカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckA": {
                "label": "未定 - ログインアカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理者権限",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "コンピュータ名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "企業コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "マンナンバー",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckB": {
                "label": "未定 - マンナンバー",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "氏名 - 使用者情報",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "部局コード - 使用者情報",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "相互リンク",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "購買報告書",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "パソコン形状",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "在庫管理",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class002": {
                "label": "設定担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "送付先住所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "名称",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "管理グループID",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "主な設置場所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "備品番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "管理担当",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckC": {
                "label": "スタッフ用・共有機用",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "ピクルス管理番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "申請者名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "申請者内線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "申請者外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "送付先〒",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "担当者氏名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class005": {
                "label": "担当者内線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class006": {
                "label": "担当者外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class007": {
                "label": "担当者メールアドレス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "納品希望日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class008": {
                "label": "管理者権限付与アカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class009": {
                "label": "ワークグループ名選択理由",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "パソコン形状登録": {
        index: 5461,
    },
    "購買申請": {
        index: 5456,
        status: `
            100,PC管理者確認待ち,確認待ち,status-preparation
            300,取り下げ,取り下げ,status-rejected
            400,報告書申請済み,申請済み,status-review
            990,処理中,処理中,status-rejected
            999,エラー,エラー,status-rejected
        `,
        column: {
            "ClassA": {
                "label": "イベント",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "ワークフロー",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumA": {
                "label": "台数1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "パソコン形状1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "経理科目1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "細節1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "部局メモ1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "パソコン形状2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "経理科目2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "細節2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "部局メモ2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumB": {
                "label": "台数2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "パソコン形状3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "経理科目3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "細節3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "部局メモ3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumC": {
                "label": "台数3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "経理科目4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "パソコン形状5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumD": {
                "label": "購買台数入力 - 項目数",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "申請部局コード",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "申請部局名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "納入先部局コード",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "納入先部局名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class002": {
                "label": "氏名",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "外線番号",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "内線番号",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class005": {
                "label": "メールアドレス",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class006": {
                "label": "送付先住所1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionC": {
                "label": "備考1",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionD": {
                "label": "備考2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionE": {
                "label": "備考3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "送付先住所2",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "送付先住所3",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "パソコン形状4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumE": {
                "label": "台数4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "細節4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "部局メモ4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "送付先住所4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionF": {
                "label": "備考4",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumF": {
                "label": "台数5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "経理科目5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class007": {
                "label": "細節5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class008": {
                "label": "部局メモ5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class009": {
                "label": "送付先住所5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionG": {
                "label": "備考5",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class010": {
                "label": "パソコン形状6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumG": {
                "label": "台数6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class011": {
                "label": "経理科目6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class012": {
                "label": "細節6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class013": {
                "label": "部局メモ6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class014": {
                "label": "送付先住所6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionH": {
                "label": "備考6",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class015": {
                "label": "パソコン形状7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumH": {
                "label": "台数7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class016": {
                "label": "経理科目7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class017": {
                "label": "細節7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class018": {
                "label": "部局メモ7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class019": {
                "label": "送付先住所7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumI": {
                "label": "台数8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class020": {
                "label": "パソコン形状8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumJ": {
                "label": "台数9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class021": {
                "label": "経理科目8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class022": {
                "label": "細節8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class023": {
                "label": "部局メモ8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class024": {
                "label": "送付先住所8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionI": {
                "label": "備考7",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionJ": {
                "label": "備考8",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionK": {
                "label": "備考9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class025": {
                "label": "パソコン形状9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class026": {
                "label": "経理科目9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class027": {
                "label": "細節9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class028": {
                "label": "部局メモ9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class029": {
                "label": "送付先住所9",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class030": {
                "label": "パソコン形状10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "NumK": {
                "label": "台数10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class031": {
                "label": "経理科目10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class032": {
                "label": "細節10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class033": {
                "label": "部局メモ10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class034": {
                "label": "送付先住所10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionL": {
                "label": "備考10",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    400,
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "購買報告書": {
        index: 5455,
        status: `
            100,未確認,未確認,status-new
            200,経理担当者承認待ち,経理待,status-preparation
            300,照査者承認待ち,照査者待,status-preparation
            400,決定者承認待ち,決定者待,status-inprogress
            500,NT承認待ち,NT待,status-inprogress
            900,完了,完,status-closed
            910,差戻し,差戻,status-rejected
        `,
        column: {
            "ClassA": {
                "label": "イベント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "経理担当 - 氏名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "経理担当 - 役職",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "照査者 - 氏名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "照査者 - 役職",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "決定者 - 氏名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "決定者 - 役職",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "経理担当 - 承認日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "照査者 - 承認日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateC": {
                "label": "決定者 - 承認日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "購買台数",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "申請部局",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "提出者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "内線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "メールアドレス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionB": {
                "label": "備考",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "部局情報": {
        index: 5679,
        column: {
            "ClassA": {
                "label": "部局コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "部局名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "親部局コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "状況",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC~5679,ClassB": {
                "label": "部局名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC~5679,ClassA": {
                "label": "部局コード",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "在庫管理": {
        index: 8929,
        column: {
            "ClassA": {
                "label": "拠点名（ラベル名）",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassB": {
                "label": "PC名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassC": {
                "label": "ドメイン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassD": {
                "label": "ワークグループ名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassE": {
                "label": "管理者権限付与アカウント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckA": {
                "label": "スタッフ用・共有機用",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckB": {
                "label": "IPアドレス固定",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassI": {
                "label": "備品番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckC": {
                "label": "DNS自動",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "CheckD": {
                "label": "DNS固定",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassM": {
                "label": "放送局名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassN": {
                "label": "郵便番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassO": {
                "label": "住所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassP": {
                "label": "担当者名",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassQ": {
                "label": "担当者外線",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassR": {
                "label": "納品希望日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassS": {
                "label": "伝票番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateA": {
                "label": "着荷予定日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassT": {
                "label": "受領日（WEB上）",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateD": {
                "label": "返却PC到着日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassV": {
                "label": "破損・物損・欠損等",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DescriptionA": {
                "label": "備考",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassW": {
                "label": "NHK備品番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassX": {
                "label": "シリアル番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassY": {
                "label": "有線MAC",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassZ": {
                "label": "無線MAC",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class003": {
                "label": "貸出状況一覧リンク",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateB": {
                "label": "キッティング開始日",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassF": {
                "label": "名称",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassG": {
                "label": "管理グループID",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassH": {
                "label": "主な設置場所",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassJ": {
                "label": "管理担当",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Status": {
                "label": "ステータス",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassK": {
                "label": "在庫種別",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassL": {
                "label": "ダミー1",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "DateC": {
                "label": "ダミー（日付）",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class004": {
                "label": "ダミー2",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "ClassU": {
                "label": "ワークグループ名選択理由",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Class001": {
                "label": "ピクルス管理番号",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Owner": {
                "label": "担当者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Title": {
                "label": "タイトル",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "UpdatedTime": {
                "label": "更新日時",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Comments": {
                "label": "コメント",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Updator": {
                "label": "更新者",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            },
            "Ver": {
                "label": "バージョン",
                "readOnly": [
                    900,
                    990,
                    999
                ],
                "hidden": []
            }
        }
    },
    "メッセージログ": {
        index: 5474,
    },
    "処理ログ": {
        index: 5475,

    },
    "帳票出力ログ": {
        index: 5473,
    },
}

var CODE_INFO = {
    "計算書区分": {

    }
}

/**
 * columnNameの集合を取得
 * @param {String}    tableId テーブルID
 * @return {Object}   obj
 */
async function commonGetColumnNames(tableId) {
    let columnNames = {}
    // 取得済み(保存用変数から取得)

    let data = await fetch(`${SERVER_URL}/items/${tableId}/index`)
    let html = await data.text()
    let dom = new DOMParser().parseFromString(html, 'text/html')
    columnNames = JSON.parse(dom.getElementById("Columns").value)
    let obj = {}
    obj[tableId] = {}
    // 保存用変数
    for (let c of columnNames) {
        obj[tableId][c.ColumnName] = {
            label: c.LabelText,
            readOnly: [STATUS_CLOSE, STATUS_PROCESSING, STATUS_ERROR],
            hidden: [],
        }

        let column = "column"
        if (column in TABLE_INFO[commonGetTableName(tableId)] && c.ColumnName in TABLE_INFO[commonGetTableName(tableId)][column]) {
            obj[tableId][c.ColumnName].readOnly = TABLE_INFO[commonGetTableName(tableId)][column][c.ColumnName].readOnly
            obj[tableId][c.ColumnName].hidden = TABLE_INFO[commonGetTableName(tableId)][column][c.ColumnName].hidden
        }
    }
    return obj
}

/**
 * columnNameを取得
 * @param {String}    table テーブル名
 * @param {String}    label ラベル名
 * @return {String}   columnName
 */
function commonGetColumnName(table, label) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetColumnName：テーブル名不正。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"column" in TABLE_INFO) {
            let message = `共通関数commonGetColumnName：column未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let column = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].column
        // 保存用変数から取得
        let data = Object.keys(column)
            .filter(v => v.indexOf("~") < 0)
            .filter(v => column[v].label == label)
        if (data.length == 0) {
            let message = `共通関数commonGetColumnName：ラベル名不正。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (data.length > 1) {
            let message = `共通関数commonGetColumnName：ラベル名重複。${label}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        return data[0]
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * statusを取得
 * @param {String}      table     テーブル名
 * @param {Boolean}     format    成形
 * @return {String}     status
 */
function commonGetStatuses(table, format = true) {
    try {
        if (!Object.keys(TABLE_INFO).includes(table)) {
            let message = `共通関数commonGetStatus：テーブル名不正。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        if (!"status" in TABLE_INFO) {
            let message = `共通関数commonGetStatus：status未登録。${table}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        let status = TABLE_INFO[Object.keys(TABLE_INFO).filter(v => v == table)[0]].status
        if (format) {
            status = status.trim().split("\n")
                .map(v => v.trim())
                .map(v => {
                    val = v.split(",")
                    let obj = {}
                    obj.index = val[0]
                    obj.name = val[1]
                    obj.label = val[2]
                    obj.style = val[3]
                    return obj
                })
        }
        return status
    } catch (err) {
        // 再スロー
        throw err
    }
}


/**
 * statusを取得
 * @param {String}      tableId     テーブルID
 * @return {String}     tableName
 */
function commonGetTableName(tableId) {
    try {
        let table = Object.keys(TABLE_INFO).filter(v => TABLE_INFO[v].index == tableId)
        if (table.length == 0) {
            let message = `共通関数commonGetTableName：テーブルID不正。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        } else if (table.length > 1) {
            let message = `共通関数commonGetTableName：テーブルが2重で登録されています。${tableId}`
            commonMessage(STATUS_ERROR, message)
            throw new Error(message)
        }
        return table[0]

    } catch (err) {
        // 再スロー
        throw err
    }
}

