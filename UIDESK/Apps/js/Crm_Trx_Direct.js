$(document).ready(function () {
    AutoInsertThread();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK220'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            if (json.length == 0) {
                updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function AutoInsertThread() {
    var TrxUsername = $("#hd_sessionLogin").val();
    var TrxCustomerID = getParameterByName("phone");
    var TrxCallID = getParameterByName("callid");
    if ($("#hd_sessionLogin").val() == "") {
        swal(
            '',
            'Session is empty, please relogin',
            'info'
        ).then(function () {
            window.location.href = "../auth_login.aspx?idpage=3028.aspx"
        });
    }
    if (getParameterByName("phone") == "") {
        swal(
            '',
            'Phone number is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxNumberid = getParameterByName("callid");
    var TrxThreadID = "-";
    var TrxChannel = "Call";
    var TrxAccount = getParameterByName("phone");
    var TrxSubject = "-";
    var form_data = JSON.stringify({ TrxUsername: TrxUsername, TrxCustomerID: TrxCustomerID, TrxNumberid: TrxNumberid, TrxThreadID: TrxThreadID, TrxChannel: TrxChannel, TrxAccount: TrxAccount, TrxSubject: TrxCustomerID, TrxDescription: TrxSubject, callid: TrxCallID });
    $.ajax({
        url: "WebServiceTransaction.asmx/InsertTransactionThread",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: form_data,
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {
                if (json[i].Result == "True") {
                    window.location.href = "Crm_Trx_Ticket_System.aspx?id=" + json[i].TrxGenerateCustomerID + "&channel=" + TrxChannel + "&n=1&threadid=" + json[i].TrxGenerateThreadID + "&numberid=" + json[i].TrxGenerateNumberID + "&account=" + getParameterByName("phone") + ""
                } else {
                    swal(
                        '',
                        'Caller id already exits',
                        'info'
                    ).then(function () {
                        return false;
                    });
                    return false;
                }

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function () {

        }
    });
}
async function updateAuxDatakelola(token_agent, value, token_company) {
    await fetch("" + urlDatakelola + "/api/agent/aux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token_agent: token_agent,
            aux: value,
            token: token_company,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //alert("updateAuxDatakelola says: " + data.message);
        });
}