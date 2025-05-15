$(document).ready(function () {
    TrxAgent()
    TrmAgentCampaign("17")
    CmbProductCampaign();
    CmbMaximalHandle();
});
function TrxAgent() {
    var myTable = $('#TrxAgent').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'9', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK14'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                var TrxParam = "<input type = 'checkbox' class='checkbox' name='checkbox" + json[i].USERID + "' id = 'checkbox" + json[i].USERID + "' onclick=AgentCheck('" + json[i].USERID + "')>" +
                    "<label class='checkbox' for='checkbox" + json[i].USERID + "'></label>"
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>&nbsp;<span class='badge-soft-danger'><i class='fas fa-trash-alt' onclick=DeleteKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                myTable.row.add([TrxParam, json[i].USERID, json[i].USERNAME, json[i].NAME, json[i].EMAIL_ADDRESS, urlclick]).draw(false);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmAgentCampaign(ID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + ID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK100'}",
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
                    '<a class="dropdown-item" href="#" onclick=ActionSettingUpdate("' + json[i].id + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ActionSettingDelete("' + json[i].id + '")>Delete</a> ' +
                    '<a class="dropdown-item" href="#" onclick=ActionSettingRelease("' + json[i].id + '")>Refresh</a> ' +
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
function CmbProductCampaign(UploadID) {
    var CmbProductCampaign = $('#CmbProductCampaign');
    var CmbUpdateProductCampaign = $('#CmbUpdateProductCampaign');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        //data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK16'}",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK99'}",
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
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
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
function AddUser() {
    $("#modal-agent").modal('show');
}
function ActionSettingUpdate(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    SelectDetailProduct();
    $("#addContactModal").modal('show');
    $("#Update").show();
    $("#Delete").hide();
}
function ActionSettingDelete(rec_id) {
    $("#ContentPlaceHolder1_TrxID").val(rec_id);
    SelectDetailProduct();
    $("#addContactModal").modal('show');
    $("#Delete").show();
    $("#Update").hide();
}
function ActionSettingRelease(TrxID) {
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
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
                    url: "asmx/Out_TrxAgent.asmx/ReleaseNowhandle",
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
                                    'Release Now Handle Success',
                                    'success'
                                ).then(function () {
                                    window.location = "Out_TrxAgent.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Release Now Handle Failed',
                                    'error'
                                ).then(function () {
                                    window.location = "Out_TrxAgent.aspx";
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
function SubmitUpdate() {
    if ($("#ContentPlaceHolder1_TrxID").val() == "") {
        swal("Agent is empty")
        return false;
    }
    if ($("#CmbUpdateProductCampaign").val() == "Select" || $("#CmbUpdateProductCampaign").val() == "") {
        swal("Product campaign is empty")
        return false;
    }
    if ($("#CmbUpdateMaxCampaign").val() == "" || $("#CmbUpdateMaxCampaign").val() == "Select") {
        swal("Maximal distribution data is empty")
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
                $.ajax({
                    url: "asmx/Out_TrxAgent.asmx/UpdateAgentDistributionData",
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
                                    $("#modalright").modal('hide');
                                    window.location.href = "Out_TrxAgent.aspx";
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
                                    $("#modalright").modal('hide');
                                    window.location.href = "Out_TrxAgent.aspx";
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
                    url: "asmx/Out_TrxAgent.asmx/DeleteAgentProductCampaign",
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
                                    window.location.href = "Out_TrxAgent.aspx"
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Data Has Been Failed',
                                    'error'
                                ).then(function () {
                                    window.location.href = "Out_TrxAgent.aspx"
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
function AgentCheck(TrxAgentID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxAgentID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK101'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length == 0) {

            } else {
                for (i = 0; i < json.length; i++) {
                    swal(json[i].agent_name + " already exits in " + json[i].product_campaign)
                    TrmAgentCampaign("17")
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
        //Display selected Row data in Alert Box.
        //alert(message);
        //return false;
        $("#ContentPlaceHolder1_TrxAgentId").val(message)

        if ($("#CmbProductCampaign").val() == "Select" || $("#CmbProductCampaign").val() == "") {
            swal("Product campaign is empty")
            return false;
        }
        if ($("#CmbMaxCampaign").val() == "Select" || $("#CmbMaxCampaign").val() == "") {
            swal("Maximal campaign is empty")
            return false;
        }
        if ($("#ContentPlaceHolder1_TrxAgentId").val() == "") {
            swal("Agent is empty")
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
                        url: "asmx/Out_TrxAgent.asmx/InsertAgentProductCampaign",
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
                                        window.location.href = "Out_TrxAgent.aspx";
                                    });
                                } else {
                                    swal(
                                        '',
                                        'Insert Data Has Been Failed',
                                        'error'
                                    ).then(function () {
                                        window.location.href = "Out_TrxAgent.aspx";
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