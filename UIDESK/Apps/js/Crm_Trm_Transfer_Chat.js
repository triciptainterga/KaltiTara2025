var idWA = "3";
var noWA = "08170154444";
var apiKeyWA = "qRbkioekrn2xVSUwQWWiBzet03ysIhhUZZD";
var urlDatakelola;
var companyToken;
$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    companyToken = $("#SM_CompanyToken").val();
    showDivContent();
});
function showDivContent() {
    $("#multichatIframe").show();
    document.getElementById("iframe_channel_transfer").src = urlDatakelola + "chat-transfer?with-header=0&with-sidebar=0&with-footer=0;"
    //https://dk.beacukai.go.id/chat-transfer
}