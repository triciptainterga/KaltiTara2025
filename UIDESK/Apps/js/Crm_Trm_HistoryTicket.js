$(document).ready(function () {
    //DataTableHistory();
    $("#Loading").css("display", "none");
    fetchAgents();
});
function DataTableHistory() {
    $("#Loading").css("display", "block");
    var myTable = $('#TrmHistory').DataTable(
        {
            "order": [[5, "desc"]]
        },
    );
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK119'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var d = new Date(json[i].CreatedDate);
                var milisegundos = parseInt(json[i].CreatedDate.replace("/Date(", "").replace(")/", ""));
                var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].TicketStatus == "Open") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Pending") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Solved") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].TicketStatus + "</span>"
                } else if (json[i].TicketStatus == "Closed") {
                    var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].TicketStatus + "</span>"
                }
                if (json[i].TicketPosition == "1") {
                    var TrxPosition = "Layer 1"
                } else if (json[i].TicketPosition == "2") {
                    var TrxPosition = "Layer 2"
                } else if (json[i].TicketPosition == "3") {
                    var TrxPosition = "Layer 3"
                } else if (json[i].TicketPosition == "4") {
                    var TrxPosition = "Eksternal/Vendor"
                }
                myTable.row.add([json[i].TicketNumber, json[i].CustomerName, json[i].CategoryName, TrxPosition, TrxParam, newDate + ' ' + newTime]).draw(false);

            }
            $("#Loading").css("display", "none");

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function Filter() {
    $("#addContactModal").modal('show');
}
function ActionFilter() {
    var TimeStartDate = $("#startdate").val();
    var TimeEndDate = $("#enddate").val();
    var TrxUserName = $("#hd_sessionLogin").val();
    var TrxLayerUser = $("#TrxLayerUser").val();
    if ($("#ComboType").val() == "1") {
        if ($("#startdate").val() == '') {
            swal(
                '',
                'Start Date is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#enddate").val() == '') {
            swal(
                '',
                'End Date is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#startdate").val() > $("#enddate").val()) {
            swal(
                '',
                'Start Date greater than End Date',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        var ParameterTiga = "-"
    } else if ($("#ComboType").val() == "2") {
        $("#startdate").val("")
        $("#enddate").val("")
        if ($("#Customer").val() == '') {
            swal(
                '',
                'Ticket Number OR Customer Channel is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        var ParameterTiga = $("#Customer").val()
    } else {
        if ($("#startdate").val() == '') {
            swal(
                '',
                'Start Date is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#enddate").val() == '') {
            swal(
                '',
                'End Date is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#startdate").val() > $("#enddate").val()) {
            swal(
                '',
                'Start Date greater than End Date',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#agentSelect").val() == '') {
            swal(
                '',
                'Agent is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        var ParameterTiga = $("#agentSelect").val()
    }    
    var myTable = $('#TrmHistory').DataTable();
    $.fn.dataTable.ext.errMode = 'none';
    $.ajax({
        type: "POST",
        url: "asmx/TrxHistoryTicket.asmx/UIDESK_TrxHistoryTicket",
        data: "{TrxStartDate:'" + TimeStartDate + "', TrxEnddate:'" + TimeEndDate + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxTicketNumber: '" + ParameterTiga + "', TrxFilterType:'" + $("#ComboType").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            if (json.length == 0) {
                swal(
                    '',
                    'Data history ticket is empty',
                    'info'
                ).then(function () {
                    return false;
                });
                $("#Loading").css("display", "none");
                return false
            } else {
                myTable.clear().draw();
                for (i = 0; i < json.length; i++) {

                    var d = new Date(json[i].DateCreate);
                    var milisegundos = parseInt(json[i].DateCreate.replace("/Date(", "").replace(")/", ""));
                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");

                    if (json[i].Status == "Open") {
                        var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Pending") {
                        var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Solved") {
                        var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].Status + "</span>"
                    } else if (json[i].Status == "Closed") {
                        var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].Status + "</span>"
                    }
                    if (json[i].TicketPosition == "1") {
                        var TrxPosition = "Layer 1"
                    } else if (json[i].TicketPosition == "2") {
                        var TrxPosition = "Layer 2"
                    } else if (json[i].TicketPosition == "3") {
                        var TrxPosition = "Layer 3"
                    } else if (json[i].TicketPosition == "4") {
                        var TrxPosition = "Eksternal/Vendor"
                    }
                    var urlclick = '<div class="flex-shrink - 0 dropdown"> ' +
                        '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                        '<div class="dropdown-menu dropdown-menu-end"> ' +
                        '<a class="dropdown-item" href="Crm_Trx_TicketJourneySystem.aspx?ticketid=' + json[i].TicketNumber + '&Status=' + json[i].Status +'&ht=1">Preview</a> ' +
                        '</div> ' +
                        '</div> '
                    myTable.row.add([json[i].TicketNumber, json[i].CustomerName, json[i].CategoryName, json[i].NameAgent, TrxPosition, TrxParam, newDate + ' ' + newTime, urlclick]).draw(false);

                }
                $("#Loading").css("display", "none");

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    $("#addContactModal").modal('hide');
}
function FilterComboType() {
    if ($("#ComboType").val() == "1") {
        $("#ParameterDate").show()
        $("#ParameterCustomer").hide()
        $("#ParameterAgent").hide()
    } else if ($("#ComboType").val() == "2") {
        $("#ParameterCustomer").show()
        $("#ParameterDate").hide()
        $("#ParameterAgent").hide()
    } else {
        $("#ParameterCustomer").hide()
        $("#ParameterDate").show()
        $("#ParameterAgent").show()
    } 
}
function fetchAgents() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: JSON.stringify({
            TrxID: '0',
            TrxUserName: $("#hd_sessionLogin").val(),
            TrxAction: 'UIDESK233'
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var agentSelect = document.getElementById('agentSelect');
            agentSelect.innerHTML = '<option value="">Select Agent</option>';

            for (var i = 0; i < json.length; i++) {
                var option = document.createElement('option');
                option.value = json[i].USERNAME;
                option.text = json[i].NAME;
                agentSelect.appendChild(option);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
