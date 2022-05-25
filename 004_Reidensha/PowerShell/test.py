
import pandas as pd

df = pd.read_csv('C:/Users/Y-Sasaki/Desktop/sasaki/product/github/pleasaPjs/004_Reidensha/PowerShell/format/01　社員共有FAX.csv', encoding='cp932', dtype=object)
print(df)

df.to_csv('C:/Users/Y-Sasaki/Desktop/sasaki/product/github/pleasaPjs/004_Reidensha/PowerShell/sss.csv')