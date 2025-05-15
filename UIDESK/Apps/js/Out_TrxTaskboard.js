$(document).ready(function () {
    Counting()
});
function Counting() {
    var messageDiv = $('#divCountingDataCall');
    $.ajax({
        type: "POST",
        url: "asmx/Out_TrxTaskboard.asmx/TaskboardCounting",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data)

            var json = JSON.parse(data.d);
            var i, x, ResultNya = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                ResultNya = '<div class="col-xl-3 col-sm-6" onclick=ClickdataTaskboard(' + json[i].Flag + ') style="cursor:pointer;"> ' +
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
                    '<h5 class="font-size-16 mb-0">' + json[i].AdminCallCounting + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
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
function DataTableCall(sValue) {
    var result = "";
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Out_TrxTaskboard.asmx/OutTaskboard",
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

                    //var urlClick = "<div class='dropdown'>" +
                    //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    //    "<div class='dropdown-menu dropdown-menu-right'>" +
                    //    "<a class='dropdown-item' href='#' onclick=ActionType('" + json[i].TrxID + "','Spam')><i class='fa fa-trash'></i> Remove</a>" +
                    //    "<div class='dropdown-divider'></div>" +
                    //    "<a class='dropdown-item' href='Out_TrxTaskboard.aspx?id=" + json[i].TrxID + "&name=" + json[i].TrxName + "&ph=" + json[i].TrxTelepon + "&mail=" + json[i].TrxEmail + "&script=" + json[i].TrxProdukID + "'><i class='si-arrow-right-circle si'></i> Follow Up</a>" +
                    //    "</div>" +
                    //    "</div>"
                    var urlClick = "<a href='#' onclick=ModalShowing('" + json[i].TrxID + "','" + json[i].TrxTelepon + "')><i class='fa fas fa-circle' aria-hidden='true'></i>"
                    if (json[i].TrxCounting == null) {
                        var CallCounting = "<span class='badge bg-danger rounded-pill ms-2' style='width: 27px;'>0</span>"
                    } else {
                        var CallCounting = "<span class='badge bg-danger rounded-pill ms-2' style='width: 27px;'>" + json[i].TrxCounting + "</span>"
                    }
                    myTable.row.add([json[i].TrxID, json[i].TrxName, json[i].TrxEmail, json[i].TrxTelepon, json[i].TrxJobTitle, json[i].TrxAddress, newDate + ' ' + newTime, CallCounting, urlClick]).draw(false);

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
function ClickdataTaskboard(ID) {
    //alert(sValue)
    DataTableCall(ID)
}
function ModalShowing(HeaderID, TrxTelepon) {
    $("#ContentPlaceHolder1_TrxID").val(HeaderID);
    $("#ContentPlaceHolder1_TrxTelepon").val(TrxTelepon);
    $("#modal-agent").modal('show');
    //LoadDataRelatedTicket();
}