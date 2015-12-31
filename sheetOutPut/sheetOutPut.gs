(function(global){
  var sheetOutput = (function() {

    function sheetOutput(config) {
      this.spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
      this.sheet = this.spreadsheet.getSheetByName(config.sheetName);
      this.sheetInfo = {
        lastCul:      this.sheet.getLastColumn(),
        lastRow:      this.sheet.getLastRow(),
        landmarkName: config.landmarkName,
        landmarkRow:  null,
        landmarkCul:  null,
      }
      this.getLandmarkPosition();
    }
   
    /**
     * JSONのレスポンスを作る
     */
    sheetOutput.prototype.makeJSON = function() {
      var labels = this.getKeyRange().getValues();
      var vals = this.getValRange().getValues();
      var json = [];
      
      for each(var val in vals){
        var tmp = {};
        for (var i=0;i<labels[0].length;i++) {
          tmp[labels[0][i]] = val[i];
        }
        json.push(tmp);
      }
      //Logger.log(json); 
      return json
    }
    /**
     * LTSVのレスポンスを作る
     */
    sheetOutput.prototype.makeLTSV = function() {
      var labels = this.getKeyRange().getValues();
      var vals = this.getValRange().getValues();
      var ltsv = '';

      for(var i=0;i<vals.length;i++){
        for(var j=0;j<vals[i].length;j++){
            ltsv += labels[0][j] + ':' + vals[i][j] + "\t";
        }
        ltsv += "\n";
      }
      return ltsv;
    }
    /**
     * CSVのレスポンスを作る
     */
    sheetOutput.prototype.makeCSV = function() {
      var labels = this.getKeyRange().getValues();
      var vals = this.getValRange().getValues();
      var csv = labels.join(',') + "\n";
      
      for (var i=0; i<vals.length;i++){
        csv += vals[i].join(',') + "\n";
      }

      return csv;
    }
    /**
     * TSVのレスポンスを作る
     */
    sheetOutput.prototype.makeTSV = function() {
      var labels = this.getKeyRange().getValues();
      var vals = this.getValRange().getValues();
      var tsv = labels.join("\t") + "\n";
      
      for (var i=0; i<vals.length;i++){
        tsv += vals[i].join("\t") + "\n";
      }

      return tsv;
    }
    /**
     * ラベルとなる行数を取得する
     */
    sheetOutput.prototype.getKeyRange = function() {
      return this.sheet.getRange(this.sheetInfo.landmarkRow, this.sheetInfo.landmarkCul, 1, this.sheetInfo.lastCul - this.sheetInfo.landmarkCul + 1);
    }
    /**
     * 値が入っているシートの範囲を取得する
     */
    sheetOutput.prototype.getValRange = function() {
      return this.sheet.getRange(this.sheetInfo.landmarkRow + 1, this.sheetInfo.landmarkCul, this.sheetInfo.lastRow - this.sheetInfo.landmarkRow, this.sheetInfo.lastCul - this.sheetInfo.landmarkCul + 1);
    }
    
    /**
     * 基準位置を返す ランサー名のラベル位置を想定
     */
    sheetOutput.prototype.getLandmarkPosition = function() {
      var allVal = this.sheet.getRange(1,1:tabnewhis.sheetInfo.lastRow:tabnewhis.sheetInfo.lastCul).getValues(); 
      
      for (var i=0;i<allVal.length;i++) {
        for (var j=0;j<allVal[i].length;j++) {
          if (allVal[i][j] == this.sheetInfo.landmarkName) {
            this.sheetInfo.landmarkRow = i + 1;
            this.sheetInfo.landmarkCul = j + 1;
            return
          }
        }        
      }      
    }
    
    return sheetOutput;
  })();

  global.sheetOutput = sheetOutput;

})(this);

/**
 * sheetOutputの作成
 *
 * <h3>example</h3>
 * <pre>
 * var sheetOutput = sheetOutput.factory({spreadsheetId: '1234567890qwertyuioasdfghjklzxcvbnm',sheetName:"aaaaa", landmarkName: 'bbbbbb'});
 * </pre>
 * @param {assoc} config
 */
function factory(config) {
  return new sheetOutput(config);
}
function test() {
  // sample for https://docs.google.com/spreadsheets/d/11fQRApk_Ad7xvNJOGXlaUC89-PSJYF3egcdW_A-0EPs/edit#gid=0
  var lib = factory({spreadsheetId: '11fQRApk_Ad7xvNJOGXlaUC89-PSJYF3egcdW_A-0EPs',sheetName:"sample1", landmarkName: 'id'});
  Logger.log(lib.makeJSON());
  //  Logger.log(lib.makeLTSV());
  //  Logger.log(lib.makeCSV());
  //  Logger.log(lib.makeTSV());
}
/**
 * 補完用のダミー
 */
function makeJSON() {
  throw new Error('sheetOutputを呼び出してから呼び出してください。');
}

