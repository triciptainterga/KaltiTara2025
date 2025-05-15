$(document).ready(function () {
    $("#LoaderPageCounting").hide();
    Counting();
    DataTableTelesales("0");
    $("#divstatusdata").hide();
});
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function Counting() {
    var messageDiv = $('#divCountingDataCall');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTaskboard.asmx/TaskboardCounting",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data)

            var json = JSON.parse(data.d);
            var i, x, ResultNya = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                ResultNya = '<div class="col-xl-3 col-sm-6" style="cursor:pointer;"> ' +
                    '<a class="box box-link-shadow text-left" onclick="ClickdataTaskboard(' + json[i].Flag + ')"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-left">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-soft-' + json[i].Color + ' text-' + json[i].Color + ' rounded-circle font-size-18">' +
                    '<i class="uil uil-list-ul"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + json[i].Type + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].AdminCallCounting + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a> ' +
                    '</div>'

                messageDiv.append(ResultNya);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableTelesales(sValue) {
    var result = "";
    var myTable = $('#TrmTeleHeader').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTaskboard.asmx/TeleTaskboard",
        data: "{TrxID:'" + sValue + "',TrxUserName: '" + $("#hd_sessionLogin").val() + "',TrxLevelUser: '" + $("#ContentPlaceHolder1_TrxLevelUser").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            myTable.clear().draw();
            if (json.length == 0) {
                console.log("Data not found " + i);
            } else {
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].TrxDateCreate);
                    var milisegundos = parseInt(json[i].TrxDateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
                    var ConverTanggal = newDate + ' ' + newTime

                    var urlclick = '<div class="flex-shrink-0 ms-2">' +
                        '<div class="dropdown">' +
                        '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        '<i class="mdi mdi-dots-horizontal"></i>' +
                        '</a>' +
                        '<div class="dropdown-menu dropdown-menu-end">' +
                        '<a class="dropdown-item" href="#" onclick=ActionType(' + json[i].TrxID + ') >Delete</a>' +
                        '<a class="dropdown-item" href="Tele_TrxTransaksi.aspx?id=' + json[i].TrxID + "&name=" + json[i].TrxName + "&ph=" + json[i].TrxTelepon + "&mail=" + json[i].TrxEmail + "&script=" + json[i].TrxProdukID + '">Follow Up</a>' +
                        '</div>' +
                        '</div>'

                    if (json[i].TrxCounting == null || json[i].TrxCounting == "") {
                        var CallCounting = "<span class='badge rounded-pill badge-soft-danger font-size-12'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].TrxCounting + "</span>"
                    }
                    myTable.row.add([json[i].TrxID, json[i].TrxName, json[i].TrxTelepon, json[i].TrxProdukCampaign, json[i].TrxAddress.substring(0, 35) + "....", newDate + ' ' + newTime, CallCounting, urlclick]).draw(false);

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
function ClickdataTaskboard(sValue) {
    $("#ContentPlaceHolder1_StatusID").val(sValue)
    if ($("#ContentPlaceHolder1_StatusID").val() == "3" || $("#ContentPlaceHolder1_StatusID").val() == "4") {
        $("#divstatusdata").show();
    } else {
        $("#divstatusdata").hide();
    }
    DataTableTelesales(sValue)
}
function CheckTaskboard(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_checktommorrow").val("1")
        DataTableTelesales("5")
    } else {
        DataTableTelesales("0")
        $("#ContentPlaceHolder1_checktommorrow").val("0")
    }
}
function ModalActivity() {
    $("#ModalActivity").modal('show');
    var ResultCustomerSearching = "";
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxTaskboard.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK132'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#Div_CustomerSearching').empty();
            for (i = 0; i < json.length; i++) {

                ResultCustomerSearching = '<ul class="list-unstyled chat-list">' +
                    '<li class="active">' +
                    '<a href="Tele_TrxTransaksi.aspx?id=' + json[i].HeaderID + '&name=' + json[i].Nama + '&ph=' + json[i].NomorTelepon + '&mail=&script=3">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 user-img online align-self-center me-3">' +
                    '<div class="avatar-sm align-self-center"><span class="avatar-title rounded-circle bg-soft-primary text-primary">' + json[i].Nama.substr(0, 1).toUpperCase() + '</span></div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<h5 class="text-truncate font-size-14 mb-1">' + json[i].Nama + '</h5>' +
                    '<p class="text-truncate mb-0">' + json[i].NomorTelepon + '</p>' +
                    '<p class="text-truncate mb-0">' + json[i].Reason + '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0">' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                $('#Div_CustomerSearching').append(ResultCustomerSearching)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}