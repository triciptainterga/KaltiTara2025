$(document).ready(function () {
    TrmRefute()
});
function TrmRefute() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK196'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (json[i].Refute_State == "1") {
                    $("#SettingTicketCreate").prop('checked', true);
                } else {
                    $("#SettingTicketCreate").prop('checked', false);
                }
               
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function RefuteSLA(checked) {
    if (checked) {
        var TrxTicketCreate = "YES"
    } else {
        var TrxTicketCreate = "NO"
    }
    var form_data = JSON.stringify({ TrxID: TrxTicketCreate, TrxUserName: $("#hd_sessionLogin").val(), TrxAction: 'UIDESK197' });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    TrmRefute();
}