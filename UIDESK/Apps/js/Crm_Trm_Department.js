$(document).ready(function () {
    TrmDepartment();
    $("#Update").hide();
    $("#Delete").hide();
});
function TrmDepartment() {
    var myTable = $('#TrmCategory').DataTable();
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/TableTransactionTrmDepartment",
        data: "{TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxName: '0', TrxEmail: '0', TrxStatus: '0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            var i = "";

            myTable.clear().draw();
            for (i = 0; i < json.length; i++) {

                if (json[i].NA == "Y") {
                    var Status = "Active"
                } else {
                    var Status = "Non Active"
                }
                //var urlclick = "<span class='badge-soft-primary'><i class='fas fa-edit' onclick=UpdateKlik(" + json[i].ID + ") style='cursor:pointer;'></i></span>"
                var urlclick = '<div class="flex-shrink-0 ms-2">' +
                    '<div class="dropdown">' +
                    '<a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<i class="mdi mdi-dots-horizontal"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a class="dropdown-item" href="#" onclick=UpdateKlik(' + json[i].ORGANIZATION_ID + ') >Edit</a>' +
                    '</div>' +
                    '</div>'

                myTable.row.add([json[i].ORGANIZATION_ID, json[i].ORGANIZATION_NAME, json[i].EMAIL, Status, urlclick]).draw(false);
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
function TambahDept() {
    $("#addContactModal").modal('show');
    $('#TxtEmail').val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("")
    $('#TxtDepartment').val("");
    $("#Simpan").show();
    $("#Update").hide();
    $("#Delete").hide();
}
function UpdateKlik(TrxID) {
    $("#addContactModal").modal('show');
    $("#Simpan").hide();
    $("#Update").show();
    $("#Delete").hide();
    $("#ContentPlaceHolder1_TrxID").val(TrxID);
    TrmSelectDepartment()
    //$("#TxtCategoryName").val(decodeURI(Name));
    //$("#cmbStatus").find("option:selected").text();
    //$("#cmbStatus").val(Status);
}
function ActionSimpan() {
    var TrxName = $("#TxtDepartment").val();
    var TrxEmail = $("#TxtEmail").val();
    if (TrxName == '') {
        swal(
            '',
            'Department is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    } else {
        var regex = /^[\u2019a-zA-ZÀ-ÿ0-9\s\\-]+$/;
        if (regex.test(TrxName)) {
        } else {
            swal(
                '',
                'Data has been block',
                'error'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    if (TrxEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxEmail.match(mailformat)) {

        } else {
            swal(
                '',
                'Format email address is not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    } else {
        swal(
            '',
            'Email address is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if ($("#ContentPlaceHolder1_Hd_Status").val() == '') {
        swal(
            '',
            'Status is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }

    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + TrxName + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK143'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Department.aspx";
                });
                return false;
            } else {

                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            $("#LoaderPage").show();

                            var form_data = JSON.stringify({ TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxEmail: TrxEmail, TrxStatus: $("#ContentPlaceHolder1_Hd_Status").val() });
                            $.ajax({
                                url: "WebServiceGetDataMaster.asmx/InsertTransactionTrmDepartment",
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
                                                $("#TxtDepartment").val("");
                                                $("#TxtEmail").val("");
                                                $("#cmbStatus").val("");
                                                $("#addContactModal").modal('hide');
                                                TrmDepartment();
                                                $("#LoaderPage").hide();
                                                window.location.href = "Crm_Trm_Department.aspx?";
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Insert Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                $("#addContactModal").modal('hide');
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })  
}
function ActionUpdate() {
    var TrxName = $("#TxtDepartment").val();
    var TrxEmail = $("#TxtEmail").val();
    if (TrxName == '') {
        swal(
            '',
            'Department is empty',
            'info'
        ).then(function () {
            return false;
        });
        return false;
    }
    if (TrxEmail != '') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (TrxEmail.match(mailformat)) {

        } else {
            swal(
                '',
                'Format email address is not valid',
                'info'
            ).then(function () {
                return false;
            });
            return false;
        }
    }
    var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, 
        TrxEmail: TrxEmail, TrxStatus: $("#ContentPlaceHolder1_Hd_Status").val() });
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/CheckTransactionTrmDepartment",
        data: form_data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Department.aspx";
                });
                return false;
            } else {
                swal({
                    title: "Do you want to process?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            $("#LoaderPage").show();

                            var form_data = JSON.stringify({ TrxID: $("#ContentPlaceHolder1_TrxID").val(), TrxUserName: $("#hd_sessionLogin").val(), TrxName: TrxName, TrxEmail: TrxEmail, TrxStatus: $("#ContentPlaceHolder1_Hd_Status").val() });
                            $.ajax({
                                url: "WebServiceGetDataMaster.asmx/UpdateTransactionTrmDepartment",
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
                                                $("#TxtDepartment").val("");
                                                $("#TxtEmail").val("");
                                                $("#cmbStatus").val("");
                                                $("#addContactModal").modal('hide');
                                                TrmDepartment();
                                                $("#LoaderPage").hide();
                                            });
                                        } else {
                                            swal(
                                                '',
                                                'Update Data Has Been Failed !',
                                                'error'
                                            ).then(function () {
                                                $("#addContactModal").modal('hide');
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

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    }) 
}
function getWS_Status(value) {
    var selectedText = $("#cmbStatus").find("option:selected").text();
    var selectedValue = $("#cmbStatus").val();
    console.log("Selected Text: " + selectedText + " Value: " + selectedValue);
    $("#ContentPlaceHolder1_Hd_Status").val(selectedValue)
}
function TrmSelectDepartment() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK09'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            for (i = 0; i < json.length; i++) {

                $('#TxtEmail').val(json[i].EMAIL);
                $("#cmbStatus").val(json[i].NA);
                $("#ContentPlaceHolder1_Hd_Status").val(json[i].NA)
                $('#TxtDepartment').val(json[i].ORGANIZATION_NAME);

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
    $('#TxtEmail').val("");
    $("#cmbStatus").val("");
    $("#ContentPlaceHolder1_Hd_Status").val("")
    $('#TxtDepartment').val("");
}
function ActionCheck() {
    $.ajax({
        type: "POST",
        url: "WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'" + $("#ContentPlaceHolder1_TrxID").val() + "', TrxUserName: '" + $("#hd_sessionLogin").val() + "', TrxAction: 'UIDESK143'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var json = JSON.parse(data.d);
            var i, x, result = "";

            if (json.length != 0) {
                swal(
                    '',
                    '' + TrxName + ' already exits',
                    'error'
                ).then(function () {
                    window.location.href = "Crm_Trm_Department.aspx";
                });
                return false;
            }

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}