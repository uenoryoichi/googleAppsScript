(function(global){
  var createHTMLDraftInGmail = (function() {

    function createHTMLDraftInGmail(config) {
      this.Init();
    }
   
    createHTMLDraftInGmail.prototype.Init = function() {
      return;
    }
      
    createHTMLDraftInGmail.prototype.From = function(mailFrom) {
      this.mailFrom = mailFrom;
      return this;
    }
    
    createHTMLDraftInGmail.prototype.Title = function (mailTitle) {
      this.mailTitle = mailTitle;
      return this;
    }
      
    createHTMLDraftInGmail.prototype.To = function (mailTo) {
      this.mailTo = mailTo;
      return this;
    }
      
    createHTMLDraftInGmail.prototype.Cc = function (mailCc) {
      this.mailCc = mailCc.join(',');
      return this;
    }
      
    createHTMLDraftInGmail.prototype.HtmlBody = function (mailHtmlBody) {
      this.mailHtmlBody = mailHtmlBody;
      return this;
    }  
    
    createHTMLDraftInGmail.prototype.make = function() {
      
      var raw = '';
      if(this.mailFrom != undefined) {
        raw += 'From: ' + this.mailFrom + '\n';
      }
      if(this.mailTo != undefined) {
        raw += 'To: ' + this.mailTo + '\n';
      }
      if(this.mailCc != undefined) {
        raw += 'Cc: ' + this.mailCc + '\n';
      }
      if(this.mailTitle != undefined) {
        raw += 'Subject: ' + this.mailTitle + '\n';
      }

      raw += 'Content-Type: text/plain; charset=UTF-8\n' + 
                      '\n' + this.mailHtmlBody;
      
      var draftBody = Utilities.base64Encode(raw, Utilities.Charset.UTF_8).replace(/\//g,'_').replace(/\+/g,'-');

      var params = {
        method      : "post",
        contentType : "application/json",
        headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
        muteHttpExceptions:true,
        payload:JSON.stringify({
          "message": {
            "raw": draftBody
          }
        })
      };
      
      var resp = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/me/drafts", params);
      //Logger.log(resp.getContentText());
      return resp;
    }
    
    return createHTMLDraftInGmail;
  })();

  global.createHTMLDraftInGmail = createHTMLDraftInGmail;

})(this);


function test() {
  Lib = new createHTMLDraftInGmail();

  Lib.From('sample@example.com')
     .To('sample@example.com')
     .Title('title')
     .HtmlBody('body<br>test')
     .make();

}

