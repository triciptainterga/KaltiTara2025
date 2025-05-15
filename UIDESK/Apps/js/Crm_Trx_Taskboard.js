$(document).ready(function () {
    urlDatakelola = $("#SM_UrlDatakelola").val();
    if (getParameterByName("api") == "1") {
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
                } else {
                    for (i = 0; i < json.length; i++) {
                        if (json[i].ScheduleState == "1") {
                            if (json[i].Login == "1") {
                                updateAuxDatakelola($("#SM_MultiChatToken").val(), "ready", $("#SM_CompanyToken").val());
                            }
                        } else {
                            updateAuxDatakelola($("#SM_MultiChatToken").val(), "logout", $("#SM_CompanyToken").val());
                        }
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

    let currentStatus = "Open"; 

    if ($("#TrxLoginTypeAngka").val() != "1") {
        $("#PageCreateTicket").hide();
        $("#PageFollowTicket").hide();
    } else {
        $("#PageCreateTicket").show();
        $("#PageFollowTicket").show();
    }

    SummaryTaskboard();
    DataTableTaskboard(currentStatus);

    $(document).on("click", ".status-link", function (e) {
        e.preventDefault();
        currentStatus = $(this).data("status");
        DataTableTaskboard(currentStatus); 
    });
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function SummaryTaskboard() {
    const ValUserID = $("#hd_sessionLogin").val();
    const ValLayerID = $("#TrxLoginTypeAngka").val();
    const ValSpv = $("#TrxLayerUser").val();
    const messageDiv = $('#divCountingDataCall');

    $.ajax({
        type: "POST",
        url: "asmx/ServiceTaskboard.asmx/ws_2_taskboard",
        data: JSON.stringify({ UserID: ValUserID, LayerID: ValLayerID, Spv: ValSpv }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const json = JSON.parse(response.d || "[]");
            let content = "";

            messageDiv.empty();
            for (i = 0; i < json.length; i++) {

                result = '<div class="col-xl-3 col-sm-6" style="cursor:pointer;"> ' +
                    '<a class="box box-link-shadow text-left" href="Crm_Trx_Taskboard.aspx?status=' + json[i].StatusData + '&mid=' + getParameterByName("mid") + '&smid=' + getParameterByName("smid") + '"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-left">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-soft-' + json[i].statusColor + ' text-' + json[i].statusColor + ' rounded-circle font-size-18">' +
                    '<i class="uil uil-list-ul"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + json[i].StatusData + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].JumlahData + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a> ' +
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
//function DataTableTaskboard() {
//    //$("#LoaderPageCounting").show();
//    var TrxUserName = $("#hd_sessionLogin").val();
//    var TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
//    var TrxDivisi = $("#TrxDivisi").val();
//    var TrxStatus = getParameterByName("status");
//    var result = "";
//    var myTaskboardTicket = $('#TaskboardTicket').DataTable(
//        {
//            "order": [[0, "desc"]]
//        },
//        {
//            "processing": true,
//            "language": {
//                processing: '<i class="spinner-border text-warning"></i><span>Loading...</span> '
//            },
//        });
//    $.fn.dataTable.ext.errMode = 'none';
//    $.ajax({
//        type: "POST",
//        url: "asmx/ServiceTaskboard.asmx/DataTableTaskboard",
//        data: "{TrxUserName: '" + TrxUserName + "',TrxLoginTypeAngka: '" + TrxLoginTypeAngka + "',TrxDivisi: '" + TrxDivisi + "',TrxStatus: '" + TrxStatus + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            var json = JSON.parse(data.d);
//            var i, x = "";

//            //messageDiv.empty();
//            myTaskboardTicket.clear().draw();
//            if (json.length == 0) {
//                console.log("Data not found " + i);
//            } else {
//                for (i = 0; i < json.length; i++) {

//                    //var urlAction = "<div class='dropdown'>" +
//                    //    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
//                    //    "<div class='dropdown-menu dropdown-menu-right'>" +
//                    //    "<a class='dropdown-item' href='#' onclick=showInternalNote('" + json[i].TicketNumber + "')><i class='fa fa-plus'></i> Internal Note</a>" +
//                    //    "<div class='dropdown-divider'></div>" +
//                    //    "<a class='dropdown-item' href='1_journey.aspx?ticketid=" + json[i].TicketNumber + "&numberid=0&threadid=0&status=" + json[i].Status + "'><i class='si-arrow-right-circle si'></i> Follow up</a>" +
//                    //    "</div>" +
//                    //    "</div>"

//                    var urlAction = '<div class="flex-shrink - 0 dropdown"> ' +
//                        '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
//                        '<div class="dropdown-menu dropdown-menu-end"> ' +
//                        //'<a class="dropdown-item" href="#" onclick=InternalNote("' + json[i].TicketNumber + '")>Internal Note</a> ' +
//                        '<a class="dropdown-item" href="Crm_Trx_TicketJourneySystem.aspx?ticketid=' + json[i].TicketNumber + '&numberid=0&threadid=0&status=' + json[i].Status + '">Follow up</a> ' +
//                        '</div> ' +
//                        '</div> '

//                    var d = new Date(json[i].datecreate);
//                    var milisegundos = parseInt(json[i].datecreate.replace("/Date(", "").replace(")/", ""));
//                    var newDate = new Date(milisegundos).toLocaleDateString("en-UE");
//                    var newTime = new Date(milisegundos).toLocaleTimeString("en-UE");
//                    var ConverTanggal = newDate + ' ' + newTime
                    
//                    if (json[i].Status == "Open") {
//                        var TrxParam = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].Status + "</span>"
//                    } else if (json[i].Status == "Pending") {
//                        var TrxParam = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].Status + "</span>"
//                    } else if (json[i].Status == "Solved") {
//                        var TrxParam = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].Status + "</span>"
//                    } else if (json[i].Status == "Closed") {
//                        var TrxParam = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].Status + "</span>"
//                    }

//                    if (json[i].TicketPosition == "1") {
//                        var TrxPosition = "Layer 1"
//                    } else if (json[i].TicketPosition == "2") {
//                        var TrxPosition = "Dynamic"
//                    } else if (json[i].TicketPosition == "3") {
//                        var TrxPosition = "Layer 3"
//                    } else if (json[i].TicketPosition == "4") {
//                        var TrxPosition = "Eksternal/Vendor"
//                    }

//                    myTaskboardTicket.row.add([json[i].TicketNumber, json[i].NamePIC, json[i].CategoryName, json[i].SubCategory1Name, TrxPosition, TrxParam, ConverTanggal, urlAction]).draw(false);

//                }

//            }

//        },
//        error: function (xmlHttpRequest, textStatus, errorThrown) {
//            console.log(xmlHttpRequest.responseText);
//            console.log(textStatus);
//            console.log(errorThrown);
//        },
//        complete: function () {
//            //$("#LoaderPageCounting").hide();
//        }
//    })
//}
function DataTableTaskboard(status) {
    console.log("Loading taskboard data for status:", status);

    if ($.fn.dataTable.isDataTable('#TaskboardTicket')) {
        $('#TaskboardTicket').DataTable().clear().destroy();
    }

    const TrxUserName = $("#hd_sessionLogin").val();
    const TrxLoginTypeAngka = $("#TrxLoginTypeAngka").val();
    const TrxDivisi = $("#TrxDivisi").val();

    $.ajax({
        type: "POST",
        url: "asmx/ServiceTaskboard.asmx/DataTableTaskboard",
        data: JSON.stringify({
            TrxUserName: TrxUserName,
            TrxLoginTypeAngka: TrxLoginTypeAngka,
            TrxDivisi: TrxDivisi,
            TrxStatus: status
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const taskboardData = JSON.parse(response.d || "[]");
            const tableBody = $("#TaskboardTicket tbody");
            tableBody.empty();

            taskboardData.forEach(item => {
                const dateMiliseconds = parseInt(item.datecreate.replace("/Date(", "").replace(")/", ""));
                const dateObject = new Date(dateMiliseconds);
                const formattedDate = ('0' + dateObject.getDate()).slice(-2) + '-' +
                    ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' +
                    dateObject.getFullYear();
                const formattedTime = dateObject.toLocaleTimeString("en-UE", {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                const ConverTanggal = `${formattedDate} ${formattedTime}`;

                const statusBadge = {
                    "Open": "<span class='badge rounded-pill badge-soft-primary font-size-12'>Open</span>",
                    "Pending": "<span class='badge rounded-pill badge-soft-warning font-size-12'>Pending</span>",
                    "Solved": "<span class='badge rounded-pill badge-soft-success font-size-12'>Solved</span>",
                    "Closed": "<span class='badge rounded-pill badge-soft-danger font-size-12'>Closed</span>"
                }[item.Status] || "";

                const ticketPosition = {
                    "1": "Layer 1",
                    "2": "Dynamic",
                    "3": "Layer 3",
                    "4": "Eksternal/Vendor"
                }[item.TicketPosition] || "Unknown";

                const urlAction = `
                    <div class="dropdown">
                        <a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                            <i class="mdi mdi-dots-vertical ms-2"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="Crm_Trx_TicketJourneySystem.aspx?ticketid=${item.TicketNumber}&numberid=0&threadid=0&status=${item.Status}">Follow up</a>
                        </div>
                    </div>
                `;

                const rowHtml = `
                    <tr>
                        <td>${item.TicketNumber}</td>
                        <td>${item.NamePIC}</td>
                        <td>${item.CategoryName}</td>
                        <td>${item.SubCategory1Name}</td>
                        <td>${item.AgentNya}</td>
                        <td>${ticketPosition}</td>
                        <td>${statusBadge}</td>
                        <td>${ConverTanggal}</td>
                        <td>${urlAction}</td>
                    </tr>`;
                tableBody.append(rowHtml);
            });

            $('#TaskboardTicket').DataTable({
                paging: true,
                searching: true,
                lengthChange: true,
                pageLength: 10,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
                columnDefs: [{ orderable: false, targets: [7] }]
            });
        },
        error: function (xhr) {
            console.error("Error loading taskboard data:", xhr.responseText);
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
function FU() {
    $("#modal-followup").modal('show');
}
function ActionFollow() {
    if ($("#CmbSourceChannel").val() == "") {
        swal(
            '',
            'Channel is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#Form_Channel").val() == "") {
        swal(
            '',
            'Account is empty',
            'warning'
        ).then(function () {
            return false;
        });
        return false;
    }
    location.href = "Crm_Trx_Ticket_System.aspx?account=" + $("#Form_Channel").val() + "&channel=" + $("#CmbSourceChannel").val() + ""
}