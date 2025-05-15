$(document).ready(function () {
    TrmHeaderCounting();
    if ($("#QM_LevelUser").val() == "Supervisor_QA") {
        $("#BoxCheck").show()
        TrmTabelTransactionChecked()
        if (getParameterByName("status") == "Finished") {
            $("#ProcessApproved").hide()
        } else {
            $("#ProcessApproved").show()
        }
    } else {
        $("#BoxCheck").hide()
        $("#ProcessApproved").hide()
        TrmTabelTransaction();
    }
});
function TrmHeaderCounting() {
    var QM_UserName = $("#hd_sessionLogin").val();
    var QM_TypeUser = $("#HD_UserType").val();
    var QM_LevelUser = $("#QM_LevelUser").val();
    var QM_GroupQA = $("#QM_GroupQA").val();
    var QM_GroupAgent = $("#QM_GroupAgent").val();
    var Div_HeaderCounting = $('#Div_HeaderCounting');
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderCounting",
        data: "{QM_UserName: '" + QM_UserName + "',QM_TypeUser: '" + QM_TypeUser + "',QM_LevelUser: '" + QM_LevelUser + "',QM_GroupQA: '" + QM_GroupQA + "',QM_GroupAgent: '" + QM_GroupAgent + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i, x = "";

            Div_HeaderCounting.empty();
            for (i = 0; i < json.length; i++) {
                //result = '<div class="col-12 col-lg-2">' +
                //    '<a  href ="Qc_List.aspx?status=' + json[i].HeaderName + '" >' +
                //    '<div class="box-body br-1 border-light">' +
                //    '<div class="flexbox mb-1">' +
                //    '<span>' +
                //    '' + json[i].Icon + '' +
                //    '<br>' +
                //    '' + json[i].HeaderName + '' +
                //    '</span>' +
                //    '<span class="text-' + json[i].Color + ' font-size-30">' + json[i].DataHeader + '</span>' +
                //    '</div>' +
                //    '<div class="progress progress-xxs mt-10 mb-0">' +
                //    '<div class="progress-bar bg-' + json[i].Color + '" role="progressbar" style="width: 50%; height: 4px;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>' +
                //    '</div>' +
                //    '</div>' +
                //    '</a>' +
                //    '</div>'
                if ($("#QM_LevelUser").val() == "Layer 1" || $("#QM_LevelUser").val() == "Team Leader") {
                    var columsnya = "4"
                } else {
                    var columsnya = "4"
                }
                result = '<div class="col-xl-' + columsnya + ' col-sm-6" style="cursor:pointer;"> ' +
                    '<a class="box box-link-shadow text-left" href="QA_Taskboard_Penilaian.aspx?status=' + json[i].HeaderName + '&mid=' + getParameterByName("mid") + '&smid=' + getParameterByName("smid") + '"> ' +
                    '<div class="card">' +
                    '<div class="card-body">' +
                    '<div class="d-flex align-items-left">' +
                    '<div class="flex-shrink-0 me-3">' +
                    '<div class="avatar-sm">' +
                    '<div class="avatar-title bg-' + json[i].Color + ' text-' + json[i].Color + ' rounded-circle font-size-18">' +
                    '<i class="uil uil-list-ul"></i>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden">' +
                    '<p class="mb-1 text-truncate text-muted">' + json[i].HeaderName + '</p>' +
                    '<h5 class="font-size-16 mb-0">' + json[i].DataHeader + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a> ' +
                    '</div>'

                Div_HeaderCounting.append(result);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTabelTransaction() {
    var jsonText = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxLevelUser: $("#QM_LevelUser").val(), TrxStatus: getParameterByName("status") });
    var myTable = $('#TrmTransaction').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderTransaction",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var d = new Date(json[i].OLA);
                //var milisegundos = parseInt(json[i].OLA.replace("/Date(", "").replace(")/", ""));
                //var DateTimeStart_OLA1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_OLA2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                if (json[i].qa_type == "QM1") {
                    //$("#HeaderTableName").html("Nama Nasabah")
                    var RowName = json[i].nama_nasabah
                } else {
                    //$("#HeaderTableName").html("Nama Pekerja");
                    var RowName = json[i].nama_pekerja
                }
                if ($("#QM_LevelUser").val() == "QA") {
                    if (json[i].status_data == "Draft" || json[i].status_data == "Return" || json[i].status_data == "Finished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber +"'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        //var UrlFollowup = ""
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber + "'><i class='si-arrow-right-circle si'></i> View </a>"
                        //var Access = 'style="pointer-events: none"'
                        var Access = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_QA") {
                    if (json[i].status_data == "Pending Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber +"'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
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
                                '<a class="dropdown-item" href="QA_form.aspx?id=' + json[i].ID + '&act=edit&qaid=' + json[i].qa_id + '&type=' + json[i].type + '&UserType=' + json[i].qa_type + '&headerid=' + json[i].header_id + '&acraid=' + json[i].acra_id + '&agentid=' + json[i].agent + '&status=' + json[i].status_data + '&ticketid=' + json[i].TicketNumber +'"><i class="si-arrow-right-circle si"></i> Follow Up </a>' +
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
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber +"'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else if ($("#QM_LevelUser").val() == "Admin_Release" || $("#QM_LevelUser").val() == "Administrator") {
                    if (json[i].status_data == "Finished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber +"'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        var Access = ""
                    } else {
                        var UrlFollowup = ""
                        var Access = 'style="pointer-events: none"'
                    }
                } else {
                    var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&ticketid=" + json[i].TicketNumber +"&view=0'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
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

                //if (json[i].channel == 'Call') {
                //    var icon = "mdi mdi-phone";
                //    var color = "primary";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Video Banking Assistant') {
                //    var icon = "mdi mdi-camera";
                //    var color = "danger";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Instagram') {
                //    var icon = "mdi mdi-instagram";
                //    var color = "success";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else {
                //    var icon = "mdi mdi-record";
                //    var color = "warning";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //}
                ////if (json[i].OLA == null) {
                ////    var DaysOLA = "0 Days"
                ////} else if (json[i].OLA >= 0) {
                ////    var DaysOLA = json[i].OLA + " Days "
                ////} else {
                ////    var DaysOLA =  json[i].OLA + " Days"
                ////}
                if ($("#QM_LevelUser").val() == "Administrator" || $("#QM_LevelUser").val() == "Supervisor_QA" || $("#QM_LevelUser").val() == "Agent_Leader" || $("#QM_LevelUser").val() == "Supervisor_Agent") {
                    var AgentName = json[i].AgentName
                } else {
                    var AgentName = json[i].AgentName
                }
                if (json[i].summary_skor == 0 || json[i].summary_skor == null || json[i].summary_skor == "0") {
                    var Performance = "0"
                } else {
                    var Performance = json[i].summary_skor
                }

                var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                var date = new Date(milisegundos);
                if (isNaN(date)) {
                    console.log("Invalid date string");
                } else {
                    var year = date.getFullYear();
                    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
                    var day = date.getDate().toString().padStart(2, '0');
                    var hours = date.getHours().toString().padStart(2, '0');
                    var minutes = date.getMinutes().toString().padStart(2, '0');
                    var seconds = date.getSeconds().toString().padStart(2, '0');
                    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    console.log("Formatted DateTime: " + formattedDateTime);  // Example: 2025-03-15 13:23:52
                }
                myTable.row.add([json[i].ID, json[i].header_id, json[i].nama_nasabah, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, Performance, formattedDateTime, urlClick]).draw(false);

                 //var d = new Date(json[i].created_date);
                ////var milisegundos = parseInt(json[i].created_date.replace("/Date(", "").replace(")/", ""));
                //var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                //var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");
                ////console.log("1" + json[i].created_date)
                ////console.log("Header ID : " + json[i].header_id + " Date : " + DateTimeStart_1 + ' ' + DateTimeStart_2)

                //if (getParameterByName("checked") == "1") {
                //    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" checked>' +
                //        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                //} else {
                //    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" >' +
                //        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                //}              
                ////myTable.row.add([url, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, ColorSLA, DaysOLA, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmTabelTransactionChecked() {
    var jsonText = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxLevelUser: $("#QM_LevelUser").val(), TrxStatus: getParameterByName("status") });
    var myTable = $('#TrmTransaction').DataTable(
        {
            "order": [[0, "desc"]],
            retrieve: true,
        }
    );
    $.ajax({
        type: "POST",
        url: "asmx/QA_Taskboard_Penilaian.asmx/QM_TrxHeaderTransaction",
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i;


            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                //var d = new Date(json[i].OLA);
                //var milisegundos = parseInt(json[i].OLA.replace("/Date(", "").replace(")/", ""));
                //var DateTimeStart_OLA1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_OLA2 = new Date(milisegundos).toLocaleTimeString("en-UE");


                if (json[i].qa_type == "QM1") {
                    $("#HeaderTableName").html("Nama Nasabah")
                    var RowName = json[i].nama_nasabah
                } else {
                    $("#HeaderTableName").html("Nama Pekerja");
                    var RowName = json[i].nama_pekerja
                }
                if ($("#QM_LevelUser").val() == "QA") {
                    if (json[i].status_data == "Draft" || json[i].status_data == "Return") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_QA") {
                    if (json[i].status_data == "Pending Approved") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Agent" || $("#QM_LevelUser").val() == "Layer 1") {
                    if (json[i].status_data == "Approved") {

                        //RefuteAgent(function (result) {
                        //    if (result) {
                        //        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                        //    } else {
                        //        var UrlFollowup = ""
                        //    }
                        //});
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Supervisor_Agent" || $("#QM_LevelUser").val() == "Agent_Leader") {
                    if (json[i].status_data == "Refute") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else if ($("#QM_LevelUser").val() == "Admin_Release") {
                    if (json[i].status_data == "Finished") {
                        var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                    } else {
                        var UrlFollowup = ""
                    }
                } else {
                    var UrlFollowup = "<a class='dropdown-item' href='QA_form.aspx?id=" + json[i].ID + "&act=edit&qaid=" + json[i].qa_id + "&type=" + json[i].type + "&UserType=" + json[i].qa_type + "&headerid=" + json[i].header_id + "&acraid=" + json[i].acra_id + "&agentid=" + json[i].agent + "&status=" + json[i].status_data + "&view=0'><i class='si-arrow-right-circle si'></i> Follow Up </a>"
                }

                //if (json[i].UsedDaySLA == "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-warning' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA > "0") {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else if (json[i].UsedDaySLA < "0" ) {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-danger' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //} else {
                //    var ColorSLA = "<i class='fa fa-circle mr-5 text-success' style='cursor:pointer;' onclick=JourneySLA('" + json[i].header_id + "')></i>";
                //}
                var urlClick = "<div class='dropdown'>" +
                    "<a data-toggle='dropdown' href='#'><i class='ti-more-alt rotate-90 text-black'></i></a>" +
                    "<div class='dropdown-menu dropdown-menu-right'>" +
                    "" + UrlFollowup + "" +
                    "</div>" +
                    "</div>"

                if (json[i].status_data == "Draft") {
                    var Status = "<span class='badge badge-pill badge-success' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Pending Approved") {
                    var Status = "<span class='badge badge-pill badge-info ' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Approved") {
                    var Status = "<span class='badge badge-pill badge-primary' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Refute") {
                    var Status = "<span class='badge badge-pill badge-warning' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Return") {
                    var Status = "<span class='badge badge-pill badge-primary' style='width: 100%;'>" + json[i].status_data + "</span>"
                } else if (json[i].status_data == "Finished") {
                    var Status = "<span class='badge badge-pill badge-danger' style='width: 100%;'>" + json[i].status_data + "</span>"
                }

                //if (json[i].channel == 'Call') {
                //    var icon = "mdi mdi-phone";
                //    var color = "primary";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Video Banking Assistant') {
                //    var icon = "mdi mdi-camera";
                //    var color = "danger";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else if (json[i].channel == 'Instagram') {
                //    var icon = "mdi mdi-instagram";
                //    var color = "success";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //} else {
                //    var icon = "mdi mdi-record";
                //    var color = "warning";
                //    var url = "<span class='font-size-20 text-info'><i class='" + icon + " text-" + color + "'></i></span>"
                //}
                ////if (json[i].OLA == null) {
                ////    var DaysOLA = "0 Days"
                ////} else if (json[i].OLA >= 0) {
                ////    var DaysOLA = json[i].OLA + " Days "
                ////} else {
                ////    var DaysOLA =  json[i].OLA + " Days"
                ////}
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

                //var d = new Date(json[i].created_date);
                ////var milisegundos = parseInt(json[i].created_date.replace("/Date(", "").replace(")/", ""));
                //var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                //var DateTimeStart_1 = new Date(milisegundos).toLocaleDateString("en-UE");
                //var DateTimeStart_2 = new Date(milisegundos).toLocaleTimeString("en-UE");

                var milisegundos = parseInt(json[i].created_date.replace(/\/Date\((\d+)\)\//g, "$1"));
                // Convert the milliseconds to a Date object
                var date = new Date(milisegundos);
                if (isNaN(date)) {
                    console.log("Invalid date string");
                } else {
                    // Manually format the date and time as 'YYYY-MM-DD HH:mm:ss'

                    // Get date components
                    var year = date.getFullYear();
                    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
                    var day = date.getDate().toString().padStart(2, '0');

                    // Get time components (24-hour format)
                    var hours = date.getHours().toString().padStart(2, '0');
                    var minutes = date.getMinutes().toString().padStart(2, '0');
                    var seconds = date.getSeconds().toString().padStart(2, '0');

                    // Combine into the desired format: 'YYYY-MM-DD HH:mm:ss'
                    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                    // Output the formatted date and time
                    console.log("Formatted DateTime: " + formattedDateTime);  // Example: 2025-03-15 13:23:52
                }

                //if (getParameterByName("checked") == "1") {
                if ($("#ContentPlaceHolder1_TrxChecked").val() == "1") {
                    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" checked>' +
                        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                } else {
                    var TrxParam = '<input type="checkbox" class="checkbox" name="checkbox' + json[i].ID + '" id = "checkbox' + json[i].ID + '" >' +
                        '<label class="checkbox" for="checkbox' + json[i].ID + '"></label>'
                }
                ////myTable.row.add([url, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].qa_type, Status, ColorSLA, DaysOLA, urlClick]).draw(false);
                myTable.row.add([TrxParam, json[i].header_id, RowName, json[i].jenis_permasalahan, AgentName, json[i].AgentSkil, json[i].qa_type, Status, Performance, formattedDateTime, urlClick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    //return $ESAPI.encoder().encodeForHTML(results[2].replace(/\+/g, " "))
    //alert(results)
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    //return $ESAPI.encoder().encodeForHTML(decodeURIComponent(results[2].replace(/\+/g, ' ')));
}
function PreviewScreen(AcraID) {
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + AcraID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus: '0', TrxAction: 'UIDESK016'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].FileExist == null || json[i].FileExist == "") {
                    var FileExits = "0"
                } else {
                    var FileExits = "True"
                }
                if (FileExits == "True") {
                    if (json[i].Channel == "Call") {
                        //$("#addContactModalScreenCall").modal('show');
                        //document.getElementById("FrameAudio").src = "https://bravo.beacukai.go.id/omni/apps/js/voice/Clean-Audio-Player-jQuery/index.html?id=" + json[i].FilePath + ""
                        //location.href ="http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=" + AcraID +""
                        $('#Journeymailconversationnew').hide();
                        window.open('http://10.216.132.133/qmdata/apps/UI_ACRA_DETAIL.aspx?view=detail&id=' + AcraID + '', '_blank');
                    } else if (json[i].Channel == "Email" || json[i].Channel == "EMAIL") {
                        $("#addContactModalScreenNonCall").modal('show');
                        $('#Journeymailconversationnew').show();
                        EmailConversationNew(AcraID)
                        renderJourneyTimeline(AcraID, json[i].Channel);
                        //document.getElementById("FrameNonCall").src = "" + json[i].FilePath + ""
                        $('#FrameNonCall').hide();
                    } else {
                        renderJourneyTimeline(AcraID, json[i].Channel);
                        $("#addContactModalScreenNonCall").modal('show');
                        $('#FrameNonCall').show();
                        $('#Journeymailconversationnew').hide();
                        document.getElementById("FrameNonCall").src = "" + json[i].FilePath.replace("DK-", "") + ""
                    }
                } else {
                    swal(
                        '',
                        'File Not Exits',
                        'error'
                    ).then(function () {
                        $("#modal-audio").modal('hide');
                    });

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
async function EmailConversationNew(refID) {

    const messageDiv = $('#Journeymailconversationnew');
    messageDiv.empty();

    try {
        // Mengambil percakapan berdasarkan refID yang diterima
        const conversationsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailConversation",
            data: JSON.stringify({
                RefID: refID.replace("DK-", ""),
                UserName: $("#hd_sessionLogin").val(),
                Action: 'SELECT'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const conversations = JSON.parse(conversationsResponse.d || conversationsResponse);

        if (!conversations || conversations.length === 0) {
            messageDiv.html("<p>No conversations found.</p>");
            return; // Keluar jika tidak ada percakapan
        }

        for (const conversation of conversations) {
            const emailId = conversation.EMAIL_ID;
            const direction = conversation.DIRECTION;

            // Format tanggal
            const formattedDate = formatDate(conversation.DateNya);
            const attachments = await fetchEmailAttachments(refID, emailId, direction);

            const emailClass = direction !== 'OUT' ? 'email-left' : 'email-right';

            const result = `
             <div class='email-wrapper'>
                 <div class='email-container ${emailClass}'>
                     <div class='email-card'>
                         <div class='email-header'>
                             <span class='email-title'>${conversation.EFROM}</span>
                             <span class='email-date'>${formattedDate}</span>
                         </div>
                         <div class='email-subject'>
                             <strong>${conversation.ESUBJECT}</strong>
                         </div>
                         <div class='email-body'>
                             <p>${conversation.EBODY_HTML}</p>
                         </div>
                         <div class='divider'></div>
                         <div class='email-footer'>
                             <ul class='email-attachments'>${attachments}</ul>
                             <div class='email-signature'>
                                 <p>Salam,</p>
                                 <p><strong>${conversation.EFROM}</strong></p>
                                 <img src='../images/signature.png' alt='Company Logo' class='company-logo'>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;

            messageDiv.append(result);
        }
    } catch (error) {
        console.error("Error loading conversation:", error);
        messageDiv.html("<p>Error loading conversation. Please try again later.</p>");
    }
}
async function fetchEmailAttachments(refID, emailId, direction) {
    const fileInboxHTML = `${IPSERVER}/FileEmail/Inbox`;
    const fileOutboxHTML = `${IPSERVER}/FileEmail/Outbox`;

    try {
        const attachmentsResponse = await $.ajax({
            type: "POST",
            url: "asmx/TrmMailConversation.asmx/UIDESK_TrxEmailAttachment",
            data: JSON.stringify({
                RefID: refID,
                EmailID: emailId,
                Direction: 'ALL',
                UserName: $("#hd_sessionLogin").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        const attachments = JSON.parse(attachmentsResponse.d || attachmentsResponse);
        let attachmentHtml = '';

        const filteredAttachments = attachments.filter(attachment => {
            const attachmentDirection = attachment.DIRECTION ? attachment.DIRECTION.trim().toUpperCase() : '';
            const targetDirection = direction ? direction.trim().toUpperCase() : '';
            return attachmentDirection === targetDirection;
        });

        filteredAttachments.forEach(attachment => {
            const fileUrl = attachment.DIRECTION === 'IN' ? fileInboxHTML : fileOutboxHTML;
            const iconClass = attachment.FILETYPE === '.jpg' ? 'image-o' : 'pdf-o';

            attachmentHtml += `
                <li>
                    <div class='mailbox-attachment-info'>
                        <span class='mailbox-attachment-icon'><i class='fa fa-file-${iconClass}'></i></span>
                        <button class='btn btn-primary btn-sm'>
                            <a href='${fileUrl}/${attachment.URL}' class='mailbox-attachment-name text-white' target='_blank'>
                                <i class='fa fa-download'></i> ${attachment.FILENAME}
                            </a>
                        </button>
                    </div>
                </li>`;
        });

        return attachmentHtml || "<li>No attachments found.</li>";
    } catch (error) {
        console.error("Error fetching attachments:", error);
        return "<li>No attachments found.</li>";
    }
}
function formatDate(dateString) {
    const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year} ${hours}:${minutes} `;
}
function PreviewComment(header_id) {
    var dataJourNeyHistoryComments = "";
    var messageDiv = $('#JourneyHistoryKomentar');
    var PathTicket = "" + IPSERVER + "/FileTransaction/FileComments"
    var jsonTextComment = JSON.stringify({ HeaderID: header_id });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_TrxCommentInteraction",
        data: jsonTextComment,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonComment = JSON.parse(data.d);
            var j;

            messageDiv.empty();
            if (jsonComment.length > 0) {

                $("#addContactModalComment").modal('show');
                jsonComment.forEach(async (item) => {

                    let imagein = ""
                    await $.ajax({
                        type: "POST",
                        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
                        data: "{TrxID:'" + item.ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK070', TrxActionType: 'TA-01'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var json = JSON.parse(data.d);
                            var j = 0;

                            console.log("Comments" + item.ID)
                            for (j = 0; j < json.length; j++) {

                                //imagein += '<a href=' + FileInboxHTML + "/" + json[j].URL + ' target="_blank"><i class="fas fa-file"></i></a>'
                                imagein += '<div class="card border shadow-none mb-2">' +
                                    '<div class="p-2">' +
                                    '<div class="d-flex">' +
                                    '<div class="avatar-sm align-self-center me-2">' +
                                    '<div class="avatar-title rounded bg-transparent text-primary font-size-18">' +
                                    '<i class="fas fa-file"></i>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="overflow-hidden me-auto">' +
                                    '<h5 class="font-size-13 text-truncate mb-1">' + json[j].FileName + '</h5>' +
                                    '<a href=' + PathTicket + "/" + json[j].FileNameURL + ' target="_blank" class="text-body">' +
                                    '<p class="text-muted text-truncate mb-0">Download</p>' +
                                    '</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'

                            }

                        },
                        error: function (xmlHttpRequest, textStatus, errorThrown) {
                            console.log(xmlHttpRequest.responseText);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    result = '<div class="timeline-item">' +
                        '<div class="timeline-block">' +
                        '<div class="timeline-box card">' +
                        '<div class="card-body">' +
                        '<div class="timeline-date">' + item.DateComment + '</div>' +
                        '<h5 class="mt-3 font-size-16">' + item.KodeGru + ' - ' + item.KodePert + '</h5>' +
                        '<div class="text-muted">' +
                        '' + item.comments + '' +
                        '</div>' +
                        '<div class="timeline-album">' +
                        '' + imagein + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                    messageDiv.append(result);

                })

            } else {
                $("#addContactModalComment").modal('hide');
                swal(
                    '',
                    'Comment is empty',
                    'warning'
                ).then(function () {
                    return false;
                });
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log("Response " + xmlHttpRequest.responseText);
            console.log("Text " + textStatus);
            console.log("Err " + errorThrown);
        }
    })
}
function PreviewSkor(HeaderID) {
    $("#modal-skor").modal('show');
    var jsonTextGroupTable = JSON.stringify({ HeaderID: HeaderID });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilaiAll_Bravo",
        data: jsonTextGroupTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonGrupTable = JSON.parse(data.d);
            var i = "";
            if (jsonGrupTable.length != "") {
                for (i = 0; i < jsonGrupTable.length; i++) {
                    $('#TrmGrupingPenilaian').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">' + jsonGrupTable[i].NamaGroupNya + '</td>')
                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonGrupTable[i].ValueIjo + '</td>'));
                }
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    var TotalPersen
    var jsonTextPersenTable = JSON.stringify({ HeaderID: HeaderID, KodeGrup: "PersenNya" });
    $.ajax({
        type: "POST",
        url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
        data: jsonTextPersenTable,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsonPersenTable = JSON.parse(data.d);
            var i = "";
            if (jsonPersenTable.length != "") {

                var jsonTextSkorTable = JSON.stringify({ HeaderID: HeaderID, KodeGrup: "TotalNya" });
                $.ajax({
                    type: "POST",
                    url: "asmx/QA_Form.asmx/QM_GETTotalNilai_Bravo",
                    data: jsonTextSkorTable,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsonSkorTable = JSON.parse(data.d);
                        var i = "";
                        if (jsonSkorTable.length != "") {
                            for (i = 0; i < jsonSkorTable.length; i++) {
                                if (jsonPersenTable[i].ValueIjo == "undifined" || jsonPersenTable[i].ValueIjo == null || jsonPersenTable[i].ValueIjo == "") {
                                    var HasilTotalPersen = jsonSkorTable[i].ValueIjo
                                } else {
                                    var HasilTotalPersen = jsonPersenTable[i].ValueIjo
                                }

                                $('#TrmModalSkorPenilaian').append($('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Bobot</td>')
                                    .append('<td scope="col" style="width: 100px; text-align: center;">' + HasilTotalPersen + '%</td>'),
                                    $('<tr>').append('<td scope="col" style="width: 1000px;text-align: left;">Skor</td>')
                                        .append('<td scope="col" style="width: 100px; text-align: center;">' + jsonSkorTable[i].ValueIjo + '</td>'));
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

    $('#TrmGrupingPenilaian tbody tr').remove();
    $('#TrmModalSkorPenilaian tbody tr').remove();
}
async function renderJourneyTimeline(acraid, channel) {
    const container = document.querySelector('.journey-timeline');
    // Ambil refID dan channel dari URL
    let refID = acraid;
    if (refID) {
        // Hanya ambil angka setelah "DK-" jika ada
        refID = refID.replace(/\D/g, ''); // Menghapus semua karakter non-digit
    }
    // Ambil refID dan channel dari URL
    //const { refID, channel } = getQueryParams();

    if (!refID || !channel) {
        container.innerHTML = '<p>Invalid data. Please ensure the ID and Channel are available.</p>';
        return;
    }

    // Periksa apakah channel adalah "Call"
    if (channel.toLowerCase() === 'call') {
        container.classList.add('hidden'); // Menambahkan kelas 'hidden' untuk menyembunyikan elemen
        return;
    } else {
        container.classList.remove('hidden'); // Menghapus kelas 'hidden' jika channel bukan "Call"
    }

    try {
        const response = await $.ajax({
            type: "POST",
            url: "asmx/qa_form.asmx/BRA_QM_EmailInterval",
            data: JSON.stringify({
                Id: refID, // Id hanya angka yang sudah diproses
                Channel: channel // Channel diambil dari parameter 'type'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });

        const data = JSON.parse(response.d || response);
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No data available for the journey.</p>';
            return;
        }

        // Ambil data item pertama
        const item = data[0];
        const steps = [
            { date: formatDate(item.InboxDate), label: "Received Data" },
            { date: formatDate(item.DateDistribute), label: "Distributed to Agent" },
            { interval: item.IntervalResponseAgentFormatted, isInterval: true },
            { date: formatDate(item.DateAgent), label: "Handled by Agent" },
            { interval: item.IntervalResponseTLFormatted || "Not Available", isInterval: true },
            { date: item.DateTeamLeader ? formatDate(item.DateTeamLeader) : "Not Assigned", label: "Reviewed by Team Leader" }
        ];

        const timelineHTML = steps.map((step, index) => {
            if (step.isInterval) {
                return ` 
                    <div class="journey-interval" style="color: red;">
                        ${step.interval}
                    </div>
                    ${index < steps.length - 1 ? '<div class="journey-line"></div>' : ''}
                `;
            }
            return `
                <div class="journey-step">
                    <div class="journey-date">${step.date}</div>
                    <div class="journey-circle"></div>
                    <div class="journey-label">${step.label}</div>
                </div>
                ${index < steps.length - 1 ? '<div class="journey-line"></div>' : ''}
            `;
        }).join("");

        container.innerHTML = timelineHTML;
    } catch (error) {
        console.error('Error fetching journey data:', error);
        container.innerHTML = '<p>Error loading journey timeline. Please try again later.</p>';
    }
}