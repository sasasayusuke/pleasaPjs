import csv
import pathlib
import shutil
import datetime
import pandas as pd
import os

path = 'C:/Users/Y-Sasaki/Desktop/sasaki/product/github/pleasaPjs/004_Reidensha/PowerShell/'

newDir = datetime.datetime.now().strftime('%Y_%m_%d_%H_%M_%S')
os.mkdir(path  + newDir)


df = pd.read_csv(path + 'format/01　社員共有FAX.csv', encoding='cp932', dtype=object)
print(df)

df.to_csv('C:/Users/Y-Sasaki/Desktop/sasaki/product/github/pleasaPjs/004_Reidensha/PowerShell/ssss.csv')
