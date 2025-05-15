var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var companyToken;
$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    console.log("URL:" + urlDatakelola);
  
    showDivContent(getParameterByName('flagto'));

});
function showDivContent(flagto) {
    document.getElementById("iframe_channel").src = urlDatakelola + "chat/v3/internal?with-header=0&with-sidebar=0&with-footer=0&token=" + $("#SM_MultiChatToken").val();
}