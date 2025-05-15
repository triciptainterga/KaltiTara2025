$(document).ready(function () {
    MasterUser()
    LoadingUser();
    $("#TxtSearchingUserName").on("input", function () {
        var jumlahString = $(this).val().length;
        if (jumlahString >= 3) {
            LoadingSearchingUser($(this).val());
        } else if (jumlahString == 0) {
            LoadingSearchingUser($(this).val(""));
        }
    });
});
function LoadingUser() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK025', TrxActionType: 'TA-01'}",
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
                    '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Site + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditData("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteData("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].AgentID + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].AcraLoginID + '</span>' +
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
function LoadingSearchingUser(ParameterID) {
    if (ParameterID == "") {
        var KondisiData = "0";
    } else {
        var KondisiData = ParameterID;
    }
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + KondisiData + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK025', TrxActionType: 'CMB-01'}",
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
                    '<img src="assets/images/users/user.png" alt="" class="img-fluid rounded-circle" >' +
                    '</div>' +
                    '<div class="flex-grow-1 overflow-hidden"> ' +
                    '<h5 class="font-size-15 mb-1 text-truncate"> <a href="#" class="text-dark">' + json[i].NAME + '</a></h5>' +
                    '<p class="text-muted text-truncate mb-0">' +
                    '<span class="text-dark">' + json[i].Site + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="flex-shrink-0 dropdown"> ' +
                    '<a class="text-body dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="fa fas fa-ellipsis-h"></i></a> ' +
                    '<div class="dropdown-menu dropdown-menu-end"> ' +
                    //'<a class="dropdown-item" href="#" onclick=EditData("' + json[i].ID + '")>Edit</a> ' +
                    '<a class="dropdown-item" href="#" onclick=DeleteData("' + json[i].ID + '")>Delete</a> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="card-footer bg-transparent border-top d-flex">' +
                    '<div class="flex-grow-1">' +
                    '<span class="badge rounded-pill badge-soft-success font-size-12">' + json[i].AgentID + '</span>' +
                    '</div>' +
                    '<div class="flex-shrink-0 ms-2">' +
                    '<span class="badge rounded-pill badge-soft-primary font-size-12">' + json[i].AcraLoginID + '</span>' +
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
function NewData() {
    CleanObject();
    $("#ContactModalLogiID").modal('show');
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function EditData(TrxID) {
    $("#ContactModalLogiID").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected();
}
function DeleteData(TrxID) {
    $("#ContactModalLogiID").modal('show');
    $("#Simpan").hide();
    $("#Update").hide();
    $("#Delete").show();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelected();
}
function MasterUser() {
    var ComboUserAgent = $('#ComboUserAgent');
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrxAgentACRA.asmx/QM_TrxDropdown",
        data: "{TrxID:'0', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'0', TrxAction: 'UIDESK019'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, ResultComboUserAgent = "";

            for (i = 0; i < json.length; i++) {

                ResultComboUserAgent = '<option value="' + json[i].USERNAME + '">' + json[i].NAME + '</option>';
                ComboUserAgent.append(ResultComboUserAgent);

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
    if ($("#LoginID").val() == '') {
        swal(
            '',
            'Login ID is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ComboUserAgent").val() == '' || $("#ComboUserAgent").val() == 'Select') {
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

                var form_data = JSON.stringify({ TrxID: "0", LoginID: $("#LoginID").val(), UserAgent: $("#ComboUserAgent").val(), Created_By: $("#hd_sessionLogin").val(), TrxAction: "INSERT" });
                $.ajax({
                    url: "asmx/QA_TrxAgentACRA.asmx/QA_TrxMappingAccount",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "", ResultID = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                if (json[i].MessageSystem == "Data Login ID Sudah Tersedia") {
                                    var event = "error"
                                    $("#Simpan").show();
                                } else if (json[i].MessageSystem == "Data Agent ID Sudah Tersedia") {
                                    var event = "error"
                                    $("#Simpan").show();
                                } else {
                                    var event = "success"
                                    $("#Simpan").hide();
                                }
                                swal(
                                    '',
                                    '' + json[i].MessageSystem + '',
                                    '' + event + ''
                                ).then(function () {
                                    location.href = "QA_TrxAgentACRA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].MessageSystem + '',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
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
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), LoginID: $("#LoginID").val(), UserAgent: $("#ComboUserAgent").val(), Created_By: $("#hd_sessionLogin").val(), TrxAction: "UPDATE" });
                $.ajax({
                    url: "asmx/QA_TrxAgentACRA.asmx/QA_TrxMappingAccount",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "", ResultID = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                if (json[i].MessageSystem == "Data Login ID Sudah Tersedia") {
                                    var event = "error"
                                    $("#Simpan").show();
                                } else if (json[i].MessageSystem == "Data Agent ID Sudah Tersedia") {
                                    var event = "error"
                                    $("#Simpan").show();
                                } else {
                                    var event = "success"
                                    $("#Simpan").hide();
                                }
                                swal(
                                    '',
                                    '' + json[i].MessageSystem + '',
                                    '' + event + ''
                                ).then(function () {
                                    location.href = "QA_TrxAgentACRA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    '' + json[i].MessageSystem + '',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
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
function ActionDelete() {
    if ($("#ContentPlaceHolder1_TrxID").val() == '') {
        swal(
            '',
            'Data is empty',
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

                var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), LoginID: $("#LoginID").val(), UserAgent: $("#ComboUserAgent").val(), Created_By: $("#hd_sessionLogin").val(), TrxAction: "DELETE" });
                $.ajax({
                    url: "asmx/QA_TrxAgentACRA.asmx/QA_TrxMappingAccount",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: form_data,
                    success: function (data) {
                        console.log(form_data)

                        var json = JSON.parse(data.d);
                        var i = "", ResultID = "";
                        for (i = 0; i < json.length; i++) {

                            if (json[i].Result == "True") {
                                swal(
                                    '',
                                    'Delete Transaction Login ID Has Been Success',
                                    'success'
                                ).then(function () {
                                    $("#Simpan").hide();
                                    $("#Update").hide();
                                    $("#Delete").hide();
                                    location.href = "QA_TrxAgentACRA.aspx";
                                });
                            } else {
                                swal(
                                    '',
                                    'Delete Transaction Login ID Has Been Failed !',
                                    'error'
                                ).then(function () {
                                    return false;
                                });
                                return false;
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
function TrmSelected() {
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrmSystem.asmx/UIDESK_TrmMasterTransaction",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK025', TrxActionType: 'CMB-02'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#LoginID').val(json[i].AcraLoginID);
                $('#ComboUserAgent').val(json[i].AgentID);
                $('#ComboUserAgent').attr("disabled", true);

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function CleanObject() {
    $('#LoginID').val("");
    $('#ComboUserAgent').val("");
    $('#ComboUserAgent').attr("disabled", false);
}
function ChangeUserAgent(val) {
    var selectedText = $("#ComboUserAgent").find("option:selected").text();
    var selectedValue = $("#ComboUserAgent").val();
    $.ajax({
        type: "POST",
        url: "asmx/QA_TrxAgentACRA.asmx/QM_TrxDropdown",
        data: "{TrxID:'" + $("#ComboUserAgent").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxStatus:'0', TrxAction: 'UIDESK020'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x;

            for (i = 0; i < json.length; i++) {

                $("#LoginID").val(json[i].PBX_LOIN_ID)

            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}