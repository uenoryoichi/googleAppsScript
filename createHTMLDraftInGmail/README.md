# createHTMLDeaftInGmail

## overview

this script can make draft in Gmail

## project id

M6iKsfeXXavjDNzz6EEFRBu141rqerMCH

## how to use

you use function to setup From(), To(), Title() or HtmlBody() etc...
and you build draft mail make();

## example

```
var MailLib = new createHTMLDraftInGmail();

MailLib.From('sample@example.com')
       .To('sample@example.com')
       .Title('title')
       .HtmlBody('body<br>test')
       .make();

```


