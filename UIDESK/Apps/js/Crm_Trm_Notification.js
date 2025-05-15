$(document).ready(function () {
    cmbUserName()
    TrmUserAddress()
    $("#Update").hide();
    $("#Delete").hide();
    TrmSettingNotification();
    TrmNotificationTemplate();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            TrmUserSearching($(this).val());
        } else if (jumlahString == 0) {
            TrmUserSearching($(this).val(""));
        }
    });
});
function TrmUserAddress() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK40'}",
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
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].USERNAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].NAME + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=showUpdate("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=showDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted"></div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].EMAIL_ADDRESS + '</span>' +
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
function TrmUserSearching(ParameterID) {
    if (ParameterID == '') {
        var jsonText = "UideskIndonesia";
    } else {
        var jsonText = ParameterID
    }
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + jsonText +"', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK40'}",
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
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].USERNAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].NAME + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    '<a class="dropdown-item" href="#" onclick=showUpdate("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=showDelete("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<div class="font-size-13 text-muted"></div>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].EMAIL_ADDRESS + '</span>' +
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
    ClearObject()
}
function showUpdate(TrxID) {
    $("#modal-agent").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').attr("disabled", true);
    $('#TxtEmailAddress').attr("disabled", true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function showDelete(TrxID) {
    $("#modal-agent").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID)
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').attr("disabled", true);
    $('#TxtEmailAddress').attr("disabled", true);
    $('#cmbStatus').attr("disabled", true);
    TrmSelect($("#ContentPlaceHolder1_TrxID").val())
}
function cmbUserName() {
    var cmbUserName = $('#cmbUserName');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK07'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultUserName = "";
            for (i = 0; i < json.length; i++) {

                resultUserName = '<option value="' + json[i].USERNAME + '">' + json[i].USERNAME + ' - ' + json[i].NAME + '</option>';
                cmbUserName.append(resultUserName);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function getWS_CategoryType(value) {
    var selectedText = $("#cmbUserName").find("option:selected").text();
    var selectedValue = $("#cmbUserName").val();
    //alert(selectedValue)
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + selectedValue + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK112'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(selectedValue)
            var json = JSON.parse(data.d);
            var i, x, resultMenuLevel2 = "";

            for (i = 0; i < json.length; i++) {

                $("#TxtLevelUser").val(json[i].LEVELUSER)
                if (json[i].EMAIL_ADDRESS == null || json[i].EMAIL_ADDRESS == "") {
                    $("#TxtEmailAddress").val("")
                    swal("Email address is empty, Please check data user management");
                    return false
                } else {
                    $("#TxtEmailAddress").val(json[i].EMAIL_ADDRESS)
                }
                if (json[i].LEVELUSER == "Layer 3") {
                    $("#Div_Department").css("display", "block")
                    $("#TxtDepartment").attr("disabled", false);
                    $("#TxtVendor").attr("disabled", true);
                    $("#TxtVendor").val("");
                    if (json[i].ORGANIZATION_NAME == null || json[i].ORGANIZATION_NAME == "") {
                        swal("Department is empty, Please check data user management");
                        return false
                    } else {
                        $("#ContentPlaceHolder1_TrxDepartmentID").val(json[i].ORGANIZATION)
                        $("#TxtDepartment").val(json[i].ORGANIZATION_NAME)
                        $("#TxtDepartment").attr("disabled", true);
                        $("#checkboxCreate").attr("disabled", true);
                        $("#checkboxOver").attr("disabled", true);
                        $("#checkboxClosed").attr("disabled", true);
                        $("#checkboxEscalation").attr("disabled", false);

                    }
                } else if (json[i].LEVELUSER == "Layer 2") {

                    $("#TxtVendor").val(json[i].NamaGrup);
                    $("#TxtDepartment").val("");
                    $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtVendor").attr("disabled", false);
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);

                } else if (json[i].LEVELUSER == "Layer 1") {
                    $("#TxtVendor").attr("disabled", true);
                    $("#TxtVendor").val(json[i].NamaGrup);
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtDepartment").val("");
                    $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);

                } else if (json[i].LEVELUSER == "Supervisor") {
                    $("#TxtVendor").attr("disabled", true);
                    $("#ContentPlaceHolder1_TrxDepartmentID").val(json[i].ORGANIZATION)
                    $("#TxtDepartment").val(json[i].ORGANIZATION_NAME)
                    $("#TxtDepartment").attr("disabled", true);
                    $("#checkboxCreate").attr("disabled", true);
                    $("#checkboxOver").attr("disabled", true);
                    $("#checkboxClosed").attr("disabled", true);
                    $("#checkboxEscalation").attr("disabled", false);
                }
                else {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val("");
                    $("#TxtDepartment").attr("disabled", true);
                    $("#TxtVendor").attr("disabled", true);
                    $("#checkboxCreate").attr("disabled", false);
                    $("#checkboxOver").attr("disabled", false);
                    $("#checkboxClosed").attr("disabled", false);
                    $("#checkboxEscalation").attr("disabled", false);
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
function TrmSelect(TrxID) {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxID + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK41'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                if (json[i].LEVELUSER == "Layer 3") {
                    $("#TxtDepartment").val(json[i].ORGANIZATION_NAME);
                    $("#TxtVendor").val("");
                } else if (json[i].LEVELUSER == "Layer 2") {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val(json[i].NamaGrup);
                } else {
                    $("#TxtDepartment").val("");
                    $("#TxtVendor").val("");
                }

                $("#cmbUserName").val(json[i].USERNAME);
                $("#TxtEmailAddress").val(json[i].EMAIL_ADDRESS);
                $("#TxtLevelUser").val(json[i].LEVELUSER);
                $("#cmbStatus").find("option:selected").text();
                $("#cmbStatus").val(json[i].STATUS);
                $("#cmbStatus").val(json[i].STATUS);

                if (json[i].TICKET_CREATE == 'YES') {
                    $("#checkboxCreate").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketCreate").val("YES");
                } else {
                    $("#checkboxCreate").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketCreate").val("NO");
                }
                if (json[i].TICKET_OVER_SLA == 'YES') {
                    $("#checkboxOver").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketOverSLA").val("YES");
                } else {
                    $("#checkboxOver").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketOverSLA").val("NO");
                }
                if (json[i].TICKET_CLOSED == 'YES') {
                    $("#checkboxClosed").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketClosed").val("YES");
                } else {
                    $("#checkboxClosed").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketClosed").val("NO");
                }
                if (json[i].TICKET_ESKALASI == 'YES') {
                    $("#checkboxEscalation").prop('checked', true);
                    $("#ContentPlaceHolder1_HdTicketEscalation").val("YES");
                } else {
                    $("#checkboxEscalation").prop('checked', false);
                    $("#ContentPlaceHolder1_HdTicketEscalation").val("NO");
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
function CheckCreate(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketCreate").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketCreate").val("NO")
    }
};
function CheckOver(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketOverSLA").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketOverSLA").val("NO")
    }
};
function CheckClosed(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketClosed").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketClosed").val("NO")
    }
};
function CheckEscalation(checked) {
    if (checked) {
        $("#ContentPlaceHolder1_HdTicketEscalation").val("YES")
    } else {
        $("#ContentPlaceHolder1_HdTicketEscalation").val("NO")
    }
};
function TicketCreate(checked) {
    if (checked) {
        var TrxTicketCreate = "YES"
    } else {
        var TrxTicketCreate = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "1", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: TrxTicketCreate });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TicketOver(checked) {
    if (checked) {
        var TrxTicketOver = "YES"
    } else {
        var TrxTicketOver = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "2", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: TrxTicketOver });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TicketClosed(checked) {
    if (checked) {
        var TrxTicketClosed = "YES"
    } else {
        var TrxTicketClosed = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "3", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: TrxTicketClosed });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TicketEskalasi(checked) {
    if (checked) {
        var TicketEskalasi = "YES"
    } else {
        var TicketEskalasi = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "4", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: TicketEskalasi });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CustomerTicketCreate(checked) {
    if (checked) {
        var CustomerTicketCreate = "YES"
    } else {
        var CustomerTicketCreate = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "5", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: CustomerTicketCreate });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CustomerTicketClosed(checked) {
    if (checked) {
        var CustomerTicketClosed = "YES"
    } else {
        var CustomerTicketClosed = "NO"
    }
    var form_data = JSON.stringify({ TrxID: "6", TrxUserName: $("#hd_sessionLogin").val(), TrxValue: CustomerTicketClosed });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/InsertSettingNotification",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);

            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TrmSettingNotification() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK42'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";
            for (i = 0; i < json.length; i++) {

                if (json[i].TYPE == "TICKET_CREATE" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketCreate").prop('checked', true);
                    } else {
                        $("#SettingTicketCreate").prop('checked', false);
                    }
                }
                //if (json[i].TYPE == "TICKET_OVER_SLA" && json[i].CATEGORY == 'SYSTEM') {
                //    if (json[i].STATUS == "YES") {
                //        $("#SettingTicketOver").prop('checked', true);
                //    } else {
                //        $("#SettingTicketOver").prop('checked', false);
                //    }
                //}
                if (json[i].TYPE == "TICKET_CLOSED" && json[i].CATEGORY == 'SYSTEM') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingTicketClosed").prop('checked', true);
                    } else {
                        $("#SettingTicketClosed").prop('checked', false);
                    }
                }
                //if (json[i].TYPE == "TICKET_ESKALASI" && json[i].CATEGORY == 'SYSTEM') {
                //    if (json[i].STATUS == "YES") {
                //        $("#SettingTicketEskalasi").prop('checked', true);
                //    } else {
                //        $("#SettingTicketEskalasi").prop('checked', false);
                //    }
                //}
                if (json[i].TYPE == "TICKET_CREATE" && json[i].CATEGORY == 'CUSTOMER') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingCustomerCreate").prop('checked', true);
                    } else {
                        $("#SettingCustomerCreate").prop('checked', false);
                    }
                }
                if (json[i].TYPE == "TICKET_CLOSED" && json[i].CATEGORY == 'CUSTOMER') {
                    if (json[i].STATUS == "YES") {
                        $("#SettingCustomerClosed").prop('checked', true);
                    } else {
                        $("#SettingCustomerClosed").prop('checked', false);
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
function TrmNotificationTemplate() {
    var divNotificationTemplate = $('#divNotificationTemplate');
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'UideskIndonesia', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK43'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, resultNotificationTemplate = "";

            for (i = 0; i < json.length; i++) {
                resultNotificationTemplate = '<div class="media media-single">' +
                    '<a href="TrmNotificationTemplate.aspx" target="_blank"><span class="badge badge-success badge-pill"><i class="fa fa-envelope"></i></span></a>' +
                    '<div class="media-body">' +
                    '<h6><a href="TrmNotificationTemplate.aspx" target="_blank">' + json[i].SUBJECT + '</a></h6>' +
                    '<p class="font-size-10"><a href="TrmNotificationTemplate.aspx" target="_blank">Template ' + json[i].CATEGORY + '</a></p>' +
                    '</div>' +
                    '</div>'
                divNotificationTemplate.append(resultNotificationTemplate);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function ActionSimpan() {
    if ($("#cmbUserName").val() == '') {
        swal("User Name is empty");
        return false
    }
    if ($("#TxtEmailAddress").val() == '') {
        swal("Email address is empty");
        return false
    }
    //else {
    //    var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
    //    if (regex.test($("#TxtEmailAddress").val())) {
    //    } else {
    //        swal(
    //            '',
    //            'Data has been block',
    //            'error'
    //        ).then(function () {
    //            return false;
    //        });
    //        return false;
    //    }
    //}
    if ($("#cmbStatus").val() == '') {
        swal("Status is empty");
        return false
    }
    if ($("#ContentPlaceHolder1_HdTicketCreate").val() == "") {
        var TrxTicketCreate = "NO";
    } else {
        var TrxTicketCreate = $("#ContentPlaceHolder1_HdTicketCreate").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketOverSLA").val() == "") {
        var TrxTicketOver = "NO";
    } else {
        var TrxTicketOver = $("#ContentPlaceHolder1_HdTicketOverSLA").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketClosed").val() == "") {
        var TrxTicketClose = "NO";
    } else {
        var TrxTicketClose = $("#ContentPlaceHolder1_HdTicketClosed").val();
    }
    if ($("#ContentPlaceHolder1_HdTicketEscalation").val() == "") {
        var TrxTicketEscalation = "NO";
    } else {
        var TrxTicketEscalation = $("#ContentPlaceHolder1_HdTicketEscalation").val();
    }

    if ($("#TxtDepartment").val() == '') {
        $("#ContentPlaceHolder1_TrxDepartmentID").val("0")
    }
    if ($("#TxtVendor").val() == '') {
        $("#ContentPlaceHolder1_TrxVendorID").val("0")
    }
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#cmbUserName").val(), TrxEmailAddress: $("#TxtEmailAddress").val(), TrxStatus: $("#cmbStatus").val(),
                    TrxCreate: TrxTicketCreate, TrxOver: TrxTicketOver, TrxClose: TrxTicketClose, TrxEscalation: TrxTicketEscalation, TrxDepartment: $("#ContentPlaceHolder1_TrxDepartmentID").val(), TrxVendor: $("#TxtVendor").val()
                });
                console.log("Insert Data " & form_data)
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/InsertSettingNotificationAddress",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {

                        var json = JSON.parse(data.d);
                        var i, x, result = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "False") {
                                swal((json[i].TrxmsgSystem))
                                $("#modal-agent").modal('show');
                            } else {
                                swal("Done", {
                                    icon: "success",
                                });
                                console.log(form_data)

                                $("#cmbUserName").val("");
                                $("#TxtEmailAddress").val("");
                                $("#cmbStatus").val("");
                                location.href = "Crm_Trm_Notification.aspx";
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
function ActionUpdate() {
    var TrxTicketCreate = $("#ContentPlaceHolder1_HdTicketCreate").val();
    var TrxTicketOver = $("#ContentPlaceHolder1_HdTicketOverSLA").val();
    var TrxTicketClose = $("#ContentPlaceHolder1_HdTicketClosed").val();
    var TrxTicketEscalation = $("#ContentPlaceHolder1_HdTicketEscalation").val();
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var form_data = JSON.stringify({
                    TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: $("#cmbUserName").val(), TrxStatus: $("#cmbStatus").val(),
                    TrxCreate: TrxTicketCreate, TrxOver: TrxTicketOver, TrxClose: TrxTicketClose, TrxEscalation: TrxTicketEscalation, TrxDepartment: "-", TrxVendor: "-"
                });
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/UpdateSettingNotificationAddress",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        $("#cmbUserName").val("");
                        $("#TxtEmailAddress").val("");
                        $("#cmbStatus").val("");
                        location.href = "Crm_Trm_Notification.aspx";
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
function ActionDelete() {
    swal({
        title: "Do you want to process?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                if ($("#cmbUserName").val() == "" || $("#cmbUserName").val() == null) {
                    var TrxUserName = "-"
                } else {
                    var TrxUserName = $("#cmbUserName").val()
                }
                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserCreate: $("#hd_sessionLogin").val(), TrxUserName: TrxUserName });
                console.log("delete user " + form_data)
                $.ajax({
                    url: "WebServiceGetDataMaster.asmx/DeleteSettingNotificationAddress",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        console.log(form_data)

                        $("#cmbUserName").val("");
                        $("#TxtEmailAddress").val("");
                        $("#cmbStatus").val("");
                        location.href = "Crm_Trm_Notification.aspx";
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
function ClearObject() {
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_HdTicketCreate").val("");
    $("#ContentPlaceHolder1_HdTicketOverSLA").val("");
    $("#ContentPlaceHolder1_HdTicketClosed").val("");
    $("#ContentPlaceHolder1_HdTicketEscalation").val("");
    $('#cmbUserName').val("");
    $('#TxtEmailAddress').val("");
    $('#cmbStatus').val("");
    $("#TxtLevelUser").val("");
    $("#TxtDepartment").val("");
    $("#TxtVendor").val("");
    $('#cmbUserName').attr("disabled", false);
    $('#TxtEmailAddress').attr("disabled", false);
}