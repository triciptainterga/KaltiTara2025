
$(document).ready(function () {
    TrmMonitoring()
    TrmMonitoring_DataTable()
    //document.getElementById("iframe_channel").src = urlDatakelola + "chat/view?with-header=1&with-sidebar=0&with-footer=0&token=" + $("#SM_MultiChatToken").val();
    if ($("#TrxLoginTypeAngka").val() != "5") {
        document.getElementById("FramePreview").src = "https://dk.beacukai.go.id/report/spv?with-header=0&with-sidebar=0&with-footer=0&token=" + $("#SM_MultiChatToken").val() + "&screen=iframe";
    } else {
        document.getElementById("FramePreview").src = "https://dk.beacukai.go.id/report/spv?with-header=0&with-sidebar=0&with-footer=0&token=451|c0ZLZTKiEz2HPw8WH9ZDrnOpPkQc6BNPuENiqkxQ&screen=iframe";
    }
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function TrmMonitoring() {
    var ValUserID = $("#hd_sessionLogin").val();
    var ValLayerID = $("#TrxLoginTypeAngka").val();
    var ValSpv = $("#TrxLayerUser").val();
    var result = "";
    var messageDiv = $('#2_TampungKotakAtas');
    $.ajax({
        type: "POST",
        url: "asmx/TrmMonitoring.asmx/ws_counting_login",
        data: "{UserID: '" + ValUserID + "',LayerID: '" + ValLayerID + "',Spv: '" + ValSpv + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";
            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                result = '<div class="col-xl-3 col-sm-6" onclick=directpage(' + json[i].Flag +') style="cursor:pointer;"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-center">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-soft-' + json[i].Color + ' text-' + json[i].Color + ' rounded-circle font-size-18">' +
                    '<i class="uil uil-list-ul"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + json[i].Type + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].AgentCounting + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                messageDiv.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmMonitoring_DataTable() {
    var TrxFlag = getParameterByName("flag");
    var result = "";
    var myTaskboardTicket = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/TrmMonitoring.asmx/DataTableMonitoring",
        data: "{TrxFlag: '" + TrxFlag + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTaskboardTicket.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    if (json[i].LEVELUSER == "Layer 1") {
                        var Action = "<a href='#' class='text-success' onclick=ReleaseLogin('" + json[i].USERNAME + "')><i class='fa fas fa-circle' aria-hidden='true'></i></a>"
                    } else {
                        var Action = "-"
                    }
                    myTaskboardTicket.row.add([json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, json[i].LEVELUSER, json[i].DescAUX, Action]).draw(false);

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
function directpage(flagid) {
    location.href = "Crm_Trm_Monitoring.aspx?flag="+ flagid +""
}
