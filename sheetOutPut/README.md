# sheetOutPut

## overview

this script can output spread sheet as text (JSON, CSV or TSV)

## project id

M29-e_vOTgnLIiwm1fMvNxe141rqerMCH

## how to use

please use factory() with config and you can use makeJSON, makeCSV or makeTSV 

## factory param

config.spreadsheetId
config.sheetName
config.landmarkName

## example

```
var sheetOutPut = factory({spreadsheetId: '11fQRApk_Ad7xvNJOGXlaUC89-PSJYF3egcdW_A-0EPs',sheetName:"sample1", landmarkName: 'id'});
Logger.log(sheetOutPut.makeJSON());
```


