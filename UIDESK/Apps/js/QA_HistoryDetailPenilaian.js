$(document).ready(function () {
    if (getParameterByName("channel") == "call") {
        $('#DataNonCall').hide();
        $('#HistoryDataNonCall').hide();
        $('#DataCall').show();
        $('#HistoryDataCall').show();
        TrmTabelTransactionCall();
    } else {
        $('#DataCall').hide();
        $('#HistoryDataCall').hide();
        $('#DataNonCall').show();
        $('#HistoryDataNonCall').show();
        TrmTabelTransactionNonCall();
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
function TrmTabelTransactionNonCall() {
    var jsonText = JSON.stringify({
        UserName: $("#hd_sessionLogin").val(), Agent: getParameterByName("user"),
        Channel: getParameterByName("channel"), Tahun: getParameterByName("tahun"), Bulan: getParameterByName("bulan")
    });
    var myTable = $('#TrmHistoryTransactionNonCall').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_HistoryDetailPenilaian.asmx/BRA_QM_TrxHistoryTransaction",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].qa_type == "QM1") {
                    //$("#HeaderTableName").html("Nama Nasabah")
                    var RowName = json[i].nama_nasabah
                } else {
                    //$("#HeaderTableName").html("Nama Pekerja");
                    var RowName = json[i].nama_pekerja
                }
                if ($("#QM_LevelUser").val() == "QA") {
                    if (json[i].status_data == "Draft" || json[i].status_data == "Return" || json[i].status_data == "Finished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        //var UrlFollowup = ""
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> View </a>"
                        //var Access = 'style="pointer-events: none"'
                        var Access = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_QA") {
                    if (json[i].status_data == "Pending Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Agent" || $("#QM_LevelUser").val() == "Layer 1") {
                    if (json[i].status_data == "Approved" || json[i].status_data == "Refute") {
                        if (json[i].SettingRefute == "0") {
                            var UrlFollowup = '<div class="flex-shrink-0 dropdown"> ' +
                                '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                                '<div class="dropdown-menu dropdown-menu-end"> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewScreen("' + json[i].acra_id + '")>Preview</a> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewSkor("' + json[i].header_id + '")>Skor</a> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewComment("' + json[i].header_id + '")>Comment</a> ' +
                                '<a class="dropdown-item" href="QA_form.aspx?id=' + json[i].ID + '&act=edit&qaid=' + json[i].qa_id + '&type=' + json[i].type + '&UserType=' + json[i].qa_type + '&headerid=' + json[i].header_id + '&acraid=' + json[i].acra_id + '&agentid=' + json[i].agent + '&status=' + json[i].status_data + '&ticketid=' + json[i].TicketNumber + '&view=1"><i class="si-arrow-right-circle si"></i> Follow Up </a>' +
                                '</div> ' +
                                '</div> ';
                        } else {
                            var UrlFollowup = '<div class="flex-shrink-0 dropdown"> ' +
                                '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                                '<div class="dropdown-menu dropdown-menu-end"> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewScreen("' + json[i].acra_id + '")>Preview</a> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewSkor("' + json[i].header_id + '")>Skor</a> ' +
                                '<a class="dropdown-item" href="#" onclick=PreviewComment("' + json[i].header_id + '")>Comment</a> ' +
                                '</div> ' +
                                '</div> ';
                        }
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Agent_Leader" || $("#QM_LevelUser").val() == "Team Leader") {
                    if (json[i].status_data == "Refute") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Admin_Release" || $("#QM_LevelUser").val() == "Administrator") {
                    if (json[i].status_data == "Finished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else {
                    var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "&view=1'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                }

                if ($("#QM_LevelUser").val() == "Agent" || $("#QM_LevelUser").val() == "Layer 1") {
                    var urlClick = UrlFollowup
                } else {
                    var urlClick = '<div class="flex-shrink - 0 dropdown"> ' +
                        '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" ' + Access + '><i class="mdi mdi-dots-vertical ms-2"></i></a> ' +
                        '<div class="dropdown-menu dropdown-menu-end"> ' +
                        '' + UrlFollowup + '' +
                        '</div> ' +
                        '</div> '
                }
                if (json[i].status_data == "Draft") {
                    var Status = "<span class='badge rounded-pill badge-soft-dark font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Pending Approved") {
                    var Status = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Approved") {
                    var Status = "<span class='badge rounded-pill badge-soft-success font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Refute") {
                    var Status = "<span class='badge rounded-pill badge-soft-primary font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Return") {
                    var Status = "<span class='badge rounded-pill badge-soft-warning font-size-12'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Finished") {
                    var Status = "<span class='badge rounded-pill badge-soft-danger font-size-12'>" + json[i].status_data + "</span>"
                }

                if ($("#QM_LevelUser").val() == "Administrator" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Agent_Leader" || $("#QM_LevelUser").val() == "Supervisor_Agent") {
                    var AgentName = json[i].AgentName
                } else {
                    var AgentName = "********"
                }
                if (json[i].summary_bobot == 0 || json[i].summary_bobot == null || json[i].summary_bobot == "0") {
                    var Performance = "0"
                } else {
                    var Performance = json[i].summary_bobot
                }

                var d = new Date(json[i].created_date);
                var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                ////myTable.row.add([url, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, ColorSLA, DaysOLA, urlClick]).draw(false);
                myTable.row.add([json[i].ID, json[i].header_id, json[i].nama_nasabah, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, Performance, DateTimeStart_1 + ' ' + DateTimeStart_2, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTabelTransactionCall() {
    var jsonText = JSON.stringify({
        UserName: $("#hd_sessionLogin").val(), Agent: getParameterByName("user"),
        Channel: getParameterByName("channel"), Tahun: getParameterByName("tahun"), Bulan: getParameterByName("bulan")
    });
    var myTable = $('#TrmHistoryTransactionCall').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_HistoryDetailPenilaian.asmx/BRA_QM_TrxHistoryTransaction_Call",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {
                
                var d = new Date(json[i].DateScored);
                var milisegundos = parseInt(json[i].DateScored.replace(/\/Date\((\d+)\)\//g, "$1"));
                var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                var d = new Date(json[i].StartTimeTelepon);
                var milisegundos = parseInt(json[i].StartTimeTelepon.replace(/\/Date\((\d+)\)\//g, "$1"));
                var StartTimeTelepon_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var StartTimeTelepon_2 = new Date(milisegundos).toLocaleTimeString("en-UE");


                var d = new Date(json[i].EndTimeTelepon);
                var milisegundos = parseInt(json[i].EndTimeTelepon.replace(/\/Date\((\d+)\)\//g, "$1"));
                var EndTimeTelepon_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                var EndTimeTelepon_2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                myTable.row.add([json[i].SID, json[i].Site, json[i].NamaAgent, json[i].LoginID, json[i].NamaCustomer, json[i].NomorTelepon, DateTimeStart_1 + ' ' + DateTimeStart_2, json[i].Score, StartTimeTelepon_1 + ' ' + StartTimeTelepon_2, EndTimeTelepon_1 + ' ' + EndTimeTelepon_2, json[i].TotalHoldTime, json[i].DurationTime]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}