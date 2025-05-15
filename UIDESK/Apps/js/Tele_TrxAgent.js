$(document).ready(function () {
    LoadingUser();
    DataTableAgent();
    CmbProductCampaign();
    CmbMaximalHandle();
    $("#Update").hide();
    $('#Agent_Checkbox').click(function () {
        if ($(this).is(':checked')) {
            $("#ContentPlaceHolder1_HDAgent_Checkbox").val("1")
        } else {
            $("#ContentPlaceHolder1_HDAgent_Checkbox").val("0")
        }
    });
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            SearchingUser($(this).val());
        } else if (jumlahString == 0) {
            SearchingUser($(this).val(""));
        }
    });
});
function LoadingUser() {
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'14', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK85'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].product_campaign + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=SubmitDelete("' + json[i].id + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].maxhandle + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].nowhandle + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SearchingUser(AgentName) {
    if (AgentName == '') {
        var jsonText = "14";
    } else {
        var jsonText = AgentName
    }
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK26'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserNotification = "";

            $('#divUserNotification').empty();
            for (i = 0; i < json.length; i++) {

                resultUserNotification = '<div class="col-xl-3 col-sm-6">' +
                    '<div class="card border shadow-none">' +
                    '<div class="card-body p-4">' +
                    '<div class="d-flex align-items-start">' +
                    '<div class="flex-shrink-0 avatar rounded-circle me-3">' +
                    '<img src="assets/images/users/avatar-1.jpg" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].product_campaign + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=EditUser("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=SubmitDelete("' + json[i].id + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].maxhandle + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].nowhandle + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $('#divUserNotification').append(resultUserNotification)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function AddUser() {
    $("#modal-agent").modal('show');
}
function EditUser(ID) {
    $("#addContactModal").modal('show');
    $("#ContentPlaceHolder1_TrxID").val(ID);
    $("#Update").show();
    SelectDetailProduct();
}
function SelectDetailProduct() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK27'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#CmbUpdateProductCampaign').val(json[i].product_id);
                $('#CmbUpdateProductCampaign').attr("disabled", true);
                $('#CmbUpdateMaxCampaign').val(json[i].maxhandle);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbProductCampaign(UploadID) {
    var CmbProductCampaign = $('#CmbProductCampaign');
    var CmbUpdateProductCampaign = $('#CmbUpdateProductCampaign');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK83'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (UploadID == "1") {
                    result = '<option value="' + json[i].ID + '">' + json[i].DetailName + '</option>';
                } else {
                    result = '<option value="' + json[i].ID + '" selected=true>' + json[i].DetailName + '</option>';
                }
                CmbProductCampaign.append(result);
                CmbUpdateProductCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CmbMaximalHandle() {
    var CmbMaximalHandle = $('#CmbMaxCampaign');
    var CmbUpdateMaxCampaign = $('#CmbUpdateMaxCampaign');
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK25'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                result = '<option value="' + json[i].max_handle + '">' + json[i].max_handle + '</option>';
                CmbMaximalHandle.append(result);
                CmbUpdateMaxCampaign.append(result);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function DataTableAgent() {
    var myTable = $('#TrmUserAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'7', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = "<input type = 'checkbox' class='checkbox' name='checkbox" + json[i].USERID + "' id = 'checkbox" + json[i].USERID + "' onclick=AgentCheck('" + json[i].USERID + "')>" +
                    "<label class='checkbox' for='checkbox" + json[i].USERID + "'></label>"
                var urlClick = "<a href='TrxOutboundCall.aspx?id=" + json[i].USERID + "&phonenumber=" + json[i].USERNAME + "' target='_blank' class='text-success' data-toggle='tooltip' data-original-title='Follow up'><i class='mdi mdi-phone-in-talk font-size-20' aria-hidden='true'></i></a>"
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, urlClick]).draw(false);


            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function SubmitUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal(
            '',
            'Agent is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbUpdateProductCampaign").val() == "Select" || $("#CmbUpdateProductCampaign").val() == "") {
        swal(
            '',
            'Product campaign is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#CmbUpdateMaxCampaign").val() == "" || $("#CmbUpdateMaxCampaign").val() == "Select") {
        swal(
            '',
            'Maximal distribution data is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    var TrxFlag = $("#ContentPlaceHolder1_HDAgent_Checkbox").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(),
                    TrxUserName: $("#hd_sessionLogin").val(), TrxCampaign: $("#CmbUpdateProductCampaign").val(),
                    TrxData: $("#CmbUpdateMaxCampaign").val(), TrxFlag: TrxFlag
                });
                console.log("Action update " + form_data)

                $.ajax({
                    url: "asmx/Tele_TrxAgent.asmx/UpdateAgentDistributionData",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Update Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#CmbUpdateProductCampaign").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDAgent_Checkbox").val("")
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Tele_TrxAgent.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Update Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    $("#CmbUpdateProductCampaign").val("");
                                    $("#CmbUpdateMaxCampaign").val("")
                                    $("#ContentPlaceHolder1_HDAgent_Checkbox").val("")
                                    $("#addContactModal").modal('hide');
                                    window.location.href = "Tele_TrxAgent.aspx";
                                });
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
        });
}
function SubmitDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val() });
                $.ajax({
                    url: "asmx/Tele_TrxAgent.asmx/DeleteAgentProductCampaign",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "";
                        for (i = 0; i < json.length; i++) {
                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Data Has Been Success',
                                    'success'
                                ).then(function () {
                                    window.location.href = "Tele_TrxAgent.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Tele_TrxAgent.aspx"
                                });
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
        });
}
function AgentCheck(TrxAgentID) {
    $.ajax({
        type: "POST",
        url: "asmx/Tele_TrxAgent.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxAgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK28'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length == 0) {

            } else {
                for (i = 0; i < json.length; i++) {
                    swal(
                        '',
                        'User already exits in ',
                        'info'
                    ).then(function () {
                        return false;
                    });
                    return false;
                    LoadingUser()
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
$(function () {
    //Assign Click event to Button.
    $("#btnSimpan").click(function () {
        //var message = "Id Name                  Country\n";
        var message = ""
        //Loop through all checked CheckBoxes in GridView.
        $("#TrmUserAgent input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML + ",";
            //message += "   " + row.cells[2].innerHTML;
            //message += "   " + row.cells[3].innerHTML;
            //message += "\n";
        });

        $("#ContentPlaceHolder1_TrxAgentId").val(message)

        if ($("#CmbProductCampaign").val() == "Select" || $("#CmbProductCampaign").val() == "") {
            swal(
                '',
                'Product campaign is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#CmbMaxCampaign").val() == "Select" || $("#CmbMaxCampaign").val() == "") {
            swal(
                '',
                'Maximal distribution data is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal(
                '',
                'Agent is empty',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
        swal({
            title: "Do you want to process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxData: encodeData($("#ContentPlaceHolder1_TrxAgentId").val()), TrxCampaign: $("#CmbProductCampaign").val(), MaxCampaign: $("#CmbMaxCampaign").val() });
                    $.ajax({
                        url: "asmx/Tele_TrxAgent.asmx/InsertAgentProductCampaign",
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: form_data,
                        success: function (data) {
                            console.log(form_data)

                            var json = JSON.parse(data.d);
                            var i = "";

                            for (i = 0; i < json.length; i++) {
                                if (json[i].Result == "True") {
                                    swal(
                                        '',
                                        'Insert Data Has Been Success',
                                        'success'
                                    ).then(function () {
                                        window.location.href = "Tele_TrxAgent.aspx";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed',
                                        'error'
                                    ).then(function () {
                                        window.location.href = "Tele_TrxAgent.aspx";
                                    });
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
            });

    });
});
function encodeData(s) {
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}